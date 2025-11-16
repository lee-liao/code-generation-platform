const { spawn } = require('child_process');

console.log('Final test to confirm the exact issue with timeout and process completion...\n');

console.log('Testing the exact configuration we plan to use in the routes file:');

const startTime = Date.now();

const childProcess = spawn('cmd', ['/c', 'claude --version'], {
    stdio: ['ignore', 'pipe', 'pipe'], // Ignore stdin to prevent hanging
    windowsHide: true
});

let stdout = '';
let stderr = '';

childProcess.stdout.on('data', (data) => {
    stdout += data.toString();
    console.log(`STDOUT: ${data.toString()}`);
});

childProcess.stderr.on('data', (data) => {
    stderr += data.toString();
    console.log(`STDERR: ${data.toString()}`);
});

childProcess.on('close', (code) => {
    const duration = Date.now() - startTime;
    console.log(`Process completed successfully in ${duration}ms with exit code: ${code}`);
    console.log('This shows the process completed BEFORE any timeout could interfere.');
    
    if (code === 0) {
        console.log(`Command output: ${stdout.trim() || stderr.trim()}`);
    }
});

childProcess.on('error', (error) => {
    console.error('Spawn error:', error.message);
});

// Set timeout to see if it interferes
setTimeout(() => {
    if (!childProcess.killed) {
        console.log('Timeout reached, but process may have already completed.');
    } else {
        console.log('Process was already killed by timeout.');
    }
}, 5000); // 5 second timeout