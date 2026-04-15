# Contract: Motion & Theme Behavior

## Purpose

Define normative behavior for color-role usage and animation timing so implementation details remain interchangeable while user-facing outcomes stay consistent.

## Theme Role Contract

### Required Roles and Values

- `primary` = `#4A90E2`
- `secondary` = `#7ED321`
- `accent` = `#F5A623`
- `background` = `#F8F9FA`
- `text` = `#2C3E50`
- `surface` = `#FFFFFF`

### Behavioral Guarantees

- All core screens MUST render using semantic roles above.
- Accent usage MUST emphasize key actions/states without reducing readability.
- Text/surface combinations MUST satisfy WCAG AA minimum contrast ratio (`4.5:1`).
- Entrance/load animations MUST NOT reduce text legibility while content becomes visible.

## Entrance Motion Contract

### Required Timing Profile

- Initial: `opacity: 0`, `translateY: -20px`
- Final: `opacity: 1`, `translateY: 0`
- Duration: `0.6s`
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`

### Stagger Contract

- When multiple elements enter together, adjacent reveal delay MUST be `100–150ms`.
- Reveal order MUST follow rendered list order to maintain waterfall perception.

## Smooth Transition Policy

- Interaction transitions (add/delete/filter/switch/toggle) MUST avoid abrupt visual jumps.
- All scoped transitions MUST use easing `cubic-bezier(0.4, 0, 0.2, 1)`.
- All scoped transitions MUST use duration within `0.4s–0.6s`.
- Transition-heavy flows MUST target 60fps behavior and avoid layout thrashing under normal conditions.

## Viewport Consistency Contract

- Motion and theme behavior MUST be validated on:
  - Mobile (`375px`)
  - Tablet (`768px`)
  - Desktop (`1024px+`)
- Stagger delay and fade effects MUST remain consistent (functionally equivalent) across all three viewport profiles.

## Reduced-Motion Contract

- System MUST detect reduced-motion preference and provide minimized motion variants.
- Reduced mode MUST preserve state-change clarity while reducing non-essential movement.
- Reduced mode behavior MUST remain functionally equivalent to full-motion mode.

## Error Semantics

- If a required token role is missing, implementation MUST fail gracefully with a deterministic fallback and a traceable warning path.
- If motion variants are unavailable, implementation SHOULD degrade to simple opacity transition rather than abrupt state swaps.

## Versioning

- Breaking changes to role names, required values, or timing guarantees require contract version update and test plan updates.
