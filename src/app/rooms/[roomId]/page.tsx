import RoomLayout from "../../../features/room/components/RoomLayout";
import { getRoomData } from "@/lib/supabase/rooms";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const roomData = await getRoomData(roomId);

  return <RoomLayout roomId={roomId} initialRoomData={roomData}></RoomLayout>;
}
