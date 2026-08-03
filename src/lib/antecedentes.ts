import type { Patient } from "@/lib/store";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Documento de antecedentes clínicos listo para descargar en Word o imprimir a PDF. */
export function buildAntecedentesHTML(p: Patient) {
  const hoy = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const ultima = p.medidas[p.medidas.length - 1];

  const filasMedidas = p.medidas
    .slice()
    .reverse()
    .map(
      (m) => `<tr>
        <td>${m.fecha}</td><td>${m.peso}</td><td>${m.cintura}</td><td>${m.cadera}</td>
        <td>${m.bicipital}</td><td>${m.abdominal}</td><td>${m.musloMedio}</td><td>${m.pantorrilla}</td>
        <td>${m.pliegueTricipital}</td><td>${m.pliegueSubescapular}</td>
      </tr>`,
    )
    .join("");

  const filasMedicacion = p.medicacion.length
    ? p.medicacion
        .map(
          (m) =>
            `<tr><td>${esc(m.tipo)}</td><td>${esc(m.gramaje)}</td><td>${esc(m.horario)}</td></tr>`,
        )
        .join("")
    : `<tr><td colspan="3">Sin medicación registrada</td></tr>`;

  const filasActividad = p.actividades.length
    ? p.actividades
        .map(
          (a) =>
            `<tr><td>${a.fecha}</td><td>${esc(a.tipo)}</td><td>${a.minutos} min</td><td>${a.intensidad}</td><td>${esc(a.notas)}</td></tr>`,
        )
        .join("")
    : `<tr><td colspan="5">Sin actividad registrada</td></tr>`;

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8" />
<title>Antecedentes clínicos — ${esc(p.nombre)}</title>
<style>
  body { font-family: Georgia, "Times New Roman", serif; color: #14281f; margin: 32px; font-size: 14px; }
  h1 { font-size: 24px; margin-bottom: 4px; }
  h2 { font-size: 17px; margin-top: 26px; border-bottom: 2px solid #6fcf97; padding-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  th, td { border: 1px solid #cfd8d3; padding: 6px 8px; text-align: left; font-size: 13px; }
  th { background: #eafaf1; }
  .meta { color: #4b5b53; }
</style></head>
<body>
  <h1>Antecedentes clínicos nutricionales</h1>
  <p class="meta">NutriCuida · Documento generado el ${hoy}</p>

  <h2>Datos del paciente</h2>
  <table>
    <tr><th>Nombre</th><td>${esc(p.nombre)}</td><th>Edad</th><td>${p.edad} años</td></tr>
    <tr><th>Estado civil</th><td>${esc(p.estadoCivil || "—")}</td><th>Ocupación</th><td>${esc(p.ocupacion || "—")}</td></tr>
    <tr><th>Teléfono</th><td>${esc(p.telefono)}</td><th>Meta de agua</th><td>${p.requerimientoHidricoMl ? `${p.requerimientoHidricoMl} mL (${Math.round(p.requerimientoHidricoMl / 250)} vasos)` : `${p.metaAgua} vasos/día`}</td></tr>
    <tr><th>¿Quién prepara la comida?</th><td>${esc(p.quienPreparaComida || "—")}</td><th>Hijos</th><td>${esc(p.tieneHijos ? `${p.tieneHijos} ${p.detallesHijos ? `(${p.detallesHijos})` : ""}` : "—")}</td></tr>
    <tr><th>Objetivo</th><td colspan="3">${esc(p.objetivo)}</td></tr>
  </table>

  <h2>Diagnóstico médico y Observaciones</h2>
  <p><strong>Diagnóstico:</strong> ${esc(p.diagnostico || "Sin diagnóstico registrado")}</p>
  ${p.observacionesClinicas ? `<p><strong>Observaciones clínicas:</strong> ${esc(p.observacionesClinicas)}</p>` : ""}

  <h2>Medicación</h2>
  <table><tr><th>Tipo</th><th>Gramaje</th><th>Horario</th></tr>${filasMedicacion}</table>

  <h2>Plan nutricional y Requerimientos</h2>
  <p>Requerimiento calórico: <strong>${p.requerimientoCalorico ? `${p.requerimientoCalorico} kcal/día` : "Sin especificar"}</strong></p>
  <p>Distribución de macronutrientes: <strong>CH ${p.macros.ch}% · Pr ${p.macros.pr}% · Lp ${p.macros.lp}%</strong></p>
  <p>Fórmulas de cálculo:<br />${esc(p.formulas || "—").replace(/\n/g, "<br />")}</p>
  ${p.antecedentesDriveUrl ? `<p>Documento de antecedentes en nube/Drive: <a href="${esc(p.antecedentesDriveUrl)}">${esc(p.antecedentesDriveUrl)}</a></p>` : ""}

  <h2>Antropometría</h2>
  <p>Última medición: ${ultima ? `${ultima.fecha} · ${ultima.peso} kg` : "sin registros"}</p>
  <table>
    <tr>
      <th>Fecha</th><th>Peso (kg)</th><th>Cintura</th><th>Cadera</th><th>Bicipital</th>
      <th>Abdominal</th><th>Muslo medio</th><th>Pantorrilla</th><th>Pliegue tricipital</th><th>Pliegue subescapular</th>
    </tr>
    ${filasMedidas || `<tr><td colspan="10">Sin mediciones</td></tr>`}
  </table>

  <h2>Actividad física</h2>
  <table><tr><th>Fecha</th><th>Actividad</th><th>Duración</th><th>Intensidad</th><th>Notas</th></tr>${filasActividad}</table>
</body></html>`;
}
