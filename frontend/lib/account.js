// Mock customer account financial standing for the prototype.
//
// In production these figures come from NetSuite (AR balance, credit limit,
// past-due aging, trailing sales). Here they are hard-coded to mirror the demo
// account shown on the Financial page — a large wholesaler with a $500K credit
// limit, $247,850 outstanding, and $45,200 past due across 3 invoices.
//
// They drive the catalog checkout guardrails (see lib note in catalog/page.jsx):
//   • Past due        → sales-order creation is blocked; contact Finance / override.
//   • Over the budget → order allowed, but stock is held for 24h then released.
// These rules were confirmed on the commercial side (July 2026).

export const ACCOUNT = {
  name: 'Wireless Depot Inc.',
  creditLimit: 500000, // AR credit limit (Financial page)
  outstanding: 247850, // total open AR balance = current committed exposure
  pastDueAmount: 45200,
  pastDueInvoices: 3,
  maxMonthlySales: 380000, // trailing peak monthly sales — drives the budget tier
}

// The default spending budget: the maximum open order value allowed at any one
// point in time. Baseline is $500K; a customer whose monthly sales reach $500K+
// is allowed up to double their peak monthly sales instead.
export const BASELINE_BUDGET = 500000
export const STOCK_HOLD_HOURS = 24

export function spendingBudget(a = ACCOUNT) {
  return a.maxMonthlySales >= BASELINE_BUDGET ? 2 * a.maxMonthlySales : BASELINE_BUDGET
}

// Headroom left before an order would breach the spending budget.
export function availableBudget(a = ACCOUNT) {
  return Math.max(0, spendingBudget(a) - a.outstanding)
}

// Whole-dollar USD, e.g. $252,150. (Catalog line prices use their own 2-dp fmt.)
export const usd = (n) => '$' + Math.round(n).toLocaleString('en-US')

// Resolve the effective checkout standing. A forced status ('past_due' /
// 'over_limit') from the demo control wins; otherwise an order that would breach
// the remaining budget is naturally treated as over-limit. Anything else is good.
export function checkoutStatus(forced, orderTotal, a = ACCOUNT) {
  if (forced === 'past_due' || forced === 'over_limit') return forced
  if (orderTotal > availableBudget(a)) return 'over_limit'
  return 'good'
}
