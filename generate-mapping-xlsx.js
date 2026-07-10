/*
 * generate-mapping-xlsx.js
 *
 * Builds a fillable Excel workbook for the Catalog <-> NetSuite field mapping,
 * pre-populated from PCS-Customer-Portal-Catalog-NetSuite-Mapping.md so the
 * team only has to confirm/complete the highlighted columns.
 *
 *   node generate-mapping-xlsx.js
 *
 * Output: PCS-Customer-Portal-Catalog-NetSuite-Mapping.xlsx
 */

const path = require('path');
const ExcelJS = require('exceljs');

const OUT = path.join(__dirname, 'PCS-Customer-Portal-Catalog-NetSuite-Mapping.xlsx');

// Rows pre-filled from the mapping doc. The "NetSuite field / ID", "NetSuite
// field type", "Status" and "Developer notes" columns are left for the team.
const rows = [
  ['Identity & naming', 'Item key (internal — not shown)', 'Internal only', 'No', 'internalId', 'Primary key for the catalog row; links estimate/order lines back to the item.', 'Required'],
  ['Identity & naming', 'SKU', 'Estimate / order line', 'Yes', 'itemid (Name/Number)', 'Shown as the SKU on sales-estimate line items (not on the card).', 'Required'],
  ['Identity & naming', 'Product name', 'Card + Detail title', 'Yes', 'displayname (fallback itemid)', 'If Display Name is empty, compose from Model + Storage + Colour.', 'Required'],
  ['Identity & naming', 'Brand / Manufacturer', 'Detail + Filter', 'Yes', 'manufacturer OR custitem_brand', 'Confirm standard Manufacturer field vs a custom one.', 'Required'],
  ['Identity & naming', 'Model', 'Detail + Filter', 'Yes', 'custitem_model', '', 'Required'],
  ['Identity & naming', 'Model family (grouping)', 'Filter (grouping)', 'Grouping', 'custitem_model_family', 'Groups variants for filtering.', 'Optional'],
  ['Identity & naming', 'Category / Device class', 'Category icon + Filter', 'Yes', 'Item Class OR custitem_device_category', 'Confirm: Class, Category, or custom. Drives the category icon.', 'Required'],

  ['Condition & specs', 'Grade (A / B)', 'Badge + Detail + Filter + Grading guide', 'Yes', 'custitem_grade', 'Drives grade badge + links to grading guide. Confirm value set maps to A/B.', 'Required'],
  ['Condition & specs', 'Storage', 'Spec line + Detail + Filter', 'Yes', 'custitem_storage', 'Store the number; portal displays "128GB".', 'Optional'],
  ['Condition & specs', 'Colour', 'Spec line + Detail + Filter', 'Yes', 'custitem_color', '', 'Optional'],
  ['Condition & specs', 'Carrier', 'Spec line + Detail + Filter', 'Yes', 'custitem_carrier', 'Omitted where not applicable (e.g. laptops).', 'Optional'],
  ['Condition & specs', 'Screen size', 'Detail (optional)', 'Yes', 'custitem_screen_size', '', 'Optional'],
  ['Condition & specs', 'Kit type', 'Detail (optional)', 'Yes', 'custitem_kit_type', '', 'Optional'],
  ['Condition & specs', 'Modular', 'Detail (optional)', 'Yes', 'custitem_modular', '', 'Optional'],
  ['Condition & specs', 'Region', 'Filter (optional)', 'Confirm', 'custitem_region', 'Confirm if this should be customer-facing.', 'Optional'],
  ['Condition & specs', 'Product notes / description', 'Detail', 'Yes', 'salesdescription', '', 'Optional'],

  ['Media', 'Primary image / thumbnail', 'Card + Detail', 'Yes', 'storedisplayimage OR File Cabinet URL', 'Currently a placeholder icon. Confirm source (item image / file cabinet / external DAM).', 'Optional'],
  ['Media', 'Additional images (gallery)', 'Detail (future)', 'Yes', 'custitem_images', 'Enables a detail-view gallery when imagery exists.', 'Optional'],

  ['Pricing', 'Indicative "from" unit price', 'Card + Detail', 'Yes', 'baseprice OR a price level', 'Shown as "from $X". Confirm which price level to surface.', 'Required'],
  ['Pricing', 'Per-customer / contract price (future)', 'Estimate flow', 'Yes', 'Customer price level', 'Not the catalog indicative price; relevant to the estimate flow.', 'Optional'],

  ['Availability & inventory', 'Quantity available (total)', 'Card + Detail', 'Yes', 'quantityavailable', 'Sum of per-location quantities. Show exact or banded?', 'Required'],
  ['Availability & inventory', 'Per-location quantity', 'Detail — Availability by location', 'Yes', 'locationquantityavailable (inventory sublist)', 'Feeds the per-location breakdown; total rolls up from these.', 'Required'],
  ['Availability & inventory', 'Stock location(s)', 'Card + Detail + Filter', 'Yes', 'inventorylocation', 'Display e.g. "Miami, FL". Confirm which locations are exposed to customers.', 'Required'],

  ['Merchandising', 'Promo tag ("New Arrival", "Best Seller", "Limited")', 'Card badge', 'Yes', 'custitem_promo_tag OR portal-managed', 'Confirm owner: NetSuite custom field vs portal back-office.', 'Optional'],
  ['Merchandising', 'Featured / Hottest Offer flag', 'Hottest Offers rail + banner', 'Yes', 'custitem_featured OR portal-managed', 'Confirm owner: NetSuite vs portal.', 'Optional'],
  ['Merchandising', 'Catalog visibility flag', 'Controls listing', 'No', 'isonline OR custitem_show_in_portal', 'Recommended: explicit "show in portal" flag rather than "anything in stock".', 'Required'],
];

