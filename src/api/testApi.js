import { supabase } from "../lib/supabase";

export async function saveTestResult(result) {
  const { data, error } = await supabase
    .from("results")
    .insert(result)
    .select();

  if (error) throw error;

  return data;
}

export async function getUserResults(userId) {
  const { data, error } = await supabase
    .from("results")
    .select("*")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false });

  if (error) throw error;

  return data;
}