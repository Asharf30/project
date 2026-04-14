import {
  createTaskAction,
  editTaskTitleAction,
  moveTaskToTrashAction,
  permanentlyDeleteTaskAction,
  restoreTaskAction,
  toggleTaskCompletionAction,
} from "../../src/state/taskActions.js";
import {
  getAllActiveTasks,
  getCompletedTasks,
  getFilteredActiveTasks,
  getIncompleteTasks,
  getTaskById,
  getTrashTasks,
} from "../../src/state/taskSelectors.js";
import { useTaskStore } from "../../src/state/taskStore.js";
import { createFixtureTask } from "../unit/state/taskFixtures.js";

describe("state store contract", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useTaskStore.setState({
      tasks: [],
      activeFilter: "all",
      activePanel: "tasks",
      lastError: null,
    });
  });

  it("creates and mutates lifecycle state through action contracts", () => {
    const created = createTaskAction([], "  First task  ");
    expect(created.task.title).toBe("First task");
    expect(created.tasks).toHaveLength(1);

    const toggled = toggleTaskCompletionAction(created.tasks, created.task.id);
    expect(toggled.task.isCompleted).toBe(true);

    const edited = editTaskTitleAction(
      toggled.tasks,
      created.task.id,
      "Updated title",
    );
    expect(edited.task.title).toBe("Updated title");

    const trashed = moveTaskToTrashAction(edited.tasks, created.task.id);
    expect(trashed.task.location).toBe("trash");

    const restored = restoreTaskAction(trashed.tasks, created.task.id);
    expect(restored.task.location).toBe("active");

    const trashedAgain = moveTaskToTrashAction(restored.tasks, created.task.id);
    const deleted = permanentlyDeleteTaskAction(
      trashedAgain.tasks,
      created.task.id,
    );
    expect(deleted.tasks).toHaveLength(0);
  });

  it("exposes deterministic selector results", () => {
    const taskA = createFixtureTask({ id: "a", isCompleted: false });
    const taskB = createFixtureTask({ id: "b", isCompleted: true });
    const taskC = createFixtureTask({ id: "c", location: "trash" });
    const tasks = [taskA, taskB, taskC];

    expect(getAllActiveTasks(tasks)).toHaveLength(2);
    expect(getCompletedTasks(tasks)).toHaveLength(1);
    expect(getIncompleteTasks(tasks)).toHaveLength(1);
    expect(getTrashTasks(tasks)).toHaveLength(1);
    expect(getTaskById(tasks, "b")).toEqual(taskB);

    const firstCall = getFilteredActiveTasks(tasks, "all");
    const secondCall = getFilteredActiveTasks(tasks, "all");
    expect(firstCall).toBe(secondCall);
  });

  it("persists state after mutating store actions", () => {
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, "setItem");

    useTaskStore.getState().createTask("Persist me");
    useTaskStore.getState().createTask("Persist me too");

    expect(setItemSpy).toHaveBeenCalled();
    setItemSpy.mockRestore();
  });
});
