import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as Bell, D as Check, E as ChevronDown, S as Droplets, d as Pill, f as NotebookPen, n as UtensilsCrossed, p as Minus, u as Plus } from "../_libs/lucide-react.mjs";
import { c as MEAL_TIMES, g as isoDate, l as ORINA, n as BRISTOL, s as MEAL_ORDER, v as useStore } from "./store-DWHUTi80.mjs";
import { t as PatientShell } from "./PatientShell-DRbxw3xN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/paciente.index-tkAMn04w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Ilustración sencilla y de alto contraste para cada tipo de la escala de Bristol. */
function BristolIcon({ n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 60 32",
		className: "h-8 w-full",
		"aria-hidden": "true",
		fill: "currentColor",
		children: [
			n === 1 && [
				6,
				20,
				34,
				48
			].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: x,
				cy: 16,
				r: 5
			}, x)),
			n === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "4",
					y: "8",
					width: "52",
					height: "16",
					rx: "8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "16",
					cy: "16",
					r: "7",
					opacity: "0.45"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "30",
					cy: "16",
					r: "7",
					opacity: "0.45"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "44",
					cy: "16",
					r: "7",
					opacity: "0.45"
				})
			] }),
			n === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "4",
					y: "10",
					width: "52",
					height: "12",
					rx: "6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "18",
					y: "10",
					width: "2",
					height: "12",
					fill: "var(--card)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "34",
					y: "10",
					width: "2",
					height: "12",
					fill: "var(--card)"
				})
			] }),
			n === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "4",
				y: "11",
				width: "52",
				height: "10",
				rx: "5"
			}),
			n === 5 && [
				10,
				30,
				50
			].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: x,
				cy: 16,
				rx: 8,
				ry: 6
			}, x)),
			n === 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "14",
					cy: "14",
					rx: "9",
					ry: "6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "32",
					cy: "19",
					rx: "10",
					ry: "6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "48",
					cy: "13",
					rx: "7",
					ry: "5"
				})
			] }),
			n === 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 20c8-8 14 6 22-2s16 8 24 0v8H2z" })
		]
	});
}
function EscalaBristol({ fecha }) {
	const { activePatient, getLog, updateLog } = useStore();
	const log = getLog(activePatient.id, fecha);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xl text-muted-foreground",
			children: "¿Cómo estuvo su digestión hoy? Toque el dibujo que más se parezca."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7",
			children: BRISTOL.map((b) => {
				const sel = log.bristol === b.n;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => updateLog(activePatient.id, fecha, { bristol: b.n }),
					"aria-pressed": sel,
					"aria-label": `Tipo ${b.n}: ${b.label}. ${b.desc}`,
					className: `flex min-h-32 flex-col items-center justify-center gap-2 rounded-2xl border-2 p-3 transition-colors ${sel ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-muted"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl font-extrabold",
							children: b.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BristolIcon, { n: b.n }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-center text-sm font-bold leading-tight",
							children: b.label
						})
					]
				}, b.n);
			})
		}),
		log.bristol && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-lg font-semibold text-muted-foreground",
			children: [
				"Tipo ",
				log.bristol,
				": ",
				BRISTOL[log.bristol - 1]?.label,
				" (",
				BRISTOL[log.bristol - 1]?.desc,
				")"
			]
		})
	] });
}
function EscalaOrina({ fecha }) {
	const { activePatient, getLog, updateLog } = useStore();
	const log = getLog(activePatient.id, fecha);
	const sel = log.orina ? ORINA[log.orina - 1] : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xl text-muted-foreground",
			children: "¿De qué color fue su orina hoy? Toque el color más parecido."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid grid-cols-4 gap-3 sm:grid-cols-7",
			children: ORINA.map((o) => {
				const activo = log.orina === o.n;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => updateLog(activePatient.id, fecha, { orina: o.n }),
					"aria-pressed": activo,
					"aria-label": `Nivel ${o.n}: ${o.label}. ${o.desc}`,
					className: `flex flex-col items-center gap-2 rounded-2xl border-2 p-2 transition-colors ${activo ? "border-primary bg-primary-soft" : "border-border bg-card hover:bg-muted"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block h-16 w-full rounded-xl border-2 border-border",
						style: { backgroundColor: o.color }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-extrabold",
						children: o.n
					})]
				}, o.n);
			})
		}),
		sel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-lg font-semibold text-muted-foreground",
			children: [
				sel.label,
				": ",
				sel.desc
			]
		})
	] });
}
var ICONOS = {
	agua: Droplets,
	comida: UtensilsCrossed,
	medicacion: Pill
};
function Recordatorios({ fecha }) {
	const { activePatient, getLog, updateLog, toggleMeal } = useStore();
	const log = getLog(activePatient.id, fecha);
	const dia = String((/* @__PURE__ */ new Date(`${fecha}T12:00:00`)).getDay());
	const items = [
		...[...activePatient.plan[dia] ?? []].sort((a, b) => MEAL_ORDER.indexOf(a.tipo) - MEAL_ORDER.indexOf(b.tipo)).map((b) => ({
			id: `comida-${b.id}`,
			hora: MEAL_TIMES[b.tipo],
			titulo: b.tipo,
			detalle: b.titulo,
			tipo: "comida",
			hecho: log.completados.includes(b.id),
			accion: () => toggleMeal(activePatient.id, fecha, b.id)
		})),
		...activePatient.medicacion.flatMap((m) => {
			const horarios = m.horariosNotificables && m.horariosNotificables.filter(Boolean).length > 0 ? m.horariosNotificables.filter(Boolean) : [m.horario || "08:00"];
			return horarios.map((h, idx) => {
				const keyId = `med-${m.id}-${idx}-${h}`;
				const hecho = log.medicacionTomada.includes(keyId) || horarios.length === 1 && log.medicacionTomada.includes(m.id);
				return {
					id: keyId,
					hora: h,
					titulo: `Tomar ${m.tipo}`,
					detalle: `${m.gramaje}${horarios.length > 1 ? ` · Toma ${idx + 1}` : ""}`,
					tipo: "medicacion",
					hecho,
					accion: () => updateLog(activePatient.id, fecha, { medicacionTomada: hecho ? log.medicacionTomada.filter((x) => x !== keyId && x !== m.id) : [
						...log.medicacionTomada,
						keyId,
						...horarios.length === 1 ? [m.id] : []
					] })
				};
			});
		}),
		{
			id: "agua",
			hora: "Todo el día",
			titulo: "Tomar agua",
			detalle: `${log.agua} de ${activePatient.metaAgua} vasos`,
			tipo: "agua",
			hecho: log.agua >= activePatient.metaAgua,
			accion: () => updateLog(activePatient.id, fecha, { agua: Math.min(20, log.agua + 1) })
		}
	].sort((a, b) => a.hora.localeCompare(b.hora));
	const pendientes = items.filter((i) => !i.hecho).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "titulo-recordatorios",
		className: "mt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				id: "titulo-recordatorios",
				className: "flex items-center gap-2 text-2xl font-extrabold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
					className: "size-7 text-primary",
					"aria-hidden": "true"
				}), "Mis recordatorios de hoy"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-lg text-muted-foreground",
				children: pendientes === 0 ? "¡Todo listo por hoy!" : `Le faltan ${pendientes} por marcar.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: items.map((r) => {
					const Icono = ICONOS[r.tipo];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: r.accion,
						"aria-pressed": r.hecho,
						className: `flex w-full items-center gap-4 rounded-3xl border-2 p-4 text-left transition-colors ${r.hecho ? "border-primary bg-primary-soft" : "border-border bg-card hover:bg-muted"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icono, {
									className: "size-7",
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xl font-extrabold",
									children: r.titulo
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-lg text-muted-foreground",
									children: [
										r.hora,
										" · ",
										r.detalle
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 ${r.hecho ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-7",
									"aria-hidden": "true"
								})
							})
						]
					}) }, r.id);
				})
			})
		]
	});
}
function PacienteHoy() {
	const { activePatient, getLog, toggleMeal, updateLog } = useStore();
	const hoy = /* @__PURE__ */ new Date();
	const fecha = isoDate(hoy);
	const log = getLog(activePatient.id, fecha);
	const bloques = [...activePatient.plan[String(hoy.getDay())] ?? []].sort((a, b) => MEAL_ORDER.indexOf(a.tipo) - MEAL_ORDER.indexOf(b.tipo));
	const [abierto, setAbierto] = (0, import_react.useState)(null);
	const fechaLarga = hoy.toLocaleDateString("es-MX", {
		weekday: "long",
		day: "numeric",
		month: "long"
	});
	const hora = hoy.getHours();
	const saludo = hora < 12 ? "Buenos días" : hora < 19 ? "Buenas tardes" : "Buenas noches";
	const nombreCorto = activePatient.nombre.split(" ").slice(0, 2).join(" ");
	const metaAguaVasos = activePatient.requerimientoHidricoMl ? Math.max(1, Math.round(activePatient.requerimientoHidricoMl / 250)) : activePatient.metaAgua || 8;
	const totalHidricoMl = activePatient.requerimientoHidricoMl ?? metaAguaVasos * 250;
	const setAgua = (n) => updateLog(activePatient.id, fecha, { agua: Math.max(0, Math.min(30, n)) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PatientShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-semibold capitalize text-muted-foreground",
					children: fechaLarga
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 text-3xl font-extrabold sm:text-4xl",
					children: [
						saludo,
						", ",
						nombreCorto
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-lg text-muted-foreground",
					children: [
						"Hoy tiene ",
						bloques.length,
						" tiempos de comida. Vamos paso a paso."
					]
				}),
				(activePatient.menuDriveUrl || activePatient.encuestaFrecuenciaUrl) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-3",
					children: [activePatient.menuDriveUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: activePatient.menuDriveUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "tap-target inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-lg font-bold text-primary-foreground hover:opacity-90",
						children: "Ver Menú Semanal en Documento / Drive"
					}), activePatient.encuestaFrecuenciaUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: activePatient.encuestaFrecuenciaUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "tap-target inline-flex items-center gap-2 rounded-2xl bg-muted px-5 py-3 text-lg font-bold text-foreground hover:bg-secondary",
						children: "Responder Encuesta de Frecuencia de Consumo"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recordatorios, { fecha }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"aria-labelledby": "titulo-comidas",
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "titulo-comidas",
				className: "text-2xl font-extrabold",
				children: "Mi plan de comidas"
			}), bloques.map((b) => {
				const hecho = log.completados.includes(b.id);
				const open = abierto === b.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card-float overflow-hidden p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base font-bold uppercase tracking-wide text-primary",
									children: b.tipo
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 text-2xl font-extrabold",
									children: b.titulo
								})]
							}), hecho && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 rounded-full bg-primary-soft px-3 py-1 text-base font-bold text-accent-foreground",
								children: "Listo"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xl leading-relaxed text-foreground",
							children: b.descripcion
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleMeal(activePatient.id, fecha, b.id),
								"aria-pressed": hecho,
								className: `tap-target flex flex-1 items-center justify-center gap-3 rounded-2xl px-6 text-xl font-extrabold transition-colors ${hecho ? "bg-primary text-primary-foreground" : "border-2 border-primary bg-card text-primary hover:bg-primary-soft"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-7",
									"aria-hidden": "true"
								}), hecho ? "Completado" : "Marcar completado"]
							}), b.alternativas.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setAbierto(open ? null : b.id),
								"aria-expanded": open,
								className: "tap-target flex items-center justify-center gap-2 rounded-2xl bg-muted px-6 text-xl font-bold text-foreground hover:bg-secondary",
								children: ["Ver alternativa", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
									className: `size-6 transition-transform ${open ? "rotate-180" : ""}`,
									"aria-hidden": "true"
								})]
							})]
						}),
						open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3 rounded-2xl bg-muted p-4",
							children: b.alternativas.map((alt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3 text-xl leading-relaxed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									className: "font-bold text-primary",
									children: "•"
								}), alt]
							}, alt))
						})
					]
				}, b.id);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"aria-labelledby": "titulo-agua",
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "titulo-agua",
				className: "text-2xl font-extrabold",
				children: "Mi agua de hoy"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-float mt-4 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xl text-muted-foreground",
						children: [
							"Requerimiento hídrico: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [totalHidricoMl, " mL"] }),
							" (",
							metaAguaVasos,
							" vasos de 250 mL al día)"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-5xl font-extrabold text-water",
						children: [log.agua, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-2xl font-bold text-muted-foreground",
							children: [
								" ",
								"/ ",
								metaAguaVasos,
								" vasos (",
								log.agua * 250,
								" mL)"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex flex-wrap gap-3",
						role: "img",
						"aria-label": `${log.agua} de ${metaAguaVasos} vasos tomados`,
						children: Array.from({ length: metaAguaVasos }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setAgua(i + 1),
							className: `flex size-12 items-center justify-center rounded-2xl border-2 transition-colors ${i < log.agua ? "border-water bg-water-soft text-water" : "border-border bg-muted text-muted-foreground hover:bg-secondary"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
								className: "size-6",
								"aria-hidden": "true"
							})
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setAgua(log.agua - 1),
							"aria-label": "Quitar un vaso de agua",
							className: "tap-target flex flex-1 items-center justify-center rounded-2xl bg-muted text-foreground hover:bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
								className: "size-8",
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setAgua(log.agua + 1),
							"aria-label": "Agregar un vaso de agua",
							className: "tap-target flex flex-[2] items-center justify-center gap-3 rounded-2xl bg-water text-xl font-extrabold text-primary-foreground hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								className: "size-8",
								"aria-hidden": "true"
							}), "Tomé un vaso (250 mL)"]
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"aria-labelledby": "titulo-registro",
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "titulo-registro",
				className: "text-2xl font-extrabold",
				children: "Mi registro del día"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-float mt-4 space-y-6 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EscalaBristol, { fecha }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EscalaOrina, { fecha }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "nota",
						className: "mt-6 block text-xl font-bold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, {
								className: "size-6 text-primary",
								"aria-hidden": "true"
							}), "Notas para mi nutricionista"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "nota",
						value: log.nota,
						onChange: (e) => updateLog(activePatient.id, fecha, { nota: e.target.value }),
						rows: 4,
						placeholder: "Escriba aquí cómo se sintió hoy...",
						className: "mt-3 w-full rounded-2xl border-2 border-border bg-card p-4 text-xl leading-relaxed placeholder:text-muted-foreground focus:border-primary focus:outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-base text-muted-foreground",
						children: "Puede usar el micrófono del teclado de su teléfono para dictar el texto."
					})
				]
			})]
		})
	] });
}
//#endregion
export { PacienteHoy as component };
