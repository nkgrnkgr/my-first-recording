import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

// Spacer is intended for one-off gaps when layout primitives' gap/margins aren't expressive enough.
// Prefer using Flex/Stack/Inline first; use Spacer sparingly inside features.

const spacerVariants = cva("block", {
  variants: {
    axis: {
      y: "h-0 w-full",
      x: "w-0 h-full",
      both: "",
    },
    size: {
      none: "", // no-op
      xs: "h-1 w-1",
      sm: "h-2 w-2",
      md: "h-3 w-3",
      lg: "h-4 w-4",
      xl: "h-6 w-6",
      "2xl": "h-8 w-8",
    },
    grow: {
      false: "shrink-0",
      true: "grow",
    },
  },
  compoundVariants: [
    { axis: "y", size: "none", className: "h-0" },
    { axis: "x", size: "none", className: "w-0" },
    { axis: "y", size: "xs", className: "h-1" },
    { axis: "y", size: "sm", className: "h-2" },
    { axis: "y", size: "md", className: "h-3" },
    { axis: "y", size: "lg", className: "h-4" },
    { axis: "y", size: "xl", className: "h-6" },
    { axis: "y", size: "2xl", className: "h-8" },
    { axis: "x", size: "xs", className: "w-1" },
    { axis: "x", size: "sm", className: "w-2" },
    { axis: "x", size: "md", className: "w-3" },
    { axis: "x", size: "lg", className: "w-4" },
    { axis: "x", size: "xl", className: "w-6" },
    { axis: "x", size: "2xl", className: "w-8" },
  ],
  defaultVariants: {
    axis: "y",
    size: "md",
    grow: false,
  },
});

type SpacerProps = React.ComponentProps<"div"> &
  VariantProps<typeof spacerVariants> & {
    as?: "div" | "span";
  };

function Spacer({
  className,
  axis,
  size,
  grow,
  as = "div",
  ...props
}: SpacerProps) {
  const Comp = as;
  return (
    <Comp
      data-slot="spacer"
      aria-hidden
      className={cn(spacerVariants({ axis, size, grow, className }))}
      {...props}
    />
  );
}

export { Spacer, spacerVariants };
export type { SpacerProps };
