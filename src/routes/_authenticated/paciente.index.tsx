import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  ChevronDown,
  Droplets,
  Minus,
  Plus,
  NotebookPen,
} from "lucide-react";
import { PatientShell } from "@/components/PatientShell";
import { EscalaBristol, EscalaOrina } from "@/components/paciente/EscalasVisuales";
import { Recordatorios } from "@/components/paciente/Recordatorios";
import { MEAL_ORDER, isoDate, useStore } from "@/lib/store";


export const Route = createFileRoute("/_authenticated/paciente/")({
  head: () => ({
    meta: [
      { title: "Mi día — NutriCuida" },
      {
        name: "description",
        content:
          "Vea su plan de comidas de hoy, registre sus vasos de agua y su registro diario de digestión.",
      },
      { property: "og:title", content: "Mi día — NutriCuida" },
      {
        property: "og:description",
        content: "Plan de comidas del día, hidratación y notas para el nutricionista.",
      },
    ],
  }),
  component: PacienteHoy,
});

function PacienteHoy() {
  const { activePatient, getLog, toggleMeal, updateLog } = useStore();
  const hoy = new Date();
  const fecha = isoDate(hoy);
  const log = getLog(activePatient.id, fecha);
  const bloques = [...(activePatient.plan[String(hoy.getDay())] ?? [])].sort(
    (a, b) => MEAL_ORDER.indexOf(a.tipo) - MEAL_ORDER.indexOf(b.tipo),
  );
  const [abierto, setAbierto] = useState<string | null>(null);

  const fechaLarga = hoy.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const hora = hoy.getHours();
  const saludo = hora < 12 ? "Buenos días" : hora < 19 ? "Buenas tardes" : "Buenas noches";
  const nombreCorto = activePatient.nombre.split(" ").slice(0, 2).join(" ");

  const metaAguaVasos = activePatient.requerimientoHidricoMl
    ? Math.max(1, Math.round(activePatient.requerimientoHidricoMl / 250))
    : activePatient.metaAgua || 8;

  const totalHidricoMl = activePatient.requerimientoHidricoMl ?? metaAguaVasos * 250;

  const setAgua = (n: number) =>
    updateLog(activePatient.id, fecha, { agua: Math.max(0, Math.min(30, n)) });

  return (
    <PatientShell>
      <header className="mb-6">
        <p className="text-lg font-semibold capitalize text-muted-foreground">{fechaLarga}</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
          {saludo}, {nombreCorto}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Hoy tiene {bloques.length} tiempos de comida. Vamos paso a paso.
        </p>

        {/* Acceso a Menú en Drive o Encuesta de Frecuencia si existen */}
        {(activePatient.menuDriveUrl || activePatient.encuestaFrecuenciaUrl) && (
          <div className="mt-4 flex flex-wrap gap-3">
            {activePatient.menuDriveUrl && (
              <a
                href={activePatient.menuDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-lg font-bold text-primary-foreground hover:opacity-90"
              >
                Ver Menú Semanal en Documento / Drive
              </a>
            )}
            {activePatient.encuestaFrecuenciaUrl && (
              <a
                href={activePatient.encuestaFrecuenciaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target inline-flex items-center gap-2 rounded-2xl bg-muted px-5 py-3 text-lg font-bold text-foreground hover:bg-secondary"
              >
                Responder Encuesta de Frecuencia de Consumo
              </a>
            )}
          </div>
        )}
      </header>

      <Recordatorios fecha={fecha} />

      {/* Comidas */}
      <section aria-labelledby="titulo-comidas" className="space-y-4">
        <h2 id="titulo-comidas" className="text-2xl font-extrabold">
          Mi plan de comidas
        </h2>

        {bloques.map((b) => {
          const hecho = log.completados.includes(b.id);
          const open = abierto === b.id;
          return (
            <article key={b.id} className="card-float overflow-hidden p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-base font-bold uppercase tracking-wide text-primary">
                    {b.tipo}
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold">{b.titulo}</h3>
                </div>
                {hecho && (
                  <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1 text-base font-bold text-accent-foreground">
                    Listo
                  </span>
                )}
              </div>
              <p className="mt-3 text-xl leading-relaxed text-foreground">{b.descripcion}</p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => toggleMeal(activePatient.id, fecha, b.id)}
                  aria-pressed={hecho}
                  className={`tap-target flex flex-1 items-center justify-center gap-3 rounded-2xl px-6 text-xl font-extrabold transition-colors ${
                    hecho
                      ? "bg-primary text-primary-foreground"
                      : "border-2 border-primary bg-card text-primary hover:bg-primary-soft"
                  }`}
                >
                  <Check className="size-7" aria-hidden="true" />
                  {hecho ? "Completado" : "Marcar completado"}
                </button>

                {b.alternativas.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setAbierto(open ? null : b.id)}
                    aria-expanded={open}
                    className="tap-target flex items-center justify-center gap-2 rounded-2xl bg-muted px-6 text-xl font-bold text-foreground hover:bg-secondary"
                  >
                    Ver alternativa
                    <ChevronDown
                      className={`size-6 transition-transform ${open ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>

              {open && (
                <ul className="mt-4 space-y-3 rounded-2xl bg-muted p-4">
                  {b.alternativas.map((alt) => (
                    <li key={alt} className="flex gap-3 text-xl leading-relaxed">
                      <span aria-hidden="true" className="font-bold text-primary">
                        •
                      </span>
                      {alt}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </section>

      {/* Agua */}
      <section aria-labelledby="titulo-agua" className="mt-8">
        <h2 id="titulo-agua" className="text-2xl font-extrabold">
          Mi agua de hoy
        </h2>
        <div className="card-float mt-4 p-6">
          <p className="text-xl text-muted-foreground">
            Requerimiento hídrico: <strong>{totalHidricoMl} mL</strong> ({metaAguaVasos} vasos de 250 mL al día)
          </p>
          <p className="mt-2 text-5xl font-extrabold text-water">
            {log.agua}
            <span className="text-2xl font-bold text-muted-foreground">
              {" "}
              / {metaAguaVasos} vasos ({log.agua * 250} mL)
            </span>
          </p>

          <div
            className="mt-5 flex flex-wrap gap-3"
            role="img"
            aria-label={`${log.agua} de ${metaAguaVasos} vasos tomados`}
          >
            {Array.from({ length: metaAguaVasos }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setAgua(i + 1)}
                className={`flex size-12 items-center justify-center rounded-2xl border-2 transition-colors ${
                  i < log.agua
                    ? "border-water bg-water-soft text-water"
                    : "border-border bg-muted text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Droplets className="size-6" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={() => setAgua(log.agua - 1)}
              aria-label="Quitar un vaso de agua"
              className="tap-target flex flex-1 items-center justify-center rounded-2xl bg-muted text-foreground hover:bg-secondary"
            >
              <Minus className="size-8" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setAgua(log.agua + 1)}
              aria-label="Agregar un vaso de agua"
              className="tap-target flex flex-[2] items-center justify-center gap-3 rounded-2xl bg-water text-xl font-extrabold text-primary-foreground hover:opacity-90"
            >
              <Plus className="size-8" aria-hidden="true" />
              Tomé un vaso (250 mL)
            </button>
          </div>
        </div>
      </section>

      {/* Registro diario */}
      <section aria-labelledby="titulo-registro" className="mt-8">
        <h2 id="titulo-registro" className="text-2xl font-extrabold">
          Mi registro del día
        </h2>
        <div className="card-float mt-4 space-y-6 p-6">
          <EscalaBristol fecha={fecha} />
          <EscalaOrina fecha={fecha} />


          <label htmlFor="nota" className="mt-6 block text-xl font-bold">
            <span className="inline-flex items-center gap-2">
              <NotebookPen className="size-6 text-primary" aria-hidden="true" />
              Notas para mi nutricionista
            </span>
          </label>
          <textarea
            id="nota"
            value={log.nota}
            onChange={(e) => updateLog(activePatient.id, fecha, { nota: e.target.value })}
            rows={4}
            placeholder="Escriba aquí cómo se sintió hoy..."
            className="mt-3 w-full rounded-2xl border-2 border-border bg-card p-4 text-xl leading-relaxed placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <p className="mt-2 text-base text-muted-foreground">
            Puede usar el micrófono del teclado de su teléfono para dictar el texto.
          </p>
        </div>
      </section>
    </PatientShell>
  );
}
