require('dotenv').config();
const { Octokit } = require('@octokit/rest');

async function cleanupTestRepositories() {
  console.log('Cleaning up test repositories...');
  
  if (!process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
    console.error('❌ GITHUB_PERSONAL_ACCESS_TOKEN is required for cleanup');
    process.exit(1);
  }
  
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });
  
  const username = 'lee-liao'; // Update this to your username if different
  
  try {
    // Get all repositories for the user
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      type: 'all',
      sort: 'created',
      direction: 'desc',
    });
    
    // Filter for test repositories created by our tests (they start with certain prefixes)
    const testRepos = repos.filter(repo => {
      return repo.name.startsWith('capability-test-') || 
             repo.name.startsWith('test-repo-') || 
             repo.name.startsWith('branch-test-');
    });
    
    console.log(`Found ${testRepos.length} test repositories to clean up`);
    
    if (testRepos.length === 0) {
      console.log('✅ No test repositories found to clean up');
      return;
    }
    
    for (const repo of testRepos) {
      console.log(`Deleting repository: ${repo.name}`);
      
      try {
        await octokit.repos.delete({
          owner: username,
          repo: repo.name,
        });
        console.log(`✅ Deleted: ${repo.name}`);
      } catch (error) {
        console.error(`❌ Error deleting ${repo.name}:`, error.message);
      }
    }
    
    console.log('✅ Cleanup completed!');
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    process.exit(1);
  }
}

// Run the cleanup
cleanupTestRepositories();