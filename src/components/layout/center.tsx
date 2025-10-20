import type * as React from "react";
import { Flex } from "./flex";

type CenterProps = React.ComponentProps<typeof Flex> & {
  fullWidth?: boolean;
  fullHeight?: boolean;
};

function Center({
  align,
  justify,
  className,
  fullWidth,
  fullHeight,
  ...props
}: CenterProps) {
  return (
    <Flex
      data-slot="center"
      align={align ?? "center"}
      justify={justify ?? "center"}
      className={[
        className,
        fullWidth ? "w-full" : undefined,
        fullHeight ? "h-full" : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export { Center };
