## Why
The platform needs to provide an automated codebase generation capability that allows users to create new GitHub repositories from project templates with optional AI-powered modifications using Claude AI. This addresses the need for rapid project bootstrapping and template-based development workflows.

## What Changes
- Add web interface for codebase generation with project folder, repository name, description, and Claude AI logging options
- Implement validation system to check for existing directories and repositories
- Create background task management system with process tracking and status monitoring
- Integrate Claude AI with availability checking, timeout handling, and graceful fallback
- Add comprehensive Git operations API for repository setup and push operations
- Implement process kill functionality for user control over long-running tasks
- **BREAKING**: The current non-standard spec files (VALIDATION.md and github-app-only-mode.md) will be properly converted to OpenSpec format

## Impact
- Affected specs: New capability `codebase-generation`
- Affected code: New routes, background task management, UI components
- New endpoints: `/generate-codebase`, `/task-status/:taskId`, `/kill-process/:taskId`, `/git/*`