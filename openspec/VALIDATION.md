# OpenSpec Validation for Code Generation Platform

This project implements a hybrid GitHub App and Personal Access Token system that can:
1. Create and delete repositories (using Personal Access Token)
2. Create branches in repositories (with automatic handling for empty repositories)
3. Push changes to repositories  
4. Create pull requests
5. Manage files and commits
6. Retrieve repository information (pull operations)

## Current Specifications
- `specs/github-app/spec.md` - Core GitHub App functionality including all implemented operations
- `specs/github-app-pat-integration/spec.md` - Hybrid authentication architecture specification
- `specs/api-endpoints/spec.md` - Complete API endpoints documentation

## Implemented Capabilities
The following GitHub operations are now fully supported:
- ✅ Repository creation (using Personal Access Token)
- ✅ Repository deletion (using Personal Access Token)  
- ✅ Branch creation (with automatic empty repository handling)
- ✅ File management (add/update files)
- ✅ Commit operations (with multiple file changes)
- ✅ Push operations (automatic with commits)
- ✅ Pull request creation
- ✅ Pull operations (get branches, repo info, branch info)
- ✅ GitHub App authentication for standard operations
- ✅ Hybrid authentication routing (App vs PAT based on operation)
- ✅ Complete REST API with OpenAPI/Swagger documentation

## Architecture
- GitHub App authentication used for: branches, files, commits, PRs, pull operations
- Personal Access Token authentication used for: repository creation/deletion
- Automatic fallback handling for edge cases (empty repositories)

## API Endpoints
- **POST /create-repo** - Create repositories
- **POST /create-branch** - Create branches
- **POST /add-file** - Add/update files
- **POST /commit** - Commit multiple file changes
- **POST /create-pull-request** - Create pull requests
- **GET /branches** - Get all branches
- **GET /branch** - Get specific branch info
- **GET /repository** - Get repository info
- **GET /contents** - Get repository contents
- **GET /commit-info** - Get commit information
- **GET /compare** - Compare two commits
- **GET /installation-info** - Get GitHub App installation info
- **Codebase Generation Endpoints**:
  - **GET /** - Web interface for codebase generation
  - **POST /generate-codebase** - Initiates codebase generation from template with optional Claude AI processing
  - **GET /task-status/:taskId** - Checks status of background tasks with real-time updates
  - **POST /kill-process/:taskId** - Terminates a running task process for user control
- **Git Operations Endpoints**:
  - **POST /git-init** - Initialize Git repository
  - **POST /git-config** - Configure Git user information
  - **POST /git-add** - Add files to Git staging
  - **POST /git-commit** - Commit staged changes
  - **POST /git-remote** - Add Git remote
  - **POST /git-push** - Push changes to remote repository
  - **GET /git-status** - Get Git status
- **Validation Features**:
  - Checks if project folder exists
  - Validates that no sibling directory with same name exists  
  - Verifies that no GitHub repository with same name already exists
  - Provides appropriate error feedback to user interface
- **Interactive API documentation available at /api-docs** (OpenAPI/Swagger UI)

## Archived Changes
- `changes/archive/2025-11-15-add-github-app/` - Original implementation of GitHub App functionality