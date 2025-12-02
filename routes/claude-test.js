const express = require('express');
const { spawn, execSync } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// Task manager for tracking command execution
const commandTasks = new Map();

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

  getTask(taskId) {
    return this.tasks.get(taskId);
  }
}

const taskManager = new TaskManager();

async function runClaudeCommandTest(taskId, workingDir) {
  const logOperation = async (message) => {
    console.log(`[Claude Test ${taskId}]: ${message}`);
  };

  try {
    await logOperation(`Starting Claude command test in directory: ${workingDir}`);
    taskManager.updateTask(taskId, { step: 'initial', message: 'Preparing Claude command...' });

    // Verify working directory exists
    try {
      await fs.access(workingDir);
      await logOperation('Working directory exists');
    } catch (error) {
      throw new Error(`Working directory does not exist: ${workingDir}`);
    }

    // Define the Claude command
    const claudeCommand = 'claude -p --permission-mode bypassPermissions "Read OpenSpec change id openspec/changes/add-snippet-web-assembly and implement it. After implemented, open the new created files to verify the requirements are fulfilled."';

    // Set up enhanced environment to find Claude CLI
    let environment = { ...process.env };
    let claudeAvailable = false;

    // Test different approaches to find Claude CLI
    const testClaudeAvailability = async (env) => {
      try {
        execSync('cmd /c claude --version', {
          stdio: 'pipe',
          env: env,
          cwd: workingDir
        });
        return true;
      } catch (error) {
        // Try with expanded PATH
        const enhancedEnv = {
          ...env,
          PATH: `${process.env.PATH || ''};${process.env.USERPROFILE || process.env.HOMEPATH}\\AppData\\Roaming\\npm;D:\\Users\\liao_\\AppData\\Roaming\\npm;C:\\Users\\%USERNAME%\\AppData\\Roaming\\npm`
        };

        try {
          execSync('cmd /c claude --version', {
            stdio: 'pipe',
            env: enhancedEnv,
            cwd: workingDir
          });
          // Update environment with enhanced PATH
          environment = enhancedEnv;
          return true;
        } catch (secondError) {
          // Try direct path approach
          try {
            execSync('cmd /c "D:\\Users\\liao_\\AppData\\Roaming\\npm\\claude.cmd" --version', {
              stdio: 'pipe',
              env: env,
              cwd: workingDir
            });
            // Update environment with Claude directory in PATH
            environment = {
              ...env,
              PATH: `D:\\Users\\liao_\\AppData\\Roaming\\npm;${process.env.PATH || ''}`
            };
            return true;
          } catch (directError) {
            return false;
          }
        }
      }
    };

    claudeAvailable = await testClaudeAvailability(environment);

    if (!claudeAvailable) {
      throw new Error('Claude CLI not found after all attempts');
    }

    await logOperation('Claude CLI found, starting command execution...');
    taskManager.updateTask(taskId, { step: 'executing', message: 'Running Claude command...' });

    // Execute the Claude command
    return new Promise((resolve, reject) => {
      const childProcess = spawn('cmd', ['/c', claudeCommand], {
        cwd: workingDir,
        env: environment,
        stdio: ['ignore', 'pipe', 'pipe'], // Ignore stdin to prevent hanging
        windowsHide: true
      });

      // Track the process
      taskManager.updateTask(taskId, {
        step: 'executing',
        message: 'Claude command is running...',
        processInfo: {
          pid: childProcess.pid,
          startTime: new Date()
        }
      });

      let stdout = '';
      let stderr = '';

      childProcess.stdout.on('data', (data) => {
        stdout += data.toString();
        console.log(`Claude stdout: ${data.toString()}`);
      });

      childProcess.stderr.on('data', (data) => {
        stderr += data.toString();
        console.error(`Claude stderr: ${data.toString()}`);
      });

      // Set a longer timeout (5 minutes) for Claude to complete
      const timeoutId = setTimeout(() => {
        if (!childProcess.killed) {
          childProcess.kill();
          const timeoutError = new Error('Claude command timed out after 5 minutes');
          taskManager.updateTask(taskId, {
            step: 'timeout',
            completed: true,
            message: 'Command timed out',
            error: timeoutError.message
          });
          reject(timeoutError);
        }
      }, 300000); // 5 minutes

      childProcess.on('close', (code) => {
        clearTimeout(timeoutId); // Clear timeout since process completed

        // Create output content
        const outputContent = `Stdout:\n${stdout}\n\nStderr:\n${stderr}\n\nCommand executed: ${claudeCommand}\nExit code: ${code}`;

        // Write output to file in the working directory
        const outputPath = path.join(workingDir, 'claude output.txt');
        fs.writeFile(outputPath, outputContent)
          .then(() => {
            logOperation(`Claude output written to: ${outputPath}`);

            taskManager.updateTask(taskId, {
              step: 'completed',
              completed: true,
              message: `Command completed with exit code: ${code}`,
              exitCode: code,
              outputFilePath: outputPath,
              endTime: new Date()
            });

            resolve({
              success: true,
              exitCode: code,
              outputFilePath: outputPath
            });
          })
          .catch(writeError => {
            logOperation(`Failed to write output file: ${writeError.message}`);
            reject(writeError);
          });
      });

      childProcess.on('error', (error) => {
        clearTimeout(timeoutId); // Clear timeout on error
        logOperation(`Claude command error: ${error.message}`);

        taskManager.updateTask(taskId, {
          step: 'error',
          completed: true,
          message: `Command error: ${error.message}`,
          error: error.message
        });

        reject(error);
      });
    });
  } catch (error) {
    console.error('Error in Claude command test:', error);
    taskManager.updateTask(taskId, {
      step: 'error',
      completed: true,
      message: `Test failed: ${error.message}`,
      error: error.message
    });
    throw error;
  }
}

