import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  loadMyPatients,
  loadMyPatientRecord,
  syncPatientData,
} from "@/lib/patients.functions";
import {
  DEFAULT_MACROS,
  STORAGE_KEY,
  SYNC_DEBOUNCE_MS,
} from "@/lib/constants";


export type MealType = "Desayuno" | "Media mañana" | "Almuerzo" | "Merienda" | "Cena";

export type MealBlock = {
  id: string;
  tipo: MealType;
  titulo: string;
  descripcion: string;
  alternativas: string[];
};

export type DayPlan = Record<string, MealBlock[]>; // weekday index "0".."6"

export type DailyLog = {
  completados: string[];
  agua: number;
  bristol: number | null;
  orina: number | null;
  medicacionTomada: string[];
  nota: string;
};

export type Measurement = {
  fecha: string;
  peso: number;
  cintura: number;
  cadera: number;
  bicipital: number;
  abdominal: number;
  musloMedio: number;
  pantorrilla: number;
  pliegueTricipital: number;
  pliegueSubescapular: number;
};

export type Medicamento = {
  id: string;
  tipo: string;
  gramaje: string;
  horario: string;
  horariosNotificables?: string[];
};

export type Actividad = {
  id: string;
  fecha: string;
  tipo: string;
  minutos: number;
  intensidad: "Baja" | "Media" | "Alta";
  notas: string;
};

export type Macros = { ch: number; pr: number; lp: number };

export type Patient = {
  id: string;
  nombre: string;
  edad: number;
  telefono: string;
  objetivo: string;
  metaAgua: number;
  requerimientoCalorico?: number | undefined;
  requerimientoHidricoMl?: number | undefined;
  encuestaFrecuenciaUrl?: string | undefined;
  quienPreparaComida?: string | undefined;
  tieneHijos?: string | undefined;
  detallesHijos?: string | undefined;
  observacionesClinicas?: string | undefined;
  antecedentesDriveUrl?: string | undefined;
  menuDriveUrl?: string | undefined;
  estadoCivil: string;
  ocupacion: string;
  diagnostico: string;
  medicacion: Medicamento[];
  formulas: string;
  excelUrl: string;
  macros: Macros;
  actividades: Actividad[];
  plan: DayPlan;
  logs: Record<string, DailyLog>;
  medidas: Measurement[];
};


// Re-exported from constants
export { MEAL_ORDER, WEEKDAYS, BRISTOL, ORINA, MEAL_TIMES } from "@/lib/constants";

export function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export function emptyLog(): DailyLog {
  return { completados: [], agua: 0, bristol: null, orina: null, medicacionTomada: [], nota: "" };
}

export function emptyMeasurement(fecha: string): Measurement {
  return {
    fecha,
    peso: 0,
    cintura: 0,
    cadera: 0,
    bicipital: 0,
    abdominal: 0,
    musloMedio: 0,
    pantorrilla: 0,
    pliegueTricipital: 0,
    pliegueSubescapular: 0,
  };
}


let seq = 0;
const uid = (p: string) => `${p}-${Date.now().toString(36)}-${(seq++).toString(36)}`;

export type PatientSeed = {
  id: string;
  nombre: string;
  edad: number;
  telefono: string;
  objetivo: string;
  metaAgua?: number;
} & Partial<
  Pick<
    Patient,
    "estadoCivil" | "ocupacion" | "diagnostico" | "medicacion" | "formulas" | "excelUrl" | "macros"
  >
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbRowToPatient(row: Record<string, any>): Patient {
  const rawMacros = (row["macros"] ?? {}) as Record<string, unknown>;
  return normalizePatient({
    id: row["id"] as string,
    nombre: row["nombre"] as string,
    edad: row["edad"] as number,
    telefono: row["telefono"] as string ?? "",
    objetivo: row["objetivo"] as string ?? "",
    metaAgua: row["meta_agua"] as number ?? 8,
    estadoCivil: row["estado_civil"] as string ?? "",
    ocupacion: row["ocupacion"] as string ?? "",
    diagnostico: row["diagnostico"] as string ?? "",
    medicacion: (row["medicacion"] ?? []) as Medicamento[],
    formulas: row["formulas"] as string ?? "",
    excelUrl: row["excel_url"] as string ?? "",
    macros: {
      ch: (rawMacros["ch"] as number) ?? DEFAULT_MACROS.ch,
      pr: (rawMacros["pr"] as number) ?? DEFAULT_MACROS.pr,
      lp: (rawMacros["lp"] as number) ?? DEFAULT_MACROS.lp,
    },
    requerimientoCalorico: rawMacros["requerimientoCalorico"] as number | undefined,
    requerimientoHidricoMl: rawMacros["requerimientoHidricoMl"] as number | undefined,
    encuestaFrecuenciaUrl: rawMacros["encuestaFrecuenciaUrl"] as string | undefined,
    quienPreparaComida: rawMacros["quienPreparaComida"] as string | undefined,
    tieneHijos: rawMacros["tieneHijos"] as string | undefined,
    detallesHijos: rawMacros["detallesHijos"] as string | undefined,
    observacionesClinicas: rawMacros["observacionesClinicas"] as string | undefined,
    antecedentesDriveUrl: rawMacros["antecedentesDriveUrl"] as string | undefined,
    menuDriveUrl: rawMacros["menuDriveUrl"] as string | undefined,
    plan: (row["plan_semanal"] ?? {}) as DayPlan,
    medidas: (row["medidas"] ?? []) as Measurement[],
    logs: (row["logs"] ?? {}) as Record<string, DailyLog>,
    actividades: (row["actividades"] ?? []) as Actividad[],
  });
}

