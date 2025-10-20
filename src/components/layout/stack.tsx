import type * as React from "react";

import { Flex } from "./flex";

type StackProps = React.ComponentProps<typeof Flex>;

function Stack({ direction, ...props }: StackProps) {
  return <Flex data-slot="stack" direction={direction ?? "col"} {...props} />;
}

export { Stack };
