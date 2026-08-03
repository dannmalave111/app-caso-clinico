import { Bell, Check, Droplets, Pill, UtensilsCrossed } from "lucide-react";

import { MEAL_ORDER, MEAL_TIMES, useStore } from "@/lib/store";

type Recordatorio = {
  id: string;
  hora: string;
  titulo: string;
  detalle: string;
  tipo: "agua" | "comida" | "medicacion";
  hecho: boolean;
  accion?: () => void;
};

const ICONOS = {
  agua: Droplets,
  comida: UtensilsCrossed,
  medicacion: Pill,
} as const;

export function Recordatorios({ fecha }: { fecha: string }) {
  const { activePatient, getLog, updateLog, toggleMeal } = useStore();
  const log = getLog(activePatient.id, fecha);
  const dia = String(new Date(`${fecha}T12:00:00`).getDay());
  const bloques = [...(activePatient.plan[dia] ?? [])].sort(
    (a, b) => MEAL_ORDER.indexOf(a.tipo) - MEAL_ORDER.indexOf(b.tipo),
  );

  const items: Recordatorio[] = [
    ...bloques.map((b) => ({
      id: `comida-${b.id}`,
      hora: MEAL_TIMES[b.tipo],
      titulo: b.tipo,
      detalle: b.titulo,
      tipo: "comida" as const,
      hecho: log.completados.includes(b.id),
      accion: () => toggleMeal(activePatient.id, fecha, b.id),
    })),
    ...activePatient.medicacion.map((m) => ({
      id: `med-${m.id}`,
      hora: m.horario || "08:00",
      titulo: `Tomar ${m.tipo}`,
      detalle: m.gramaje,
      tipo: "medicacion" as const,
      hecho: log.medicacionTomada.includes(m.id),
      accion: () =>
        updateLog(activePatient.id, fecha, {
          medicacionTomada: log.medicacionTomada.includes(m.id)
            ? log.medicacionTomada.filter((x) => x !== m.id)
            : [...log.medicacionTomada, m.id],
        }),
    })),
    {
      id: "agua",
      hora: "Todo el día",
      titulo: "Tomar agua",
      detalle: `${log.agua} de ${activePatient.metaAgua} vasos`,
      tipo: "agua",
      hecho: log.agua >= activePatient.metaAgua,
      accion: () =>
        updateLog(activePatient.id, fecha, {
          agua: Math.min(20, log.agua + 1),
        }),
    },
  ].sort((a, b) => a.hora.localeCompare(b.hora));

  const pendientes = items.filter((i) => !i.hecho).length;

  return (
    <section aria-labelledby="titulo-recordatorios" className="mt-8">
      <h2 id="titulo-recordatorios" className="flex items-center gap-2 text-2xl font-extrabold">
        <Bell className="size-7 text-primary" aria-hidden="true" />
        Mis recordatorios de hoy
      </h2>
      <p className="mt-1 text-lg text-muted-foreground">
        {pendientes === 0 ? "¡Todo listo por hoy!" : `Le faltan ${pendientes} por marcar.`}
      </p>

      <ul className="mt-4 space-y-3">
        {items.map((r) => {
          const Icono = ICONOS[r.tipo];
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={r.accion}
                aria-pressed={r.hecho}
                className={`flex w-full items-center gap-4 rounded-3xl border-2 p-4 text-left transition-colors ${
                  r.hecho
                    ? "border-primary bg-primary-soft"
                    : "border-border bg-card hover:bg-muted"
                }`}
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary">
                  <Icono className="size-7" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-extrabold">{r.titulo}</span>
                  <span className="block text-lg text-muted-foreground">
                    {r.hora} · {r.detalle}
                  </span>
                </span>
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 ${
                    r.hecho
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  <Check className="size-7" aria-hidden="true" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
