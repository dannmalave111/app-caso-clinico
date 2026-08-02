import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

export type Rol = "nutricionista" | "paciente" | null;

export type PatientRow = {
  id: string;
  user_id: string | null;
  nombre: string;
  edad: number;
  telefono: string;
  objetivo: string;
  meta_agua: number;
  codigo: string;
  created_at: string;
};

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [rol, setRol] = useState<Rol>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    const cargarRol = async (userId: string | undefined) => {
      if (!userId) {
        if (activo) setRol(null);
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .limit(1)
        .maybeSingle();
      if (activo) setRol((data?.role as Rol) ?? null);
    };

    void supabase.auth.getSession().then(async ({ data }) => {
      if (!activo) return;
      setSession(data.session);
      await cargarRol(data.session?.user.id);
      if (activo) setCargando(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setSession(s);
      void cargarRol(s?.user.id);
    });

    return () => {
      activo = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, rol, cargando };
}

export async function cerrarSesion() {
  await supabase.auth.signOut();
}
