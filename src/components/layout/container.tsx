import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("w-full mx-auto", {
  variants: {
    width: {
      fluid: "",
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
    },
    gutters: {
      none: "px-0",
      xs: "px-1",
      sm: "px-2",
      md: "px-3",
      lg: "px-4",
      xl: "px-6",
      "2xl": "px-8",
    },
    yPadding: {
      none: "py-0",
      xs: "py-1",
      sm: "py-2",
      md: "py-3",
      lg: "py-4",
      xl: "py-6",
      "2xl": "py-8",
    },
  },
  defaultVariants: {
    width: "xl",
    gutters: "md",
    yPadding: "md",
  },
});

type ContainerProps = React.ComponentProps<"div"> &
  VariantProps<typeof containerVariants> & {
    asChild?: boolean;
  };

function Container({
  className,
  width,
  gutters,
  yPadding,
  asChild = false,
  ...props
}: ContainerProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="container"
      className={cn(containerVariants({ width, gutters, yPadding, className }))}
      {...props}
    />
  );
}

export { Container, containerVariants };
export type { ContainerProps };
