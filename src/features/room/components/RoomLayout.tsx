"use client";
import type { RoomData } from "@/types/types";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import SidebarContent from "@/components/ui/SidebarContent";
import VideoRoom from "./VideoRoom";

import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";

export default function RoomLayout({
  roomId,
  initialRoomData,
}: {
  roomId: string;
  initialRoomData?: RoomData;
}) {
  const agoraClient = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  const { tasks, loadingTasks, errorFetchingTask } = useTasks(roomId);

  return (
    <SidebarProvider>
      <AppSidebar>
        <SidebarContent tasks={tasks} />
      </AppSidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 animate-pulse hover:animate-none hover:cursor-pointer hover:scale-105" />

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <p>asdasd</p>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <AgoraRTCProvider client={agoraClient}>
            <VideoRoom></VideoRoom>
          </AgoraRTCProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
