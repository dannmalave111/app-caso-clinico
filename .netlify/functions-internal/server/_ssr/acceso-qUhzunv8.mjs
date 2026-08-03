import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as patientEmail, r as patientPassword } from "./patients.shared-D1J8O4CK.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as supabase } from "./client-DCvJSF2o.mjs";
import { n as Label, t as Input } from "./label-CmIE8x5o.mjs";
import { M as ArrowLeft, v as HeartPulse } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/acceso-qUhzunv8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var normalizar = (v) => v.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
function AccesoPaciente() {
	const navigate = useNavigate();
	const [nombre, setNombre] = (0, import_react.useState)("");
	const [codigo, setCodigo] = (0, import_react.useState)("");
	const [cargando, setCargando] = (0, import_react.useState)(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		const code = codigo.trim();
		if (!/^[0-9]{6}$/.test(code)) {
			toast.error("El código debe tener 6 números");
			return;
		}
		setCargando(true);
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: patientEmail(code),
				password: patientPassword(code)
			});
			if (error || !data.user) throw new Error("Código incorrecto");
			const { data: ficha } = await supabase.from("patients").select("nombre").eq("user_id", data.user.id).maybeSingle();
			if (!ficha || normalizar(ficha.nombre) !== normalizar(nombre)) {
				await supabase.auth.signOut();
				throw new Error("El nombre no coincide con el código");
			}
			toast.success(`Bienvenido, ${ficha.nombre}`);
			navigate({ to: "/paciente" });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "No se pudo entrar");
		} finally {
			setCargando(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-background px-5 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-6 inline-flex items-center gap-2 text-lg font-bold text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						className: "size-6",
						"aria-hidden": "true"
					}), "Volver"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-float p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-14 items-center justify-center rounded-2xl bg-primary-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, {
								className: "size-8 text-primary",
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 text-3xl font-extrabold",
							children: "Entrar como paciente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xl text-muted-foreground",
							children: "Escriba su nombre y el código de 6 números que le dio su nutricionista."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit,
							className: "mt-6 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "nombre",
										className: "text-xl font-bold",
										children: "Su nombre"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "nombre",
										required: true,
										maxLength: 80,
										value: nombre,
										onChange: (e) => setNombre(e.target.value),
										className: "tap-target rounded-2xl text-xl",
										placeholder: "Doña Carmen Ruiz"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "codigo",
										className: "text-xl font-bold",
										children: "Código de acceso"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "codigo",
										required: true,
										inputMode: "numeric",
										maxLength: 6,
										value: codigo,
										onChange: (e) => setCodigo(e.target.value.replace(/[^0-9]/g, "")),
										className: "tap-target rounded-2xl text-center text-3xl font-extrabold tracking-[0.3em]",
										placeholder: "000000"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: cargando,
									className: "tap-target w-full rounded-2xl text-xl font-bold",
									children: "Entrar"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-lg text-muted-foreground",
					children: [
						"¿Es nutricionista?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "font-bold text-primary underline underline-offset-4",
							children: "Acceso profesional"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { AccesoPaciente as component };
