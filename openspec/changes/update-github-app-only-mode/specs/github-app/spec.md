## MODIFIED Requirements

### Requirement: Installation ID Collection
The system SHALL implement webhook endpoints to capture GitHub App installation events and store installation IDs for each user/organization that installs the app, maintaining a mapping between users and their installation IDs.

#### Scenario: Installation Event Capture
- **WHEN** a GitHub App installation event occurs
- **THEN** the installation ID is captured and stored with user mapping

#### Scenario: Installation ID Storage
- **WHEN** installation data is received
- **THEN** installation ID is stored in database for the user/organization

### Requirement: User Authentication Flow
The system SHALL redirect users to GitHub App installation page, capture installation ID from webhook events, store installation ID in database for each user, and use installation ID for all subsequent API calls.

#### Scenario: User Authentication Flow
- **WHEN** user needs to authenticate with GitHub
- **THEN** user is redirected to GitHub App installation page and installation ID is used for API calls

### Requirement: Repository Management in Existing Repos
The system SHALL work within existing repositories instead of creating new ones, allowing users to select from repositories where the app is installed and creating branches, adding files, and managing pull requests within selected repositories.

#### Scenario: Repository Selection
- **WHEN** user needs to work with a repository
- **THEN** user selects from existing repositories where the app is installed

#### Scenario: Operations in Existing Repositories
- **WHEN** user performs operations (branches, files, PRs)
- **THEN** operations are performed within selected existing repositories

## REMOVED Requirements

### Requirement: PAT Repository Creation
The system used to provide functionality to create new GitHub repositories using Personal Access Token (PAT) authentication.

**Reason**: This functionality conflicts with the GitHub App only mode which works within existing repositories.

**Migration**: Users will be directed to work within existing repositories where the app is installed instead of creating new ones.

### Requirement: Hybrid Authentication Routing for Repository Creation
The system used to route repository creation operations to Personal Access Token authentication while using GitHub App authentication for other operations.

**Reason**: This creates a hybrid authentication approach that contradicts the GitHub App only mode.

**Migration**: All operations will use GitHub App installation tokens exclusively.

## ADDED Requirements

### Requirement: API-Only Git Operations
The system SHALL use GitHub REST API for all Git operations (commits, branches, etc.) and eliminate all Git CLI commands from the workflow, using GitHub's content API for file operations.

#### Scenario: API-Based Git Operations
- **WHEN** Git operations are requested
- **THEN** GitHub REST API is used instead of Git CLI commands

#### Scenario: Content API Usage
- **WHEN** file operations are performed
- **THEN** GitHub's content API is used for management