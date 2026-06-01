// ============================================================
//  SERO — Google Apps Script para recibir reservas en una hoja
//  (Pega TODO esto en Extensiones → Apps Script de tu Google Sheet)
// ============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Si la hoja está vacía, escribe los encabezados primero
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha registro", "Nombre", "WhatsApp", "Dato de",
        "Lo que más ama", "Gustos completos", "Fechas disponibles",
        "+1", "Estilo en mesa", "Edad", "Comida", "DATA line (matching)"
      ]);
    }

    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      d.ts || new Date().toISOString(),
      d.nombre || "",
      d.whatsapp || "",
      d.referido || "",
      d.amas || "",
      d.gustos || "",
      d.fechas || "",
      d.mas1 || "",
      d.estilo || "",
      d.edad || "",
      d.comida || "",
      d.dataline || ""
    ]);

    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error: " + err);
  }
}
