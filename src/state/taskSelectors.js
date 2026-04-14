function activeTasks(tasks) {
  return tasks.filter((task) => task.location === "active");
}

export function getAllActiveTasks(tasks) {
  return activeTasks(tasks);
}

export function getCompletedTasks(tasks) {
  return activeTasks(tasks).filter((task) => task.isCompleted);
}

export function getIncompleteTasks(tasks) {
  return activeTasks(tasks).filter((task) => !task.isCompleted);
}

export function getTrashTasks(tasks) {
  return tasks.filter((task) => task.location === "trash");
}

export function getTaskById(tasks, taskId) {
  return tasks.find((task) => task.id === taskId) ?? null;
}

let memoizedTasksRef = null;
let memoizedFilter = null;
let memoizedResult = [];

export function getFilteredActiveTasks(tasks, filter) {
  if (tasks === memoizedTasksRef && filter === memoizedFilter) {
    return memoizedResult;
  }

  let result;
  switch (filter) {
    case "completed":
      result = getCompletedTasks(tasks);
      break;
    case "incomplete":
      result = getIncompleteTasks(tasks);
      break;
    case "all":
    default:
      result = getAllActiveTasks(tasks);
      break;
  }

  memoizedTasksRef = tasks;
  memoizedFilter = filter;
  memoizedResult = result;
  return result;
}

export function getTaskCounts(tasks) {
  const active = getAllActiveTasks(tasks);
  const completed = active.filter((task) => task.isCompleted).length;

  return {
    all: active.length,
    completed,
    incomplete: active.length - completed,
    trash: getTrashTasks(tasks).length,
  };
}
