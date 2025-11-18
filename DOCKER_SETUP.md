## Docker Setup

To run this application using Docker, follow these steps:

### Prerequisites

- Docker installed on your system
- Docker Compose installed

### Configuration

1. **Environment Variables**: Docker Compose automatically loads environment variables from a `.env` file in the same directory. Copy the `example.env` file to `.env` and configure your environment variables:

   ```bash
   cp example.env .env
   ```

   You'll need to fill in the following values in your `.env` file:
   - `GITHUB_APP_ID`: Your GitHub App ID
   - `GITHUB_INSTALLATION_ID`: Your GitHub App installation ID
   - `GITHUB_PERSONAL_ACCESS_TOKEN`: Your GitHub Personal Access Token
   - `GITHUB_USERNAME`: Your GitHub username

   Docker Compose will automatically load these variables from the `.env` file when you run `docker-compose up`.

2. **GitHub Private Key**: If you're using GitHub App authentication, create a `.keystore` directory in the project root and place your private key file (e.g., `code-generation-platform.2025-11-16.private-key.pem`) inside it. Update the `GITHUB_PRIVATE_KEY_PATH` variable in your `.env` file to point to the correct filename (default is `./.keystore/private-key.pem`). This directory will be mounted into the container.

3. **Snippets Directory**: If you plan to use the codebase generation features, create a directory called `simplest-snippets` in the project root with your snippet files. This directory will be mounted into the container.

### Running the Application

To start the application:

```bash
docker-compose up -d
```

The application will be available at `http://localhost:8510` (host port 8510 mapped to container port 3000).

To view the logs:

```bash
docker-compose logs -f
```

To stop the application:

```bash
docker-compose down
```

### Building and Running Manually

If you prefer to build and run the container manually:

```bash
# Build the image
docker build -t code-generation-platform .

# Run the container
docker run -p ${HOST_PORT:-8510}:3000 --env-file .env code-generation-platform
```

The application will be available at `http://localhost:8510`.