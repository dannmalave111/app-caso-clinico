import type { SupabaseClient } from "@supabase/supabase-js";

export async function assertNutricionista(context: {
  supabase: SupabaseClient;
  userId: string;
}) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "nutricionista",
  });
  if (error || !data) throw new Error("Solo el nutricionista puede realizar esta acción");
}
