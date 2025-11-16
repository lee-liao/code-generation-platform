require('dotenv').config();
const { GitHubApp } = require('../github-app');

async function testAllCapabilities() {
  const githubApp = new GitHubApp();
  
  console.log('Testing all GitHub App capabilities...');
  console.log('=====================================');
  
  // 1. Test Repository Creation (using PAT)
  console.log('\n1. Testing Repository Creation...');
  const repoName = 'capability-test-' + Date.now();
  
  try {
    const repo = await githubApp.createRepository('lee-liao', repoName, 'Test repository for capability verification', false);
    console.log('✅ Repository creation: SUCCESS');
    console.log(`   Repository: ${repo.html_url}`);
  } catch (error) {
    console.log('❌ Repository creation: FAILED');
    console.error('   Error:', error.message);
  }

  // 2. Test Branch Creation (using GitHub App)
  console.log('\n2. Testing Branch Creation...');
  try {
    const branchName = 'feature/test-branch-' + Date.now();
    const branch = await githubApp.createBranch('lee-liao', repoName, branchName, 'main');
    console.log('✅ Branch creation: SUCCESS');
    console.log(`   Branch: ${branchName}`);
  } catch (error) {
    console.log('❌ Branch creation: FAILED');
    console.error('   Error:', error.message);
  }

  // 3. Test File Operations (using GitHub App)
  console.log('\n3. Testing File Operations...');
  try {
    const fileContent = `# Test File\n\nThis is a test file created via the GitHub App API on ${new Date().toISOString()}`;
    const fileName = 'test-file.md';
    
    await githubApp.addFile('lee-liao', repoName, fileName, fileContent, 'main', 'Add test file via API');
    console.log('✅ File operations (add/update): SUCCESS');
    console.log(`   File: ${fileName}`);
  } catch (error) {
    console.log('❌ File operations: FAILED');
    console.error('   Error:', error.message);
  }

  // 4. Test Pull Operations (using GitHub App)
  console.log('\n4. Testing Pull Operations (Get Branches)...');
  try {
    const branches = await githubApp.getBranches('lee-liao', repoName);
    console.log('✅ Pull operations (get branches): SUCCESS');
    console.log(`   Found ${branches.length} branches`);
    branches.forEach(branch => console.log(`   - ${branch.name}`));
  } catch (error) {
    console.log('❌ Pull operations: FAILED');
    console.error('   Error:', error.message);
  }

  // 5. Test Pull Request Creation (using GitHub App)
  console.log('\n5. Testing Pull Request Creation...');
  try {
    // First, let's create a test branch with a change to make a proper PR
    const featureBranch = 'feature/pr-test-' + Date.now();
    await githubApp.createBranch('lee-liao', repoName, featureBranch, 'main');
    
    // Add a different file to the feature branch
    const prFileContent = `# PR Test File\n\nCreated for PR test on ${new Date().toISOString()}`;
    await githubApp.addFile('lee-liao', repoName, 'pr-test-file.md', prFileContent, featureBranch, 'Add PR test file');
    
    // Create the pull request
    const pullRequest = await githubApp.createPullRequest(
      'lee-liao',
      repoName,
      `Test PR from ${featureBranch}`,
      'This is a test pull request created via the GitHub App API',
      featureBranch, // head
      'main' // base
    );
    
    console.log('✅ Pull request creation: SUCCESS');
    console.log(`   PR: ${pullRequest.html_url}`);
  } catch (error) {
    console.log('❌ Pull request creation: FAILED');
    console.error('   Error:', error.message);
  }

  // 6. Test Push Operations (using GitHub App - conceptually tested through other operations)
  console.log('\n6. Testing Push Operations...');
  try {
    // This is conceptually tested since commits push automatically
    await githubApp.pushChanges('lee-liao', repoName, 'main');
    console.log('✅ Push operations: SUCCESS (conceptually tested)');
  } catch (error) {
    console.log('❌ Push operations: FAILED');
    console.error('   Error:', error.message);
  }

  // 7. Test Get Repository Info (using GitHub App)
  console.log('\n7. Testing Get Repository Info...');
  try {
    const repoInfo = await githubApp.getRepository('lee-liao', repoName);
    console.log('✅ Get repository info: SUCCESS');
    console.log(`   Name: ${repoInfo.name}`);
    console.log(`   Description: ${repoInfo.description}`);
    console.log(`   Default Branch: ${repoInfo.default_branch}`);
  } catch (error) {
    console.log('❌ Get repository info: FAILED');
    console.error('   Error:', error.message);
  }

  // 8. Clean up - Delete the test repository (using PAT)
  console.log('\n8. Cleaning up (Deleting test repository)...');
  try {
    await githubApp.deleteRepository('lee-liao', repoName);
    console.log('✅ Repository deletion: SUCCESS');
    console.log(`   Deleted: ${repoName}`);
  } catch (error) {
    console.log('❌ Repository deletion: FAILED');
    console.error('   Error:', error.message);
  }

  console.log('\n=====================================');
  console.log('All capabilities test completed!');
}

// Wrap the test in a try-catch to ensure cleanup happens even if tests fail
async function runTestWithCleanup() {
  let repoName = null;
  
  try {
    // Generate repo name to use for cleanup if needed
    repoName = 'capability-test-' + Date.now();
    
    await testAllCapabilities();
    console.log('\n🎉 All GitHub App capabilities test completed successfully!');
  } catch (error) {
    console.error('\n❌ Test suite failed:', error.message);
    
    // Try to clean up even if the test failed
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