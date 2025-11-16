## API Endpoints Specification

## Summary
The platform provides comprehensive API endpoints for GitHub repository management, codebase generation, and Git operations.

### Codebase Generation Operations

#### GET /
Serves the web interface for codebase generation with form inputs and real-time status updates.

#### POST /generate-codebase
Initiates codebase generation from a template with Claude AI processing (if available) and comprehensive validation.

**Request:**
```json
{
  "projectFolder": "string",
  "repoName": "string", 
  "repoDescription": "string (optional)",
  "verboseLogging": "boolean (optional, default: false)"
}
```

**Response:**
```json
{
  "taskId": "string"
}
```

#### GET /task-status/{taskId}
Checks the status of a background codebase generation task.

**Response:**
```json
{
  "step": "string",
  "message": "string",
  "completed": "boolean",
  "summary": "string (when completed)"
}
```

#### POST /kill-process/{taskId}
Terminates the process associated with a codebase generation task.

**Response:**
```json
{
  "success": "boolean",
  "message": "string",
  "pid": "integer"
}
```

### Repository Operations

#### POST /create-repo
Creates a new GitHub repository using Personal Access Token authentication.

**Request:**
```json
{
  "owner": "string",
  "name": "string", 
  "description": "string (optional)",
  "isPrivate": "boolean (optional, default: false)"
}
```

**Response:**
```json
{
  "id": "integer",
  "name": "string",
  "html_url": "string"
}
```

#### DELETE /delete-repo
Deletes a GitHub repository using Personal Access Token authentication.

**Request:**
```json
{
  "owner": "string",
  "repo": "string"
}
```

**Response:**
Standard GitHub API response for repository deletion.

### Branch Operations

#### POST /create-branch
Creates a new branch from a source branch in the specified repository using GitHub App authentication.

**Request:**
```json
{
  "owner": "string",
  "repo": "string", 
  "branchName": "string",
  "sourceBranch": "string (optional, default: 'main')"
}
```

**Response:**
```json
{
  "ref": "string",
  "object": {
    "sha": "string"
  }
}
```

### File Operations

#### POST /add-file
Adds or updates a file in the specified repository using GitHub App authentication.

**Request:**
```json
{
  "owner": "string",
  "repo": "string",
  "filePath": "string",
  "content": "string", 
  "branch": "string (optional, default: 'main')",
  "commitMessage": "string (optional, default: 'Add file via API')"
}
```

**Response:**
```json
{
  "content": {
    "path": "string",
    "sha": "string"
  }
}
```

### Commit Operations

#### POST /commit
Creates a commit with multiple file changes in the specified repository using GitHub App authentication.

**Request:**
```json
{
  "owner": "string",
  "repo": "string",
  "commitMessage": "string",
  "files": [
    {
      "path": "string",
      "content": "string"
    }
  ],
  "branch": "string (optional, default: 'main')",
  "parentBranch": "string (optional, default: 'main')"
}
```

**Response:**
```json
{
  "commit": {
    "sha": "string"
  },
  "ref": {
    "ref": "string"
  }
}
```

### Pull Request Operations

#### POST /create-pull-request
Creates a new pull request between branches using GitHub App authentication.

**Request:**
```json
{
  "owner": "string",
  "repo": "string",
  "title": "string",
  "body": "string",
  "head": "string (source branch)",
  "base": "string (target branch, default: 'main')"
}
```

**Response:**
```json
{
  "id": "integer",
  "title": "string",
  "html_url": "string"
}
```

### Pull Operations (Information Retrieval)

#### GET /installation-info
Retrieves GitHub App installation information using GitHub App authentication.

**Response:**
```json
{
  "id": "integer",
  "account": {
    "login": "string",
    "type": "string"
  }
}
```

#### GET /branches
Retrieves all branches from a repository using GitHub App authentication.

**Query Parameters:**
- owner: Repository owner (required)
- repo: Repository name (required)

**Response:**
```json
[
  {
    "name": "string",
    "commit": {
      "sha": "string"
    }
  }
]
```

#### GET /branch
Retrieves information about a specific branch in a repository using GitHub App authentication.

**Query Parameters:**
- owner: Repository owner (required)
- repo: Repository name (required)
- branchName: Name of the branch to retrieve (required)

**Response:**
```json
{
  "name": "string",
  "commit": {
    "sha": "string"
  }
}
```

