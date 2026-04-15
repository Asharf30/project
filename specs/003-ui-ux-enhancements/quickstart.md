# Quickstart: UI/UX Enhancements

## Objective

Implement a vibrant light theme and measurable motion/legibility updates for the existing React todo application while preserving modular architecture and test confidence.

## Prerequisites

- Node.js 20+
- npm 10+
- Active branch: `005-overhaul-todo-ui`
- Feature docs generated in `specs/003-ui-ux-enhancements/`

## Recommended Implementation Order

1. **Align design tokens**
   - Map semantic roles in `src/styles/tokens.css` to required palette values.
   - Verify core surfaces and text roles in `src/styles/globals.css` consume semantic tokens.
   - Validate text contrast meets WCAG AA minimum ratio (`4.5:1`) across key surfaces.

2. **Implement shared motion constraints**
   - Define central motion constants in `src/animations/motionConfig.js`.
   - Enforce `cubic-bezier(0.4, 0, 0.2, 1)` and `0.4s–0.6s` transition window across applicable interactions.

3. **Implement entrance motion profile**
   - Update `src/animations/taskItemMotion.js` to the required slide/fade profile.
   - Ensure easing and duration match the motion contract.

4. **Apply staggered waterfall sequencing**
   - Update `src/animations/taskListMotion.js` with `100–150ms` adjacent delays.
   - Confirm reveal order follows rendered task order.

5. **Enforce transition-performance policy**
   - Audit interaction flows (add/delete/filter/toggle/panel switch) for abrupt jumps.
   - Ensure transition-heavy interactions avoid layout thrashing and preserve 60fps-target behavior.

6. **Add reduced-motion behavior**
   - Detect `prefers-reduced-motion` and use minimized motion variants.
   - Keep state-change clarity intact in reduced-motion mode.

7. **Validate viewport consistency and harden**
   - Add/extend tests for Mobile (`375px`), Tablet (`768px`), and Desktop (`1024px+`).
   - Verify stagger delays and fade effects on each viewport profile.
   - Perform manual visual QA for palette consistency and transition comfort.

## Verification Commands

Run from repository root:

- `npm run lint`
- `npm test`
- `pwsh ./.specify/scripts/powershell/validate-feature-branch.ps1`

## Implementation Runbook (Completed)

1. Implemented foundational theme and motion modules:
   - `src/styles/tokens.css`
   - `src/styles/globals.css`
   - `src/animations/motionConfig.js`
   - `src/hooks/useReducedMotionPreference.js`
2. Wired motion policy and reduced-motion behavior through:
   - `src/animations/taskItemMotion.js`
   - `src/animations/taskListMotion.js`
   - `src/animations/layoutMotion.js`
   - `src/app/AppShell.jsx`
   - `src/components/TaskList/TaskList.jsx`
3. Applied semantic action-role styling across interaction surfaces:
   - `src/components/AddTaskForm/AddTaskForm.jsx`
   - `src/components/TaskFilters/TaskFilters.jsx`
   - `src/components/TaskItem/TaskItem.jsx`
   - `src/components/TrashPanel/TrashPanel.jsx`
4. Added/updated contract and integration suites for theme, motion, viewports, reduced-motion, and stability under `tests/contract/` and `tests/integration/`.

## Final Verification Snapshot

- `npm run lint`: ✅ pass
- `npm test`: ✅ pass (`19` files, `38` tests)

## Manual Validation Checklist

- All defined color roles are visible and consistent across core views.
- Text contrast remains at or above `4.5:1` on audited surfaces.
- New item entrance uses slide-down + fade-in profile exactly.
- Multi-item reveal appears in waterfall sequence with perceptible stagger.
- Interaction transitions use required easing/duration and avoid layout-thrashing artifacts.
- Reduced-motion preference is respected while preserving clear state feedback.
- Motion and theme behavior are verified at `375px`, `768px`, and `1024px+`.
