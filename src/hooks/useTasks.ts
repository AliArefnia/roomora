import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export interface Task {
  id: number;
  description: string;
  completed: boolean;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();

    const subscription = supabase
      .channel("public:tasks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload) => {
          console.log(payload);
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase.from("tasks").select("*");
    if (!error && data) {
      setTasks(data);
    }
  }

  return { tasks };
}
