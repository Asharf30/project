import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskItem } from "./TaskItem.jsx";

const task = {
  id: "t-1",
  title: "Write tests",
  isCompleted: false,
  location: "active",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("TaskItem", () => {
  it("emits toggle and delete intents", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskItem
        task={task}
        onDelete={onDelete}
        onEdit={vi.fn()}
        onToggle={onToggle}
      />,
    );

    await user.click(screen.getByRole("button", { name: /mark complete/i }));
    await user.click(screen.getByRole("button", { name: /move to trash/i }));

    expect(onToggle).toHaveBeenCalledWith("t-1");
    expect(onDelete).toHaveBeenCalledWith("t-1");
  });

  it("supports edit mode and emits edit intent", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <TaskItem
        task={task}
        onDelete={vi.fn()}
        onEdit={onEdit}
        onToggle={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /edit/i }));
    const input = screen.getByLabelText(/edit task title/i);
    await user.clear(input);
    await user.type(input, "Write more tests");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(onEdit).toHaveBeenCalledWith("t-1", "Write more tests");
  });
});
