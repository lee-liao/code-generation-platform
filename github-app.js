const { createAppAuth } = require('@octokit/auth-app');
const { Octokit } = require('@octokit/rest');

class GitHubApp {
  constructor() {
    // Initialize GitHub App authentication
    this.auth = createAppAuth({
      appId: process.env.GITHUB_APP_ID,
      privateKey: require('fs').readFileSync(process.env.GITHUB_PRIVATE_KEY_PATH, 'utf-8'),
    });
    
    // Initialize Octokit instance
    this.octokit = new Octokit();
  }

  // Get authenticated GitHub client for a specific installation
  async getGitHubClient(installationId) {
    const auth = await this.auth({
      type: "installation",
      installationId: installationId,
    });
    
    return new Octokit({
      auth: auth.token,
    });
  }

  // Create a new repository
  async createRepository(owner, name, description = '', isPrivate = false) {
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await this.getGitHubClient(installationId);

    try {
      const response = await github.repos.createInOrg({
        org: owner,
        name: name,
        description: description,
        private: isPrivate,
      });

      console.log(`Repository created: ${response.data.html_url}`);
      return response.data;
    } catch (error) {
      console.error('Error creating repository:', error.message);
      throw error;
    }
  }

  // Create a new branch
  async createBranch(owner, repo, branchName, sourceBranch = 'main') {
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await this.getGitHubClient(installationId);

    try {
      // Get the reference of the source branch
      const { data: sourceRef } = await github.git.getRef({
        owner,
        repo,
        ref: `heads/${sourceBranch}`,
      });

      // Create a new branch
      const response = await github.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: sourceRef.object.sha,
      });

      console.log(`Branch created: ${branchName}`);
      return response.data;
    } catch (error) {
      console.error('Error creating branch:', error.message);
      throw error;
    }
  }

  // Add a file to repository
  async addFile(owner, repo, filePath, content, branch = 'main', commitMessage = 'Add file via API') {
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await this.getGitHubClient(installationId);

    try {
      // Try to get the file to check if it exists (for updating)
      let existingFile;
      try {
        const fileResponse = await github.repos.getContent({
          owner,
          repo,
          path: filePath,
          ref: branch,
        });
        existingFile = fileResponse.data;
      } catch (error) {
        // File doesn't exist, we'll create it
        existingFile = null;
      }

      // Add or update the file
      const params = {
        owner,
        repo,
        path: filePath,
        message: commitMessage,
        content: Buffer.from(content).toString('base64'),
        branch,
      };

      // If file exists, we need to include the SHA for updating
      if (existingFile) {
        params.sha = existingFile.sha;
      }

      const response = await github.repos.createOrUpdateFileContents(params);

      console.log(`File ${existingFile ? 'updated' : 'created'}: ${filePath}`);
      return response.data;
    } catch (error) {
      console.error('Error adding file:', error.message);
      throw error;
    }
  }

  // Commit changes (often combined with addFile in practice)
  async commitChanges(owner, repo, commitMessage, files, branch = 'main', parentBranch = 'main') {
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await this.getGitHubClient(installationId);

    try {
      // Get the latest commit SHA from the parent branch
      const { data: parentRef } = await github.git.getRef({
        owner,
        repo,
        ref: `heads/${parentBranch}`,
      });

      const parentCommitSha = parentRef.object.sha;

      // Create blob objects for each file
      const treeItems = [];
      for (const file of files) {
        const blobResponse = await github.git.createBlob({
          owner,
          repo,
          content: file.content,
        });

        treeItems.push({
          path: file.path,
          mode: '100644', // File mode for normal file
          type: 'blob',
          sha: blobResponse.data.sha,
        });
      }

      // Create tree object
      const treeResponse = await github.git.createTree({
        owner,
        repo,
        tree: treeItems,
        base_tree: parentCommitSha, // Use parent branch's tree as base
      });

      // Create commit
      const commitResponse = await github.git.createCommit({
        owner,
        repo,
        message: commitMessage,
        tree: treeResponse.data.sha,
        parents: [parentCommitSha],
      });

      // Update the reference to point to the new commit
      const refResponse = await github.git.updateRef({
        owner,
        repo,
        ref: `heads/${branch}`,
        sha: commitResponse.data.sha,
        force: false,
      });

      console.log(`Changes committed to branch: ${branch}`);
      return {
        commit: commitResponse.data,
        ref: refResponse.data,
      };
    } catch (error) {
      console.error('Error committing changes:', error.message);
      throw error;
    }
  }

  // Push changes (this is handled by the commit process in GitHub API)
  async pushChanges(owner, repo, branch = 'main') {
    // In GitHub's API, pushing is part of committing - the changes are immediately reflected
    // This method exists for conceptual completeness but doesn't perform a separate API call
    console.log(`Changes are automatically 'pushed' when committed to branch: ${branch}`);
    return { message: `Changes on branch ${branch} are live` };
  }

  // Create a pull request
  async createPullRequest(owner, repo, title, body, head, base = 'main') {
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await this.getGitHubClient(installationId);

    try {
      const response = await github.pulls.create({
        owner,
        repo,
        title,
        body,
        head, // The branch with changes
        base, // The branch you want to merge into
      });

      console.log(`Pull request created: ${response.data.html_url}`);
      return response.data;
    } catch (error) {
      console.error('Error creating pull request:', error.message);
      throw error;
    }
  }
}

module.exports = { GitHubApp };