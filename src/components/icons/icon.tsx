import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { type IconName, iconRegistry } from "./registry";

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "size-3", // 12px
      sm: "size-4", // 16px
      md: "size-5", // 20px
      lg: "size-6", // 24px
      xl: "size-8", // 32px
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
  },
});

type IconProps = VariantProps<typeof iconVariants> & {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  "aria-label"?: string;
  decorative?: boolean; // aria-hidden="true"
};

function Icon({
  name,
  size,
  tone,
  className,
  strokeWidth = 2,
  decorative = false,
  "aria-label": ariaLabel,
  ...restProps
}: IconProps) {
  const IconComponent = iconRegistry[name];

  const iconProps = {
    className: cn(iconVariants({ size, tone, className })),
    "aria-hidden": decorative,
    "aria-label": ariaLabel,
    ...restProps,
  };

  // Lucide icons accept strokeWidth, custom SVGs might not
  if (typeof IconComponent === "function" && IconComponent.displayName) {
    // This is likely a Lucide icon
    return <IconComponent {...iconProps} strokeWidth={strokeWidth} />;
  }

  // Custom SVG component
  return <IconComponent {...iconProps} />;
}

export { Icon, iconVariants };
export type { IconName, IconProps };
