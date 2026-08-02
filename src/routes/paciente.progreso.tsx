import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/paciente/progreso")({
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
  const { activePatient, getLog } = useStore();

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
        <p className="mt-2 text-lg text-muted-foreground">Su constancia de los últimos 7 días.</p>
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
