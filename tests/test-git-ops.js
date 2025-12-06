require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const { copyDirectory, calculateDeltas, setupGitAndPush } = require('../utils/git-ops');
const { GitHubApp } = require('../github-app');

async function runGitOpsTest() {
    const timestamp = Date.now();
    const baseDir = path.join(__dirname, `../temp/git-ops-test-${timestamp}`);
    const sourceDir = path.join(baseDir, 'source');
    const destDir = path.join(baseDir, 'dest');
    const repoName = `test-repo-${timestamp}`; // New unique repo name

    console.log(`=== Starting Git Ops Utils Test ===`);
    console.log(`Working directory: ${baseDir}`);

    try {
        // Setup directories
        await fs.mkdir(sourceDir, { recursive: true });

        // --- Test 1: copyDirectory ---
        console.log('\n--- Test 1: copyDirectory ---');
        // Create some files and a .git directory in source
        await fs.writeFile(path.join(sourceDir, 'file1.txt'), 'content1');
        await fs.writeFile(path.join(sourceDir, 'file2.txt'), 'content2');
        await fs.mkdir(path.join(sourceDir, '.git'));
        await fs.writeFile(path.join(sourceDir, '.git', 'config'), 'fake git config');

        console.log('Copying directory (should skip .git)...');
        await copyDirectory(sourceDir, destDir);

        // Verify
        const destFiles = await fs.readdir(destDir);
        if (destFiles.includes('.git')) {
            throw new Error('FAILED: .git directory was copied!');
        }
        if (!destFiles.includes('file1.txt') || !destFiles.includes('file2.txt')) {
            throw new Error('FAILED: Source files missing in destination!');
        }
        console.log('✓ copyDirectory passed: Files copied, .git skipped.');


        // --- Test 2: calculateDeltas ---
        console.log('\n--- Test 2: calculateDeltas ---');
        // Initialize git in dest to test status checks
        execSync('git init', { cwd: destDir, stdio: 'ignore' });
        execSync('git config user.email "test@example.com"', { cwd: destDir });
        execSync('git config user.name "Test User"', { cwd: destDir });
        execSync('git add .', { cwd: destDir });
        execSync('git commit -m "Initial"', { cwd: destDir });

        // Make changes
        // 1. Modify
        await fs.writeFile(path.join(destDir, 'file1.txt'), 'modified content');
        // 2. Add
        await fs.writeFile(path.join(destDir, 'new_file.txt'), 'new content');
        // 3. Delete
        await fs.unlink(path.join(destDir, 'file2.txt'));

        const deltas = await calculateDeltas(destDir);

        // Verify
        const hasMod = deltas.modifications.includes('file1.txt');
        const hasAdd = deltas.additions.includes('new_file.txt');
        const hasDel = deltas.deletions.includes('file2.txt');

        if (hasMod && hasAdd && hasDel) {
            console.log('✓ calculateDeltas passed: Correctly identified all changes.');
        } else {
            console.log('Deltas result:', deltas);
            throw new Error('FAILED: calculateDeltas did not return expected changes.');
        }

        // --- Test 3: setupGitAndPush ---
        console.log('\n--- Test 3: setupGitAndPush ---');
        console.log(`Attempting to create and push to new repo: ${repoName}`);

        // IMPORTANT: Reset destDir to a clean state matching what 'setupGitAndPush' expects
        // It expects a directory with files (some committed, some not if we want to test that flow, 
        // but here we just want to test if it pushes at all).
        // Actually, setupGitAndPush pushes committed files (base) AND uncommitted files (deltas).
        // Our current state in 'destDir' has:
        // - Committed: file1.txt (old content), file2.txt (exists in history)
        // - Uncommitted changes: file1.txt (mod), new_file.txt (add), file2.txt (del)

        const githubApp = new GitHubApp();

        await setupGitAndPush(destDir, repoName, 'Automated test for git-ops.js', githubApp, {
            onStatusUpdate: (status) => console.log(`[Status] ${status.step}: ${status.message}`),
            onLog: (msg) => console.log(`[Log] ${msg}`)
        });

        console.log('✓ setupGitAndPush completed validation.');

    } catch (error) {
        console.error('\n❌ Test Failed:', error);
    } finally {
        // Cleanup
        // await fs.rm(baseDir, { recursive: true, force: true });
    }
}

runGitOpsTest();
