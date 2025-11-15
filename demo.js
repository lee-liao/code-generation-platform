require('dotenv').config();
const { GitHubApp } = require('./github-app');

async function demoGitHubApp() {
  const githubApp = new GitHubApp();
  
  console.log('GitHub App demo starting...');
  
  // Note: These examples would work with valid credentials
  // For demo purposes, we're just showing the function signatures
  
  console.log('\n1. Repository Creation:');
  console.log('   await githubApp.createRepository(owner, repoName, description, isPrivate)');
  
  console.log('\n2. Branch Creation:');
  console.log('   await githubApp.createBranch(owner, repo, branchName, sourceBranch)');
  
  console.log('\n3. Add File:');
  console.log('   await githubApp.addFile(owner, repo, filePath, content, branch, commitMessage)');
  
  console.log('\n4. Commit Changes:');
  console.log('   await githubApp.commitChanges(owner, repo, commitMessage, files, branch)');
  
  console.log('\n5. Push Changes:');
  console.log('   await githubApp.pushChanges(owner, repo, branch)');
  
  console.log('\n6. Create Pull Request:');
  console.log('   await githubApp.createPullRequest(owner, repo, title, body, head, base)');
  
  console.log('\nDemo completed. For actual usage, set up proper credentials in .env file.');
}

// Run the demo
demoGitHubApp().catch(console.error);