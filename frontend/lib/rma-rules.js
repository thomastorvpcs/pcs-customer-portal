// RMA rule book — the "brain" behind the Validate RMA Data step.
//
// Pure and data-driven so it can be unit-tested and, later, reused by a real
// backend validator. `validateDevice()` takes device facts + a return reason
// and returns a per-IMEI verdict. In the portal every submitted line ends up
// with RMA status "Pending" (final approval happens in NetSuite); this module
// only produces the *validation* verdict shown to the customer before submit.

export const RETURN_WINDOW_DAYS = 60          // accept if sold within 60 days of invoice date
export const CRACKED_LCD_WINDOW_DAYS = 7      // cracked LCD only within 7 days of delivery
export const EXCLUDED_GRADES = ['AS IS', 'UR JP']         // WIP / SoftBank stock — not accepted
export const EXCLUDED_CATEGORIES = ['Accessory', 'iPad', 'Tablet', 'Brand'] // brand products — no RMA

// The 18 portal complaint categories, plus explicit cosmetic granularity
// (Minor / Deep Scratch) so the cosmetic rules are demonstrable. Each reason
// carries whether it requires photo/video evidence and its acceptance policy.
export const RETURN_REASONS = [
  { label: 'Dead Pixel', imageRequired: true, policy: 'accept' },
  {
    label: 'Cracked LCD', imageRequired: true, policy: 'conditional',
    window: {
      from: 'deliveryDate', days: CRACKED_LCD_WINDOW_DAYS,
      failStatus: 'Cracked LCD — 7-day window expired',
      failMessage: `Cracked LCD must be returned within ${CRACKED_LCD_WINDOW_DAYS} days of delivery.`,
    },
  },
  { label: 'Battery Drain', imageRequired: false, policy: 'reject', rejectStatus: 'Battery Not Accepted', rejectMessage: 'Battery-related returns are not accepted.' },
  { label: 'WiFi Not Working', imageRequired: false, policy: 'accept' },
  { label: 'Bluetooth', imageRequired: false, policy: 'accept' },
  { label: 'Charging Port', imageRequired: true, policy: 'accept' },
  { label: 'Speaker/Mic', imageRequired: false, policy: 'accept' },
  { label: 'Face ID', imageRequired: false, policy: 'accept' },
  { label: 'Touch ID', imageRequired: false, policy: 'accept' },
  { label: 'Camera', imageRequired: true, policy: 'accept' },
  { label: 'Water Damage', imageRequired: true, policy: 'reject', rejectStatus: 'Liquid Damage Not Accepted', rejectMessage: 'Liquid / water damage is not covered and cannot be returned.' },
  { label: 'Minor Scratch', imageRequired: true, policy: 'reject', rejectStatus: 'Minor Scratch Not Accepted', rejectMessage: 'Minor cosmetic scratches are not accepted for return.' },
  { label: 'Deep Scratch', imageRequired: true, policy: 'accept' },
  { label: 'Cosmetic Damage', imageRequired: true, policy: 'reject', rejectStatus: 'Cosmetic Not Accepted', rejectMessage: 'Cosmetic-only damage is not approved for return.' },
  { label: 'Wrong Item', imageRequired: true, policy: 'accept' },
  { label: 'Missing Accessories', imageRequired: true, policy: 'accept' },
  { label: 'Software Issue', imageRequired: false, policy: 'accept' },
  { label: 'Carrier Lock', imageRequired: false, policy: 'review', reviewStatus: 'IMEI checked at approval', reviewMessage: 'Carrier-lock / MDM & unlock status is verified during RMA approval.' },
  { label: 'IMEI Mismatch', imageRequired: true, policy: 'accept' },
  { label: 'Other', imageRequired: false, policy: 'accept' },
]

export const REASON_LABELS = RETURN_REASONS.map((r) => r.label)

