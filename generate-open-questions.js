/*
 * generate-open-questions.js
 *
 * Builds a PPTX deck of the open questions for the business that have surfaced
 * while building the RMA submission flow and the catalog ordering-location
 * feature. Each question is paired with the current demo assumption/status so
 * stakeholders can simply confirm or correct.
 *
 *   node generate-open-questions.js
 *
 * Uses the already-installed dep: pptxgenjs.
 */

const path = require('path');
const PptxGenJS = require('pptxgenjs');

const ROOT = __dirname;
const DATE = 'July 13, 2026';

// Each category → rows of [Open question, Current demo assumption / status].
const CATEGORIES = [
  {
    title: 'RMA — Return Rules & Eligibility',
    color: '1E40AF',
    rows: [
      ['Is the return window 60 days from the invoice date (not delivery / ship date)?', 'Assumed: accepted only if sold within 60 days of the invoice date.'],
      ['Cracked-LCD 7-day rule — measured from delivery date; what is the authoritative delivery-date source?', 'Assumed: Cracked LCD accepted only within 7 days of delivery.'],
      ['Which grades are non-returnable, and how are "AS IS (WIP)" and "UR JP (SoftBank)" identified on a device?', 'Assumed: grade codes "AS IS" and "UR JP" are blocked.'],
      ['Which product categories are excluded ("brand products", iPads, accessories)? Exact list?', 'Assumed: iPad / Tablet / Accessory categories are blocked.'],
      ['Are battery-related returns always rejected, with no exceptions?', 'Assumed: battery reason always "Not Accepted".'],
      ['Minor vs. deep scratch — what is the exact criteria? Is it grade-based or reason-based?', 'Assumed: minor scratch / cosmetic rejected; deep scratch accepted.'],
      ['iCloud lock = automatic rejection; MDM / carrier-unlock verified at approval — confirm portal behaviour.', 'Assumed: iCloud auto-rejected; MDM/carrier-lock flagged for manual review.'],
    ],
  },
  {
    title: 'RMA — Evidence & Images',
    color: '0F766E',
    rows: [
      ['Authoritative "image request rule book": which return reasons require a photo/video upload?', 'Assumed: Cracked LCD, Water Damage, Cosmetic, Dead Pixel, Camera, etc.'],
      ['Accepted file types and max size? Is video required or optional?', 'Assumed: PNG / JPG / MP4, up to 10 MB each.'],
      ['Is an Azure Storage account + container provisioned (with credentials) for image storage?', 'Not provisioned — demo shows client-side previews only, nothing stored.'],
      ['Image-link format sent to NetSuite, and which statuses start the 30-day deletion clock (Completed / Done / Closed)?', 'Assumed: delete 30 days after Completed/Done/Closed via a scheduled job.'],
    ],
  },
  {
    title: 'RMA — NetSuite Integration',
    color: '6D28D9',
    rows: [
      ['Is the createRMA / updateRMA RESTlet built? Endpoint URL, auth (TBA/OAuth), sandbox vs. production?', 'Not available — payloads are mocked; a preview is shown at submit.'],
      ['Confirm the createRMA / updateRMA payload schema. Where does the NetSuite Item Internal ID come from?', 'Assumed: the provided structure, grouped by Item ID with Device IDs.'],
      ['Will validation use a real-time "validateRMA" RESTlet (invoice date, grade, iCloud, MDM per IMEI) or a synced DB?', 'Assumed: real-time validateRMA lookup (stubbed with mock device facts).'],
      ['How is the logged-in portal user mapped to a NetSuite Customer Internal ID / Subsidiary / Location?', 'Not built — a mock customer is used.'],
      ['How does the portal receive RMA status updates back from NetSuite (webhook, polling, Boomi)?', 'Not built — statuses are mock data.'],
    ],
  },
  {
    title: 'RMA — Submission & Workflow',
    color: 'B45309',
    rows: [
      ['Should devices that fail validation still be submitted as "Pending" for manual review?', 'Assumed: yes — submission allowed; those lines are Pending, not auto-approved.'],
      ['"Exception for all submissions from the back end" — what does this mean operationally?', 'Needs clarification.'],
      ['Is tracking number + carrier mandatory, and enforced at which step? Multiple tracking numbers per RMA?', 'Assumed: optional at submit; addable/editable any time; multiple allowed.'],
      ['Who is allowed to submit an RMA (role permissions)?', 'Assumed: Admin + Buyer (per Stage 2 requirements).'],
      ['Confirm customers provide their own return label (PCS no longer offers a label download).', 'Implemented: "Download Return Label" removed.'],
      ['Credit-memo download — source and format from NetSuite?', 'Placeholder button only in the demo.'],
    ],
  },
  {
    title: 'Catalog — Locations & Inventory',
    color: '0E7490',
    rows: [
      ['Which stock locations can each customer order from, and where does that list come from?', 'Demo uses four fixed locations for all customers.'],
      ['Will per-location inventory quantities come from NetSuite / Boomi?', 'Demo derives per-location availability deterministically (mock).'],
      ['Should the ordering location default to the customer’s primary/home location?', 'Demo defaults to the first location (Miami, FL).'],
      ['Confirm a cart / sales estimate is limited to a single location.', 'Assumed: yes (per Stage 2 requirements).'],
      ['On switching to a location missing some cart items: warn + remove, or block entirely?', 'Implemented: warn, confirm, then remove only the unavailable items.'],
    ],
  },
  {
    title: 'Grades — Definitions',
    color: 'BE185D',
    rows: [
      ['Authoritative definitions for placeholder grade codes: COB, MD A, MD B, TBG, TBG2, TBG FIN, CRC, CRD, CRX, D2, D3, D4.', 'Flagged as placeholders in the app, pending PCS definitions.'],
      ['Which grades are returnable? Formal grade → RMA-eligibility mapping.', 'Not yet defined.'],
    ],
  },
  {
    title: 'Cross-Cutting — Auth, Data & Notifications',
    color: '334155',
    rows: [
      ['Auth0 timeline, and role permissions (Admin / Buyer / Viewer) for RMA and catalog actions.', 'Not built — login is a mock; roles not enforced.'],
      ['Source of invoice / order / device-serial (IMEI) data in the portal — Boomi sync scope?', 'No real data yet — all mocked.'],
      ['Are email / SMS status notifications (US-89) in scope? Which channels and preferences?', 'Deferred / not built.'],
      ['Bulk-upload template format (CSV vs. XLSX) and required columns?', 'Demo uses CSV: Device ID, Return Reason, Customer Notes.'],
    ],
  },
];