function patientFromSeed(info: PatientSeed): Patient {
  return {
    ...info,
    metaAgua: info.metaAgua ?? 8,
    estadoCivil: info.estadoCivil ?? "",
    ocupacion: info.ocupacion ?? "",
    diagnostico: info.diagnostico ?? "",
    medicacion: info.medicacion ?? [],
    formulas: info.formulas ?? "",
    excelUrl: info.excelUrl ?? "",
    macros: info.macros ?? DEFAULT_MACROS,
    actividades: [],
    plan: {},
    logs: {},
    medidas: [],
  };
}

/** Rellena campos nuevos en datos guardados con versiones anteriores. */
function normalizePatient(p: Patient): Patient {
  const logs: Record<string, DailyLog> = {};
  Object.entries(p.logs ?? {}).forEach(([k, v]) => {
    logs[k] = { ...emptyLog(), ...v };
  });
  return {
    ...p,
    estadoCivil: p.estadoCivil ?? "",
    ocupacion: p.ocupacion ?? "",
    diagnostico: p.diagnostico ?? "",
    medicacion: p.medicacion ?? [],
    formulas: p.formulas ?? "",
    excelUrl: p.excelUrl ?? "",
    macros: p.macros ?? DEFAULT_MACROS,
    actividades: p.actividades ?? [],
    medidas: (p.medidas ?? []).map((m) => ({ ...emptyMeasurement(m.fecha), ...m })),
    logs,
  };
}


