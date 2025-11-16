const express = require('express');
const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');
const { GitHubApp } = require('../github-app');

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
      processInfo: null, // Store process info for the task
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

// Validate inputs
async function validateInputs(projectFolder, repoName, githubApp) {
  // Verify project folder exists
  try {
    await fs.access(projectFolder);
  } catch {
    throw new Error(`Project folder does not exist: ${projectFolder}`);
  }

  // Verify there isn't already a folder with repo name as sibling
  const parentDir = path.dirname(projectFolder);
  const siblingRepoPath = path.join(parentDir, repoName);
  console.log(`Checking for existing sibling directory: ${siblingRepoPath}`); // Debug log
  try {
    await fs.access(siblingRepoPath);
    console.log(`Found existing directory: ${siblingRepoPath}`); // Debug log
    throw new Error(`Directory already exists: ${siblingRepoPath}`);
  } catch (accessError) {
    console.log(`Directory does not exist or access error: ${siblingRepoPath}`, accessError.message); // Debug log
    // Directory doesn't exist, which is what we want
  }

  // Verify there isn't already a repository with this name in user's GitHub
  try {
    console.log(`Checking for existing GitHub repository: ${repoName}`); // Debug log
    const repoExists = await checkRepoExists(repoName, githubApp);
    if (repoExists) {
      console.log(`Found existing GitHub repository: ${repoName}`); // Debug log
      throw new Error(`Repository already exists on GitHub: ${repoName}`);
    }
    console.log(`GitHub repository does not exist: ${repoName}`); // Debug log
  } catch (error) {
    console.log(`Error checking GitHub repository: ${repoName}`, error.message); // Debug log
    throw new Error(`Error checking repository existence: ${error.message}`);
  }
}

async function checkRepoExists(repoName, githubApp) {
  // Try to get the repository to see if it exists
  try {
    // For this check we'll assume we're using the current user's account
    // In practice, this would need to be configured
    await githubApp.getRepository(process.env.GITHUB_USERNAME || 'lee-liao', repoName);
    return true;
  } catch (error) {
    // If we get an error, the repo likely doesn't exist
    // GitHub returns 404 for non-existent repos
    if (error.status === 404) {
      return false;
    }
    // Re-throw other errors
    throw error;
  }
}

