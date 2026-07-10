// Demo mock data for the RMA submission wizard. UI-only prototype — nothing
// here is fetched or persisted. Device facts are deliberately spread so the
// Validate step exercises every branch of the rule book (in-period accept,
// out-of-period, iCloud lock, excluded grade, brand/accessory, cracked-LCD
// window). Dates are computed relative to "today" so the day counts stay
// stable no matter when the demo is run.

const daysAgo = (n) => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - n)
  return d
}

// Logged-in customer (mirrors the Settings mock) — used for the NetSuite
// createRMA payload preview.
export const MOCK_CUSTOMER = {
  internalId: '4821',
  accountId: 'TM-2024-0482',
  name: 'TechMobile Distributors LLC',
  subsidiary: 'PCS Wireless US',
  location: 'Miami, FL — Warehouse 3',
}

export const CARRIERS = ['UPS', 'FedEx', 'USPS', 'DHL Express', 'Other']

export const RETURN_INSTRUCTIONS = [
  'Pack each device in its original box or equivalent protective packaging.',
  'Place a copy of the RMA slip inside each box; write the RMA number on the outside.',
  'Do not ship devices that failed validation unless instructed by the RMA team.',
  'Drop off with the selected carrier and enter the tracking number below.',
]

export const RETURN_POLICY_TEXT =
  'Devices must be returned within the authorized return period in the same condition described at submission. ' +
  'iCloud-locked, liquid-damaged, and excluded-grade devices are not eligible. PCS Wireless inspects all returned ' +
  'units on receipt; credit is issued after diagnostics. Shipping the wrong or undeclared units may delay or void the RMA.'

// Shared device pool. itemId = NetSuite Item Internal ID (round-trips in the payload).
const DEVICES = {
  a: { imei: '354872109348721', itemId: '48213', model: 'iPhone 13 Pro 128GB', grade: 'C6', category: 'Phone', soldDate: daysAgo(18), deliveryDate: daysAgo(14), icloudLocked: false, mdm: false },
  b: { imei: '354872109348722', itemId: '48213', model: 'iPhone 13 Pro 128GB', grade: 'C5', category: 'Phone', soldDate: daysAgo(18), deliveryDate: daysAgo(14), icloudLocked: false, mdm: false },
  c: { imei: '359102847561023', itemId: '50871', model: 'Galaxy S23 256GB', grade: 'C4', category: 'Phone', soldDate: daysAgo(75), deliveryDate: daysAgo(70), icloudLocked: false, mdm: false },
  d: { imei: '354120983746512', itemId: '48990', model: 'iPhone 12 64GB', grade: 'C6', category: 'Phone', soldDate: daysAgo(9), deliveryDate: daysAgo(2), icloudLocked: true, mdm: false },
  e: { imei: '357294018273645', itemId: '51220', model: 'Pixel 8 Pro 128GB', grade: 'AS IS', category: 'Phone', soldDate: daysAgo(20), deliveryDate: daysAgo(16), icloudLocked: false, mdm: true },
  f: { imei: '353781092836471', itemId: '52001', model: 'iPad Air 64GB', grade: 'C6', category: 'iPad', soldDate: daysAgo(12), deliveryDate: daysAgo(8), icloudLocked: false, mdm: false },
  g: { imei: '354872109990011', itemId: '48213', model: 'iPhone 13 Pro 128GB', grade: 'C6', category: 'Phone', soldDate: daysAgo(30), deliveryDate: daysAgo(25), icloudLocked: false, mdm: false },
}

// Turn a pool device into an editable wizard row (reason/notes/files start empty).
const seedRow = (d) => ({ ...d, deviceId: d.imei, reason: '', notes: '', files: [] })

export const MOCK_SALES_ORDERS = [
  { id: 'PCS-2024-1847', invoice: 'INV-2024-0892', date: 'Feb 15, 2024', devices: [DEVICES.a, DEVICES.b, DEVICES.c] },
  { id: 'PCS-2024-1846', invoice: 'INV-2024-0915', date: 'Mar 05, 2024', devices: [DEVICES.d, DEVICES.e] },
  { id: 'PCS-2024-1845', invoice: 'INV-2024-0930', date: 'Mar 18, 2024', devices: [DEVICES.f, DEVICES.g] },
]

export const MOCK_INVOICES = [
  { id: 'INV-2024-0892', order: 'PCS-2024-1847', date: 'Feb 15, 2024', devices: [DEVICES.a, DEVICES.b, DEVICES.c] },
  { id: 'INV-2024-0915', order: 'PCS-2024-1846', date: 'Mar 05, 2024', devices: [DEVICES.d, DEVICES.e] },
  { id: 'INV-2024-0930', order: 'PCS-2024-1845', date: 'Mar 18, 2024', devices: [DEVICES.f, DEVICES.g] },
]

// Facts lookup for manually-typed / bulk-uploaded IMEIs.
export const DEVICE_FACTS_BY_IMEI = Object.fromEntries(Object.values(DEVICES).map((d) => [d.imei, d]))

export const factsForImei = (imei) => DEVICE_FACTS_BY_IMEI[imei] || null

// Resolve a source (?order= / ?invoice=) to editable rows. Falls back to the
// first order's devices when the id isn't in the mock, so the demo always
// shows data regardless of which order/invoice was deep-linked.
export function seedRowsFromSource(kind, id) {
  const list = kind === 'invoice' ? MOCK_INVOICES : MOCK_SALES_ORDERS
  const match = list.find((s) => s.id === id) || list[0]
  return match.devices.map(seedRow)
}

export const emptyRow = () => ({ deviceId: '', imei: '', itemId: '', model: '', grade: '', category: '', reason: '', notes: '', files: [], soldDate: null, deliveryDate: null, icloudLocked: false, mdm: false })

// Build the NetSuite createRMA payload for the review-step preview. Groups the
// device lines by NetSuite Item Internal ID, exactly as the RESTlet expects.
export function buildCreateRmaPayload(rows, customer = MOCK_CUSTOMER) {
  const byItem = {}
  rows.forEach((r) => {
    const key = r.itemId || 'UNKNOWN'
    if (!byItem[key]) byItem[key] = []
    byItem[key].push({
      deviceId: r.deviceId || r.imei,
      returnReason: r.reason || null,
      imageLink: r.files && r.files.length ? `https://pcswwrma.blob.core.windows.net/rma/${r.deviceId || r.imei}-1.jpg` : null,
    })
  })
  return {
    event: 'createRMA',
    customerInternalId: customer.internalId,
    subsidiary: customer.subsidiary,
    location: customer.location,
    items: Object.entries(byItem).map(([itemId, devices]) => ({ itemId, devices })),
  }
}

// Mock NetSuite response after createRMA (Transaction reference ID + name).
export function generateRmaRef() {
  const seq = Math.floor(Math.random() * 9000) + 1000
  return { transactionId: 100000 + seq, name: `RMA${10000 + seq}` }
}
