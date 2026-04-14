import { getFilteredActiveTasks } from "../../src/state/taskSelectors.js";
import { createTaskBatch } from "../unit/state/taskFixtures.js";

describe("large list performance", () => {
  it("filters 1,000 tasks with visible feedback computation under 2 seconds", () => {
    const tasks = createTaskBatch(1000);
    const start = performance.now();

    for (let index = 0; index < 95; index += 1) {
      const filter = index % 2 === 0 ? "completed" : "incomplete";
      getFilteredActiveTasks(tasks, filter);
    }

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(2000);
  });
});
