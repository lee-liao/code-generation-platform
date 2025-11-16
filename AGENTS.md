<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# Code Generation Platform - Agents Documentation

## GitHub App Agent
The primary agent that handles all GitHub API operations including:

- Repository creation and deletion (using Personal Access Token)
- Branch creation with automatic handling for empty repositories
- File management (add/update files)
- Commit operations
- Pull request creation
- Information retrieval (branches, repository, and branch details)
- Hybrid authentication system combining GitHub App and Personal Access Token

## Codebase Generation Agent
The web-based agent that enables automated codebase creation from templates:

- Web interface for specifying project templates and repository details
- Validation system to check for existing directories and repositories
- Background task management for long-running operations
- Claude AI integration for code generation and modification
- Git and GitHub integration to create and push new repositories
- Asynchronous status monitoring with step-by-step progress reporting
- File-based logging system for operation tracking
- Template copying and project scaffolding capabilities