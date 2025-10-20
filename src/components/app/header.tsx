import type * as React from "react";
import { Icon } from "@/components/icons/icon";
import { Inline } from "@/components/layout/inline";
import { H4 } from "@/components/typography/heading";

type HeaderProps = {
  title?: string;
  rightSlot?: React.ReactNode;
  className?: string;
};

function Header({ title = "Dashboard", rightSlot, className }: HeaderProps) {
  return (
    <header className={className}>
      <div className="border-b bg-background">
        <Inline justify="between" align="center" className="h-14 px-4">
          <Inline gap="sm" align="center">
            <Icon name="home" decorative />
            <H4>{title}</H4>
          </Inline>
          <Inline align="center" gap="sm">
            {rightSlot}
          </Inline>
        </Inline>
      </div>
    </header>
  );
}

export { Header };
