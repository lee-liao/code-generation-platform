const express = require('express');
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);
const router = express.Router();

// Git operations API

// Initialize a git repository
router.post('/git-init', async (req, res) => {
  try {
    const { directory, branch = 'main' } = req.body;
    
    if (!directory) {
      return res.status(400).json({ error: 'Directory is required' });
    }

    // Verify directory exists
    await fs.access(directory);
    
    // Change to directory and run git init
    const result = await execAsync(`git init && git checkout -b ${branch}`, { 
      cwd: directory 
    });
    
    res.json({ 
      success: true, 
      message: `Git repository initialized in ${directory} with branch ${branch}`,
      output: result.stdout
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Configure git user
router.post('/git-config', async (req, res) => {
  try {
    const { directory, email, name } = req.body;
    
    if (!directory || !email || !name) {
      return res.status(400).json({ error: 'Directory, email, and name are required' });
    }

    // Verify directory exists
    await fs.access(directory);
    
    // Configure git user
    await execAsync(`git config user.email "${email}"`, { cwd: directory });
    await execAsync(`git config user.name "${name}"`, { cwd: directory });
    
    res.json({ 
      success: true, 
      message: `Git user configured in ${directory}`,
      email,
      name
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add files to git staging
router.post('/git-add', async (req, res) => {
  try {
    const { directory, files = '.' } = req.body;
    
    if (!directory) {
      return res.status(400).json({ error: 'Directory is required' });
    }

    // Verify directory exists
    await fs.access(directory);
    
    // Add files to staging
    const result = await execAsync(`git add ${files}`, { cwd: directory });
    
    res.json({ 
      success: true, 
      message: `Files added to staging in ${directory}`,
      output: result.stdout
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Commit changes
router.post('/git-commit', async (req, res) => {
  try {
    const { directory, message } = req.body;
    
    if (!directory || !message) {
      return res.status(400).json({ error: 'Directory and commit message are required' });
    }

    // Verify directory exists
    await fs.access(directory);
    
    // Commit changes
    const result = await execAsync(`git commit -m "${message}"`, { cwd: directory });
    
    res.json({ 
      success: true, 
      message: `Changes committed in ${directory}`,
      output: result.stdout
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add remote origin
router.post('/git-remote', async (req, res) => {
  try {
    const { directory, remoteUrl, remoteName = 'origin' } = req.body;
    
    if (!directory || !remoteUrl) {
      return res.status(400).json({ error: 'Directory and remote URL are required' });
    }

    // Verify directory exists
    await fs.access(directory);
    
    // Add remote
    const result = await execAsync(`git remote add ${remoteName} "${remoteUrl}"`, { cwd: directory });
    
    res.json({ 
      success: true, 
      message: `Remote ${remoteName} added to ${directory}`,
      output: result.stdout
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Push to remote
router.post('/git-push', async (req, res) => {
  try {
    const { directory, remote = 'origin', branch = 'main' } = req.body;
    
    if (!directory) {
      return res.status(400).json({ error: 'Directory is required' });
    }

    // Verify directory exists
    await fs.access(directory);
    
    // Push to remote
    const result = await execAsync(`git push -u ${remote} ${branch}`, { cwd: directory });
    
    res.json({ 
      success: true, 
      message: `Changes pushed to ${remote}/${branch} from ${directory}`,
      output: result.stdout
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get git status
router.get('/git-status', async (req, res) => {
  try {
    const { directory } = req.query;
    
    if (!directory) {
      return res.status(400).json({ error: 'Directory is required' });
    }

    // Verify directory exists
    await fs.access(directory);
    
    // Get git status
    const result = await execAsync('git status --porcelain', { cwd: directory });
    
    res.json({ 
      success: true,
      directory,
      status: result.stdout ? result.stdout.trim().split('\n') : [],
      hasChanges: result.stdout.trim().length > 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;