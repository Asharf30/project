import React from "react";
import { render, screen } from "@testing-library/react";
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

function relativeLuminance(hexColor) {
  const { r, g, b } = hexToRgb(hexColor);

  const red = srgbToLinear(r);
  const green = srgbToLinear(g);
  const blue = srgbToLinear(b);

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground, background) {
  const first = relativeLuminance(foreground);
  const second = relativeLuminance(background);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);

  return (lighter + 0.05) / (darker + 0.05);
}

describe("theme roles contract", () => {
  beforeEach(() => {
    useTaskStore.setState({
      tasks: [],
      activeFilter: "all",
      activePanel: "tasks",
      lastError: null,
    });
  });

  it("defines required semantic palette role values", () => {
    render(React.createElement(AppShell));

    const styles = getComputedStyle(document.documentElement);

    expect(styles.getPropertyValue("--primary").trim()).toBe("#4a90e2");
    expect(styles.getPropertyValue("--secondary").trim()).toBe("#7ed321");
    expect(styles.getPropertyValue("--accent").trim()).toBe("#f5a623");
    expect(styles.getPropertyValue("--background").trim()).toBe("#f8f9fa");
    expect(styles.getPropertyValue("--text").trim()).toBe("#2c3e50");
    expect(styles.getPropertyValue("--surface").trim()).toBe("#ffffff");
  });

  it("keeps text contrast at WCAG AA minimum of 4.5:1 on key surfaces", () => {
    render(React.createElement(AppShell));

    const styles = getComputedStyle(document.documentElement);
    const text = styles.getPropertyValue("--text").trim();
    const surface = styles.getPropertyValue("--surface").trim();
    const background = styles.getPropertyValue("--background").trim();

    expect(contrastRatio(text, surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(text, background)).toBeGreaterThanOrEqual(4.5);
  });

  it("uses semantic button roles for primary and secondary controls", () => {
    render(React.createElement(AppShell));

    expect(screen.getByRole("button", { name: /add task/i })).toHaveClass(
      "button-primary",
    );

    expect(screen.getByRole("button", { name: /all \(0\)/i })).toHaveClass(
      "button-secondary",
    );
  });
});
