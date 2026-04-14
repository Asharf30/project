import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppShell } from "../../src/app/AppShell.jsx";
import { useTaskStore } from "../../src/state/taskStore.js";
import { clearTaskCollection } from "../../src/persistence/localTaskStorage.js";

describe("task lifecycle integration", () => {
  beforeEach(() => {
    window.localStorage.clear();
    clearTaskCollection();
    useTaskStore.setState({
      tasks: [],
      activeFilter: "all",
      activePanel: "tasks",
      lastError: null,
    });
  });

  it("supports create, edit, toggle, trash, restore, and permanent delete", async () => {
    const user = userEvent.setup();
    render(<AppShell />);

    await user.type(
      screen.getByPlaceholderText(/what needs to be done/i),
      "First Task",
    );
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByText("First Task")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^edit$/i }));
    await user.clear(screen.getByLabelText(/edit task title/i));
    await user.type(screen.getByLabelText(/edit task title/i), "Updated Task");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText("Updated Task")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /mark complete/i }));
    expect(
      screen.getByRole("button", { name: /mark incomplete/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /move to trash/i }));
    expect(screen.queryByText("Updated Task")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /trash \(1\)/i }));
    expect(screen.getByText("Updated Task")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /restore/i }));
    expect(screen.queryByText("Updated Task")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /tasks \(1\)/i }));
    expect(screen.getByText("Updated Task")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /move to trash/i }));
    await user.click(screen.getByRole("button", { name: /trash \(1\)/i }));
    await user.click(screen.getByRole("button", { name: /delete forever/i }));

    expect(screen.queryByText("Updated Task")).not.toBeInTheDocument();
  });
});