// Background codebase generation task
async function runCodebaseGeneration(taskId, projectFolder, repoName, repoDescription, snippetsPath, verboseLogging = false) {
  const githubApp = new GitHubApp();
  const logFilePath = path.join(__dirname, '..', 'codebase-generation.log');
  
  // Function to log operations
  const logOperation = async (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] Task ${taskId}: ${message}\n`;
    try {
      await fs.appendFile(logFilePath, logEntry);
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  };
  
  try {
    await logOperation('Starting codebase generation task');
    taskManager.updateTask(taskId, { step: 'validation', message: 'Validating inputs...' });
    
    // Validate inputs
    await logOperation('Validating inputs');
    await validateInputs(projectFolder, repoName, githubApp);
    await logOperation('Input validation passed');
    
    taskManager.updateTask(taskId, { step: 'copying', message: 'Copying project template...' });
    await logOperation('Copying project template from ' + projectFolder + ' to ' + path.join(path.dirname(projectFolder), repoName));
    
    // Copy project folder to new location
    const parentDir = path.dirname(projectFolder);
    const newProjectPath = path.join(parentDir, repoName);
    await copyDirectory(projectFolder, newProjectPath);
    
    taskManager.updateTask(taskId, { step: 'claude-processing', message: 'Skipping Claude AI processing (commented out for testing)...' });
    await logOperation('Skipping Claude AI processing for testing Git/GitHub workflow');
    
    // COMMENTED OUT CLAUDE PROCESSING FOR TESTING THE GIT/GITHUB WORKFLOW FIRST
    // When Claude is ready, uncomment the code below
    /*
    // Run Claude command in the new directory
    const claudeCommand = `claude -p --permission-mode bypassPermissions "Read OpenSpec change id add-snippet-web-assembly and implement it. After implemented, open the new created files to verify the requirements are fulfilled."`;
    
    // Change to the new project directory to run the command
    const originalCwd = process.cwd();
    try {
      process.chdir(newProjectPath);
      
      try {
        // Check if Claude CLI is available before attempting to run
        const { execSync } = require('child_process');
        execSync('where claude', { stdio: 'pipe', shell: true });
        
        // Claude CLI is available, proceed with the command
        // Split command and arguments for spawn
        const [cmd, ...args] = claudeCommand.split(' ');
        
        // Set environment based on verbose logging setting
        const environment = { ...process.env, GITHUB_USERNAME: process.env.GITHUB_USERNAME };
        if (verboseLogging) {
          environment.ANTHROPIC_LOG = 'debug';
        }
        
        return new Promise((resolve, reject) => {
          const childProcess = spawn(cmd, args, {
            cwd: newProjectPath,
            env: environment
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
          
          childProcess.on('close', (code) => {
            taskManager.updateProcessInfo(taskId, {
              pid: childProcess.pid,
              status: 'completed',
              exitCode: code,
              endTime: new Date()
            });
            
            if (code === 0) {
              // Save Claude output to file
              let outputContent = `Stdout:\\n${stdout}\\n\\nStderr:\\n${stderr}\\n\\nCommand executed: ${claudeCommand}\\nExit code: ${code}`;
              if (verboseLogging) {
                outputContent += '\\nVerbose logging was enabled (ANTHROPIC_LOG=debug)';
              }
              fs.writeFile(path.join(newProjectPath, 'claude output.txt'), outputContent)
                .then(() => {
                  logOperation('Claude AI processing completed. Output saved to claude output.txt');
                  resolve();
                })
                .catch(writeErr => reject(writeErr));
            } else {
              let errorOutput = `Stdout:\\n${stdout}\\n\\nStderr:\\n${stderr}\\n\\nCommand executed: ${claudeCommand}\\nExit code: ${code}`;
              if (verboseLogging) {
                errorOutput += '\\nVerbose logging was enabled (ANTHROPIC_LOG=debug)';
              }
              const error = new Error(`Claude command failed with exit code ${code}.\\nOutput: ${errorOutput}`);
              reject(error);
            }
          });
          
          childProcess.on('error', (error) => {
            taskManager.updateProcessInfo(taskId, {
              pid: childProcess.pid,
              status: 'error',
              error: error.message,
              endTime: new Date()
            });
            reject(error);
          });
          
          // Set timeout to kill the process if it takes too long
          setTimeout(() => {
            if (!childProcess.killed) {
              childProcess.kill();
              taskManager.updateProcessInfo(taskId, {
                pid: childProcess.pid,
                status: 'killed-by-timeout',
                endTime: new Date()
              });
              reject(new Error('Claude AI processing timed out after 5 minutes. Process was terminated.'));
            }
          }, 300000); // 5 minute timeout
        });
      } catch (error) {
        // Claude CLI is not available, log and create a placeholder output
        await logOperation('Claude CLI not found on system. Skipping Claude processing.');
        
        // Create a placeholder output file to indicate that Claude was skipped
        let outputContent = `Claude AI processing was skipped because Claude CLI is not installed or not in PATH.

Command that would have been executed: ${claudeCommand}

To enable Claude processing, please install Claude CLI from Anthropic.`;
        if (verboseLogging) {
          outputContent += '\\nVerbose logging was enabled but Claude CLI not available.';
        }
        await fs.writeFile(path.join(newProjectPath, 'claude output.txt'), outputContent);
        
        return; // Skip Claude processing but continue with the rest of the workflow
      }
    } finally {
      process.chdir(originalCwd);
    }
    */
    
    // Create a placeholder output file to maintain workflow consistency
    const placeholderClaudeCommand = `claude -p --permission-mode bypassPermissions \"Read OpenSpec change id add-snippet-web-assembly and implement it. After implemented, open the new created files to verify the requirements are fulfilled.\"`;
    let outputContent = 'Claude AI processing was skipped for testing.\\n\\nCommand that would have been executed: ' + placeholderClaudeCommand;
    if (verboseLogging) {
      outputContent += '\\nVerbose logging was enabled but Claude processing skipped for testing.';
    }
    await fs.writeFile(path.join(newProjectPath, 'claude output.txt'), outputContent);
    
    taskManager.updateTask(taskId, { step: 'git-setup', message: 'Setting up Git repository...' });
    await logOperation('Setting up Git repository');
    
    // Initialize Git repository and push to GitHub
    await setupGitAndPush(taskId, newProjectPath, repoName, repoDescription, githubApp);
    await logOperation(`Git setup completed and pushed to GitHub repository: ${repoName}`);
    
    taskManager.updateTask(taskId, { 
      step: 'completed', 
      completed: true, 
      message: 'Codebase generation completed successfully!',
      summary: `Successfully created repository ${repoName} with generated code.`
    });
    await logOperation('Codebase generation completed successfully');
  } catch (error) {
    console.error('Error in codebase generation:', error);
    await logOperation(`Codebase generation failed: ${error.message}`);
    taskManager.updateTask(taskId, { 
      step: 'error', 
      completed: true, 
      message: `Error: ${error.message}`,
      summary: `Codebase generation failed: ${error.message}`
    });
  }
}

