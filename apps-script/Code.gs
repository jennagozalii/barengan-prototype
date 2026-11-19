/**
 * Barengan landing page → Google Sheets
 * Paste this into Extensions → Apps Script of the "Barengan MVP – Responses" spreadsheet,
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 *
 * The landing page sends two kinds of rows:
 *   type "signup" → tab "Signups"   (waitlist form)
 *   type "event"  → tab "Events"    (page_view, form_start, click_prototype, ...)
 * Tabs and headers are created automatically if they don't exist.
 */

const TABS = {
  signup: {
    name: 'Signups',
    headers: ['timestamp', 'name', 'email', 'city', 'concerts_per_year', 'role', 'biggest_pain', 'would_pay', 'feedback', 'consent', 'source', 'session', 'user_agent']
  },
  event: {
    name: 'Events',
    headers: ['timestamp', 'event', 'source', 'session']
  }
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (data.website) return json_({ ok: true });            // spam honeypot
    const tab = data.type === 'signup' ? TABS.signup : TABS.event;
    const sheet = getSheet_(tab);
    const row = tab.headers.map(h => h === 'timestamp' ? new Date() : clean_(data[h]));
    sheet.appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, service: 'barengan-waitlist' });
}

function getSheet_(tab) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(tab.name);
  if (!sheet) sheet = ss.insertSheet(tab.name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(tab.headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, tab.headers.length).setFontWeight('bold');
  }
  return sheet;
}

// Keep values short and stop them from being read as formulas.
function clean_(v) {
  if (v === undefined || v === null) return '';
  let s = String(v).slice(0, 500);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Optional: run once from the editor to create both tabs before going live. */
function setup() {
  getSheet_(TABS.signup);
  getSheet_(TABS.event);
}
