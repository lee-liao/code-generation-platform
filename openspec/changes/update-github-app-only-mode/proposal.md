## Why
The platform currently uses a hybrid authentication approach combining GitHub App and Personal Access Token (PAT) for different operations. This creates complexity and requires managing multiple authentication methods. The GitHub App only mode will eliminate dependency on PAT for repository creation and Git operations, using GitHub App installation-based authentication for all GitHub operations.

## What Changes
- Implement webhook endpoints to capture GitHub App installation events
- Store installation IDs for each user/organization that installs the app
- Build user-to-installation mapping system
- Update authentication to use installation tokens for all operations
- Modify repository management to work within existing repositories
- Use GitHub REST API for all Git operations (eliminate Git CLI commands)
- **BREAKING**: Repository creation operations using PAT will be discontinued in favor of working with existing repositories

## Impact
- Affected specs: `github-app`, `github-app-pat-integration`
- Affected code: Authentication routing, repository creation methods
- Migration path needed for existing users