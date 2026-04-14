# Tasks: Advanced Todo Experience

**Input**: Design documents from `/specs/001-advanced-todo-app/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`

**Tests**: Include tests because specification and design docs explicitly require independent testing of user stories and behavior validation.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline tooling/configuration.

- [ ] T001 Initialize application entry and shell composition in `src/main.jsx` and `src/app/AppShell.jsx`
- [ ] T002 Configure React, Zustand, Framer Motion, and test dependencies/scripts in `package.json`
- [ ] T003 [P] Configure Vitest + RTL test runtime in `vitest.config.js` and `tests/setupTests.js`
- [ ] T004 [P] Establish design token and global style scaffolding in `src/styles/tokens.css` and `src/styles/globals.css`
- [ ] T005 [P] Document feature-branch workflow conventions in `docs/process/feature-branch-workflow.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core architecture that must exist before user-story implementation.

**⚠️ CRITICAL**: No user story work starts until this phase is complete.

- [ ] T006 Create task entity model + validation helpers in `src/models/taskModel.js`
- [ ] T007 Implement versioned local persistence adapter in `src/persistence/localTaskStorage.js`
- [ ] T008 [P] Define reusable task query selectors in `src/state/taskSelectors.js`
- [ ] T009 [P] Implement task mutation action functions in `src/state/taskActions.js`
- [ ] T010 Compose Zustand store with hydration/persist integration in `src/state/taskStore.js`
- [ ] T011 Wire thin orchestration shell to store selectors/actions in `src/app/AppShell.jsx`
- [ ] T012 Create shared task test fixtures for state/component tests in `tests/unit/state/taskFixtures.js`

**Checkpoint**: Foundation complete — user stories can now be implemented.

---

## Phase 3: User Story 1 - Manage task lifecycle (Priority: P1) 🎯 MVP

**Goal**: Deliver create/edit/toggle/delete-to-trash/restore/permanent-delete lifecycle with reliable persistence.

**Independent Test**: Create a task, edit title, toggle completion, move to trash, restore, and permanently delete while verifying list updates and persisted state after reload.

### Tests for User Story 1

- [ ] T013 [P] [US1] Add store contract tests for action/selector behavior in `tests/contract/state-store-contract.test.js`
- [ ] T014 [P] [US1] Add AddTaskForm submission/validation tests in `src/components/AddTaskForm/AddTaskForm.test.jsx`
- [ ] T015 [P] [US1] Add TaskItem lifecycle interaction tests in `src/components/TaskItem/TaskItem.test.jsx`
- [ ] T016 [P] [US1] Add end-to-end lifecycle integration test in `tests/integration/task-lifecycle.test.jsx`

### Implementation for User Story 1

- [ ] T017 [P] [US1] Implement task creation form UI and intent callbacks in `src/components/AddTaskForm/AddTaskForm.jsx`
- [ ] T018 [P] [US1] Implement task item UI (display/edit/toggle/delete intents) in `src/components/TaskItem/TaskItem.jsx`
- [ ] T019 [P] [US1] Implement task list rendering and item event wiring in `src/components/TaskList/TaskList.jsx`
- [ ] T020 [P] [US1] Implement all/completed/incomplete filter controls in `src/components/TaskFilters/TaskFilters.jsx`
- [ ] T021 [P] [US1] Implement trash panel UI for restore/permanent delete in `src/components/TrashPanel/TrashPanel.jsx`
- [ ] T022 [US1] Integrate lifecycle actions and panel/filter state in `src/app/AppShell.jsx`
- [ ] T023 [US1] Persist every mutating store action through adapter in `src/state/taskStore.js` and `src/persistence/localTaskStorage.js`
- [ ] T024 [US1] Enforce edge-case handling (empty title, unknown task id, long title guard) in `src/state/taskActions.js` and `src/models/taskModel.js`

**Checkpoint**: User Story 1 is independently functional and testable (MVP).

---

## Phase 4: User Story 2 - Enjoy an engaging visual experience (Priority: P2)

**Goal**: Add smooth motion and a bold, readable visual system while preserving component/store boundaries.

**Independent Test**: Perform lifecycle actions and verify visible, smooth transitions and consistent status-focused visuals across screens.

### Tests for User Story 2

- [ ] T025 [P] [US2] Add component-boundary contract tests for callback-only interaction in `tests/contract/component-contracts.test.jsx`
- [ ] T026 [P] [US2] Add motion behavior integration tests for add/update/delete/toggle transitions in `tests/integration/task-motion.test.jsx`

### Implementation for User Story 2

- [ ] T027 [P] [US2] Define task-item enter/exit/state motion variants in `src/animations/taskItemMotion.js`
- [ ] T028 [P] [US2] Define list-stagger and layout motion variants in `src/animations/taskListMotion.js` and `src/animations/layoutMotion.js`
- [ ] T029 [US2] Apply centralized motion variants to task list and items in `src/components/TaskList/TaskList.jsx` and `src/components/TaskItem/TaskItem.jsx`
- [ ] T030 [US2] Implement high-contrast visual tokens and status cues in `src/styles/tokens.css` and `src/styles/globals.css`
- [ ] T031 [US2] Align visual consistency across forms/filters/trash UI in `src/components/AddTaskForm/AddTaskForm.jsx`, `src/components/TaskFilters/TaskFilters.jsx`, and `src/components/TrashPanel/TrashPanel.jsx`

**Checkpoint**: User Stories 1 and 2 both work with clear visual polish and motion feedback.

---

## Phase 5: User Story 3 - Use the app comfortably on any screen (Priority: P3)

**Goal**: Ensure complete core functionality remains usable on mobile, tablet, and desktop with large datasets.

**Independent Test**: Validate create/edit/toggle/delete/filter/trash flows across target breakpoints and verify 1,000-task interaction responsiveness.

### Tests for User Story 3

- [ ] T032 [P] [US3] Add viewport-based responsive interaction tests in `tests/integration/responsive-layout.test.jsx`
- [ ] T033 [P] [US3] Add large-list (1,000 tasks) performance tests in `tests/integration/large-list-performance.test.jsx` validating that at least 95% of primary interactions (open list, toggle status, apply filter) show visible feedback within 2 seconds

### Implementation for User Story 3

- [ ] T034 [P] [US3] Implement responsive layout breakpoints for shell and panels in `src/styles/globals.css`
- [ ] T035 [P] [US3] Optimize derived task filtering selectors for large collections in `src/state/taskSelectors.js`
- [ ] T036 [US3] Improve list rendering/update efficiency for large datasets in `src/components/TaskList/TaskList.jsx`
- [ ] T037 [US3] Validate and adjust shell composition for breakpoint-safe controls in `src/app/AppShell.jsx`

**Checkpoint**: All user stories are independently testable and usable across screen sizes.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, validation, and handoff readiness.

- [ ] T038 [P] Refresh implementation/verification notes in `specs/001-advanced-todo-app/quickstart.md`
- [ ] T039 Run lint/test verification and capture execution evidence in `specs/001-advanced-todo-app/checklists/execution-ready.md`
- [ ] T040 [P] Perform cleanup/refactor pass across `src/components/` and `src/state/`
- [ ] T041 [P] Summarize MVP and incremental delivery outcomes in `specs/001-advanced-todo-app/checklists/requirements.md`
- [ ] T042 [P] Add branch naming validation script in `.specify/scripts/powershell/validate-feature-branch.ps1`
- [ ] T043 [P] Add automated branch-policy check workflow in `.github/workflows/branch-policy.yml`
- [ ] T044 Add branch-policy pass/fail evidence capture gate in `specs/001-advanced-todo-app/checklists/execution-ready.md`
- [ ] T045 [P] Add local-only persistence contract test (no account/cloud sync dependency) in `tests/contract/local-only-persistence.test.js`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: no dependencies.
- **Phase 2 (Foundational)**: depends on Phase 1; blocks all user stories.
- **Phase 3 (US1)**: depends on Phase 2; delivers MVP.
- **Phase 4 (US2)**: depends on Phase 2 plus the core US1 component baseline (`TaskList`/`TaskItem`) for motion and visual integration.
- **Phase 5 (US3)**: depends on Phase 2 plus validated US1 core flows to ensure responsive/performance checks run against complete lifecycle behavior.
- **Phase 6 (Polish)**: depends on selected user stories being complete.

### User Story Dependency Graph

- **US1 (P1)** → independent MVP baseline
- **US2 (P2)** → visually/polish-focused, but integrates directly with US1 component surfaces
- **US3 (P3)** → validates responsiveness/performance over fully working US1 lifecycle flows

Recommended completion order: **US1 → US2 → US3**.

### Within Each User Story

- Write tests first and confirm failures before implementation.
- Implement models/state contracts before component integrations.
- Complete and validate each story before promoting to next priority.

---

## Parallel Execution Examples

### User Story 1

- Run in parallel: `T013`, `T014`, `T015`, `T016` (independent test files)
- Run in parallel: `T017`, `T018`, `T019`, `T020`, `T021` (separate component files)

### User Story 2

- Run in parallel: `T025`, `T026` (contract vs integration tests)
- Run in parallel: `T027`, `T028` (separate animation modules)

### User Story 3

- Run in parallel: `T032`, `T033` (separate integration scenarios)
- Run in parallel: `T034`, `T035` (styles vs selectors)

---

## Implementation Strategy

### MVP First (User Story 1)

1. Finish Phase 1 and Phase 2.
2. Deliver Phase 3 (US1).
3. Validate lifecycle + persistence independently.
4. Demo/review MVP.

### Incremental Delivery

1. Foundation complete (Phases 1–2).
2. Add US1 (MVP) → validate.
3. Add US2 (motion + visual polish) → validate.
4. Add US3 (responsive + large-list resilience) → validate.
5. Finish cross-cutting polish tasks.

### Parallel Team Strategy

1. Team aligns on Setup + Foundational phases.
2. Then split by story area:
   - Dev A: US1 lifecycle + persistence
   - Dev B: US2 motion + visual design system
   - Dev C: US3 responsiveness + performance
3. Merge at phase checkpoints with contract/integration tests.

---

## Notes

- `[P]` tasks indicate no direct dependency/file conflict and can execute concurrently.
- `[US#]` labels ensure traceability from `spec.md` priorities.
- Every task includes concrete file paths so an implementation agent can execute immediately.
