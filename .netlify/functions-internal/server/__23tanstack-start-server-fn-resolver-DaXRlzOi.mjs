//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DaXRlzOi.js
var manifest = {
	"05cb6a7c8eafd6b220f7413314ff20434260869c808c058df817d195ff6042b3": {
		functionName: "claimNutricionista_createServerFn_handler",
		importer: () => import("./_ssr/patients.functions-CK3zuSJm.mjs")
	},
	"199ef8f6e34660137de0e9ddafb8142ba56ed8f4d2d048fbc087c3118a3fe62e": {
		functionName: "registerPatient_createServerFn_handler",
		importer: () => import("./_ssr/patients.functions-CK3zuSJm.mjs")
	},
	"1ae142fae9a52363a3088c2599d8adaba306da150c35bd5fa8a7f411faf380c6": {
		functionName: "updatePatientClinico_createServerFn_handler",
		importer: () => import("./_ssr/patients.functions-CK3zuSJm.mjs")
	},
	"296e62fdfe42f6ea215e36d3b59166798856df05271e3906cdd081deac35b931": {
		functionName: "registerNutricionista_createServerFn_handler",
		importer: () => import("./_ssr/patients.functions-CK3zuSJm.mjs")
	},
	"3886bef70cc22252393673a3657bcda52e21ccb4e974eb6b25bae2b5bf69e655": {
		functionName: "loadMyPatientRecord_createServerFn_handler",
		importer: () => import("./_ssr/patients.functions-CK3zuSJm.mjs")
	},
	"44a96411a6c1be985a6bc400439e03f7bae5a5d12fd6f7da9a973df514c38a9a": {
		functionName: "deletePatient_createServerFn_handler",
		importer: () => import("./_ssr/patients.functions-CK3zuSJm.mjs")
	},
	"6a8c18d32930fdff842262889ef93bb3d2da7dd313c8e5ecc7f8d11dcff8d895": {
		functionName: "loadMyPatients_createServerFn_handler",
		importer: () => import("./_ssr/patients.functions-CK3zuSJm.mjs")
	},
	"7a6a028663bd26d202b11016cf0e8928d555e39261d1f0a979fa32c66c271b07": {
		functionName: "autoConfirmNutricionista_createServerFn_handler",
		importer: () => import("./_ssr/patients.functions-CK3zuSJm.mjs")
	},
	"e92da4f96c9118de5ee2abd3aa0a245effd41c7c4a2dc1b38bd62c425ca20363": {
		functionName: "syncPatientData_createServerFn_handler",
		importer: () => import("./_ssr/patients.functions-CK3zuSJm.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
