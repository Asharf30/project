import React from "react";
import { render, screen } from "@testing-library/react";
import { TaskList } from "../../src/components/TaskList/TaskList.jsx";

describe("task motion integration", () => {
  it("renders task list with centralized motion wiring", () => {
    render(
      <TaskList
        tasks={[
          {
            id: "t-1",
            title: "Motion task",
            isCompleted: false,
            location: "active",
            createdAt: "2026-01-01T00:00:00.000Z",
            updatedAt: "2026-01-01T00:00:00.000Z",
          },
        ]}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/task list/i)).toHaveAttribute(
      "data-motion",
      "enabled",
    );
    expect(screen.getByText("Motion task")).toBeInTheDocument();
  });
});
