/*
 * generate-open-questions.js
 *
 * Builds a PPTX deck of the "Open questions for the business" captured in the
 * Stage 2 Feature Tickets document
 * (PCS-Customer-Portal-Delivery-Plan-Stage2.md → ...-v1.pdf), one slide per
 * ticket (CQ-01 … CQ-11), grouped by module. Content is transcribed faithfully
 * from that document's "Open questions for the business" sections; items marked
 * "(Resolved)" there are omitted.
 *
 *   node generate-open-questions.js
 *
 * Uses the already-installed dep: pptxgenjs.
 */

const path = require('path');
const PptxGenJS = require('pptxgenjs');

const ROOT = __dirname;
const SOURCE = 'Stage 2 Feature Tickets — Catalog, Sales Estimates & Offers (v1.6, July 10, 2026)';
const DATE = 'July 13, 2026';

// Module colours.
const MODULES = {
  Catalog: '1E40AF',
  'Sales Estimates': '0F766E',
  'Promotional Offers': 'B45309',
};

// Tickets in document order, each with its open questions (verbatim).
const TICKETS = [
  {
    id: 'CQ-01', name: 'Catalog page layout & product display', module: 'Catalog', us: 'US-90',
    questions: [
      'Will real product photography be available per device, or should category placeholder imagery be used for now?',
      'Should the card show a single "from" price, or a price range across grades / storage tiers?',
      'Is quantity shown as an exact number, or banded (e.g. "1,000+ available") for commercial reasons?',
      'With real inventory the grid could be large — should it paginate, load more on scroll, or cap results?',
    ],
  },
  {
    id: 'CQ-02', name: 'Filter, search & sort the catalog', module: 'Catalog', us: 'US-91',
    questions: [
      'What is the default sort order on first load?',
      'Should keyword search match on product name only, or also model, SKU, and other attributes?',
      'Are there filter dimensions beyond those listed that customers will want (e.g. battery health, warranty, lot size)?',
    ],
  },
  {
    id: 'CQ-03', name: 'Save and re-apply a named search', module: 'Catalog', us: 'US-106',
    questions: [
      'Should saved searches be tied to the user’s account and available on any device, or only in the browser where they were created?',
      'Is there a limit to how many saved searches a customer may keep?',
    ],
  },
  {
    id: 'CQ-04', name: 'Favorite devices and filter to favorites', module: 'Catalog', us: 'US-107',
    questions: [
      'Should favorites be tied to the user’s account and available on any device, or only in the browser where they were created?',
      'If a favorited device goes out of stock or is delisted, should it still appear under Favorites (e.g. grayed out) or be dropped?',
    ],
  },
  {
    id: 'CQ-10', name: 'Product detail view', module: 'Catalog', us: 'US-90',
    questions: [
      'When real imagery is available, should the detail view support multiple photos per device (a gallery / carousel)?',
      'Should the detail view show a price breakdown per grade / storage tier rather than a single "from" price? (Carried over from CQ-01.)',
      'Should it surface commercial detail not on the card — e.g. battery health, warranty terms, lead time, or per-location availability?',
      'Should the detail view be individually addressable (its own link) so a specific device can be shared or bookmarked?',
    ],
  },
  {
    id: 'CQ-11', name: 'Device grading guide', module: 'Catalog', us: 'US-108',
    questions: [
      'What are the official definitions and cosmetic / battery thresholds for each PCS grade code (C2–C6, CPO, COB, MD A/B, TBG/TBG2/TBG FIN, CRC/CRD/CRX, D2–D4)? Several are flagged "definition to be confirmed".',
      'Will PCS supply real example photography and walkthrough videos per grade, and who maintains them?',
      'Should the full set of internal grades (beyond those currently on sale) be represented, or only the customer-facing grades?',
      'Should the guide content be authored / editable in a back-office tool, or is a fixed page acceptable for now?',
      'Should the guide be linked from further entry points — e.g. sales estimate lines, order history, or global navigation / footer?',
    ],
  },
  {
    id: 'CQ-05', name: 'Build a sales estimate cart with quantities', module: 'Sales Estimates', us: 'US-92',
    questions: [
      'Should quantity adjust in single units, or in packs (e.g. steps of 10)? Is there a minimum order quantity per device?',
      'Does stock availability cap the quantity a customer can request?',
    ],
  },
  {
    id: 'CQ-06', name: 'Propose custom pricing on a sales estimate', module: 'Sales Estimates', us: 'US-93',
    questions: [
      'Is the reason list fixed (Volume commitment, Competitor quote, Budget constraint, Repeat order, Other), or should a free-text reason be allowed?',
      'Is there a floor / ceiling on how far a proposed price may deviate from the list price before it is auto-rejected or flagged?',
    ],
  },
  {
    id: 'CQ-07', name: 'Submit & track sales estimates, with status history', module: 'Sales Estimates', us: 'US-94, US-95, US-96',
    questions: [
      'Can a customer edit and resubmit a Rejected sales estimate, or must they start a new one?',
      'Is there a limit to how many counter rounds (customer ↔ PCS) are allowed before a sales estimate must be accepted, declined, or expires?',
      'What is the default validity period of a sales estimate, and can a customer request an extension near expiry?',
      'Should the customer be notified (email / SMS / in-app) when a sales estimate’s status changes?',
    ],
  },
  {
    id: 'CQ-08', name: 'Automatic conversion of an accepted estimate to a sales order', module: 'Sales Estimates', us: 'US-97, US-109',
    questions: [
      'Should the customer be notified (email / SMS / in-app) when acceptance produces a sales order?',
      'Does the resulting sales estimate move to a "Converted / Closed" state, or remain Accepted with a link to the order?',
      'Are shipping and billing details taken from the account automatically, or confirmed on the resulting sales order before fulfillment?',
    ],
  },
  {
    id: 'CQ-09', name: 'Hottest Offers & promotional banners', module: 'Promotional Offers', us: 'US-98, US-99',
    questions: [
      'How are offers and banners curated and scheduled (start / end dates), and by whom?',
      'How many featured items should Hottest Offers show, and in what order?',
      'Can more than one banner run at once (a rotation), or only one at a time?',
    ],
  },
];

