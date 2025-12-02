const express = require('express');
const { spawn, execSync } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');
const { GitHubApp } = require('../github-app');
const { Anthropic } = require('@anthropic-ai/sdk');

const router = express.Router();
const execAsync = promisify(require('child_process').exec);

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// In-memory storage for user sessions and projects
const userSessions = new Map();
const projectTemplates = new Map();

/**
 * Initialize a new OpenSpec project
 * POST /api/openspec/projects
 */
/**
 * @swagger
 * /openspec-workflow/projects:
 *   post:
 *     summary: Initialize a new OpenSpec project
 *     tags: [OpenSpec Workflow]
 *     description: Creates a new OpenSpec project session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *               description:
 *                 type: string
 *               owner:
 *                 type: string
 *               repository:
 *                 type: string
 *               isPrivate:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Project created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error creating project
 */
router.post('/projects', async (req, res) => {
  try {
    const { projectName, description, owner, repository, isPrivate = false } = req.body;

    if (!projectName || !owner || !repository) {
      return res.status(400).json({
        error: 'Missing required fields: projectName, owner, repository'
      });
    }

    const projectId = `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create project session
    const projectSession = {
      id: projectId,
      projectName,
      description,
      owner,
      repository,
      isPrivate,
      currentSpec: null,
      specTree: [],
      collaborators: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    userSessions.set(projectId, projectSession);

    res.json({
      success: true,
      projectId,
      project: projectSession
    });
  } catch (error) {
    console.error('Error creating OpenSpec project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

/**
 * Get project information
 * GET /api/openspec/projects/:projectId
 */
/**
 * @swagger
 * /openspec-workflow/projects/{projectId}:
 *   get:
 *     summary: Get project information
 *     tags: [OpenSpec Workflow]
 *     description: Retrieves information about an existing OpenSpec project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error getting project
 */
router.get('/projects/:projectId', (req, res) => {
  try {
    const { projectId } = req.params;
    const project = userSessions.get(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Error getting project:', error);
    res.status(500).json({ error: 'Failed to get project' });
  }
});

/**
 * Upload and validate OpenSpec file
 * POST /api/openspec/projects/:projectId/upload
 */
/**
 * @swagger
 * /openspec-workflow/projects/{projectId}/upload:
 *   post:
 *     summary: Upload and validate OpenSpec file
 *     tags: [OpenSpec Workflow]
 *     description: Uploads an OpenSpec zip file for a project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               openspecFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded and validated successfully
 *       400:
 *         description: Invalid file or structure
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error uploading file
 */
router.post('/projects/:projectId/upload', async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = userSessions.get(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!req.files || !req.files.openspecFile) {
      return res.status(400).json({ error: 'No OpenSpec file uploaded' });
    }

    const openspecFile = req.files.openspecFile;
    const uploadDir = path.join(__dirname, '..', 'temp', projectId);

    // Create upload directory
    await fs.mkdir(uploadDir, { recursive: true });

    // Save uploaded file
    const filePath = path.join(uploadDir, openspecFile.name);
    await openspecFile.mv(filePath);

    // Validate OpenSpec structure
    const validationResult = await validateOpenSpecStructure(filePath);

    if (!validationResult.isValid) {
      return res.status(400).json({
        error: 'Invalid OpenSpec structure',
        details: validationResult.errors
      });
    }

    // Extract and analyze the OpenSpec content
    const specContent = await extractOpenSpecContent(filePath);

    // Update project with uploaded spec
    project.uploadedFile = {
      name: openspecFile.name,
      path: filePath,
      uploadedAt: new Date()
    };
    project.specTree = specContent.specTree;
    project.currentSpec = specContent.rootSpec;
    project.updatedAt = new Date();

    userSessions.set(projectId, project);

    res.json({
      success: true,
      specContent,
      message: 'OpenSpec file uploaded and validated successfully'
    });
  } catch (error) {
    console.error('Error uploading OpenSpec file:', error);
    res.status(500).json({ error: 'Failed to upload OpenSpec file' });
  }
});

/**
 * Get specification tree structure
 * GET /api/openspec/projects/:projectId/spec-tree
 */
/**
 * @swagger
 * /openspec-workflow/projects/{projectId}/spec-tree:
 *   get:
 *     summary: Get specification tree structure
 *     tags: [OpenSpec Workflow]
 *     description: Retrieves the tree structure of specifications for a project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Spec tree retrieved successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error getting spec tree
 */
router.get('/projects/:projectId/spec-tree', (req, res) => {
  try {
    const { projectId } = req.params;
    const project = userSessions.get(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      specTree: project.specTree || []
    });
  } catch (error) {
    console.error('Error getting spec tree:', error);
    res.status(500).json({ error: 'Failed to get spec tree' });
  }
});

/**
 * Get specification content
 * GET /api/openspec/projects/:projectId/specs/:specId
 */
/**
 * @swagger
 * /openspec-workflow/projects/{projectId}/specs/{specId}:
 *   get:
 *     summary: Get specification content
 *     tags: [OpenSpec Workflow]
 *     description: Retrieves content of a specific specification
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: specId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Specification retrieved successfully
 *       404:
 *         description: Project or specification not found
 *       500:
 *         description: Error getting specification
 */
router.get('/projects/:projectId/specs/:specId', async (req, res) => {
  try {
    const { projectId, specId } = req.params;
    const project = userSessions.get(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Find spec in spec tree
    const findSpec = (nodes) => {
      for (const node of nodes) {
        if (node.id === specId) return node;
        if (node.children) {
          const found = findSpec(node.children);
          if (found) return found;
        }
      }
      return null;
    };

    const spec = findSpec(project.specTree);

    if (!spec) {
      return res.status(404).json({ error: 'Specification not found' });
    }

    res.json({
      success: true,
      spec
    });
  } catch (error) {
    console.error('Error getting specification:', error);
    res.status(500).json({ error: 'Failed to get specification' });
  }
});

/**
 * Update specification content
 * PUT /api/openspec/projects/:projectId/specs/:specId
 */
/**
 * @swagger
 * /openspec-workflow/projects/{projectId}/specs/{specId}:
 *   put:
 *     summary: Update specification content
 *     tags: [OpenSpec Workflow]
 *     description: Updates the content of a specific specification
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: specId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               suggestions:
 *                 type: array
 *     responses:
 *       200:
 *         description: Specification updated successfully
 *       404:
 *         description: Project or specification not found
 *       500:
 *         description: Error updating specification
 */
router.put('/projects/:projectId/specs/:specId', async (req, res) => {
  try {
    const { projectId, specId } = req.params;
    const { content, suggestions } = req.body;
    const project = userSessions.get(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update spec in tree
    const updateSpec = (nodes) => {
      for (const node of nodes) {
        if (node.id === specId) {
          node.content = content;
          node.suggestions = suggestions;
          node.updatedAt = new Date();
          return true;
        }
        if (node.children) {
          if (updateSpec(node.children)) return true;
        }
      }
      return false;
    };

    const updated = updateSpec(project.specTree);

    if (!updated) {
      return res.status(404).json({ error: 'Specification not found' });
    }

    project.updatedAt = new Date();
    userSessions.set(projectId, project);

    res.json({
      success: true,
      message: 'Specification updated successfully'
    });
  } catch (error) {
    console.error('Error updating specification:', error);
    res.status(500).json({ error: 'Failed to update specification' });
  }
});

/**
 * Generate AI suggestions for specification
 * POST /api/openspec/projects/:projectId/specs/:specId/suggestions
 */
/**
 * @swagger
 * /openspec-workflow/projects/{projectId}/specs/{specId}/suggestions:
 *   post:
 *     summary: Generate AI suggestions for specification
 *     tags: [OpenSpec Workflow]
 *     description: Generates AI suggestions for improving a specification
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: specId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               context:
 *                 type: string
 *               requirement:
 *                 type: string
 *     responses:
 *       200:
 *         description: Suggestions generated successfully
 *       404:
 *         description: Project or specification not found
 *       500:
 *         description: Error generating suggestions
 */
router.post('/projects/:projectId/specs/:specId/suggestions', async (req, res) => {
  try {
    const { projectId, specId } = req.params;
    const { context, requirement } = req.body;
    const project = userSessions.get(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Find the specification
    const findSpec = (nodes) => {
      for (const node of nodes) {
        if (node.id === specId) return node;
        if (node.children) {
          const found = findSpec(node.children);
          if (found) return found;
        }
      }
      return null;
    };

    const spec = findSpec(project.specTree);

    if (!spec) {
      return res.status(404).json({ error: 'Specification not found' });
    }

    // Generate AI suggestions using Claude
    const prompt = `As an expert specification writer, suggest improvements for this OpenSpec requirement:

Current requirement: ${spec.content || ''}
Context: ${context || ''}
Additional requirement: ${requirement || ''}

Please provide 3-4 specific suggestions that:
1. Maintain clarity and precision
2. Follow OpenSpec best practices
3. Include testable scenarios
4. Are concise but comprehensive

Format each suggestion as a complete requirement statement that follows OpenSpec format.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const suggestions = response.content[0].text
      .split('\n')
      .filter(line => line.trim())
      .map((suggestion, index) => ({
        id: `suggestion_${Date.now()}_${index}`,
        content: suggestion.trim(),
        type: 'improvement',
        timestamp: new Date()
      }));

    res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
});

/**
 * Create GitHub repository and generate codebase
 * POST /api/openspec/projects/:projectId/generate
 */
/**
 * @swagger
 * /openspec-workflow/projects/{projectId}/generate:
 *   post:
 *     summary: Create GitHub repository and generate codebase
 *     tags: [OpenSpec Workflow]
 *     description: Starts the codebase generation process for a project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               branchName:
 *                 type: string
 *                 default: "main"
 *     responses:
 *       200:
 *         description: Codebase generation started successfully
 *       400:
 *         description: No specifications available
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error starting generation
 */
router.post('/projects/:projectId/generate', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { branchName = 'main' } = req.body;
    const project = userSessions.get(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!project.specTree || project.specTree.length === 0) {
      return res.status(400).json({ error: 'No specifications available for generation' });
    }

    const taskId = `generation_${Date.now()}`;

    // Start background generation process
    startCodebaseGeneration(taskId, project, branchName);

    res.json({
      success: true,
      taskId,
      message: 'Codebase generation started'
    });
  } catch (error) {
    console.error('Error starting codebase generation:', error);
    res.status(500).json({ error: 'Failed to start codebase generation' });
  }
});

