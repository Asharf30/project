export const TRANSITION_EASING = [0.4, 0, 0.2, 1];
export const TRANSITION_EASING_CSS = "cubic-bezier(0.4, 0, 0.2, 1)";

export const TRANSITION_DURATION_MIN = 0.4;
export const TRANSITION_DURATION_MAX = 0.6;
export const ENTRANCE_DURATION = 0.6;
export const EXIT_DURATION = 0.4;
export const ENTRANCE_OFFSET_Y = -20;

export const STAGGER_DELAY_MIN = 0.1;
export const STAGGER_DELAY_MAX = 0.15;
export const STAGGER_DELAY_DEFAULT = 0.12;

export const PERFORMANCE_TARGET_FPS = 60;

export function clampDuration(duration) {
  return Math.min(
    TRANSITION_DURATION_MAX,
    Math.max(TRANSITION_DURATION_MIN, duration),
  );
}

export function createTransition(duration = ENTRANCE_DURATION) {
  return {
    duration: clampDuration(duration),
    ease: TRANSITION_EASING,
  };
}

export const REDUCED_MOTION_TRANSITION = {
  duration: 0.01,
  ease: TRANSITION_EASING,
};
