# Project Context

## Purpose
A code generation platform that enables automated repository management through a hybrid GitHub App and Personal Access Token system. The platform can create and delete repositories, create branches, manage files, commit changes, push updates, retrieve repository information, and create pull requests via GitHub API integration. It provides a complete REST API with interactive documentation.

## Tech Stack
- Node.js
- Express.js for API server
- GitHub App API
- GitHub Personal Access Token
- @octokit/rest and @octokit/auth-app libraries
- Swagger/OpenAPI for API documentation
- JavaScript/TypeScript

## Project Conventions

### Code Style
- Use consistent indentation (2 spaces for JSON, 4 spaces for JS)
- Follow camelCase for variable names
- Use descriptive function and variable names
- Add meaningful comments for complex logic

### Architecture Patterns
- Hybrid GitHub App and Personal Access Token authentication for different operations
- GitHub App used for most repository operations (branches, files, commits, PRs)
- Personal Access Token used for repository creation and deletion
- Modular approach with separate functions for different GitHub operations
- Automatic handling of empty repositories by initializing with README
- REST API with comprehensive OpenAPI/Swagger documentation

### Testing Strategy
- Unit tests for individual functions
- Integration tests for GitHub API operations
- Mock GitHub API responses for testing
- End-to-end tests for complete workflows

### Git Workflow
- Feature branches for new functionality
- Pull requests for code review
- Main branch as stable production code

## API Endpoints
The platform provides a complete REST API with the following endpoints:
- **POST /create-repo** - Create repositories
- **POST /create-branch** - Create branches
- **POST /add-file** - Add/update files
- **POST /commit** - Commit multiple file changes
- **POST /create-pull-request** - Create pull requests
- **GET /branches** - Get all branches
- **GET /branch** - Get specific branch info
- **GET /repository** - Get repository info
- **Codebase Generation Endpoints**:
  - **GET /** - Web interface for codebase generation
  - **POST /generate-codebase** - Initiates codebase generation from template
  - **GET /task-status/:taskId** - Checks status of background tasks
  - **POST /kill-process/:taskId** - Terminates a running task process
- **Git Operations Endpoints**:
  - **POST /git-init** - Initialize Git repository
  - **POST /git-config** - Configure Git user information
  - **POST /git-add** - Add files to Git staging
  - **POST /git-commit** - Commit staged changes
  - **POST /git-remote** - Add Git remote
  - **POST /git-push** - Push changes to remote repository
  - **GET /git-status** - Get Git status
- **Additional Endpoints**:
  - **GET /contents** - Get repository contents
  - **GET /commit-info** - Get commit information
  - **GET /compare** - Compare two commits
  - **GET /installation-info** - Get GitHub App installation info
- **Interactive API documentation available at /api-docs** (OpenAPI/Swagger UI)

## Domain Context
The system works as a hybrid authentication system combining GitHub App capabilities with Personal Access Token functionality. For most operations (branch creation, file management, pull requests), it uses GitHub App authentication with JWT tokens and installation access tokens. For repository creation and deletion, it uses Personal Access Token authentication due to GitHub API limitations. The system automatically handles edge cases like empty repositories by initializing them with a README file.

## Important Constraints
- GitHub App needs proper permissions for repository operations (contents:write, pull_requests:write, etc.)
- Personal Access Token is required for repository creation and deletion
- Rate limiting applies to GitHub API calls
- GitHub Apps cannot create repositories for user accounts due to platform restrictions
- Repository access depends on app installation when using GitHub App authentication

## External Dependencies
- GitHub API
- GitHub App authentication system
- Personal Access Token for repository management
- @octokit/rest library for API interactions
- @octokit/auth-app library for GitHub App authentication
- swagger-jsdoc and swagger-ui-express for API documentation
- Node.js runtime environment
