import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const insetVariants = cva("", {
  variants: {
    axis: {
      y: "py-0",
      x: "px-0",
      both: "p-0",
    },
    size: {
      none: "",
      xs: "px-1 py-1",
      sm: "px-2 py-2",
      md: "px-3 py-3",
      lg: "px-4 py-4",
      xl: "px-6 py-6",
      "2xl": "px-8 py-8",
    },
  },
  compoundVariants: [
    { axis: "y", size: "xs", className: "py-1 px-0" },
    { axis: "y", size: "sm", className: "py-2 px-0" },
    { axis: "y", size: "md", className: "py-3 px-0" },
    { axis: "y", size: "lg", className: "py-4 px-0" },
    { axis: "y", size: "xl", className: "py-6 px-0" },
    { axis: "y", size: "2xl", className: "py-8 px-0" },
    { axis: "x", size: "xs", className: "px-1 py-0" },
    { axis: "x", size: "sm", className: "px-2 py-0" },
    { axis: "x", size: "md", className: "px-3 py-0" },
    { axis: "x", size: "lg", className: "px-4 py-0" },
    { axis: "x", size: "xl", className: "px-6 py-0" },
    { axis: "x", size: "2xl", className: "px-8 py-0" },
  ],
  defaultVariants: {
    axis: "y",
    size: "md",
  },
});

type InsetProps = React.ComponentProps<"div"> &
  VariantProps<typeof insetVariants> & {
    asChild?: boolean;
  };

function Inset({
  className,
  axis,
  size,
  asChild = false,
  ...props
}: InsetProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      data-slot="inset"
      className={cn(insetVariants({ axis, size, className }))}
      {...props}
    />
  );
}

export { Inset, insetVariants };
export type { InsetProps };
