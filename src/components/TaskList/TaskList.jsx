import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TaskItem } from "../TaskItem/TaskItem.jsx";
import { getTaskItemMotion } from "../../animations/taskItemMotion.js";
import { getTaskListMotion } from "../../animations/taskListMotion.js";
import {
  STAGGER_DELAY_DEFAULT,
  TRANSITION_DURATION_MAX,
  TRANSITION_DURATION_MIN,
  TRANSITION_EASING_CSS,
} from "../../animations/motionConfig.js";

export function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  prefersReducedMotion = false,
}) {
  const itemMotion = getTaskItemMotion(prefersReducedMotion);
  const listMotion = getTaskListMotion(prefersReducedMotion);

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
      data-motion={prefersReducedMotion ? "reduced" : "enabled"}
      data-motion-reduced={prefersReducedMotion ? "true" : "false"}
      data-stagger-delay={STAGGER_DELAY_DEFAULT}
      data-duration-min={TRANSITION_DURATION_MIN}
      data-duration-max={TRANSITION_DURATION_MAX}
      data-easing={TRANSITION_EASING_CSS}
      initial="initial"
      animate="animate"
      variants={listMotion}
      style={{
        willChange: prefersReducedMotion ? "auto" : "opacity, transform",
      }}
      aria-label="Task list"
    >
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            layout
            variants={itemMotion}
            initial={itemMotion.initial}
            animate={itemMotion.animate}
            exit={itemMotion.exit}
            transition={itemMotion.transition}
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