const questions = [
  'Provide the actual custitem_* internal IDs for: brand, model, model family, category, grade, storage, colour, carrier, screen size, kit type, modular, region.',
  'Category — is it the NetSuite Class, the Category field, or a custom field?',
  'Manufacturer — standard Manufacturer field or a custom field?',
  'Which price level should the catalog "from" price read (Base Price vs an online/customer level)? Any per-customer catalog pricing?',
  'Catalog visibility — is there (or should there be) an explicit "show in portal" flag, or is visibility "in stock at an exposed location"?',
  'Which inventory locations are exposed to customers, and should quantities be exact or banded (e.g. "1,000+")?',
  'Product images — stored in NetSuite (item image / file cabinet) or an external source/URL?',
  'Merchandising — are promo tags and the featured/hottest flag curated in NetSuite or in a portal back-office tool?',
  'What is the full list of NetSuite grade codes, and how do they map to the customer-facing grades (currently A / B)?',
];

// ── styling helpers ──
const NAVY = 'FF0B1B3A';
const AMBER = 'FFF59E0B';
const AMBER_LIGHT = 'FFFEF3C7';
const GREY_LIGHT = 'FFF1F5F9';
const border = { style: 'thin', color: { argb: 'FFCBD5E1' } };
const allBorders = { top: border, left: border, bottom: border, right: border };

function styleHeader(row, fillArgb) {
  row.height = 30;
  row.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fillArgb } };
    cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    cell.border = allBorders;
  });
}

