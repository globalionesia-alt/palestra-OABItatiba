/**
 * Google Apps Script para receber inscricoes da landing page e salvar no Google Sheets.
 * Como usar:
 * 1. Crie uma planilha no Google Sheets.
 * 2. Va em Extensoes > Apps Script.
 * 3. Cole este codigo.
 * 4. Implante como Aplicativo da Web.
 * 5. Executar como: Eu.
 * 6. Quem pode acessar: Qualquer pessoa.
 * 7. Copie a URL /exec e cole no CONFIG.googleSheetsEndpoint do index.html.
 */

const SHEET_NAME = 'Inscrições';
const HEADERS = [
  'Data/Hora do envio',
  'Nome completo',
  'E-mail',
  'WhatsApp',
  'Profissão / área',
  'Inscrição OAB',
  'Instituição / escritório',
  'Evento',
  'Origem',
  'Página',
  'Status'
];

function doGet() {
  return ContentService
    .createTextOutput('Endpoint ativo para recebimento de inscricoes.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    ensureHeaders_(sheet);

    const data = e && e.parameter ? e.parameter : {};

    sheet.appendRow([
      new Date(),
      data.nome || '',
      data.email || '',
      data.telefone || '',
      data.profissao || '',
      data.oab || '',
      data.instituicao || '',
      data.evento || 'Palestra OAB Itatiba',
      data.origem || 'GitHub Pages',
      data.pagina || '',
      'Recebida'
    ]);

    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    sheet.autoResizeColumns(1, HEADERS.length);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, message: 'Inscricao registrada.' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function ensureHeaders_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = firstRow.join('').trim().length > 0;

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#071832')
      .setFontColor('#ffffff');
    sheet.autoResizeColumns(1, HEADERS.length);
  }
}
