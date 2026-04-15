import { REDUCED_MOTION_TRANSITION, createTransition } from "./motionConfig.js";

export const layoutMotion = {
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0, transition: createTransition(0.5) },
  exit: { opacity: 0, y: -8, transition: createTransition(0.4) },
};

export const reducedLayoutMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0, transition: REDUCED_MOTION_TRANSITION },
  exit: { opacity: 1, y: 0, transition: REDUCED_MOTION_TRANSITION },
};

export function getLayoutMotion(prefersReducedMotion = false) {
  return prefersReducedMotion ? reducedLayoutMotion : layoutMotion;
}
