export type Task = {
  id: string;
  description: string;
  completed: boolean;
  room_id: string;
};

export type RoomData = {
  id: string;
  created_at: Date;
  created_by: string;
  name: string;
};
