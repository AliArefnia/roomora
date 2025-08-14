import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useRoomStore } from "@/stores/tasksStore";
import type { Task } from "@/types/types";

export function useTasks(roomId: string) {
  const { setTasks, updateTask, removeTask, addTask, tasks } = useRoomStore();
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [errorFetchingTask, setErrorFetchingTasks] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!roomId) return;

    console.log(roomId);
    fetchTasks(roomId);

    const subscription = supabase
      .channel("public:tasks")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "tasks",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          const existingIds = useRoomStore.getState().tasks.map((t) => t.id);
          if (!existingIds.includes(payload.new.id)) {
            addTask(payload.new as Task);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "tasks",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          updateTask(payload.new as Task);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "tasks",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          removeTask(payload.old.id as string);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [roomId, addTask, updateTask, removeTask, setTasks]);

  async function fetchTasks(roomId: string) {
    setLoadingTasks(true);
    setErrorFetchingTasks(null);

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("room_id", roomId);

    setLoadingTasks(false);

    if (error) {
      setErrorFetchingTasks(error.message);
      return;
    }

    if (data) {
      setTasks(data);
    }
  }

  return { tasks, loadingTasks, errorFetchingTask };
}
