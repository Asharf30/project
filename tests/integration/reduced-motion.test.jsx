import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppShell } from "../../src/app/AppShell.jsx";
import { useTaskStore } from "../../src/state/taskStore.js";

function mockMatchMedia(matches) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      matches,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("reduced motion integration", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useTaskStore.setState({
      tasks: [],
      activeFilter: "all",
      activePanel: "tasks",
      lastError: null,
    });
  });

  it("switches shell and list metadata to reduced mode", () => {
    mockMatchMedia(true);

    render(<AppShell />);

    expect(screen.getByTestId("app-shell")).toHaveAttribute(
      "data-reduced-motion",
      "true",
    );

    expect(screen.queryByLabelText(/task list/i)).not.toBeInTheDocument();
  });

  it("preserves task interactions while reduced motion is enabled", async () => {
    mockMatchMedia(true);
    const user = userEvent.setup();

    render(<AppShell />);

    await user.type(
      screen.getByPlaceholderText(/what needs to be done/i),
      "Reduced mode task",
    );
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByText("Reduced mode task")).toBeInTheDocument();
    expect(screen.getByLabelText(/task list/i)).toHaveAttribute(
      "data-motion",
      "reduced",
    );
  });
});
