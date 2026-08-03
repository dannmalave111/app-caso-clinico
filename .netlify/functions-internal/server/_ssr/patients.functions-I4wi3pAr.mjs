import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { a as recordType, i as objectType, n as arrayType, o as stringType, t as anyType } from "../_libs/zod.mjs";
import { a as requireSupabaseAuth, i as registroSchema, t as clinicoSchema } from "./patients.shared-D1J8O4CK.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DaXRlzOi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patients.functions-I4wi3pAr.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/** Carga todos los pacientes del nutricionista autenticado desde Supabase. */
var loadMyPatients = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("6a8c18d32930fdff842262889ef93bb3d2da7dd313c8e5ecc7f8d11dcff8d895"));
/** Carga el registro del paciente autenticado desde Supabase. */
var loadMyPatientRecord = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("3886bef70cc22252393673a3657bcda52e21ccb4e974eb6b25bae2b5bf69e655"));
/** Sincroniza los datos dinámicos del paciente (plan, medidas, logs, actividades) con Supabase. */
var syncPatientData = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	plan_semanal: recordType(anyType()),
	medidas: arrayType(anyType()),
	logs: recordType(anyType()),
	actividades: arrayType(anyType())
}).parse(input)).handler(createSsrRpc("e92da4f96c9118de5ee2abd3aa0a245effd41c7c4a2dc1b38bd62c425ca20363"));
/** Marca al usuario recién registrado como nutricionista si aún no tiene rol. */
var claimNutricionista = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("05cb6a7c8eafd6b220f7413314ff20434260869c808c058df817d195ff6042b3"));
var registerPatient = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => registroSchema.parse(input)).handler(createSsrRpc("199ef8f6e34660137de0e9ddafb8142ba56ed8f4d2d048fbc087c3118a3fe62e"));
var deletePatient = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(createSsrRpc("44a96411a6c1be985a6bc400439e03f7bae5a5d12fd6f7da9a973df514c38a9a"));
/** Guarda los datos sociodemográficos y clínicos editables del paciente. */
var updatePatientClinico = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => clinicoSchema.parse(input)).handler(createSsrRpc("1ae142fae9a52363a3088c2599d8adaba306da150c35bd5fa8a7f411faf380c6"));
/** Registra a un nutricionista autoconfirmando su correo en el servidor. */
var registerNutricionista = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	email: stringType().email(),
	password: stringType().min(6)
}).parse(input)).handler(createSsrRpc("296e62fdfe42f6ea215e36d3b59166798856df05271e3906cdd081deac35b931"));
/** Autoconfirma el correo de un nutricionista en caso de que esté pendiente de verificación. */
var autoConfirmNutricionista = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ email: stringType().email() }).parse(input)).handler(createSsrRpc("7a6a028663bd26d202b11016cf0e8928d555e39261d1f0a979fa32c66c271b07"));
//#endregion
export { loadMyPatients as a, syncPatientData as c, loadMyPatientRecord as i, updatePatientClinico as l, claimNutricionista as n, registerNutricionista as o, deletePatient as r, registerPatient as s, autoConfirmNutricionista as t };
