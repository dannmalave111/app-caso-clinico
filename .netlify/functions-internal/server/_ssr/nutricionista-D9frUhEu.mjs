import { i as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as registroSchema } from "./patients.shared-D1J8O4CK.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as supabase } from "./client-DCvJSF2o.mjs";
import { n as Label, t as Input } from "./label-CmIE8x5o.mjs";
import { C as Copy, M as ArrowLeft, N as Activity, T as ClipboardList, _ as History, a as Trash2, b as FileDown, c as Ruler, g as KeyRound, i as UserPlus, m as MessageCircle, n as UtensilsCrossed, r as Users, s as Save, u as Plus, w as CloudUpload, x as ExternalLink, y as FileText } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as updatePatientClinico, r as deletePatient, s as registerPatient } from "./patients.functions-I4wi3pAr.mjs";
import { _ as useServerFn, a as DEFAULT_MACROS, g as isoDate, h as emptyMeasurement, m as daysAgo, n as BRISTOL, o as ESTADOS, p as WEEKDAYS, r as CAMPOS_ANTROPOMETRIA, s as MEAL_ORDER, u as QUIEN_PREPARA, v as useStore } from "./store-DWHUTi80.mjs";
import { c as ResponsiveContainer, i as XAxis, l as Tooltip, o as CartesianGrid, r as YAxis, s as Bar, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nutricionista-D9frUhEu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var vacio = {
	nombre: "",
	edad: "",
	telefono: "",
	objetivo: "",
	metaAgua: ""
};
function RegistroPacientes() {
	const { ensurePatient } = useStore();
	const [filas, setFilas] = (0, import_react.useState)([]);
	const [form, setForm] = (0, import_react.useState)(vacio);
	const [cargando, setCargando] = (0, import_react.useState)(false);
	const cargar = async () => {
		const { data } = await supabase.from("patients").select("id, nombre, edad, telefono, objetivo, meta_agua, codigo").order("created_at", { ascending: false });
		setFilas(data ?? []);
	};
	(0, import_react.useEffect)(() => {
		cargar();
	}, []);
	const onSubmit = async (e) => {
		e.preventDefault();
		const parsed = registroSchema.safeParse({
			nombre: form.nombre,
			edad: Number(form.edad),
			telefono: form.telefono,
			objetivo: form.objetivo,
			metaAgua: Number(form.metaAgua)
		});
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Revise los datos");
			return;
		}
		setCargando(true);
		try {
			const res = await registerPatient({ data: parsed.data });
			ensurePatient({
				id: res.patient.id,
				nombre: parsed.data.nombre,
				edad: parsed.data.edad,
				telefono: parsed.data.telefono,
				objetivo: parsed.data.objetivo,
				metaAgua: parsed.data.metaAgua
			}, false);
			setForm(vacio);
			await cargar();
			toast.success(`Paciente registrado. Código de acceso: ${res.codigo}`);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "No se pudo registrar");
		} finally {
			setCargando(false);
		}
	};
	const onDelete = async (id, nombre) => {
		if (!window.confirm(`¿Eliminar a ${nombre} y su acceso?`)) return;
		try {
			await deletePatient({ data: { id } });
			await cargar();
			toast.success("Paciente eliminado");
		} catch {
			toast.error("No se pudo eliminar");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "card-float h-fit p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-11 items-center justify-center rounded-xl bg-primary-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {
							className: "size-6 text-primary",
							"aria-hidden": "true"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-extrabold",
						children: "Registrar paciente"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "r-nombre",
								className: "font-bold",
								children: "Nombre completo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "r-nombre",
								required: true,
								maxLength: 80,
								value: form.nombre,
								onChange: (e) => setForm({
									...form,
									nombre: e.target.value
								}),
								className: "h-12 rounded-xl"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "r-edad",
									className: "font-bold",
									children: "Edad"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "r-edad",
									type: "number",
									min: 1,
									max: 120,
									value: form.edad,
									onChange: (e) => setForm({
										...form,
										edad: e.target.value
									}),
									className: "h-12 rounded-xl"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "r-agua",
									className: "font-bold",
									children: "Meta de vasos"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "r-agua",
									type: "number",
									min: 1,
									max: 20,
									value: form.metaAgua,
									onChange: (e) => setForm({
										...form,
										metaAgua: e.target.value
									}),
									className: "h-12 rounded-xl"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "r-tel",
								className: "font-bold",
								children: "WhatsApp (con código país)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "r-tel",
								maxLength: 20,
								placeholder: "521555000111",
								value: form.telefono,
								onChange: (e) => setForm({
									...form,
									telefono: e.target.value
								}),
								className: "h-12 rounded-xl"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "r-obj",
								className: "font-bold",
								children: "Objetivo clínico"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "r-obj",
								maxLength: 200,
								placeholder: "Control glucémico",
								value: form.objetivo,
								onChange: (e) => setForm({
									...form,
									objetivo: e.target.value
								}),
								className: "h-12 rounded-xl"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: cargando,
					className: "mt-6 h-12 w-full rounded-xl text-base font-bold",
					children: "Crear paciente y generar código"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-float overflow-hidden p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-border px-6 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
					className: "size-5 text-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-xl font-extrabold",
					children: [
						"Pacientes con acceso (",
						filas.length,
						")"
					]
				})]
			}), filas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-6 py-10 text-center text-lg text-muted-foreground",
				children: "Aún no hay pacientes registrados en el sistema."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: filas.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center gap-4 px-6 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-lg font-bold",
								children: f.nombre
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: [
									f.edad,
									" años · ",
									f.objetivo || "Sin objetivo",
									" · ",
									f.meta_agua,
									" vasos"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								navigator.clipboard.writeText(f.codigo);
								toast.success("Código copiado");
							},
							className: "flex items-center gap-2 rounded-xl bg-primary-soft px-4 py-2 text-xl font-extrabold tracking-widest text-primary",
							children: [f.codigo, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								className: "size-4",
								"aria-hidden": "true"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Eliminar a ${f.nombre}`,
							onClick: () => void onDelete(f.id, f.nombre),
							className: "flex size-11 items-center justify-center rounded-xl bg-muted text-destructive hover:bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
								className: "size-5",
								"aria-hidden": "true"
							})
						})
					]
				}, f.id))
			})]
		})]
	});
}
var esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** Documento de antecedentes clínicos listo para descargar en Word o imprimir a PDF. */
function buildAntecedentesHTML(p) {
	const hoy = (/* @__PURE__ */ new Date()).toLocaleDateString("es-MX", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	});
	const ultima = p.medidas[p.medidas.length - 1];
	const filasMedidas = p.medidas.slice().reverse().map((m) => `<tr>
        <td>${m.fecha}</td><td>${m.peso}</td><td>${m.cintura}</td><td>${m.cadera}</td>
        <td>${m.bicipital}</td><td>${m.abdominal}</td><td>${m.musloMedio}</td><td>${m.pantorrilla}</td>
        <td>${m.pliegueTricipital}</td><td>${m.pliegueSubescapular}</td>
      </tr>`).join("");
	const filasMedicacion = p.medicacion.length ? p.medicacion.map((m) => `<tr><td>${esc(m.tipo)}</td><td>${esc(m.gramaje)}</td><td>${esc(m.horario)}</td></tr>`).join("") : `<tr><td colspan="3">Sin medicación registrada</td></tr>`;
	const filasActividad = p.actividades.length ? p.actividades.map((a) => `<tr><td>${a.fecha}</td><td>${esc(a.tipo)}</td><td>${a.minutos} min</td><td>${a.intensidad}</td><td>${esc(a.notas)}</td></tr>`).join("") : `<tr><td colspan="5">Sin actividad registrada</td></tr>`;
	return `<!doctype html>
<html lang="es"><head><meta charset="utf-8" />
<title>Antecedentes clínicos — ${esc(p.nombre)}</title>
<style>
  body { font-family: Georgia, "Times New Roman", serif; color: #14281f; margin: 32px; font-size: 14px; }
  h1 { font-size: 24px; margin-bottom: 4px; }
  h2 { font-size: 17px; margin-top: 26px; border-bottom: 2px solid #6fcf97; padding-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  th, td { border: 1px solid #cfd8d3; padding: 6px 8px; text-align: left; font-size: 13px; }
  th { background: #eafaf1; }
  .meta { color: #4b5b53; }
</style></head>
<body>
  <h1>Antecedentes clínicos nutricionales</h1>
  <p class="meta">NutriCuida · Documento generado el ${hoy}</p>

  <h2>Datos del paciente</h2>
  <table>
    <tr><th>Nombre</th><td>${esc(p.nombre)}</td><th>Edad</th><td>${p.edad} años</td></tr>
    <tr><th>Estado civil</th><td>${esc(p.estadoCivil || "—")}</td><th>Ocupación</th><td>${esc(p.ocupacion || "—")}</td></tr>
    <tr><th>Teléfono</th><td>${esc(p.telefono)}</td><th>Meta de agua</th><td>${p.requerimientoHidricoMl ? `${p.requerimientoHidricoMl} mL (${Math.round(p.requerimientoHidricoMl / 250)} vasos)` : `${p.metaAgua} vasos/día`}</td></tr>
    <tr><th>¿Quién prepara la comida?</th><td>${esc(p.quienPreparaComida || "—")}</td><th>Hijos</th><td>${esc(p.tieneHijos ? `${p.tieneHijos} ${p.detallesHijos ? `(${p.detallesHijos})` : ""}` : "—")}</td></tr>
    <tr><th>Objetivo</th><td colspan="3">${esc(p.objetivo)}</td></tr>
  </table>

  <h2>Diagnóstico médico y Observaciones</h2>
  <p><strong>Diagnóstico:</strong> ${esc(p.diagnostico || "Sin diagnóstico registrado")}</p>
  ${p.observacionesClinicas ? `<p><strong>Observaciones clínicas:</strong> ${esc(p.observacionesClinicas)}</p>` : ""}

  <h2>Medicación</h2>
  <table><tr><th>Tipo</th><th>Gramaje</th><th>Horario</th></tr>${filasMedicacion}</table>

  <h2>Plan nutricional y Requerimientos</h2>
  <p>Requerimiento calórico: <strong>${p.requerimientoCalorico ? `${p.requerimientoCalorico} kcal/día` : "Sin especificar"}</strong></p>
  <p>Distribución de macronutrientes: <strong>CH ${p.macros.ch}% · Pr ${p.macros.pr}% · Lp ${p.macros.lp}%</strong></p>
  <p>Fórmulas de cálculo:<br />${esc(p.formulas || "—").replace(/\n/g, "<br />")}</p>
  ${p.antecedentesDriveUrl ? `<p>Documento de antecedentes en nube/Drive: <a href="${esc(p.antecedentesDriveUrl)}">${esc(p.antecedentesDriveUrl)}</a></p>` : ""}

  <h2>Antropometría</h2>
  <p>Última medición: ${ultima ? `${ultima.fecha} · ${ultima.peso} kg` : "sin registros"}</p>
  <table>
    <tr>
      <th>Fecha</th><th>Peso (kg)</th><th>Cintura</th><th>Cadera</th><th>Bicipital</th>
      <th>Abdominal</th><th>Muslo medio</th><th>Pantorrilla</th><th>Pliegue tricipital</th><th>Pliegue subescapular</th>
    </tr>
    ${filasMedidas || `<tr><td colspan="10">Sin mediciones</td></tr>`}
  </table>

  <h2>Actividad física</h2>
  <table><tr><th>Fecha</th><th>Actividad</th><th>Duración</th><th>Intensidad</th><th>Notas</th></tr>${filasActividad}</table>
</body></html>`;
}
var isUuid = (id) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
var field$2 = "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none";
var label$2 = "block text-sm font-bold text-muted-foreground";
function FichaClinica() {
	const { activePatient, updatePatient } = useStore();
	const guardarRemoto = useServerFn(updatePatientClinico);
	const [form, setForm] = (0, import_react.useState)(() => snapshot(activePatient));
	const [guardando, setGuardando] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setForm(snapshot(activePatient));
	}, [activePatient.id]);
	const setMed = (id, patch) => setForm((f) => ({
		...f,
		medicacion: f.medicacion.map((m) => m.id === id ? {
			...m,
			...patch
		} : m)
	}));
	const setHorariosNotificables = (id, index, val) => {
		setForm((f) => ({
			...f,
			medicacion: f.medicacion.map((m) => {
				if (m.id !== id) return m;
				const current = [...m.horariosNotificables ?? [
					"",
					"",
					""
				]];
				while (current.length < 3) current.push("");
				current[index] = val;
				return {
					...m,
					horariosNotificables: current
				};
			})
		}));
	};
	const guardar = async () => {
		setGuardando(true);
		const metaAguaCalculada = form.requerimientoHidricoMl ? Math.max(1, Math.round(form.requerimientoHidricoMl / 250)) : activePatient.metaAgua;
		const payload = {
			...form,
			metaAgua: metaAguaCalculada
		};
		updatePatient(activePatient.id, payload);
		try {
			if (isUuid(activePatient.id)) await guardarRemoto({ data: {
				id: activePatient.id,
				...payload
			} });
			toast.success("Ficha clínica guardada correctamente");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "No se pudo guardar en el servidor");
		} finally {
			setGuardando(false);
		}
	};
	const descargarWord = () => {
		const html = buildAntecedentesHTML({
			...activePatient,
			...form
		});
		const blob = new Blob(["﻿", html], { type: "application/msword" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `Antecedentes-${activePatient.nombre.replace(/\s+/g, "_")}.doc`;
		a.click();
		URL.revokeObjectURL(url);
	};
	const descargarPdf = () => {
		const html = buildAntecedentesHTML({
			...activePatient,
			...form
		});
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
	const cargarArchivoAntecedentes = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (evt) => {
			try {
				const text = evt.target?.result;
				if (text.startsWith("{") || text.startsWith("[")) {
					const parsed = JSON.parse(text);
					if (parsed.diagnostico || parsed.observacionesClinicas) {
						setForm((f) => ({
							...f,
							...parsed
						}));
						toast.success("Antecedentes importados correctamente");
						return;
					}
				}
				setForm((f) => ({
					...f,
					observacionesClinicas: (f.observacionesClinicas ? f.observacionesClinicas + "\n\n" : "") + `[Archivo: ${file.name}]\n` + text.slice(0, 1e3)
				}));
				toast.success(`Archivo "${file.name}" cargado en observaciones`);
			} catch {
				toast.success(`Archivo "${file.name}" adjuntado localmente`);
			}
		};
		reader.readAsText(file);
	};
	const macrosTotal = form.macros.ch + form.macros.pr + form.macros.lp;
	const vasosCalculados = form.requerimientoHidricoMl ? Math.round(form.requerimientoHidricoMl / 250) : Math.round((activePatient.metaAgua || 8) * 250 / 250);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-2xl font-extrabold",
				children: ["Ficha clínica de ", activePatient.nombre]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Datos sociodemográficos, diagnóstico, medicación con recordatorios y requerimientos."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-center gap-2 rounded-xl bg-muted px-4 py-3 font-bold hover:bg-secondary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
								className: "size-5",
								"aria-hidden": "true"
							}),
							"Cargar Antecedentes",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: ".json,.txt,.doc,.docx,.pdf",
								className: "hidden",
								onChange: cargarArchivoAntecedentes
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: descargarWord,
						className: "flex items-center gap-2 rounded-xl bg-muted px-4 py-3 font-bold hover:bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							className: "size-5",
							"aria-hidden": "true"
						}), "Word"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: descargarPdf,
						className: "flex items-center gap-2 rounded-xl bg-muted px-4 py-3 font-bold hover:bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, {
							className: "size-5",
							"aria-hidden": "true"
						}), "PDF"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: guardar,
						disabled: guardando,
						className: "flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground hover:opacity-90 disabled:opacity-60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
							className: "size-5",
							"aria-hidden": "true"
						}), guardando ? "Guardando…" : "Guardar ficha"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card-float p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-extrabold",
							children: "Datos sociodemográficos y entorno"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: label$2,
								htmlFor: "estadoCivil",
								children: "Estado civil"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "estadoCivil",
								value: form.estadoCivil,
								onChange: (e) => setForm({
									...form,
									estadoCivil: e.target.value
								}),
								className: field$2,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Sin especificar"
								}), ESTADOS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: e,
									children: e
								}, e))]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: label$2,
								htmlFor: "ocupacion",
								children: "Ocupación"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "ocupacion",
								value: form.ocupacion,
								onChange: (e) => setForm({
									...form,
									ocupacion: e.target.value
								}),
								className: field$2
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: label$2,
								htmlFor: "quienPreparaComida",
								children: "¿Quién prepara la comida?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "quienPreparaComida",
								value: form.quienPreparaComida,
								onChange: (e) => setForm({
									...form,
									quienPreparaComida: e.target.value
								}),
								className: field$2,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Sin especificar"
								}), QUIEN_PREPARA.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: q,
									children: q
								}, q))]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: label$2,
								htmlFor: "tieneHijos",
								children: "¿Possence hijos?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "tieneHijos",
								value: form.tieneHijos,
								onChange: (e) => setForm({
									...form,
									tieneHijos: e.target.value
								}),
								className: field$2,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Sin especificar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Sí",
										children: "Sí"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "No",
										children: "No"
									})
								]
							})] })]
						}),
						form.tieneHijos === "Sí" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label$2,
							htmlFor: "detallesHijos",
							children: "Detalles sobre los hijos (cantidad, conviven)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "detallesHijos",
							placeholder: "Ej. 2 hijos, 1 vive en casa",
							value: form.detallesHijos,
							onChange: (e) => setForm({
								...form,
								detallesHijos: e.target.value
							}),
							className: field$2
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label$2,
							htmlFor: "diagnostico",
							children: "Diagnóstico médico"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "diagnostico",
							rows: 3,
							value: form.diagnostico,
							onChange: (e) => setForm({
								...form,
								diagnostico: e.target.value
							}),
							className: field$2
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label$2,
							htmlFor: "observacionesClinicas",
							children: "Observaciones clínicas adicionales"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "observacionesClinicas",
							rows: 3,
							placeholder: "Preferencias, alergias, contexto de hábitos, ambiente familiar...",
							value: form.observacionesClinicas,
							onChange: (e) => setForm({
								...form,
								observacionesClinicas: e.target.value
							}),
							className: field$2
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: label$2,
								htmlFor: "antecedentesDriveUrl",
								children: "Enlace a Antecedentes / Nube (Google Drive, OneDrive, etc.)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "antecedentesDriveUrl",
								type: "url",
								placeholder: "https://drive.google.com/...",
								value: form.antecedentesDriveUrl,
								onChange: (e) => setForm({
									...form,
									antecedentesDriveUrl: e.target.value
								}),
								className: field$2
							}),
							form.antecedentesDriveUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: form.antecedentesDriveUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary underline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), " Ver antecedentes en Drive"]
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card-float p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-extrabold",
								children: "Medicación y Horarios Notificables"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Configurar horario principal y hasta 3 horarios notificables de recordatorio."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setForm({
									...form,
									medicacion: [...form.medicacion, {
										id: `med-${Date.now()}`,
										tipo: "",
										gramaje: "",
										horario: "08:00",
										horariosNotificables: [
											"08:00",
											"",
											""
										]
									}]
								}),
								className: "flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-bold text-primary-foreground hover:opacity-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									className: "size-5",
									"aria-hidden": "true"
								}), "Agregar"]
							})]
						}),
						form.medicacion.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: "Sin medicación registrada."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-4",
							children: form.medicacion.map((m) => {
								const hNotif = m.horariosNotificables ?? [
									m.horario || "08:00",
									"",
									""
								];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-2xl border border-border bg-muted/40 p-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-[1.4fr_1fr_auto] items-end gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: label$2,
												children: "Medicamento / Tipo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: m.tipo,
												placeholder: "Nombre del medicamento",
												onChange: (e) => setMed(m.id, { tipo: e.target.value }),
												className: field$2
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: label$2,
												children: "Gramaje / Dosis"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: m.gramaje,
												placeholder: "500 mg",
												onChange: (e) => setMed(m.id, { gramaje: e.target.value }),
												className: field$2
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": `Eliminar ${m.tipo || "medicamento"}`,
												onClick: () => setForm({
													...form,
													medicacion: form.medicacion.filter((x) => x.id !== m.id)
												}),
												className: "mb-1 flex size-11 items-center justify-center rounded-xl text-destructive hover:bg-destructive/10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
													className: "size-5",
													"aria-hidden": "true"
												})
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: label$2,
										children: "Horarios de notificación (hasta 3 opciones)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 grid grid-cols-3 gap-2",
										children: [
											0,
											1,
											2
										].map((idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-bold text-muted-foreground",
											children: ["Horario ", idx + 1]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "time",
											value: hNotif[idx] ?? "",
											onChange: (e) => setHorariosNotificables(m.id, idx, e.target.value),
											className: "mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm font-bold"
										})] }, idx))
									})] })]
								}, m.id);
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card-float p-6 lg:col-span-2 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-extrabold",
							children: "Requerimientos, Macronutrientes y Enlaces"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: label$2,
									htmlFor: "reqCalorico",
									children: "Requerimiento Calórico (kcal/día)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "reqCalorico",
									type: "number",
									min: 500,
									max: 6e3,
									step: 50,
									placeholder: "Ej. 1800",
									value: form.requerimientoCalorico ?? "",
									onChange: (e) => setForm({
										...form,
										requerimientoCalorico: e.target.value ? Number(e.target.value) : void 0
									}),
									className: field$2
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: label$2,
										htmlFor: "reqHidrico",
										children: "Requerimiento Hídrico (mL/día)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "reqHidrico",
										type: "number",
										min: 500,
										max: 6e3,
										step: 100,
										placeholder: "Ej. 2000",
										value: form.requerimientoHidricoMl ?? "",
										onChange: (e) => setForm({
											...form,
											requerimientoHidricoMl: e.target.value ? Number(e.target.value) : void 0
										}),
										className: field$2
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs font-bold text-primary",
										children: [
											"Equivale a ",
											vasosCalculados,
											" vasos de 250 mL para el paciente"
										]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: label$2,
									htmlFor: "encuestaFrecuenciaUrl",
									children: "Link a Encuesta de Frecuencia de Consumo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "encuestaFrecuenciaUrl",
									type: "url",
									placeholder: "https://forms.google.com/...",
									value: form.encuestaFrecuenciaUrl,
									onChange: (e) => setForm({
										...form,
										encuestaFrecuenciaUrl: e.target.value
									}),
									className: field$2
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-3 pt-2",
							children: [
								["ch", "Carbohidratos (CH) %"],
								["pr", "Proteínas (Pr) %"],
								["lp", "Lípidos (Lp) %"]
							].map(([k, texto]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: label$2,
								htmlFor: `macro-${k}`,
								children: texto
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: `macro-${k}`,
								type: "number",
								min: 0,
								max: 100,
								value: form.macros[k],
								onChange: (e) => setForm({
									...form,
									macros: {
										...form.macros,
										[k]: Number(e.target.value || 0)
									}
								}),
								className: field$2
							})] }, k))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `text-base font-bold ${macrosTotal === 100 ? "text-primary" : "text-destructive"}`,
							children: [
								"Suma de macronutrientes: ",
								macrosTotal,
								"% ",
								macrosTotal === 100 ? "(correcta)" : "(debe sumar 100%)"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 lg:grid-cols-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: label$2,
								htmlFor: "formulas",
								children: "Fórmulas de cálculo utilizadas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "formulas",
								rows: 3,
								value: form.formulas,
								onChange: (e) => setForm({
									...form,
									formulas: e.target.value
								}),
								className: field$2
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: label$2,
									htmlFor: "menuDriveUrl",
									children: "Enlace a Menú Semanal en Documento / Google Drive"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "menuDriveUrl",
									type: "url",
									placeholder: "https://docs.google.com/document/d/...",
									value: form.menuDriveUrl,
									onChange: (e) => setForm({
										...form,
										menuDriveUrl: e.target.value
									}),
									className: field$2
								}),
								form.menuDriveUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: form.menuDriveUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary underline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), " Abrir menú en Google Drive"]
								})
							] })]
						})
					]
				})
			]
		})]
	});
}
function snapshot(p) {
	const macrosObj = p.macros ?? DEFAULT_MACROS;
	const rawMacros = macrosObj;
	return {
		estadoCivil: p.estadoCivil ?? "",
		ocupacion: p.ocupacion ?? "",
		diagnostico: p.diagnostico ?? "",
		quienPreparaComida: p.quienPreparaComida ?? rawMacros["quienPreparaComida"] ?? "",
		tieneHijos: p.tieneHijos ?? rawMacros["tieneHijos"] ?? "",
		detallesHijos: p.detallesHijos ?? rawMacros["detallesHijos"] ?? "",
		observacionesClinicas: p.observacionesClinicas ?? rawMacros["observacionesClinicas"] ?? "",
		antecedentesDriveUrl: p.antecedentesDriveUrl ?? rawMacros["antecedentesDriveUrl"] ?? "",
		menuDriveUrl: p.menuDriveUrl ?? rawMacros["menuDriveUrl"] ?? "",
		encuestaFrecuenciaUrl: p.encuestaFrecuenciaUrl ?? rawMacros["encuestaFrecuenciaUrl"] ?? "",
		requerimientoCalorico: p.requerimientoCalorico ?? rawMacros["requerimientoCalorico"] ?? void 0,
		requerimientoHidricoMl: p.requerimientoHidricoMl ?? rawMacros["requerimientoHidricoMl"] ?? (p.metaAgua ? p.metaAgua * 250 : void 0),
		medicacion: p.medicacion.map((m) => ({
			...m,
			horariosNotificables: m.horariosNotificables ?? [
				m.horario || "08:00",
				"",
				""
			]
		})),
		formulas: p.formulas ?? "",
		excelUrl: p.excelUrl ?? "",
		macros: {
			ch: macrosObj.ch ?? DEFAULT_MACROS.ch,
			pr: macrosObj.pr ?? DEFAULT_MACROS.pr,
			lp: macrosObj.lp ?? DEFAULT_MACROS.lp
		}
	};
}
var field$1 = "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none";
var label$1 = "block text-sm font-bold text-muted-foreground";
function ActividadFisica() {
	const { activePatient, addActividad, removeActividad } = useStore();
	const [form, setForm] = (0, import_react.useState)({
		fecha: isoDate(/* @__PURE__ */ new Date()),
		tipo: "",
		minutos: 0,
		intensidad: "Baja",
		notas: ""
	});
	const resumen = (0, import_react.useMemo)(() => {
		const desde = /* @__PURE__ */ new Date();
		desde.setDate(desde.getDate() - 7);
		const semana = activePatient.actividades.filter((a) => new Date(a.fecha) >= desde);
		const minutos = semana.reduce((s, a) => s + a.minutos, 0);
		return {
			sesiones: semana.length,
			minutos,
			meta: 150
		};
	}, [activePatient.actividades]);
	const registrar = (e) => {
		e.preventDefault();
		if (!form.tipo.trim()) return;
		addActividad(activePatient.id, form);
		setForm({
			...form,
			minutos: 30,
			notas: ""
		});
	};
	const pct = Math.min(100, Math.round(resumen.minutos / resumen.meta * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "text-2xl font-extrabold",
			children: ["Actividad física de ", activePatient.nombre]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Registro de sesiones y cumplimiento de la meta semanal recomendada (150 minutos)."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-float p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold uppercase text-muted-foreground",
						children: "Sesiones (7 días)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-3xl font-extrabold",
						children: resumen.sesiones
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-float p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold uppercase text-muted-foreground",
						children: "Minutos activos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-3xl font-extrabold",
						children: [resumen.minutos, " min"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-float p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold uppercase text-muted-foreground",
							children: "Meta semanal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-3xl font-extrabold",
							children: [pct, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 h-3 w-full overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary",
								style: { width: `${pct}%` }
							})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: registrar,
				className: "card-float p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl font-extrabold",
					children: "Nueva sesión"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label$1,
							htmlFor: "act-fecha",
							children: "Fecha"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "act-fecha",
							type: "date",
							value: form.fecha,
							onChange: (e) => setForm({
								...form,
								fecha: e.target.value
							}),
							className: field$1
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label$1,
							htmlFor: "act-tipo",
							children: "Tipo de actividad"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "act-tipo",
							value: form.tipo,
							onChange: (e) => setForm({
								...form,
								tipo: e.target.value
							}),
							className: field$1
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: label$1,
								htmlFor: "act-min",
								children: "Minutos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "act-min",
								type: "number",
								min: 1,
								max: 300,
								value: form.minutos,
								onChange: (e) => setForm({
									...form,
									minutos: Number(e.target.value || 0)
								}),
								className: field$1
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: label$1,
								htmlFor: "act-int",
								children: "Intensidad"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "act-int",
								value: form.intensidad,
								onChange: (e) => setForm({
									...form,
									intensidad: e.target.value
								}),
								className: field$1,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Baja" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Media" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Alta" })
								]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label$1,
							htmlFor: "act-notas",
							children: "Notas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "act-notas",
							rows: 3,
							value: form.notas,
							onChange: (e) => setForm({
								...form,
								notas: e.target.value
							}),
							className: field$1
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								className: "size-5",
								"aria-hidden": "true"
							}), "Registrar actividad"]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-float p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl font-extrabold",
					children: "Historial"
				}), activePatient.actividades.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "Aún no hay actividades registradas."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: activePatient.actividades.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-4 rounded-2xl bg-muted p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
								className: "mt-1 size-5 text-primary",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-lg font-bold",
									children: [
										a.tipo,
										" · ",
										a.minutos,
										" min"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [
										a.fecha,
										" · Intensidad ",
										a.intensidad
									]
								}),
								a.notas && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-base",
									children: a.notas
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Eliminar actividad ${a.tipo}`,
							onClick: () => removeActividad(activePatient.id, a.id),
							className: "flex size-11 items-center justify-center rounded-xl text-destructive hover:bg-destructive/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
								className: "size-5",
								"aria-hidden": "true"
							})
						})]
					}, a.id))
				})]
			})]
		})
	] });
}
var field = "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none";
var label = "block text-sm font-bold text-muted-foreground";
function AntropometriaPanel() {
	const { activePatient, addMeasurement, removeMeasurement, updateMeasurementDate } = useStore();
	const medidas = activePatient.medidas;
	const ultima = medidas[medidas.length - 1];
	const previa = medidas[medidas.length - 2];
	const [form, setForm] = (0, import_react.useState)(() => ({ ...emptyMeasurement(isoDate(/* @__PURE__ */ new Date())) }));
	const promedioCambio = (0, import_react.useMemo)(() => {
		if (medidas.length < 2) return 0;
		const total = (ultima?.peso ?? 0) - (medidas[0]?.peso ?? 0);
		return Number((total / (medidas.length - 1)).toFixed(2));
	}, [medidas, ultima]);
	const delta = (a, b) => a !== void 0 && b !== void 0 ? Number((a - b).toFixed(1)) : 0;
	const registrar = (e) => {
		e.preventDefault();
		if (!form.peso) return;
		addMeasurement(activePatient.id, form);
		setForm({ ...emptyMeasurement(isoDate(/* @__PURE__ */ new Date())) });
	};
	const cards = [
		{
			label: "Peso actual",
			value: `${ultima?.peso?.toFixed(1) ?? "—"} kg`,
			delta: delta(ultima?.peso, previa?.peso),
			unidad: "kg"
		},
		{
			label: "Cintura",
			value: `${ultima?.cintura ?? "—"} cm`,
			delta: delta(ultima?.cintura, previa?.cintura),
			unidad: "cm"
		},
		{
			label: "Circunferencia abdominal",
			value: `${ultima?.abdominal ?? "—"} cm`,
			delta: delta(ultima?.abdominal, previa?.abdominal),
			unidad: "cm"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl font-extrabold",
			children: "Seguimiento antropométrico"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-muted-foreground",
			children: [
				"Cambio promedio por consulta: ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [promedioCambio, " kg"] }),
				" ·",
				" ",
				activePatient.excelUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: activePatient.excelUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "font-bold text-primary underline",
					children: "Abrir hoja de cálculo externa"
				}) : "Agregue el enlace a Excel en la ficha clínica"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid gap-4 sm:grid-cols-3",
			children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-float p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold uppercase text-muted-foreground",
						children: c.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-3xl font-extrabold",
						children: c.value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: `mt-1 text-base font-bold ${c.delta < 0 ? "text-primary" : c.delta > 0 ? "text-destructive" : "text-muted-foreground"}`,
						children: [
							c.delta > 0 ? "+" : "",
							c.delta,
							" ",
							c.unidad,
							" vs. consulta anterior"
						]
					})
				]
			}, c.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: registrar,
				className: "card-float p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-extrabold",
						children: "Nueva medición"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label,
							htmlFor: "m-fecha",
							children: "Fecha de la medición"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "m-fecha",
							type: "date",
							value: form.fecha,
							onChange: (e) => setForm({
								...form,
								fecha: e.target.value
							}),
							className: field,
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: CAMPOS_ANTROPOMETRIA.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: label,
							htmlFor: `m-${c.key}`,
							children: [
								c.texto,
								" (",
								c.unidad,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: `m-${c.key}`,
							type: "number",
							step: "0.1",
							value: form[c.key] === 0 ? "" : form[c.key],
							onChange: (e) => setForm({
								...form,
								[c.key]: Number(e.target.value || 0)
							}),
							required: c.key === "peso",
							className: field
						})] }, c.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "mt-5 w-full rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground hover:opacity-90",
						children: "Guardar medición"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-float p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl font-extrabold",
					children: "Evolución de peso"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 h-64 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: medidas.map((m) => ({
								fecha: new Date(m.fecha).toLocaleDateString("es-MX", {
									day: "2-digit",
									month: "short"
								}),
								peso: m.peso
							})),
							margin: {
								top: 10,
								right: 10,
								left: -20,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "4 4",
									stroke: "var(--border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "fecha",
									tick: { fontSize: 13 },
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									domain: ["dataMin - 3", "dataMax + 2"],
									tick: { fontSize: 13 },
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										borderRadius: 16,
										border: "1px solid var(--border)",
										background: "var(--card)",
										color: "var(--foreground)"
									},
									formatter: (v) => [`${v} kg`, "Peso"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "peso",
									fill: "var(--primary)",
									radius: [
										10,
										10,
										0,
										0
									],
									barSize: 40
								})
							]
						})
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "card-float mt-6 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[60rem] text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-sm uppercase tracking-wide text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-4",
							children: "Fecha"
						}),
						CAMPOS_ANTROPOMETRIA.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-4",
							children: c.texto
						}, c.key)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-4",
							children: "Quitar"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [...medidas].reverse().map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border last:border-0 hover:bg-muted/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: m.fecha,
								onChange: (e) => {
									if (e.target.value) updateMeasurementDate(activePatient.id, m.fecha, e.target.value);
								},
								className: "rounded-xl border border-border bg-card px-3 py-2 text-sm font-bold focus:border-primary focus:outline-none"
							})
						}),
						CAMPOS_ANTROPOMETRIA.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-4",
							children: m[c.key] || "—"
						}, c.key)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Eliminar medición del ${m.fecha}`,
								onClick: () => removeMeasurement(activePatient.id, m.fecha),
								className: "flex size-11 items-center justify-center rounded-xl text-destructive hover:bg-destructive/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									className: "size-5",
									"aria-hidden": "true"
								})
							})
						})
					]
				}, m.fecha)) })]
			})
		})
	] });
}
function Dashboard() {
	const { patients, activePatient, setActivePatientId } = useStore();
	const [tab, setTab] = (0, import_react.useState)("pacientes");
	const tabs = [
		{
			id: "pacientes",
			label: "Pacientes",
			icon: Users
		},
		{
			id: "registro",
			label: "Registro y accesos",
			icon: UserPlus
		},
		{
			id: "ficha",
			label: "Ficha clínica",
			icon: ClipboardList
		},
		{
			id: "menu",
			label: "Menú semanal",
			icon: UtensilsCrossed
		},
		{
			id: "medidas",
			label: "Antropometría",
			icon: Ruler
		},
		{
			id: "actividad",
			label: "Actividad física",
			icon: Activity
		},
		{
			id: "timeline",
			label: "Timeline",
			icon: History
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 sm:flex sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							"aria-label": "Volver al selector de perfil",
							className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted hover:bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								className: "size-5",
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate text-xl font-extrabold",
								children: "Panel del nutricionista"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: [patients.length, " pacientes activos"]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						"aria-label": "Paciente seleccionado",
						value: activePatient.id,
						onChange: (e) => setActivePatientId(e.target.value),
						className: "h-11 rounded-xl border border-border bg-card px-3 text-base font-semibold",
						children: patients.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p.id,
							children: p.nombre
						}, p.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mx-auto flex w-full max-w-7xl gap-1 overflow-x-auto px-6",
					children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab(t.id),
						"aria-current": tab === t.id ? "page" : void 0,
						className: `flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-base font-bold transition-colors ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, {
							className: "size-5",
							"aria-hidden": "true"
						}), t.label]
					}, t.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-full max-w-7xl px-6 py-8 pb-24 sm:pb-8",
				children: [
					tab === "pacientes" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TablaPacientes, {}),
					tab === "registro" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegistroPacientes, {}),
					tab === "ficha" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FichaClinica, {}),
					tab === "menu" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorMenu, {}),
					tab === "medidas" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AntropometriaPanel, {}),
					tab === "actividad" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActividadFisica, {}),
					tab === "timeline" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `https://wa.me/${activePatient.telefono}`,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "fixed bottom-20 right-6 z-40 flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-lg font-extrabold text-primary-foreground shadow-[var(--shadow-float)] transition-transform hover:-translate-y-0.5 max-sm:px-4 max-sm:py-3 max-sm:text-base",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
					className: "size-6",
					"aria-hidden": "true"
				}), "WhatsApp"]
			})
		]
	});
}
function adherenciaSemanal(getLog, patientId, plan) {
	const dias = Array.from({ length: 7 }, (_, i) => daysAgo(i));
	let cumplidos = 0;
	dias.forEach((d) => {
		const total = (plan[String(d.getDay())] ?? []).length || 1;
		if (getLog(patientId, isoDate(d)).completados.length / total >= .8) cumplidos++;
	});
	return Math.round(cumplidos / 7 * 100);
}
function TablaPacientes() {
	const { patients, getLog, setActivePatientId, activePatient } = useStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-2xl font-extrabold",
		children: "Gestión y control de pacientes"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "card-float mt-4 overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[46rem] text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border text-sm uppercase tracking-wide text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-6 py-4",
						children: "Paciente"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-6 py-4",
						children: "Edad"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-6 py-4",
						children: "Objetivo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-6 py-4",
						children: "Adherencia 7 días"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-6 py-4",
						children: "Peso actual"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-6 py-4",
						children: "Acciones"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: patients.map((p) => {
				const adh = adherenciaSemanal(getLog, p.id, p.plan);
				const peso = p.medidas[p.medidas.length - 1]?.peso ?? 0;
				const activo = p.id === activePatient.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: `border-b border-border last:border-0 ${activo ? "bg-primary-soft/40" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-6 py-4 font-bold",
							children: p.nombre
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-6 py-4",
							children: [p.edad, " años"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-6 py-4 text-muted-foreground",
							children: p.objetivo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-6 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 w-28 overflow-hidden rounded-full bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-primary",
										style: { width: `${adh}%` }
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold",
									children: [adh, "%"]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-6 py-4",
							children: [peso.toFixed(1), " kg"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-6 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setActivePatientId(p.id),
									className: "rounded-xl bg-muted px-4 py-2 text-sm font-bold hover:bg-secondary",
									children: activo ? "Seleccionado" : "Seleccionar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `https://wa.me/${p.telefono}`,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": `Escribir por WhatsApp a ${p.nombre}`,
									className: "flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
										className: "size-4",
										"aria-hidden": "true"
									}), "WhatsApp"]
								})]
							})
						})
					]
				}, p.id);
			}) })]
		})
	})] });
}
function EditorMenu() {
	const { activePatient, updateBlock, addBlock, removeBlock, updatePatient } = useStore();
	const [dia, setDia] = (0, import_react.useState)(String((/* @__PURE__ */ new Date()).getDay()));
	const [driveUrl, setDriveUrl] = (0, import_react.useState)(activePatient.menuDriveUrl ?? "");
	const bloques = [...activePatient.plan[dia] ?? []].sort((a, b) => MEAL_ORDER.indexOf(a.tipo) - MEAL_ORDER.indexOf(b.tipo));
	const guardarDriveUrl = () => {
		updatePatient(activePatient.id, { menuDriveUrl: driveUrl });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-2xl font-extrabold",
					children: ["Menú semanal de ", activePatient.nombre]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Gestione el plan manual interactivo y/o vincule un documento de Google Drive con el menú semanal."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => addBlock(activePatient.id, dia, "Merienda"),
					className: "flex items-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: "size-5",
						"aria-hidden": "true"
					}), "Agregar tiempo de comida"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "card-float p-6 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold",
						children: "Documento / Menú Semanal en Google Drive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Puede pegar el enlace a un documento de Drive, PDF u Hoja de cálculo para que el paciente también pueda visualizarlo directamente."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "url",
								placeholder: "https://docs.google.com/document/d/...",
								value: driveUrl,
								onChange: (e) => setDriveUrl(e.target.value),
								className: "flex-1 min-w-[18rem] rounded-xl border border-border bg-card px-4 py-3 text-base"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: guardarDriveUrl,
								className: "rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground hover:opacity-90",
								children: "Guardar Enlace de Drive"
							}),
							activePatient.menuDriveUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: activePatient.menuDriveUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "flex items-center gap-2 rounded-xl bg-muted px-4 py-3 font-bold hover:bg-secondary",
								children: "Abrir Documento en Drive"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: WEEKDAYS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setDia(String(i)),
					"aria-pressed": dia === String(i),
					className: `rounded-xl px-4 py-2 font-bold transition-colors ${dia === String(i) ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-secondary"}`,
					children: d
				}, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-5 lg:grid-cols-2",
				children: bloques.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card-float p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								"aria-label": "Tipo de comida",
								value: b.tipo,
								onChange: (e) => updateBlock(activePatient.id, dia, b.id, { tipo: e.target.value }),
								className: "h-11 rounded-xl border border-border bg-card px-3 font-bold text-primary",
								children: MEAL_ORDER.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t,
									children: t
								}, t))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => removeBlock(activePatient.id, dia, b.id),
								"aria-label": `Eliminar ${b.titulo}`,
								className: "flex size-10 items-center justify-center rounded-xl text-destructive hover:bg-destructive/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									className: "size-5",
									"aria-hidden": "true"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mt-4 block text-sm font-bold text-muted-foreground",
							children: "Título"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: b.titulo,
							onChange: (e) => updateBlock(activePatient.id, dia, b.id, { titulo: e.target.value }),
							className: "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base font-semibold focus:border-primary focus:outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mt-4 block text-sm font-bold text-muted-foreground",
							children: "Indicaciones"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: b.descripcion,
							rows: 3,
							onChange: (e) => updateBlock(activePatient.id, dia, b.id, { descripcion: e.target.value }),
							className: "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mt-4 block text-sm font-bold text-muted-foreground",
							children: "Alternativas de intercambio (una por línea)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: b.alternativas.join("\n"),
							rows: 3,
							onChange: (e) => updateBlock(activePatient.id, dia, b.id, { alternativas: e.target.value.split("\n").filter((l) => l.trim() !== "") }),
							className: "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-base focus:border-primary focus:outline-none"
						})
					]
				}, b.id))
			})
		]
	});
}
function Timeline() {
	const { activePatient, getLog } = useStore();
	const dias = Array.from({ length: 10 }, (_, i) => daysAgo(i));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl font-extrabold",
			children: "Timeline de avances"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-muted-foreground",
			children: [
				"Cumplimiento, hidratación, escala de Bristol y notas enviadas por ",
				activePatient.nombre,
				"."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-6 space-y-4",
			children: dias.map((d) => {
				const fecha = isoDate(d);
				const log = getLog(activePatient.id, fecha);
				const total = (activePatient.plan[String(d.getDay())] ?? []).length || 1;
				const pct = Math.round(log.completados.length / total * 100);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "card-float p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-extrabold capitalize",
								children: d.toLocaleDateString("es-MX", {
									weekday: "long",
									day: "numeric",
									month: "long"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `rounded-full px-3 py-1 text-sm font-bold ${pct >= 80 ? "bg-primary-soft text-accent-foreground" : "bg-muted text-muted-foreground"}`,
								children: [pct, "% del plan"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-6 text-base",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: log.agua }),
								" / ",
								activePatient.metaAgua,
								" vasos de agua"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Bristol:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: log.bristol ? `Tipo ${log.bristol} — ${BRISTOL[log.bristol - 1]?.label}` : "Sin registro" })
							] })]
						}),
						log.nota && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 rounded-2xl bg-muted p-4 text-base italic",
							children: [
								"\"",
								log.nota,
								"\""
							]
						})
					]
				}, fecha);
			})
		})
	] });
}
//#endregion
export { Dashboard as component };
