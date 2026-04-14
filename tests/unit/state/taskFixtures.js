export function createFixtureTask(overrides = {}) {
  return {
    id: overrides.id ?? "task-1",
    title: overrides.title ?? "Sample Task",
    isCompleted: overrides.isCompleted ?? false,
    location: overrides.location ?? "active",
    createdAt:
      overrides.createdAt ?? new Date("2026-01-01T00:00:00.000Z").toISOString(),
    updatedAt:
      overrides.updatedAt ?? new Date("2026-01-01T00:00:00.000Z").toISOString(),
    ...(overrides.deletedAt ? { deletedAt: overrides.deletedAt } : {}),
  };
}

export function createTaskBatch(count) {
  return Array.from({ length: count }, (_, index) =>
    createFixtureTask({
      id: `task-${index + 1}`,
      title: `Task ${index + 1}`,
      isCompleted: index % 2 === 0,
    }),
  );
}
