import {
  ENTRANCE_DURATION,
  ENTRANCE_OFFSET_Y,
  REDUCED_MOTION_TRANSITION,
  STAGGER_DELAY_MAX,
  STAGGER_DELAY_MIN,
  TRANSITION_DURATION_MAX,
  TRANSITION_DURATION_MIN,
  TRANSITION_EASING,
  TRANSITION_EASING_CSS,
} from "../../src/animations/motionConfig.js";
import {
  getTaskItemMotion,
  reducedTaskItemMotion,
  taskItemMotion,
} from "../../src/animations/taskItemMotion.js";
import {
  getTaskListMotion,
  reducedTaskListMotion,
  taskListMotion,
} from "../../src/animations/taskListMotion.js";
import {
  getLayoutMotion,
  reducedLayoutMotion,
  layoutMotion,
} from "../../src/animations/layoutMotion.js";

describe("motion and theme contract", () => {
  it("defines required easing and duration bounds", () => {
    expect(TRANSITION_EASING).toEqual([0.4, 0, 0.2, 1]);
    expect(TRANSITION_EASING_CSS).toBe("cubic-bezier(0.4, 0, 0.2, 1)");

    expect(TRANSITION_DURATION_MIN).toBe(0.4);
    expect(TRANSITION_DURATION_MAX).toBe(0.6);
    expect(ENTRANCE_DURATION).toBe(0.6);
  });

  it("uses required slide-down + fade-in item states", () => {
    expect(taskItemMotion.initial).toMatchObject({
      opacity: 0,
      y: ENTRANCE_OFFSET_Y,
    });
    expect(taskItemMotion.animate).toMatchObject({ opacity: 1, y: 0 });
    expect(taskItemMotion.transition.duration).toBeGreaterThanOrEqual(
      TRANSITION_DURATION_MIN,
    );
    expect(taskItemMotion.transition.duration).toBeLessThanOrEqual(
      TRANSITION_DURATION_MAX,
    );
  });

  it("keeps waterfall stagger delay between 100ms and 150ms", () => {
    const stagger = taskListMotion.animate.transition.staggerChildren;

    expect(stagger).toBeGreaterThanOrEqual(STAGGER_DELAY_MIN);
    expect(stagger).toBeLessThanOrEqual(STAGGER_DELAY_MAX);
  });

  it("returns reduced-motion variants when requested", () => {
    expect(getTaskItemMotion(true)).toEqual(reducedTaskItemMotion);
    expect(getTaskListMotion(true)).toEqual(reducedTaskListMotion);
    expect(getLayoutMotion(true)).toEqual(reducedLayoutMotion);
    expect(REDUCED_MOTION_TRANSITION.duration).toBeLessThan(0.1);
  });

  it("keeps panel transition policy within required duration window", () => {
    expect(layoutMotion.animate.transition.duration).toBeGreaterThanOrEqual(
      TRANSITION_DURATION_MIN,
    );
    expect(layoutMotion.animate.transition.duration).toBeLessThanOrEqual(
      TRANSITION_DURATION_MAX,
    );

    expect(layoutMotion.exit.transition.duration).toBeGreaterThanOrEqual(
      TRANSITION_DURATION_MIN,
    );
    expect(layoutMotion.exit.transition.duration).toBeLessThanOrEqual(
      TRANSITION_DURATION_MAX,
    );
  });
});
