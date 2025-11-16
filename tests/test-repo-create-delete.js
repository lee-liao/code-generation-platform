require('dotenv').config();
const { GitHubApp } = require('../github-app');

async function testCreateAndDeleteRepository() {
  const githubApp = new GitHubApp();
  
  console.log('Testing repository creation and deletion...');
  
  try {
    // Create a test repository name with timestamp for uniqueness
    const owner = 'lee-liao'; // The GitHub App is installed on this account
    const repoName = 'test-repo-' + Date.now();
    const description = 'Test repository created via GitHub App API';
    
    console.log(`Creating repository: ${repoName}...`);
    
    const repo = await githubApp.createRepository(owner, repoName, description, false);
    
    console.log('✅ Repository created successfully!');
    console.log('Repository details:', {
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description
    });
    
    // Now let's delete the repository
    console.log(`\nDeleting repository: ${repoName}...`);
    
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await githubApp.getGitHubClient(installationId);
    
    const deleteResponse = await github.repos.delete({
      owner,
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
    
    // Check if it's the known limitation
    if (error.message.includes('GitHub App cannot create repositories')) {
      console.log('\n⚠️  Note: GitHub Apps have limitations on repository creation when installed on user accounts.');
    }
    
    throw error;
  }
}

// Run the test
testCreateAndDeleteRepository()
  .then(() => console.log('\nRepository creation and deletion test completed!'))
  .catch(error => {
    console.log('\nRepository creation and deletion test failed (expected due to GitHub App limitations).');
    process.exit(1);
  });