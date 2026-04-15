import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppShell } from "../../src/app/AppShell.jsx";
import { useTaskStore } from "../../src/state/taskStore.js";
import "../../src/styles/tokens.css";
import "../../src/styles/globals.css";

function hexToRgb(hexColor) {
  const normalized = hexColor.replace("#", "");
  const bigint = Number.parseInt(normalized, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function srgbToLinear(value) {
  const channel = value / 255;
  return channel <= 0.03928
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

function contrastRatio(foreground, background) {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);

  const fgLum =
    0.2126 * srgbToLinear(fg.r) +
    0.7152 * srgbToLinear(fg.g) +
    0.0722 * srgbToLinear(fg.b);
  const bgLum =
    0.2126 * srgbToLinear(bg.r) +
    0.7152 * srgbToLinear(bg.g) +
    0.0722 * srgbToLinear(bg.b);

  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);

  return (lighter + 0.05) / (darker + 0.05);
}

describe("theme consistency integration", () => {
  beforeEach(() => {
    useTaskStore.setState({
      tasks: [],
      activeFilter: "all",
      activePanel: "tasks",
      lastError: null,
    });
  });

  it("keeps text legible against surface/background roles during initial load", () => {
    render(<AppShell />);

    const rootStyles = getComputedStyle(document.documentElement);
    const text = rootStyles.getPropertyValue("--text").trim();
    const surface = rootStyles.getPropertyValue("--surface").trim();

    expect(contrastRatio(text, surface)).toBeGreaterThanOrEqual(4.5);
    expect(
      screen.getByRole("heading", { name: /advanced todo experience/i }),
    ).toBeVisible();
  });

  it("preserves readable palette and controls while switching panels", async () => {
    const user = userEvent.setup();
    render(<AppShell />);

    await user.click(screen.getByRole("button", { name: /trash \(0\)/i }));
    expect(screen.getByRole("heading", { name: /trash/i })).toBeVisible();

    await user.click(screen.getByRole("button", { name: /tasks \(0\)/i }));

    expect(screen.getByRole("button", { name: /add task/i })).toHaveClass(
      "button-primary",
    );
    expect(screen.getByRole("button", { name: /all \(0\)/i })).toHaveClass(
      "button-secondary",
    );
  });
});
