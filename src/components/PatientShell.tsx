import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarHeart, LineChart, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { cerrarSesion } from "@/lib/auth";

export function PatientShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const items = [
    { to: "/paciente", label: "Hoy", icon: CalendarHeart },
    { to: "/paciente/progreso", label: "Progreso", icon: LineChart },
  ] as const;

  const salir = async () => {
    await cerrarSesion();
    window.location.href = "/";
  };

  return (
    <div className="min-h-dvh bg-background pb-32">
      <div className="mx-auto w-full max-w-2xl px-5 pt-6">{children}</div>

      <nav
        aria-label="Navegación principal"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur"
      >
        <div className="mx-auto flex w-full max-w-2xl items-stretch gap-2 px-4 py-3">
          {items.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`tap-target flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-lg font-bold transition-colors ${
                  active
                    ? "bg-primary-soft text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="size-7" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={salir}
            aria-label="Cerrar sesión"
            className="tap-target flex flex-col items-center justify-center gap-1 rounded-2xl px-4 text-lg font-bold text-muted-foreground hover:bg-muted"
          >
            <LogOut className="size-7" aria-hidden="true" />
            Salir
          </button>
        </div>
      </nav>
    </div>
  );
}
