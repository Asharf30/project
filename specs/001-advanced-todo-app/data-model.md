# Data Model: Advanced Todo Experience

## Entity: Task

**Description**: A user-managed todo item in either active list or trash.

### Fields

- `id` (string, required): Unique stable identifier.
- `title` (string, required): User-defined task text (only user-editable content field in v1).
- `isCompleted` (boolean, required): Completion status in active list.
- `location` (enum, required): `active` | `trash`.
- `createdAt` (ISO datetime string, required): Creation timestamp.
- `updatedAt` (ISO datetime string, required): Last update timestamp.
- `deletedAt` (ISO datetime string, optional): Set when moved to trash.

### Validation Rules

- `title` MUST be non-empty after trimming whitespace.
- `title` SHOULD enforce a maximum length guard (implementation-defined; recommended 200 chars) to prevent UI overflow.
- `location=trash` implies the task is excluded from active list views.
- `deletedAt` MUST exist when `location=trash`.

### State Transitions

- `create`: new task starts with `location=active`, `isCompleted=false`.
- `edit title`: permitted when `location=active`.
- `toggle complete`: permitted when `location=active`.
- `move to trash`: transition `active -> trash`; set `deletedAt`.
- `restore from trash`: transition `trash -> active`; clear `deletedAt`.
- `permanent delete`: remove record from persistence entirely.

---

## Entity: TaskCollection

**Description**: Aggregate of all tasks stored for the current user on the current device.

### Fields

- `tasks` (array<Task>, required)
- `version` (number, required): Storage schema version for safe evolution.
- `lastSyncedAt` (ISO datetime string, optional): Local save timestamp (not cloud sync).

### Validation Rules

- `id` values MUST be unique across `tasks`.
- Collection MUST support at least 1,000 tasks without blocking primary actions.

---

## Entity: ViewState

**Description**: Non-persistent or persistable UI state that controls what users are currently seeing.

### Fields

- `activeFilter` (enum, required): `all` | `completed` | `incomplete`.
- `activePanel` (enum, required): `tasks` | `trash`.
- `searchQuery` (string, optional): Future-ready, not required for v1 behavior.

### Validation Rules

- `activeFilter` applies only when `activePanel=tasks`.
- `activePanel=trash` always renders trash entries regardless of completion filter.

---

## Entity: TrashEntry (Derived View)

**Description**: A derived representation of `Task` rows where `location=trash`.

### Fields

- Inherits from `Task` with `location=trash`.
- Includes computed `timeInTrash` (duration) for display logic if needed.

### Validation Rules

- No automatic deletion timer in v1.
- Permanent deletion occurs only via explicit user action.
