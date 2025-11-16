// jest.config.js
module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'github-app.js',
    'index.js',
    '!**/node_modules/**',
  ],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
};