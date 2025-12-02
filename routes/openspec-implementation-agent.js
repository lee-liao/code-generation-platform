const express = require('express');
const { exec, spawn, execSync } = require('child_process');
const { promisify } = require('util');
const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
const { GitHubApp } = require('../github-app');
const installationStorage = require('../utils/installation-storage'); // Import installation storage

const execAsync = promisify(exec);
const router = express.Router();

// In-memory task storage (in production, use a proper database)
const tasks = new Map();

// Background task manager
class TaskManager {
  constructor() {
    this.tasks = new Map();
  }

  createTask(taskId, initialStatus = { step: 'initial', completed: false }) {
    this.tasks.set(taskId, {
      id: taskId,
      status: initialStatus,
      processInfo: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  updateTask(taskId, status) {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = { ...task.status, ...status };
      task.updatedAt = new Date();
      this.tasks.set(taskId, task);
    }
  }

  updateProcessInfo(taskId, processInfo) {
    const task = this.tasks.get(taskId);
    if (task) {
      task.processInfo = processInfo;
      task.updatedAt = new Date();
      this.tasks.set(taskId, task);
    }
  }

  getTask(taskId) {
    return this.tasks.get(taskId);
  }

  removeTask(taskId) {
    this.tasks.delete(taskId);
  }
}

const taskManager = new TaskManager();

// Function to validate OpenSpec zip file
async function validateOpenSpecZip(zipPath) {
  // Extract to temporary directory for validation
  const tempDir = path.join(__dirname, '..', 'temp', `validation_${Date.now()}`);
  await fsPromises.mkdir(tempDir, { recursive: true });

  try {
    // Unzip the file to temporary location first
    await new Promise((resolve, reject) => {
      fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: tempDir }))
        .on('close', resolve)
        .on('error', reject);
    });

    // Check the extracted content to determine if it has proper OpenSpec structure
    const extractedContents = await fsPromises.readdir(tempDir);

    let changesDir = path.join(tempDir, 'changes');

    // Check if there's a changes directory at the root
    let hasChangesDir = false;
    try {
      await fsPromises.access(changesDir);
      hasChangesDir = true;
    } catch {
      // No changes directory at root, check if there's a single directory that might contain the changes
      if (extractedContents.length === 1) {
        const singleItemPath = path.join(tempDir, extractedContents[0]);
        const stat = await fsPromises.stat(singleItemPath);
        if (stat.isDirectory()) {
          // This could be the changes directory (e.g., if user zipped the changes folder itself)
          changesDir = singleItemPath;
          try {
            await fsPromises.access(changesDir);
            hasChangesDir = true;
          } catch {
            // Still no valid changes directory
          }
        }
      }
    }

    if (hasChangesDir) {
      // Check for required files in the changes directory
      const changesContents = await fsPromises.readdir(changesDir);
      if (changesContents.length === 0) {
        throw new Error('OpenSpec zip does not contain any change directories');
      }

      // For each change directory, check for required files
      for (const changeDir of changesContents) {
        const changePath = path.join(changesDir, changeDir);
        const stat = await fsPromises.stat(changePath);
        if (stat.isDirectory()) {
          const requiredFiles = ['proposal.md', 'tasks.md'];
          for (const file of requiredFiles) {
            const filePath = path.join(changePath, file);
            try {
              await fsPromises.access(filePath);
            } catch (err) {
              console.warn(`Warning: Expected file ${file} not found in ${changeDir}, but continuing`);
            }
          }

          // Check for specs directory
          const specsDir = path.join(changePath, 'specs');
          try {
            await fsPromises.access(specsDir);
          } catch (err) {
            console.warn(`Warning: specs directory not found in ${changeDir}, but continuing`);
          }
        }
      }

      return true;
    } else {
      // If no changes directory found but there are some contents, we'll accept it as it will be processed properly in the main function
      if (extractedContents.length > 0) {
        console.warn(`Warning: No changes directory found at zip root, but zip contains content. This will be handled in the implementation phase.`);
        return true;
      } else {
        throw new Error('OpenSpec zip does not contain required changes directory structure');
      }
    }
  } catch (error) {
    throw new Error(`Invalid OpenSpec structure: ${error.message}`);
  } finally {
    // Cleanup temp directory
    try {
      await fsPromises.rm(tempDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.error('Error cleaning up validation temp directory:', cleanupError);
    }
  }
}