async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function setupGitAndPush(taskId, projectPath, repoName, repoDescription, githubApp) {
  const username = process.env.GITHUB_USERNAME || 'lee-liao';
  
  taskManager.updateTask(taskId, { step: 'github-create-repo', message: 'Creating GitHub repository...' });
  
  // Create repository on GitHub
  const repo = await githubApp.createRepository(username, repoName, repoDescription, false);
  
  taskManager.updateTask(taskId, { step: 'git-init', message: 'Initializing local Git repository...' });
  
  // Initialize git repo in the project directory
  await execAsync('git init', { cwd: projectPath });
  await execAsync('git checkout -b main', { cwd: projectPath });
  
  taskManager.updateTask(taskId, { step: 'git-add-commit', message: 'Adding and committing files...' });
  
  // Add and commit all files
  await execAsync('git add .', { cwd: projectPath });
  await execAsync('git config user.email "action@github.com"', { cwd: projectPath });
  await execAsync('git config user.name "GitHub Action"', { cwd: projectPath });
  await execAsync('git commit -m "Initial commit: Generated codebase"', { cwd: projectPath });
  
  taskManager.updateTask(taskId, { step: 'git-remote', message: 'Setting up Git remote...' });
  
  // Add remote origin and push
  const remoteUrl = `https://github.com/${username}/${repoName}.git`;
  await execAsync(`git remote add origin ${remoteUrl}`, { cwd: projectPath });
  
  taskManager.updateTask(taskId, { step: 'git-push', message: 'Pushing to GitHub...' });
  
  await execAsync('git push -u origin main', { cwd: projectPath });
}

// Route to start codebase generation
router.post('/generate-codebase', async (req, res) => {
  try {
    const { projectFolder, repoName, repoDescription, verboseLogging } = req.body;
    
    // Validate required fields
    if (!projectFolder || !repoName) {
      return res.status(400).send('Project folder and repository name are required');
    }
    
    // Generate a unique task ID
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create task and start background processing
    taskManager.createTask(taskId, { step: 'initial', message: 'Starting codebase generation...' });
    
    // Run the codebase generation in the background
    const snippetsPath = process.env.SNIPPETS_PATH || 'D:\\MyCode\\AI\\Victoria\\project2\\snippets';
    // Use setImmediate to ensure the task runs asynchronously without blocking the response
    setImmediate(() => {
      runCodebaseGeneration(taskId, projectFolder, repoName, repoDescription, snippetsPath, verboseLogging);
    });
    
    res.json({ taskId });
  } catch (error) {
    console.error('Error starting codebase generation:', error);
    res.status(500).send(error.message);
  }
});

// Route to check task status
router.get('/task-status/:taskId', (req, res) => {
  const { taskId } = req.params;
  const task = taskManager.getTask(taskId);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.json(task.status);
});

// Endpoint to kill a process by PID
router.post('/kill-process/:taskId', (req, res) => {
  const { taskId } = req.params;
  const task = taskManager.getTask(taskId);
  
  if (!task || !task.processInfo || !task.processInfo.pid) {
    return res.status(404).json({ error: 'Task or process not found' });
  }
  
  const { pid } = task.processInfo;
  
  try {
    // Check if process exists and kill it
    process.kill(pid, 'SIGTERM');
    
    // Update task status
    taskManager.updateProcessInfo(taskId, {
      ...task.processInfo,
      status: 'killed-by-user',
      killedAt: new Date()
    });
    
    res.json({ 
      success: true, 
      message: `Process ${pid} terminated successfully`,
      pid: pid 
    });
  } catch (error) {
    // Process might have already been terminated
    if (error.code === 'ESRCH') {
      // Process doesn't exist, update status anyway
      taskManager.updateProcessInfo(taskId, {
        ...task.processInfo,
        status: 'already-terminated',
        killedAt: new Date()
      });
      
      res.json({ 
        success: true, 
        message: `Process ${pid} was already terminated`,
        pid: pid 
      });
    } else {
      res.status(500).json({ 
        error: `Failed to terminate process ${pid}: ${error.message}` 
      });
    }
  }
});

module.exports = router;