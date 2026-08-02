import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, HeartPulse } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { patientEmail, patientPassword } from "@/lib/patients.shared";

const normalizar = (v: string) =>
  v
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");

export const Route = createFileRoute("/acceso")({
  head: () => ({
    meta: [
      { title: "Entrar como paciente — NutriCuida" },
      {
        name: "description",
        content:
          "Escriba su nombre y el código de acceso que le dio su nutricionista para ver su plan del día.",
      },
      { property: "og:title", content: "Entrar como paciente — NutriCuida" },
      {
        property: "og:description",
        content: "Acceso sencillo con nombre y código de 6 dígitos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccesoPaciente,
});

function AccesoPaciente() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [cargando, setCargando] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = codigo.trim();
    if (!/^[0-9]{6}$/.test(code)) {
      toast.error("El código debe tener 6 números");
      return;
    }
    setCargando(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: patientEmail(code),
        password: patientPassword(code),
      });
      if (error || !data.user) throw new Error("Código incorrecto");

      const { data: ficha } = await supabase
        .from("patients")
        .select("nombre")
        .eq("user_id", data.user.id)
        .maybeSingle();

      if (!ficha || normalizar(ficha.nombre) !== normalizar(nombre)) {
        await supabase.auth.signOut();
        throw new Error("El nombre no coincide con el código");
      }

      toast.success(`Bienvenido, ${ficha.nombre}`);
      void navigate({ to: "/paciente" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo entrar");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-lg font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-6" aria-hidden="true" />
          Volver
        </Link>

        <div className="card-float p-7">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-soft">
            <HeartPulse className="size-8 text-primary" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-3xl font-extrabold">Entrar como paciente</h1>
          <p className="mt-2 text-xl text-muted-foreground">
            Escriba su nombre y el código de 6 números que le dio su nutricionista.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-xl font-bold">
                Su nombre
              </Label>
              <Input
                id="nombre"
                required
                maxLength={80}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="tap-target rounded-2xl text-xl"
                placeholder="Doña Carmen Ruiz"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codigo" className="text-xl font-bold">
                Código de acceso
              </Label>
              <Input
                id="codigo"
                required
                inputMode="numeric"
                maxLength={6}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.replace(/[^0-9]/g, ""))}
                className="tap-target rounded-2xl text-center text-3xl font-extrabold tracking-[0.3em]"
                placeholder="000000"
              />
            </div>

            <Button
              type="submit"
              disabled={cargando}
              className="tap-target w-full rounded-2xl text-xl font-bold"
            >
              Entrar
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-lg text-muted-foreground">
          ¿Es nutricionista?{" "}
          <Link to="/auth" className="font-bold text-primary underline underline-offset-4">
            Acceso profesional
          </Link>
        </p>
      </div>
    </main>
  );
}
