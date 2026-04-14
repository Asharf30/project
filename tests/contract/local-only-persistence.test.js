import {
  clearTaskCollection,
  loadTaskCollection,
  saveTaskCollection,
} from "../../src/persistence/localTaskStorage.js";

describe("local-only persistence contract", () => {
  beforeEach(() => {
    window.localStorage.clear();
    clearTaskCollection();
  });

  it("persists and loads from localStorage without cloud/account calls", () => {
    const originalFetch = globalThis.fetch;
    const fetchSpy = vi.fn();
    globalThis.fetch = fetchSpy;

    const tasks = [
      {
        id: "local-1",
        title: "Local only task",
        isCompleted: false,
        location: "active",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    ];

    saveTaskCollection(tasks);
    const loaded = loadTaskCollection();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(loaded.tasks).toHaveLength(1);

    globalThis.fetch = originalFetch;
  });
});
