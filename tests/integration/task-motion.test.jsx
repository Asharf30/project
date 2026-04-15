import React from "react";
import { render, screen } from "@testing-library/react";
import { TaskList } from "../../src/components/TaskList/TaskList.jsx";
import { STAGGER_DELAY_DEFAULT } from "../../src/animations/motionConfig.js";

describe("task motion integration", () => {
  const tasks = [
    {
      id: "t-1",
      title: "Motion task",
      isCompleted: false,
      location: "active",
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
    {
      id: "t-2",
      title: "Motion task 2",
      isCompleted: true,
      location: "active",
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
  ];

  it("renders task list with centralized motion wiring", () => {
    render(
      <TaskList
        tasks={tasks}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/task list/i)).toHaveAttribute(
      "data-motion",
      "enabled",
    );
    expect(screen.getByLabelText(/task list/i)).toHaveAttribute(
      "data-stagger-delay",
      String(STAGGER_DELAY_DEFAULT),
    );
    expect(screen.getByLabelText(/task list/i)).toHaveAttribute(
      "data-easing",
      "cubic-bezier(0.4, 0, 0.2, 1)",
    );

    expect(screen.getByText("Motion task")).toBeInTheDocument();
    expect(screen.getByText("Motion task 2")).toBeInTheDocument();
  });

  it("switches to reduced-motion metadata when requested", () => {
    render(
      <TaskList
        tasks={tasks}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        onToggle={vi.fn()}
        prefersReducedMotion
      />,
    );

    expect(screen.getByLabelText(/task list/i)).toHaveAttribute(
      "data-motion",
      "reduced",
    );
  });
});
