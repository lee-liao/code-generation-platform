## ADDED Requirements

### Requirement: Codebase Generation Web Interface
The system SHALL provide a web interface that allows users to generate new GitHub repositories based on project templates with the following inputs:
- Project Folder With Spec (path to template project directory)
- GitHub repository name (name for the new GitHub repository) 
- GitHub repository description (description for the new GitHub repository)
- Enable Claude AI verbose logging checkbox (sets ANTHROPIC_LOG=debug when checked)
- Submit button to initiate the process

#### Scenario: Successful Interface Access
- **WHEN** user navigates to the root URL
- **THEN** the codebase generation form with all required inputs is displayed

#### Scenario: Form Submission
- **WHEN** user fills in required fields and clicks submit
- **THEN** the codebase generation process is initiated with appropriate status feedback

### Requirement: Input Validation
The system SHALL validate all inputs before starting the codebase generation process:
- Verify "Project Folder With Spec" exists in the file system
- Verify there isn't an existing folder named "GitHub repository name" as a sibling to "Project Folder With Spec"
- Verify there isn't an existing repository named "GitHub repository name" in the user's GitHub account

#### Scenario: Valid Input Validation
- **WHEN** all validation checks pass
- **THEN** the codebase generation process proceeds to the next step

#### Scenario: Invalid Project Folder
- **WHEN** the specified project folder does not exist
- **THEN** an appropriate error message is returned to the user interface

#### Scenario: Existing Sibling Directory
- **WHEN** a directory with the same name as the requested repository exists as a sibling
- **THEN** an appropriate error message is returned to the user interface

#### Scenario: Existing GitHub Repository
- **WHEN** a GitHub repository with the same name already exists
- **THEN** an appropriate error message is returned to the user interface

### Requirement: Background Task Management
The system SHALL manage long-running codebase generation operations using a background task system that includes:
- Unique task ID generation for each operation
- Process tracking with PID information
- Real-time status monitoring with step-by-step progress reporting
- Timeout handling for long-running processes (default 5 minutes)
- Graceful error handling and status updates

#### Scenario: Task Creation
- **WHEN** a new codebase generation request is received
- **THEN** a unique task ID is generated and the task is registered in the task manager

#### Scenario: Task Status Monitoring
- **WHEN** a client polls for task status
- **THEN** the current step and progress information is returned

#### Scenario: Task Timeout
- **WHEN** a process exceeds the timeout threshold
- **THEN** the process is terminated and the task status is updated accordingly

### Requirement: Claude AI Integration
The system SHALL integrate with Claude AI for optional code modifications during the generation process:
- Check for Claude CLI availability before executing commands
- Support verbose logging via ANTHROPIC_LOG=debug when requested
- Provide graceful handling when Claude AI is not installed
- Create placeholder output files when Claude is unavailable
- Implement timeout and process kill functionality for stuck processes

#### Scenario: Claude AI Available
- **WHEN** Claude CLI is installed and available
- **THEN** the Claude command is executed with appropriate environment settings

#### Scenario: Claude AI Unavailable
- **WHEN** Claude CLI is not installed or not in PATH
- **THEN** a placeholder output file is created and the process continues

#### Scenario: Claude Process Timeout
- **WHEN** Claude command exceeds timeout threshold
- **THEN** the process is terminated and the task status reflects the timeout

### Requirement: Git Operations API
The system SHALL provide comprehensive Git operations endpoints to support repository setup and management:
- POST /git-init: Initialize Git repository
- POST /git-config: Configure Git user information
- POST /git-add: Add files to Git staging
- POST /git-commit: Commit staged changes
- POST /git-remote: Add Git remote
- POST /git-push: Push changes to remote repository
- GET /git-status: Get Git status information

#### Scenario: Git Repository Initialization
- **WHEN** POST /git-init endpoint is called with directory parameter
- **THEN** Git repository is initialized in the specified directory

#### Scenario: Git Operations
- **WHEN** Git operation endpoints are called with appropriate parameters
- **THEN** the corresponding Git command is executed in the specified directory

### Requirement: Process Control
The system SHALL provide functionality to terminate long-running processes:
- POST /kill-process/:taskId endpoint to terminate specific processes
- Process tracking with PID information for each task
- Proper status updates when processes are terminated
- Error handling for already-terminated processes

#### Scenario: Process Kill Request
- **WHEN** a kill-process request is received for a running task
- **THEN** the corresponding process is terminated and status updated

#### Scenario: Already Terminated Process
- **WHEN** a kill-process request is received for an already-terminated process
- **THEN** the request is handled gracefully with appropriate response