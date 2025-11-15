// jest.config.js
module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'github-app.js',
    'index.js',
    '!**/node_modules/**',
  ],
};