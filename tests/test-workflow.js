require('dotenv').config();
const { GitHubApp } = require('../github-app');
const path = require('path');
const fs = require('fs').promises;

async function runTest() {
    const githubApp = new GitHubApp();

    // Configuration
    const owner = 'DrLinAITeam2';
    const repo = 'simplest-repo';
    const timestamp = Date.now();
    const branchName = `test-branch-${timestamp}`;
    const tempDir = path.join(__dirname, `../temp/test-${timestamp}`);

    console.log(`=== Starting Workflow Test: ${owner}/${repo} ===`);

    try {
        // 1. Make a branch from main
        console.log(`\n1. Creating branch '${branchName}' from 'main'...`);
        await githubApp.createBranch(owner, repo, branchName, 'main');
        console.log(`✓ Branch '${branchName}' created successfully.`);

        // 2. Clone the branch to temp directory
        console.log(`\n2. Cloning (downloading) branch to '${tempDir}'...`);
        await fs.mkdir(tempDir, { recursive: true });
        await githubApp.downloadRepository(owner, repo, branchName, tempDir);
        console.log(`✓ Repository downloaded to '${tempDir}'.`);

        // 3. Make a small change
        console.log('\n3. Making a small change...');
        const fileName = `test-file-${timestamp}.txt`;
        const filePath = path.join(tempDir, fileName);
        const fileContent = `This is a test file created at ${new Date().toISOString()}.\nRef: ${timestamp}`;

        // We write the file to the temp dir to simulate 'working' locally
        await fs.writeFile(filePath, fileContent);
        console.log(`✓ Created local file: ${fileName}`);

        // 4. Push to remote branch
        console.log(`\n4. Pushing changes to remote branch '${branchName}'...`);

        // Construct the file object expected by pushChanges
        // Note: In a real 'git push', the git client calculates this. 
        // Here we manually construct the payload for our API.
        const filesToPush = [
            {
                path: fileName, // Path relative to repo root
                content: fileContent
            }
        ];

        const commitMessage = `Test commit: Add ${fileName}`;
        await githubApp.pushChanges(owner, repo, commitMessage, filesToPush, branchName, branchName);
        console.log(`✓ Changes pushed to branch '${branchName}'.`);

        // 5. Create a pull request from the branch to main
        console.log(`\n5. Creating pull request from '${branchName}' to 'main'...`);
        const pr = await githubApp.createPullRequest(
            owner,
            repo,
            `Test PR ${timestamp}`,
            `Automated test PR created at ${new Date().toISOString()}`,
            branchName,
            'main'
        );
        console.log(`✓ Pull Request created successfully!`);
        console.log(`  URL: ${pr.html_url}`);
        console.log(`  ID: ${pr.number}`);

        console.log('\n=== Test Completed Successfully ===');

    } catch (error) {
        console.error('\n❌ Test Failed:');
        console.error(error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    } finally {
        // Optional: Cleanup
        // await fs.rm(tempDir, { recursive: true, force: true });
    }
}

runTest();
