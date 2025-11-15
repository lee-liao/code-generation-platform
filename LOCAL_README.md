# GitHub App for Code Generation Platform

A GitHub App that automates repository management tasks including creating repositories, branches, adding files, committing, pushing, and creating pull requests.

## Features

- Create new GitHub repositories
- Create new branches in existing repositories
- Add/update files in repositories
- Create commits with specified messages
- Create pull requests between branches
- Secure authentication using GitHub App credentials

## Prerequisites

- A GitHub App created in your GitHub organization/account
- Private key for the GitHub App
- Installation ID of the GitHub App in the target organization

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd github-app-for-cgp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Set `GITHUB_APP_ID` to your GitHub App ID
   - Set `GITHUB_PRIVATE_KEY_PATH` to the path of your private key file (default: `./code-generation-platform.2025-11-13.private-key.pem`)
   - Set `GITHUB_INSTALLATION_ID` to your GitHub App's installation ID

4. Place your GitHub App private key in the project root (or at the path specified in `GITHUB_PRIVATE_KEY_PATH`)

## Environment Variables

- `GITHUB_APP_ID` - Your GitHub App ID
- `GITHUB_PRIVATE_KEY_PATH` - Path to your GitHub App private key file
- `GITHUB_INSTALLATION_ID` - Installation ID of your GitHub App
- `PORT` - Port to run the server on (default: 3000)

## API Endpoints

### POST /create-repo
Create a new repository
```json
{
  "owner": "organization-name",
  "name": "repository-name",
  "description": "Repository description",
  "isPrivate": false
}
```

### POST /create-branch
Create a new branch
```json
{
  "owner": "organization-name",
  "repo": "repository-name",
  "branchName": "new-branch-name",
  "sourceBranch": "main"
}
```

### POST /add-file
Add or update a file in a repository
```json
{
  "owner": "organization-name",
  "repo": "repository-name",
  "filePath": "path/to/file.txt",
  "content": "File content",
  "branch": "main",
  "commitMessage": "Add file via API"
}
```

### POST /create-pull-request
Create a pull request
```json
{
  "owner": "organization-name",
  "repo": "repository-name",
  "title": "PR Title",
  "body": "PR Description",
  "head": "source-branch",
  "base": "main"
}
```

## Running the Server

```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The server will run on `http://localhost:3000` by default.

## Local Development

1. Run with nodemon for automatic restart on file changes:
   ```bash
   npm run dev
   ```

2. The server will automatically restart when you make changes to the code.

## License

MIT