/**
 * Get generation status
 * GET /api/openspec/tasks/:taskId/status
 */
/**
 * @swagger
 * /openspec-workflow/tasks/{taskId}/status:
 *   get:
 *     summary: Get generation status
 *     tags: [OpenSpec Workflow]
 *     description: Retrieves the status of a generation task
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task status retrieved successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error getting task status
 */
router.get('/tasks/:taskId/status', (req, res) => {
  try {
    const { taskId } = req.params;
    const task = global.taskManager?.getTask(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      success: true,
      task
    });
  } catch (error) {
    console.error('Error getting task status:', error);
    res.status(500).json({ error: 'Failed to get task status' });
  }
});

/**
 * Create pull request for generated code
 * POST /api/openspec/projects/:projectId/pull-request
 */
/**
 * @swagger
 * /openspec-workflow/projects/{projectId}/pull-request:
 *   post:
 *     summary: Create pull request for generated code
 *     tags: [OpenSpec Workflow]
 *     description: Creates a pull request for the generated code
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               sourceBranch:
 *                 type: string
 *               targetBranch:
 *                 type: string
 *                 default: "main"
 *     responses:
 *       200:
 *         description: Pull request created successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error creating pull request
 */
router.post('/projects/:projectId/pull-request', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, sourceBranch, targetBranch = 'main' } = req.body;
    const project = userSessions.get(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const githubApp = new GitHubApp();
    const github = await githubApp.getGitHubClientForOwner(project.owner);

    // Create pull request
    const prResponse = await github.pulls.create({
      owner: project.owner,
      repo: project.repository,
      title: title || `OpenSpec Implementation: ${project.projectName}`,
      body: description || `Implementation of OpenSpec specifications for ${project.projectName}`,
      head: sourceBranch,
      base: targetBranch
    });

    res.json({
      success: true,
      pullRequest: {
        url: prResponse.data.html_url,
        number: prResponse.data.number,
        title: prResponse.data.title
      }
    });
  } catch (error) {
    console.error('Error creating pull request:', error);
    res.status(500).json({ error: 'Failed to create pull request' });
  }
});

