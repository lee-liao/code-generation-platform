## 1. Implementation
- [x] 1.1 Add `git` binary to Docker image (if not present) and configure global git user.
- [x] 1.2 Modify `routes/codebase-generation.js` to initialize local git repo and commit base state.
- [x] 1.3 Implement delta calculation logic using `git status --porcelain`.
- [x] 1.4 Update `setupGitAndPush` to use `githubApp.commitChanges` for batch updates.
- [x] 1.5 Verify `POST /commit` endpoint handles batch updates correctly.
