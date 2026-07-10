import { supabase } from "../lib/supabase";

export async function createProfile(user) {
  if (!user) return;

  const { error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        full_name:
          user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "User",
      },
      {
        onConflict: "id",
      }
    );

  if (error) {
    console.error("Profile creation error:", error);
  }
}