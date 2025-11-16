const { exec, spawn } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Test program to verify the fix for spawn issue with claude on Windows
async function testSpawnFix() {
    console.log('Testing spawn fix for claude --version command on Windows...\n');
    
    // Test 1: Original spawn that fails on Windows
    console.log('Test 1: Original spawn (expected to fail on Windows)');
    try {
        const childProcess = spawn('claude', ['--version']);
        
        childProcess.stdout.on('data', (data) => {
            console.log(`Output: ${data}`);
        });
        
        childProcess.stderr.on('data', (data) => {
            console.error(`Stderr: ${data}`);
        });
        
        childProcess.on('close', (code) => {
            console.log(`Child process exited with code ${code}`);
        });
    } catch (e) {
        console.error('Original spawn failed:', e.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 2: Fixed spawn with shell option (Windows-specific solution)
    console.log('Test 2: Fixed spawn with shell option (Windows solution)');
    try {
        const childProcess = spawn('claude', ['--version'], { shell: true });
        
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
                console.log(`Fixed spawn output: ${stdout}`);
            } else {
                console.error(`Fixed spawn failed with stderr: ${stderr}`);
            }
        });
        
        childProcess.on('error', (error) => {
            console.error('Fixed spawn error:', error.message);
        });
    } catch (e) {
        console.error('Fixed spawn failed:', e.message);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 3: Alternative - Use exec instead of spawn for Claude commands
    console.log('Test 3: Using exec instead of spawn (recommended approach)');
    try {
        const { stdout, stderr } = await execAsync('claude --version');
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        console.log(`Exec output: ${stdout}`);
        console.log('✓ Using exec is the recommended approach for Claude commands');
    } catch (e) {
        console.error('Exec method failed:', e.message);
    }
}

testSpawnFix();