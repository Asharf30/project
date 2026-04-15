# Data Model: UI/UX Enhancements

## Entity: ThemeRoleSet

**Description**: Canonical set of semantic color roles used by the UI for this feature.

### Fields

- `primary` (hex color, required): `#4A90E2`
- `secondary` (hex color, required): `#7ED321`
- `accent` (hex color, required): `#F5A623`
- `background` (hex color, required): `#F8F9FA`
- `text` (hex color, required): `#2C3E50`
- `surface` (hex color, required): `#FFFFFF`

### Validation Rules

- All fields MUST be valid 6-digit hex values.
- Role keys MUST exist together as a complete set.
- Theme role assignment MUST be consistent across audited core views.
- Text-bearing role combinations MUST satisfy WCAG AA minimum contrast ratio (`4.5:1`).

---

## Entity: EntranceMotionSpec

**Description**: Standardized entrance behavior for newly visible UI list elements.

### Fields

- `initialOpacity` (number, required): `0`
- `initialTranslateY` (number, required): `-20` (px)
- `finalOpacity` (number, required): `1`
- `finalTranslateY` (number, required): `0` (px)
- `durationSeconds` (number, required): `0.6`
- `easingCurve` (tuple<number>, required): `[0.4, 0, 0.2, 1]`

### Validation Rules

- Initial state MUST represent hidden + offset-from-top entry.
- Final state MUST represent visible + settled position.
- Duration and easing MUST be applied consistently to eligible entrance animations.

---

## Entity: StaggerSequenceRule

**Description**: Waterfall reveal timing applied when multiple items enter in sequence.

### Fields

- `minDelayMs` (number, required): `100`
- `maxDelayMs` (number, required): `150`
- `strategy` (enum, required): `sequential-waterfall`

### Validation Rules

- Delay between adjacent elements MUST remain inside `100–150ms`.
- Sequence order MUST follow visual order of rendered elements.
- Stagger behavior MUST remain deterministic for equivalent state snapshots.

---

## Entity: TransitionComfortPolicy

**Description**: Rules ensuring interaction transitions are smooth and non-jarring.

### Fields

- `abruptMotionAllowed` (boolean, required): `false`
- `reducedMotionSupported` (boolean, required): `true`
- `requiredEasing` (tuple<number>, required): `[0.4, 0, 0.2, 1]`
- `minDurationSeconds` (number, required): `0.4`
- `maxDurationSeconds` (number, required): `0.6`
- `targetFrameRate` (number, required): `60`
- `layoutThrashingAllowed` (boolean, required): `false`
- `appliesTo` (set, required): `add`, `delete`, `filter`, `panel-switch`, `state-toggle`

### Validation Rules

- Interactions listed in `appliesTo` MUST avoid sudden visual jumps.
- Transition easing MUST match `requiredEasing` for scoped interactions.
- Transition durations MUST remain between `minDurationSeconds` and `maxDurationSeconds`.
- Transition execution SHOULD preserve target frame-rate behavior under normal workloads.
- Layout thrashing is not acceptable during transition-heavy flows.
- Reduced-motion mode MUST preserve state-change clarity while reducing non-essential movement.

---

## Entity: ViewportValidationMatrix

**Description**: Explicit viewport verification definitions for color and motion consistency.

### Fields

- `mobileWidth` (number, required): `375`
- `tabletWidth` (number, required): `768`
- `desktopMinWidth` (number, required): `1024`
- `requiredMotionChecks` (set, required): `stagger-delay`, `fade-effect`
- `requiredThemeChecks` (set, required): `role-consistency`, `text-contrast`

### Validation Rules

- All required checks MUST be executed at each viewport profile.
- Stagger and fade behavior MUST remain functionally consistent across all viewport profiles.
- Theme role mapping and contrast compliance MUST hold across all viewport profiles.
