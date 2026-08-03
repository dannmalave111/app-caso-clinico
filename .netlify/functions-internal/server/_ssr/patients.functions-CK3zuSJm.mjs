import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { a as recordType, i as objectType, n as arrayType, o as stringType, t as anyType } from "../_libs/zod.mjs";
import { a as requireSupabaseAuth, i as registroSchema, n as patientEmail, r as patientPassword, t as clinicoSchema } from "./patients.shared-D1J8O4CK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patients.functions-CK3zuSJm.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
async function assertNutricionista(context) {
	const { data, error } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "nutricionista"
	});
	if (error || !data) throw new Error("Solo el nutricionista puede realizar esta acción");
}
/** Carga todos los pacientes del nutricionista autenticado desde Supabase. */
var loadMyPatients_createServerFn_handler = createServerRpc({
	id: "6a8c18d32930fdff842262889ef93bb3d2da7dd313c8e5ecc7f8d11dcff8d895",
	name: "loadMyPatients",
	filename: "src/lib/patients.functions.ts"
}, (opts) => loadMyPatients.__executeServer(opts));
var loadMyPatients = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(loadMyPatients_createServerFn_handler, async ({ context }) => {
	const { supabaseAdmin } = await import("./client.server-DVlfXams.mjs");
	const { data, error } = await supabaseAdmin.from("patients").select("*").eq("created_by", context.userId).order("created_at", { ascending: true });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var loadMyPatientRecord_createServerFn_handler = createServerRpc({
	id: "3886bef70cc22252393673a3657bcda52e21ccb4e974eb6b25bae2b5bf69e655",
	name: "loadMyPatientRecord",
	filename: "src/lib/patients.functions.ts"
}, (opts) => loadMyPatientRecord.__executeServer(opts));
var loadMyPatientRecord = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(loadMyPatientRecord_createServerFn_handler, async ({ context }) => {
	const { supabaseAdmin } = await import("./client.server-DVlfXams.mjs");
	const { data, error } = await supabaseAdmin.from("patients").select("*").eq("user_id", context.userId).maybeSingle();
	if (error) throw new Error(error.message);
	return data;
});
var syncPatientData_createServerFn_handler = createServerRpc({
	id: "e92da4f96c9118de5ee2abd3aa0a245effd41c7c4a2dc1b38bd62c425ca20363",
	name: "syncPatientData",
	filename: "src/lib/patients.functions.ts"
}, (opts) => syncPatientData.__executeServer(opts));
var syncPatientData = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	plan_semanal: recordType(anyType()),
	medidas: arrayType(anyType()),
	logs: recordType(anyType()),
	actividades: arrayType(anyType())
}).parse(input)).handler(syncPatientData_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-DVlfXams.mjs");
	const { error } = await supabaseAdmin.from("patients").update({
		plan_semanal: data.plan_semanal,
		medidas: data.medidas,
		logs: data.logs,
		actividades: data.actividades
	}).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var claimNutricionista_createServerFn_handler = createServerRpc({
	id: "05cb6a7c8eafd6b220f7413314ff20434260869c808c058df817d195ff6042b3",
	name: "claimNutricionista",
	filename: "src/lib/patients.functions.ts"
}, (opts) => claimNutricionista.__executeServer(opts));
var claimNutricionista = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(claimNutricionista_createServerFn_handler, async ({ context }) => {
	const { supabaseAdmin } = await import("./client.server-DVlfXams.mjs");
	const { data: roles } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId);
	if (roles && roles.length > 0) return { role: roles[0].role };
	const { error } = await supabaseAdmin.from("user_roles").insert({
		user_id: context.userId,
		role: "nutricionista"
	});
	if (error) throw new Error(error.message);
	return { role: "nutricionista" };
});
var registerPatient_createServerFn_handler = createServerRpc({
	id: "199ef8f6e34660137de0e9ddafb8142ba56ed8f4d2d048fbc087c3118a3fe62e",
	name: "registerPatient",
	filename: "src/lib/patients.functions.ts"
}, (opts) => registerPatient.__executeServer(opts));
var registerPatient = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => registroSchema.parse(input)).handler(registerPatient_createServerFn_handler, async ({ data, context }) => {
	await assertNutricionista(context);
	const { supabaseAdmin } = await import("./client.server-DVlfXams.mjs");
	let codigo = "";
	for (let intento = 0; intento < 8; intento++) {
		const candidato = String(Math.floor(1e5 + Math.random() * 9e5));
		const { data: existente } = await supabaseAdmin.from("patients").select("id").eq("codigo", candidato).maybeSingle();
		if (!existente) {
			codigo = candidato;
			break;
		}
	}
	if (!codigo) throw new Error("No se pudo generar un código de acceso, intente de nuevo");
	const { data: created, error: authError } = await supabaseAdmin.auth.admin.createUser({
		email: patientEmail(codigo),
		password: patientPassword(codigo),
		email_confirm: true,
		user_metadata: {
			nombre: data.nombre,
			tipo: "paciente"
		}
	});
	if (authError || !created.user) throw new Error(authError?.message ?? "No se pudo crear la cuenta");
	const userId = created.user.id;
	const { error: roleError } = await supabaseAdmin.from("user_roles").insert({
		user_id: userId,
		role: "paciente"
	});
	if (roleError) {
		await supabaseAdmin.auth.admin.deleteUser(userId);
		throw new Error(roleError.message);
	}
	const { data: patient, error: patientError } = await supabaseAdmin.from("patients").insert({
		user_id: userId,
		nombre: data.nombre,
		edad: data.edad,
		telefono: data.telefono,
		objetivo: data.objetivo,
		meta_agua: data.metaAgua,
		codigo,
		created_by: context.userId
	}).select().single();
	if (patientError || !patient) {
		await supabaseAdmin.auth.admin.deleteUser(userId);
		throw new Error(patientError?.message ?? "No se pudo registrar al paciente");
	}
	return {
		patient,
		codigo
	};
});
var deletePatient_createServerFn_handler = createServerRpc({
	id: "44a96411a6c1be985a6bc400439e03f7bae5a5d12fd6f7da9a973df514c38a9a",
	name: "deletePatient",
	filename: "src/lib/patients.functions.ts"
}, (opts) => deletePatient.__executeServer(opts));
var deletePatient = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(deletePatient_createServerFn_handler, async ({ data, context }) => {
	await assertNutricionista(context);
	const { supabaseAdmin } = await import("./client.server-DVlfXams.mjs");
	const { data: patient } = await supabaseAdmin.from("patients").select("user_id").eq("id", data.id).maybeSingle();
	const { error } = await supabaseAdmin.from("patients").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	if (patient?.user_id) {
		await supabaseAdmin.from("user_roles").delete().eq("user_id", patient.user_id);
		await supabaseAdmin.auth.admin.deleteUser(patient.user_id);
	}
	return { ok: true };
});
var updatePatientClinico_createServerFn_handler = createServerRpc({
	id: "1ae142fae9a52363a3088c2599d8adaba306da150c35bd5fa8a7f411faf380c6",
	name: "updatePatientClinico",
	filename: "src/lib/patients.functions.ts"
}, (opts) => updatePatientClinico.__executeServer(opts));
var updatePatientClinico = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => clinicoSchema.parse(input)).handler(updatePatientClinico_createServerFn_handler, async ({ data, context }) => {
	await assertNutricionista(context);
	const { supabaseAdmin } = await import("./client.server-DVlfXams.mjs");
	const macrosExtended = {
		...data.macros,
		requerimientoCalorico: data.requerimientoCalorico,
		requerimientoHidricoMl: data.requerimientoHidricoMl,
		encuestaFrecuenciaUrl: data.encuestaFrecuenciaUrl,
		quienPreparaComida: data.quienPreparaComida,
		tieneHijos: data.tieneHijos,
		detallesHijos: data.detallesHijos,
		observacionesClinicas: data.observacionesClinicas,
		antecedentesDriveUrl: data.antecedentesDriveUrl,
		menuDriveUrl: data.menuDriveUrl
	};
	const updatePayload = {
		estado_civil: data.estadoCivil,
		ocupacion: data.ocupacion,
		diagnostico: data.diagnostico,
		medicacion: data.medicacion,
		formulas: data.formulas,
		excel_url: data.excelUrl,
		macros: macrosExtended
	};
	if (data.requerimientoHidricoMl && data.requerimientoHidricoMl > 0) updatePayload.meta_agua = Math.max(1, Math.round(data.requerimientoHidricoMl / 250));
	const { error } = await supabaseAdmin.from("patients").update(updatePayload).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var registerNutricionista_createServerFn_handler = createServerRpc({
	id: "296e62fdfe42f6ea215e36d3b59166798856df05271e3906cdd081deac35b931",
	name: "registerNutricionista",
	filename: "src/lib/patients.functions.ts"
}, (opts) => registerNutricionista.__executeServer(opts));
var registerNutricionista = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	email: stringType().email(),
	password: stringType().min(6)
}).parse(input)).handler(registerNutricionista_createServerFn_handler, async ({ data }) => {
	try {
		const { supabaseAdmin } = await import("./client.server-DVlfXams.mjs");
		const { data: created, error: authError } = await supabaseAdmin.auth.admin.createUser({
			email: data.email.trim(),
			password: data.password,
			email_confirm: true,
			user_metadata: { tipo: "nutricionista" }
		});
		if (authError || !created.user) throw new Error(authError?.message ?? "No se pudo crear la cuenta de nutricionista");
		const { error: roleError } = await supabaseAdmin.from("user_roles").insert({
			user_id: created.user.id,
			role: "nutricionista"
		});
		if (roleError) {
			await supabaseAdmin.auth.admin.deleteUser(created.user.id);
			throw new Error(roleError.message);
		}
		return {
			ok: true,
			userId: created.user.id
		};
	} catch (err) {
		console.warn("registerNutricionista via admin client failed:", err);
		throw err;
	}
});
var autoConfirmNutricionista_createServerFn_handler = createServerRpc({
	id: "7a6a028663bd26d202b11016cf0e8928d555e39261d1f0a979fa32c66c271b07",
	name: "autoConfirmNutricionista",
	filename: "src/lib/patients.functions.ts"
}, (opts) => autoConfirmNutricionista.__executeServer(opts));
var autoConfirmNutricionista = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ email: stringType().email() }).parse(input)).handler(autoConfirmNutricionista_createServerFn_handler, async ({ data }) => {
	try {
		const { supabaseAdmin } = await import("./client.server-DVlfXams.mjs");
		const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
		if (listError || !usersData?.users) return { confirmed: false };
		const targetUser = usersData.users.find((u) => u.email?.toLowerCase() === data.email.trim().toLowerCase());
		if (targetUser && !targetUser.email_confirmed_at) {
			await supabaseAdmin.auth.admin.updateUserById(targetUser.id, { email_confirm: true });
			return { confirmed: true };
		}
		return { confirmed: false };
	} catch (err) {
		console.warn("autoConfirmNutricionista skipped:", err);
		return { confirmed: false };
	}
});
//#endregion
export { autoConfirmNutricionista_createServerFn_handler, claimNutricionista_createServerFn_handler, deletePatient_createServerFn_handler, loadMyPatientRecord_createServerFn_handler, loadMyPatients_createServerFn_handler, registerNutricionista_createServerFn_handler, registerPatient_createServerFn_handler, syncPatientData_createServerFn_handler, updatePatientClinico_createServerFn_handler };
