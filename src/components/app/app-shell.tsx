"use client";

import type * as React from "react";

import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Container } from "../layout";
import { AppSidebar } from "./app-sidebar";

type AppShellProps = {
  header: React.ReactNode;
  children: React.ReactNode;
};

function AppShell({ header, children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="min-h-dvh flex">
        <AppSidebar />
        {/* Sidebar は fixed なので、開閉状態に合わせた幅のスペーサーでレイアウトを確保する */}
        <SidebarSpacer />
        <div className="flex-1">
          {header}
          <main>
            <Container width="fluid">{children}</Container>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export { AppShell };

function SidebarSpacer() {
  const { open } = useSidebar();
  return (
    <div
      aria-hidden
      className={cn(
        "shrink-0 transition-[width] duration-200",
        open ? "w-56" : "w-16",
      )}
    />
  );
}
