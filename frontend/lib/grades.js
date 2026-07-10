// Shared grade definitions — single source of truth for the catalog detail
// view (short blurb + badge), the catalog grade filter/badges, and the
// customer-facing Grading Guide page.
//
// Codes are PCS's real grade set, seeded from the internal grade list. Many
// are placeholders pending authoritative PCS definitions (see `placeholder`
// and `source`). Once definitions land, each grade can also carry optional
// `spec` ({ screen, housing, functional, battery }), `highlights` (string[]),
// `examples` ([{ view, caption, src }]) and `videoUrl`/`poster` — the guide
// renders those when present and degrades gracefully when absent.

export const GRADES = [
  // ── Cosmetic categories (best → heaviest wear) ──
  {
    code: 'C6', slug: 'c6', name: 'Cosmetic Category C6', tagline: 'Cosmetic grade — like-new',
    examples: [{ view: 'Front', caption: 'Clean display, only light marks', src: null }, { view: 'Back', caption: 'Housing near-flawless', src: null }, { view: 'Edges', caption: 'Sharp corners, minimal wear', src: null }],
    badge: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400', accent: '#16a34a',
    short: 'Very good to like-new cosmetic appearance with light wear.',
    summary: 'Very good to like-new cosmetic appearance with light wear. Frequently mapped near top cosmetic classes in secondary markets, depending on strictness.',
    source: 'CTIA Wireless Device Grading Scales v5.0 (REC mapping context)',
  },
  {
    code: 'C5', slug: 'c5', name: 'Cosmetic Category C5', tagline: 'Cosmetic grade — good',
    examples: [{ view: 'Front', caption: 'Minor marks, fully usable', src: null }, { view: 'Back', caption: 'Light scuffs on housing', src: null }, { view: 'Edges', caption: 'Slight edge wear', src: null }],
    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', accent: '#059669',
    short: 'Good/used condition with visible but moderate wear and tear.',
    summary: 'Good/used condition with visible but moderate wear and tear. Often accepted for value-tier resale where cosmetic perfection is not required.',
    source: 'CTIA Wireless Device Grading Scales v5.0 (REC mapping context)',
  },
  {
    code: 'C4', slug: 'c4', name: 'Cosmetic Category C4', tagline: 'Cosmetic grade — fair',
    examples: [{ view: 'Front', caption: 'Visible scratches, no cracks', src: null }, { view: 'Back', caption: 'Noticeable scuffs and scratches', src: null }, { view: 'Edges', caption: 'Moderate edge wear', src: null }],
    badge: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', accent: '#d97706',
    short: 'Fair condition with significant cosmetic wear, but generally not severe structural breakage.',
    summary: 'Fair condition with significant cosmetic wear, but generally not severe structural breakage. Commonly treated as lower resale cosmetic quality. Exact defect limits vary by trading partner.',
    source: 'CTIA Wireless Device Grading Scales v5.0 (REC mapping context)',
  },
  {
    code: 'C2', slug: 'c2', name: 'Cosmetic Category C2', tagline: 'Cosmetic grade — heavy wear',
    examples: [{ view: 'Front', caption: 'Deep scratches; screen still functional', src: null }, { view: 'Back', caption: 'Heavy wear, chips possible', src: null }, { view: 'Edges', caption: 'Dents / chips on corners', src: null }],
    badge: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', accent: '#ea580c',
    short: 'Heavy cosmetic wear and/or visible damage, typically including deep scratches and chips.',
    summary: 'Heavy cosmetic wear and/or visible damage, typically including deep scratches and chips. Based on common secondary-market interpretations of REC/CTIA cosmetic mappings. Confirm acceptance thresholds with your internal QA SOP.',
    source: 'CTIA Wireless Device Grading Scales v5.0 (REC mapping context)',
  },

  // ── Certified / open-box ──
  {
    code: 'CPO', slug: 'cpo', name: 'Certified Pre-Owned', tagline: 'Certified pre-owned',
    examples: [{ view: 'Front', caption: 'Restored, near-new display', src: null }, { view: 'Back', caption: 'Cleaned, certified housing', src: null }, { view: 'Edges', caption: 'Inspected; warranty-backed', src: null }],
    badge: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', accent: '#2563eb',
    short: 'Used device restored/tested to a high standard, typically close to like-new and warranty-backed by seller program.',
    summary: 'Used device restored/tested to a high standard, typically close to like-new and warranty-backed by seller program. CPO meaning depends on seller program rules (testing, cosmetic threshold, battery threshold, accessories, warranty).',
    source: 'Common industry usage (CPO programs)',
  },
  {
    code: 'COB', slug: 'cob', name: 'COB', tagline: 'Open-box code',
    examples: [{ view: 'Front', caption: 'Open-box, like-new display', src: null }, { view: 'Back', caption: 'Minimal handling marks', src: null }, { view: 'Edges', caption: 'Repackaged and inspected', src: null }],
    badge: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400', accent: '#0284c7',
    short: 'Placeholder: likely an Open Box-related commercial code.',
    summary: 'Placeholder: likely an Open Box-related commercial code. Confirm internal meaning (for example: Customer Open Box vs Certified Open Box) before operational use.',
    source: 'Placeholder — internal definition required', placeholder: true,
  },

  // ── Master Dealer codes ──
  {
    code: 'MD A', slug: 'md-a', name: 'MD A', tagline: 'Master Dealer code',
    badge: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400', accent: '#4f46e5',
    short: 'Placeholder: likely an internal/partner Master Dealer condition code.',
    summary: 'Placeholder: likely an internal/partner Master Dealer condition code. No universal public definition found. Confirm internally before exposing in contracts.',
    source: 'Placeholder — internal definition required', placeholder: true,
  },
  {
    code: 'MD B', slug: 'md-b', name: 'MD B', tagline: 'Master Dealer code',
    badge: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400', accent: '#6366f1',
    short: 'Placeholder: likely an internal/partner Master Dealer condition code.',
    summary: 'Placeholder: likely an internal/partner Master Dealer condition code. No universal public definition found. Confirm internally before exposing in contracts.',
    source: 'Placeholder — internal definition required', placeholder: true,
  },

  // ── To-Be-Graded workflow ──
  {
    code: 'TBG', slug: 'tbg', name: 'TBG', tagline: 'Awaiting grading',
    badge: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', accent: '#64748b',
    short: 'Placeholder: likely To Be Graded.',
    summary: 'Placeholder: likely To Be Graded. Often used operationally before a final cosmetic/functional grade is assigned. Confirm your internal workflow definition.',
    source: 'Placeholder — internal definition required', placeholder: true,
  },
  {
    code: 'TBG2', slug: 'tbg2', name: 'TBG2', tagline: 'Grading workflow stage',
    badge: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', accent: '#64748b',
    short: 'Placeholder code.',
    summary: 'Placeholder code. Likely a second stage in a To Be Graded workflow. Confirm exact process meaning internally.',
    source: 'Placeholder — internal definition required', placeholder: true,
  },
  {
    code: 'TBG FIN', slug: 'tbg-fin', name: 'TBG FIN', tagline: 'Grading workflow stage',
    badge: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', accent: '#64748b',
    short: 'Placeholder code.',
    summary: 'Placeholder code. Likely a finalized step in a TBG flow. Confirm exact process meaning internally.',
    source: 'Placeholder — internal definition required', placeholder: true,
  },

  // ── Partner codes ──
  {
    code: 'CRC', slug: 'crc', name: 'CRC', tagline: 'Partner code',
    badge: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', accent: '#9333ea',
    short: 'Placeholder grade code.',
    summary: 'Placeholder grade code. No reliable public standard matched this acronym in handset grading. Define internally.',
    source: 'Placeholder — internal definition required', placeholder: true,
  },
  {
    code: 'CRD', slug: 'crd', name: 'CRD', tagline: 'Partner code',
    badge: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', accent: '#9333ea',
    short: 'Placeholder grade code.',
    summary: 'Placeholder grade code. No reliable public standard matched this acronym in handset grading. Define internally.',
    source: 'Placeholder — internal definition required', placeholder: true,
  },
  {
    code: 'CRX', slug: 'crx', name: 'CRX', tagline: 'Partner code',
    badge: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', accent: '#9333ea',
    short: 'Placeholder grade code.',
    summary: 'Placeholder grade code. No reliable public standard matched this acronym in handset grading. Define internally.',
    source: 'Placeholder — internal definition required', placeholder: true,
  },

  // ── Damage / defect tiers ──
  {
    code: 'D2', slug: 'd2', name: 'D2', tagline: 'Damage / defect tier',
    badge: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400', accent: '#e11d48',
    short: 'Placeholder: likely a deeper damage/defect tier code.',
    summary: 'Placeholder: likely a deeper damage/defect tier code. Potentially tied to a partner-specific damage matrix. Confirm exact pass/fail requirements internally.',
    source: 'Placeholder — internal definition required', placeholder: true,
  },
  {
    code: 'D3', slug: 'd3', name: 'D3', tagline: 'Damage / defect tier',
    badge: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400', accent: '#dc2626',
    short: 'Placeholder: likely a deeper damage/defect tier code.',
    summary: 'Placeholder: likely a deeper damage/defect tier code. Potentially tied to a partner-specific damage matrix. Confirm exact pass/fail requirements internally.',
    source: 'Placeholder — internal definition required', placeholder: true,
  },
  {
    code: 'D4', slug: 'd4', name: 'D4', tagline: 'Damage / defect tier',
    badge: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400', accent: '#b91c1c',
    short: 'Placeholder: likely a deeper damage/defect tier code.',
    summary: 'Placeholder: likely a deeper damage/defect tier code. Potentially tied to a partner-specific damage matrix. Confirm exact pass/fail requirements internally.',
    source: 'Placeholder — internal definition required', placeholder: true,
  },
]

export const GRADE_BY_CODE = Object.fromEntries(GRADES.map((g) => [g.code, g]))
export const GRADE_BY_SLUG = Object.fromEntries(GRADES.map((g) => [g.slug, g]))

// Fallback badge styling for any code not found in GRADES.
export const GRADE_BADGE_FALLBACK = 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
export const gradeBadgeClass = (code) => GRADE_BY_CODE[code]?.badge || GRADE_BADGE_FALLBACK
