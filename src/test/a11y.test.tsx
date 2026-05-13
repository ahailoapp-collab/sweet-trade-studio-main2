import { describe, it, expect } from "vitest";
import { render, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { axe } from "jest-axe";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import About from "@/pages/About";

// IntersectionObserver shim for useScrollReveal
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
(globalThis as unknown as { IntersectionObserver: typeof IO }).IntersectionObserver = IO;

const renderPage = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

const flushEffects = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const renderPageAsync = async (ui: React.ReactElement) => {
  let result: ReturnType<typeof renderPage> | undefined;
  await act(async () => {
    result = renderPage(ui);
    for (let i = 0; i < 5; i++) await flushEffects();
  });
  return result!;
};

// Disable rules that depend on full document chrome (html lang, landmark uniqueness)
// since we render page bodies in isolation without the App shell.
const axeOpts = {
  rules: {
    "region": { enabled: false },
    "html-has-lang": { enabled: false },
    "landmark-one-main": { enabled: false },
    "page-has-heading-one": { enabled: false },
  },
};

describe("Accessibility", () => {
  it("Index page has no detectable a11y violations", async () => {
    const { container } = await renderPageAsync(<Index />);
    const results = await axe(container, axeOpts);
    expect(results).toHaveNoViolations();
  });

  it("Products page has no detectable a11y violations", async () => {
    const { container } = await renderPageAsync(<Products />);
    const results = await axe(container, axeOpts);
    expect(results).toHaveNoViolations();
  });

  it("About page has no detectable a11y violations", async () => {
    const { container } = await renderPageAsync(<About />);
    const results = await axe(container, axeOpts);
    expect(results).toHaveNoViolations();
  });
});
