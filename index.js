require('dotenv').config();
const express = require('express');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { GitHubApp } = require('./github-app');
const codebaseGenerationRouter = require('./routes/codebase-generation');
const gitOperationsRouter = require('./routes/git-operations');
const claudeTestRouter = require('./routes/claude-test');

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Initialize GitHub App
const githubApp = new GitHubApp();

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Code Generation Platform API',
      version: '1.0.0',
      description: 'A GitHub App API for creating repositories, branches, pulling, adding files, committing, pushing, and creating pull requests',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./index.js'], // files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Serve static files (this will serve index.html at root)
app.use(express.static('public'));

// Fallback health check endpoint at a different path
app.get('/health', (req, res) => {
  res.json({ message: 'GitHub App for CGP is running!' });
});

// Endpoint to create a repository
/**
 * @swagger
 * /create-repo:
 *   post:
 *     summary: Create a new GitHub repository
 *     description: Creates a new GitHub repository using a personal access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *                 description: Repository owner (username or organization)
 *                 example: "username"
 *               name:
 *                 type: string
 *                 description: Repository name
 *                 example: "my-new-repo"
 *               description:
 *                 type: string
 *                 description: Repository description
 *                 example: "My new repository"
 *               isPrivate:
 *                 type: boolean
 *                 description: Whether the repository should be private
 *                 default: false
 *                 example: false
 *     responses:
 *       200:
 *         description: Repository created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123456789
 *                 name:
 *                   type: string
 *                   example: "my-new-repo"
 *                 html_url:
 *                   type: string
 *                   example: "https://github.com/username/my-new-repo"
 *       500:
 *         description: Error creating repository
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "GITHUB_PERSONAL_ACCESS_TOKEN is required for repository creation"
 */
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
/**
 * @swagger
 * /create-branch:
 *   post:
 *     summary: Create a new branch in a repository
 *     description: Creates a new branch from a source branch in the specified repository
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *                 description: Repository owner (username or organization)
 *                 example: "username"
 *               repo:
 *                 type: string
 *                 description: Repository name
 *                 example: "my-repo"
 *               branchName:
 *                 type: string
 *                 description: Name of the new branch to create
 *                 example: "feature/new-feature"
 *               sourceBranch:
 *                 type: string
 *                 description: Source branch to create from
 *                 default: "main"
 *                 example: "main"
 *     responses:
 *       200:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ref:
 *                   type: string
 *                   example: "refs/heads/feature/new-feature"
 *                 object:
 *                   type: object
 *                   properties:
 *                     sha:
 *                       type: string
 *                       example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0"
 *       500:
 *         description: Error creating branch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating branch"
 */
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
/**
 * @swagger
 * /add-file:
 *   post:
 *     summary: Add or update a file in a repository
 *     description: Adds or updates a file in the specified repository
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *                 description: Repository owner (username or organization)
 *                 example: "username"
 *               repo:
 *                 type: string
 *                 description: Repository name
 *                 example: "my-repo"
 *               filePath:
 *                 type: string
 *                 description: Path to the file in the repository
 *                 example: "docs/readme.md"
 *               content:
 *                 type: string
 *                 description: Content of the file
 *                 example: "# Documentation"
 *               branch:
 *                 type: string
 *                 description: Branch to modify
 *                 default: "main"
 *                 example: "main"
 *               commitMessage:
 *                 type: string
 *                 description: Commit message
 *                 default: "Add file via API"
 *                 example: "Add documentation file"
 *     responses:
 *       200:
 *         description: File added or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: object
 *                   properties:
 *                     path:
 *                       type: string
 *                       example: "docs/readme.md"
 *                     sha:
 *                       type: string
 *                       example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0"
 *       500:
 *         description: Error adding file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error adding file"
 */
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
/**
 * @swagger
 * /create-pull-request:
 *   post:
 *     summary: Create a new pull request
 *     description: Creates a new pull request between branches
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *                 description: Repository owner (username or organization)
 *                 example: "username"
 *               repo:
 *                 type: string
 *                 description: Repository name
 *                 example: "my-repo"
 *               title:
 *                 type: string
 *                 description: Title of the pull request
 *                 example: "New Feature"
 *               body:
 *                 type: string
 *                 description: Body/description of the pull request
 *                 example: "This PR adds a new feature"
 *               head:
 *                 type: string
 *                 description: Source branch (the branch with changes)
 *                 example: "feature/new-feature"
 *               base:
 *                 type: string
 *                 description: Target branch (the branch to merge into)
 *                 default: "main"
 *                 example: "main"
 *     responses:
 *       200:
 *         description: Pull request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 12345
 *                 title:
 *                   type: string
 *                   example: "New Feature"
 *                 html_url:
 *                   type: string
 *                   example: "https://github.com/username/my-repo/pull/1"
 *       500:
 *         description: Error creating pull request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating pull request"
 */
