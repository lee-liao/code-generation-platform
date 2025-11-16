const { execSync } = require('child_process');
const path = require('path');

console.log('Testing execSync with different approaches...');

const testDir = 'D:\\MyCode\\AI\\Victoria\\project2\\tobedeleted';
const environment = { ...process.env };

console.log('\n=== Test 1: Direct execSync (current approach) ===');
try {
  const result = execSync('cmd /c claude --version', { 
    stdio: ['pipe', 'pipe', 'pipe'], 
    env: environment,
    cwd: testDir 
  });
  console.log('SUCCESS: Command output:', result.toString());
} catch (error) {
  console.log('ERROR:', error.message);
  console.log('Error code:', error.code);
  console.log('Error status:', error.status);
}

console.log('\n=== Test 2: Simple execSync ===');
try {
  const result = execSync('claude --version', { 
    stdio: ['pipe', 'pipe', 'pipe'], 
    env: environment,
    cwd: testDir 
  });
  console.log('SUCCESS: Command output:', result.toString());
} catch (error) {
  console.log('ERROR:', error.message);
  console.log('Error code:', error.code);
  console.log('Error status:', error.status);
}

console.log('\n=== Test 3: Using shell option ===');
try {
  const result = execSync('claude --version', { 
    stdio: ['pipe', 'pipe', 'pipe'], 
    env: environment,
    cwd: testDir,
    shell: true
  });
  console.log('SUCCESS: Command output:', result.toString());
} catch (error) {
  console.log('ERROR:', error.message);
  console.log('Error code:', error.code);
  console.log('Error status:', error.status);
}

console.log('\n=== Test 4: Check PATH in context ===');
try {
  const result = execSync('echo %PATH%', { 
    stdio: ['pipe', 'pipe', 'pipe'], 
    env: environment,
    cwd: testDir 
  });
  console.log('PATH: ', result.toString().substring(0, 200) + '...'); // Truncate for readability
} catch (error) {
  console.log('ERROR getting PATH:', error.message);
}