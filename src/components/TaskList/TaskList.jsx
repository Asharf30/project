import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TaskItem } from "../TaskItem/TaskItem.jsx";
import { taskItemMotion } from "../../animations/taskItemMotion.js";
import { taskListMotion } from "../../animations/taskListMotion.js";

export function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <p style={{ margin: 0, color: "var(--muted)" }}>
        No active tasks yet. Add one above.
      </p>
    );
  }

  return (
    <motion.ul
      className="task-list"
      data-motion="enabled"
      initial="initial"
      animate="animate"
      variants={taskListMotion}
      aria-label="Task list"
    >
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            layout
            variants={taskItemMotion}
            initial={taskItemMotion.initial}
            animate={taskItemMotion.animate}
            exit={taskItemMotion.exit}
            transition={taskItemMotion.transition}
          >
            <TaskItem
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggle={onToggle}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
