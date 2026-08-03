import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Json } from "@/integrations/supabase/types";
import { clinicoSchema, patientEmail, patientPassword, registroSchema } from "@/lib/patients.shared";
import { assertNutricionista } from "@/lib/patients.server";

/** Carga todos los pacientes del nutricionista autenticado desde Supabase. */
export const loadMyPatients = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("patients")
      .select("*")
      .eq("created_by", context.userId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

/** Carga el registro del paciente autenticado desde Supabase. */
export const loadMyPatientRecord = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("patients")
      .select("*")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });

/** Sincroniza los datos dinámicos del paciente (plan, medidas, logs, actividades) con Supabase. */
export const syncPatientData = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({
      id: z.string().uuid(),
      plan_semanal: z.record(z.any()),
      medidas: z.array(z.any()),
      logs: z.record(z.any()),
      actividades: z.array(z.any()),
    }).parse(input)
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("patients")
      .update({
        plan_semanal: data.plan_semanal as unknown as Json,
        medidas: data.medidas as unknown as Json,
        logs: data.logs as unknown as Json,
        actividades: data.actividades as unknown as Json,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

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

/** Guarda los datos sociodemográficos y clínicos editables del paciente. */
export const updatePatientClinico = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => clinicoSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertNutricionista(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Empaquetar campos extendidos dentro del JSON de macros para compatibilidad de esquema
    const macrosExtended = {
      ...data.macros,
      requerimientoCalorico: data.requerimientoCalorico,
      requerimientoHidricoMl: data.requerimientoHidricoMl,
      encuestaFrecuenciaUrl: data.encuestaFrecuenciaUrl,
      quienPreparaComida: data.quienPreparaComida,
      tieneHijos: data.tieneHijos,
      detallesHijos: data.detallesHijos,
      observacionesClinicas: data.observacionesClinicas,
      antecedentesDriveUrl: data.antecedentesDriveUrl,
      menuDriveUrl: data.menuDriveUrl,
    };

    const updatePayload: {
      estado_civil?: string;
      ocupacion?: string;
      diagnostico?: string;
      medicacion?: Json;
      formulas?: string;
      excel_url?: string;
      macros?: Json;
      meta_agua?: number;
    } = {
      estado_civil: data.estadoCivil,
      ocupacion: data.ocupacion,
      diagnostico: data.diagnostico,
      medicacion: data.medicacion as unknown as Json,
      formulas: data.formulas,
      excel_url: data.excelUrl,
      macros: macrosExtended as unknown as Json,
    };

    if (data.requerimientoHidricoMl && data.requerimientoHidricoMl > 0) {
      updatePayload.meta_agua = Math.max(1, Math.round(data.requerimientoHidricoMl / 250));
    }

    const { error } = await supabaseAdmin
      .from("patients")
      .update(updatePayload)
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Registra a un nutricionista autoconfirmando su correo en el servidor. */
export const registerNutricionista = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      .parse(input)
  )
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      const { data: created, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: data.email.trim(),
        password: data.password,
        email_confirm: true,
        user_metadata: { tipo: "nutricionista" },
      });

      if (authError || !created.user) {
        throw new Error(authError?.message ?? "No se pudo crear la cuenta de nutricionista");
      }

      const { error: roleError } = await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: created.user.id, role: "nutricionista" });

      if (roleError) {
        await supabaseAdmin.auth.admin.deleteUser(created.user.id);
        throw new Error(roleError.message);
      }

      return { ok: true, userId: created.user.id };
    } catch (err) {
      console.warn("registerNutricionista via admin client failed:", err);
      throw err;
    }
  });

/** Autoconfirma el correo de un nutricionista en caso de que esté pendiente de verificación. */
export const autoConfirmNutricionista = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        email: z.string().email(),
      })
      .parse(input)
  )
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      if (listError || !usersData?.users) return { confirmed: false };

      const targetUser = usersData.users.find(
        (u) => u.email?.toLowerCase() === data.email.trim().toLowerCase()
      );

      if (targetUser && !targetUser.email_confirmed_at) {
        await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
          email_confirm: true,
        });
        return { confirmed: true };
      }

      return { confirmed: false };
    } catch (err) {
      console.warn("autoConfirmNutricionista skipped:", err);
      return { confirmed: false };
    }
  });