async function main() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'PCS Wireless';
  wb.created = new Date();

  // ── Sheet 1: Instructions ──
  const info = wb.addWorksheet('Instructions', { properties: { tabColor: { argb: NAVY } } });
  info.getColumn(1).width = 4;
  info.getColumn(2).width = 110;
  const lines = [
    ['', 'PCS Wireless Customer Portal — Catalog ↔ NetSuite Field Mapping'],
    ['', 'Draft v0.1 · fill this out with the NetSuite admin + developers'],
    ['', ''],
    ['', 'HOW TO USE'],
    ['', '1. Open the "Field Mapping" sheet. Each row is one data point the portal shows about a catalog item.'],
    ['', '2. Columns already filled (Portal field, Where shown, Suggested NetSuite field, Transform) are our draft — edit if wrong.'],
    ['', '3. Complete the AMBER columns: NetSuite field / ID, NetSuite field type, Status, Developer notes.'],
    ['', '4. "Suggested NetSuite field" is a starting guess. custitem_* names are placeholders — replace with the real internal IDs.'],
    ['', '5. Set Status to Confirmed once the NetSuite admin has verified the field.'],
    ['', '6. Work through the "Open Questions" sheet in parallel — those answers unblock several rows.'],
    ['', ''],
    ['', 'LEGEND'],
    ['', 'Status:  To confirm  ·  Confirmed  ·  Not in NetSuite  ·  N/A'],
    ['', 'Field type:  Standard field · Custom (custitem_*) · List/Record · Free-Form Text · Integer · Decimal · Checkbox · Image/File · Pricing sublist · Inventory sublist · N/A'],
    ['', 'Amber column headers = you fill these in.'],
    ['', ''],
    ['', 'Integration flow:  NetSuite (item + inventory)  →  Boomi  →  portal DB (devices / device_inventory / locations)  →  Catalog UI'],
  ];
  lines.forEach((l, i) => {
    const r = info.addRow(l);
    if (i === 0) r.getCell(2).font = { bold: true, size: 16, color: { argb: NAVY } };
    else if (i === 1) r.getCell(2).font = { italic: true, size: 11, color: { argb: 'FF64748B' } };
    else if (['HOW TO USE', 'LEGEND'].includes(l[1])) r.getCell(2).font = { bold: true, size: 12, color: { argb: NAVY } };
    r.getCell(2).alignment = { wrapText: true, vertical: 'top' };
  });

  // ── Sheet 2: Field Mapping ──
  const ws = wb.addWorksheet('Field Mapping', {
    views: [{ state: 'frozen', ySplit: 1 }],
    properties: { tabColor: { argb: AMBER } },
  });
  ws.columns = [
    { header: 'Ref', key: 'ref', width: 8 },
    { header: 'Section', key: 'section', width: 20 },
    { header: 'Portal field (shown to customer)', key: 'portalField', width: 34 },
    { header: 'Where shown', key: 'whereShown', width: 26 },
    { header: 'Shown to customer?', key: 'shownToCustomer', width: 15 },
    { header: 'Suggested NetSuite field (draft)', key: 'suggestedNsField', width: 34 },
    { header: 'NetSuite field / ID  ▶ FILL', key: 'nsFieldId', width: 28 },
    { header: 'NetSuite field type  ▶ FILL', key: 'nsFieldType', width: 22 },
    { header: 'Transform / formatting notes', key: 'transform', width: 42 },
    { header: 'Required?', key: 'required', width: 12 },
    { header: 'Status  ▶ FILL', key: 'status', width: 16 },
    { header: 'Developer notes  ▶ FILL', key: 'devNotes', width: 34 },
  ];

  const fillKeys = new Set(['nsFieldId', 'nsFieldType', 'status', 'devNotes']);
  // Header row: navy default, amber for the fill columns
  ws.getRow(1).eachCell((cell, col) => {
    const key = ws.getColumn(col).key;
    const amber = fillKeys.has(key);
    cell.font = { bold: true, color: { argb: amber ? NAVY : 'FFFFFFFF' }, size: 11 };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: amber ? AMBER : NAVY } };
    cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    cell.border = allBorders;
  });
  ws.getRow(1).height = 32;

  rows.forEach((r, i) => {
    const [section, portalField, whereShown, shownToCustomer, suggestedNsField, transform, required] = r;
    const row = ws.addRow({
      ref: 'REF-' + String(i + 1).padStart(2, '0'),
      section, portalField, whereShown, shownToCustomer, suggestedNsField,
      nsFieldId: '', nsFieldType: '', transform, required,
      status: 'To confirm', devNotes: '',
    });
    row.eachCell({ includeEmpty: true }, (cell, col) => {
      const key = ws.getColumn(col).key;
      cell.alignment = { vertical: 'top', wrapText: true };
      cell.border = allBorders;
      if (fillKeys.has(key)) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: AMBER_LIGHT } };
      else if (i % 2 === 1) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREY_LIGHT } };
    });
  });

  const last = ws.rowCount;
  ws.autoFilter = { from: 'A1', to: { row: 1, column: ws.columnCount } };

  // Dropdowns (data validation) on the fillable / choice columns
  const dv = (colLetter, list) => {
    for (let r = 2; r <= last; r++) {
      ws.getCell(`${colLetter}${r}`).dataValidation = {
        type: 'list', allowBlank: true, formulae: [`"${list}"`],
      };
    }
  };
  dv('E', 'Yes,No,Grouping,Confirm');
  dv('H', 'Standard field,Custom (custitem_*),List/Record,Free-Form Text,Integer,Decimal,Checkbox,Image/File,Pricing sublist,Inventory sublist,N/A');
  dv('J', 'Required,Optional,Conditional');
  dv('K', 'To confirm,Confirmed,Not in NetSuite,N/A');

  // ── Sheet 3: Open Questions ──
  const q = wb.addWorksheet('Open Questions', { views: [{ state: 'frozen', ySplit: 1 }] });
  q.columns = [
    { header: '#', key: 'n', width: 5 },
    { header: 'Question', key: 'question', width: 80 },
    { header: 'Owner  ▶ FILL', key: 'owner', width: 20 },
    { header: 'Answer  ▶ FILL', key: 'answer', width: 50 },
    { header: 'Status  ▶ FILL', key: 'status', width: 16 },
  ];
  styleHeader(q.getRow(1), NAVY);
  questions.forEach((question, i) => {
    const row = q.addRow({ n: i + 1, question, owner: '', answer: '', status: 'Open' });
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.alignment = { vertical: 'top', wrapText: true };
      cell.border = allBorders;
    });
    ['C', 'D', 'E'].forEach((c) => {
      row.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: AMBER_LIGHT } };
    });
  });
  for (let r = 2; r <= q.rowCount; r++) {
    q.getCell(`E${r}`).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Open,Answered,Blocked"'] };
  }

  await wb.xlsx.writeFile(OUT);
  console.log('XLSX written:', path.basename(OUT), `(${rows.length} mapping rows, ${questions.length} open questions)`);
}

main().catch((err) => { console.error(err); process.exit(1); });
