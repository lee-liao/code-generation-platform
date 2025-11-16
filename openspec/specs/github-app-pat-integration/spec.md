## GitHub App and Personal Access Token Integration Specification

### Requirement: Hybrid Authentication Architecture
The system SHALL use GitHub App authentication for all repository operations except repository creation and deletion, which MUST use Personal Access Token authentication.

#### Scenario: Operation Routing Success
- **WHEN** the system receives a request for repository creation or deletion
- **THEN** it routes the request using Personal Access Token authentication
- **AND** when the system receives other requests (branches, files, commits, PRs), it routes using GitHub App authentication

### Requirement: Authentication Configuration
The system SHALL properly configure and validate both GitHub App and Personal Access Token credentials from environment variables.

#### Scenario: Credential Validation Success
- **WHEN** the system initializes
- **THEN** it verifies that both GITHUB_APP_ID, GITHUB_PRIVATE_KEY_PATH, GITHUB_INSTALLATION_ID, and GITHUB_PERSONAL_ACCESS_TOKEN are available in environment variables

### Requirement: Fallback Authentication
The system SHALL handle repository operations gracefully when repositories are empty or when source branches don't exist.

#### Scenario: Empty Repository Initialization
- **WHEN** the system attempts to create a branch in an empty repository
- **THEN** it automatically initializes the repository with a README file before creating the branch

#### Scenario: Missing Source Branch Handling
- **WHEN** the system attempts to create a branch from a non-existent source branch
- **THEN** it attempts to use the repository's default branch as the source