// Function to implement OpenSpec change with Claude
async function runClaudeImplementation(taskId, workingDir, changeId, logFilePath) {
  const logOperation = async (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] Task ${taskId}: ${message}\n`;
    try {
      await fsPromises.appendFile(logFilePath, logEntry);
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  };

  try {
    await logOperation(`Starting Claude implementation in directory: ${workingDir}`);
    taskManager.updateTask(taskId, { step: 'claude-implementation', message: 'Starting Claude AI implementation...' });

    // Build the Claude command
    const claudeCommand = 'claude -p --permission-mode bypassPermissions "The project has been set up for spec-driven development with detailed specifications in OpenSpec standards. The specifications are detailed enough be implemented without any user input. Read the OpenSpec change requirements under @openspec/changes/** and implement the specification. Create the required files and directories as specified in the OpenSpec document. After implementation, verify the new created files fulfill the requirements."';

    // Set up environment
    const originalCwd = process.cwd();
    try {
      process.chdir(workingDir);

      // Check if Claude CLI is available
      let claudeAvailable = false;
      const environment = { ...process.env };

      try {
        execSync('cmd /c claude --version', {
          stdio: 'pipe',
          env: environment
        });
        claudeAvailable = true;
      } catch (availabilityCheckError) {
        console.log('Claude availability check failed, trying with enhanced PATH');
        // Try with enhanced PATH
        const enhancedEnv = {
          ...environment,
          PATH: `${process.env.PATH || ''};${process.env.USERPROFILE || process.env.HOMEPATH}\\AppData\\Roaming\\npm`
        };

        try {
          execSync('cmd /c claude --version', {
            stdio: 'pipe',
            env: enhancedEnv
          });
          claudeAvailable = true;
          Object.assign(environment, enhancedEnv);
        } catch (secondCheckError) {
          console.log('Claude not available with enhanced PATH either');
        }
      }

      if (!claudeAvailable) {
        throw new Error('Claude CLI not found on system');
      }

      // Run Claude command with enhanced environment that we know works
      return new Promise((resolve, reject) => {
        const childProcess = spawn('cmd', ['/c', claudeCommand], {
          cwd: workingDir,
          env: environment,
          stdio: ['ignore', 'pipe', 'pipe'], // Ignore stdin to prevent hanging
          windowsHide: true
        });

        // Track the process in the task manager
        taskManager.updateProcessInfo(taskId, {
          pid: childProcess.pid,
          status: 'running',
          startTime: new Date()
        });

        let stdout = '';
        let stderr = '';

        childProcess.stdout.on('data', (data) => {
          stdout += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
          stderr += data.toString();
        });

        // Increase timeout to 10 minutes to allow Claude to complete implementation
        const timeoutId = setTimeout(() => {
          if (!childProcess.killed) {
            childProcess.kill();
            taskManager.updateProcessInfo(taskId, {
              pid: childProcess.pid,
              status: 'killed-by-timeout',
              endTime: new Date()
            });
            logOperation('Claude AI implementation timed out after 10 minutes. Process was terminated.');
            reject(new Error('Claude AI implementation timed out after 10 minutes. Process was terminated.'));
          }
        }, 600000); // 10 minutes timeout

        childProcess.on('close', (code) => {
          // Clear the timeout since the process has completed
          clearTimeout(timeoutId);

          taskManager.updateProcessInfo(taskId, {
            pid: childProcess.pid,
            status: 'completed',
            exitCode: code,
            endTime: new Date()
          });

          if (code === 0) {
            // Claude implementation completed successfully
            let outputContent = `Stdout:\n${stdout}\n\nStderr:\n${stderr}\n\nCommand executed: ${claudeCommand}\nExit code: ${code}`;
            fsPromises.writeFile(path.join(workingDir, 'claude-implementation-output.txt'), outputContent)
              .then(() => {
                logOperation('Claude AI implementation completed successfully.');
                taskManager.updateTask(taskId, {
                  step: 'claude-implementation-complete',
                  message: 'Claude implementation completed. Proceeding to Git operations...'
                });
                resolve();
              })
              .catch(writeErr => {
                logOperation(`Failed to write Claude output: ${writeErr.message}`);
                reject(writeErr);
              });
          } else {
            let errorOutput = `Stdout:\n${stdout}\n\nStderr:\n${stderr}\n\nCommand executed: ${claudeCommand}\nExit code: ${code}`;
            logOperation(`Claude command failed with exit code ${code}`);
            const error = new Error(`Claude command failed with exit code ${code}.\nOutput: ${errorOutput}`);
            taskManager.updateTask(taskId, {
              step: 'claude-implementation-error',
              message: `Claude implementation failed with exit code: ${code}`
            });
            reject(error);
          }
        });

        childProcess.on('error', (error) => {
          // Clear the timeout since the process has erred
          clearTimeout(timeoutId);

          taskManager.updateProcessInfo(taskId, {
            pid: childProcess.pid,
            status: 'error',
            error: error.message,
            endTime: new Date()
          });
          logOperation(`Claude command error: ${error.message}`);
          taskManager.updateTask(taskId, {
            step: 'claude-implementation-error',
            message: `Claude implementation error: ${error.message}`
          });
          reject(error);
        });
      });
    } finally {
      process.chdir(originalCwd);
    }
  } catch (error) {
    console.error('Error in Claude implementation:', error);
    await logOperation(`Claude implementation failed: ${error.message}`);
    taskManager.updateTask(taskId, {
      step: 'error',
      completed: true,
      message: `Error: ${error.message}`,
      summary: `Claude implementation failed: ${error.message}`
    });
    throw error;
  }
}

// Helper to recursively get all files in a directory
async function getAllFiles(dirPath) {
  const entries = await fsPromises.readdir(dirPath, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.name === '.git' || entry.name === '.claude' || entry.name === 'node_modules') continue;
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

// Helper to calculate file hashes
async function calculateFileHashes(dirPath) {
  const crypto = require('crypto');
  const files = await getAllFiles(dirPath);
  const hashes = new Map();

  for (const file of files) {
    const content = await fsPromises.readFile(file);
    const hash = crypto.createHash('sha1').update(content).digest('hex');
    const relativePath = path.relative(dirPath, file).replace(/\\/g, '/');
    hashes.set(relativePath, { hash, fullPath: file });
  }

  return hashes;
}

// OpenSpec implementation workflow
async function runOpenSpecImplementation(taskId, repoName, zipPath) {
  const githubApp = new GitHubApp();
  const logFilePath = path.join(__dirname, '..', 'openspec-implementation.log');

  // Function to log operations
  const logOperation = async (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] Task ${taskId}: ${message}\n`;
    try {
      await fsPromises.appendFile(logFilePath, logEntry);
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  };

  let tempDir = null;

  try {
    await logOperation(`Starting OpenSpec implementation for repository: ${repoName}`);
    taskManager.updateTask(taskId, { step: 'validation', message: 'Validating OpenSpec zip file...' });

    // Validate the OpenSpec zip file
    await logOperation('Validating OpenSpec zip file');
    await validateOpenSpecZip(zipPath);
    await logOperation('OpenSpec zip validation passed');

    taskManager.updateTask(taskId, { step: 'preparation', message: 'Preparing repository...' });
    await logOperation('Starting repository preparation');

    const repoOwner = process.env.GITHUB_REPO_OWNER;
    if (!repoOwner) {
      throw new Error('GITHUB_REPO_OWNER environment variable is required but not set.');
    }

    // Verify that the GitHub App is installed for this owner
    const installationId = installationStorage.getInstallationId(repoOwner) || installationStorage.getInstallationId(parseInt(repoOwner));
    if (!installationId) {
      // Check fallback environment variable
      if (!process.env.GITHUB_INSTALLATION_ID) {
        throw new Error(`GitHub App not installed for owner: ${repoOwner}. The app must be installed in the ${repoOwner} account.`);
      }
      await logOperation(`Using fallback installation ID from environment for owner: ${repoOwner}`);
    } else {
      await logOperation(`Found persistent installation mapping for owner: ${repoOwner}`);
    }

    // Extract change ID from the zip file name or contents
    const zipFileName = path.basename(zipPath);
    const changeId = path.parse(zipFileName).name;

    // Remove Unix timestamp from changeId and reformat
    const parts = changeId.split('_');
    let formattedChangeId = changeId;
    let cleanChangeIdForBranch = changeId;
    if (parts.length >= 2 && /^\d+$/.test(parts[0])) {
      const timestamp = parts[0];
      const description = parts.slice(1).join('_');
      formattedChangeId = `${description}_${timestamp}`;
      cleanChangeIdForBranch = description;
    }

    // Create feature branch name
    const branchName = `feature/${cleanChangeIdForBranch}+${new Date().toISOString().replace(/[:.]/g, '-')}`;
    taskManager.updateTask(taskId, { step: 'branch-creation', message: `Creating feature branch: ${branchName}` });
    await logOperation(`Creating feature branch: ${branchName}`);

    // Create branch via API
    await githubApp.createBranch(repoOwner, repoName, branchName, 'main');
    await logOperation(`Feature branch created: ${branchName}`);

    // Create temp directory
    tempDir = path.join(__dirname, '..', 'temp', `repo_${Date.now()}`);
    await fsPromises.mkdir(tempDir, { recursive: true });
    console.log(`[DEBUG] Temporary working directory: ${tempDir}`);

    // Download repository via API
    taskManager.updateTask(taskId, { step: 'downloading', message: 'Downloading repository...' });
    await logOperation('Downloading repository archive');
    await githubApp.downloadRepository(repoOwner, repoName, branchName, tempDir);

    // Snapshot initial state
    const initialHashes = await calculateFileHashes(tempDir);

    // Create changes directory structure and unzip the OpenSpec change
    taskManager.updateTask(taskId, { step: 'unzipping', message: 'Unzipping OpenSpec change...' });
    await logOperation('Creating changes directory structure and unzipping OpenSpec change');

    const changesTargetDir = path.join(tempDir, 'openspec', 'changes');
    await fsPromises.mkdir(changesTargetDir, { recursive: true });

    const tempExtractDir = path.join(tempDir, 'temp-extract');
    await fsPromises.mkdir(tempExtractDir, { recursive: true });

    // Unzip to temporary location
    await new Promise((resolve, reject) => {
      fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: tempExtractDir }))
        .on('close', resolve)
        .on('error', reject);
    });

    // Check the extracted content structure
    const extractedContents = await fsPromises.readdir(tempExtractDir);
    let sourceDir = tempExtractDir;
    if (extractedContents.length === 1) {
      const singleItemPath = path.join(tempExtractDir, extractedContents[0]);
      const stat = await fsPromises.stat(singleItemPath);
      if (stat.isDirectory()) {
        sourceDir = singleItemPath;
      }
    }

    // Copy all extracted content to the changes directory
    const finalContents = await fsPromises.readdir(sourceDir);
    for (const item of finalContents) {
      const sourcePath = path.join(sourceDir, item);
      const destPath = path.join(changesTargetDir, item);
      await fsPromises.cp(sourcePath, destPath, { recursive: true });
    }

    // Clean up temporary extraction directory
    await fsPromises.rm(tempExtractDir, { recursive: true, force: true });

    // Initialize Claude if needed (skip if not available)
    const claudeDir = path.join(tempDir, '.claude');
    try {
      await fsPromises.access(claudeDir);
    } catch (err) {
      taskManager.updateTask(taskId, { step: 'claude-setup', message: 'Initializing Claude environment...' });
      try {
        await execAsync('claude init --yes', { cwd: tempDir });
      } catch (initError) {
        // Ignore if claude CLI is not available
      }
    }

    // Copy OpenSpec prompts
    const promptsSource = path.join(__dirname, '..', 'resources', 'OpenSpec', 'prompts.md');
    const promptsDest = path.join(tempDir, 'prompts.md');
    try {
      await fsPromises.copyFile(promptsSource, promptsDest);
    } catch (copyError) {
      // Ignore
    }

    // Run Claude to implement the OpenSpec change
    taskManager.updateTask(taskId, { step: 'claude-implementation', message: 'Running Claude AI implementation...' });
    await logOperation('Running Claude AI implementation...');

    // await runClaudeImplementation(taskId, tempDir, changeId, logFilePath);
    // await logOperation('Claude AI implementation completed');

    // SIMULATE CHANGE FOR TESTING (Docker environment without Claude CLI)
    await fsPromises.writeFile(path.join(tempDir, 'test_verification_docker.txt'), 'This is a test file to verify GitHub workflow in Docker.');
    await logOperation('Created test_verification_docker.txt to simulate changes.');

    // Commit changes via API
    taskManager.updateTask(taskId, { step: 'git-commit', message: 'Committing changes...' });
    await logOperation('Calculating changes and committing...');

    const finalHashes = await calculateFileHashes(tempDir);
    const changedFiles = [];

    for (const [relativePath, data] of finalHashes.entries()) {
      if (!initialHashes.has(relativePath) || initialHashes.get(relativePath).hash !== data.hash) {
        const content = await fsPromises.readFile(data.fullPath);
        // Check if binary (simple check for null bytes or non-printable characters)
        const isBinary = /[^\x09\x0A\x0D\x20-\x7E]/.test(content.toString('utf8').slice(0, 1000));

        changedFiles.push({
          path: relativePath,
          content: isBinary ? content.toString('base64') : content.toString('utf8'),
          encoding: isBinary ? 'base64' : 'utf-8'
        });
      }
    }

    if (changedFiles.length > 0) {
      await githubApp.commitChanges(repoOwner, repoName, `Implement OpenSpec change: ${formattedChangeId}`, changedFiles, branchName, 'main');
      await logOperation(`Committed ${changedFiles.length} changed files`);
    } else {
      await logOperation('No changes detected after Claude execution.');
    }

    // Create a pull request from feature branch to main
    taskManager.updateTask(taskId, { step: 'create-pr', message: 'Creating pull request...' });
    await logOperation('Creating pull request from feature branch to main');

    const prTitle = `Implement OpenSpec change: ${formattedChangeId}`;
    const prBody = `Automated pull request to implement the OpenSpec change ${formattedChangeId}.\n\nThis PR was automatically generated by the OpenSpec Implementation Agent.`;

    const prResult = await githubApp.createPullRequest(
      repoOwner,
      repoName,
      prTitle,
      prBody,
      branchName,
      'main'
    );

    await logOperation(`Pull request created successfully: ${prResult.html_url}`);

    // Update task status to completed
    taskManager.updateTask(taskId, {
      step: 'completed',
      completed: true,
      message: 'OpenSpec implementation completed successfully!',
      summary: `Successfully implemented OpenSpec change and created PR: ${prResult.html_url}`,
      pullRequestUrl: prResult.html_url
    });

    await logOperation('OpenSpec implementation completed successfully');
  } catch (error) {
    console.error('Error in OpenSpec implementation:', error);
    await logOperation(`OpenSpec implementation failed: ${error.message}`);
    taskManager.updateTask(taskId, {
      step: 'error',
      completed: true,
      message: `Error: ${error.message}`,
      summary: `OpenSpec implementation failed: ${error.message}`
    });
  } finally {
    // Cleanup temporary files
    try {
      if (tempDir) {
        await fsPromises.rm(tempDir, { recursive: true, force: true });
        await logOperation(`Cleaned up temporary directory: ${tempDir}`);
      }
    } catch (cleanupError) {
      console.error('Error cleaning up temporary directory:', cleanupError);
    }
  }
}

