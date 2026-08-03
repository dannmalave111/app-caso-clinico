import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { emptyMeasurement, isoDate, useStore, type Measurement } from "@/lib/store";

const field =
  "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none";
const label = "block text-sm font-bold text-muted-foreground";

const CAMPOS: { key: keyof Measurement; texto: string; unidad: string }[] = [
  { key: "peso", texto: "Peso", unidad: "kg" },
  { key: "cintura", texto: "Cintura", unidad: "cm" },
  { key: "cadera", texto: "Cadera", unidad: "cm" },
  { key: "bicipital", texto: "Circunferencia bicipital", unidad: "cm" },
  { key: "abdominal", texto: "Circunferencia abdominal", unidad: "cm" },
  { key: "musloMedio", texto: "Muslo medio", unidad: "cm" },
  { key: "pantorrilla", texto: "Pantorrilla", unidad: "cm" },
  { key: "pliegueTricipital", texto: "Pliegue tricipital", unidad: "mm" },
  { key: "pliegueSubescapular", texto: "Pliegue subescapular", unidad: "mm" },
];

export function AntropometriaPanel() {
  const { activePatient, addMeasurement, removeMeasurement } = useStore();
  const medidas = activePatient.medidas;
  const ultima = medidas[medidas.length - 1];
  const previa = medidas[medidas.length - 2];

  const [form, setForm] = useState<Measurement>(() => ({
    ...emptyMeasurement(isoDate(new Date())),
  }));

  const promedioCambio = useMemo(() => {
    if (medidas.length < 2) return 0;
    const total = (ultima?.peso ?? 0) - (medidas[0]?.peso ?? 0);
    return Number((total / (medidas.length - 1)).toFixed(2));
  }, [medidas, ultima]);

  const delta = (a?: number, b?: number) =>
    a !== undefined && b !== undefined ? Number((a - b).toFixed(1)) : 0;

  const registrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.peso) return;
    addMeasurement(activePatient.id, form);
    setForm({ ...emptyMeasurement(isoDate(new Date())) });
  };

  const cards = [
    { label: "Peso actual", value: `${ultima?.peso?.toFixed(1) ?? "—"} kg`, delta: delta(ultima?.peso, previa?.peso), unidad: "kg" },
    { label: "Cintura", value: `${ultima?.cintura ?? "—"} cm`, delta: delta(ultima?.cintura, previa?.cintura), unidad: "cm" },
    { label: "Circunferencia abdominal", value: `${ultima?.abdominal ?? "—"} cm`, delta: delta(ultima?.abdominal, previa?.abdominal), unidad: "cm" },
  ];

  return (
    <section>
      <h2 className="text-2xl font-extrabold">Seguimiento antropométrico</h2>
      <p className="text-muted-foreground">
        Cambio promedio por consulta: <strong>{promedioCambio} kg</strong> ·{" "}
        {activePatient.excelUrl ? (
          <a
            href={activePatient.excelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary underline"
          >
            Abrir hoja de cálculo externa
          </a>
        ) : (
          "Agregue el enlace a Excel en la ficha clínica"
        )}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="card-float p-6">
            <p className="text-sm font-bold uppercase text-muted-foreground">{c.label}</p>
            <p className="mt-2 text-3xl font-extrabold">{c.value}</p>
            <p
              className={`mt-1 text-base font-bold ${
                c.delta < 0 ? "text-primary" : c.delta > 0 ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {c.delta > 0 ? "+" : ""}
              {c.delta} {c.unidad} vs. consulta anterior
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form onSubmit={registrar} className="card-float p-6">
          <h3 className="text-xl font-extrabold">Nueva medición</h3>
          <div className="mt-4">
            <label className={label} htmlFor="m-fecha">
              Fecha de la medición
            </label>
            <input
              id="m-fecha"
              type="date"
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              className={field}
              required
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {CAMPOS.map((c) => (
              <div key={c.key}>
                <label className={label} htmlFor={`m-${c.key}`}>
                  {c.texto} ({c.unidad})
                </label>
                <input
                  id={`m-${c.key}`}
                  type="number"
                  step="0.1"
                  value={form[c.key] === 0 ? "" : (form[c.key] as number)}
                  onChange={(e) => setForm({ ...form, [c.key]: Number(e.target.value || 0) })}
                  required={c.key === "peso"}
                  className={field}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground hover:opacity-90"
          >
            Guardar medición
          </button>
        </form>

        <div className="card-float p-6">
          <h3 className="text-xl font-extrabold">Evolución de peso</h3>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={medidas.map((m) => ({
                  fecha: new Date(m.fecha).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "short",
                  }),
                  peso: m.peso,
                }))}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="fecha" tick={{ fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis domain={["dataMin - 3", "dataMax + 2"]} tick={{ fontSize: 13 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    color: "var(--foreground)",
                  }}
                  formatter={(v: number) => [`${v} kg`, "Peso"]}
                />
                <Bar dataKey="peso" fill="var(--primary)" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card-float mt-6 overflow-x-auto">
        <table className="w-full min-w-[60rem] text-left">
          <thead>
            <tr className="border-b border-border text-sm uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-4">Fecha</th>
              {CAMPOS.map((c) => (
                <th key={c.key} className="px-4 py-4">
                  {c.texto}
                </th>
              ))}
              <th className="px-4 py-4">Quitar</th>
            </tr>
          </thead>
          <tbody>
            {[...medidas].reverse().map((m) => (
              <tr key={m.fecha} className="border-b border-border last:border-0">
                <td className="px-4 py-4 font-bold">{m.fecha}</td>
                {CAMPOS.map((c) => (
                  <td key={c.key} className="px-4 py-4">
                    {m[c.key] || "—"}
                  </td>
                ))}
                <td className="px-4 py-4">
                  <button
                    type="button"
                    aria-label={`Eliminar medición del ${m.fecha}`}
                    onClick={() => removeMeasurement(activePatient.id, m.fecha)}
                    className="flex size-11 items-center justify-center rounded-xl text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-5" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
