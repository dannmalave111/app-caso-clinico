import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartPulse, Stethoscope, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NutriCuida — Plan de alimentación acompañado" },
      {
        name: "description",
        content:
          "App de seguimiento nutricional accesible: plan diario para el paciente y panel de control para el nutricionista.",
      },
      { property: "og:title", content: "NutriCuida — Plan de alimentación acompañado" },
      {
        property: "og:description",
        content:
          "Plan de comidas, hidratación y seguimiento clínico en una sola aplicación fácil de usar.",
      },
    ],
  }),
  component: RoleSelector,
});

function RoleSelector() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-3xl">
        <div className="text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-primary-soft">
            <HeartPulse className="size-9 text-primary" aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">NutriCuida</h1>
          <p className="mx-auto mt-4 max-w-xl text-xl text-muted-foreground">
            Bienvenido. Elija cómo desea entrar hoy.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link
            to="/acceso"
            className="card-float group flex flex-col gap-3 p-8 transition-transform hover:-translate-y-1"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-soft">
              <HeartPulse className="size-8 text-primary" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-extrabold">Soy paciente</h2>
            <p className="text-lg text-muted-foreground">
              Mi plan de comidas de hoy, mis vasos de agua y mi registro diario.
            </p>
            <span className="mt-2 inline-flex items-center gap-2 text-lg font-bold text-primary">
              Entrar <ArrowRight className="size-5" aria-hidden="true" />
            </span>
          </Link>

          <Link
            to="/auth"
            className="card-float group flex flex-col gap-3 p-8 transition-transform hover:-translate-y-1"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl bg-water-soft">
              <Stethoscope className="size-8 text-water" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-extrabold">Soy nutricionista</h2>
            <p className="text-lg text-muted-foreground">
              Panel de pacientes, menús, medidas y seguimiento de avances.
            </p>
            <span className="mt-2 inline-flex items-center gap-2 text-lg font-bold text-water">
              Entrar <ArrowRight className="size-5" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