// Route to start the Claude command test
/**
 * @swagger
 * /claude-test/test-claude-command:
 *   post:
 *     summary: Test Claude CLI command execution
 *     tags: [Claude Test]
 *     description: Runs a test command using the Claude CLI to verify availability and functionality
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workingDir:
 *                 type: string
 *                 description: Directory where the test command should run
 *                 example: "D:/temp/test-dir"
 *     responses:
 *       200:
 *         description: Test started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taskId:
 *                   type: string
 *                   description: Unique identifier for the test task
 *                 workingDir:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing working directory
 *       500:
 *         description: Error starting test
 */
router.post('/test-claude-command', async (req, res) => {
  try {
    const { workingDir } = req.body;

    if (!workingDir) {
      return res.status(400).json({ error: 'Working directory is required' });
    }

    // Generate a unique task ID
    const taskId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log(`[Task Creation] Creating task with ID: ${taskId}`);

    // Create task and start background processing
    taskManager.createTask(taskId, { step: 'initial', message: 'Starting Claude command test...' });
    console.log(`[Task Creation] Task created, available tasks now:`, Array.from(taskManager.tasks.keys()));

    // Run the Claude command in the background
    setImmediate(() => {
      console.log(`[Task Execution] Starting Claude command test for task: ${taskId}`);
      runClaudeCommandTest(taskId, workingDir);
    });

    res.json({ taskId, workingDir, message: 'Claude command test started' });
  } catch (error) {
    console.error('Error starting Claude command test:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to check task status
/**
 * @swagger
 * /claude-test/task-status/{taskId}:
 *   get:
 *     summary: Check status of a Claude test task
 *     tags: [Claude Test]
 *     description: Retrieves the current status of a background Claude test task
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the test task
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
  console.log(`[Status Check] Requested task: ${taskId}`);
  console.log(`[Status Check] Available tasks:`, Array.from(taskManager.tasks.keys()));

  const task = taskManager.getTask(taskId);

  if (!task) {
    console.log(`[Status Check] Task ${taskId} not found in task manager`);
    return res.status(404).json({ error: 'Task not found', taskId: taskId, availableTasks: Array.from(taskManager.tasks.keys()) });
  }

  console.log(`[Status Check] Task ${taskId} found with status:`, task.status);
  res.json(task.status);
});

// Serve the test HTML page
/**
 * @swagger
 * /claude-test/claude-test:
 *   get:
 *     summary: Get Claude test page
 *     tags: [Claude Test]
 *     description: Serves the HTML page for testing Claude CLI functionality
 *     responses:
 *       200:
 *         description: HTML page served successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/claude-test', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'tests', 'claude-test.html'));
});

module.exports = router;