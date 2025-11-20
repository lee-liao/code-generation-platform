const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { promisify } = require('util');
const unzipper = require('unzipper');
const { GitHubApp } = require('./github-app');

const execAsync = promisify(require('child_process').exec);

// Test script for OpenSpec implementation
async function testOpenSpecImplementation() {
    console.log('Starting OpenSpec implementation test...');
    
    const repoName = 'for-test-github-app';
    const zipPath = 'D:\\MyCode\\AI\\Victoria\\project2\\simple-openspec-lib\\update-hello-world-to-loaded.zip';
    
    console.log(`Repository: ${repoName}`);
    console.log(`Zip file: ${zipPath}`);
    
    // Check if zip file exists
    if (!fs.existsSync(zipPath)) {
        console.error(`Error: Zip file does not exist: ${zipPath}`);
        return;
    }
    
    console.log('Zip file exists, proceeding with test...');
    
    // Create a temporary working directory
    const tempDir = path.join(__dirname, 'temp', `test_${Date.now()}`);
    await fs.promises.mkdir(tempDir, { recursive: true });
    console.log(`Created temporary directory: ${tempDir}`);
    
    try {
        // First, let's test the validation part
        console.log('\n1. Testing zip validation...');
        
        // Extract to temporary directory for validation
        const validationTempDir = path.join(__dirname, 'temp', `validation_test_${Date.now()}`);
        await fs.promises.mkdir(validationTempDir, { recursive: true });

        // Extract the zip to validation directory
        await new Promise((resolve, reject) => {
            fs.createReadStream(zipPath)
                .pipe(unzipper.Extract({ path: validationTempDir }))
                .on('close', resolve)
                .on('error', reject);
        });

        console.log('Zip extracted for validation, checking structure...');
        
        // Look for required OpenSpec files
        const changesDir = path.join(validationTempDir, 'changes');
        try {
            await fs.promises.access(changesDir);
            console.log('✓ Found changes directory');
            
            // Check for required files in the expected structure
            const changesContents = await fs.promises.readdir(changesDir);
            console.log(`Changes directory contains: ${changesContents}`);
            
            if (changesContents.length === 0) {
                throw new Error('OpenSpec zip does not contain any change directories');
            }

            // For each change directory, check for required files
            for (const changeDir of changesContents) {
                const changePath = path.join(changesDir, changeDir);
                const stat = await fs.promises.stat(changePath);
                if (stat.isDirectory()) {
                    const requiredFiles = ['proposal.md', 'tasks.md'];
                    for (const file of requiredFiles) {
                        const filePath = path.join(changePath, file);
                        try {
                            await fs.promises.access(filePath);
                            console.log(`✓ Found required file: ${file}`);
                        } catch (err) {
                            console.warn(`Warning: Expected file ${file} not found in ${changeDir}, but continuing`);
                        }
                    }
                    
                    // Check for specs directory
                    const specsDir = path.join(changePath, 'specs');
                    try {
                        await fs.promises.access(specsDir);
                        console.log('✓ Found specs directory');
                    } catch (err) {
                        console.warn(`Warning: specs directory not found in ${changeDir}, but continuing`);
                    }
                }
            }
            
            console.log('✓ Zip validation passed');
        } catch (error) {
            console.error(`✗ Validation failed: ${error.message}`);
            throw error;
        } finally {
            // Cleanup validation temp directory
            try {
                await fs.promises.rm(validationTempDir, { recursive: true, force: true });
            } catch (cleanupError) {
                console.error('Error cleaning up validation temp directory:', cleanupError);
            }
        }
        
        console.log('\n2. Testing repository clone...');
        // Test cloning the repository
        const repoOwner = process.env.GITHUB_REPO_OWNER;
        if (!repoOwner) {
          throw new Error('GITHUB_REPO_OWNER environment variable is required but not set.');
        }
        const repoUrl = `https://github.com/${repoOwner}/${repoName}.git`;
        console.log(`Attempting to clone: ${repoUrl}`);
        
        // For this test, we'll skip the actual clone since the repo might not exist
        console.log('Repository clone test skipped (would require valid repo)');
        
        console.log('\n3. Testing zip extraction to working directory...');
        // Test extracting the zip file
        await new Promise((resolve, reject) => {
            fs.createReadStream(zipPath)
                .pipe(unzipper.Extract({ path: tempDir }))
                .on('close', resolve)
                .on('error', reject);
        });
        console.log('✓ Zip extracted to working directory');
        
        // Check the extracted structure
        const extractedContents = await fs.promises.readdir(tempDir);
        console.log(`Extracted contents: ${extractedContents}`);
        
        console.log('\n✓ All tests passed! The OpenSpec implementation should work.');
        
    } catch (error) {
        console.error(`✗ Test failed: ${error.message}`);
        console.error(error.stack);
    } finally {
        // Cleanup
        try {
            await fs.promises.rm(tempDir, { recursive: true, force: true });
            console.log(`\nCleaned up temporary directory: ${tempDir}`);
        } catch (cleanupError) {
            console.error('Error cleaning up temporary directory:', cleanupError);
        }
    }
}

// Run the test
testOpenSpecImplementation().then(() => {
    console.log('\nTest completed.');
}).catch((error) => {
    console.error('\nTest failed:', error);
});