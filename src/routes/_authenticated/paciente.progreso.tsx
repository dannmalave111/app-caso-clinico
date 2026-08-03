import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, Plus, Trash2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PatientShell } from "@/components/PatientShell";
import { daysAgo, isoDate, useStore } from "@/lib/store";

export const Route = createFileRoute("/_authenticated/paciente/progreso")({
  head: () => ({
    meta: [
      { title: "Mi progreso — NutriCuida" },
      {
        name: "description",
        content:
          "Vea de forma sencilla su constancia de la semana: comidas cumplidas y vasos de agua.",
      },
      { property: "og:title", content: "Mi progreso — NutriCuida" },
      {
        property: "og:description",
        content: "Gráficas claras de constancia semanal en dieta e hidratación.",
      },
    ],
  }),
  component: Progreso,
});

function Progreso() {
  const { activePatient, getLog, addActividad, removeActividad } = useStore();

  const [tipoAct, setTipoAct] = useState("");
  const [minutosAct, setMinutosAct] = useState(0);
  const [intensidadAct, setIntensidadAct] = useState<"Baja" | "Media" | "Alta">("Baja");
  const [notasAct, setNotasAct] = useState("");

  const registrarActividadPaciente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipoAct.trim()) return;
    addActividad(activePatient.id, {
      fecha: isoDate(new Date()),
      tipo: tipoAct.trim(),
      minutos: Number(minutosAct) || 30,
      intensidad: intensidadAct,
      notas: notasAct.trim(),
    });
    setNotasAct("");
  };

  const dias = Array.from({ length: 7 }, (_, i) => daysAgo(6 - i));
  const data = dias.map((d) => {
    const log = getLog(activePatient.id, isoDate(d));
    const total = (activePatient.plan[String(d.getDay())] ?? []).length || 1;
    return {
      dia: d.toLocaleDateString("es-MX", { weekday: "short" }),
      comidas: Math.round((log.completados.length / total) * 100),
      agua: log.agua,
    };
  });

  const diasCumplidos = data.filter((d) => d.comidas >= 80).length;
  const promedioAgua = Math.round(
    (data.reduce((s, d) => s + d.agua, 0) / data.length) * 10,
  ) / 10;

  return (
    <PatientShell>
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Mi progreso</h1>
        <p className="mt-2 text-lg text-muted-foreground">Su constancia de los últimos 7 días y registro de actividad física.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card-float p-6">
          <p className="text-lg font-semibold text-muted-foreground">Días de dieta cumplidos</p>
          <p className="mt-2 text-5xl font-extrabold text-primary">{diasCumplidos} / 7</p>
        </div>
        <div className="card-float p-6">
          <p className="text-lg font-semibold text-muted-foreground">Promedio de agua</p>
          <p className="mt-2 text-5xl font-extrabold text-water">
            {promedioAgua}
            <span className="text-2xl font-bold text-muted-foreground"> vasos</span>
          </p>
        </div>
      </div>

      {/* Registro de Actividad Física desde la vista del paciente */}
      <section className="card-float mt-6 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Activity className="size-7 text-primary" />
          <h2 className="text-2xl font-extrabold">Mi Actividad Física</h2>
        </div>
        <p className="text-base text-muted-foreground">
          Registre los ejercicios o caminatas que realiza durante el día. Su nutricionista los podrá ver en su panel.
        </p>

        <form onSubmit={registrarActividadPaciente} className="space-y-4 rounded-2xl bg-muted/40 p-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="p-act-tipo" className="block text-sm font-bold text-muted-foreground">
                Tipo de actividad
              </label>
              <input
                id="p-act-tipo"
                value={tipoAct}
                onChange={(e) => setTipoAct(e.target.value)}
                placeholder="Ej. Caminata, Baile, Natación"
                className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-lg font-bold"
              />
            </div>
            <div>
              <label htmlFor="p-act-min" className="block text-sm font-bold text-muted-foreground">
                Duración (minutos)
              </label>
              <input
                id="p-act-min"
                type="number"
                min={1}
                max={300}
                value={minutosAct}
                onChange={(e) => setMinutosAct(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-lg font-bold"
              />
            </div>
            <div>
              <label htmlFor="p-act-int" className="block text-sm font-bold text-muted-foreground">
                Intensidad
              </label>
              <select
                id="p-act-int"
                value={intensidadAct}
                onChange={(e) => setIntensidadAct(e.target.value as "Baja" | "Media" | "Alta")}
                className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-lg font-bold"
              >
                <option value="Baja">Baja (suave)</option>
                <option value="Media">Media (moderada)</option>
                <option value="Alta">Alta (intensa)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="p-act-notas" className="block text-sm font-bold text-muted-foreground">
              Comentarios o notas (opcional)
            </label>
            <input
              id="p-act-notas"
              value={notasAct}
              onChange={(e) => setNotasAct(e.target.value)}
              placeholder="Ej. Me sentí muy bien, sin dolores"
              className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-lg font-medium"
            />
          </div>

          <button
            type="submit"
            className="tap-target flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-xl font-bold text-primary-foreground hover:opacity-90"
          >
            <Plus className="size-6" />
            Registrar mi actividad física
          </button>
        </form>

        {activePatient.actividades.length > 0 && (
          <div className="pt-2">
            <h3 className="text-lg font-bold">Mis actividades registradas:</h3>
            <ul className="mt-3 space-y-3">
              {activePatient.actividades.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-4 rounded-2xl bg-card border border-border p-4">
                  <div>
                    <p className="text-lg font-bold text-foreground">
                      {a.tipo} · {a.minutos} minutos
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Fecha: {a.fecha} · Intensidad {a.intensidad}
                    </p>
                    {a.notas && <p className="mt-1 text-base italic">{a.notas}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeActividad(activePatient.id, a.id)}
                    aria-label={`Eliminar actividad ${a.tipo}`}
                    className="flex size-10 items-center justify-center rounded-xl text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="card-float mt-6 p-6">
        <h2 className="text-2xl font-extrabold">Comidas cumplidas (%)</h2>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="dia"
                tick={{ fontSize: 16, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 16, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  fontSize: 16,
                  background: "var(--card)",
                  color: "var(--foreground)",
                }}
                formatter={(v: number) => [`${v}%`, "Cumplido"]}
              />
              <Bar dataKey="comidas" fill="var(--primary)" radius={[12, 12, 0, 0]} barSize={34} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card-float mt-6 p-6">
        <h2 className="text-2xl font-extrabold">Vasos de agua por día</h2>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="dia"
                tick={{ fontSize: 16, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, Math.max(10, activePatient.metaAgua + 2)]}
                tick={{ fontSize: 16, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  fontSize: 16,
                  background: "var(--card)",
                  color: "var(--foreground)",
                }}
                formatter={(v: number) => [`${v} vasos`, "Agua"]}
              />
              <Line
                type="monotone"
                dataKey="agua"
                stroke="var(--water)"
                strokeWidth={4}
                dot={{ r: 6, fill: "var(--water)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </PatientShell>
  );
}
