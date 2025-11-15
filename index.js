require('dotenv').config();
const express = require('express');
const { GitHubApp } = require('./github-app');

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Initialize GitHub App
const githubApp = new GitHubApp();

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'GitHub App for CGP is running!' });
});

// Endpoint to create a repository
app.post('/create-repo', async (req, res) => {
  try {
    const { owner, name, description, isPrivate = false } = req.body;
    const result = await githubApp.createRepository(owner, name, description, isPrivate);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to create a branch
app.post('/create-branch', async (req, res) => {
  try {
    const { owner, repo, branchName, sourceBranch = 'main' } = req.body;
    const result = await githubApp.createBranch(owner, repo, branchName, sourceBranch);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to add a file to repository
app.post('/add-file', async (req, res) => {
  try {
    const { owner, repo, branch, filePath, content, commitMessage } = req.body;
    const result = await githubApp.addFile(owner, repo, filePath, content, branch, commitMessage);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to create a pull request
app.post('/create-pull-request', async (req, res) => {
  try {
    const { owner, repo, title, body, head, base = 'main' } = req.body;
    const result = await githubApp.createPullRequest(owner, repo, title, body, head, base);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`GitHub App server running at http://localhost:${port}`);
});