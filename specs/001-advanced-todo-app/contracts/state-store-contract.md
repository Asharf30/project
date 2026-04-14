# Contract: Task State Store

## Purpose

Define the application-facing contract for task data operations and selectors, independent from UI component implementation.

## Store Surface

### Commands (Actions)

- `createTask(title: string) -> Task`
- `editTaskTitle(taskId: string, title: string) -> Task`
- `toggleTaskCompletion(taskId: string) -> Task`
- `moveTaskToTrash(taskId: string) -> Task`
- `restoreTask(taskId: string) -> Task`
- `permanentlyDeleteTask(taskId: string) -> void`
- `setActiveFilter(filter: 'all' | 'completed' | 'incomplete') -> void`
- `setActivePanel(panel: 'tasks' | 'trash') -> void`

### Queries (Selectors)

- `getAllActiveTasks() -> Task[]`
- `getCompletedTasks() -> Task[]`
- `getIncompleteTasks() -> Task[]`
- `getTrashTasks() -> Task[]`
- `getTaskById(taskId: string) -> Task | null`

## Behavioral Guarantees

- Title validation rejects empty/whitespace-only values.
- Moving to trash never destroys data.
- Permanent deletion is explicit and user-triggered only.
- State updates are persisted locally on each mutating action.
- Query results are deterministic for a given state snapshot.

## Error Semantics

- Unknown `taskId` on mutation returns a domain error (or no-op with traceable warning; choose one and keep consistent).
- Invalid input (e.g., empty title) returns validation error.

## Versioning

- Any breaking change to action names/signatures or selector behavior requires a contract version bump in planning/tasks.
