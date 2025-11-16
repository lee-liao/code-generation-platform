require('dotenv').config();
const { GitHubApp } = require('../github-app');

// Using app-level authentication to get installation repositories
async function checkInstallationRepositories() {
  // Read the private key
  const privateKey = fs.readFileSync('./code-generation-platform.2025-11-13.private-key.pem', 'utf-8');
  
  // Create app-level auth
  const appAuth = createAppAuth({
    appId: process.env.GITHUB_APP_ID,
    privateKey: privateKey,
  });
  
  // Get app-level octokit with app authentication
  const appOctokit = new Octokit({ auth: await appAuth({ type: "app" }) });
  
  console.log('Checking repositories accessible to GitHub App installation...');
  
  try {
    // Get the installation's repositories
    // Using the correct API endpoint for installations
    const response = await appOctokit.rest.apps.listReposAccessibleToInstallation({
      per_page: 100
    });
    
    console.log('✅ Repositories accessible to the GitHub App:');
    if (response.data.repositories && response.data.repositories.length > 0) {
      response.data.repositories.forEach(repo => {
        console.log(`- ${repo.full_name} (ID: ${repo.id})`);
      });
    } else {
      console.log('No repositories found. The GitHub App may not have access to any repositories.');
    }
    
    // Check specifically for the target repository
    const hasAccess = response.data.repositories && 
                     response.data.repositories.some(repo => repo.full_name === 'lee-liao/testgit');
    if (hasAccess) {
      console.log('\n✅ The GitHub App has access to lee-liao/testgit');
    } else {
      console.log('\n❌ The GitHub App does NOT have access to lee-liao/testgit');
      console.log('You need to install the GitHub App on this specific repository.');
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Error getting installation repositories:', error.message);
    
    // Try alternative method using the installation ID directly
    console.log('\nTrying alternative method using installation ID...');
    
    try {
      const response2 = await appOctokit.rest.apps.getInstallation({
        installation_id: process.env.GITHUB_INSTALLATION_ID
      });
      
      console.log('Installation details:', {
        id: response2.data.id,
        account: response2.data.account.login,
        repository_selection: response2.data.repository_selection
      });
      
      if (response2.data.repository_selection === 'selected') {
        console.log('\nNote: This GitHub App only has access to selected repositories.');
        console.log('The target repository must be explicitly added to the GitHub App installation.');
      }
      
      return response2.data;
    } catch (altError) {
      console.error('Alternative method also failed:', altError.message);
      throw altError;
    }
  }
}

// Run the check
checkInstallationRepositories()
  .then(data => console.log('Repository access check completed.'))
  .catch(error => {
    console.error('Repository access check failed:', error.message);
  });