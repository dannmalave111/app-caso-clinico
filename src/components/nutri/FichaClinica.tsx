import { useEffect, useState } from "react";
import { ExternalLink, FileDown, FileText, UploadCloud, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";

import { useStore, type Medicamento, type Patient } from "@/lib/store";
import { updatePatientClinico } from "@/lib/patients.functions";
import { buildAntecedentesHTML } from "@/lib/antecedentes";
import { DEFAULT_MACROS, ESTADOS, QUIEN_PREPARA } from "@/lib/constants";

const isUuid = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

const field =
  "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none";
const label = "block text-sm font-bold text-muted-foreground";

export type FichaFormState = {
  estadoCivil: string;
  ocupacion: string;
  diagnostico: string;
  quienPreparaComida: string;
  tieneHijos: string;
  detallesHijos: string;
  observacionesClinicas: string;
  antecedentesDriveUrl: string;
  menuDriveUrl: string;
  encuestaFrecuenciaUrl: string;
  requerimientoCalorico?: number | undefined;
  requerimientoHidricoMl?: number | undefined;
  medicacion: Medicamento[];
  formulas: string;
  excelUrl: string;
  macros: { ch: number; pr: number; lp: number };
};

export function FichaClinica() {
  const { activePatient, updatePatient } = useStore();
  const guardarRemoto = useServerFn(updatePatientClinico);
  const [form, setForm] = useState<FichaFormState>(() => snapshot(activePatient));
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    setForm(snapshot(activePatient));
  }, [activePatient.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const setMed = (id: string, patch: Partial<Medicamento>) =>
    setForm((f) => ({
      ...f,
      medicacion: f.medicacion.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }));

  const setHorariosNotificables = (id: string, index: number, val: string) => {
    setForm((f) => ({
      ...f,
      medicacion: f.medicacion.map((m) => {
        if (m.id !== id) return m;
        const current = [...(m.horariosNotificables ?? ["", "", ""])];
        while (current.length < 3) current.push("");
        current[index] = val;
        return { ...m, horariosNotificables: current };
      }),
    }));
  };

  const guardar = async () => {
    setGuardando(true);
    const metaAguaCalculada = form.requerimientoHidricoMl
      ? Math.max(1, Math.round(form.requerimientoHidricoMl / 250))
      : activePatient.metaAgua;

    const payload = {
      ...form,
      metaAgua: metaAguaCalculada,
    };

    updatePatient(activePatient.id, payload);

    try {
      if (isUuid(activePatient.id)) {
        await guardarRemoto({ data: { id: activePatient.id, ...payload } });
      }
      toast.success("Ficha clínica guardada correctamente");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudo guardar en el servidor");
    } finally {
      setGuardando(false);
    }
  };

  const descargarWord = () => {
    const html = buildAntecedentesHTML({ ...activePatient, ...form });
    const blob = new Blob(["\ufeff", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Antecedentes-${activePatient.nombre.replace(/\s+/g, "_")}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const descargarPdf = () => {
    const html = buildAntecedentesHTML({ ...activePatient, ...form });
    const w = window.open("", "_blank", "width=900,height=1000");
    if (!w) {
      toast.error("Permita las ventanas emergentes para generar el PDF");
      return;
    }
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 400);
  };

  const cargarArchivoAntecedentes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        if (text.startsWith("{") || text.startsWith("[")) {
          const parsed = JSON.parse(text);
          if (parsed.diagnostico || parsed.observacionesClinicas) {
            setForm((f) => ({ ...f, ...parsed }));
            toast.success("Antecedentes importados correctamente");
            return;
          }
        }
        setForm((f) => ({
          ...f,
          observacionesClinicas: (f.observacionesClinicas ? f.observacionesClinicas + "\n\n" : "") + `[Archivo: ${file.name}]\n` + text.slice(0, 1000),
        }));
        toast.success(`Archivo "${file.name}" cargado en observaciones`);
      } catch {
        toast.success(`Archivo "${file.name}" adjuntado localmente`);
      }
    };
    reader.readAsText(file);
  };

  const macrosTotal = form.macros.ch + form.macros.pr + form.macros.lp;
  const vasosCalculados = form.requerimientoHidricoMl
    ? Math.round(form.requerimientoHidricoMl / 250)
    : Math.round((activePatient.metaAgua || 8) * 250 / 250);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold">Ficha clínica de {activePatient.nombre}</h2>
          <p className="text-muted-foreground">
            Datos sociodemográficos, diagnóstico, medicación con recordatorios y requerimientos.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-muted px-4 py-3 font-bold hover:bg-secondary">
            <UploadCloud className="size-5" aria-hidden="true" />
            Cargar Antecedentes
            <input
              type="file"
              accept=".json,.txt,.doc,.docx,.pdf"
              className="hidden"
              onChange={cargarArchivoAntecedentes}
            />
          </label>
          <button
            type="button"
            onClick={descargarWord}
            className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 font-bold hover:bg-secondary"
          >
            <FileText className="size-5" aria-hidden="true" />
            Word
          </button>
          <button
            type="button"
            onClick={descargarPdf}
            className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 font-bold hover:bg-secondary"
          >
            <FileDown className="size-5" aria-hidden="true" />
            PDF
          </button>
          <button
            type="button"
            onClick={guardar}
            disabled={guardando}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            <Save className="size-5" aria-hidden="true" />
            {guardando ? "Guardando…" : "Guardar ficha"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Datos sociodemográficos y entorno */}
        <article className="card-float p-6 space-y-4">
          <h3 className="text-xl font-extrabold">Datos sociodemográficos y entorno</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="estadoCivil">
                Estado civil
              </label>
              <select
                id="estadoCivil"
                value={form.estadoCivil}
                onChange={(e) => setForm({ ...form, estadoCivil: e.target.value })}
                className={field}
              >
                <option value="">Sin especificar</option>
                {ESTADOS.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="ocupacion">
                Ocupación
              </label>
              <input
                id="ocupacion"
                value={form.ocupacion}
                onChange={(e) => setForm({ ...form, ocupacion: e.target.value })}
                className={field}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="quienPreparaComida">
                ¿Quién prepara la comida?
              </label>
              <select
                id="quienPreparaComida"
                value={form.quienPreparaComida}
                onChange={(e) => setForm({ ...form, quienPreparaComida: e.target.value })}
                className={field}
              >
                <option value="">Sin especificar</option>
                {QUIEN_PREPARA.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="tieneHijos">
                ¿Possence hijos?
              </label>
              <select
                id="tieneHijos"
                value={form.tieneHijos}
                onChange={(e) => setForm({ ...form, tieneHijos: e.target.value })}
                className={field}
              >
                <option value="">Sin especificar</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {form.tieneHijos === "Sí" && (
            <div>
              <label className={label} htmlFor="detallesHijos">
                Detalles sobre los hijos (cantidad, conviven)
              </label>
              <input
                id="detallesHijos"
                placeholder="Ej. 2 hijos, 1 vive en casa"
                value={form.detallesHijos}
                onChange={(e) => setForm({ ...form, detallesHijos: e.target.value })}
                className={field}
              />
            </div>
          )}

          <div>
            <label className={label} htmlFor="diagnostico">
              Diagnóstico médico
            </label>
            <textarea
              id="diagnostico"
              rows={3}
              value={form.diagnostico}
              onChange={(e) => setForm({ ...form, diagnostico: e.target.value })}
              className={field}
            />
          </div>

          <div>
            <label className={label} htmlFor="observacionesClinicas">
              Observaciones clínicas adicionales
            </label>
            <textarea
              id="observacionesClinicas"
              rows={3}
              placeholder="Preferencias, alergias, contexto de hábitos, ambiente familiar..."
              value={form.observacionesClinicas}
              onChange={(e) => setForm({ ...form, observacionesClinicas: e.target.value })}
              className={field}
            />
          </div>

          <div>
            <label className={label} htmlFor="antecedentesDriveUrl">
              Enlace a Antecedentes / Nube (Google Drive, OneDrive, etc.)
            </label>
            <input
              id="antecedentesDriveUrl"
              type="url"
              placeholder="https://drive.google.com/..."
              value={form.antecedentesDriveUrl}
              onChange={(e) => setForm({ ...form, antecedentesDriveUrl: e.target.value })}
              className={field}
            />
            {form.antecedentesDriveUrl && (
              <a
                href={form.antecedentesDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary underline"
              >
                <ExternalLink className="size-4" /> Ver antecedentes en Drive
              </a>
            )}
          </div>
        </article>

        {/* Medicación con Horarios Notificables */}
        <article className="card-float p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-extrabold">Medicación y Horarios Notificables</h3>
              <p className="text-sm text-muted-foreground">
                Configurar horario principal y hasta 3 horarios notificables de recordatorio.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  medicacion: [
                    ...form.medicacion,
                    {
                      id: `med-${Date.now()}`,
                      tipo: "",
                      gramaje: "",
                      horario: "08:00",
                      horariosNotificables: ["08:00", "", ""],
                    },
                  ],
                })
              }
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-bold text-primary-foreground hover:opacity-90"
            >
              <Plus className="size-5" aria-hidden="true" />
              Agregar
            </button>
          </div>

          {form.medicacion.length === 0 && (
            <p className="mt-4 text-muted-foreground">Sin medicación registrada.</p>
          )}

          <ul className="mt-4 space-y-4">
            {form.medicacion.map((m) => {
              const hNotif = m.horariosNotificables ?? [m.horario || "08:00", "", ""];
              return (
                <li key={m.id} className="rounded-2xl border border-border bg-muted/40 p-4 space-y-3">
                  <div className="grid grid-cols-[1.4fr_1fr_auto] items-end gap-2">
                    <div>
                      <label className={label}>Medicamento / Tipo</label>
                      <input
                        value={m.tipo}
                        placeholder="Nombre del medicamento"
                        onChange={(e) => setMed(m.id, { tipo: e.target.value })}
                        className={field}
                      />
                    </div>
                    <div>
                      <label className={label}>Gramaje / Dosis</label>
                      <input
                        value={m.gramaje}
                        placeholder="500 mg"
                        onChange={(e) => setMed(m.id, { gramaje: e.target.value })}
                        className={field}
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={`Eliminar ${m.tipo || "medicamento"}`}
                      onClick={() =>
                        setForm({ ...form, medicacion: form.medicacion.filter((x) => x.id !== m.id) })
                      }
                      className="mb-1 flex size-11 items-center justify-center rounded-xl text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="size-5" aria-hidden="true" />
                    </button>
                  </div>

                  <div>
                    <label className={label}>Horarios de notificación (hasta 3 opciones)</label>
                    <div className="mt-1 grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((idx) => (
                        <div key={idx}>
                          <span className="text-xs font-bold text-muted-foreground">Horario {idx + 1}</span>
                          <input
                            type="time"
                            value={hNotif[idx] ?? ""}
                            onChange={(e) => setHorariosNotificables(m.id, idx, e.target.value)}
                            className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm font-bold"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </article>

        {/* División de Macronutrientes y Requerimientos */}
        <article className="card-float p-6 lg:col-span-2 space-y-5">
          <h3 className="text-xl font-extrabold">Requerimientos, Macronutrientes y Enlaces</h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className={label} htmlFor="reqCalorico">
                Requerimiento Calórico (kcal/día)
              </label>
              <input
                id="reqCalorico"
                type="number"
                min={500}
                max={6000}
                step={50}
                placeholder="Ej. 1800"
                value={form.requerimientoCalorico ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    requerimientoCalorico: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className={field}
              />
            </div>

            <div>
              <label className={label} htmlFor="reqHidrico">
                Requerimiento Hídrico (mL/día)
              </label>
              <input
                id="reqHidrico"
                type="number"
                min={500}
                max={6000}
                step={100}
                placeholder="Ej. 2000"
                value={form.requerimientoHidricoMl ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    requerimientoHidricoMl: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className={field}
              />
              <p className="mt-1 text-xs font-bold text-primary">
                Equivale a {vasosCalculados} vasos de 250 mL para el paciente
              </p>
            </div>

            <div>
              <label className={label} htmlFor="encuestaFrecuenciaUrl">
                Link a Encuesta de Frecuencia de Consumo
              </label>
              <input
                id="encuestaFrecuenciaUrl"
                type="url"
                placeholder="https://forms.google.com/..."
                value={form.encuestaFrecuenciaUrl}
                onChange={(e) => setForm({ ...form, encuestaFrecuenciaUrl: e.target.value })}
                className={field}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 pt-2">
            {(
              [
                ["ch", "Carbohidratos (CH) %"],
                ["pr", "Proteínas (Pr) %"],
                ["lp", "Lípidos (Lp) %"],
              ] as const
            ).map(([k, texto]) => (
              <div key={k}>
                <label className={label} htmlFor={`macro-${k}`}>
                  {texto}
                </label>
                <input
                  id={`macro-${k}`}
                  type="number"
                  min={0}
                  max={100}
                  value={form.macros[k]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      macros: { ...form.macros, [k]: Number(e.target.value || 0) },
                    })
                  }
                  className={field}
                />
              </div>
            ))}
          </div>

          <p
            className={`text-base font-bold ${
              macrosTotal === 100 ? "text-primary" : "text-destructive"
            }`}
          >
            Suma de macronutrientes: {macrosTotal}% {macrosTotal === 100 ? "(correcta)" : "(debe sumar 100%)"}
          </p>

          <div className="grid gap-4 lg:grid-cols-2 pt-2">
            <div>
              <label className={label} htmlFor="formulas">
                Fórmulas de cálculo utilizadas
              </label>
              <textarea
                id="formulas"
                rows={3}
                value={form.formulas}
                onChange={(e) => setForm({ ...form, formulas: e.target.value })}
                className={field}
              />
            </div>

            <div>
              <label className={label} htmlFor="menuDriveUrl">
                Enlace a Menú Semanal en Documento / Google Drive
              </label>
              <input
                id="menuDriveUrl"
                type="url"
                placeholder="https://docs.google.com/document/d/..."
                value={form.menuDriveUrl}
                onChange={(e) => setForm({ ...form, menuDriveUrl: e.target.value })}
                className={field}
              />
              {form.menuDriveUrl && (
                <a
                  href={form.menuDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary underline"
                >
                  <ExternalLink className="size-4" /> Abrir menú en Google Drive
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function snapshot(p: Patient): FichaFormState {
  const macrosObj = p.macros ?? DEFAULT_MACROS;
  const rawMacros = macrosObj as unknown as Record<string, unknown>;

  return {
    estadoCivil: p.estadoCivil ?? "",
    ocupacion: p.ocupacion ?? "",
    diagnostico: p.diagnostico ?? "",
    quienPreparaComida: p.quienPreparaComida ?? (rawMacros["quienPreparaComida"] as string) ?? "",
    tieneHijos: p.tieneHijos ?? (rawMacros["tieneHijos"] as string) ?? "",
    detallesHijos: p.detallesHijos ?? (rawMacros["detallesHijos"] as string) ?? "",
    observacionesClinicas: p.observacionesClinicas ?? (rawMacros["observacionesClinicas"] as string) ?? "",
    antecedentesDriveUrl: p.antecedentesDriveUrl ?? (rawMacros["antecedentesDriveUrl"] as string) ?? "",
    menuDriveUrl: p.menuDriveUrl ?? (rawMacros["menuDriveUrl"] as string) ?? "",
    encuestaFrecuenciaUrl: p.encuestaFrecuenciaUrl ?? (rawMacros["encuestaFrecuenciaUrl"] as string) ?? "",
    requerimientoCalorico: p.requerimientoCalorico ?? (rawMacros["requerimientoCalorico"] as number | undefined) ?? undefined,
    requerimientoHidricoMl: p.requerimientoHidricoMl ?? (rawMacros["requerimientoHidricoMl"] as number | undefined) ?? (p.metaAgua ? p.metaAgua * 250 : undefined),
    medicacion: p.medicacion.map((m) => ({
      ...m,
      horariosNotificables: m.horariosNotificables ?? [m.horario || "08:00", "", ""],
    })),
    formulas: p.formulas ?? "",
    excelUrl: p.excelUrl ?? "",
    macros: {
      ch: macrosObj.ch ?? DEFAULT_MACROS.ch,
      pr: macrosObj.pr ?? DEFAULT_MACROS.pr,
      lp: macrosObj.lp ?? DEFAULT_MACROS.lp,
    },
  };
}
