## Why
To optimize performance and reduce API calls when updating AI-generated code, the platform needs a more efficient way to track and upload changes. Currently, the system re-uploads all files, which is inefficient for large codebases.

## What Changes
- Implement a local Git-based tracking system for AI-generated code.
- Use `git status` to identify added, modified, and deleted files (delta calculation).
- Batch upload changes using a single `POST /push-changes` API call instead of individual file uploads.
- Implement chunking strategy (e.g., 50 files per batch) to handle large commits and avoid payload size limits.

## Impact
- Affected specs: `codebase-generation` (or relevant existing capability)
- Affected code: `routes/codebase-generation.js`, `routes/openspec-implementation-agent.js`
