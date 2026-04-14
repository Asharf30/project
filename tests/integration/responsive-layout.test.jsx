import React from "react";
import { render, screen } from "@testing-library/react";
import { AppShell } from "../../src/app/AppShell.jsx";
import { useTaskStore } from "../../src/state/taskStore.js";

describe("responsive layout integration", () => {
  beforeEach(() => {
    useTaskStore.setState({
      tasks: [],
      activeFilter: "all",
      activePanel: "tasks",
      lastError: null,
    });
  });

  it("keeps core controls available on mobile viewport", () => {
    window.innerWidth = 375;
    window.dispatchEvent(new Event("resize"));

    render(<AppShell />);

    expect(
      screen.getByRole("button", { name: /add task/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /all \(0\)/i }),
    ).toBeInTheDocument();
  });

  it("keeps core controls available on desktop viewport", () => {
    window.innerWidth = 1280;
    window.dispatchEvent(new Event("resize"));

    render(<AppShell />);

    expect(
      screen.getByRole("button", { name: /tasks \(0\)/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /trash \(0\)/i }),
    ).toBeInTheDocument();
  });
});
