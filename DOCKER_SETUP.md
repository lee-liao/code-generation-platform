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
   - `GITHUB_PRIVATE_KEY_PATH`: Path to your GitHub App private key (inside the container)
   - `GITHUB_INSTALLATION_ID`: Your GitHub App installation ID
   - `GITHUB_PERSONAL_ACCESS_TOKEN`: Your GitHub Personal Access Token
   - `GITHUB_USERNAME`: Your GitHub username
   - `SNIPPETS_PATH`: Path to your snippets directory
   - `PORT`: Port inside the container (default: 3000)
   - `HOST_PORT`: Port on your host machine (default: 8510)

   Docker Compose will automatically load these variables from the `.env` file when you run `docker-compose up`.

2. **GitHub Private Key**: If you're using GitHub App authentication, you'll need to place your private key file in the project root as `private-key.pem`. This file will be mounted into the container.

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