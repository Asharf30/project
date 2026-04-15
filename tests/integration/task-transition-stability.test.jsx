import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppShell } from "../../src/app/AppShell.jsx";
import { useTaskStore } from "../../src/state/taskStore.js";

describe("task transition stability", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useTaskStore.setState({
      tasks: [],
      activeFilter: "all",
      activePanel: "tasks",
      lastError: null,
    });
  });

  it("remains stable during rapid add/filter/panel transitions", async () => {
    const user = userEvent.setup();
    render(<AppShell />);

    for (let index = 1; index <= 6; index += 1) {
      await user.type(
        screen.getByPlaceholderText(/what needs to be done/i),
        `Task ${index}`,
      );
      await user.click(screen.getByRole("button", { name: /add task/i }));
    }

    await user.click(screen.getByRole("button", { name: /completed/i }));
    await user.click(screen.getByRole("button", { name: /incomplete/i }));
    await user.click(screen.getByRole("button", { name: /all/i }));

    await user.click(screen.getByRole("button", { name: /trash \(0\)/i }));
    await user.click(screen.getByRole("button", { name: /tasks \(6\)/i }));

    expect(screen.getByLabelText(/task list/i)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
