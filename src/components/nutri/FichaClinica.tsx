import { useEffect, useState } from "react";
import { FileDown, FileText, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";

import { useStore, type Medicamento, type Patient } from "@/lib/store";
import { updatePatientClinico } from "@/lib/patients.functions";
import { buildAntecedentesHTML } from "@/lib/antecedentes";

const ESTADOS = ["Soltero(a)", "Casado(a)", "Unión libre", "Divorciado(a)", "Viudo(a)"];

const isUuid = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

const field =
  "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none";
const label = "block text-sm font-bold text-muted-foreground";

export function FichaClinica() {
  const { activePatient, updatePatient } = useStore();
  const guardarRemoto = useServerFn(updatePatientClinico);
  const [form, setForm] = useState(() => snapshot(activePatient));
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    setForm(snapshot(activePatient));
  }, [activePatient.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const setMed = (id: string, patch: Partial<Medicamento>) =>
    setForm((f) => ({
      ...f,
      medicacion: f.medicacion.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }));

  const guardar = async () => {
    setGuardando(true);
    updatePatient(activePatient.id, form);
    try {
      if (isUuid(activePatient.id)) {
        await guardarRemoto({ data: { id: activePatient.id, ...form } });
      }
      toast.success("Ficha clínica guardada");
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

  const macrosTotal = form.macros.ch + form.macros.pr + form.macros.lp;

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold">Ficha clínica de {activePatient.nombre}</h2>
          <p className="text-muted-foreground">
            Datos sociodemográficos, diagnóstico y medicación editables en cualquier momento.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={descargarWord}
            className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 font-bold hover:bg-secondary"
          >
            <FileText className="size-5" aria-hidden="true" />
            Antecedentes en Word
          </button>
          <button
            type="button"
            onClick={descargarPdf}
            className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 font-bold hover:bg-secondary"
          >
            <FileDown className="size-5" aria-hidden="true" />
            Antecedentes en PDF
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

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="card-float p-6">
          <h3 className="text-xl font-extrabold">Datos sociodemográficos</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
          <div className="mt-4">
            <label className={label} htmlFor="diagnostico">
              Diagnóstico médico
            </label>
            <textarea
              id="diagnostico"
              rows={4}
              value={form.diagnostico}
              onChange={(e) => setForm({ ...form, diagnostico: e.target.value })}
              className={field}
            />
          </div>
        </article>

        <article className="card-float p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-extrabold">Medicación</h3>
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  medicacion: [
                    ...form.medicacion,
                    { id: `med-${Date.now()}`, tipo: "", gramaje: "", horario: "08:00" },
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

          <ul className="mt-4 space-y-3">
            {form.medicacion.map((m) => (
              <li key={m.id} className="grid grid-cols-[1.4fr_1fr_auto_auto] items-end gap-2">
                <div>
                  <label className={label}>Tipo</label>
                  <input
                    value={m.tipo}
                    placeholder="Nombre del medicamento"
                    onChange={(e) => setMed(m.id, { tipo: e.target.value })}
                    className={field}
                  />
                </div>
                <div>
                  <label className={label}>Gramaje</label>
                  <input
                    value={m.gramaje}
                    placeholder="500 mg"
                    onChange={(e) => setMed(m.id, { gramaje: e.target.value })}
                    className={field}
                  />
                </div>
                <div>
                  <label className={label}>Hora</label>
                  <input
                    type="time"
                    value={m.horario}
                    onChange={(e) => setMed(m.id, { horario: e.target.value })}
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
              </li>
            ))}
          </ul>
        </article>

        <article className="card-float p-6 lg:col-span-2">
          <h3 className="text-xl font-extrabold">División de macronutrientes y fórmulas</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
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
            className={`mt-2 text-base font-bold ${
              macrosTotal === 100 ? "text-primary" : "text-destructive"
            }`}
          >
            Suma: {macrosTotal}% {macrosTotal === 100 ? "(correcta)" : "(debe sumar 100%)"}
          </p>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div>
              <label className={label} htmlFor="formulas">
                Fórmulas de cálculo utilizadas
              </label>
              <textarea
                id="formulas"
                rows={4}
                value={form.formulas}
                onChange={(e) => setForm({ ...form, formulas: e.target.value })}
                className={field}
              />
            </div>
            <div>
              <label className={label} htmlFor="excelUrl">
                Enlace a la hoja de cálculo externa (Excel / Sheets)
              </label>
              <input
                id="excelUrl"
                type="url"
                placeholder="https://…"
                value={form.excelUrl}
                onChange={(e) => setForm({ ...form, excelUrl: e.target.value })}
                className={field}
              />
              {form.excelUrl && (
                <a
                  href={form.excelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-muted px-4 py-3 font-bold hover:bg-secondary"
                >
                  Abrir hoja de cálculo
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function snapshot(p: Patient) {
  return {
    estadoCivil: p.estadoCivil,
    ocupacion: p.ocupacion,
    diagnostico: p.diagnostico,
    medicacion: p.medicacion.map((m) => ({ ...m })),
    formulas: p.formulas,
    excelUrl: p.excelUrl,
    macros: { ...p.macros },
  };
}
