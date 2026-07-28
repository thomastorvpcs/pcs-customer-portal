# PCS Customer Portal — Integration-Reality Brief

**Version:** 1.0 · **Date:** July 28, 2026 · **Audience:** Tech lead, Finance, Operations
**Purpose:** Before Stage-2 (catalog → estimate → sales order) is committed to a plan, two upstream dependencies decide what is buildable (a third — a data source for the spending budget — was resolved by removing that requirement; see the note below). Neither is visible from the PRD or the UI prototype; both come from examining the production platform repo `pcs-wireless/pcs-platform`.

---

## What already exists (so we build on it, not around it)

`pcs-platform` is the **Stage-1, read-only** portal. It reads orders, shipments, invoices, payments, credit-memos and AR aging **live from NetSuite per request** through the `domain-api` anti-corruption layer — no cache, no sync jobs, no writes back. The portal's own Postgres holds a single table (`UserPreference`, per-account). Stage-2 is neither built nor spec'd there.

Two useful facts fall out of that:
- The **integration pattern is settled**: portal → `domain-api` → NetSuite, live. New reads follow it; new writes extend it.
- The **persistence pattern is settled**: per-account server-side rows keyed to the Auth0 user. Cart, favorites, saved searches and estimates should follow it.

---

## Resolved — the spending-budget formula (removed July 28, 2026)

An earlier draft required a spending budget = **2× peak monthly sales** (or a **$500K** baseline). NetSuite exposes no trailing/peak monthly sales, so the formula had **no data source**. Rather than build a new sales-volume feed for a rule that was never a confirmed commercial decision, the **spending budget (US-158) and its over-credit 24-hour hold (US-157) were removed** from the PRD, functional spec, and prototype. NetSuite's real **credit limit** — already computed, already counting open/unbilled orders via `financial-position` — remains available if an over-credit control is ever wanted. **No action required.**

## Blocker 1 — Stock reservation / availability has no backing service

- **What Stage-2 would need:** any "cap at available stock" quantity rule (OQ-25), plus reservation/concurrency handling if two customers order the same units. (The 24-hour hold that originally drove this was removed with US-157.)
- **Reality:** `domain-api` exposes **no inventory / stock-availability / reservation endpoint at all**. Item data appears only as SKU strings enriched onto historical order lines. There is nothing to reserve against.
- **What it blocks:** reservation on the normal path (OQ-04), concurrency between two customers ordering the same units, and any "cap at available stock" quantity rule (OQ-25).
- **Decision needed (Operations + Tech lead):** a **new NetSuite inventory/availability integration** is a prerequisite for any reservation or stock-cap behaviour. (The catalog can still *display* availability from a read endpoint; *reserving* it is the harder half.)

## Blocker 2 — Sales-order creation is a net-new write path

- **What the PRD asks for (US-159):** place an order → a Sales Order is created and linked from the estimate.
- **Reality:** every NetSuite call today is **read-only**. There is no create endpoint in `domain-api`, no estimates module, and the portal's `OrderRepository.save()` throws "Not implemented".
- **What it blocks:** OQ-06 (where the SO is created) and the whole estimate → order transition.
- **Recommended shape (Tech lead to ratify):** the **estimate and its negotiation live in the portal Postgres** (new tables — NetSuite doesn't model the negotiation), and on order confirmation a **new `domain-api` write endpoint creates the NetSuite Sales Order**, returning an id the portal stores against the estimate. Also wire in the already-existing `financial-position` endpoint so the standing checks (OQ-05) use live data instead of the current mock.

---

## One-line summary for the plan

| Blocker | Owner | Gates | Cost signal |
|---------|-------|-------|-------------|
| No NetSuite inventory endpoint | Operations + Tech lead | OQ-04, OQ-25 | New integration required before reservation / stock caps |
| SO creation is a greenfield write path | Tech lead | OQ-06 | New `domain-api` write endpoint + portal estimate tables |

*(The earlier third dependency — a data source for the spending-budget formula — was resolved by removing that requirement on July 28, 2026.)*

*End of document*
