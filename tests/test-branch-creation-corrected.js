require('dotenv').config();
const { GitHubApp } = require('../github-app');

async function testCreateBranchCorrected() {
  const githubApp = new GitHubApp();
  
  console.log('Testing branch creation in https://github.com/lee-liao/testgit...');
  
  try {
    // Create a new branch in the target repository
    const owner = 'lee-liao';
    const repo = 'testgit';
    const branchName = 'feature/test-branch-' + Date.now(); // Use timestamp to ensure uniqueness
    const sourceBranch = 'master'; // Correct default branch name
    
    console.log(`Creating branch: ${branchName} in ${owner}/${repo} from ${sourceBranch}...`);
    
    const result = await githubApp.createBranch(owner, repo, branchName, sourceBranch);
    
    console.log('✅ Branch created successfully!');
    console.log('Branch details:', {
      ref: result.ref,
      sha: result.object.sha,
      url: `https://github.com/${owner}/${repo}/tree/${branchName}`
    });
    
    return result;
  } catch (error) {
    console.error('❌ Error creating branch:', error.message);
    console.error('Error details:', {
      status: error.status,
      message: error.message,
      errors: error.errors
    });
    
    // Re-throw the error to be handled by the caller
    throw error;
  }
}

// Run the test
testCreateBranchCorrected()
  .then(() => console.log('Branch creation test completed successfully!'))
  .catch(error => {
    console.log('Branch creation test failed.');
    console.error('Error:', error.message);
    process.exit(1);
  });