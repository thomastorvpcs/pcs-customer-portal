# PCS Customer Portal — Integration-Reality Brief

**Version:** 1.0 · **Date:** July 28, 2026 · **Audience:** Tech lead, Finance, Operations
**Purpose:** Before Stage-2 (catalog → estimate → sales order) is committed to a plan, three upstream dependencies decide what is buildable. None is visible from the PRD or the UI prototype; all three come from examining the production platform repo `pcs-wireless/pcs-platform`.

---

## What already exists (so we build on it, not around it)

`pcs-platform` is the **Stage-1, read-only** portal. It reads orders, shipments, invoices, payments, credit-memos and AR aging **live from NetSuite per request** through the `domain-api` anti-corruption layer — no cache, no sync jobs, no writes back. The portal's own Postgres holds a single table (`UserPreference`, per-account). Stage-2 is neither built nor spec'd there.

Two useful facts fall out of that:
- The **integration pattern is settled**: portal → `domain-api` → NetSuite, live. New reads follow it; new writes extend it.
- The **persistence pattern is settled**: per-account server-side rows keyed to the Auth0 user. Cart, favorites, saved searches and estimates should follow it.

---

## Blocker 1 — The spending-budget formula has no data source

- **What the PRD asks for (US-158):** a spending budget = **2× peak monthly sales** (or a **$500K** baseline), enforced as an open-order ceiling.
- **Reality:** NetSuite already enforces a real **credit limit** that counts open/unbilled orders (`domain-api`'s `financial-position` returns `creditLimit`, `balance`, `unbilledOrders`, `creditUsed`, `creditAvailable`; `creditUsed = balance + unbilledOrders`). But **"peak / trailing monthly sales" is not exposed by NetSuite** anywhere in the integration.
- **What it blocks:** the entire budget calculation and, downstream, OQ-03 (cap vs gate) and the over-budget hold.
- **Decision needed (Finance + Tech lead):** enforce **NetSuite's existing credit limit as the single ceiling** (real, already computed, already counts open orders), *or* commission a new peak-monthly-sales feed to back the 2× formula. The first is essentially free; the second is a data-engineering task with no current source.

## Blocker 2 — Stock holds and reservation have no backing service

- **What the PRD asks for (US-157):** over-budget orders proceed with a **24-hour stock hold**, released if unpaid.
- **Reality:** `domain-api` exposes **no inventory / stock-availability / reservation endpoint at all**. Item data appears only as SKU strings enriched onto historical order lines. There is nothing to hold against and nothing to reserve.
- **What it blocks:** the 24-hour hold (OQ-19), reservation on the normal path (OQ-04), concurrency between two customers ordering the same units, and any "cap at available stock" quantity rule (OQ-25).
- **Decision needed (Operations + Tech lead):** a **new NetSuite inventory/availability integration** is a prerequisite for any hold/reservation behaviour. Until it exists, the hold mechanic can be specified but not built. (The catalog can still *display* availability from a read endpoint; *reserving* it is the harder half.)

## Blocker 3 — Sales-order creation is a net-new write path

- **What the PRD asks for (US-159):** place an order → a Sales Order is created and linked from the estimate.
- **Reality:** every NetSuite call today is **read-only**. There is no create endpoint in `domain-api`, no estimates module, and the portal's `OrderRepository.save()` throws "Not implemented".
- **What it blocks:** OQ-06 (where the SO is created) and the whole estimate → order transition.
- **Recommended shape (Tech lead to ratify):** the **estimate and its negotiation live in the portal Postgres** (new tables — NetSuite doesn't model the negotiation), and on order confirmation a **new `domain-api` write endpoint creates the NetSuite Sales Order**, returning an id the portal stores against the estimate. Also wire in the already-existing `financial-position` endpoint so the standing checks (OQ-05) use live data instead of the current mock.

---

## One-line summary for the plan

| Blocker | Owner | Gates | Cost signal |
|---------|-------|-------|-------------|
| No peak-sales feed for the budget formula | Finance + Tech lead | OQ-11, OQ-03 | Free if we use NetSuite's credit limit; a data project otherwise |
| No NetSuite inventory endpoint | Operations + Tech lead | OQ-04, OQ-19, OQ-25 | New integration required before any stock hold |
| SO creation is a greenfield write path | Tech lead | OQ-06 | New `domain-api` write endpoint + portal estimate tables |

*End of document*
