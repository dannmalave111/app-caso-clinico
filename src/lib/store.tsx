import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type MealType = "Desayuno" | "Media mañana" | "Almuerzo" | "Merienda" | "Cena";

export const MEAL_ORDER: MealType[] = [
  "Desayuno",
  "Media mañana",
  "Almuerzo",
  "Merienda",
  "Cena",
];

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

export type Medicamento = { id: string; tipo: string; gramaje: string; horario: string };

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


export const WEEKDAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export function emptyLog(): DailyLog {
  return { completados: [], agua: 0, bristol: null, nota: "" };
}

let seq = 0;
const uid = (p: string) => `${p}-${Date.now().toString(36)}-${(seq++).toString(36)}`;

function block(tipo: MealType, titulo: string, descripcion: string, alternativas: string[]): MealBlock {
  return { id: `${tipo}-${titulo}`.replace(/\s+/g, "_").toLowerCase() + `-${seq++}`, tipo, titulo, descripcion, alternativas };
}

function planBase(): DayPlan {
  const plan: DayPlan = {};
  for (let i = 0; i < 7; i++) {
    plan[String(i)] = [
      block("Desayuno", "Avena con fruta", "1 taza de avena cocida con leche descremada, media manzana en trozos y una cucharadita de canela.", [
        "Yogur natural con papaya y 2 cucharadas de granola",
        "2 huevos revueltos con 1 rebanada de pan integral",
      ]),
      block("Media mañana", "Fruta y semillas", "1 pera mediana y 6 almendras sin sal.", [
        "1 mandarina con 1 puñado de nueces",
        "1 vaso de yogur bebible sin azúcar",
      ]),
      block("Almuerzo", "Pollo con verduras", "120 g de pechuga de pollo a la plancha, 1 taza de arroz integral y ensalada de lechuga con tomate.", [
        "Pescado al horno con puré de camote y ejotes",
        "Guiso de lentejas con verduras y 1/2 taza de arroz",
      ]),
      block("Merienda", "Colación ligera", "1 taza de gelatina sin azúcar y 3 galletas integrales.", [
        "1 rebanada de queso panela con jitomate",
        "1 vaso de leche descremada tibia",
      ]),
      block("Cena", "Sopa y proteína", "Crema de calabaza (1 taza) con 90 g de queso panela asado.", [
        "Caldo de verduras con pollo deshebrado",
        "Omelette de claras con espinaca",
      ]),
    ];
  }
  return plan;
}

function seedLogs(metaAgua: number, adherencia: number, plan: DayPlan): Record<string, DailyLog> {
  const logs: Record<string, DailyLog> = {};
  for (let i = 1; i <= 13; i++) {
    const d = daysAgo(i);
    const blocks = plan[String(d.getDay())] ?? [];
    const cumple = Math.random() < adherencia;
    const n = cumple ? blocks.length : Math.max(1, Math.floor(blocks.length * 0.5));
    logs[isoDate(d)] = {
      completados: blocks.slice(0, n).map((b) => b.id),
      agua: cumple ? metaAgua : Math.max(2, metaAgua - 3),
      bristol: 3 + Math.floor(Math.random() * 2),
      nota: i % 4 === 0 ? "Me sentí con más energía hoy." : "",
    };
  }
  return logs;
}

function makePatient(
  nombre: string,
  edad: number,
  telefono: string,
  objetivo: string,
  pesoBase: number,
  adherencia: number,
): Patient {
  const plan = planBase();
  const metaAgua = 8;
  return {
    id: uid("pac"),
    nombre,
    edad,
    telefono,
    objetivo,
    metaAgua,
    plan,
    logs: seedLogs(metaAgua, adherencia, plan),
    medidas: [
      { fecha: isoDate(daysAgo(60)), peso: pesoBase + 2.8, cintura: 98, cadera: 106 },
      { fecha: isoDate(daysAgo(30)), peso: pesoBase + 1.4, cintura: 96, cadera: 105 },
      { fecha: isoDate(daysAgo(7)), peso: pesoBase, cintura: 94, cadera: 104 },
    ],
  };
}

function seedPatients(): Patient[] {
  return [
    makePatient("Doña Carmen Ruiz", 72, "5215512345678", "Control de glucosa y peso", 68.5, 0.85),
    makePatient("Don Alberto Peña", 78, "5215598765432", "Salud cardiovascular", 81.2, 0.6),
    makePatient("Doña Rosa Medina", 69, "5215544332211", "Digestión y energía", 74.0, 0.75),
  ];
}

export type PatientSeed = {
  id: string;
  nombre: string;
  edad: number;
  telefono: string;
  objetivo: string;
  metaAgua: number;
};

function patientFromSeed(info: PatientSeed): Patient {
  return {
    id: info.id,
    nombre: info.nombre,
    edad: info.edad,
    telefono: info.telefono,
    objetivo: info.objetivo,
    metaAgua: info.metaAgua,
    plan: planBase(),
    logs: {},
    medidas: [],
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
  setMetaAgua: (patientId: string, meta: number) => void;
  ensurePatient: (info: PatientSeed, activar?: boolean) => void;
};

const StoreContext = createContext<Store | null>(null);
const STORAGE_KEY = "nutriplan-store-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(() => seedPatients());
  const [activePatientId, setActivePatientId] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Patient[];
        if (Array.isArray(parsed) && parsed.length) {
          setPatients(parsed);
          setActivePatientId(parsed[0]!.id);
          setHydrated(true);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    setPatients((p) => {
      setActivePatientId(p[0]!.id);
      return p;
    });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    } catch {
      /* ignore */
    }
  }, [patients, hydrated]);

  const update = useCallback((patientId: string, fn: (p: Patient) => Patient) => {
    setPatients((prev) => prev.map((p) => (p.id === patientId ? fn(p) : p)));
  }, []);

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
          medidas: [...p.medidas, m].sort((a, b) => a.fecha.localeCompare(b.fecha)),
        })),
      setMetaAgua: (patientId, meta) => update(patientId, (p) => ({ ...p, metaAgua: meta })),
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

export const BRISTOL = [
  { n: 1, label: "Bolitas duras", desc: "Difícil de evacuar" },
  { n: 2, label: "Forma de salchicha con grumos", desc: "Algo dura" },
  { n: 3, label: "Salchicha con grietas", desc: "Normal" },
  { n: 4, label: "Suave y lisa", desc: "Ideal" },
  { n: 5, label: "Trozos blandos", desc: "Tiende a suelta" },
  { n: 6, label: "Trozos deshechos", desc: "Blanda" },
  { n: 7, label: "Totalmente líquida", desc: "Diarrea" },
];
