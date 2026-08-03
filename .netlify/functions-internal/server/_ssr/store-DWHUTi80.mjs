import { i as __toESM } from "../_runtime.mjs";
import { O as isRedirect, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as loadMyPatients, c as syncPatientData, i as loadMyPatientRecord } from "./patients.functions-I4wi3pAr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DWHUTi80.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var MEAL_ORDER = [
	"Desayuno",
	"Media mañana",
	"Almuerzo",
	"Merienda",
	"Cena"
];
var MEAL_TIMES = {
	Desayuno: "08:00",
	"Media mañana": "11:00",
	Almuerzo: "14:00",
	Merienda: "17:00",
	Cena: "20:00"
};
var WEEKDAYS = [
	"Domingo",
	"Lunes",
	"Martes",
	"Miércoles",
	"Jueves",
	"Viernes",
	"Sábado"
];
var BRISTOL = [
	{
		n: 1,
		label: "Bolitas duras",
		desc: "Difícil de evacuar"
	},
	{
		n: 2,
		label: "Forma de salchicha con grumos",
		desc: "Algo dura"
	},
	{
		n: 3,
		label: "Salchicha con grietas",
		desc: "Normal"
	},
	{
		n: 4,
		label: "Suave y lisa",
		desc: "Ideal"
	},
	{
		n: 5,
		label: "Trozos blandos",
		desc: "Tiende a suelta"
	},
	{
		n: 6,
		label: "Trozos deshechos",
		desc: "Blanda"
	},
	{
		n: 7,
		label: "Totalmente líquida",
		desc: "Diarrea"
	}
];
var ORINA = [
	{
		n: 1,
		color: "#F7F3C8",
		label: "Muy clara",
		desc: "Hidratación excelente"
	},
	{
		n: 2,
		color: "#F3EA9E",
		label: "Clara",
		desc: "Buena hidratación"
	},
	{
		n: 3,
		color: "#EFDF6B",
		label: "Amarillo pálido",
		desc: "Hidratación normal"
	},
	{
		n: 4,
		color: "#E8CF3C",
		label: "Amarillo",
		desc: "Tome un vaso de agua"
	},
	{
		n: 5,
		color: "#D9B31F",
		label: "Amarillo oscuro",
		desc: "Falta de agua"
	},
	{
		n: 6,
		color: "#BF8C14",
		label: "Ámbar",
		desc: "Deshidratación"
	},
	{
		n: 7,
		color: "#9A650E",
		label: "Café claro",
		desc: "Avise a su nutricionista"
	}
];
var ESTADOS = [
	"Soltero(a)",
	"Casado(a)",
	"Unión libre",
	"Divorciado(a)",
	"Viudo(a)"
];
var QUIEN_PREPARA = [
	"El paciente",
	"Cónyuge / Pareja",
	"Hijo(a)",
	"Cuidador(a) / Familiar",
	"Servicio externo / Comprada",
	"Otro"
];
var CAMPOS_ANTROPOMETRIA = [
	{
		key: "peso",
		texto: "Peso",
		unidad: "kg"
	},
	{
		key: "cintura",
		texto: "Cintura",
		unidad: "cm"
	},
	{
		key: "cadera",
		texto: "Cadera",
		unidad: "cm"
	},
	{
		key: "bicipital",
		texto: "Circunferencia bicipital",
		unidad: "cm"
	},
	{
		key: "abdominal",
		texto: "Circunferencia abdominal",
		unidad: "cm"
	},
	{
		key: "musloMedio",
		texto: "Muslo medio",
		unidad: "cm"
	},
	{
		key: "pantorrilla",
		texto: "Pantorrilla",
		unidad: "cm"
	},
	{
		key: "pliegueTricipital",
		texto: "Pliegue tricipital",
		unidad: "mm"
	},
	{
		key: "pliegueSubescapular",
		texto: "Pliegue subescapular",
		unidad: "mm"
	}
];
var SIZES_ACCESIBILIDAD = [
	{
		value: 1,
		label: "Normal"
	},
	{
		value: 1.15,
		label: "Grande"
	},
	{
		value: 1.3,
		label: "Muy grande"
	},
	{
		value: 1.5,
		label: "Máximo"
	}
];
var CONTRASTS_ACCESIBILIDAD = [
	{
		value: "normal",
		label: "Claro",
		desc: "Colores suaves"
	},
	{
		value: "alto",
		label: "Alto contraste",
		desc: "Texto más marcado"
	},
	{
		value: "oscuro",
		label: "Oscuro",
		desc: "Fondo oscuro"
	}
];
var DEFAULT_MACROS = {
	ch: 50,
	pr: 20,
	lp: 30
};
var STORAGE_KEY = "nutriplan-store-v1";
var A11Y_STORAGE_KEY = "nutricuida-a11y-v1";
var SYNC_DEBOUNCE_MS = 1500;
function isoDate(d) {
	return d.toISOString().slice(0, 10);
}
function daysAgo(n) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() - n);
	return d;
}
function emptyLog() {
	return {
		completados: [],
		agua: 0,
		bristol: null,
		orina: null,
		medicacionTomada: [],
		nota: ""
	};
}
function emptyMeasurement(fecha) {
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
		pliegueSubescapular: 0
	};
}
var seq = 0;
var uid = (p) => `${p}-${Date.now().toString(36)}-${(seq++).toString(36)}`;
function dbRowToPatient(row) {
	const rawMacros = row["macros"] ?? {};
	return normalizePatient({
		id: row["id"],
		nombre: row["nombre"],
		edad: row["edad"],
		telefono: row["telefono"] ?? "",
		objetivo: row["objetivo"] ?? "",
		metaAgua: row["meta_agua"] ?? 8,
		estadoCivil: row["estado_civil"] ?? "",
		ocupacion: row["ocupacion"] ?? "",
		diagnostico: row["diagnostico"] ?? "",
		medicacion: row["medicacion"] ?? [],
		formulas: row["formulas"] ?? "",
		excelUrl: row["excel_url"] ?? "",
		macros: {
			ch: rawMacros["ch"] ?? DEFAULT_MACROS.ch,
			pr: rawMacros["pr"] ?? DEFAULT_MACROS.pr,
			lp: rawMacros["lp"] ?? DEFAULT_MACROS.lp
		},
		requerimientoCalorico: rawMacros["requerimientoCalorico"],
		requerimientoHidricoMl: rawMacros["requerimientoHidricoMl"],
		encuestaFrecuenciaUrl: rawMacros["encuestaFrecuenciaUrl"],
		quienPreparaComida: rawMacros["quienPreparaComida"],
		tieneHijos: rawMacros["tieneHijos"],
		detallesHijos: rawMacros["detallesHijos"],
		observacionesClinicas: rawMacros["observacionesClinicas"],
		antecedentesDriveUrl: rawMacros["antecedentesDriveUrl"],
		menuDriveUrl: rawMacros["menuDriveUrl"],
		plan: row["plan_semanal"] ?? {},
		medidas: row["medidas"] ?? [],
		logs: row["logs"] ?? {},
		actividades: row["actividades"] ?? []
	});
}
function patientFromSeed(info) {
	return {
		...info,
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
		medidas: []
	};
}
/** Rellena campos nuevos en datos guardados con versiones anteriores. */
function normalizePatient(p) {
	const logs = {};
	Object.entries(p.logs ?? {}).forEach(([k, v]) => {
		logs[k] = {
			...emptyLog(),
			...v
		};
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
		medidas: (p.medidas ?? []).map((m) => ({
			...emptyMeasurement(m.fecha),
			...m
		})),
		logs
	};
}
var StoreContext = (0, import_react.createContext)(null);
function StoreProvider({ children }) {
	const [patients, setPatients] = (0, import_react.useState)(() => []);
	const [activePatientId, setActivePatientId] = (0, import_react.useState)("");
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const syncTimer = (0, import_react.useRef)(null);
	const loadPatientsFn = useServerFn(loadMyPatients);
	const loadPatientRecordFn = useServerFn(loadMyPatientRecord);
	const syncPatientDataFn = useServerFn(syncPatientData);
	const scheduleSyncToSupabase = (0, import_react.useCallback)((patient) => {
		if (syncTimer.current) clearTimeout(syncTimer.current);
		syncTimer.current = setTimeout(() => {
			syncPatientDataFn({ data: {
				id: patient.id,
				plan_semanal: patient.plan,
				medidas: patient.medidas,
				logs: patient.logs,
				actividades: patient.actividades
			} }).catch((err) => console.warn("[Store] sync failed:", err));
		}, SYNC_DEBOUNCE_MS);
	}, [syncPatientDataFn]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const loadLocal = () => {
			try {
				const raw = localStorage.getItem(STORAGE_KEY);
				if (raw) {
					const parsed = JSON.parse(raw);
					if (Array.isArray(parsed) && parsed.length) {
						setPatients(parsed.map(normalizePatient));
						setActivePatientId(parsed[0].id);
					}
				}
			} catch {}
		};
		loadLocal();
		loadPatientsFn({}).then((rows) => {
			if (cancelled || !rows || rows.length === 0) return;
			const dbPatients = rows.map(dbRowToPatient);
			setPatients(dbPatients);
			setActivePatientId(dbPatients[0].id);
		}).catch(() => {
			loadPatientRecordFn({}).then((row) => {
				if (cancelled || !row) return;
				const p = dbRowToPatient(row);
				setPatients([p]);
				setActivePatientId(p.id);
			}).catch(() => {});
		}).finally(() => {
			if (!cancelled) setHydrated(true);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
		} catch {}
	}, [patients, hydrated]);
	const update = (0, import_react.useCallback)((patientId, fn) => {
		setPatients((prev) => {
			const next = prev.map((p) => p.id === patientId ? fn(p) : p);
			const updated = next.find((p) => p.id === patientId);
			if (updated) scheduleSyncToSupabase(updated);
			return next;
		});
	}, [scheduleSyncToSupabase]);
	const value = (0, import_react.useMemo)(() => {
		const activePatient = patients.find((p) => p.id === activePatientId) ?? patients[0];
		return {
			patients,
			activePatientId: activePatient?.id ?? "",
			setActivePatientId,
			activePatient,
			getLog: (patientId, date) => patients.find((p) => p.id === patientId)?.logs[date] ?? emptyLog(),
			updateLog: (patientId, date, patch) => update(patientId, (p) => ({
				...p,
				logs: {
					...p.logs,
					[date]: {
						...p.logs[date] ?? emptyLog(),
						...patch
					}
				}
			})),
			toggleMeal: (patientId, date, blockId) => update(patientId, (p) => {
				const log = p.logs[date] ?? emptyLog();
				const completados = log.completados.includes(blockId) ? log.completados.filter((id) => id !== blockId) : [...log.completados, blockId];
				return {
					...p,
					logs: {
						...p.logs,
						[date]: {
							...log,
							completados
						}
					}
				};
			}),
			updateBlock: (patientId, day, blockId, patch) => update(patientId, (p) => ({
				...p,
				plan: {
					...p.plan,
					[day]: (p.plan[day] ?? []).map((b) => b.id === blockId ? {
						...b,
						...patch
					} : b)
				}
			})),
			addBlock: (patientId, day, tipo) => update(patientId, (p) => ({
				...p,
				plan: {
					...p.plan,
					[day]: [...p.plan[day] ?? [], {
						id: uid("blk"),
						tipo,
						titulo: "Nuevo tiempo de comida",
						descripcion: "",
						alternativas: []
					}]
				}
			})),
			removeBlock: (patientId, day, blockId) => update(patientId, (p) => ({
				...p,
				plan: {
					...p.plan,
					[day]: (p.plan[day] ?? []).filter((b) => b.id !== blockId)
				}
			})),
			addMeasurement: (patientId, m) => update(patientId, (p) => ({
				...p,
				medidas: [...p.medidas.filter((x) => x.fecha !== m.fecha), m].sort((a, b) => a.fecha.localeCompare(b.fecha))
			})),
			removeMeasurement: (patientId, fecha) => update(patientId, (p) => ({
				...p,
				medidas: p.medidas.filter((m) => m.fecha !== fecha)
			})),
			updateMeasurementDate: (patientId, oldFecha, newFecha) => update(patientId, (p) => ({
				...p,
				medidas: p.medidas.map((m) => m.fecha === oldFecha ? {
					...m,
					fecha: newFecha
				} : m).sort((a, b) => a.fecha.localeCompare(b.fecha))
			})),
			setMetaAgua: (patientId, meta) => update(patientId, (p) => ({
				...p,
				metaAgua: meta
			})),
			updatePatient: (patientId, patch) => update(patientId, (p) => ({
				...p,
				...patch
			})),
			addActividad: (patientId, a) => update(patientId, (p) => ({
				...p,
				actividades: [{
					...a,
					id: uid("act")
				}, ...p.actividades]
			})),
			removeActividad: (patientId, id) => update(patientId, (p) => ({
				...p,
				actividades: p.actividades.filter((a) => a.id !== id)
			})),
			ensurePatient: (info, activar = true) => {
				setPatients((prev) => prev.some((p) => p.id === info.id) ? prev.map((p) => p.id === info.id ? {
					...p,
					...info
				} : p) : [...prev, patientFromSeed(info)]);
				if (activar) setActivePatientId(info.id);
			}
		};
	}, [
		patients,
		activePatientId,
		update
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreContext.Provider, {
		value,
		children
	});
}
function useStore() {
	const ctx = (0, import_react.useContext)(StoreContext);
	if (!ctx) throw new Error("useStore debe usarse dentro de StoreProvider");
	return ctx;
}
//#endregion
export { useServerFn as _, DEFAULT_MACROS as a, MEAL_TIMES as c, SIZES_ACCESIBILIDAD as d, StoreProvider as f, isoDate as g, emptyMeasurement as h, CONTRASTS_ACCESIBILIDAD as i, ORINA as l, daysAgo as m, BRISTOL as n, ESTADOS as o, WEEKDAYS as p, CAMPOS_ANTROPOMETRIA as r, MEAL_ORDER as s, A11Y_STORAGE_KEY as t, QUIEN_PREPARA as u, useStore as v };
