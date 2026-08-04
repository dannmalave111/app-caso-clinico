import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Stethoscope } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { autoConfirmNutricionista, claimNutricionista, registerNutricionista } from "@/lib/patients.functions";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acceso del nutricionista — NutriCuida" },
      {
        name: "description",
        content:
          "Inicie sesión o cree su cuenta profesional para gestionar pacientes, menús y seguimiento.",
      },
      { property: "og:title", content: "Acceso del nutricionista — NutriCuida" },
      {
        property: "og:description",
        content: "Panel profesional para registrar pacientes y dar seguimiento nutricional.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [modo, setModo] = useState<"entrar" | "crear">("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registroToken, setRegistroToken] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/nutricionista" });
    });
  }, [navigate]);

  const entrarComoNutricionista = async () => {
    try {
      await claimNutricionista();
      toast.success("Sesión iniciada");
      void navigate({ to: "/nutricionista" });
    } catch {
      toast.error("No se pudo confirmar su perfil profesional");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setCargando(true);
    try {
      if (modo === "crear") {
        let registroExitoso = false;

        // Intento 1: registro via server (admin API — no requiere verificación)
        try {
          await registerNutricionista({ data: { email: email.trim(), password, token: registroToken.trim() || undefined } });
          registroExitoso = true;
        } catch {
          // Intento 2: fallback con signUp estándar del cliente
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: { emailRedirectTo: window.location.origin },
          });
          if (signUpError) throw signUpError;

          // Auto-confirmar vía admin server si es posible
          try {
            await autoConfirmNutricionista({ data: { email: email.trim() } });
            registroExitoso = true;
          } catch {
            // Si no se pudo auto-confirmar, el usuario tiene que verificar el correo
            if (!signUpData.session) {
              toast.success("Cuenta creada. Si no recibe correo de verificación, desactive 'Confirm Email' en Supabase.");
              setCargando(false);
              return;
            }
            registroExitoso = true;
          }
        }

        if (registroExitoso) {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });
          if (signInError) throw signInError;
        }
      } else {
        // Login normal
        let { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error && error.message.toLowerCase().includes("email not confirmed")) {
          try {
            await autoConfirmNutricionista({ data: { email: email.trim() } });
            const retry = await supabase.auth.signInWithPassword({
              email: email.trim(),
              password,
            });
            error = retry.error;
          } catch {
            // Ignorar error de servidor y mantener el error original
          }
        }

        if (error) throw error;
      }
      await entrarComoNutricionista();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  const onGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) {
      toast.error("No se pudo entrar con Google");
      return;
    }
    if (result.redirected) return;
    await entrarComoNutricionista();
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
            <Stethoscope className="size-8 text-primary" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-3xl font-extrabold">
            {modo === "entrar" ? "Acceso profesional" : "Crear cuenta profesional"}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Para nutricionistas que gestionan pacientes.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg font-bold">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="tap-target rounded-2xl text-lg"
                placeholder="nombre@clinica.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg font-bold">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                maxLength={72}
                autoComplete={modo === "crear" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="tap-target rounded-2xl text-lg"
              />
            </div>

            {modo === "crear" && (
              <div className="space-y-2">
                <Label htmlFor="token" className="text-lg font-bold">
                  Código de invitación (si aplica)
                </Label>
                <Input
                  id="token"
                  type="text"
                  value={registroToken}
                  onChange={(e) => setRegistroToken(e.target.value)}
                  className="tap-target rounded-2xl text-lg"
                  placeholder="Solo si el administrador lo proporcionó"
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={cargando}
              className="tap-target w-full rounded-2xl text-lg font-bold"
            >
              {modo === "entrar" ? "Entrar" : "Crear cuenta"}
            </Button>
          </form>

          <Button
            variant="outline"
            onClick={onGoogle}
            className="tap-target mt-3 w-full rounded-2xl text-lg font-bold"
          >
            Continuar con Google
          </Button>

          <button
            onClick={() => setModo(modo === "entrar" ? "crear" : "entrar")}
            className="mt-5 w-full text-lg font-bold text-primary underline underline-offset-4"
          >
            {modo === "entrar" ? "No tengo cuenta, crear una" : "Ya tengo cuenta, entrar"}
          </button>
        </div>

        <p className="mt-6 text-center text-lg text-muted-foreground">
          ¿Es paciente?{" "}
          <Link to="/acceso" className="font-bold text-primary underline underline-offset-4">
            Entre con su código
          </Link>
        </p>
      </div>
    </main>
  );
}