app.post('/create-pull-request', async (req, res) => {
  try {
    const { owner, repo, title, body, head, base = 'main' } = req.body;
    const result = await githubApp.createPullRequest(owner, repo, title, body, head, base);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get installation information
/**
 * @swagger
 * /installation-info:
 *   get:
 *     summary: Get GitHub App installation information
 *     description: Retrieves information about the GitHub App installation
 *     responses:
 *       200:
 *         description: Installation information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123456
 *                 account:
 *                   type: object
 *                   properties:
 *                     login:
 *                       type: string
 *                       example: "username"
 *                     type:
 *                       type: string
 *                       example: "User"
 *       500:
 *         description: Error getting installation information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error getting installation info"
 */
app.get('/installation-info', async (req, res) => {
  try {
    const result = await githubApp.getInstallationInfo();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get all branches from a repository
/**
 * @swagger
 * /branches:
 *   get:
 *     summary: Get all branches from a repository
 *     description: Retrieves all branches from the specified repository
 *     parameters:
 *       - in: query
 *         name: owner
 *         required: true
 *         schema:
 *           type: string
 *         description: Repository owner (username or organization)
 *         example: "username"
 *       - in: query
 *         name: repo
 *         required: true
 *         schema:
 *           type: string
 *         description: Repository name
 *         example: "my-repo"
 *     responses:
 *       200:
 *         description: Branches retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "main"
 *                   commit:
 *                     type: object
 *                     properties:
 *                       sha:
 *                         type: string
 *                         example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0"
 *       500:
 *         description: Error getting branches
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error getting branches"
 */
app.get('/branches', async (req, res) => {
  try {
    const { owner, repo } = req.query;
    if (!owner || !repo) {
      return res.status(400).json({ error: 'Owner and repo parameters are required' });
    }
    const result = await githubApp.getBranches(owner, repo);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get a specific branch from a repository
/**
 * @swagger
 * /branch:
 *   get:
 *     summary: Get a specific branch from a repository
 *     description: Retrieves information about a specific branch in the specified repository
 *     parameters:
 *       - in: query
 *         name: owner
 *         required: true
 *         schema:
 *           type: string
 *         description: Repository owner (username or organization)
 *         example: "username"
 *       - in: query
 *         name: repo
 *         required: true
 *         schema:
 *           type: string
 *         description: Repository name
 *         example: "my-repo"
 *       - in: query
 *         name: branchName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the branch to retrieve
 *         example: "main"
 *     responses:
 *       200:
 *         description: Branch information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "main"
 *                 commit:
 *                   type: object
 *                   properties:
 *                     sha:
 *                       type: string
 *                       example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0"
 *       500:
 *         description: Error getting branch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error getting branch"
 */
app.get('/branch', async (req, res) => {
  try {
    const { owner, repo, branchName } = req.query;
    if (!owner || !repo || !branchName) {
      return res.status(400).json({ error: 'Owner, repo, and branchName parameters are required' });
    }
    const result = await githubApp.getBranch(owner, repo, branchName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get repository information
/**
 * @swagger
 * /repository:
 *   get:
 *     summary: Get repository information
 *     description: Retrieves information about the specified repository
 *     parameters:
 *       - in: query
 *         name: owner
 *         required: true
 *         schema:
 *           type: string
 *         description: Repository owner (username or organization)
 *         example: "username"
 *       - in: query
 *         name: repo
 *         required: true
 *         schema:
 *           type: string
 *         description: Repository name
 *         example: "my-repo"
 *     responses:
 *       200:
 *         description: Repository information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123456789
 *                 name:
 *                   type: string
 *                   example: "my-repo"
 *                 full_name:
 *                   type: string
 *                   example: "username/my-repo"
 *                 description:
 *                   type: string
 *                   example: "Repository description"
 *                 default_branch:
 *                   type: string
 *                   example: "main"
 *       500:
 *         description: Error getting repository
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error getting repository"
 */
app.get('/repository', async (req, res) => {
  try {
    const { owner, repo } = req.query;
    if (!owner || !repo) {
      return res.status(400).json({ error: 'Owner and repo parameters are required' });
    }
    const result = await githubApp.getRepository(owner, repo);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to commit changes to repository
/**
 * @swagger
 * /commit:
 *   post:
 *     summary: Commit changes to a repository
 *     description: Creates a commit with multiple file changes in the specified repository
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *                 description: Repository owner (username or organization)
 *                 example: "username"
 *               repo:
 *                 type: string
 *                 description: Repository name
 *                 example: "my-repo"
 *               commitMessage:
 *                 type: string
 *                 description: Commit message
 *                 example: "Update multiple files"
 *               files:
 *                 type: array
 *                 description: Array of file objects to commit
 *                 items:
 *                   type: object
 *                   properties:
 *                     path:
 *                       type: string
 *                       description: Path to the file in the repository
 *                       example: "src/index.js"
 *                     content:
 *                       type: string
 *                       description: Content of the file
 *                       example: "console.log('Hello World');"
 *               branch:
 *                 type: string
 *                 description: Branch to commit to
 *                 default: "main"
 *                 example: "main"
 *               parentBranch:
 *                 type: string
 *                 description: Source branch for the commit
 *                 default: "main"
 *                 example: "main"
 *     responses:
 *       200:
 *         description: Changes committed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 commit:
 *                   type: object
 *                   properties:
 *                     sha:
 *                       type: string
 *                       example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0"
 *                 ref:
 *                   type: object
 *                   properties:
 *                     ref:
 *                       type: string
 *                       example: "refs/heads/main"
 *       500:
 *         description: Error committing changes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error committing changes"
 */
app.post('/commit', async (req, res) => {
  try {
    const { owner, repo, commitMessage, files, branch = 'main', parentBranch = 'main' } = req.body;
    if (!owner || !repo || !commitMessage || !files) {
      return res.status(400).json({ error: 'Owner, repo, commitMessage, and files parameters are required' });
    }
    if (!Array.isArray(files)) {
      return res.status(400).json({ error: 'Files must be an array of file objects' });
    }
    const result = await githubApp.commitChanges(owner, repo, commitMessage, files, branch, parentBranch);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get repository contents
/**
 * @swagger
 * /contents:
 *   get:
 *     summary: Get repository contents
 *     description: Retrieves the contents of a repository path
 *     parameters:
 *       - in: query
 *         name: owner
 *         required: true
 *         schema:
 *           type: string
 *         description: Repository owner (username or organization)
 *         example: "username"
 *       - in: query
 *         name: repo
 *         required: true
 *         schema:
 *           type: string
 *         description: Repository name
 *         example: "my-repo"
 *       - in: query
 *         name: path
 *         required: false
 *         schema:
 *           type: string
 *         description: Path to the file or directory in the repository
 *         example: ""
 *       - in: query
 *         name: ref
 *         required: false
 *         schema:
 *           type: string
 *         description: The name of the commit/branch/tag
 *         default: "main"
 *         example: "main"
 *     responses:
 *       200:
 *         description: Repository contents retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Error getting repository contents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error getting repository contents"
 */
app.get('/contents', async (req, res) => {
  try {
    const { owner, repo, path = '', ref = 'main' } = req.query;
    if (!owner || !repo) {
      return res.status(400).json({ error: 'Owner and repo parameters are required' });
    }
    const result = await githubApp.getContents(owner, repo, path, ref);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to compare commits
/**
 * @swagger
 * /compare:
 *   get:
 *     summary: Compare two commits
 *     description: Compares two commits in a repository
 *     parameters:
 *       - in: query
 *         name: owner
 *         required: true
 *         schema:
 *           type: string
 *         description: Repository owner (username or organization)
 *         example: "username"
 *       - in: query
 *         name: repo
 *         required: true
 *         schema:
 *           type: string
 *         description: Repository name
 *         example: "my-repo"
 *       - in: query
 *         name: base
 *         required: true
 *         schema:
 *           type: string
 *         description: The base commit
 *         example: "main"
 *       - in: query
 *         name: head
 *         required: true
 *         schema:
 *           type: string
 *         description: The head commit
 *         example: "feature-branch"
 *     responses:
 *       200:
 *         description: Commits compared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *                 commits:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error comparing commits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error comparing commits"
 */
app.get('/compare', async (req, res) => {
  try {
    const { owner, repo, base, head } = req.query;
    if (!owner || !repo || !base || !head) {
      return res.status(400).json({ error: 'Owner, repo, base, and head parameters are required' });
    }
    const result = await githubApp.compareCommits(owner, repo, base, head);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get commit information
/**
 * @swagger
 * /commit-info:
 *   get:
 *     summary: Get commit information
 *     description: Retrieves information about a specific commit
 *     parameters:
 *       - in: query
 *         name: owner
 *         required: true
 *         schema:
 *           type: string
 *         description: Repository owner (username or organization)
 *         example: "username"
 *       - in: query
 *         name: repo
 *         required: true
 *         schema:
 *           type: string
 *         description: Repository name
 *         example: "my-repo"
 *       - in: query
 *         name: ref
 *         required: true
 *         schema:
 *           type: string
 *         description: The commit SHA or branch name
 *         example: "main"
 *     responses:
 *       200:
 *         description: Commit information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sha:
 *                   type: string
 *                   example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0"
 *                 commit:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Initial commit"
 *       500:
 *         description: Error getting commit information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error getting commit information"
 */
app.get('/commit-info', async (req, res) => {
  try {
    const { owner, repo, ref } = req.query;
    if (!owner || !repo || !ref) {
      return res.status(400).json({ error: 'Owner, repo, and ref parameters are required' });
    }
    const result = await githubApp.getCommit(owner, repo, ref);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Codebase generation routes
app.use('/', codebaseGenerationRouter);

// Git operations routes  
app.use('/git', gitOperationsRouter); // Put git operations under /git prefix to avoid conflicts

// Claude command test routes
app.use('/', claudeTestRouter);

// Serve static files at root (this will serve index.html)
app.use(express.static('public'));

// Fallback to serve index.html for root path if not handled by other routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`GitHub App server running at http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});