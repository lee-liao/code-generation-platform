const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

console.log('Test to simulate the exact Promise-based workflow from routes...');

// Simulate the environment variables
const environment = { ...process.env };

function simulateLogOperation(message) {
    console.log(`[LOG] ${message}`);
}

function simulateTaskManagerUpdate(taskId, status) {
    console.log(`[TASK] ${taskId}: ${JSON.stringify(status)}`);
}

// Test the Promise-based approach used in the routes file
function testPromiseWorkflow() {
    const taskId = `test_task_${Date.now()}`;
    const newProjectPath = process.cwd(); // Use current directory for test
    const claudeCommand = 'claude --version';
    const verboseLogging = false;

    simulateTaskManagerUpdate(taskId, { step: 'claude-processing', message: 'Running Claude AI processing...' });

    return new Promise((resolve, reject) => {
        console.log('\nStarting the Promise-based spawn operation...');

        const childProcess = spawn('cmd', ['/c', 'claude --version'], {
            cwd: newProjectPath,
            env: environment,
            stdio: ['ignore', 'pipe', 'pipe'], // Ignore stdin to prevent hanging
            windowsHide: true
        });

        simulateTaskManagerUpdate(taskId, {
            pid: childProcess.pid,
            status: 'running',
            startTime: new Date()
        });

        let stdout = '';
        let stderr = '';

        childProcess.stdout.on('data', (data) => {
            stdout += data.toString();
            console.log(`STDOUT: ${data.toString().trim()}`);
        });

        childProcess.stderr.on('data', (data) => {
            stderr += data.toString();
            console.error(`STDERR: ${data.toString().trim()}`);
        });

        childProcess.on('close', (code) => {
            console.log(`\nProcess closed with code: ${code}`);
            simulateTaskManagerUpdate(taskId, {
                pid: childProcess.pid,
                status: 'completed',
                exitCode: code,
                endTime: new Date()
            });

            if (code === 0) {
                // Save Claude output to file
                let outputContent = `Stdout:\n${stdout}\n\nStderr:\n${stderr}\n\nCommand executed: ${claudeCommand}\nExit code: ${code}`;
                if (verboseLogging) {
                    outputContent += '\nVerbose logging was enabled (ANTHROPIC_LOG=debug)';
                }
                
                const outputPath = path.join(newProjectPath, 'test-claude-output.txt');
                fs.writeFile(outputPath, outputContent)
                    .then(() => {
                        simulateLogOperation('Claude AI processing completed. Output saved to test-claude-output.txt');
                        console.log('\n✅ Promise resolved successfully!');
                        resolve();
                    })
                    .catch(writeErr => {
                        simulateLogOperation(`Failed to write Claude output: ${writeErr.message}`);
                        console.log('\n❌ Promise rejected due to file write error!');
                        reject(writeErr);
                    });
            } else {
                let errorOutput = `Stdout:\n${stdout}\n\nStderr:\n${stderr}\n\nCommand executed: ${claudeCommand}\nExit code: ${code}`;
                if (verboseLogging) {
                    errorOutput += '\nVerbose logging was enabled (ANTHROPIC_LOG=debug)';
                }
                console.log('\n❌ Promise rejected due to command failure!');
                const error = new Error(`Claude command failed with exit code ${code}.\nOutput: ${errorOutput}`);
                reject(error);
            }
        });

        childProcess.on('error', (error) => {
            simulateTaskManagerUpdate(taskId, {
                pid: childProcess.pid,
                status: 'error',
                error: error.message,
                endTime: new Date()
            });
            console.log('\n❌ Promise rejected due to spawn error!');
            reject(error);
        });

        // Set shorter timeout for testing
        setTimeout(() => {
            if (!childProcess.killed) {
                console.log('\n⏰ TIMEOUT: Process still running, killing it...');
                childProcess.kill();
                simulateTaskManagerUpdate(taskId, {
                    pid: childProcess.pid,
                    status: 'killed-by-timeout',
                    endTime: new Date()
                });
                const timeoutError = new Error('Claude AI processing timed out after 5 seconds. Process was terminated.');
                console.log('\n❌ Promise rejected due to timeout!');
                reject(timeoutError);
            }
        }, 5000); // 5 second timeout for testing
    });
}

// Execute the test
testPromiseWorkflow()
    .then(() => {
        console.log('\n🎉 Test completed successfully - Promise resolved!');
    })
    .catch(error => {
        console.log(`\n💥 Test failed - Promise rejected: ${error.message}`);
    });