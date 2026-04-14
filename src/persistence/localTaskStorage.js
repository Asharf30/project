const STORAGE_KEY = "advanced-todo.collection.v1";
const STORAGE_VERSION = 1;

function hasLocalStorage() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export function createDefaultCollection() {
  return {
    version: STORAGE_VERSION,
    tasks: [],
    lastSyncedAt: null,
  };
}

export function loadTaskCollection() {
  if (!hasLocalStorage()) {
    return createDefaultCollection();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return createDefaultCollection();
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      version: Number(parsed?.version) || STORAGE_VERSION,
      tasks: Array.isArray(parsed?.tasks) ? parsed.tasks : [],
      lastSyncedAt:
        typeof parsed?.lastSyncedAt === "string" ? parsed.lastSyncedAt : null,
    };
  } catch {
    return createDefaultCollection();
  }
}

export function saveTaskCollection(tasks) {
  if (!hasLocalStorage()) {
    return;
  }

  const payload = {
    version: STORAGE_VERSION,
    tasks,
    lastSyncedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearTaskCollection() {
  if (!hasLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export const localTaskStorage = {
  key: STORAGE_KEY,
  version: STORAGE_VERSION,
  loadTaskCollection,
  saveTaskCollection,
  clearTaskCollection,
};