// Plain-language summary of the rule book, for a stakeholder-facing panel.
export const RULE_BOOK = [
  { title: 'Return period', detail: `Devices must be returned within ${RETURN_WINDOW_DAYS} days of the invoice date.` },
  { title: 'Cracked LCD', detail: `Cracked-LCD returns accepted only within ${CRACKED_LCD_WINDOW_DAYS} days of delivery.` },
  { title: 'iCloud lock', detail: 'iCloud-locked devices are automatically rejected.' },
  { title: 'MDM / carrier lock', detail: 'MDM and unlock status is verified at approval, not auto-rejected.' },
  { title: 'Cosmetic', detail: 'Minor scratches / cosmetic-only damage not accepted; deep scratches accepted.' },
  { title: 'Battery', detail: 'Battery-related returns are not accepted.' },
  { title: 'Excluded stock', detail: 'AS IS (WIP) and UR JP (SoftBank) grades, and brand products (iPads / accessories), are not eligible.' },
  { title: 'Evidence', detail: 'Reasons that require a photo/video cannot be submitted without one attached.' },
]

const getReason = (label) => RETURN_REASONS.find((r) => r.label === label)

export const reasonRequiresImage = (label) => !!getReason(label)?.imageRequired

const toDate = (v) => (v instanceof Date ? v : new Date(v))
const daysBetween = (from, to) => Math.floor((toDate(to) - toDate(from)) / 86400000)

const isExcludedGrade = (grade) => grade != null && EXCLUDED_GRADES.includes(grade)
const isExcludedCategory = (category) => category != null && EXCLUDED_CATEGORIES.includes(category)

// Returns { accepted, imageRequired, daysSold, status, message, tone }
// tone: 'accept' (green) | 'reject' (red) | 'warn' (amber)
export function validateDevice({ reason, facts = {}, today = new Date() } = {}) {
  const meta = getReason(reason)
  const imageRequired = !!meta?.imageRequired
  const daysSold = facts.soldDate != null ? daysBetween(facts.soldDate, today) : null

  const reject = (status, message) => ({ accepted: false, tone: 'reject', imageRequired, daysSold, status, message })

  // Facts we don't have yet (unknown IMEI) → cannot auto-validate, send to review.
  if (!facts || Object.keys(facts).length === 0) {
    return { accepted: false, tone: 'warn', imageRequired, daysSold: null, status: 'Needs review', message: 'Device not found on file — RMA team will verify manually.' }
  }

  // 1. Product / grade eligibility (hard exclusions)
  if (isExcludedCategory(facts.category)) return reject('No RMA for this product', 'Brand products such as iPads and accessories are not eligible for RMA.')
  if (isExcludedGrade(facts.grade)) return reject('Grade Not Accepted', `Devices graded "${facts.grade}" (AS IS / UR JP) are not accepted for return.`)

  // 2. iCloud lock — automatic rejection
  if (facts.icloudLocked) return reject('iCloud Lock Not Accepted', 'iCloud-locked devices are automatically rejected.')

  // 3. Return period
  if (daysSold != null && daysSold > RETURN_WINDOW_DAYS) {
    return reject('Out of Return Period', `Can only return devices purchased within ${RETURN_WINDOW_DAYS} days (sold ${daysSold} days ago).`)
  }

  if (!meta) {
    return { accepted: true, tone: 'accept', imageRequired, daysSold, status: 'Accepted', message: 'Within return period.' }
  }

  // 4. Reason-specific policy
  if (meta.policy === 'reject') return reject(meta.rejectStatus, meta.rejectMessage)

  if (meta.policy === 'conditional' && meta.window) {
    const ref = facts[meta.window.from]
    const sinceRef = ref != null ? daysBetween(ref, today) : null
    if (sinceRef != null && sinceRef > meta.window.days) return reject(meta.window.failStatus, meta.window.failMessage)
  }

  if (meta.policy === 'review') {
    return { accepted: true, tone: 'warn', imageRequired, daysSold, status: meta.reviewStatus, message: meta.reviewMessage }
  }

  // 5. Accepted
  return { accepted: true, tone: 'accept', imageRequired, daysSold, status: 'Accepted', message: daysSold != null ? `Within return period — accepted (sold ${daysSold} days ago).` : 'Accepted.' }
}
