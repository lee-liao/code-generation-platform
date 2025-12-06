## ADDED Requirements
### Requirement: Git-Based Delta Updates
The system SHALL use a local Git repository to track changes made by the AI and upload only modified files to the remote repository.

#### Scenario: Batch Upload of Changes
- **WHEN** the AI completes code generation
- **THEN** the system calculates the delta using `git status`
- **AND** uploads all changed files in a single commit via the GitHub API
