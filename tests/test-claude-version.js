const { exec } = require('child_process');

// Test program to verify "claude --version" command line call
function testClaudeVersion() {
    console.log('Testing claude --version command...');
    
    exec('claude --version', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing "claude --version": ${error.message}`);
            return;
        }
        
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        
        console.log(`claude version output: ${stdout}`);
    });
}

testClaudeVersion();