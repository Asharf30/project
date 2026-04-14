export const MAX_TASK_TITLE_LENGTH = 200;

export function normalizeTaskTitle(rawTitle) {
  if (typeof rawTitle !== "string") {
    throw new Error("Task title must be a string.");
  }

  const title = rawTitle.trim();

  if (!title) {
    throw new Error("Task title is required.");
  }

  if (title.length > MAX_TASK_TITLE_LENGTH) {
    throw new Error(
      `Task title must be at most ${MAX_TASK_TITLE_LENGTH} characters.`,
    );
  }

  return title;
}

export function createTaskEntity(rawTitle, now = new Date()) {
  const title = normalizeTaskTitle(rawTitle);
  const timestamp = now.toISOString();

  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    isCompleted: false,
    location: "active",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function withUpdatedTimestamp(task, now = new Date()) {
  return {
    ...task,
    updatedAt: now.toISOString(),
  };
}
