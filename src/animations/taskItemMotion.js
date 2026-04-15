import {
  ENTRANCE_OFFSET_Y,
  ENTRANCE_DURATION,
  EXIT_DURATION,
  REDUCED_MOTION_TRANSITION,
  createTransition,
} from "./motionConfig.js";

export const taskItemMotion = {
  initial: { opacity: 0, y: ENTRANCE_OFFSET_Y },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8, transition: createTransition(EXIT_DURATION) },
  transition: createTransition(ENTRANCE_DURATION),
};

export const reducedTaskItemMotion = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
  transition: REDUCED_MOTION_TRANSITION,
};

export function getTaskItemMotion(prefersReducedMotion = false) {
  return prefersReducedMotion ? reducedTaskItemMotion : taskItemMotion;
}

export const completionPulse = {
  active: { scale: 1 },
  completed: {
    scale: [1, 1.02, 1],
    transition: createTransition(0.4),
  },
};
