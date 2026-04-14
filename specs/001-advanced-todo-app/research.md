# Research: Advanced Todo Experience

## Decision 1: Use modular component architecture with feature-focused folders

- **Decision**: Split UI into isolated components (`AddTaskForm`, `TaskList`, `TaskItem`, `TaskFilters`, `TrashPanel`) and keep `App` as a composition/root shell only.
- **Rationale**: Directly satisfies the user request to avoid a bloated `App.js`, improves testability, and allows independent iteration on UX-heavy parts.
- **Alternatives considered**:
  - Single-file UI in `App.js`: rejected due to maintainability and poor separation of concerns.
  - Overly granular micro-components from day one: rejected for premature complexity in v1.

## Decision 2: Isolate Framer Motion definitions in dedicated animation modules

- **Decision**: Keep animation variants and transitions in `src/animations/` (e.g., task item enter/exit, list stagger, layout transitions) and import them into UI components.
- **Rationale**: Prevents animation code from cluttering component logic, supports consistent motion language, and enables easier tuning/performance checks.
- **Alternatives considered**:
  - Inline animation objects inside each component: rejected due to duplication and readability loss.
  - CSS-only transitions for all interactions: rejected because Framer Motion provides better orchestration for list and layout transitions.

## Decision 3: Separate state management from UI using a dedicated store layer

- **Decision**: Implement a centralized task state store (Zustand) under `src/state/`, with selector helpers and action methods consumed by presentation components.
- **Rationale**: Enforces clean separation between data logic and rendering, matching the user’s explicit requirement to separate state management from UI.
- **Alternatives considered**:
  - React local component state only: rejected for cross-component coordination complexity (filters, trash, counts).
  - Redux Toolkit: rejected for v1 due to added boilerplate relative to required scope.
  - React Context + reducers: viable, but rejected because selector ergonomics/performance are less straightforward for a rapidly changing task list.

## Decision 4: Persist data locally with versioned local storage adapter

- **Decision**: Use a persistence adapter under `src/persistence/` to save/load task state from browser local storage on the same device only.
- **Rationale**: Aligns with clarified v1 scope (local-only persistence, no cloud sync) and keeps persistence isolated from UI/state logic.
- **Alternatives considered**:
  - IndexedDB: rejected for v1 due to additional complexity not required by current functional scope.
  - Cloud backend sync: rejected because spec explicitly excludes account-based synchronization.

## Decision 5: Implement soft-delete workflow with explicit permanent delete

- **Decision**: Deleting from active list moves task to trash; users can restore or permanently delete manually from trash.
- **Rationale**: Matches clarified functional behavior and reduces accidental data loss while preserving user control.
- **Alternatives considered**:
  - Immediate hard delete: rejected because it conflicts with clarified trash/archive requirement.
  - Auto-delete retention windows (7/30 days): rejected because clarified scope requires manual permanent deletion only.

## Decision 6: Responsive, high-contrast theme via design tokens and component-scoped styling

- **Decision**: Define reusable design tokens (color, spacing, radius, elevation, motion timing) and apply responsive layouts through component-scoped styles.
- **Rationale**: Supports strong visual identity (“ألوان جامدة”) while maintaining consistency and readability across screen sizes.
- **Alternatives considered**:
  - Ad-hoc styles per component without shared tokens: rejected due to inconsistent appearance.
  - Heavy design framework adoption for v1: rejected to preserve flexibility and avoid unnecessary coupling.

## Decision 7: Testing strategy centered on unit/integration behavior for core task lifecycle

- **Decision**: Use Vitest + React Testing Library for unit/integration tests of state actions, component interactions, and critical user journeys.
- **Rationale**: Covers the independent testability goals from the spec while remaining lightweight for a frontend-focused implementation.
- **Alternatives considered**:
  - End-to-end tests only: rejected because debugging and feedback loops are slower for v1.
  - No automated testing: rejected due to high regression risk across task lifecycle and responsive states.
