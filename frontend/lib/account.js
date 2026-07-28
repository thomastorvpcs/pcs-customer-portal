// Mock customer account financial standing for the prototype.
//
// In production these figures come from NetSuite (AR balance, past-due aging,
// credit limit). Here they are hard-coded to mirror the demo account shown on
// the Financial page — a large wholesaler with $247,850 outstanding and $45,200
// past due across 3 invoices.
//
// They drive the single catalog checkout guardrail (see catalog/page.jsx):
//   • Past due → sales-order creation is blocked; contact Finance / override.
// (A spending-budget cap and an over-credit 24-hour stock hold were removed in
// July 2026 — they were never a confirmed commercial decision.)

export const ACCOUNT = {
  name: 'Wireless Depot Inc.',
  creditLimit: 500000, // AR credit limit from NetSuite (not enforced in the prototype)
  outstanding: 247850, // total open AR balance
  pastDueAmount: 45200,
  pastDueInvoices: 3,
  // Defaults for the sales-order confirmation step (pre-filled, editable).
  shipTo: '1240 Logistics Pkwy, Dallas, TX 75201',
  billTo: 'Wireless Depot Inc. · Dallas, TX 75201',
  paymentTerms: 'Net 30',
}

// Allowed payment terms at order confirmation (default is the account's own).
export const PAYMENT_TERMS = ['Net 30', 'Net 60', 'Prepaid / Wire']

// Whole-dollar USD, e.g. $252,150. (Catalog line prices use their own 2-dp fmt.)
export const usd = (n) => '$' + Math.round(n).toLocaleString('en-US')

// Resolve the effective checkout standing. Only past due gates order creation;
// a forced 'past_due' from the demo control drives the prototype, and anything
// else is good standing.
export function checkoutStatus(forced) {
  return forced === 'past_due' ? 'past_due' : 'good'
}
