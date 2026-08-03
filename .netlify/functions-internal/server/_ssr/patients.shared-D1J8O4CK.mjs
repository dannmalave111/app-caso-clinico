import { u as getRequest } from "./createServerFn-BFFE07zL.mjs";
import { t as createMiddleware } from "./createMiddleware-B_4t7rW1.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { i as objectType, n as arrayType, o as stringType, r as numberType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patients.shared-D1J8O4CK.js
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
var requireSupabaseAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const SUPABASE_URL = process.env["SUPABASE_URL"];
	const SUPABASE_PUBLISHABLE_KEY = process.env["SUPABASE_PUBLISHABLE_KEY"];
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
		const message = `Missing Supabase environment variable(s): ${[...!SUPABASE_URL ? ["SUPABASE_URL"] : [], ...!SUPABASE_PUBLISHABLE_KEY ? ["SUPABASE_PUBLISHABLE_KEY"] : []].join(", ")}. Connect Supabase in Lovable Cloud.`;
		console.error(`[Supabase] ${message}`);
		throw new Error(message);
	}
	const request = getRequest();
	if (!request?.headers) throw new Error("Unauthorized: No request headers available");
	const authHeader = request.headers.get("authorization");
	if (!authHeader) throw new Error("Unauthorized: No authorization header provided");
	if (!authHeader.startsWith("Bearer ")) throw new Error("Unauthorized: Only Bearer tokens are supported");
	const token = authHeader.replace("Bearer ", "");
	if (!token) throw new Error("Unauthorized: No token provided");
	if (token.split(".").length !== 3) throw new Error("Unauthorized: Invalid token");
	const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		global: {
			fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
			headers: { Authorization: `Bearer ${token}` }
		},
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		}
	});
	const { data, error } = await supabase.auth.getClaims(token);
	if (error || !data?.claims) throw new Error("Unauthorized: Invalid token");
	if (!data.claims.sub) throw new Error("Unauthorized: No user ID found in token");
	return next({ context: {
		supabase,
		userId: data.claims.sub,
		claims: data.claims
	} });
});
var patientEmail = (codigo) => `p${codigo}@nutricuida.app`;
var patientPassword = (codigo) => `NutriCuida-${codigo}`;
var registroSchema = objectType({
	nombre: stringType().trim().min(3).max(80),
	edad: numberType().int().min(1).max(120),
	telefono: stringType().trim().max(20).regex(/^[0-9+\s-]*$/, "Teléfono inválido"),
	objetivo: stringType().trim().max(200),
	metaAgua: numberType().int().min(1).max(20)
});
var medicamentoSchema = objectType({
	id: stringType(),
	tipo: stringType().trim().max(120),
	gramaje: stringType().trim().max(80),
	horario: stringType().trim().max(20),
	horariosNotificables: arrayType(stringType().trim().max(20)).optional()
});
var clinicoSchema = objectType({
	id: stringType().uuid(),
	estadoCivil: stringType().trim().max(60).optional().default(""),
	ocupacion: stringType().trim().max(120).optional().default(""),
	diagnostico: stringType().trim().max(2e3).optional().default(""),
	medicacion: arrayType(medicamentoSchema).max(40).optional().default([]),
	formulas: stringType().trim().max(2e3).optional().default(""),
	excelUrl: stringType().trim().max(1e3).optional().default(""),
	macros: objectType({
		ch: numberType().int().min(0).max(100),
		pr: numberType().int().min(0).max(100),
		lp: numberType().int().min(0).max(100)
	}),
	requerimientoCalorico: numberType().optional(),
	requerimientoHidricoMl: numberType().optional(),
	encuestaFrecuenciaUrl: stringType().trim().max(1e3).optional().default(""),
	quienPreparaComida: stringType().trim().max(120).optional().default(""),
	tieneHijos: stringType().trim().max(60).optional().default(""),
	detallesHijos: stringType().trim().max(200).optional().default(""),
	observacionesClinicas: stringType().trim().max(2e3).optional().default(""),
	antecedentesDriveUrl: stringType().trim().max(1e3).optional().default(""),
	menuDriveUrl: stringType().trim().max(1e3).optional().default("")
});
//#endregion
export { requireSupabaseAuth as a, registroSchema as i, patientEmail as n, patientPassword as r, clinicoSchema as t };
