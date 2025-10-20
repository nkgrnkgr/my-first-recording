import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const textVariants = cva("font-sans text-foreground", {
  variants: {
    size: {
      base: "text-sm",
      small: "text-xs",
      caption: "text-xs tracking-wide",
      link: "text-sm underline-offset-4",
    },
    tone: {
      default: "",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    leading: {
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      tight: "leading-tight",
    },
    truncate: {
      false: "",
      true: "truncate",
    },
    underline: {
      false: "",
      true: "underline hover:no-underline",
    },
  },
  defaultVariants: {
    size: "base",
    tone: "default",
    weight: "normal",
    align: "left",
    leading: "normal",
  },
});

type ElementType = React.ElementType;

type PolymorphicProps<E extends ElementType, P> = P &
  Omit<React.ComponentPropsWithoutRef<E>, keyof P | "as" | "color"> & {
    as?: E;
  };

type TextBaseProps = VariantProps<typeof textVariants> & {
  asChild?: boolean;
  className?: string;
};

type TextProps<E extends ElementType = "p"> = PolymorphicProps<
  E,
  TextBaseProps
>;

function Text<E extends ElementType = "p">(props: TextProps<E>) {
  const {
    className,
    size,
    tone,
    weight,
    align,
    leading,
    truncate,
    underline,
    asChild = false,
    as,
    ...rest
  } = props as TextProps<ElementType>;

  const Comp = (asChild ? Slot : (as ?? "p")) as ElementType;
  return (
    <Comp
      data-slot="text"
      className={cn(
        textVariants({
          size,
          tone,
          weight,
          align,
          leading,
          truncate,
          underline,
          className,
        }),
      )}
      {...(rest as Record<string, unknown>)}
    />
  );
}

// Semantic aliases
function Body(props: Omit<TextProps<"p">, "size" | "tone">) {
  return <Text as="p" size="base" {...props} />;
}

function Muted(props: Omit<TextProps<"p">, "tone">) {
  return <Text as="p" tone="muted" {...props} />;
}

function ErrorText(props: Omit<TextProps<"p">, "tone">) {
  return <Text as="p" tone="destructive" {...props} />;
}

function Caption(props: Omit<TextProps<"p">, "size">) {
  return <Text as="p" size="caption" {...props} />;
}

function LinkText({ underline, ...props }: Omit<TextProps<"a">, "size">) {
  return <Text as="a" size="link" underline={underline ?? true} {...props} />;
}

export { Text, Body, Muted, ErrorText, Caption, LinkText, textVariants };
