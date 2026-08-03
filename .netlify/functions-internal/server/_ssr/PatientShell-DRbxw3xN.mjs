import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { O as ChartLine, h as LogOut, k as CalendarHeart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PatientShell-DRbxw3xN.js
var import_jsx_runtime = require_jsx_runtime();
function PatientShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background pb-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto w-full max-w-2xl px-5 pt-6",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": "Navegación principal",
			className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-2xl items-stretch gap-2 px-4 py-3",
				children: [[{
					to: "/paciente",
					label: "Hoy",
					icon: CalendarHeart
				}, {
					to: "/paciente/progreso",
					label: "Progreso",
					icon: ChartLine
				}].map((item) => {
					const active = pathname === item.to;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: `tap-target flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-lg font-bold transition-colors ${active ? "bg-primary-soft text-accent-foreground" : "text-muted-foreground hover:bg-muted"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
							className: "size-7",
							"aria-hidden": "true"
						}), item.label]
					}, item.to);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					"aria-label": "Cambiar de perfil",
					className: "tap-target flex flex-col items-center justify-center gap-1 rounded-2xl px-4 text-lg font-bold text-muted-foreground hover:bg-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
						className: "size-7",
						"aria-hidden": "true"
					}), "Salir"]
				})]
			})
		})]
	});
}
//#endregion
export { PatientShell as t };
