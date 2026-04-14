import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddTaskForm } from "../../src/components/AddTaskForm/AddTaskForm.jsx";
import { TaskFilters } from "../../src/components/TaskFilters/TaskFilters.jsx";
import { TrashPanel } from "../../src/components/TrashPanel/TrashPanel.jsx";

describe("component contracts", () => {
  it("AddTaskForm emits submit intent via callback", async () => {
    const user = userEvent.setup();
    const onAddTask = vi.fn();
    render(<AddTaskForm onAddTask={onAddTask} />);

    await user.type(
      screen.getByPlaceholderText(/what needs to be done/i),
      "Contract Task",
    );
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(onAddTask).toHaveBeenCalledWith("Contract Task");
  });

  it("TaskFilters emits filter-change callback only", async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(
      <TaskFilters
        activeFilter="all"
        counts={{ all: 3, completed: 1, incomplete: 2, trash: 0 }}
        onFilterChange={onFilterChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /completed \(1\)/i }));
    expect(onFilterChange).toHaveBeenCalledWith("completed");
  });

  it("TrashPanel delegates restore/delete through callbacks", async () => {
    const user = userEvent.setup();
    const onRestore = vi.fn();
    const onPermanentDelete = vi.fn();

    render(
      <TrashPanel
        tasks={[
          {
            id: "trash-1",
            title: "Removed task",
            location: "trash",
          },
        ]}
        onRestore={onRestore}
        onPermanentDelete={onPermanentDelete}
      />,
    );

    await user.click(screen.getByRole("button", { name: /restore/i }));
    await user.click(screen.getByRole("button", { name: /delete forever/i }));

    expect(onRestore).toHaveBeenCalledWith("trash-1");
    expect(onPermanentDelete).toHaveBeenCalledWith("trash-1");
  });
});
