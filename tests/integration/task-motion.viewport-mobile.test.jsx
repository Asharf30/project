import React from "react";
import { render, screen } from "@testing-library/react";
import { TaskList } from "../../src/components/TaskList/TaskList.jsx";
import { setViewportProfile } from "./viewportTestUtils.js";

const tasks = [
  {
    id: "m-1",
    title: "Mobile motion",
    isCompleted: false,
    location: "active",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "m-2",
    title: "Mobile motion 2",
    isCompleted: false,
    location: "active",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

describe("task motion mobile viewport", () => {
  it("keeps fade/stagger metadata consistent at 375px", () => {
    setViewportProfile("mobile");

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
    expect(list).toHaveAttribute("data-stagger-delay", "0.12");
    expect(list).toHaveAttribute("data-duration-min", "0.4");
    expect(list).toHaveAttribute("data-duration-max", "0.6");
    expect(screen.getByText("Mobile motion")).toBeInTheDocument();
    expect(screen.getByText("Mobile motion 2")).toBeInTheDocument();
  });
});
