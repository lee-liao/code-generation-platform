## ADDED Requirements

### Requirement: Repository Creation Endpoint
The system SHALL provide a POST /create-repo endpoint that creates new GitHub repositories using Personal Access Token authentication.

#### Scenario: Repository Creation Request
- **WHEN** a POST request is made to /create-repo with owner, name, description, and isPrivate parameters
- **THEN** a new repository is created and repository information is returned

### Requirement: Branch Creation Endpoint
The system SHALL provide a POST /create-branch endpoint that creates new branches from source branches.

#### Scenario: Branch Creation Request
- **WHEN** a POST request is made to /create-branch with owner, repo, branchName, and sourceBranch parameters
- **THEN** a new branch is created and branch reference information is returned

### Requirement: File Management Endpoint
The system SHALL provide a POST /add-file endpoint that adds or updates files in repositories.

#### Scenario: File Addition Request
- **WHEN** a POST request is made to /add-file with owner, repo, branch, filePath, content, and commitMessage parameters
- **THEN** the file is added or updated and file information is returned

### Requirement: Commit Operations Endpoint
The system SHALL provide a POST /commit endpoint that commits multiple file changes to repositories.

#### Scenario: Multi-File Commit Request
- **WHEN** a POST request is made to /commit with owner, repo, commitMessage, files, branch, and parentBranch parameters
- **THEN** all files are committed and commit information is returned

### Requirement: Pull Request Creation Endpoint
The system SHALL provide a POST /create-pull-request endpoint that creates pull requests between branches.

#### Scenario: Pull Request Creation Request
- **WHEN** a POST request is made to /create-pull-request with owner, repo, title, body, head, and base parameters
- **THEN** a new pull request is created and PR information is returned

### Requirement: Installation Information Endpoint
The system SHALL provide a GET /installation-info endpoint that retrieves GitHub App installation information.

#### Scenario: Installation Info Request
- **WHEN** a GET request is made to /installation-info
- **THEN** installation information is returned

### Requirement: Branch Listing Endpoint
The system SHALL provide a GET /branches endpoint that retrieves all branches from a repository.

#### Scenario: Branch Listing Request
- **WHEN** a GET request is made to /branches with owner and repo parameters
- **THEN** all branches in the repository are returned

### Requirement: Specific Branch Information Endpoint
The system SHALL provide a GET /branch endpoint that retrieves information about a specific branch.

#### Scenario: Specific Branch Request
- **WHEN** a GET request is made to /branch with owner, repo, and branchName parameters
- **THEN** information about the specified branch is returned

### Requirement: Repository Information Endpoint
The system SHALL provide a GET /repository endpoint that retrieves repository information.

#### Scenario: Repository Info Request
- **WHEN** a GET request is made to /repository with owner and repo parameters
- **THEN** repository information is returned

### Requirement: Repository Contents Endpoint
The system SHALL provide a GET /contents endpoint that retrieves repository contents.

#### Scenario: Repository Contents Request
- **WHEN** a GET request is made to /contents with owner, repo, path, and ref parameters
- **THEN** repository contents are returned

### Requirement: Commit Comparison Endpoint
The system SHALL provide a GET /compare endpoint that compares two commits.

#### Scenario: Commit Comparison Request
- **WHEN** a GET request is made to /compare with owner, repo, base, and head parameters
- **THEN** comparison information between the commits is returned

### Requirement: Commit Information Endpoint
The system SHALL provide a GET /commit-info endpoint that retrieves specific commit information.

#### Scenario: Commit Info Request
- **WHEN** a GET request is made to /commit-info with owner, repo, and ref parameters
- **THEN** information about the specified commit is returned

### Requirement: Codebase Generation Root Endpoint
The system SHALL provide a GET / endpoint that serves the codebase generation web interface.

#### Scenario: Codebase Generation Interface Access
- **WHEN** a GET request is made to /
- **THEN** the codebase generation web interface is served

### Requirement: Codebase Generation Initiation Endpoint
The system SHALL provide a POST /generate-codebase endpoint that initiates codebase generation from template.

#### Scenario: Codebase Generation Initiation
- **WHEN** a POST request is made to /generate-codebase with projectFolder, repoName, repoDescription, and verboseLogging parameters
- **THEN** a background task is created and task ID is returned

### Requirement: Task Status Check Endpoint
The system SHALL provide a GET /task-status/:taskId endpoint that checks the status of background tasks.

#### Scenario: Task Status Check
- **WHEN** a GET request is made to /task-status/:taskId
- **THEN** the current status of the specified task is returned

### Requirement: Process Termination Endpoint
The system SHALL provide a POST /kill-process/:taskId endpoint that terminates running task processes.

#### Scenario: Process Termination Request
- **WHEN** a POST request is made to /kill-process/:taskId
- **THEN** the process associated with the task is terminated

### Requirement: Git Operations Endpoints
The system SHALL provide Git operations endpoints under /git prefix for repository management.

#### Scenario: Git Init Request
- **WHEN** a POST request is made to /git/git-init with directory parameter
- **THEN** Git repository is initialized in the specified directory

#### Scenario: Git Config Request
- **WHEN** a POST request is made to /git/git-config with directory, email, and name parameters
- **THEN** Git user information is configured in the specified directory

#### Scenario: Git Add Request
- **WHEN** a POST request is made to /git/git-add with directory and files parameters
- **THEN** files are added to Git staging in the specified directory

#### Scenario: Git Commit Request
- **WHEN** a POST request is made to /git/git-commit with directory and message parameters
- **THEN** staged changes are committed in the specified directory

#### Scenario: Git Remote Request
- **WHEN** a POST request is made to /git/git-remote with directory, remoteUrl, and remoteName parameters
- **THEN** Git remote is added to the specified directory

#### Scenario: Git Push Request
- **WHEN** a POST request is made to /git/git-push with directory, remote, and branch parameters
- **THEN** changes are pushed to the remote repository

#### Scenario: Git Status Request
- **WHEN** a GET request is made to /git/git-status with directory parameter
- **THEN** Git status information is returned for the specified directory

### Requirement: API Documentation Endpoint
The system SHALL provide interactive API documentation at /api-docs endpoint using OpenAPI/Swagger UI.

#### Scenario: API Documentation Access
- **WHEN** a GET request is made to /api-docs
- **THEN** interactive API documentation is displayed