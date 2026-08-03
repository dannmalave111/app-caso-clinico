import type { MealType, Measurement } from "@/lib/store";
import type { FontScale, ContrastMode } from "@/lib/accessibility";

// ─── Tipos de comida ────────────────────────────────────────
export const MEAL_ORDER: MealType[] = [
  "Desayuno",
  "Media mañana",
  "Almuerzo",
  "Merienda",
  "Cena",
];

// ─── Horarios de comida por defecto ─────────────────────────
export const MEAL_TIMES: Record<MealType, string> = {
  Desayuno: "08:00",
  "Media mañana": "11:00",
  Almuerzo: "14:00",
  Merienda: "17:00",
  Cena: "20:00",
};

// ─── Días de la semana ──────────────────────────────────────
export const WEEKDAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

// ─── Escala de Bristol ──────────────────────────────────────
export const BRISTOL = [
  { n: 1, label: "Bolitas duras", desc: "Difícil de evacuar" },
  { n: 2, label: "Forma de salchicha con grumos", desc: "Algo dura" },
  { n: 3, label: "Salchicha con grietas", desc: "Normal" },
  { n: 4, label: "Suave y lisa", desc: "Ideal" },
  { n: 5, label: "Trozos blandos", desc: "Tiende a suelta" },
  { n: 6, label: "Trozos deshechos", desc: "Blanda" },
  { n: 7, label: "Totalmente líquida", desc: "Diarrea" },
];

// ─── Escala de color de orina ───────────────────────────────
export const ORINA = [
  { n: 1, color: "#F7F3C8", label: "Muy clara", desc: "Hidratación excelente" },
  { n: 2, color: "#F3EA9E", label: "Clara", desc: "Buena hidratación" },
  { n: 3, color: "#EFDF6B", label: "Amarillo pálido", desc: "Hidratación normal" },
  { n: 4, color: "#E8CF3C", label: "Amarillo", desc: "Tome un vaso de agua" },
  { n: 5, color: "#D9B31F", label: "Amarillo oscuro", desc: "Falta de agua" },
  { n: 6, color: "#BF8C14", label: "Ámbar", desc: "Deshidratación" },
  { n: 7, color: "#9A650E", label: "Café claro", desc: "Avise a su nutricionista" },
];

// ─── Estados civiles ────────────────────────────────────────
export const ESTADOS = ["Soltero(a)", "Casado(a)", "Unión libre", "Divorciado(a)", "Viudo(a)"];

// ─── Quién prepara la comida ────────────────────────────────
export const QUIEN_PREPARA = [
  "El paciente",
  "Cónyuge / Pareja",
  "Hijo(a)",
  "Cuidador(a) / Familiar",
  "Servicio externo / Comprada",
  "Otro",
];

// ─── Campos de medición antropométrica ──────────────────────

export const CAMPOS_ANTROPOMETRIA: { key: keyof Measurement; texto: string; unidad: string }[] = [
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

// ─── Tamaños de fuente para accesibilidad ───────────────────
export const SIZES_ACCESIBILIDAD: { value: FontScale; label: string }[] = [
  { value: 1, label: "Normal" },
  { value: 1.15, label: "Grande" },
  { value: 1.3, label: "Muy grande" },
  { value: 1.5, label: "Máximo" },
];

// ─── Modos de contraste para accesibilidad ──────────────────
export const CONTRASTS_ACCESIBILIDAD: { value: ContrastMode; label: string; desc: string }[] = [
  { value: "normal", label: "Claro", desc: "Colores suaves" },
  { value: "alto", label: "Alto contraste", desc: "Texto más marcado" },
  { value: "oscuro", label: "Oscuro", desc: "Fondo oscuro" },
];

// ─── Valores por defecto ────────────────────────────────────
export const DEFAULT_MACROS = { ch: 50, pr: 20, lp: 30 };

export const STORAGE_KEY = "nutriplan-store-v1";
export const A11Y_STORAGE_KEY = "nutricuida-a11y-v1";

export const SYNC_DEBOUNCE_MS = 1500;
export const MOBILE_BREAKPOINT = 768;
export const META_ACTIVIDAD_SEMANAL_MIN = 150;
