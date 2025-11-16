require('dotenv').config();
const { GitHubApp } = require('../github-app');

async function testBranchCreationInEmptyRepo() {
  const githubApp = new GitHubApp();
  
  // Define repoName in outer scope so it's available for cleanup
  const repoName = 'branch-test-' + Date.now();
  
  console.log('Testing branch creation in an empty repository...');
  
  try {
    // First create a new repository
    console.log(`1. Creating repository: ${repoName}...`);
    
    const repo = await githubApp.createRepository('lee-liao', repoName, 'Test repository for branch creation', false);
    console.log(`✅ Repository created: ${repo.html_url}`);
    
    // Wait a moment for the repository to be fully initialized
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Try to get branches (should be empty initially)
    console.log(`\n2. Getting branches from empty repository...`);
    try {
      const branches = await githubApp.getBranches('lee-liao', repoName);
      console.log(`✅ Retrieved ${branches.length} branches`);
      branches.forEach(branch => console.log(`   - ${branch.name}`));
    } catch (branchError) {
      console.log(`⚠️ Could not retrieve branches: ${branchError.message}`);
    }
    
    // Try to create a branch (this might fail if there are no commits yet)
    console.log(`\n3. Testing branch creation...`);
    const branchName = 'feature/test-branch-' + Date.now();
    
    try {
      const branch = await githubApp.createBranch('lee-liao', repoName, branchName, 'main');
      console.log(`✅ Branch created: ${branchName}`);
    } catch (branchError) {
      console.log(`⚠️ Branch creation failed (expected for empty repo): ${branchError.message}`);
      
      // If branch creation failed, let's first create a file to initialize the repo
      console.log(`\n4. Initializing repository with a file...`);
      try {
        const fileContent = `# README\n\nTest repository created on ${new Date().toISOString()}`;
        const fileResponse = await githubApp.addFile(
          'lee-liao', 
          repoName, 
          'README.md', 
          fileContent, 
          'main', 
          'Initial commit: Add README'
        );
        
        console.log(`✅ Repository initialized with README.md`);
        
        // Now try to create a branch again
        console.log(`\n5. Retrying branch creation after initialization...`);
        const secondBranch = await githubApp.createBranch('lee-liao', repoName, branchName, 'main');
        console.log(`✅ Branch created after initialization: ${branchName}`);
      } catch (initError) {
        console.log(`❌ Repository initialization failed: ${initError.message}`);
      }
    }
    
    // Clean up by deleting the repository
    console.log(`\n6. Cleaning up (deleting repository)...`);
    await githubApp.deleteRepository('lee-liao', repoName);
    console.log(`✅ Repository deleted: ${repoName}`);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    throw { error, repoName }; // Include repoName in the error for cleanup
  }
}

// Run the focused test with cleanup on failure
async function runTestWithCleanup() {
  let repoName = null;
  
  try {
    await testBranchCreationInEmptyRepo();
    console.log('\n🎉 Branch creation test completed!');
  } catch (error) {
    // Extract repoName from the error if it's the custom error object
    if (error.repoName) {
      repoName = error.repoName;
      console.error('\n❌ Test failed:', error.error.message);
    } else {
      console.error('\n❌ Test failed:', error.message);
    }
    
    // Try to clean up if the repo was created but test failed
    if (repoName) {
      console.log(`\nAttempting cleanup for repository: ${repoName}`);
      try {
        const githubApp = new GitHubApp();
        await githubApp.deleteRepository('lee-liao', repoName);
        console.log(`✅ Cleaned up test repository: ${repoName}`);
      } catch (cleanupError) {
        console.error(`⚠️  Could not clean up test repository ${repoName}:`, cleanupError.message);
        console.log(`Please manually delete the repository: ${repoName}`);
      }
    }
    
    process.exit(1);
  }
}

runTestWithCleanup();