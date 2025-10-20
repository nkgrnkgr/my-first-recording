"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type SidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return ctx;
}

type SidebarProviderProps = {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  children,
}: SidebarProviderProps) {
  const [openState, setOpenState] = React.useState<boolean>(defaultOpen);
  const open = openProp ?? openState;

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (onOpenChange) onOpenChange(value);
      else setOpenState(value);
    },
    [onOpenChange],
  );

  const toggle = React.useCallback(() => setOpen(!open), [open, setOpen]);

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

type SidebarProps = React.ComponentProps<"aside"> & {
  collapsible?: "off" | "icon";
};

function Sidebar({
  className,
  children,
  collapsible = "off",
  ...props
}: SidebarProps) {
  const { open } = useSidebar();
  return (
    <aside
      data-collapsible={collapsible}
      data-open={open}
      className={cn(
        "bg-sidebar text-sidebar-foreground border-sidebar-border fixed inset-y-0 left-0 z-40 border-r",
        "group",
        // 開閉状態に応じて幅を切り替え（閉時はアイコン幅）
        "data-[open=true]:w-56 data-[open=false]:w-16 transition-[width] duration-200",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("sticky top-0 z-10 px-3 py-3", className)} {...props} />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("sticky bottom-0 z-10 px-3 py-3", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-full overflow-y-auto px-2 py-3", className)}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mb-3", className)} {...props} />;
}

function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "px-2 text-xs text-muted-foreground",
        "group-data-[open=false]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("mt-2", className)} {...props} />;
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("my-2 h-px bg-sidebar-border", className)} {...props} />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex flex-col gap-1", className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("list-none", className)} {...props} />;
}

type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
};

function SidebarMenuButton({
  asChild,
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-2",
        "group-data-[open=false]:justify-center group-data-[open=false]:gap-0",
        "text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function SidebarTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggle } = useSidebar();
  return (
    <Button
      size="sm"
      variant="ghost"
      className={cn("mb-2", className)}
      onClick={toggle}
      {...props}
    >
      {children ?? "Toggle"}
    </Button>
  );
}

export {
  SidebarProvider,
  useSidebar,
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
};
