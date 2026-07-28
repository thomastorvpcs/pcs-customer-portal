# PCS Wireless Customer Portal — Open Questions for Stakeholders

**Date:** July 28, 2026
**For:** Business stakeholder sign-off — Commercial · Finance · Sales · Operations · Product
**Scope:** Stage 2 — Catalog, Sales Estimates & Sales Orders, and Reorder
**Decision options:** Approve (the recommended default) · Change (add a note) · Defer

These are the decisions still open. Removing the spending budget on July 28 closed four earlier questions (OQ‑11, OQ‑03, OQ‑19, OQ‑21). Engineering‑only decisions are listed separately at the end and are **not** for stakeholder sign‑off.

---

## Commercial (Morris / Sal)

| OQ | Question | Recommended default | Decision |
|----|----------|---------------------|----------|
| OQ‑02 | Is there a direct list‑price "buy it now" order path, or is every order reviewed by PCS first? | All‑list cart → creates the sales order directly; any custom‑priced line → estimate review | |
| OQ‑07 | Reorder: create a draft estimate or a direct order, and how do we handle price / stock / grade changes since the last order? | Draft cart pre‑filled from the past order, re‑validated against current price/stock/grade with any drift flagged | |
| OQ‑13 | What is the final approved grade list? | — | |
| OQ‑22 | Do we publish grade definitions to customers while some are still marked "to be confirmed"? | — | |
| OQ‑14 | Customer pricing tiers per region — definition and setup. | — | |
| OQ‑15 | Inventory‑visibility rules — defined per customer group, or per customer? | — | |
| OQ‑16 | Quantity‑display thresholds — e.g. 100+ standard vs 300+/500+ for large wholesalers. | Show exact quantities until confirmed | |
| OQ‑17 | Review a competitor's offer / checkout journey before finalising the offer flow. | — | |

## Finance

| OQ | Question | Recommended default | Decision |
|----|----------|---------------------|----------|
| OQ‑30 *(new)* | With the spending budget removed, do we want **any** ceiling on open order value, or is past‑due the only gate on order creation? | If a ceiling is wanted, use NetSuite's existing **credit limit** (already counts open orders); otherwise confirm past‑due is the only gate | |
| OQ‑18 | Does being past due block a customer from **negotiating** an estimate, or only from **creating an order**? | Block only at order placement; allow past‑due customers to build a cart and negotiate | |
| OQ‑10 | Past‑due tolerance — how many days / dollars overdue before the block applies? | Define on NetSuite's existing aging buckets (current / 30 / 60 / 90+) | |
| OQ‑28 | What is the allowed payment‑terms list, and is a PO number required for some accounts? | Default terms come from NetSuite; Finance defines the allowed alternatives (e.g. Net 60, Prepaid/Wire) and any PO‑required flag | |
| OQ‑12 | Who may request a past‑due override? | — | |

## Sales

| OQ | Question | Recommended default | Decision |
|----|----------|---------------------|----------|
| OQ‑09 | Estimate validity period and counter‑offer round limit? | — | |
| OQ‑29 | Can a **Rejected** estimate be edited and resubmitted? | — | |
| OQ‑23 | Is the rep shown on an estimate the NetSuite account rep, or assigned manually? | Pull from the NetSuite account (needs a small integration addition) | |

## Operations

| OQ | Question | Recommended default | Decision |
|----|----------|---------------------|----------|
| OQ‑25 | Quantity model — minimum order quantity, pack size, stepper vs free entry, and a cap at available stock? | Steppers of ±10, floor of 1, no MOQ / pack / cap (a stock cap depends on OQ‑04) | |
| OQ‑26 | What does a grade badge show if live inventory carries a grade code with no matching Grade entry? | Neutral‑grey fallback badge | |
| OQ‑04 | Is stock reserved / held, and how is concurrency handled if two customers order the same units? | Only needed if a stock cap is wanted — and it requires a NetSuite inventory/availability endpoint that does not exist today | |

## Product

| OQ | Question | Recommended default | Decision |
|----|----------|---------------------|----------|
| OQ‑24 | Downloadable estimate document — format, content, branding; is there an equivalent for the sales order? | — | |
| Notifications | Notifications of estimate status changes — in‑app, email, and/or SMS? (none exist today) | — | |

---

### Engineering decisions (for the tech lead — not stakeholder sign‑off)

These are settled by the platform's architecture and need only engineering ratification when Stage 2 is scoped:

- **OQ‑06** — Estimates and their negotiation held in the portal database; the final sales order written to NetSuite via a new `domain-api` endpoint.
- **OQ‑20** — Build a persisted, per‑account server‑side cart (following the existing per‑account persistence pattern).
- **OQ‑05** — Wire the live NetSuite `financial-position` endpoint so account standing stops using mock data.
