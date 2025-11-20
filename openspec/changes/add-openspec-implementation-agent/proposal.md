## Why
The platform needs an automated OpenSpec implementation agent that allows users to upload OpenSpec change specifications as zip files, automatically implements them using Claude AI, and creates pull requests. This streamlines the development process by automating the translation from specification to implementation.

## What Changes
- Add web UI with GitHub repository name input, OpenSpec zip file upload, and submit button
- Implement workflow to unzip and validate OpenSpec change files
- Create automated process to clone repository, implement changes with Claude AI, and create pull requests
- Integrate with GitHub App API for repository operations
- Add Claude CLI integration for automated implementation

## Impact
- Affected specs: New capability `openspec-implementation-agent`
- Affected code: New API endpoints, file upload handling, GitHub operations
- New endpoints: `/openspec-implement`, file upload handling