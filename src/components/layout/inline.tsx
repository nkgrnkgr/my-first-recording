import type * as React from "react";
import { Flex } from "./flex";

type InlineProps = React.ComponentProps<typeof Flex>;

function Inline({ direction, align, ...props }: InlineProps) {
  return (
    <Flex
      data-slot="inline"
      direction={direction ?? "row"}
      align={align ?? "center"}
      {...props}
    />
  );
}

export { Inline };
