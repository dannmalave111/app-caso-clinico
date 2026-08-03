import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { j as ArrowRight, o as Stethoscope, v as HeartPulse } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C5eznPFN.js
var import_jsx_runtime = require_jsx_runtime();
function RoleSelector() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-background px-5 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex size-16 items-center justify-center rounded-3xl bg-primary-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, {
							className: "size-9 text-primary",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 text-4xl font-extrabold sm:text-5xl",
						children: "NutriCuida"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-xl text-xl text-muted-foreground",
						children: "Bienvenido. Elija cómo desea entrar hoy."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/acceso",
					className: "card-float group flex flex-col gap-3 p-8 transition-transform hover:-translate-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-14 items-center justify-center rounded-2xl bg-primary-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, {
								className: "size-8 text-primary",
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-extrabold",
							children: "Soy paciente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg text-muted-foreground",
							children: "Mi plan de comidas de hoy, mis vasos de agua y mi registro diario."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-2 inline-flex items-center gap-2 text-lg font-bold text-primary",
							children: ["Entrar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "size-5",
								"aria-hidden": "true"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/auth",
					className: "card-float group flex flex-col gap-3 p-8 transition-transform hover:-translate-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-14 items-center justify-center rounded-2xl bg-water-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, {
								className: "size-8 text-water",
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-extrabold",
							children: "Soy nutricionista"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg text-muted-foreground",
							children: "Panel de pacientes, menús, medidas y seguimiento de avances."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-2 inline-flex items-center gap-2 text-lg font-bold text-water",
							children: ["Entrar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "size-5",
								"aria-hidden": "true"
							})]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { RoleSelector as component };
