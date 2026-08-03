import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as supabase } from "./client-DCvJSF2o.mjs";
import { n as Label, t as Input } from "./label-CmIE8x5o.mjs";
import { M as ArrowLeft, o as Stethoscope } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as claimNutricionista, o as registerNutricionista, t as autoConfirmNutricionista } from "./patients.functions-I4wi3pAr.mjs";
import { t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-_lwI2hMy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		redirect_uri: opts?.redirect_uri ?? window.location.origin,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
function AuthPage() {
	const navigate = useNavigate();
	const [modo, setModo] = (0, import_react.useState)("entrar");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [cargando, setCargando] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({ to: "/nutricionista" });
		});
	}, [navigate]);
	const entrarComoNutricionista = async () => {
		try {
			await claimNutricionista();
			toast.success("Sesión iniciada");
			navigate({ to: "/nutricionista" });
		} catch {
			toast.error("No se pudo confirmar su perfil profesional");
		}
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		if (password.length < 6) {
			toast.error("La contraseña debe tener al menos 6 caracteres");
			return;
		}
		setCargando(true);
		try {
			if (modo === "crear") {
				let registroExitoso = false;
				try {
					await registerNutricionista({ data: {
						email: email.trim(),
						password
					} });
					registroExitoso = true;
				} catch {
					const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
						email: email.trim(),
						password,
						options: { emailRedirectTo: window.location.origin }
					});
					if (signUpError) throw signUpError;
					try {
						await autoConfirmNutricionista({ data: { email: email.trim() } });
						registroExitoso = true;
					} catch {
						if (!signUpData.session) {
							toast.success("Cuenta creada. Si no recibe correo de verificación, desactive 'Confirm Email' en Supabase.");
							setCargando(false);
							return;
						}
						registroExitoso = true;
					}
				}
				if (registroExitoso) {
					const { error: signInError } = await supabase.auth.signInWithPassword({
						email: email.trim(),
						password
					});
					if (signInError) throw signInError;
				}
			} else {
				let { error } = await supabase.auth.signInWithPassword({
					email: email.trim(),
					password
				});
				if (error && error.message.toLowerCase().includes("email not confirmed")) try {
					await autoConfirmNutricionista({ data: { email: email.trim() } });
					error = (await supabase.auth.signInWithPassword({
						email: email.trim(),
						password
					})).error;
				} catch {}
				if (error) throw error;
			}
			await entrarComoNutricionista();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "No se pudo iniciar sesión");
		} finally {
			setCargando(false);
		}
	};
	const onGoogle = async () => {
		const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
		if (result.error) {
			toast.error("No se pudo entrar con Google");
			return;
		}
		if (result.redirected) return;
		await entrarComoNutricionista();
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, {
								className: "size-8 text-primary",
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 text-3xl font-extrabold",
							children: modo === "entrar" ? "Acceso profesional" : "Crear cuenta profesional"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-lg text-muted-foreground",
							children: "Para nutricionistas que gestionan pacientes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit,
							className: "mt-6 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "email",
										className: "text-lg font-bold",
										children: "Correo electrónico"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "email",
										type: "email",
										required: true,
										autoComplete: "email",
										maxLength: 255,
										value: email,
										onChange: (e) => setEmail(e.target.value),
										className: "tap-target rounded-2xl text-lg",
										placeholder: "nombre@clinica.com"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										className: "text-lg font-bold",
										children: "Contraseña"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "password",
										type: "password",
										required: true,
										minLength: 6,
										maxLength: 72,
										autoComplete: modo === "crear" ? "new-password" : "current-password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										className: "tap-target rounded-2xl text-lg"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: cargando,
									className: "tap-target w-full rounded-2xl text-lg font-bold",
									children: modo === "entrar" ? "Entrar" : "Crear cuenta"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: onGoogle,
							className: "tap-target mt-3 w-full rounded-2xl text-lg font-bold",
							children: "Continuar con Google"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setModo(modo === "entrar" ? "crear" : "entrar"),
							className: "mt-5 w-full text-lg font-bold text-primary underline underline-offset-4",
							children: modo === "entrar" ? "No tengo cuenta, crear una" : "Ya tengo cuenta, entrar"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-lg text-muted-foreground",
					children: [
						"¿Es paciente?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/acceso",
							className: "font-bold text-primary underline underline-offset-4",
							children: "Entre con su código"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
