import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { AppShell } from "../../src/app/AppShell.jsx";
import { useTaskStore } from "../../src/state/taskStore.js";
import {
  getViewportProfileEntries,
  setViewportProfile,
} from "./viewportTestUtils.js";

describe("theme viewport consistency", () => {
  beforeEach(() => {
    useTaskStore.setState({
      tasks: [],
      activeFilter: "all",
      activePanel: "tasks",
      lastError: null,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it.each(getViewportProfileEntries())(
    "keeps semantic palette controls consistent on %s viewport",
    (viewportName) => {
      setViewportProfile(viewportName);
      render(<AppShell />);

      expect(screen.getByRole("button", { name: /add task/i })).toHaveClass(
        "button-primary",
      );

      expect(screen.getByRole("button", { name: /tasks \(0\)/i })).toHaveClass(
        "button-secondary",
      );

      expect(screen.getByLabelText(/panel controls/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/task filters/i)).toBeInTheDocument();
    },
  );
});
