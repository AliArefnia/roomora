import { createServerSupabaseClient } from "./supabaseServer";

export async function getRoomData(roomId: string) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();

  if (error) {
    console.error("Supabase error fetching room data:", error);
    return null; // Or throw a custom error if you want
  }
  return data;
}
