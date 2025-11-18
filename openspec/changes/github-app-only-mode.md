# OpenSpec Feature: GitHub App Only Mode

## Overview
This feature specifies the implementation of a GitHub App-only mode that eliminates the dependency on Personal Access Tokens (PAT) for repository creation and Git operations. The solution will use GitHub App installation-based authentication for all GitHub operations.

## Current Implementation Status
The current implementation (as of November 2025) uses a hybrid approach:
- Repository creation: Uses GitHub API with PAT fallback in github-app.js
- Git operations: Uses GitHub API calls via addFilesToRepoViaAPI function (no Git CLI)
- Authentication: Both GitHub App installation tokens and PAT are required

## Feature Requirements

### 1. Installation ID Collection
- Implement webhook endpoints to capture GitHub App installation events
- Store installation IDs for each user/organization that installs the app
- Maintain a mapping between users and their installation IDs

### 2. User Authentication Flow
- Redirect users to GitHub App installation page
- Capture installation ID from webhook events
- Store installation ID in database for each user
- Use installation ID for all subsequent API calls

### 3. Repository Management in Existing Repos
- Instead of creating new repositories, work within existing repositories
- Allow users to select from repositories where the app is installed
- Create branches, add files, and manage pull requests within selected repositories

### 4. API-Only Git Operations
- Use GitHub REST API for all Git operations (commits, branches, etc.)
- Eliminate all Git CLI commands from the workflow
- Use GitHub's content API for file operations

## Implementation Plan

### Phase 1: Webhook Implementation
- Create webhook endpoint to receive installation events
- Implement webhook verification and security
- Store installation data in database

### Phase 2: Authentication System
- Build user-to-installation mapping system
- Update authentication to use installation tokens
- Remove PAT-based repository creation methods

### Phase 3: Repository Workflow
- Modify repository selection to use existing repositories
- Update codebase generation to work within existing repos
- Implement branch and file operations using GitHub API

### Phase 4: Migration
- Add migration path for existing users
- Update documentation for new authentication flow

## Exception Handling
- **Git API Repository Creation Removal**: The current functionality that uses Git API with PAT for repository creation will be completely removed when this feature is implemented. All repository creation operations will be discontinued in favor of working with existing repositories.
- **Current State Note**: Currently, the system uses PAT for repository creation but API calls for file operations (replacing Git CLI). This hybrid approach will be fully replaced by GitHub App-only authentication.

## Security Considerations
- Secure webhook endpoints with proper verification
- Properly scope installation tokens to minimal required permissions
- Ensure proper user data isolation

## Backwards Compatibility
- Maintain current PAT-based functionality during transition period
- Provide clear migration path for existing users
- Update API endpoints to support both modes initially