import { supabase } from "./supabaseClient";

type Room = {
  id: string;
  name: string;
  created_by: string;
};

export async function fetchRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data as Room[]; // Type assertion to ensure data is of type Room[]
}