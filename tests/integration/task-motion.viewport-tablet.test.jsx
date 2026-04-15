import React from "react";
import { render, screen } from "@testing-library/react";
import { TaskList } from "../../src/components/TaskList/TaskList.jsx";
import { setViewportProfile } from "./viewportTestUtils.js";

const tasks = [
  {
    id: "t-1",
    title: "Tablet motion",
    isCompleted: false,
    location: "active",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "t-2",
    title: "Tablet motion 2",
    isCompleted: true,
    location: "active",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

describe("task motion tablet viewport", () => {
  it("keeps fade/stagger metadata consistent at 768px", () => {
    setViewportProfile("tablet");

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
    expect(list).toHaveAttribute("data-easing", "cubic-bezier(0.4, 0, 0.2, 1)");
    expect(list).toHaveAttribute("data-stagger-delay", "0.12");
    expect(screen.getByText("Tablet motion")).toBeInTheDocument();
    expect(screen.getByText("Tablet motion 2")).toBeInTheDocument();
  });
});
