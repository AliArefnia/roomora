import { GripVertical, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { Children, useState } from "react";
import { Task } from "@/types/types";

export function AppSidebar({ children }: { children: ReactNode }) {
  return (
    <Sidebar>
      {children}
      <SidebarContent />
    </Sidebar>
  );
}
