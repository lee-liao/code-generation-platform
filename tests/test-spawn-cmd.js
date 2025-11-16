const { spawn, exec } = require('child_process');
const path = require('path');

console.log('Testing direct Windows command execution for claude with longer timeout...\n');

const workingDir = 'D:\\MyCode\\AI\\Victoria\\project2\\tobedeleted';

// Check if the working directory exists
const fs = require('fs');
if (!fs.existsSync(workingDir)) {
    console.error(`Working directory does not exist: ${workingDir}`);
    // Create the directory if it doesn't exist
    fs.mkdirSync(workingDir, { recursive: true });
    console.log(`Created working directory: ${workingDir}`);
}

// Approach: Create a batch file and execute it - this mimics the exact working command
const batchContent = `@echo off
cd /d "${workingDir}"
claude -p --allow-dangerously-skip-permissions --permission-mode bypassPermissions "Read OpenSpec change id openspec/changes/add-snippet-web-assembly and implement it. After implemented, open the new created files to verify the requirements are fulfilled."
`;

const batchFilePath = path.join(__dirname, 'run_claude_command.bat');
fs.writeFileSync(batchFilePath, batchContent);

console.log(`Created batch file: ${batchFilePath}`);
console.log('Executing batch file with 5-minute timeout...');

// Execute the batch file
const childProcess = spawn('cmd', ['/c', batchFilePath], {
    stdio: ['pipe', 'pipe', 'pipe'], // Use pipes instead of inherit
    shell: false // Don't use shell since we're directly calling cmd
});

// Capture output
childProcess.stdout.on('data', (data) => {
    console.log(`Output: ${data.toString()}`);
});

childProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data.toString()}`);
});

// Set timeout to kill the process if it hangs (after 5 minutes)
const timeoutId = setTimeout(() => {
    console.log('Process timeout reached (5 minutes), terminating...');
    if (!childProcess.killed) {
        childProcess.kill();
    }
}, 300000); // 5 minutes = 300,000 milliseconds

childProcess.on('close', (code) => {
    clearTimeout(timeoutId); // Clear the timeout when process closes
    console.log(`Batch process exited with code ${code}`);
    
    // Clean up the batch file
    try {
        fs.unlinkSync(batchFilePath);
        console.log('Cleaned up batch file');
    } catch (e) {
        console.error('Failed to clean up batch file:', e.message);
    }
    
    if (code === null) {
        console.log('Process was terminated by timeout or signal');
    } else {
        console.log('Process completed normally');
    }
});

childProcess.on('error', (error) => {
    clearTimeout(timeoutId); // Clear the timeout on error
    console.error('Spawn error:', error.message);
});

// Verify the command exists
try {
    const checkCmd = spawn('cmd', ['/c', 'where claude'], {
        stdio: 'pipe',
        cwd: workingDir
    });

    let output = '';
    checkCmd.stdout.on('data', (data) => {
        output += data.toString();
    });

    checkCmd.on('close', (code) => {
        if (code === 0) {
            console.log(`Claude CLI found at: ${output.trim()}`);
        } else {
            console.log('Claude CLI not found in PATH');
        }
    });
} catch (e) {
    console.error('Command check failed:', e.message);
}