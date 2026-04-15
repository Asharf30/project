import {
  getTaskItemMotion,
  taskItemMotion,
} from "../../src/animations/taskItemMotion.js";
import { taskListMotion } from "../../src/animations/taskListMotion.js";

function hasLayoutThrashingProps(target) {
  const restrictedProps = [
    "top",
    "left",
    "right",
    "bottom",
    "width",
    "height",
    "margin",
    "padding",
  ];

  return Object.keys(target).some((key) => restrictedProps.includes(key));
}

describe("task motion performance integration", () => {
  it("animates transform/opacity properties without layout-thrashing fields", () => {
    expect(hasLayoutThrashingProps(taskItemMotion.initial)).toBe(false);
    expect(hasLayoutThrashingProps(taskItemMotion.animate)).toBe(false);
    expect(hasLayoutThrashingProps(taskItemMotion.exit)).toBe(false);
    expect(hasLayoutThrashingProps(taskListMotion.initial)).toBe(false);
    expect(hasLayoutThrashingProps(taskListMotion.animate)).toBe(false);
  });

  it("keeps transition durations in expected 60fps-friendly range", () => {
    const item = getTaskItemMotion(false);

    expect(item.transition.duration).toBeGreaterThanOrEqual(0.4);
    expect(item.transition.duration).toBeLessThanOrEqual(0.6);
    expect(taskListMotion.animate.transition.duration).toBeGreaterThanOrEqual(
      0.4,
    );
    expect(taskListMotion.animate.transition.duration).toBeLessThanOrEqual(0.6);
  });
});
