# Feature Branch Workflow

This project enforces dedicated feature branches for all implementation work.

## Naming Rule

- Required branch pattern: `^\d{3}-[a-z0-9-]+$`
- Examples:
  - `001-advanced-todo-app`
  - `014-improve-task-motion`

## Required Guardrails

1. Never commit directly to `main`.
2. Create a dedicated feature branch before implementation.
3. Ensure CI branch-policy check passes before merge.
4. Capture pass/fail evidence in `specs/001-advanced-todo-app/checklists/execution-ready.md`.

## Validation

- Local validation script: `.specify/scripts/powershell/validate-feature-branch.ps1`
- CI validation workflow: `.github/workflows/branch-policy.yml`