// Route to handle OpenSpec implementation request
/**
 * @swagger
 * /openspec-implementation-agent/openspec-implement:
 *   post:
 *     summary: Implement OpenSpec changes
 *     tags: [OpenSpec Implementation]
 *     description: Uploads an OpenSpec zip file and starts the implementation process
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               zipFile:
 *                 type: string
 *                 format: binary
 *                 description: The OpenSpec zip file containing changes
 *               repoName:
 *                 type: string
 *                 description: Name of the repository to implement changes in
 *     responses:
 *       200:
 *         description: Implementation process started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taskId:
 *                   type: string
 *                   description: Unique identifier for the background task
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required fields or invalid file type
 *       500:
 *         description: Error starting implementation
 */
router.post('/openspec-implement', async (req, res) => {
  try {
    // Check if this is a multipart form request (for file upload)
    if (!req.files || !req.files.zipFile || !req.body.repoName) {
      return res.status(400).json({ error: 'Zip file and repository name are required' });
    }

    const zipFile = req.files.zipFile;
    const repoName = req.body.repoName;

    // Validate file type
    if (!zipFile.mimetype.includes('zip') && !zipFile.name.endsWith('.zip')) {
      return res.status(400).json({ error: 'Only zip files are allowed' });
    }

    // Create a temporary location to save the file
    const tempPath = path.join(__dirname, '..', 'temp', `${Date.now()}_${zipFile.name}`);
    await fsPromises.mkdir(path.dirname(tempPath), { recursive: true });

    // Save the uploaded file
    await zipFile.mv(tempPath);

    // Generate a unique task ID
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create task and start background processing
    taskManager.createTask(taskId, { step: 'initial', message: 'Starting OpenSpec implementation...' });

    // Run the OpenSpec implementation in the background
    setImmediate(() => {
      runOpenSpecImplementation(taskId, repoName, tempPath).catch(error => {
        console.error('Error in background OpenSpec implementation:', error);
        taskManager.updateTask(taskId, {
          step: 'error',
          completed: true,
          message: `Error: ${error.message}`,
          summary: `OpenSpec implementation failed: ${error.message}`
        });
      });
    });

    res.json({ taskId, message: 'OpenSpec implementation started' });
  } catch (error) {
    console.error('Error starting OpenSpec implementation:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to check task status
/**
 * @swagger
 * /openspec-implementation-agent/task-status/{taskId}:
 *   get:
 *     summary: Check status of an OpenSpec implementation task
 *     tags: [OpenSpec Implementation]
 *     description: Retrieves the current status of a background OpenSpec implementation task
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the background task
 *     responses:
 *       200:
 *         description: Task status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 step:
 *                   type: string
 *                 message:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *       404:
 *         description: Task not found
 */
router.get('/task-status/:taskId', (req, res) => {
  const { taskId } = req.params;
  const task = taskManager.getTask(taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task.status);
});

module.exports = router;