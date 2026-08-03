import { useMemo, useState } from "react";
import { Activity, Plus, Trash2 } from "lucide-react";

import { isoDate, useStore, type Actividad } from "@/lib/store";

const field =
  "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none";
const label = "block text-sm font-bold text-muted-foreground";

export function ActividadFisica() {
  const { activePatient, addActividad, removeActividad } = useStore();
  const [form, setForm] = useState<Omit<Actividad, "id">>({
    fecha: isoDate(new Date()),
    tipo: "Caminata",
    minutos: 30,
    intensidad: "Baja",
    notas: "",
  });

  const resumen = useMemo(() => {
    const desde = new Date();
    desde.setDate(desde.getDate() - 7);
    const semana = activePatient.actividades.filter((a) => new Date(a.fecha) >= desde);
    const minutos = semana.reduce((s, a) => s + a.minutos, 0);
    return { sesiones: semana.length, minutos, meta: 150 };
  }, [activePatient.actividades]);

  const registrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tipo.trim()) return;
    addActividad(activePatient.id, form);
    setForm({ ...form, minutos: 30, notas: "" });
  };

  const pct = Math.min(100, Math.round((resumen.minutos / resumen.meta) * 100));

  return (
    <section>
      <h2 className="text-2xl font-extrabold">Actividad física de {activePatient.nombre}</h2>
      <p className="text-muted-foreground">
        Registro de sesiones y cumplimiento de la meta semanal recomendada (150 minutos).
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="card-float p-6">
          <p className="text-sm font-bold uppercase text-muted-foreground">Sesiones (7 días)</p>
          <p className="mt-2 text-3xl font-extrabold">{resumen.sesiones}</p>
        </div>
        <div className="card-float p-6">
          <p className="text-sm font-bold uppercase text-muted-foreground">Minutos activos</p>
          <p className="mt-2 text-3xl font-extrabold">{resumen.minutos} min</p>
        </div>
        <div className="card-float p-6">
          <p className="text-sm font-bold uppercase text-muted-foreground">Meta semanal</p>
          <p className="mt-2 text-3xl font-extrabold">{pct}%</p>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <form onSubmit={registrar} className="card-float p-6">
          <h3 className="text-xl font-extrabold">Nueva sesión</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className={label} htmlFor="act-fecha">
                Fecha
              </label>
              <input
                id="act-fecha"
                type="date"
                value={form.fecha}
                onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                className={field}
              />
            </div>
            <div>
              <label className={label} htmlFor="act-tipo">
                Tipo de actividad
              </label>
              <input
                id="act-tipo"
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                className={field}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="act-min">
                  Minutos
                </label>
                <input
                  id="act-min"
                  type="number"
                  min={1}
                  max={300}
                  value={form.minutos}
                  onChange={(e) => setForm({ ...form, minutos: Number(e.target.value || 0) })}
                  className={field}
                />
              </div>
              <div>
                <label className={label} htmlFor="act-int">
                  Intensidad
                </label>
                <select
                  id="act-int"
                  value={form.intensidad}
                  onChange={(e) =>
                    setForm({ ...form, intensidad: e.target.value as Actividad["intensidad"] })
                  }
                  className={field}
                >
                  <option>Baja</option>
                  <option>Media</option>
                  <option>Alta</option>
                </select>
              </div>
            </div>
            <div>
              <label className={label} htmlFor="act-notas">
                Notas
              </label>
              <textarea
                id="act-notas"
                rows={3}
                value={form.notas}
                onChange={(e) => setForm({ ...form, notas: e.target.value })}
                className={field}
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground hover:opacity-90"
            >
              <Plus className="size-5" aria-hidden="true" />
              Registrar actividad
            </button>
          </div>
        </form>

        <div className="card-float p-6">
          <h3 className="text-xl font-extrabold">Historial</h3>
          {activePatient.actividades.length === 0 ? (
            <p className="mt-4 text-muted-foreground">Aún no hay actividades registradas.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {activePatient.actividades.map((a) => (
                <li
                  key={a.id}
                  className="flex items-start justify-between gap-4 rounded-2xl bg-muted p-4"
                >
                  <div className="flex gap-3">
                    <Activity className="mt-1 size-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-lg font-bold">
                        {a.tipo} · {a.minutos} min
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {a.fecha} · Intensidad {a.intensidad}
                      </p>
                      {a.notas && <p className="mt-1 text-base">{a.notas}</p>}
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Eliminar actividad ${a.tipo}`}
                    onClick={() => removeActividad(activePatient.id, a.id)}
                    className="flex size-11 items-center justify-center rounded-xl text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
