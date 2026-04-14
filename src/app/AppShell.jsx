import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AddTaskForm } from "../components/AddTaskForm/AddTaskForm.jsx";
import { TaskList } from "../components/TaskList/TaskList.jsx";
import { TaskFilters } from "../components/TaskFilters/TaskFilters.jsx";
import { TrashPanel } from "../components/TrashPanel/TrashPanel.jsx";
import { layoutMotion } from "../animations/layoutMotion.js";
import { useTaskStore } from "../state/taskStore.js";
import {
  getFilteredActiveTasks,
  getTaskCounts,
  getTrashTasks,
} from "../state/taskSelectors.js";

export function AppShell() {
  const tasks = useTaskStore((state) => state.tasks);
  const activeFilter = useTaskStore((state) => state.activeFilter);
  const activePanel = useTaskStore((state) => state.activePanel);

  const createTask = useTaskStore((state) => state.createTask);
  const editTaskTitle = useTaskStore((state) => state.editTaskTitle);
  const toggleTaskCompletion = useTaskStore(
    (state) => state.toggleTaskCompletion,
  );
  const moveTaskToTrash = useTaskStore((state) => state.moveTaskToTrash);
  const restoreTask = useTaskStore((state) => state.restoreTask);
  const permanentlyDeleteTask = useTaskStore(
    (state) => state.permanentlyDeleteTask,
  );
  const setActiveFilter = useTaskStore((state) => state.setActiveFilter);
  const setActivePanel = useTaskStore((state) => state.setActivePanel);

  const [errorMessage, setErrorMessage] = useState("");

  const counts = useMemo(() => getTaskCounts(tasks), [tasks]);
  const visibleTasks = useMemo(
    () => getFilteredActiveTasks(tasks, activeFilter),
    [tasks, activeFilter],
  );
  const trashTasks = useMemo(() => getTrashTasks(tasks), [tasks]);

  function withErrorHandling(action) {
    try {
      setErrorMessage("");
      action();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unexpected error",
      );
    }
  }

  return (
    <main className="app-shell stack" data-testid="app-shell">
      <header className="panel stack">
        <h1 className="section-title">Advanced Todo Experience</h1>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          Lifecycle-first tasks with trash restore, smooth motion, and
          responsive layout.
        </p>
      </header>

      <section className="panel stack" aria-label="Panel controls">
        <div className="toolbar" role="tablist" aria-label="Panels">
          <button
            className={`button ${activePanel === "tasks" ? "is-active" : ""}`}
            onClick={() => setActivePanel("tasks")}
            type="button"
          >
            Tasks ({counts.all})
          </button>
          <button
            className={`button ${activePanel === "trash" ? "is-active" : ""}`}
            onClick={() => setActivePanel("trash")}
            type="button"
          >
            Trash ({counts.trash})
          </button>
        </div>

        {errorMessage ? (
          <p role="alert" className="danger" style={{ margin: 0 }}>
            {errorMessage}
          </p>
        ) : null}

        {activePanel === "tasks" ? (
          <motion.div {...layoutMotion} className="stack" key="tasks-panel">
            <AddTaskForm
              onAddTask={(title) => withErrorHandling(() => createTask(title))}
            />

            <TaskFilters
              activeFilter={activeFilter}
              counts={counts}
              onFilterChange={setActiveFilter}
            />

            <TaskList
              tasks={visibleTasks}
              onDelete={(taskId) =>
                withErrorHandling(() => moveTaskToTrash(taskId))
              }
              onEdit={(taskId, title) =>
                withErrorHandling(() => editTaskTitle(taskId, title))
              }
              onToggle={(taskId) =>
                withErrorHandling(() => toggleTaskCompletion(taskId))
              }
            />
          </motion.div>
        ) : (
          <motion.div {...layoutMotion} key="trash-panel">
            <TrashPanel
              tasks={trashTasks}
              onPermanentDelete={(taskId) =>
                withErrorHandling(() => permanentlyDeleteTask(taskId))
              }
              onRestore={(taskId) =>
                withErrorHandling(() => restoreTask(taskId))
              }
            />
          </motion.div>
        )}
      </section>
    </main>
  );
}