#### GET /repository
Retrieves information about a specific repository using GitHub App authentication.

**Query Parameters:**
- owner: Repository owner (required)
- repo: Repository name (required)

**Response:**
```json
{
  "id": "integer",
  "name": "string",
  "full_name": "string",
  "description": "string",
  "default_branch": "string"
}
```

### Repository Content Operations

#### GET /contents
Retrieves the contents of a repository path using GitHub App authentication.

**Query Parameters:**
- owner: Repository owner (required)
- repo: Repository name (required)
- path: Path to the file or directory in the repository (optional, default: "")
- ref: The name of the commit/branch/tag (optional, default: "main")

**Response:**
Standard GitHub API response for repository contents.

#### GET /commit-info
Retrieves information about a specific commit using GitHub App authentication.

**Query Parameters:**
- owner: Repository owner (required)
- repo: Repository name (required)
- ref: The commit SHA or branch name (required)

**Response:**
```json
{
  "sha": "string",
  "commit": {
    "message": "string"
  }
}
```

#### GET /compare
Compares two commits in a repository using GitHub App authentication.

**Query Parameters:**
- owner: Repository owner (required)
- repo: Repository name (required)
- base: The base commit (required)
- head: The head commit (required)

**Response:**
```json
{
  "files": [
    {
      "filename": "string",
      "status": "string",
      "additions": "integer",
      "deletions": "integer"
    }
  ],
  "commits": [
    {
      "sha": "string",
      "commit": {
        "message": "string"
      }
    }
  ]
}
```

### Git Operations

#### POST /git-init
Initializes a Git repository in the specified directory.

**Request:**
```json
{
  "directory": "string",
  "branch": "string (optional, default: 'main')"
}
```

**Response:**
```json
{
  "success": "boolean",
  "message": "string"
}
```

#### POST /git-config
Configures Git user information for the repository.

**Request:**
```json
{
  "directory": "string",
  "email": "string",
  "name": "string"
}
```

**Response:**
```json
{
  "success": "boolean",
  "message": "string",
  "email": "string",
  "name": "string"
}
```

#### POST /git-add
Adds files to the Git staging area.

**Request:**
```json
{
  "directory": "string",
  "files": "string (optional, default: '.')"
}
```

**Response:**
```json
{
  "success": "boolean",
  "message": "string"
}
```

#### POST /git-commit
Commits the staged changes to the repository.

**Request:**
```json
{
  "directory": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": "boolean",
  "message": "string"
}
```

#### POST /git-remote
Adds a remote Git repository.

**Request:**
```json
{
  "directory": "string",
  "remoteUrl": "string",
  "remoteName": "string (optional, default: 'origin')"
}
```

**Response:**
```json
{
  "success": "boolean",
  "message": "string"
}
```

#### POST /git-push
Pushes committed changes to the remote repository.

**Request:**
```json
{
  "directory": "string",
  "remote": "string (optional, default: 'origin')",
  "branch": "string (optional, default: 'main')"
}
```

**Response:**
```json
{
  "success": "boolean",
  "message": "string"
}
```

#### GET /git-status
Gets the current Git status of the repository.

**Query Parameters:**
- directory: Path to the Git repository directory (required)

**Response:**
```json
{
  "success": "boolean",
  "directory": "string",
  "status": "array of strings",
  "hasChanges": "boolean"
}
```

### Codebase Generation Operations

#### POST /generate-codebase
Initiates codebase generation from a template with Claude AI processing.

**Request:**
```json
{
  "projectFolder": "string",
  "repoName": "string", 
  "repoDescription": "string (optional)"
}
```

**Response:**
```json
{
  "taskId": "string"
}
```

#### GET /task-status/{taskId}
Checks the status of a background codebase generation task.

**Response:**
```json
{
  "step": "string",
  "message": "string",
  "completed": "boolean",
  "summary": "string (when completed)"
}
```

#### POST /kill-process/{taskId}
Terminates the process associated with a codebase generation task.

**Response:**
```json
{
  "success": "boolean",
  "message": "string",
  "pid": "integer"
}
```

### Health Check

#### GET /
Health check endpoint to verify the API is running.

**Response:**
```json
{
  "message": "GitHub App for CGP is running!"
}
```

## Authentication

- **GitHub App Authentication**: Used for most operations (branches, files, commits, PRs, pull operations)
- **Personal Access Token**: Used for repository creation and deletion