/**
 * Validate OpenSpec structure
 */
async function validateOpenSpecStructure(filePath) {
  try {
    const execSync = require('child_process').execSync;
    const tempDir = path.join(__dirname, '..', 'temp', `validation_${Date.now()}`);

    // Extract zip for validation
    execSync(`unzip -q "${filePath}" -d "${tempDir}"`);

    // Check for required OpenSpec structure
    const changesPath = path.join(tempDir, 'changes');
    const specsPath = path.join(tempDir, 'openspec', 'specs');

    const hasChanges = await fs.access(changesPath).then(() => true).catch(() => false);
    const hasSpecs = await fs.access(specsPath).then(() => true).catch(() => false);

    // Clean up
    await fs.rmdir(tempDir, { recursive: true });

    return {
      isValid: hasChanges || hasSpecs,
      errors: []
    };
  } catch (error) {
    return {
      isValid: false,
      errors: [error.message]
    };
  }
}

/**
 * Extract OpenSpec content from uploaded file
 */
async function extractOpenSpecContent(filePath) {
  try {
    const execSync = require('child_process').execSync;
    const tempDir = path.join(__dirname, '..', 'temp', `extract_${Date.now()}`);

    // Extract zip
    execSync(`unzip -q "${filePath}" -d "${tempDir}"`);

    // Analyze structure and build spec tree
    const specTree = await buildSpecTree(tempDir);

    // Clean up
    await fs.rmdir(tempDir, { recursive: true });

    return {
      specTree,
      rootSpec: specTree[0] || null
    };
  } catch (error) {
    console.error('Error extracting OpenSpec content:', error);
    throw error;
  }
}

