# Contract: UI Component Boundaries

## Purpose

Define responsibilities and data flow for key React components to enforce separation of UI from state management logic.

## Component Contracts

### `AddTaskForm`

- **Inputs**: submit handler (`onAddTask(title)`), optional loading/disabled flag.
- **Outputs**: submit intent with raw title string.
- **Rules**: no direct persistence/store writes; validation feedback rendered in UI only.

### `TaskList`

- **Inputs**: rendered task array, action callbacks (`onToggle`, `onDelete`, `onEdit`).
- **Outputs**: user intents emitted via callbacks.
- **Rules**: list rendering only; no business rules or storage behavior.

### `TaskItem`

- **Inputs**: single task view model, callbacks.
- **Outputs**: toggle/edit/delete intents.
- **Rules**: owns display-level interaction state (e.g., inline edit mode), not domain state.

### `TaskFilters`

- **Inputs**: current filter, counts, `onFilterChange` callback.
- **Outputs**: filter change intent.
- **Rules**: no direct data mutation.

### `TrashPanel`

- **Inputs**: trash task array, callbacks (`onRestore`, `onPermanentDelete`).
- **Outputs**: restore/permanent-delete intents.
- **Rules**: never executes deletion logic directly; delegates to store actions.

## Animation Boundary

- Components consume motion variants from `src/animations/*`.
- Components MUST NOT define large inline animation configuration objects except tiny one-off overrides.

## Composition Rule

- `App` (or app shell) composes components and binds store selectors/actions.
- `App` MUST NOT contain embedded domain logic blocks for task lifecycle operations.
