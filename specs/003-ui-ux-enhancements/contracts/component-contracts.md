# Contract: UI Component Boundaries (UI/UX Enhancements)

## Purpose

Define how components consume theme/motion behavior while preserving separation between presentation, animation definitions, and state management.

## Component Contracts

### `AppShell`

- **Inputs**: selected state slices and actions from store layer.
- **Outputs**: composed layout and panel-level transitions.
- **Rules**: MUST orchestrate composition only; MUST NOT embed task domain logic or inline large animation definitions.

### `TaskList`

- **Inputs**: filtered task view models, callbacks, list-level motion variants.
- **Outputs**: per-item interaction intents via callbacks.
- **Rules**: MUST apply list stagger contract; MUST NOT hard-code business rules.

### `TaskItem`

- **Inputs**: task view model, intent callbacks, item-level motion variants.
- **Outputs**: toggle/edit/delete intents.
- **Rules**: MAY hold ephemeral UI state (e.g., inline editing) but MUST NOT mutate persistence directly.

### `TaskFilters`

- **Inputs**: active filter, counts, callbacks.
- **Outputs**: filter change intent.
- **Rules**: MUST preserve smooth transition policy during filter switching.

### `TrashPanel`

- **Inputs**: trash task list, restore/delete callbacks.
- **Outputs**: restore/permanent-delete intents.
- **Rules**: MUST consume shared theme roles and motion policy consistently with active-task UI.

## Style & Motion Boundary Rules

- Theme colors MUST be consumed through semantic role tokens (not hard-coded per component).
- Text-bearing surfaces MUST maintain WCAG AA minimum contrast (`4.5:1`) under normal and loading states.
- Motion configs MUST be imported from `src/animations/*` (or equivalent central motion definitions).
- Transition definitions MUST adhere to shared easing/duration policy (`cubic-bezier(0.4, 0, 0.2, 1)`, `0.4s–0.6s`).
- Components SHOULD use reduced-motion variants when preference indicates motion reduction.
- Components participating in animated flows MUST behave consistently across Mobile (`375px`), Tablet (`768px`), and Desktop (`1024px+`) viewports.
- Any contract-breaking prop or callback signature change requires contract update and associated tests.
