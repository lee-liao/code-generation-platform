require('dotenv').config();
const { GitHubApp } = require('../github-app');

async function testCreateAndDeleteRepository() {
  const githubApp = new GitHubApp();
  
  console.log('Testing repository creation and deletion using personal access token...');
  
  try {
    // Create a test repository name with timestamp for uniqueness
    const repoName = 'test-repo-' + Date.now();
    const description = 'Test repository created via Personal Access Token';
    
    console.log(`Creating repository: ${repoName}...`);
    
    const repo = await githubApp.createRepository('lee-liao', repoName, description, false);
    
    console.log('✅ Repository created successfully!');
    console.log('Repository details:', {
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description
    });
    
    // Wait a moment to ensure the repository is fully created
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Now let's delete the repository using the personal access token
    console.log(`\nDeleting repository: ${repoName}...`);
    
    const { Octokit } = require('@octokit/rest');
    const github = new Octokit({
      auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
    });
    
    const deleteResponse = await github.repos.delete({
      owner: 'lee-liao',
      repo: repoName
    });
    
    console.log('✅ Repository deleted successfully!');
    console.log('Deletion status:', deleteResponse.status);
    
    return { created: repo, deleted: true };
  } catch (error) {
    console.error('❌ Error during repository creation or deletion:', error.message);
    console.error('Error details:', {
      status: error.status,
      message: error.message,
      errors: error.errors
    });
    
    throw error;
  }
}

// Run the test
testCreateAndDeleteRepository()
  .then(() => console.log('\nRepository creation and deletion test completed successfully!'))
  .catch(error => {
    console.log('\nRepository creation and deletion test failed.');
    console.error('Error:', error.message);
    process.exit(1);
  });
