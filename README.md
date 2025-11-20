# Code Generation Platform

A GitHub App for creating repositories, branches, pulling, adding files, committing, pushing, and creating pull requests.

## API Documentation

This project uses OpenAPI Specification for interactive API documentation. After starting the server, you can access the interactive documentation at:

```
http://localhost:3000/api-docs
```

The documentation includes:
- Interactive API endpoints you can test directly in the browser
- Detailed request/response schemas
- Example values for all parameters
- Error response definitions

## Testing

This project has two types of tests:

1. **Unit tests**: Located in `__tests__/` directory, these test individual functions in isolation
2. **Integration tests**: Located in `tests/` directory, these test the complete functionality of the GitHub App

To run all tests:
```
npm test
```

To run only unit tests:
```
npm run test:unit
```

To run only integration tests:
```
npm run test:integration
```

> **Note**: Integration tests create real repositories, branches, and pull requests on GitHub. If tests are interrupted or fail, they may leave test data on GitHub. Always run the cleanup script after testing.

## Cleanup

To remove any test repositories created during testing:

```
npm run cleanup
```

This will delete any repositories with names starting with 'capability-test-', 'test-repo-', or 'branch-test-'.

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
- The GitHub App must be installed in user/organization accounts (installation ID will be captured via webhooks)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd code-generation-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Set `GITHUB_APP_ID` to your GitHub App ID
   - Initially set `GITHUB_INSTALLATION_ID` for initial setup (will be automatically updated when webhooks receive installation events)

4. For GitHub App authentication, place your private key in the `.keystore` directory (e.g., `.keystore/private-key.pem`)

## Environment Variables

- `GITHUB_APP_ID` - Your GitHub App ID
- `GITHUB_PRIVATE_KEY_PATH` - Path to your GitHub App private key file
- `GITHUB_INSTALLATION_ID` - Installation ID of your GitHub App
- `GITHUB_WEBHOOK_SECRET` - Secret for verifying webhook requests from GitHub
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

## Webhook Setup

To receive events from GitHub (such as installation events, push events, pull request events, etc.), you need to configure a webhook in your GitHub App settings:

1. In your GitHub App settings, set the Webhook URL to point to your server's `/webhook` endpoint
2. Generate a webhook secret and set it as `GITHUB_WEBHOOK_SECRET` in your environment variables
3. The webhook endpoint handles various GitHub events including:
   - Installation events (when users install your GitHub App)
   - Repository events (when repositories are added/removed from installation)
   - Push events (when code is pushed to repositories)
   - Pull request events (when pull requests are opened, updated, or closed)

For detailed setup instructions, see [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md).

## Running the Server

```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The server will run on `http://localhost:3000` by default.

## Docker Deployment

To run this application using Docker:

1. Copy the example environment file:
   ```bash
   cp example.env .env
   ```
   
2. Update the `.env` file with your specific configuration values (GitHub App credentials, etc.)

3. For GitHub App authentication, place your private key in the `.keystore` directory as `private-key.pem` (`.keystore/private-key.pem`)

4. If using snippets functionality, create a `simplest-snippets` directory with your snippet files

5. Build and run the containers:
   ```bash
   docker-compose up -d
   ```

The application will be available at `http://localhost:8510`, with the API documentation at `http://localhost:8510/api-docs`.

For more detailed Docker setup instructions, see [DOCKER_SETUP.md](./DOCKER_SETUP.md).

## Local Development

1. Run with nodemon for automatic restart on file changes:
   ```bash
   npm run dev
   ```

2. The server will automatically restart when you make changes to the code.

## License

MIT
