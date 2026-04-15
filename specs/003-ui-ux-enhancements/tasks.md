# Tasks: UI/UX Enhancements

**Input**: Design documents from `/specs/003-ui-ux-enhancements/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`

**Tests**: Included because the feature specification explicitly defines story-level testing outcomes and measurable quality constraints (contrast, timing, viewport behavior, performance).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare validation artifacts and documentation scaffolding for this feature.

- [x] T001 Create execution evidence checklist in `specs/003-ui-ux-enhancements/checklists/execution-ready.md`
- [x] T002 [P] Update verification workflow notes in `specs/003-ui-ux-enhancements/quickstart.md`
- [x] T003 [P] Add task-run tracking notes in `specs/003-ui-ux-enhancements/checklists/requirements.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared theme/motion infrastructure that all user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T004 Define canonical palette role tokens in `src/styles/tokens.css`
- [x] T005 [P] Implement shared motion constants (easing, duration bounds, stagger bounds) in `src/animations/motionConfig.js`
- [x] T006 [P] Add global transition utility rules for legibility-safe motion and anti-thrashing behavior in `src/styles/globals.css`
- [x] T007 Wire shared motion constants into list/item animation modules in `src/animations/taskItemMotion.js` and `src/animations/taskListMotion.js`
- [x] T008 Add reduced-motion preference hook in `src/hooks/useReducedMotionPreference.js`
- [x] T009 [P] Create viewport test helpers for `375px`, `768px`, and `1024px+` profiles in `tests/integration/viewportTestUtils.js`

**Checkpoint**: Foundational infrastructure is complete; user stories may proceed.

---

## Phase 3: User Story 1 - Apply Vibrant Light Visual Theme (Priority: P1) 🎯 MVP

**Goal**: Deliver consistent light-vibrant theming with WCAG AA contrast and legible loading behavior.

**Independent Test**: Verify semantic theme roles across core views with text contrast ≥ `4.5:1` and no load-phase legibility degradation.

### Tests for User Story 1

- [x] T010 [P] [US1] Add theme role + WCAG AA (`4.5:1`) contract tests in `tests/contract/theme-roles-contract.test.js`
- [x] T011 [P] [US1] Add load-phase text legibility integration tests in `tests/integration/theme-consistency.test.jsx`
- [x] T012 [P] [US1] Add viewport color-scheme consistency tests for `375px`, `768px`, and `1024px+` in `tests/integration/theme-viewport-consistency.test.jsx`

### Implementation for User Story 1

- [x] T013 [US1] Apply required role values and contrast-safe token pairings in `src/styles/tokens.css`
- [x] T014 [US1] Refactor global backgrounds/surfaces/text rules to semantic roles in `src/styles/globals.css`
- [x] T015 [P] [US1] Apply role-consistent styling for entry/filter controls in `src/components/AddTaskForm/AddTaskForm.jsx` and `src/components/TaskFilters/TaskFilters.jsx`
- [x] T016 [P] [US1] Apply role-consistent task/trash visual states in `src/components/TaskItem/TaskItem.jsx` and `src/components/TrashPanel/TrashPanel.jsx`
- [x] T017 [US1] Align shell panel hierarchy and loading readability behavior in `src/app/AppShell.jsx` and `src/styles/globals.css`

**Checkpoint**: US1 is independently functional and testable (MVP).

---

## Phase 4: User Story 2 - Enjoy Smooth Entrance Motion (Priority: P2)

**Goal**: Deliver strict entrance-motion timing/easing behavior, viewport-specific fade/stagger validation, and performance-safe transitions.

**Independent Test**: Verify slide/fade + stagger behavior with `cubic-bezier(0.4, 0, 0.2, 1)`, duration `0.4s–0.6s`, viewport-specific fade/stagger checks, and 60fps-target/no-thrashing behavior.

### Tests for User Story 2

- [x] T018 [P] [US2] Add motion contract tests for initial/final states, easing, and duration bounds in `tests/contract/motion-theme-contract.test.js`
- [x] T019 [P] [US2] Extend integration checks for stagger and fade correctness in `tests/integration/task-motion.test.jsx`
- [x] T020 [P] [US2] Add mobile (`375px`) stagger/fade integration tests in `tests/integration/task-motion.viewport-mobile.test.jsx`
- [x] T021 [P] [US2] Add tablet (`768px`) stagger/fade integration tests in `tests/integration/task-motion.viewport-tablet.test.jsx`
- [x] T022 [P] [US2] Add desktop (`1024px+`) stagger/fade integration tests in `tests/integration/task-motion.viewport-desktop.test.jsx`
- [x] T023 [P] [US2] Add transition performance/no-layout-thrashing integration tests in `tests/integration/task-motion-performance.test.jsx`

### Implementation for User Story 2

- [x] T024 [US2] Implement required slide-down + fade-in item variants in `src/animations/taskItemMotion.js`
- [x] T025 [US2] Implement waterfall stagger timing (`100–150ms`) in `src/animations/taskListMotion.js`
- [x] T026 [US2] Apply updated item/list entrance variants in `src/components/TaskList/TaskList.jsx`
- [x] T027 [P] [US2] Align panel transitions to required easing/duration policy in `src/animations/layoutMotion.js` and `src/app/AppShell.jsx`

**Checkpoint**: US1 and US2 are independently testable with validated motion behavior.

---

## Phase 5: User Story 3 - Experience Comfortable Interactions (Priority: P3)

**Goal**: Ensure interaction flows remain smooth, accessible, and reduced-motion-safe.

**Independent Test**: Validate add/delete/filter/toggle/panel-switch flows in normal and reduced-motion modes without abrupt transitions.

### Tests for User Story 3

- [x] T028 [P] [US3] Add reduced-motion interaction integration tests in `tests/integration/reduced-motion.test.jsx`
- [x] T029 [P] [US3] Add rapid consecutive state-change stability tests in `tests/integration/task-transition-stability.test.jsx`

### Implementation for User Story 3

- [x] T030 [US3] Integrate reduced-motion preference handling into shell and list composition in `src/app/AppShell.jsx` and `src/components/TaskList/TaskList.jsx`
- [x] T031 [P] [US3] Add reduced-motion-safe variants for item/list/panel transitions in `src/animations/taskItemMotion.js`, `src/animations/taskListMotion.js`, and `src/animations/layoutMotion.js`
- [x] T032 [P] [US3] Normalize interactive transition rules for non-jarring behavior in `src/styles/globals.css` and `src/components/TaskItem/TaskItem.jsx`
- [x] T033 [US3] Tune large-list transition stability in `src/components/TaskList/TaskList.jsx`

**Checkpoint**: All user stories are independently functional and testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation capture and release readiness.

- [x] T034 [P] Update final implementation runbook in `specs/003-ui-ux-enhancements/quickstart.md`
- [x] T035 [P] Record story-level verification evidence in `specs/003-ui-ux-enhancements/checklists/execution-ready.md`
- [x] T036 Run lint/test verification and capture results in `specs/003-ui-ux-enhancements/checklists/execution-ready.md`
- [x] T037 [P] Refresh readiness notes after implementation in `specs/003-ui-ux-enhancements/checklists/requirements.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all story work.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2 and integrates with US1 visual surfaces.
- **Phase 5 (US3)**: Depends on Phase 2 and extends stabilized motion flows.
- **Phase 6 (Polish)**: Depends on selected stories being complete.

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational; delivers MVP baseline.
- **US2 (P2)**: Starts after Foundational; integrates with themed surfaces from US1 but remains independently testable.
- **US3 (P3)**: Starts after Foundational; validates reduced-motion and interaction comfort over completed flows.