type Store = {
  patients: Patient[];
  activePatientId: string;
  setActivePatientId: (id: string) => void;
  activePatient: Patient;
  getLog: (patientId: string, date: string) => DailyLog;
  updateLog: (patientId: string, date: string, patch: Partial<DailyLog>) => void;
  toggleMeal: (patientId: string, date: string, blockId: string) => void;
  updateBlock: (patientId: string, day: string, blockId: string, patch: Partial<MealBlock>) => void;
  addBlock: (patientId: string, day: string, tipo: MealType) => void;
  removeBlock: (patientId: string, day: string, blockId: string) => void;
  addMeasurement: (patientId: string, m: Measurement) => void;
  removeMeasurement: (patientId: string, fecha: string) => void;
  updateMeasurementDate: (patientId: string, oldFecha: string, newFecha: string) => void;
  setMetaAgua: (patientId: string, meta: number) => void;
  updatePatient: (patientId: string, patch: Partial<Patient>) => void;
  addActividad: (patientId: string, a: Omit<Actividad, "id">) => void;
  removeActividad: (patientId: string, id: string) => void;
  ensurePatient: (info: PatientSeed, activar?: boolean) => void;

};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(() => []);
  const [activePatientId, setActivePatientId] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadPatientsFn = useServerFn(loadMyPatients);
  const loadPatientRecordFn = useServerFn(loadMyPatientRecord);
  const syncPatientDataFn = useServerFn(syncPatientData);

  // Debounced sync to Supabase (1.5s after last change)
  const scheduleSyncToSupabase = useCallback(
    (patient: Patient) => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
      syncTimer.current = setTimeout(() => {
        syncPatientDataFn({
          data: {
            id: patient.id,
            plan_semanal: patient.plan as Record<string, unknown>,
            medidas: patient.medidas,
            logs: patient.logs as Record<string, unknown>,
            actividades: patient.actividades,
          },
        }).catch((err: unknown) => console.warn("[Store] sync failed:", err));
      }, SYNC_DEBOUNCE_MS);
    },
    [syncPatientDataFn],
  );

  // Load localStorage first, then try Supabase
  useEffect(() => {
    let cancelled = false;
    const loadLocal = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Patient[];
          if (Array.isArray(parsed) && parsed.length) {
            setPatients(parsed.map(normalizePatient));
            setActivePatientId(parsed[0]!.id);
          }
        }
      } catch { /* ignore */ }
    };

    loadLocal();

    // Then try to refresh from Supabase (nutritionist flow)
    loadPatientsFn({})
      .then((rows) => {
        if (cancelled || !rows || rows.length === 0) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dbPatients = (rows as Record<string, any>[]).map(dbRowToPatient);
        setPatients(dbPatients);
        setActivePatientId(dbPatients[0]!.id);
      })
      .catch(() => {
        // Not a nutritionist or not authenticated — try patient record
        loadPatientRecordFn({})
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((row: Record<string, any> | null) => {
            if (cancelled || !row) return;
            const p = dbRowToPatient(row);
            setPatients([p]);
            setActivePatientId(p.id);
          })
          .catch(() => { /* use localStorage fallback */ });
      })
      .finally(() => {
        if (!cancelled) setHydrated(true);
      });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist to localStorage whenever patients change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    } catch { /* ignore */ }
  }, [patients, hydrated]);

  const update = useCallback(
    (patientId: string, fn: (p: Patient) => Patient) => {
      setPatients((prev) => {
        const next = prev.map((p) => (p.id === patientId ? fn(p) : p));
        const updated = next.find((p) => p.id === patientId);
        if (updated) scheduleSyncToSupabase(updated);
        return next;
      });
    },
    [scheduleSyncToSupabase],
  );

  const value = useMemo<Store>(() => {
    const activePatient = (patients.find((p) => p.id === activePatientId) ?? patients[0]) as Patient;
    return {
      patients,
      activePatientId: activePatient?.id ?? "",
      setActivePatientId,
      activePatient,
      getLog: (patientId, date) =>
        patients.find((p) => p.id === patientId)?.logs[date] ?? emptyLog(),
      updateLog: (patientId, date, patch) =>
        update(patientId, (p) => ({
          ...p,
          logs: { ...p.logs, [date]: { ...(p.logs[date] ?? emptyLog()), ...patch } },
        })),
      toggleMeal: (patientId, date, blockId) =>
        update(patientId, (p) => {
          const log = p.logs[date] ?? emptyLog();
          const completados = log.completados.includes(blockId)
            ? log.completados.filter((id) => id !== blockId)
            : [...log.completados, blockId];
          return { ...p, logs: { ...p.logs, [date]: { ...log, completados } } };
        }),
      updateBlock: (patientId, day, blockId, patch) =>
        update(patientId, (p) => ({
          ...p,
          plan: {
            ...p.plan,
            [day]: (p.plan[day] ?? []).map((b) => (b.id === blockId ? { ...b, ...patch } : b)),
          },
        })),
      addBlock: (patientId, day, tipo) =>
        update(patientId, (p) => ({
          ...p,
          plan: {
            ...p.plan,
            [day]: [
              ...(p.plan[day] ?? []),
              { id: uid("blk"), tipo, titulo: "Nuevo tiempo de comida", descripcion: "", alternativas: [] },
            ],
          },
        })),
      removeBlock: (patientId, day, blockId) =>
        update(patientId, (p) => ({
          ...p,
          plan: { ...p.plan, [day]: (p.plan[day] ?? []).filter((b) => b.id !== blockId) },
        })),
      addMeasurement: (patientId, m) =>
        update(patientId, (p) => ({
          ...p,
          medidas: [...p.medidas.filter((x) => x.fecha !== m.fecha), m].sort((a, b) =>
            a.fecha.localeCompare(b.fecha),
          ),
        })),
      removeMeasurement: (patientId, fecha) =>
        update(patientId, (p) => ({ ...p, medidas: p.medidas.filter((m) => m.fecha !== fecha) })),
      updateMeasurementDate: (patientId, oldFecha, newFecha) =>
        update(patientId, (p) => ({
          ...p,
          medidas: p.medidas
            .map((m) => (m.fecha === oldFecha ? { ...m, fecha: newFecha } : m))
            .sort((a, b) => a.fecha.localeCompare(b.fecha)),
        })),
      setMetaAgua: (patientId, meta) => update(patientId, (p) => ({ ...p, metaAgua: meta })),
      updatePatient: (patientId, patch) => update(patientId, (p) => ({ ...p, ...patch })),
      addActividad: (patientId, a) =>
        update(patientId, (p) => ({
          ...p,
          actividades: [{ ...a, id: uid("act") }, ...p.actividades],
        })),
      removeActividad: (patientId, id) =>
        update(patientId, (p) => ({
          ...p,
          actividades: p.actividades.filter((a) => a.id !== id),
        })),

      ensurePatient: (info, activar = true) => {
        setPatients((prev) =>
          prev.some((p) => p.id === info.id)
            ? prev.map((p) => (p.id === info.id ? { ...p, ...info } : p))
            : [...prev, patientFromSeed(info)],
        );
        if (activar) setActivePatientId(info.id);
      },
    };
  }, [patients, activePatientId, update]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore debe usarse dentro de StoreProvider");
  return ctx;
}
