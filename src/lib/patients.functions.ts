import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const patientEmail = (codigo: string) => `p${codigo}@nutricuida.app`;
export const patientPassword = (codigo: string) => `NutriCuida-${codigo}`;

const registroSchema = z.object({
  nombre: z.string().trim().min(3).max(80),
  edad: z.number().int().min(1).max(120),
  telefono: z
    .string()
    .trim()
    .max(20)
    .regex(/^[0-9+\s-]*$/, "Teléfono inválido"),
  objetivo: z.string().trim().max(200),
  metaAgua: z.number().int().min(1).max(20),
});

async function assertNutricionista(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "nutricionista",
  });
  if (error || !data) throw new Error("Solo el nutricionista puede realizar esta acción");
}

/** Marca al usuario recién registrado como nutricionista si aún no tiene rol. */
export const claimNutricionista = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);

    if (roles && roles.length > 0) return { role: roles[0]!.role };

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "nutricionista" });
    if (error) throw new Error(error.message);
    return { role: "nutricionista" as const };
  });

export const registerPatient = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => registroSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertNutricionista(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let codigo = "";
    for (let intento = 0; intento < 8; intento++) {
      const candidato = String(Math.floor(100000 + Math.random() * 900000));
      const { data: existente } = await supabaseAdmin
        .from("patients")
        .select("id")
        .eq("codigo", candidato)
        .maybeSingle();
      if (!existente) {
        codigo = candidato;
        break;
      }
    }
    if (!codigo) throw new Error("No se pudo generar un código de acceso, intente de nuevo");

    const { data: created, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: patientEmail(codigo),
      password: patientPassword(codigo),
      email_confirm: true,
      user_metadata: { nombre: data.nombre, tipo: "paciente" },
    });
    if (authError || !created.user) throw new Error(authError?.message ?? "No se pudo crear la cuenta");

    const userId = created.user.id;
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "paciente" });
    if (roleError) {
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error(roleError.message);
    }

    const { data: patient, error: patientError } = await supabaseAdmin
      .from("patients")
      .insert({
        user_id: userId,
        nombre: data.nombre,
        edad: data.edad,
        telefono: data.telefono,
        objetivo: data.objetivo,
        meta_agua: data.metaAgua,
        codigo,
        created_by: context.userId,
      })
      .select()
      .single();

    if (patientError || !patient) {
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error(patientError?.message ?? "No se pudo registrar al paciente");
    }

    return { patient, codigo };
  });

export const deletePatient = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertNutricionista(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: patient } = await supabaseAdmin
      .from("patients")
      .select("user_id")
      .eq("id", data.id)
      .maybeSingle();

    const { error } = await supabaseAdmin.from("patients").delete().eq("id", data.id);
    if (error) throw new Error(error.message);

    if (patient?.user_id) {
      await supabaseAdmin.from("user_roles").delete().eq("user_id", patient.user_id);
      await supabaseAdmin.auth.admin.deleteUser(patient.user_id);
    }
    return { ok: true };
  });
