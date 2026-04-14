import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddTaskForm } from "./AddTaskForm.jsx";

describe("AddTaskForm", () => {
  it("submits valid trimmed titles", async () => {
    const user = userEvent.setup();
    const onAddTask = vi.fn();

    render(<AddTaskForm onAddTask={onAddTask} />);

    await user.type(
      screen.getByPlaceholderText(/what needs to be done/i),
      "  Buy milk  ",
    );
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(onAddTask).toHaveBeenCalledWith("Buy milk");
  });

  it("shows validation for empty title and blocks submission", async () => {
    const user = userEvent.setup();
    const onAddTask = vi.fn();

    render(<AddTaskForm onAddTask={onAddTask} />);

    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(onAddTask).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      /please enter a task title/i,
    );
  });
});
