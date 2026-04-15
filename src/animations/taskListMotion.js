import {
  REDUCED_MOTION_TRANSITION,
  STAGGER_DELAY_DEFAULT,
  createTransition,
} from "./motionConfig.js";

export const taskListMotion = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      ...createTransition(0.4),
      staggerChildren: STAGGER_DELAY_DEFAULT,
      delayChildren: STAGGER_DELAY_DEFAULT,
    },
  },
  exit: {
    opacity: 0,
    transition: createTransition(0.4),
  },
};

export const reducedTaskListMotion = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: REDUCED_MOTION_TRANSITION,
  },
  exit: {
    opacity: 1,
    transition: REDUCED_MOTION_TRANSITION,
  },
};

export function getTaskListMotion(prefersReducedMotion = false) {
  return prefersReducedMotion ? reducedTaskListMotion : taskListMotion;
}
