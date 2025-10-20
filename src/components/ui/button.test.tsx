import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("applies data-slot attribute", () => {
    render(
      <Button variant="secondary" size="lg">
        Large secondary
      </Button>,
    );
    const btn = screen.getByRole("button", { name: /large secondary/i });
    expect(btn).toHaveAttribute("data-slot", "button");
  });
});