/**
 * Build specification tree from extracted content
 */
async function buildSpecTree(basePath) {
  const specTree = [];

  try {
    const changesPath = path.join(basePath, 'changes');
    const specsPath = path.join(basePath, 'openspec', 'specs');

    // Look for changes directory
    if (await fs.access(changesPath).then(() => true).catch(() => false)) {
      const changes = await fs.readdir(changesPath);

      for (const change of changes) {
        const changePath = path.join(changesPath, change);
        const stat = await fs.stat(changePath);

        if (stat.isDirectory()) {
          const node = {
            id: `change_${change}`,
            name: change,
            type: 'change',
            path: changePath,
            children: []
          };

          // Look for specs in this change
          const changeSpecsPath = path.join(changePath, 'specs');
          if (await fs.access(changeSpecsPath).then(() => true).catch(() => false)) {
            const capabilities = await fs.readdir(changeSpecsPath);

            for (const capability of capabilities) {
              const capabilityPath = path.join(changeSpecsPath, capability);
              const specFile = path.join(capabilityPath, 'spec.md');

              if (await fs.access(specFile).then(() => true).catch(() => false)) {
                const content = await fs.readFile(specFile, 'utf-8');

                node.children.push({
                  id: `spec_${change}_${capability}`,
                  name: capability,
                  type: 'specification',
                  content,
                  path: specFile,
                  suggestions: []
                });
              }
            }
          }

          specTree.push(node);
        }
      }
    }

    // Look for specs directory
    if (await fs.access(specsPath).then(() => true).catch(() => false)) {
      const capabilities = await fs.readdir(specsPath);

      for (const capability of capabilities) {
        const capabilityPath = path.join(specsPath, capability);
        const stat = await fs.stat(capabilityPath);

        if (stat.isDirectory()) {
          const specFile = path.join(capabilityPath, 'spec.md');
          let content = '';

          if (await fs.access(specFile).then(() => true).catch(() => false)) {
            content = await fs.readFile(specFile, 'utf-8');
          }

          specTree.push({
            id: `spec_${capability}`,
            name: capability,
            type: 'specification',
            content,
            path: capabilityPath,
            children: [],
            suggestions: []
          });
        }
      }
    }
  } catch (error) {
    console.error('Error building spec tree:', error);
  }

  return specTree;
}

/**
 * Start background codebase generation process
 */
async function startCodebaseGeneration(taskId, project, branchName) {
  if (!global.taskManager) {
    global.taskManager = require('./codebase-generation').taskManager;
  }

  const githubApp = new GitHubApp();

  try {
    // Create task
    global.taskManager.createTask(taskId, {
      step: 'repository_creation',
      completed: false,
      projectId: project.id
    });

    // Create repository
    global.taskManager.updateTask(taskId, {
      step: 'creating_repository',
      message: `Creating repository ${project.repository}...`
    });

    await githubApp.createRepository(
      project.owner,
      project.repository,
      project.description,
      project.isPrivate
    );

    // Create branch
    global.taskManager.updateTask(taskId, {
      step: 'creating_branch',
      message: `Creating branch ${branchName}...`
    });

    await githubApp.createBranch(project.owner, project.repository, branchName, 'main');

    // Generate files from specifications
    global.taskManager.updateTask(taskId, {
      step: 'generating_code',
      message: 'Generating code from specifications...'
    });

    // Convert OpenSpec to file structure and create files
    const fileStructure = await convertSpecToFiles(project.specTree);
    await createFilesInRepository(githubApp, project.owner, project.repository, fileStructure, branchName);

    // Complete
    global.taskManager.updateTask(taskId, {
      step: 'completed',
      completed: true,
      message: 'Codebase generation completed successfully'
    });

  } catch (error) {
    console.error('Codebase generation error:', error);
    global.taskManager.updateTask(taskId, {
      step: 'error',
      completed: false,
      error: error.message
    });
  }
}

