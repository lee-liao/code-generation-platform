const { spawn } = require('child_process');

// Test the exact fix needed for the spawn issue in the original workflow
console.log('Testing the exact fix for spawn in codebase-generation.js...\n');

// Original failing approach
console.log('Test 1: Original approach (will fail on Windows)');
try {
    const claudeCommand = 'claude --version';
    const [cmd, ...args] = claudeCommand.split(' ');
    
    const childProcess = spawn(cmd, args);
    
    let stdout = '';
    let stderr = '';
    
    childProcess.stdout.on('data', (data) => {
        stdout += data.toString();
    });
    
    childProcess.stderr.on('data', (data) => {
        stderr += data.toString();
    });
    
    childProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        if (code === 0) {
            console.log(`Output: ${stdout}`);
        } else {
            console.log(`Failed with stderr: ${stderr}`);
        }
    });
} catch (e) {
    console.error('Original approach failed:', e.message);
}

console.log('\n' + '='.repeat(50) + '\n');

// Fixed approach with shell: true
console.log('Test 2: Fixed approach with shell: true (Windows solution)');
try {
    const claudeCommand = 'claude --version';
    const [cmd, ...args] = claudeCommand.split(' ');
    
    const childProcess = spawn(cmd, args, {
        shell: true  // This is the fix needed for Windows
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
        console.log(`Child process exited with code ${code}`);
        if (code === 0) {
            console.log(`Fixed output: ${stdout}`);
            console.log('✓ SUCCESS: The fix works!');
        } else {
            console.log(`Failed with stderr: ${stderr}`);
            console.log('✗ FAILED: Even the fix did not work');
        }
    });
    
    childProcess.on('error', (error) => {
        console.error('Spawn error:', error.message);
    });
} catch (e) {
    console.error('Fixed approach failed:', e.message);
}