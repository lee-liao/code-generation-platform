const fs = require('fs').promises;
const path = require('path');

async function testDirectoryCheck() {
  console.log('Testing directory existence check...\n');
  
  // Test the specific case you mentioned
  const projectFolder = 'D:\\MyCode\\AI\\Victoria\\project2\\simpleProjectOriginal';
  const repoName = 'tobedeleted';
  
  console.log(`Project Folder: ${projectFolder}`);
  console.log(`Repository Name: ${repoName}`);
  
  // Calculate the expected sibling directory path
  const parentDir = path.dirname(projectFolder);
  const siblingRepoPath = path.join(parentDir, repoName);
  
  console.log(`\nExpected sibling directory: ${siblingRepoPath}`);
  console.log(`Parent directory: ${parentDir}`);
  
  try {
    // Check if the directory exists using fs.access
    await fs.access(siblingRepoPath);
    console.log(`\n✅ Directory EXISTS: ${siblingRepoPath}`);
    console.log('This would trigger the validation error in the main application.');
  } catch (error) {
    console.log(`\n❌ Directory does NOT exist or access failed: ${siblingRepoPath}`);
    console.log(`Error: ${error.message}`);
  }
  
  // Alternative check using stat to distinguish between file and directory
  try {
    const stats = await fs.stat(siblingRepoPath);
    console.log(`\nAdditional info about the path:`);
    console.log(`Is Directory: ${stats.isDirectory()}`);
    console.log(`Is File: ${stats.isFile()}`);
    console.log(`Size: ${stats.size} bytes`);
    console.log(`Last Modified: ${stats.mtime}`);
  } catch (statError) {
    console.log(`\nCould not get stats for the path: ${statError.message}`);
  }
}

// Run the test
testDirectoryCheck().catch(console.error);