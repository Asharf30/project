import {
  createTaskEntity,
  normalizeTaskTitle,
  withUpdatedTimestamp,
} from "../models/taskModel.js";

function findTaskIndex(tasks, taskId) {
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index < 0) {
    throw new Error(`Task with id "${taskId}" was not found.`);
  }

  return index;
}

export function createTaskAction(tasks, title) {
  const task = createTaskEntity(title);
  return {
    task,
    tasks: [task, ...tasks],
  };
}

export function editTaskTitleAction(tasks, taskId, title) {
  const index = findTaskIndex(tasks, taskId);
  const target = tasks[index];

  if (target.location !== "active") {
    throw new Error("Only active tasks can be edited.");
  }

  const updatedTask = withUpdatedTimestamp({
    ...target,
    title: normalizeTaskTitle(title),
  });

  const nextTasks = [...tasks];
  nextTasks[index] = updatedTask;

  return {
    task: updatedTask,
    tasks: nextTasks,
  };
}

export function toggleTaskCompletionAction(tasks, taskId) {
  const index = findTaskIndex(tasks, taskId);
  const target = tasks[index];

  if (target.location !== "active") {
    throw new Error("Only active tasks can toggle completion.");
  }

  const updatedTask = withUpdatedTimestamp({
    ...target,
    isCompleted: !target.isCompleted,
  });

  const nextTasks = [...tasks];
  nextTasks[index] = updatedTask;

  return {
    task: updatedTask,
    tasks: nextTasks,
  };
}

export function moveTaskToTrashAction(tasks, taskId) {
  const index = findTaskIndex(tasks, taskId);
  const target = tasks[index];

  if (target.location === "trash") {
    return {
      task: target,
      tasks,
    };
  }

  const updatedTask = withUpdatedTimestamp({
    ...target,
    location: "trash",
    deletedAt: new Date().toISOString(),
  });

  const nextTasks = [...tasks];
  nextTasks[index] = updatedTask;

  return {
    task: updatedTask,
    tasks: nextTasks,
  };
}

export function restoreTaskAction(tasks, taskId) {
  const index = findTaskIndex(tasks, taskId);
  const target = tasks[index];

  if (target.location !== "trash") {
    throw new Error("Only tasks in trash can be restored.");
  }

  const { deletedAt: _deletedAt, ...rest } = target;
  const updatedTask = withUpdatedTimestamp({
    ...rest,
    location: "active",
  });

  const nextTasks = [...tasks];
  nextTasks[index] = updatedTask;

  return {
    task: updatedTask,
    tasks: nextTasks,
  };
}

export function permanentlyDeleteTaskAction(tasks, taskId) {
  const index = findTaskIndex(tasks, taskId);
  const target = tasks[index];

  if (target.location !== "trash") {
    throw new Error("Task must be in trash before permanent deletion.");
  }

  const nextTasks = tasks.filter((task) => task.id !== taskId);
  return {
    tasks: nextTasks,
  };
}
