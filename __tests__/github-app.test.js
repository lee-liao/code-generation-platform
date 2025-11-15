// Mock environment variables to avoid file read issues in tests
process.env.GITHUB_APP_ID = 'test-app-id';
process.env.GITHUB_PRIVATE_KEY_PATH = './test-key.pem';
process.env.GITHUB_INSTALLATION_ID = 'test-installation-id';

// Mock the fs module to return a test key
jest.mock('fs', () => ({
  readFileSync: () => 'test-private-key-content',
  existsSync: () => true,
  writeFileSync: jest.fn(),
}));

// Mock the GitHub authentication and API
jest.mock('@octokit/auth-app', () => ({
  createAppAuth: jest.fn(() => () => ({ token: 'test-token' })),
}));

jest.mock('@octokit/rest', () => {
  const mockOctokit = {
    repos: {
      createInOrg: jest.fn(() => Promise.resolve({ data: { html_url: 'https://github.com/test-org/test-repo' } })),
      getBranch: jest.fn(() => Promise.resolve({ data: { commit: { sha: 'test-sha' } } })),
      createOrUpdateFileContents: jest.fn(() => Promise.resolve({ data: { content: { sha: 'test-file-sha' } } })),
    },
    git: {
      getRef: jest.fn(() => Promise.resolve({ data: { object: { sha: 'test-sha' } } })),
      createRef: jest.fn(() => Promise.resolve({ data: { ref: 'refs/heads/test-branch' } })),
      createBlob: jest.fn(() => Promise.resolve({ data: { sha: 'test-blob-sha' } })),
      createTree: jest.fn(() => Promise.resolve({ data: { sha: 'test-tree-sha' } })),
      createCommit: jest.fn(() => Promise.resolve({ data: { sha: 'test-commit-sha' } })),
      updateRef: jest.fn(() => Promise.resolve({ data: { ref: 'refs/heads/test-branch' } })),
    },
    pulls: {
      create: jest.fn(() => Promise.resolve({ data: { html_url: 'https://github.com/test-org/test-repo/pull/1' } })),
    }
  };

  return {
    Octokit: jest.fn(() => mockOctokit),
  };
});

const { GitHubApp } = require('../github-app');

describe('GitHubApp', () => {
  let githubApp;

  beforeEach(() => {
    githubApp = new GitHubApp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize without errors', () => {
    expect(githubApp).toBeDefined();
    expect(githubApp.auth).toBeDefined();
    expect(githubApp.octokit).toBeDefined();
  });

  test('should have all required methods', () => {
    expect(typeof githubApp.getGitHubClient).toBe('function');
    expect(typeof githubApp.createRepository).toBe('function');
    expect(typeof githubApp.createBranch).toBe('function');
    expect(typeof githubApp.addFile).toBe('function');
    expect(typeof githubApp.commitChanges).toBe('function');
    expect(typeof githubApp.pushChanges).toBe('function');
    expect(typeof githubApp.createPullRequest).toBe('function');
  });

  test('should create repository with correct parameters', async () => {
    const result = await githubApp.createRepository('test-org', 'test-repo', 'Test description');
    expect(result).toBeDefined();
  });
});