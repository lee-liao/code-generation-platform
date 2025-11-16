const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

console.log('Final test with cleared timeout to prevent race conditions...');

// Simulate the environment variables
const environment = { ...process.env };

function simulateLogOperation(message) {
    console.log(`[LOG] ${message}`);
}

function simulateTaskManagerUpdate(taskId, status) {
    console.log(`[TASK] ${taskId}: ${JSON.stringify(status)}`);
}

// Test the fixed Promise-based approach with cleared timeout
function testFixedPromiseWorkflow() {
    const taskId = `test_task_${Date.now()}`;
    const newProjectPath = process.cwd(); // Use current directory for test
    const claudeCommand = 'claude --version';
    const verboseLogging = false;

    simulateTaskManagerUpdate(taskId, { step: 'claude-processing', message: 'Running Claude AI processing...' });

    return new Promise((resolve, reject) => {
        console.log('\nStarting the FIXED Promise-based spawn operation with cleared timeout...');

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

        // Set timeout to kill the process if it takes too long
        const timeoutId = setTimeout(() => {
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

        childProcess.on('close', (code) => {
            // CRITICAL FIX: Clear the timeout since the process has already completed
            clearTimeout(timeoutId);
            
            console.log(`\nProcess closed with code: ${code} - timeout cleared, no race condition!`);
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
                
                const outputPath = path.join(newProjectPath, 'test-claude-output-fixed.txt');
                fs.writeFile(outputPath, outputContent)
                    .then(() => {
                        simulateLogOperation('Claude AI processing completed. Output saved to test-claude-output-fixed.txt');
                        console.log('\n✅ Promise resolved successfully - no timeout interference!');
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
            // Clear the timeout since the process has erred
            clearTimeout(timeoutId);
            
            simulateTaskManagerUpdate(taskId, {
                pid: childProcess.pid,
                status: 'error',
                error: error.message,
                endTime: new Date()
            });
            console.log('\n❌ Promise rejected due to spawn error!');
            reject(error);
        });
    });
}

// Execute the test
testFixedPromiseWorkflow()
    .then(() => {
        console.log('\n🎉 Fixed test completed successfully - No race condition! Promise resolved!');
    })
    .catch(error => {
        console.log(`\n💥 Fixed test failed - Promise rejected: ${error.message}`);
    });

console.log('\n⏳ Waiting to see if timeout executes after successful completion...');