const totalQuestions = TICKETS.reduce((n, t) => n + t.questions.length, 0);
const NAVY = '1E3A8A';
const SLATE = '64748B';

async function main() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in
  pptx.author = 'PCS Development Team';
  pptx.title = 'PCS Customer Portal — Stage 2 Open Questions for the Business';

  // ── Title slide ──
  const title = pptx.addSlide();
  title.background = { color: 'F8FAFC' };
  title.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.7, fill: { color: NAVY } });
  title.addText('PCS Wireless Customer Portal — Stage 2', { x: 0.6, y: 0.4, w: 12.1, h: 0.6, fontSize: 28, bold: true, color: 'FFFFFF' });
  title.addText('Open Questions for the Business', { x: 0.6, y: 1.05, w: 12.1, h: 0.5, fontSize: 18, color: 'C7D2FE' });
  title.addText(
    [
      { text: 'Product decisions still to be made, surfaced from the Stage 2 feature tickets rather than assumed.', options: { fontSize: 14, color: '334155', breakLine: true } },
      { text: `Source: ${SOURCE}`, options: { fontSize: 12, color: SLATE } },
    ],
    { x: 0.6, y: 2.3, w: 12, h: 1.0 }
  );
  title.addText(`${totalQuestions} open questions across ${TICKETS.length} tickets (CQ-01 … CQ-11)`, { x: 0.6, y: 3.6, w: 12, h: 0.4, fontSize: 14, bold: true, color: NAVY });
  title.addText(`Draft for stakeholder review  ·  ${DATE}`, { x: 0.6, y: 6.7, w: 12, h: 0.4, fontSize: 12, color: SLATE });

  // ── Agenda slide ──
  const agenda = pptx.addSlide();
  agenda.background = { color: 'FFFFFF' };
  agenda.addText('Tickets with open questions', { x: 0.6, y: 0.4, w: 12, h: 0.6, fontSize: 24, bold: true, color: NAVY });
  const rows = [[
    { text: 'Module', options: { bold: true, color: 'FFFFFF', fill: { color: NAVY } } },
    { text: 'Ticket', options: { bold: true, color: 'FFFFFF', fill: { color: NAVY } } },
    { text: 'Open Qs', options: { bold: true, color: 'FFFFFF', fill: { color: NAVY }, align: 'center' } },
  ]];
  for (const t of TICKETS) {
    rows.push([
      { text: t.module, options: { color: MODULES[t.module], bold: true } },
      { text: `${t.id} · ${t.name}`, options: { color: '334155' } },
      { text: String(t.questions.length), options: { color: '334155', align: 'center' } },
    ]);
  }
  agenda.addTable(rows, {
    x: 0.6, y: 1.35, w: 12.1, colW: [2.6, 8.3, 1.2], fontSize: 12.5,
    border: { type: 'solid', color: 'CBD5E1', pt: 1 }, valign: 'middle', rowH: 0.42,
  });

  // ── One slide per ticket ──
  for (const t of TICKETS) {
    const color = MODULES[t.module];
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.22, h: 7.5, fill: { color } });
    slide.addText(`${t.id} · ${t.name}`, { x: 0.55, y: 0.35, w: 12.4, h: 0.7, fontSize: 21, bold: true, color });
    slide.addText(`${t.module}  ·  ${t.us}`, { x: 0.55, y: 1.02, w: 12.4, h: 0.35, fontSize: 12, italic: true, color: SLATE });

    const bullets = t.questions.map((q, i) => ({
      text: q,
      options: { bullet: { code: '2022' }, fontSize: 15, color: '1E293B', paraSpaceAfter: 10, breakLine: i < t.questions.length - 1 },
    }));
    slide.addText(bullets, { x: 0.7, y: 1.6, w: 12.1, h: 5.4, valign: 'top', lineSpacingMultiple: 1.05 });
  }

  // ── Closing slide ──
  const end = pptx.addSlide();
  end.background = { color: 'F8FAFC' };
  end.addText('Next step', { x: 0.6, y: 2.4, w: 12, h: 0.7, fontSize: 28, bold: true, color: NAVY });
  end.addText(
    'Please review each ticket and give a decision on its open questions. These are the product decisions ' +
    'the Stage 2 feature tickets flagged for the business; resolving them lets development finalise the ' +
    'catalog, sales estimates, and promotional-offer behaviour.',
    { x: 0.6, y: 3.2, w: 11.6, h: 1.4, fontSize: 15, color: '334155' }
  );

  const outPath = path.join(ROOT, 'PCS-Customer-Portal-Stage2-Open-Questions.pptx');
  await pptx.writeFile({ fileName: outPath });
  console.log('PPTX written: PCS-Customer-Portal-Stage2-Open-Questions.pptx  (' + totalQuestions + ' questions, ' + TICKETS.length + ' tickets)');
}

main().catch((err) => { console.error(err); process.exit(1); });
