import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-sans text-foreground", {
  variants: {
    level: {
      h1: "text-4xl font-bold tracking-tight",
      h2: "text-3xl font-semibold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      h5: "text-lg font-medium tracking-tight",
      h6: "text-base font-medium tracking-tight",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    muted: {
      false: "",
      true: "text-muted-foreground",
    },
  },
  defaultVariants: {
    level: "h2",
    align: "left",
  },
});

type HeadingProps = Omit<React.ComponentProps<"h2">, "color"> &
  VariantProps<typeof headingVariants> & {
    asChild?: boolean;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

function Heading({
  className,
  level,
  align,
  muted,
  asChild = false,
  as,
  ...props
}: HeadingProps) {
  const Comp = asChild ? Slot : (as ?? level ?? "h2");

  return (
    <Comp
      data-slot="heading"
      className={cn(headingVariants({ level, align, muted, className }))}
      {...props}
    />
  );
}

function H1(props: Omit<HeadingProps, "level" | "as">) {
  return <Heading level="h1" as="h1" {...props} />;
}

function H2(props: Omit<HeadingProps, "level" | "as">) {
  return <Heading level="h2" as="h2" {...props} />;
}

function H3(props: Omit<HeadingProps, "level" | "as">) {
  return <Heading level="h3" as="h3" {...props} />;
}

function H4(props: Omit<HeadingProps, "level" | "as">) {
  return <Heading level="h4" as="h4" {...props} />;
}

function H5(props: Omit<HeadingProps, "level" | "as">) {
  return <Heading level="h5" as="h5" {...props} />;
}

function H6(props: Omit<HeadingProps, "level" | "as">) {
  return <Heading level="h6" as="h6" {...props} />;
}

export { Heading, H1, H2, H3, H4, H5, H6, headingVariants };
