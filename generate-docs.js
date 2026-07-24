/*
 * generate-docs.js
 *
 * Renders the PCS Customer Portal requirements markdown into PDF, and builds a
 * short PPTX overview deck for the Stage 2 / Stage 3 feature set.
 *
 *   node generate-docs.js            # generate everything (PDFs + PPTX)
 *   node generate-docs.js pdf        # PDFs only
 *   node generate-docs.js pptx       # overview deck only
 *
 * Uses the already-installed deps: marked, puppeteer, pptxgenjs.
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const puppeteer = require('puppeteer');
const PptxGenJS = require('pptxgenjs');

const ROOT = __dirname;

// Documents to render to PDF: [source markdown, output PDF].
const PDF_DOCS = [
  ['PCS-Customer-Portal-Requirements-Stage2.md', 'PCS-Customer-Portal-Requirements-Stage2-v1.pdf'],
  ['PCS-Customer-Portal-Requirements-Stage3.md', 'PCS-Customer-Portal-Requirements-Stage3-v1.pdf'],
  ['PCS-Customer-Portal-Delivery-Plan-Stage2.md', 'PCS-Customer-Portal-Delivery-Plan-Stage2-v1.pdf'],
  ['PCS-Customer-Portal-Functional-Spec-Catalog-Sales-Orders.md', 'PCS-Customer-Portal-Functional-Spec-Catalog-Sales-Orders-v1.pdf'],
];

// Print stylesheet — professional requirements-doc look (Inter/Arial), tuned for A4 print.
const PRINT_CSS = `
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    color: #0f172a;
    font-size: 10.5pt;
    line-height: 1.5;
    margin: 0;
  }
  h1 { font-size: 20pt; color: #1e3a8a; margin: 0 0 6px; }
  h2 {
    font-size: 14pt; color: #1e40af; margin: 22px 0 8px;
    padding-bottom: 4px; border-bottom: 2px solid #e2e8f0;
    break-after: avoid; page-break-after: avoid;
  }
  h3 { font-size: 11.5pt; color: #334155; margin: 16px 0 6px; break-after: avoid; page-break-after: avoid; }
  h4 { font-size: 10.5pt; color: #475569; margin: 12px 0 4px; }
  p { margin: 6px 0; }
  strong { color: #0f172a; }
  a { color: #1d4ed8; text-decoration: none; }
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 18px 0; }
  ul { margin: 6px 0; padding-left: 20px; }
  li { margin: 3px 0; }
  blockquote {
    margin: 10px 0; padding: 8px 12px;
    background: #f8fafc; border-left: 4px solid #2563eb; color: #334155;
  }
  table {
    border-collapse: collapse; width: 100%; margin: 10px 0;
    font-size: 9.5pt; break-inside: auto;
  }
  th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; vertical-align: top; }
  th { background: #eff6ff; color: #1e40af; font-weight: 600; }
  tr { break-inside: avoid; page-break-inside: avoid; }
  code { background: #f1f5f9; padding: 1px 4px; border-radius: 3px; font-size: 9pt; }
`;

function mdToHtml(markdownPath) {
  const md = fs.readFileSync(markdownPath, 'utf8');
  const body = marked.parse(md);
  return `<!doctype html><html><head><meta charset="utf-8">
    <style>@page { size: A4; margin: 18mm 16mm; } ${PRINT_CSS}</style>
    </head><body>${body}</body></html>`;
}

async function generatePdfs() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    for (const [src, out] of PDF_DOCS) {
      const srcPath = path.join(ROOT, src);
      const outPath = path.join(ROOT, out);
      const page = await browser.newPage();
      await page.setContent(mdToHtml(srcPath), { waitUntil: 'networkidle0' });
      await page.pdf({
        path: outPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' },
      });
      await page.close();
      console.log('PDF written:', out);
    }
  } finally {
    await browser.close();
  }
}

// Stage overview content for the PPTX deck.
const STAGES = [
  {
    title: 'Stage 2 — Customer Self-Service & Revenue',
    color: '1E40AF',
    subtitle: 'High-value, existing-customer features with minimal external dependency',
    areas: [
      ['Returns (RMA)', 'Submit & track returns, complaint reasons, credit memos, return labels — US-80–US-89'],
      ['Catalog, Sales Estimates & Offers', 'Browse catalog, build & submit sales estimates, promotional offers — US-90–US-99'],
      ['Online Payments', 'Pay invoices by card / ACH, receipts, live balance updates — US-100–US-104'],
      ['Reorder', 'Repeat a previous order pre-populated with the same items — US-105'],
    ],
  },
  {
    title: 'Stage 3 — Integrations, Automation & Advanced',
    color: '6D28D9',
    subtitle: 'Features with external prerequisites (carriers, ERP, calendar) and prospect onboarding',
    areas: [
      ['Integrations', 'API keys, webhooks, ERP/WMS (SAP/NetSuite) sync — US-110–US-116'],
      ['Shipment Enhancements', 'Carrier tracking, pickup authorization, delivery SMS — US-120–US-125'],
      ['New Customer Application', '5-step self-service prospect onboarding wizard — US-130–US-136'],
      ['Meeting Scheduler', 'Book/reschedule meetings with sales rep, calendar sync — US-140–US-145'],
      ['General & Advanced (epics)', 'Live chat, analytics, multi-currency, native app, passkeys — US-150–US-155'],
    ],
  },
];

async function generatePptx() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'PCS Development Team';
  pptx.title = 'PCS Customer Portal — Stage 2 & Stage 3 Overview';

  // Title slide.
  const title = pptx.addSlide();
  title.background = { color: 'F8FAFC' };
  title.addText('PCS Wireless Customer Portal', { x: 0.6, y: 1.8, w: 12, h: 0.8, fontSize: 34, bold: true, color: '1E3A8A' });
  title.addText('Stage 2 & Stage 3 — Next Phases Overview', { x: 0.6, y: 2.7, w: 12, h: 0.6, fontSize: 20, color: '1E40AF' });
  title.addText('Draft — Pending Business Sign-Off  ·  July 2, 2026', { x: 0.6, y: 3.4, w: 12, h: 0.4, fontSize: 12, color: '64748B' });

  // One slide per stage.
  for (const stage of STAGES) {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    slide.addText(stage.title, { x: 0.6, y: 0.4, w: 12, h: 0.6, fontSize: 24, bold: true, color: stage.color });
    slide.addText(stage.subtitle, { x: 0.6, y: 1.05, w: 12, h: 0.4, fontSize: 13, italic: true, color: '64748B' });

    const rows = [[
      { text: 'Feature Area', options: { bold: true, color: 'FFFFFF', fill: stage.color } },
      { text: 'Scope & User Stories', options: { bold: true, color: 'FFFFFF', fill: stage.color } },
    ]];
    for (const [area, desc] of stage.areas) {
      rows.push([
        { text: area, options: { bold: true, color: '1E293B' } },
        { text: desc, options: { color: '334155' } },
      ]);
    }
    slide.addTable(rows, {
      x: 0.6, y: 1.6, w: 12.1,
      colW: [3.4, 8.7],
      fontSize: 13,
      border: { type: 'solid', color: 'CBD5E1', pt: 1 },
      valign: 'middle',
      rowH: 0.6,
    });
  }

  const outPath = path.join(ROOT, 'PCS-Customer-Portal-Stage2-Stage3-Overview.pptx');
  await pptx.writeFile({ fileName: outPath });
  console.log('PPTX written: PCS-Customer-Portal-Stage2-Stage3-Overview.pptx');
}

async function main() {
  const mode = process.argv[2] || 'all';
  if (mode === 'all' || mode === 'pdf') await generatePdfs();
  if (mode === 'all' || mode === 'pptx') await generatePptx();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
