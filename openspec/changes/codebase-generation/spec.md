# OpenSpec Change Specification: Codebase Generation

## Change ID
codebase generation

## Purpose
Implement a web interface that allows users to generate new GitHub repositories based on a project template and snippets library. The system will copy a template project, apply snippet modifications using Claude AI (optional), and automatically create a GitHub repository with the generated code.

## Requirements

### Web Interface Requirements
1. Create a web page with the following inputs:
   - "Project Folder With Spec" - Path to template project directory
   - "GitHub repository name" - Name for the new GitHub repository
   - "GitHub repository description" - Description for the new GitHub repository
   - "Enable Claude AI verbose logging" checkbox - Sets ANTHROPIC_LOG=debug when checked
   - Submit button to initiate the process

### Validation Requirements
1. Verify "Project Folder With Spec" exists
2. Verify there isn't an existing folder named "GitHub repository name" as a sibling to "Project Folder With Spec"
3. Verify there isn't an existing repository named "GitHub repository name" in the user's personal GitHub account

### Background Task Requirements
1. Use "Project Folder With Spec" and a snippets library as template sources
2. Copy template directory to new directory named "GitHub repository name" (sibling to template)
3. Run Claude AI command (if available) in the new directory to apply changes
4. Gracefully handle cases where Claude AI is not installed
5. Store Claude output in "claude output.txt" (placeholder file if Claude not available)
6. Initialize Git repository and push to GitHub

### UI Feedback Requirements
1. Display "running... at step x" during processing
2. Asynchronously check background task status
3. Display "done" when complete with summary of work performed
4. Provide "Kill Process" button during Claude processing for user control
5. Show appropriate error messages when validations fail

### Process Management Requirements
1. Track spawned process PIDs for each task
2. Provide ability to kill specific processes via API
3. Implement timeout handling for long-running processes (5 minutes)
4. Provide graceful handling when Claude CLI is not installed

## Implementation Details

### Web Page Implementation
- Create HTML form with inputs for the required fields and verbose logging checkbox
- Add JavaScript to handle form submission and status monitoring
- Implement status endpoint to check background task progress
- Add "Kill Process" button during Claude processing
- Update status display with real-time progress

### Background Task Implementation
- Create a task manager for tracking long-running operations with process info
- Implement validation checks before starting the process
- Check for Claude CLI availability before executing command
- Copy template directory to new location
- Execute Claude AI with appropriate prompt when available
- Handle Git operations to push to GitHub
- Log all operations for debugging
- Implement proper error handling and status updates

### Claude AI Integration
- Check for Claude CLI availability using 'where claude' command
- Execute Claude command with appropriate environment variables
- Support verbose logging via ANTHROPIC_LOG=debug when checkbox is enabled
- Create placeholder output file when Claude is not available
- Implement timeout and kill functionality for stuck processes

### Validation Implementation
- Verify project folder exists using fs.access
- Check for sibling directory with same name using fs.access
- Verify GitHub repository doesn't exist using GitHub API
- Update task status with appropriate error messages
- Provide clear feedback to user interface

### Git Operations API
- Implement complete Git workflow endpoints for repository setup
- Support git init, config, add, commit, remote, and push operations
- Include git status endpoint for monitoring
- Provide comprehensive error handling