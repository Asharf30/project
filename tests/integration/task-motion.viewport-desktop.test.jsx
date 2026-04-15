import React from "react";
import { render, screen } from "@testing-library/react";
import { TaskList } from "../../src/components/TaskList/TaskList.jsx";
import { setViewportProfile } from "./viewportTestUtils.js";

const tasks = [
  {
    id: "d-1",
    title: "Desktop motion",
    isCompleted: false,
    location: "active",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "d-2",
    title: "Desktop motion 2",
    isCompleted: false,
    location: "active",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "d-3",
    title: "Desktop motion 3",
    isCompleted: true,
    location: "active",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

describe("task motion desktop viewport", () => {
  it("keeps fade/stagger metadata consistent at 1024px+", () => {
    setViewportProfile("desktop");

    render(
      <TaskList
        tasks={tasks}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        onToggle={vi.fn()}
      />,
    );

    const list = screen.getByLabelText(/task list/i);

    expect(list).toHaveAttribute("data-motion", "enabled");
    expect(list).toHaveAttribute("data-duration-min", "0.4");
    expect(list).toHaveAttribute("data-duration-max", "0.6");
    expect(screen.getByText("Desktop motion 2")).toBeInTheDocument();
    expect(screen.getByText("Desktop motion 3")).toBeInTheDocument();
  });
});
