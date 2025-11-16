const { spawn } = require('child_process');
const path = require('path');

console.log('Enhanced test for spawn command with claude --version');
console.log('Testing multiple spawn configurations...\n');

// Test 1: Original approach that might be hanging
console.log('Test 1: Original approach with cmd /c');
testSpawn1();

function testSpawn1() {
    console.log('\n--- Test 1: Original cmd /c approach ---');
    const startTime = Date.now();
    
    const childProcess = spawn('cmd', ['/c', 'claude --version'], {
        stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    childProcess.stdout.on('data', (data) => {
        stdout += data.toString();
        process.stdout.write(`STDOUT: ${data}`);
    });
    
    childProcess.stderr.on('data', (data) => {
        stderr += data.toString();
        process.stderr.write(`STDERR: ${data}`);
    });
    
    childProcess.on('close', (code) => {
        const duration = Date.now() - startTime;
        console.log(`Test 1 completed in ${duration}ms with exit code: ${code}`);
        console.log(`Output: ${stdout || stderr}`);
    });
    
    childProcess.on('error', (error) => {
        console.error('Test 1 error:', error.message);
    });
    
    // Setup timeout to detect hanging
    setTimeout(() => {
        if (!childProcess.killed) {
            console.log('Test 1: Process appears to be hanging, killing process...');
            childProcess.kill();
        }
    }, 10000); // 10 second timeout
}

// Test 2: Try without cmd /c wrapper
setTimeout(() => {
    console.log('\n--- Test 2: Direct claude call ---');
    testSpawn2();
}, 15000);

function testSpawn2() {
    const startTime = Date.now();
    
    const childProcess = spawn('claude', ['--version'], {
        stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    childProcess.stdout.on('data', (data) => {
        stdout += data.toString();
        process.stdout.write(`STDOUT: ${data}`);
    });
    
    childProcess.stderr.on('data', (data) => {
        stderr += data.toString();
        process.stderr.write(`STDERR: ${data}`);
    });
    
    childProcess.on('close', (code) => {
        const duration = Date.now() - startTime;
        console.log(`Test 2 completed in ${duration}ms with exit code: ${code}`);
        console.log(`Output: ${stdout || stderr}`);
    });
    
    childProcess.on('error', (error) => {
        console.error('Test 2 error:', error.message);
    });
    
    // Setup timeout to detect hanging
    setTimeout(() => {
        if (!childProcess.killed) {
            console.log('Test 2: Process appears to be hanging, killing process...');
            childProcess.kill();
        }
    }, 10000); // 10 second timeout
}

// Test 3: Try with detached option
setTimeout(() => {
    console.log('\n--- Test 3: With detached option ---');
    testSpawn3();
}, 30000);

function testSpawn3() {
    const startTime = Date.now();
    
    const childProcess = spawn('claude', ['--version'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        detached: true
    });
    
    let stdout = '';
    let stderr = '';
    
    childProcess.stdout.on('data', (data) => {
        stdout += data.toString();
        process.stdout.write(`STDOUT: ${data}`);
    });
    
    childProcess.stderr.on('data', (data) => {
        stderr += data.toString();
        process.stderr.write(`STDERR: ${data}`);
    });
    
    childProcess.on('close', (code) => {
        const duration = Date.now() - startTime;
        console.log(`Test 3 completed in ${duration}ms with exit code: ${code}`);
        console.log(`Output: ${stdout || stderr}`);
    });
    
    childProcess.on('error', (error) => {
        console.error('Test 3 error:', error.message);
    });
    
    // Setup timeout to detect hanging
    setTimeout(() => {
        if (!childProcess.killed) {
            console.log('Test 3: Process appears to be hanging, killing process...');
            childProcess.kill();
        }
    }, 10000); // 10 second timeout
}

// Test 4: Try with Windows-specific stdio options
setTimeout(() => {
    console.log('\n--- Test 4: Windows specific approach ---');
    testSpawn4();
}, 45000);

function testSpawn4() {
    const startTime = Date.now();
    
    // Try using win-spawn or different approach for Windows
    const childProcess = spawn('cmd', ['/c', 'claude --version'], {
        stdio: ['ignore', 'pipe', 'pipe'], // Ignore stdin to prevent hanging
        windowsHide: true
    });
    
    let stdout = '';
    let stderr = '';
    
    childProcess.stdout.on('data', (data) => {
        stdout += data.toString();
        process.stdout.write(`STDOUT: ${data}`);
    });
    
    childProcess.stderr.on('data', (data) => {
        stderr += data.toString();
        process.stderr.write(`STDERR: ${data}`);
    });
    
    childProcess.on('close', (code) => {
        const duration = Date.now() - startTime;
        console.log(`Test 4 completed in ${duration}ms with exit code: ${code}`);
        console.log(`Output: ${stdout || stderr}`);
    });
    
    childProcess.on('error', (error) => {
        console.error('Test 4 error:', error.message);
    });
    
    // Setup timeout to detect hanging
    setTimeout(() => {
        if (!childProcess.killed) {
            console.log('Test 4: Process appears to be hanging, killing process...');
            childProcess.kill();
        }
    }, 10000); // 10 second timeout
}