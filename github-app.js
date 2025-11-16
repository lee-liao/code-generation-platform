const { createAppAuth } = require('@octokit/auth-app');
const { Octokit } = require('@octokit/rest');

class GitHubApp {
  constructor() {
    // Initialize GitHub App authentication
    this.appAuth = createAppAuth({
      appId: process.env.GITHUB_APP_ID,
      privateKey: require('fs').readFileSync(process.env.GITHUB_PRIVATE_KEY_PATH, 'utf-8'),
    });
    
    // Initialize Octokit instance
    this.octokit = new Octokit();
  }

  // Get authenticated GitHub client for a specific installation
  async getGitHubClient(installationId) {
    const auth = await this.appAuth({
      type: "installation",
      installationId: installationId,
    });
    
    return new Octokit({
      auth: auth.token,
    });
  }

  // Create a new repository using personal access token
  async createRepository(owner, name, description = '', isPrivate = false) {
    // Check if personal access token is available for repository creation
    if (process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
      const github = new Octokit({
        auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      });

      try {
        const response = await github.repos.createForAuthenticatedUser({
          name: name,
          description: description,
          private: isPrivate,
        });

        console.log(`Repository created: ${response.data.html_url}`);
        return response.data;
      } catch (error) {
        console.error('Error creating repository with personal access token:', error.message);
        throw error;
      }
    } else {
      console.error('GITHUB_PERSONAL_ACCESS_TOKEN is not set in environment variables');
      throw new Error('GITHUB_PERSONAL_ACCESS_TOKEN is required for repository creation');
    }
  }

  // Create a new branch
  async createBranch(owner, repo, branchName, sourceBranch = 'main') {
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await this.getGitHubClient(installationId);

    try {
      // Get the reference of the source branch
      let sourceRef;
      try {
        sourceRef = await github.git.getRef({
          owner,
          repo,
          ref: `heads/${sourceBranch}`,
        });
      } catch (refError) {
        if (refError.message.includes('Git Repository is empty')) {
          // If the repository is empty, we need to handle this special case
          console.log(`Repository is empty, initializing with a default file first...`);
          
          // Add a default file to initialize the repository
          const defaultFileResponse = await this.addFile(
            owner,
            repo,
            'README.md',
            `# ${repo}\n\nInitial commit to initialize the repository.`,
            sourceBranch,
            'Initial commit: Add README'
          );
          
          // Now try to get the reference again
          sourceRef = await github.git.getRef({
            owner,
            repo,
            ref: `heads/${sourceBranch}`,
          });
        } else {
          // If the source branch doesn't exist, try to get the repository's default branch
          const repoInfo = await github.repos.get({
            owner,
            repo,
          });

          if (repoInfo.data.default_branch !== sourceBranch) {
            // If the source branch is not the default branch, check the default branch
            const defaultBranchRef = await github.git.getRef({
              owner,
              repo,
              ref: `heads/${repoInfo.data.default_branch}`,
            });
            sourceRef = defaultBranchRef;
            console.log(`Using default branch '${repoInfo.data.default_branch}' as source instead of '${sourceBranch}'`);
          } else {
            throw refError;
          }
        }
      }

      // Create a new branch
      const response = await github.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: sourceRef.data.object.sha,
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
  
  // Get installation information
  async getInstallationInfo() {
    // For getting installation info, we need app-level authentication, not installation-level
    const auth = await this.appAuth({
      type: "app",
    });
    
    const github = new Octokit({
      auth: auth.token,
    });

    try {
      const response = await github.apps.getInstallation({
        installation_id: process.env.GITHUB_INSTALLATION_ID
      });
      
      console.log(`Installation info:`, response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting installation info:', error.message);
      throw error;
    }
  }
  
  // Get all branches from a repository (pull operation)
  async getBranches(owner, repo) {
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await this.getGitHubClient(installationId);

    try {
      const response = await github.repos.listBranches({
        owner,
        repo,
        per_page: 100
      });

      console.log(`Retrieved ${response.data.length} branches from ${repo}`);
      return response.data;
    } catch (error) {
      console.error('Error getting branches:', error.message);
      throw error;
    }
  }
  
  // Get a specific branch
  async getBranch(owner, repo, branchName) {
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await this.getGitHubClient(installationId);

    try {
      const response = await github.repos.getBranch({
        owner,
        repo,
        branch: branchName,
      });

      console.log(`Retrieved branch: ${branchName}`);
      return response.data;
    } catch (error) {
      console.error('Error getting branch:', error.message);
      throw error;
    }
  }
  
  // Get repository information
  async getRepository(owner, repo) {
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await this.getGitHubClient(installationId);

    try {
      const response = await github.repos.get({
        owner,
        repo,
      });

      console.log(`Retrieved repository info: ${repo}`);
      return response.data;
    } catch (error) {
      console.error('Error getting repository:', error.message);
      throw error;
    }
  }
  
  // Delete a repository
  async deleteRepository(owner, repo) {
    if (process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
      const github = new Octokit({
        auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      });

      try {
        const response = await github.repos.delete({
          owner,
          repo,
        });

        console.log(`Repository deleted: ${owner}/${repo}`);
        return response;
      } catch (error) {
        console.error('Error deleting repository with personal access token:', error.message);
        throw error;
      }
    } else {
      console.error('GITHUB_PERSONAL_ACCESS_TOKEN is not set in environment variables');
      throw new Error('GITHUB_PERSONAL_ACCESS_TOKEN is required for repository deletion');
    }
  }
  
  // Get repository contents
  async getContents(owner, repo, path = '', ref = 'main') {
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await this.getGitHubClient(installationId);

    try {
      const response = await github.repos.getContent({
        owner,
        repo,
        path,
        ref,
      });

      console.log(`Retrieved contents for path: ${path} in ${repo}`);
      return response.data;
    } catch (error) {
      console.error('Error getting repository contents:', error.message);
      throw error;
    }
  }
  
  // Compare two commits
  async compareCommits(owner, repo, base, head) {
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await this.getGitHubClient(installationId);

    try {
      const response = await github.repos.compareCommits({
        owner,
        repo,
        base,
        head,
      });

      console.log(`Compared commits ${base}...${head} in ${repo}`);
      return response.data;
    } catch (error) {
      console.error('Error comparing commits:', error.message);
      throw error;
    }
  }
  
  // Get commit information
  async getCommit(owner, repo, ref) {
    const installationId = process.env.GITHUB_INSTALLATION_ID;
    const github = await this.getGitHubClient(installationId);

    try {
      const response = await github.repos.getCommit({
        owner,
        repo,
        ref,
      });

      console.log(`Retrieved commit info for: ${ref} in ${repo}`);
      return response.data;
    } catch (error) {
      console.error('Error getting commit info:', error.message);
      throw error;
    }
  }
}

module.exports = { GitHubApp };