import { create } from "zustand";
import {
  createTaskAction,
  editTaskTitleAction,
  moveTaskToTrashAction,
  permanentlyDeleteTaskAction,
  restoreTaskAction,
  toggleTaskCompletionAction,
} from "./taskActions.js";
import {
  loadTaskCollection,
  saveTaskCollection,
} from "../persistence/localTaskStorage.js";

const hydrated = loadTaskCollection();

function persistTasks(tasks) {
  saveTaskCollection(tasks);
}

export const useTaskStore = create((set, get) => ({
  tasks: hydrated.tasks,
  activeFilter: "all",
  activePanel: "tasks",
  lastError: null,

  createTask: (title) => {
    const { tasks } = get();
    const next = createTaskAction(tasks, title);
    persistTasks(next.tasks);
    set({ tasks: next.tasks, lastError: null });
    return next.task;
  },

  editTaskTitle: (taskId, title) => {
    const { tasks } = get();
    const next = editTaskTitleAction(tasks, taskId, title);
    persistTasks(next.tasks);
    set({ tasks: next.tasks, lastError: null });
    return next.task;
  },

  toggleTaskCompletion: (taskId) => {
    const { tasks } = get();
    const next = toggleTaskCompletionAction(tasks, taskId);
    persistTasks(next.tasks);
    set({ tasks: next.tasks, lastError: null });
    return next.task;
  },

  moveTaskToTrash: (taskId) => {
    const { tasks } = get();
    const next = moveTaskToTrashAction(tasks, taskId);
    persistTasks(next.tasks);
    set({ tasks: next.tasks, lastError: null });
    return next.task;
  },

  restoreTask: (taskId) => {
    const { tasks } = get();
    const next = restoreTaskAction(tasks, taskId);
    persistTasks(next.tasks);
    set({ tasks: next.tasks, lastError: null });
    return next.task;
  },

  permanentlyDeleteTask: (taskId) => {
    const { tasks } = get();
    const next = permanentlyDeleteTaskAction(tasks, taskId);
    persistTasks(next.tasks);
    set({ tasks: next.tasks, lastError: null });
  },

  setActiveFilter: (filter) => {
    set({ activeFilter: filter });
  },

  setActivePanel: (panel) => {
    set({ activePanel: panel });
  },
}));