/**
 * Convert OpenSpec specifications to file structure
 */
async function convertSpecToFiles(specTree) {
  const files = [];

  // Basic template mapping - this can be extended
  const templateMap = {
    'api': '/templates/api-endpoint.js',
    'database': '/templates/database-schema.sql',
    'ui': '/templates/react-component.jsx',
    'service': '/templates/service.js'
  };

  for (const node of specTree) {
    if (node.type === 'specification' && node.content) {
      // Generate code based on spec content
      const code = await generateCodeFromSpec(node.content, node.name);

      files.push({
        path: `src/${node.name}.js`,
        content: code
      });

      // Add corresponding test file
      const testCode = await generateTestFromSpec(node.content, node.name);
      files.push({
        path: `tests/${node.name}.test.js`,
        content: testCode
      });
    }

    if (node.children) {
      const childFiles = await convertSpecToFiles(node.children);
      files.push(...childFiles);
    }
  }

  // Add package.json and README
  files.push({
    path: 'package.json',
    content: JSON.stringify({
      name: 'generated-project',
      version: '1.0.0',
      description: 'Generated from OpenSpec specifications',
      scripts: {
        start: 'node src/index.js',
        test: 'jest'
      },
      dependencies: {
        express: '^4.18.2'
      },
      devDependencies: {
        jest: '^29.7.0'
      }
    }, null, 2)
  });

  files.push({
    path: 'README.md',
    content: `# Generated Project

This project was generated from OpenSpec specifications.

## Installation
\`\`\`bash
npm install
\`\`\`

## Usage
\`\`\`bash
npm start
\`\`\`

## Testing
\`\`\`bash
npm test
\`\`\`
`
  });

  return files;
}

/**
 * Generate code from specification using AI
 */
async function generateCodeFromSpec(specContent, specName) {
  try {
    const prompt = `Generate production-ready JavaScript code for the following specification:

Specification Name: ${specName}
Specification Content:
${specContent}

Requirements:
1. Generate clean, maintainable, and well-documented code
2. Follow JavaScript best practices and modern ES6+ syntax
3. Include proper error handling
4. Make the code modular and reusable
5. Include JSDoc comments for all functions
6. Follow SOLID principles

Generate only the code without explanations.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error generating code from spec:', error);
    // Fallback to basic template
    return `// Generated code for ${specName}
// TODO: Implement based on specification

module.exports = {
  // Implementation needed
};
`;
  }
}

/**
 * Generate test code from specification
 */
async function generateTestFromSpec(specContent, specName) {
  try {
    const prompt = `Generate comprehensive Jest test code for the following specification:

Specification Name: ${specName}
Specification Content:
${specContent}

Requirements:
1. Generate complete test coverage for all functions and edge cases
2. Include positive and negative test cases
3. Use descriptive test names
4. Include setup and teardown if needed
5. Mock external dependencies
6. Follow Jest best practices

Generate only the test code without explanations.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error generating test from spec:', error);
    // Fallback to basic test template
    `const ${specName} = require('../src/${specName}');

describe('${specName}', () => {
  test('should be defined', () => {
    expect(${specName}).toBeDefined();
  });

  // TODO: Add more tests based on specification
});
`;
  }
}

/**
 * Create files in GitHub repository
 */
async function createFilesInRepository(githubApp, owner, repo, files, branch) {
  for (const file of files) {
    try {
      await githubApp.createOrUpdateFile(owner, repo, file.path, file.content, `Add ${file.path}`, branch);
    } catch (error) {
      console.error(`Error creating file ${file.path}:`, error);
      // Continue with other files even if one fails
    }
  }
}

module.exports = router;