import { i as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { t as supabase } from "./client-DCvJSF2o.mjs";
import { P as Accessibility, l as RotateCcw, t as X } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { d as SIZES_ACCESIBILIDAD, f as StoreProvider, i as CONTRASTS_ACCESIBILIDAD, t as A11Y_STORAGE_KEY } from "./store-DWHUTi80.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C9ZFY6z8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DyllvXmH.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var DEFAULTS = {
	fontScale: 1,
	contrast: "normal",
	focoAlto: false
};
var Ctx = (0, import_react.createContext)(null);
function AccessibilityProvider({ children }) {
	const [settings, setSettings] = (0, import_react.useState)(DEFAULTS);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(A11Y_STORAGE_KEY);
			if (raw) setSettings({
				...DEFAULTS,
				...JSON.parse(raw)
			});
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		root.style.fontSize = `${settings.fontScale * 100}%`;
		root.classList.toggle("dark", settings.contrast === "oscuro");
		root.classList.toggle("contraste-alto", settings.contrast === "alto");
		root.classList.toggle("foco-alto", settings.focoAlto);
		try {
			localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
		} catch {}
	}, [settings]);
	const value = (0, import_react.useMemo)(() => ({
		...settings,
		setFontScale: (fontScale) => setSettings((s) => ({
			...s,
			fontScale
		})),
		setContrast: (contrast) => setSettings((s) => ({
			...s,
			contrast
		})),
		setFocoAlto: (focoAlto) => setSettings((s) => ({
			...s,
			focoAlto
		})),
		reset: () => setSettings(DEFAULTS)
	}), [settings]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useAccessibility() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("useAccessibility debe usarse dentro de AccessibilityProvider");
	return ctx;
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function AccessibilityPanel() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const a11y = useAccessibility();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Ajustes de accesibilidad",
				className: "tap-target fixed right-4 top-4 z-50 flex items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accessibility, {
					className: "size-8",
					"aria-hidden": "true"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-full overflow-y-auto sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
					className: "text-3xl font-extrabold",
					children: "Accesibilidad"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
					className: "text-lg",
					children: "Ajusta la aplicación para verla y usarla con más comodidad."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-8 px-4 pb-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-labelledby": "a11y-tamano",
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "a11y-tamano",
							className: "text-xl font-bold",
							children: "Tamaño de la letra"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-3",
							children: SIZES_ACCESIBILIDAD.map((s) => {
								const active = a11y.fontScale === s.value;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => a11y.setFontScale(s.value),
									"aria-pressed": active,
									className: `tap-target rounded-2xl border-2 px-4 py-3 font-bold transition-colors ${active ? "border-primary bg-primary-soft text-accent-foreground" : "border-border bg-card text-foreground hover:bg-muted"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { fontSize: `${s.value}rem` },
										children: "Aa"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-base",
										children: s.label
									})]
								}, s.value);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-labelledby": "a11y-contraste",
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "a11y-contraste",
							className: "text-xl font-bold",
							children: "Contraste y colores"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: CONTRASTS_ACCESIBILIDAD.map((c) => {
								const active = a11y.contrast === c.value;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => a11y.setContrast(c.value),
									"aria-pressed": active,
									className: `tap-target flex w-full flex-col items-start justify-center rounded-2xl border-2 px-4 py-3 text-left transition-colors ${active ? "border-primary bg-primary-soft text-accent-foreground" : "border-border bg-card text-foreground hover:bg-muted"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg font-bold",
										children: c.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base text-muted-foreground",
										children: c.desc
									})]
								}, c.value);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-labelledby": "a11y-foco",
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "a11y-foco",
							className: "text-xl font-bold",
							children: "Modo de alto enfoque"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-4 rounded-2xl border-2 border-border bg-card px-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg",
								children: "Resalta el elemento seleccionado y reduce animaciones y distracciones."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: a11y.focoAlto,
								onCheckedChange: a11y.setFocoAlto,
								"aria-label": "Activar modo de alto enfoque",
								className: "scale-150"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: a11y.reset,
						className: "tap-target w-full rounded-2xl text-lg font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
							className: "size-6",
							"aria-hidden": "true"
						}), "Restablecer ajustes"]
					})
				]
			})]
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "NutriCuida — Seguimiento nutricional accesible" },
			{
				name: "description",
				content: "Plan de alimentación, hidratación y seguimiento clínico en una app clara y fácil de usar."
			},
			{
				property: "og:title",
				content: "NutriCuida"
			},
			{
				property: "og:description",
				content: "Seguimiento nutricional para pacientes y nutricionistas."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessibilityProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StoreProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessibilityPanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-center",
				richColors: true
			})
		] }) })
	});
}
var $$splitComponentImporter$6 = () => import("./routes-C5eznPFN.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "NutriCuida — Plan de alimentación acompañado" },
		{
			name: "description",
			content: "App de seguimiento nutricional accesible: plan diario para el paciente y panel de control para el nutricionista."
		},
		{
			property: "og:title",
			content: "NutriCuida — Plan de alimentación acompañado"
		},
		{
			property: "og:description",
			content: "Plan de comidas, hidratación y seguimiento clínico en una sola aplicación fácil de usar."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./route-Di7iQBCH.mjs");
var Route$5 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./acceso-qUhzunv8.mjs");
var Route$4 = createFileRoute("/acceso")({
	head: () => ({ meta: [
		{ title: "Entrar como paciente — NutriCuida" },
		{
			name: "description",
			content: "Escriba su nombre y el código de acceso que le dio su nutricionista para ver su plan del día."
		},
		{
			property: "og:title",
			content: "Entrar como paciente — NutriCuida"
		},
		{
			property: "og:description",
			content: "Acceso sencillo con nombre y código de 6 dígitos."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./auth-_lwI2hMy.mjs");
var Route$3 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Acceso del nutricionista — NutriCuida" },
		{
			name: "description",
			content: "Inicie sesión o cree su cuenta profesional para gestionar pacientes, menús y seguimiento."
		},
		{
			property: "og:title",
			content: "Acceso del nutricionista — NutriCuida"
		},
		{
			property: "og:description",
			content: "Panel profesional para registrar pacientes y dar seguimiento nutricional."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./nutricionista-D9frUhEu.mjs");
var Route$2 = createFileRoute("/_authenticated/nutricionista")({
	head: () => ({ meta: [
		{ title: "Panel del nutricionista — NutriCuida" },
		{
			name: "description",
			content: "Gestione pacientes, asigne menús semanales, registre medidas antropométricas y revise el avance diario."
		},
		{
			property: "og:title",
			content: "Panel del nutricionista — NutriCuida"
		},
		{
			property: "og:description",
			content: "Dashboard clínico con menús, antropometría, timeline de avances y contacto directo."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./paciente.index-tkAMn04w.mjs");
var Route$1 = createFileRoute("/_authenticated/paciente/")({
	head: () => ({ meta: [
		{ title: "Mi día — NutriCuida" },
		{
			name: "description",
			content: "Vea su plan de comidas de hoy, registre sus vasos de agua y su registro diario de digestión."
		},
		{
			property: "og:title",
			content: "Mi día — NutriCuida"
		},
		{
			property: "og:description",
			content: "Plan de comidas del día, hidratación y notas para el nutricionista."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./paciente.progreso-CKVggcwU.mjs");
var Route = createFileRoute("/_authenticated/paciente/progreso")({
	head: () => ({ meta: [
		{ title: "Mi progreso — NutriCuida" },
		{
			name: "description",
			content: "Vea de forma sencilla su constancia de la semana: comidas cumplidas y vasos de agua."
		},
		{
			property: "og:title",
			content: "Mi progreso — NutriCuida"
		},
		{
			property: "og:description",
			content: "Gráficas claras de constancia semanal en dieta e hidratación."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var AuthenticatedRouteRoute = Route$5.update({
	id: "/_authenticated",
	getParentRoute: () => Route$7
});
var AccesoRoute = Route$4.update({
	id: "/acceso",
	path: "/acceso",
	getParentRoute: () => Route$7
});
var AuthRoute = Route$3.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$7
});
var AuthenticatedNutricionistaRoute = Route$2.update({
	id: "/nutricionista",
	path: "/nutricionista",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPacienteIndexRoute = Route$1.update({
	id: "/paciente/",
	path: "/paciente/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedNutricionistaRoute,
	AuthenticatedPacienteProgresoRoute: Route.update({
		id: "/paciente/progreso",
		path: "/paciente/progreso",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedPacienteIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AccesoRoute,
	AuthRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