const totalQuestions = CATEGORIES.reduce((n, c) => n + c.rows.length, 0);
const NAVY = '1E3A8A';
const SLATE = '64748B';
const MAX_ROWS = 6; // question rows per slide before splitting

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function main() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in
  pptx.author = 'PCS Development Team';
  pptx.title = 'PCS Customer Portal — Open Questions for the Business';

  // ── Title slide ──
  const title = pptx.addSlide();
  title.background = { color: 'F8FAFC' };
  title.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.6, fill: { color: NAVY } });
  title.addText('PCS Wireless Customer Portal', { x: 0.6, y: 0.35, w: 12, h: 0.6, fontSize: 30, bold: true, color: 'FFFFFF' });
  title.addText('Open Questions for the Business', { x: 0.6, y: 1.0, w: 12, h: 0.5, fontSize: 18, color: 'C7D2FE' });
  title.addText(
    [
      { text: 'Consolidated from building the RMA submission flow and the catalog ordering-location feature.', options: { fontSize: 14, color: '334155', breakLine: true } },
      { text: 'Each question is paired with the current demo assumption/status — please confirm or correct.', options: { fontSize: 14, color: '334155' } },
    ],
    { x: 0.6, y: 2.2, w: 12, h: 1.0 }
  );
  title.addText(`${totalQuestions} open questions across ${CATEGORIES.length} areas`, { x: 0.6, y: 3.5, w: 12, h: 0.4, fontSize: 14, bold: true, color: NAVY });
  title.addText(`Draft for stakeholder review  ·  ${DATE}`, { x: 0.6, y: 6.7, w: 12, h: 0.4, fontSize: 12, color: SLATE });

  // ── Agenda slide ──
  const agenda = pptx.addSlide();
  agenda.background = { color: 'FFFFFF' };
  agenda.addText('Areas covered', { x: 0.6, y: 0.4, w: 12, h: 0.6, fontSize: 24, bold: true, color: NAVY });
  const agendaRows = [[
    { text: 'Area', options: { bold: true, color: 'FFFFFF', fill: { color: NAVY } } },
    { text: 'Open questions', options: { bold: true, color: 'FFFFFF', fill: { color: NAVY }, align: 'center' } },
  ]];
  for (const c of CATEGORIES) {
    agendaRows.push([
      { text: c.title, options: { bold: true, color: '1E293B' } },
      { text: String(c.rows.length), options: { color: '334155', align: 'center' } },
    ]);
  }
  agenda.addTable(agendaRows, {
    x: 0.6, y: 1.4, w: 12.1, colW: [10.1, 2.0], fontSize: 14,
    border: { type: 'solid', color: 'CBD5E1', pt: 1 }, valign: 'middle', rowH: 0.5,
  });

  // ── One (or more) slide(s) per category ──
  for (const cat of CATEGORIES) {
    const pages = chunk(cat.rows, MAX_ROWS);
    pages.forEach((rows, idx) => {
      const slide = pptx.addSlide();
      slide.background = { color: 'FFFFFF' };
      const heading = pages.length > 1 ? `${cat.title}  (${idx + 1}/${pages.length})` : cat.title;
      slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.22, h: 7.5, fill: { color: cat.color } });
      slide.addText(heading, { x: 0.55, y: 0.35, w: 12.4, h: 0.6, fontSize: 22, bold: true, color: cat.color });

      const table = [[
        { text: 'Open question', options: { bold: true, color: 'FFFFFF', fill: { color: cat.color } } },
        { text: 'Current demo assumption / status', options: { bold: true, color: 'FFFFFF', fill: { color: cat.color } } },
      ]];
      for (const [q, a] of rows) {
        table.push([
          { text: q, options: { color: '1E293B' } },
          { text: a, options: { color: '475569', italic: true } },
        ]);
      }
      slide.addTable(table, {
        x: 0.55, y: 1.2, w: 12.4, colW: [7.2, 5.2], fontSize: 12,
        border: { type: 'solid', color: 'E2E8F0', pt: 1 }, valign: 'top',
        margin: [4, 6, 4, 6], autoPage: false,
      });
    });
  }

  // ── Closing slide ──
  const end = pptx.addSlide();
  end.background = { color: 'F8FAFC' };
  end.addText('Next step', { x: 0.6, y: 2.4, w: 12, h: 0.7, fontSize: 28, bold: true, color: NAVY });
  end.addText(
    'Please review each area and mark every question Confirmed / Change required / Out of scope. ' +
    'Answers unblock wiring the RMA flow to NetSuite + Azure and finalising the catalog inventory model.',
    { x: 0.6, y: 3.2, w: 11.5, h: 1.2, fontSize: 15, color: '334155' }
  );

  const outPath = path.join(ROOT, 'PCS-Customer-Portal-Open-Questions.pptx');
  await pptx.writeFile({ fileName: outPath });
  console.log('PPTX written: PCS-Customer-Portal-Open-Questions.pptx  (' + totalQuestions + ' questions)');
}

main().catch((err) => { console.error(err); process.exit(1); });
