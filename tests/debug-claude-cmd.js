const { spawn } = require('child_process');
const path = require('path');

console.log('Testing Claude command exactly as used in the program...');

// Test 1: Using cmd /c approach (as in our program)
console.log('\n=== Test 1: Using cmd /c (current program approach) ===');
const testDir = 'D:\\MyCode\\AI\\Victoria\\project2\\tobedeleted';

const childProcess1 = spawn('cmd', ['/c', 'claude -p --permission-mode bypassPermissions "Read OpenSpec change id openspec/changes/add-snippet-web-assembly and implement it. After implemented, open the new created files to verify the requirements are fulfilled."'], {
    cwd: testDir,
    stdio: ['ignore', 'pipe', 'pipe'], // Ignore stdin to prevent hanging
    windowsHide: true
});

let stdout1 = '';
let stderr1 = '';

childProcess1.stdout.on('data', (data) => {
    stdout1 += data.toString();
    console.log(`STDOUT: ${data.toString()}`);
});

childProcess1.stderr.on('data', (data) => {
    stderr1 += data.toString();
    console.error(`STDERR: ${data.toString()}`);
});

childProcess1.on('close', (code) => {
    console.log(`\nProcess 1 closed with code: ${code}`);
    console.log(`Final output length: ${stdout1.length} characters`);
    console.log(`Command worked: ${stdout1.includes('Implementation Complete')}`);
});

childProcess1.on('error', (error) => {
    console.error('Process 1 error:', error.message);
});

// Set timeout to prevent hanging
setTimeout(() => {
    if (!childProcess1.killed) {
        console.log('\nProcess 1 timeout reached');
        childProcess1.kill();
    }
}, 15000);

// Test 2: Try with shell: true approach
setTimeout(() => {
    console.log('\n=== Test 2: Using shell: true approach ===');
    const childProcess2 = spawn('claude', [
        '-p', 
        '--permission-mode', 
        'bypassPermissions', 
        'Read OpenSpec change id openspec/changes/add-snippet-web-assembly and implement it. After implemented, open the new created files to verify the requirements are fulfilled.'
    ], {
        cwd: testDir,
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
    });

    let stdout2 = '';
    let stderr2 = '';

    childProcess2.stdout.on('data', (data) => {
        stdout2 += data.toString();
        console.log(`STDOUT2: ${data.toString()}`);
    });

    childProcess2.stderr.on('data', (data) => {
        stderr2 += data.toString();
        console.error(`STDERR2: ${data.toString()}`);
    });

    childProcess2.on('close', (code) => {
        console.log(`\nProcess 2 closed with code: ${code}`);
        console.log(`Final output length: ${stdout2.length} characters`);
        console.log(`Command worked: ${stdout2.includes('Implementation Complete')}`);
    });

    childProcess2.on('error', (error) => {
        console.error('Process 2 error:', error.message);
    });

    // Set timeout to prevent hanging
    setTimeout(() => {
        if (!childProcess2.killed) {
            console.log('\nProcess 2 timeout reached');
            childProcess2.kill();
        }
    }, 15000);

}, 2000);