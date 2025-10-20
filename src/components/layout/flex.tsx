import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      col: "flex-col",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
      xl: "gap-6",
      "2xl": "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      wrapReverse: "flex-wrap-reverse",
    },
    inline: {
      false: "",
      true: "inline-flex",
    },
  },
  defaultVariants: {
    direction: "row",
    gap: "none",
    align: "stretch",
    justify: "start",
    wrap: "nowrap",
  },
});

type FlexProps = React.ComponentProps<"div"> &
  VariantProps<typeof flexVariants> & {
    asChild?: boolean;
  };

function Flex({
  className,
  direction,
  gap,
  align,
  justify,
  wrap,
  inline,
  asChild = false,
  ...props
}: FlexProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="flex"
      className={cn(
        flexVariants({
          direction,
          gap,
          align,
          justify,
          wrap,
          inline,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Flex, flexVariants };
