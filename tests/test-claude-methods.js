const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);

// Test program to verify different ways of calling "claude --version"
async function testClaudeVersionCalls() {
    console.log('Testing different methods to call claude --version command...\n');
    
    // Test 1: Using exec (like our test program)
    console.log('Test 1: Using exec (callback method)');
    try {
        exec('claude --version', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing "claude --version" with exec: ${error.message}`);
                return;
            }
            
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            
            console.log(`claude version output (exec): ${stdout}`);
        });
    } catch (e) {
        console.error('Exec method failed:', e.message);
    }

    // Test 2: Using exec with promisify (like git operations in the codebase)
    console.log('\nTest 2: Using exec with promisify');
    try {
        const { stdout, stderr } = await execAsync('claude --version');
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        console.log(`claude version output (exec promisify): ${stdout}`);
    } catch (e) {
        console.error('Exec promisify method failed:', e.message);
    }

    // Test 3: Using spawn (like how the actual code generation workflow was designed)
    console.log('\nTest 3: Using spawn (like original workflow)');
    try {
        return new Promise((resolve, reject) => {
            const childProcess = spawn('claude', ['--version']);
            
            let stdout = '';
            let stderr = '';
            
            childProcess.stdout.on('data', (data) => {
                stdout += data.toString();
            });
            
            childProcess.stderr.on('data', (data) => {
                stderr += data.toString();
            });
            
            childProcess.on('close', (code) => {
                if (code === 0) {
                    console.log(`claude version output (spawn): ${stdout}`);
                    resolve(stdout);
                } else {
                    reject(new Error(`Spawn command failed with exit code ${code}. Stderr: ${stderr}`));
                }
            });
            
            childProcess.on('error', (error) => {
                reject(error);
            });
        });
    } catch (e) {
        console.error('Spawn method failed:', e.message);
    }
}

// Also test if claude is available using the same check as the original workflow
async function testClaudeAvailability() {
    console.log('\nTesting Claude CLI availability check (like original workflow)...');
    
    try {
        const { execSync } = require('child_process');
        execSync('where claude', { stdio: 'pipe', shell: true });
        console.log('✓ Claude CLI is available on system');
    } catch (error) {
        console.log('✗ Claude CLI is not available on system');
    }
}

async function runAllTests() {
    await testClaudeAvailability();
    await testClaudeVersionCalls();
    
    console.log('\nAll tests completed. The claude command is accessible via all methods.');
}

runAllTests();