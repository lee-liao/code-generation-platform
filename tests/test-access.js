require('dotenv').config();
const { GitHubApp } = require('../github-app');

async function testGitHubAppAccess() {
  const githubApp = new GitHubApp();
  
  console.log('Testing GitHub App installation and access...');
  
  try {
    // Get installation info to verify the app is properly configured
    console.log('Getting installation information...');
    const installation = await githubApp.getInstallationInfo();
    
    console.log('✅ GitHub App installation found:');
    console.log('- ID:', installation.id);
    console.log('- Account:', installation.account.login);
    console.log('- Repository selection:', installation.repository_selection);
    console.log('- Access tokens URL:', installation.access_tokens_url);
    
    // Check if our target repository is accessible
    const targetRepo = 'testgit';
    console.log(`\nChecking access to repository: ${targetRepo}`);
    
    // We can't directly list repos through the installation object with our current implementation
    // So let's try to access the target repository in a different way
    console.log(`\nTrying to access https://github.com/lee-liao/${targetRepo}...`);
    
    // Try to get repository information to verify access
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await githubApp.getGitHubClient(installationId);
    
    try {
      const repoInfo = await github.repos.get({
        owner: 'lee-liao',
        repo: targetRepo
      });
      
      console.log('✅ Repository exists and is accessible!');
      console.log('- Name:', repoInfo.data.name);
      console.log('- Full Name:', repoInfo.data.full_name);
      console.log('- Description:', repoInfo.data.description);
      console.log('- Default Branch:', repoInfo.data.default_branch);
      
      return { repoExists: true, repoInfo: repoInfo.data };
    } catch (repoError) {
      console.log('❌ Repository not accessible or does not exist:', repoError.message);
      console.log('This means the GitHub App is not installed on this repository or does not have access.');
      return { repoExists: false, error: repoError };
    }
  } catch (error) {
    console.error('❌ Error accessing GitHub App installation:', error.message);
    throw error;
  }
}

// Run the access test
testGitHubAppAccess()
  .then(result => {
    if (result.repoExists) {
      console.log('\n✅ GitHub App has access to the target repository. Ready to create branches.');
    } else {
      console.log('\n❌ GitHub App does not have access to the target repository.');
      console.log('The GitHub App needs to be installed on the target repository to perform operations.');
    }
  })
  .catch(error => {
    console.error('Test failed:', error.message);
  });