# Quickstart: Advanced Todo Experience

## Objective

Implement a modular React todo application with Framer Motion, clean separation of UI/state logic, local device persistence, and responsive design.

## Prerequisites

- Node.js 20+
- npm 10+
- Git branch: `002-create-feature-branch`

## Recommended Implementation Order

1. **Scaffold project shell**
   - Initialize React app structure.
   - Keep root app file as composition only (no feature-heavy logic).

2. **Create source structure**
   - `src/components/` for presentational/feature components.
   - `src/animations/` for Framer Motion variants/transitions.
   - `src/state/` for store, actions, selectors.
   - `src/persistence/` for local storage adapter.
   - `src/models/` for entity helpers and validation.

3. **Implement state layer first**
   - Define task actions: create/edit/toggle/move-to-trash/restore/permanent-delete.
   - Add selectors for active, completed, incomplete, trash.
   - Integrate persistence adapter for load/save.

4. **Implement UI components**
   - `AddTaskForm`
   - `TaskList`
   - `TaskItem`
   - `TaskFilters`
   - `TrashPanel`
   - Compose these inside a thin app container.

5. **Add animation modules**
   - Define reusable list/item enter-exit variants.
   - Add layout transitions and micro-interactions.
   - Ensure animation configs are imported from `src/animations/` only.

6. **Responsive styling and visual system**
   - Apply design tokens for vivid color palette and spacing.
   - Validate mobile/tablet/desktop layouts.

7. **Testing and verification**
   - Unit/integration tests for lifecycle actions and filter behavior.
   - Manual check for 1,000-task usability threshold.
   - Verify trash behavior (manual permanent delete only).

## Manual Validation Checklist

- Create, edit title, complete/incomplete toggle, move to trash, restore, permanent delete.
- Data persists after reload on same device.
- Active list and trash are separated correctly.
- App remains usable across common breakpoints.
- App root file remains orchestration-only; feature logic stays in modules.
