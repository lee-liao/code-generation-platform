const { spawn } = require('child_process');

console.log('Testing different approaches to execute the Claude command...');

const testDir = 'D:\\MyCode\\AI\\Victoria\\project2\\tobedeleted';

// Test: Using the exact same command that worked manually
console.log('\n=== Test: Exact working command ===');
const childProcess = spawn('cmd.exe', ['/s', '/c', 'claude -p --permission-mode bypassPermissions "Read OpenSpec change id openspec/changes/add-snippet-web-assembly and implement it. After implemented, open the new created files to verify the requirements are fulfilled."'], {
    cwd: testDir,
    stdio: ['pipe', 'pipe', 'pipe'], // Try with pipe instead of ignore
    windowsVerbatimArguments: true, // This helps with Windows argument handling
    shell: false
});

let stdout = '';
let stderr = '';

childProcess.stdout.on('data', (data) => {
    stdout += data.toString();
    process.stdout.write(`STDOUT: ${data.toString()}`);
});

childProcess.stderr.on('data', (data) => {
    stderr += data.toString();
    process.stderr.write(`STDERR: ${data.toString()}`);
});

childProcess.on('close', (code) => {
    console.log(`\nProcess closed with code: ${code}`);
    console.log(`Final output length: ${stdout.length} characters`);
    console.log(`Contains 'Implementation Complete': ${stdout.includes('Implementation Complete')}`);
    console.log(`Contains 'Project Summary': ${stdout.includes('Project Summary')}`);
});

childProcess.on('error', (error) => {
    console.error('Process error:', error.message);
});

// Set timeout to prevent hanging
setTimeout(() => {
    if (!childProcess.killed) {
        console.log('\nTimeout reached');
        childProcess.kill();
    }
}, 30000); // 30 second timeout since Claude processing can take time