Recommended delivery order: **US1 → US2 → US3**.

### Within Each User Story

- Tests first (confirm expected failures before implementation).
- Shared definitions before component wiring.
- Story checkpoint validation before moving to next priority.

---

## Parallel Execution Examples

### User Story 1

- Parallel tests: `T010`, `T011`, `T012`.
- Parallel implementation: `T015`, `T016`.

### User Story 2

- Parallel tests: `T018`, `T019`, `T020`, `T021`, `T022`, `T023`.
- Parallel implementation: `T025`, `T027`.

### User Story 3

- Parallel tests: `T028`, `T029`.
- Parallel implementation: `T031`, `T032`.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup (Phase 1).
2. Complete Foundational (Phase 2).
3. Complete US1 (Phase 3).
4. Validate US1 independently.
5. Demo MVP.

### Incremental Delivery

1. Foundation complete (Phases 1–2).
2. Deliver US1 → validate.
3. Deliver US2 → validate.
4. Deliver US3 → validate.
5. Complete polish and evidence capture (Phase 6).

### Parallel Team Strategy

1. Team completes Setup + Foundational together.
2. Then split by domain:
   - Dev A: US1 theme/contrast
   - Dev B: US2 motion + viewport/performance
   - Dev C: US3 reduced-motion + interaction comfort
3. Merge at story checkpoints with tests.

---

## Notes

- `[P]` indicates task is parallelizable.
- `[US#]` maps each story task back to its user story.
- Every task references concrete file path targets for direct implementation.
