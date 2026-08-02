import { useEffect, useState } from "react";
import { Copy, KeyRound, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { deletePatient, registerPatient } from "@/lib/patients.functions";
import { registroSchema } from "@/lib/patients.shared";
import { useStore } from "@/lib/store";

type Fila = {
  id: string;
  nombre: string;
  edad: number;
  telefono: string;
  objetivo: string;
  meta_agua: number;
  codigo: string;
};

const vacio = { nombre: "", edad: "70", telefono: "", objetivo: "", metaAgua: "8" };

export function RegistroPacientes() {
  const { ensurePatient } = useStore();
  const [filas, setFilas] = useState<Fila[]>([]);
  const [form, setForm] = useState(vacio);
  const [cargando, setCargando] = useState(false);

  const cargar = async () => {
    const { data } = await supabase
      .from("patients")
      .select("id, nombre, edad, telefono, objetivo, meta_agua, codigo")
      .order("created_at", { ascending: false });
    setFilas((data as Fila[]) ?? []);
  };

  useEffect(() => {
    void cargar();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = registroSchema.safeParse({
      nombre: form.nombre,
      edad: Number(form.edad),
      telefono: form.telefono,
      objetivo: form.objetivo,
      metaAgua: Number(form.metaAgua),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revise los datos");
      return;
    }
    setCargando(true);
    try {
      const res = await registerPatient({ data: parsed.data });
      ensurePatient(
        {
          id: res.patient.id,
          nombre: parsed.data.nombre,
          edad: parsed.data.edad,
          telefono: parsed.data.telefono,
          objetivo: parsed.data.objetivo,
          metaAgua: parsed.data.metaAgua,
        },
        false,
      );
      setForm(vacio);
      await cargar();
      toast.success(`Paciente registrado. Código de acceso: ${res.codigo}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo registrar");
    } finally {
      setCargando(false);
    }
  };

  const onDelete = async (id: string, nombre: string) => {
    if (!window.confirm(`¿Eliminar a ${nombre} y su acceso?`)) return;
    try {
      await deletePatient({ data: { id } });
      await cargar();
      toast.success("Paciente eliminado");
    } catch {
      toast.error("No se pudo eliminar");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
      <form onSubmit={onSubmit} className="card-float h-fit p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary-soft">
            <UserPlus className="size-6 text-primary" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-extrabold">Registrar paciente</h2>
        </div>

        <div className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="r-nombre" className="font-bold">Nombre completo</Label>
            <Input
              id="r-nombre"
              required
              maxLength={80}
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="r-edad" className="font-bold">Edad</Label>
              <Input
                id="r-edad"
                type="number"
                min={1}
                max={120}
                value={form.edad}
                onChange={(e) => setForm({ ...form, edad: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="r-agua" className="font-bold">Meta de vasos</Label>
              <Input
                id="r-agua"
                type="number"
                min={1}
                max={20}
                value={form.metaAgua}
                onChange={(e) => setForm({ ...form, metaAgua: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-tel" className="font-bold">WhatsApp (con código país)</Label>
            <Input
              id="r-tel"
              maxLength={20}
              placeholder="521555000111"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-obj" className="font-bold">Objetivo clínico</Label>
            <Input
              id="r-obj"
              maxLength={200}
              placeholder="Control glucémico"
              value={form.objetivo}
              onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>
        </div>

        <Button type="submit" disabled={cargando} className="mt-6 h-12 w-full rounded-xl text-base font-bold">
          Crear paciente y generar código
        </Button>
      </form>

      <div className="card-float overflow-hidden p-0">
        <div className="flex items-center gap-3 border-b border-border px-6 py-4">
          <KeyRound className="size-5 text-primary" aria-hidden="true" />
          <h2 className="text-xl font-extrabold">Pacientes con acceso ({filas.length})</h2>
        </div>
        {filas.length === 0 ? (
          <p className="px-6 py-10 text-center text-lg text-muted-foreground">
            Aún no hay pacientes registrados en el sistema.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {filas.map((f) => (
              <li key={f.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-bold">{f.nombre}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {f.edad} años · {f.objetivo || "Sin objetivo"} · {f.meta_agua} vasos
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard.writeText(f.codigo);
                    toast.success("Código copiado");
                  }}
                  className="flex items-center gap-2 rounded-xl bg-primary-soft px-4 py-2 text-xl font-extrabold tracking-widest text-primary"
                >
                  {f.codigo}
                  <Copy className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={`Eliminar a ${f.nombre}`}
                  onClick={() => void onDelete(f.id, f.nombre)}
                  className="flex size-11 items-center justify-center rounded-xl bg-muted text-destructive hover:bg-secondary"
                >
                  <Trash2 className="size-5" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
