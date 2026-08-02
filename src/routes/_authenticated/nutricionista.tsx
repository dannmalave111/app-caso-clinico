import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  MessageCircle,
  Plus,
  Ruler,
  Trash2,
  Users,
  UtensilsCrossed,
  History,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BRISTOL,
  MEAL_ORDER,
  WEEKDAYS,
  daysAgo,
  isoDate,
  useStore,
  type MealType,
} from "@/lib/store";

export const Route = createFileRoute("/_authenticated/nutricionista")({
  head: () => ({
    meta: [
      { title: "Panel del nutricionista — NutriCuida" },
      {
        name: "description",
        content:
          "Gestione pacientes, asigne menús semanales, registre medidas antropométricas y revise el avance diario.",
      },
      { property: "og:title", content: "Panel del nutricionista — NutriCuida" },
      {
        property: "og:description",
        content: "Dashboard clínico con menús, antropometría, timeline de avances y contacto directo.",
      },
    ],
  }),
  component: Dashboard,
});

type Tab = "pacientes" | "registro" | "menu" | "medidas" | "timeline";

function Dashboard() {
  const { patients, activePatient, setActivePatientId } = useStore();
  const [tab, setTab] = useState<Tab>("pacientes");

  const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
    { id: "pacientes", label: "Pacientes", icon: Users },
    { id: "registro", label: "Registro y accesos", icon: UserPlus },
    { id: "menu", label: "Menú semanal", icon: UtensilsCrossed },
    { id: "medidas", label: "Antropometría", icon: Ruler },
    { id: "timeline", label: "Timeline", icon: History },
  ];

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/"
              aria-label="Volver al selector de perfil"
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted hover:bg-secondary"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </Link>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-extrabold">Panel del nutricionista</h1>
              <p className="truncate text-sm text-muted-foreground">
                {patients.length} pacientes activos
              </p>
            </div>
          </div>
          <select
            aria-label="Paciente seleccionado"
            value={activePatient.id}
            onChange={(e) => setActivePatientId(e.target.value)}
            className="h-11 rounded-xl border border-border bg-card px-3 text-base font-semibold"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>
        <nav className="mx-auto flex w-full max-w-7xl gap-1 overflow-x-auto px-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-current={tab === t.id ? "page" : undefined}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-base font-bold transition-colors ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="size-5" aria-hidden="true" />
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-8">
        {tab === "pacientes" && <TablaPacientes />}
        {tab === "menu" && <EditorMenu />}
        {tab === "medidas" && <Antropometria />}
        {tab === "timeline" && <Timeline />}
      </main>

      <a
        href={`https://wa.me/${activePatient.telefono}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-lg font-extrabold text-primary-foreground shadow-[var(--shadow-float)] transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}

function adherenciaSemanal(
  getLog: ReturnType<typeof useStore>["getLog"],
  patientId: string,
  plan: Record<string, { id: string }[]>,
) {
  const dias = Array.from({ length: 7 }, (_, i) => daysAgo(i));
  let cumplidos = 0;
  dias.forEach((d) => {
    const total = (plan[String(d.getDay())] ?? []).length || 1;
    const log = getLog(patientId, isoDate(d));
    if (log.completados.length / total >= 0.8) cumplidos++;
  });
  return Math.round((cumplidos / 7) * 100);
}

function TablaPacientes() {
  const { patients, getLog, setActivePatientId, activePatient } = useStore();

  return (
    <section>
      <h2 className="text-2xl font-extrabold">Gestión y control de pacientes</h2>
      <div className="card-float mt-4 overflow-x-auto">
        <table className="w-full min-w-[46rem] text-left">
          <thead>
            <tr className="border-b border-border text-sm uppercase tracking-wide text-muted-foreground">
              <th className="px-6 py-4">Paciente</th>
              <th className="px-6 py-4">Edad</th>
              <th className="px-6 py-4">Objetivo</th>
              <th className="px-6 py-4">Adherencia 7 días</th>
              <th className="px-6 py-4">Peso actual</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => {
              const adh = adherenciaSemanal(getLog, p.id, p.plan);
              const peso = p.medidas[p.medidas.length - 1]?.peso ?? 0;
              const activo = p.id === activePatient.id;
              return (
                <tr
                  key={p.id}
                  className={`border-b border-border last:border-0 ${activo ? "bg-primary-soft/40" : ""}`}
                >
                  <td className="px-6 py-4 font-bold">{p.nombre}</td>
                  <td className="px-6 py-4">{p.edad} años</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.objetivo}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-28 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${adh}%` }} />
                      </div>
                      <span className="font-bold">{adh}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{peso.toFixed(1)} kg</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setActivePatientId(p.id)}
                        className="rounded-xl bg-muted px-4 py-2 text-sm font-bold hover:bg-secondary"
                      >
                        {activo ? "Seleccionado" : "Seleccionar"}
                      </button>
                      <a
                        href={`https://wa.me/${p.telefono}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Escribir por WhatsApp a ${p.nombre}`}
                        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90"
                      >
                        <MessageCircle className="size-4" aria-hidden="true" />
                        WhatsApp
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EditorMenu() {
  const { activePatient, updateBlock, addBlock, removeBlock } = useStore();
  const [dia, setDia] = useState(String(new Date().getDay()));
  const bloques = [...(activePatient.plan[dia] ?? [])].sort(
    (a, b) => MEAL_ORDER.indexOf(a.tipo) - MEAL_ORDER.indexOf(b.tipo),
  );

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold">Menú semanal de {activePatient.nombre}</h2>
          <p className="text-muted-foreground">
            Los cambios se sincronizan al instante con la vista del paciente.
          </p>
        </div>
        <button
          type="button"
          onClick={() => addBlock(activePatient.id, dia, "Merienda")}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground hover:opacity-90"
        >
          <Plus className="size-5" aria-hidden="true" />
          Agregar tiempo de comida
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {WEEKDAYS.map((d, i) => (
          <button
            key={d}
            type="button"
            onClick={() => setDia(String(i))}
            aria-pressed={dia === String(i)}
            className={`rounded-xl px-4 py-2 font-bold transition-colors ${
              dia === String(i)
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-secondary"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {bloques.map((b) => (
          <article key={b.id} className="card-float p-6">
            <div className="flex items-center justify-between gap-3">
              <select
                aria-label="Tipo de comida"
                value={b.tipo}
                onChange={(e) =>
                  updateBlock(activePatient.id, dia, b.id, { tipo: e.target.value as MealType })
                }
                className="h-11 rounded-xl border border-border bg-card px-3 font-bold text-primary"
              >
                {MEAL_ORDER.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeBlock(activePatient.id, dia, b.id)}
                aria-label={`Eliminar ${b.titulo}`}
                className="flex size-10 items-center justify-center rounded-xl text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="size-5" aria-hidden="true" />
              </button>
            </div>

            <label className="mt-4 block text-sm font-bold text-muted-foreground">Título</label>
            <input
              value={b.titulo}
              onChange={(e) => updateBlock(activePatient.id, dia, b.id, { titulo: e.target.value })}
              className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base font-semibold focus:border-primary focus:outline-none"
            />

            <label className="mt-4 block text-sm font-bold text-muted-foreground">
              Indicaciones
            </label>
            <textarea
              value={b.descripcion}
              rows={3}
              onChange={(e) =>
                updateBlock(activePatient.id, dia, b.id, { descripcion: e.target.value })
              }
              className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none"
            />

            <label className="mt-4 block text-sm font-bold text-muted-foreground">
              Alternativas de intercambio (una por línea)
            </label>
            <textarea
              value={b.alternativas.join("\n")}
              rows={3}
              onChange={(e) =>
                updateBlock(activePatient.id, dia, b.id, {
                  alternativas: e.target.value.split("\n").filter((l) => l.trim() !== ""),
                })
              }
              className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none"
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function Antropometria() {
  const { activePatient, addMeasurement } = useStore();
  const [peso, setPeso] = useState("");
  const [cintura, setCintura] = useState("");
  const [cadera, setCadera] = useState("");

  const medidas = activePatient.medidas;
  const ultima = medidas[medidas.length - 1];
  const previa = medidas[medidas.length - 2];

  const delta = (a?: number, b?: number) =>
    a !== undefined && b !== undefined ? Number((a - b).toFixed(1)) : 0;

  const promedioCambio = useMemo(() => {
    if (medidas.length < 2) return 0;
    const total = (ultima?.peso ?? 0) - (medidas[0]?.peso ?? 0);
    return Number((total / (medidas.length - 1)).toFixed(2));
  }, [medidas, ultima]);

  const registrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!peso) return;
    addMeasurement(activePatient.id, {
      fecha: isoDate(new Date()),
      peso: Number(peso),
      cintura: Number(cintura || ultima?.cintura || 0),
      cadera: Number(cadera || ultima?.cadera || 0),
    });
    setPeso("");
    setCintura("");
    setCadera("");
  };

  const cards = [
    { label: "Peso actual", value: `${ultima?.peso?.toFixed(1) ?? "—"} kg`, delta: delta(ultima?.peso, previa?.peso), unidad: "kg" },
    { label: "Cintura", value: `${ultima?.cintura ?? "—"} cm`, delta: delta(ultima?.cintura, previa?.cintura), unidad: "cm" },
    { label: "Cadera", value: `${ultima?.cadera ?? "—"} cm`, delta: delta(ultima?.cadera, previa?.cadera), unidad: "cm" },
  ];

  return (
    <section>
      <h2 className="text-2xl font-extrabold">Seguimiento antropométrico</h2>
      <p className="text-muted-foreground">
        Cambio promedio por consulta: <strong>{promedioCambio} kg</strong>
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
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="peso" className="block text-sm font-bold text-muted-foreground">
                Peso (kg)
              </label>
              <input
                id="peso"
                type="number"
                step="0.1"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cintura" className="block text-sm font-bold text-muted-foreground">
                  Cintura (cm)
                </label>
                <input
                  id="cintura"
                  type="number"
                  value={cintura}
                  onChange={(e) => setCintura(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="cadera" className="block text-sm font-bold text-muted-foreground">
                  Cadera (cm)
                </label>
                <input
                  id="cadera"
                  type="number"
                  value={cadera}
                  onChange={(e) => setCadera(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground hover:opacity-90"
            >
              Guardar medición
            </button>
          </div>
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
    </section>
  );
}

function Timeline() {
  const { activePatient, getLog } = useStore();
  const dias = Array.from({ length: 10 }, (_, i) => daysAgo(i));

  return (
    <section>
      <h2 className="text-2xl font-extrabold">Timeline de avances</h2>
      <p className="text-muted-foreground">
        Cumplimiento, hidratación, escala de Bristol y notas enviadas por {activePatient.nombre}.
      </p>

      <ol className="mt-6 space-y-4">
        {dias.map((d) => {
          const fecha = isoDate(d);
          const log = getLog(activePatient.id, fecha);
          const total = (activePatient.plan[String(d.getDay())] ?? []).length || 1;
          const pct = Math.round((log.completados.length / total) * 100);
          return (
            <li key={fecha} className="card-float p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-lg font-extrabold capitalize">
                  {d.toLocaleDateString("es-MX", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-bold ${
                    pct >= 80
                      ? "bg-primary-soft text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {pct}% del plan
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-6 text-base">
                <span>
                  <strong>{log.agua}</strong> / {activePatient.metaAgua} vasos de agua
                </span>
                <span>
                  Bristol:{" "}
                  <strong>
                    {log.bristol ? `Tipo ${log.bristol} — ${BRISTOL[log.bristol - 1]?.label}` : "Sin registro"}
                  </strong>
                </span>
              </div>
              {log.nota && (
                <p className="mt-3 rounded-2xl bg-muted p-4 text-base italic">"{log.nota}"</p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
