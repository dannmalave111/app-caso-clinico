import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { N as Activity, a as Trash2, u as Plus } from "../_libs/lucide-react.mjs";
import { g as isoDate, m as daysAgo, v as useStore } from "./store-DWHUTi80.mjs";
import { a as Line, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as LineChart, o as CartesianGrid, r as YAxis, s as Bar, t as BarChart } from "../_libs/recharts+[...].mjs";
import { t as PatientShell } from "./PatientShell-DRbxw3xN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/paciente.progreso-CKVggcwU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Progreso() {
	const { activePatient, getLog, addActividad, removeActividad } = useStore();
	const [tipoAct, setTipoAct] = (0, import_react.useState)("");
	const [minutosAct, setMinutosAct] = (0, import_react.useState)(0);
	const [intensidadAct, setIntensidadAct] = (0, import_react.useState)("Baja");
	const [notasAct, setNotasAct] = (0, import_react.useState)("");
	const registrarActividadPaciente = (e) => {
		e.preventDefault();
		if (!tipoAct.trim()) return;
		addActividad(activePatient.id, {
			fecha: isoDate(/* @__PURE__ */ new Date()),
			tipo: tipoAct.trim(),
			minutos: Number(minutosAct) || 30,
			intensidad: intensidadAct,
			notas: notasAct.trim()
		});
		setNotasAct("");
	};
	const data = Array.from({ length: 7 }, (_, i) => daysAgo(6 - i)).map((d) => {
		const log = getLog(activePatient.id, isoDate(d));
		const total = (activePatient.plan[String(d.getDay())] ?? []).length || 1;
		return {
			dia: d.toLocaleDateString("es-MX", { weekday: "short" }),
			comidas: Math.round(log.completados.length / total * 100),
			agua: log.agua
		};
	});
	const diasCumplidos = data.filter((d) => d.comidas >= 80).length;
	const promedioAgua = Math.round(data.reduce((s, d) => s + d.agua, 0) / data.length * 10) / 10;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PatientShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-extrabold sm:text-4xl",
				children: "Mi progreso"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-lg text-muted-foreground",
				children: "Su constancia de los últimos 7 días y registro de actividad física."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-float p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-semibold text-muted-foreground",
					children: "Días de dieta cumplidos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-5xl font-extrabold text-primary",
					children: [diasCumplidos, " / 7"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-float p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-semibold text-muted-foreground",
					children: "Promedio de agua"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-5xl font-extrabold text-water",
					children: [promedioAgua, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl font-bold text-muted-foreground",
						children: " vasos"
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card-float mt-6 p-6 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-7 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-extrabold",
						children: "Mi Actividad Física"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base text-muted-foreground",
					children: "Registre los ejercicios o caminatas que realiza durante el día. Su nutricionista los podrá ver en su panel."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: registrarActividadPaciente,
					className: "space-y-4 rounded-2xl bg-muted/40 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "p-act-tipo",
									className: "block text-sm font-bold text-muted-foreground",
									children: "Tipo de actividad"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "p-act-tipo",
									value: tipoAct,
									onChange: (e) => setTipoAct(e.target.value),
									placeholder: "Ej. Caminata, Baile, Natación",
									className: "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-lg font-bold"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "p-act-min",
									className: "block text-sm font-bold text-muted-foreground",
									children: "Duración (minutos)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "p-act-min",
									type: "number",
									min: 1,
									max: 300,
									value: minutosAct,
									onChange: (e) => setMinutosAct(Number(e.target.value)),
									className: "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-lg font-bold"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "p-act-int",
									className: "block text-sm font-bold text-muted-foreground",
									children: "Intensidad"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "p-act-int",
									value: intensidadAct,
									onChange: (e) => setIntensidadAct(e.target.value),
									className: "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-lg font-bold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Baja",
											children: "Baja (suave)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Media",
											children: "Media (moderada)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Alta",
											children: "Alta (intensa)"
										})
									]
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "p-act-notas",
							className: "block text-sm font-bold text-muted-foreground",
							children: "Comentarios o notas (opcional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "p-act-notas",
							value: notasAct,
							onChange: (e) => setNotasAct(e.target.value),
							placeholder: "Ej. Me sentí muy bien, sin dolores",
							className: "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-lg font-medium"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "tap-target flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-xl font-bold text-primary-foreground hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-6" }), "Registrar mi actividad física"]
						})
					]
				}),
				activePatient.actividades.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold",
						children: "Mis actividades registradas:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-3",
						children: activePatient.actividades.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-4 rounded-2xl bg-card border border-border p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-lg font-bold text-foreground",
									children: [
										a.tipo,
										" · ",
										a.minutos,
										" minutos"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [
										"Fecha: ",
										a.fecha,
										" · Intensidad ",
										a.intensidad
									]
								}),
								a.notas && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-base italic",
									children: a.notas
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => removeActividad(activePatient.id, a.id),
								"aria-label": `Eliminar actividad ${a.tipo}`,
								className: "flex size-10 items-center justify-center rounded-xl text-destructive hover:bg-destructive/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-5" })
							})]
						}, a.id))
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card-float mt-6 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-extrabold",
				children: "Comidas cumplidas (%)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 h-64 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data,
						margin: {
							top: 10,
							right: 5,
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
								dataKey: "dia",
								tick: {
									fontSize: 16,
									fill: "var(--muted-foreground)"
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								domain: [0, 100],
								tick: {
									fontSize: 16,
									fill: "var(--muted-foreground)"
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									borderRadius: 16,
									border: "1px solid var(--border)",
									fontSize: 16,
									background: "var(--card)",
									color: "var(--foreground)"
								},
								formatter: (v) => [`${v}%`, "Cumplido"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "comidas",
								fill: "var(--primary)",
								radius: [
									12,
									12,
									0,
									0
								],
								barSize: 34
							})
						]
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card-float mt-6 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-extrabold",
				children: "Vasos de agua por día"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 h-64 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data,
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
								dataKey: "dia",
								tick: {
									fontSize: 16,
									fill: "var(--muted-foreground)"
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								domain: [0, Math.max(10, activePatient.metaAgua + 2)],
								tick: {
									fontSize: 16,
									fill: "var(--muted-foreground)"
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									borderRadius: 16,
									border: "1px solid var(--border)",
									fontSize: 16,
									background: "var(--card)",
									color: "var(--foreground)"
								},
								formatter: (v) => [`${v} vasos`, "Agua"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "agua",
								stroke: "var(--water)",
								strokeWidth: 4,
								dot: {
									r: 6,
									fill: "var(--water)"
								}
							})
						]
					})
				})
			})]
		})
	] });
}
//#endregion
export { Progreso as component };
