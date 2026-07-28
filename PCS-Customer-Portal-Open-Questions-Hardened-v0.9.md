# PCS Customer Portal — Open Questions, Hardened (v0.9)

**Document Version:** 0.9
**Date:** July 28, 2026
**Prepared by:** Development Team
**Reconciles:** *PRD — Catalog, Sales Estimates & Sales Orders, and Reorder* (v1.0, Jul 27) · *Functional Specification — Catalog, Grading Guide & Sales Order Creation* (v1.1, Jul 28) · the Stage-2 UI prototype (local `PCS Customer Portal` repo) · the production platform repo `pcs-wireless/pcs-platform`.

---

## The finding that reframes this list

The review that produced the earlier Open-Questions log assumed the production repo `pcs-wireless/pcs-platform` contained the Stage-2 build, and that reading its schema/migrations/API routes would settle OQ-05, OQ-06, OQ-20 and OQ-27. **It does not.**

`pcs-platform` is the **Stage-1, read-only customer portal**. It surfaces *existing* orders, shipments, invoices, payments, credit-memos and AR aging, read **live from NetSuite per request** through the `domain-api` anti-corruption layer — no cache, no sync jobs, no writes back to NetSuite (the order repository's `save()` throws "Not implemented"). Its own Postgres persists exactly **one** table, `UserPreference`.

The entire Stage-2 feature set the PRD/Spec describe — catalog, grading guide, cart, sales estimates, counter-offer negotiation, buy-it-now, sales-order **creation**, the budget/past-due/24h-hold guardrails, reorder, favorites/saved-searches, notifications — is **not built and not spec'd** in `pcs-platform` (verified across `openspec/specs`, in-flight `openspec/changes`, and both branches). The only Stage-2 UI that exists is the **frontend-only prototype** in the local `PCS Customer Portal` repo.

**Consequence:** most of these questions are not "answered by code" because the code isn't written. But the platform's established architecture answers several of them by pattern, and it surfaces three hard upstream dependencies (see the *Integration-Reality Brief*). That is what the statuses below encode.

---

## Status legend

| Status | Meaning |
|--------|---------|
| **CLOSED** | Answered — either by the platform's established architecture, or by an editorial correction now applied. No further decision needed. |
| **REFRAMED** | The question's premise changed once the real repo was examined; a concrete answer/recommendation is stated, needs ratification by the named owner. |
| **BLOCKED** | Cannot be built as written until a missing upstream dependency (a NetSuite feed or endpoint) is resolved. The dependency is named. |
| **OPEN (greenfield)** | A genuine commercial/product/finance decision. No code exists to constrain it, so it can be decided cleanly; a recommendation is offered where we have one. |

---

## 1. Answered by the platform architecture (CLOSED / REFRAMED)

| ID | Question | Status | Resolution & evidence |
|----|----------|--------|-----------------------|
| **OQ-05** | Account standing: live read or sync, and at what staleness? | **CLOSED → live** | The whole platform is request-time read-through via `domain-api`; AR aging is already live per request with no cache. `domain-api` already exposes `GET /v1/sales-account/financial-position` (creditLimit, balance, creditUsed, terms), so standing is a **live read** — it just needs wiring into the portal backend (today the frontend hardcodes credit limit/terms as mock). This removes the "paid this morning, still blocked this afternoon" risk. Residual data gap → **OQ-11**. |
| **OQ-06** | Are estimate & sales order NetSuite records or portal objects? Where is the SO created? | **REFRAMED** | Nothing is created today (read-only integration; no estimates module; no create endpoints). The anti-corruption pattern dictates the shape: **estimate + negotiation = new portal Postgres tables; the final Sales Order = a NetSuite record written via a new `domain-api` write endpoint**, with the portal storing the returned NetSuite SO id. Net-new work — ratify with Tech lead. |
| **OQ-20** | Must the cart be a persisted server-side entity for back-office approval? | **CLOSED (confirmed, net-new)** | Correct, and it's net-new: no cart entity and no back-office override exist anywhere in the platform. FR-O-08 requires a persisted, **account-owned cart with a lifetime**, built new — the `UserPreference` table is the precedent for account-scoped persistence. |
| **OQ-27** | Must the cart survive logout and follow the user across devices? (and favorites/saved-searches persistence) | **CLOSED → per-account** | The platform's one persistence pattern is **per-account** (`UserPreference`, keyed to the Auth0 user `sub`). Cart, favorites and saved searches should follow it → **per-account, cross-device**. Settles the Spec's per-browser-vs-per-account waffle in favour of per-account. |
| **OQ-28** | Where does the allowed payment-terms list come from; is PO required for some accounts? | **PARTLY CLOSED** | Account **default** terms come from NetSuite (`financial-position.terms`) — needs wiring (frontend hardcodes them). The **allowed alternatives** (Net 60, Prepaid/Wire) and a **PO-required** flag exist nowhere → Finance defines the list + a new account field. |
| **OQ-23** | Who assigns the rep on an estimate — NetSuite account rep, or manual? | **REFRAMED** | No rep comes from NetSuite today; the UI hardcodes it, and `domain-api` exposes no customer-master/rep endpoint. So either add a rep field to a `domain-api` customer read, or assign manually in the portal. Owner: Sales + Tech lead. |
| **OQ-01** | Where do the account checks fire? | **CLOSED** | Resolved earlier (FR-O-10: at submission and again at confirmation). Because the flow is greenfield, we are free to implement checks **at order placement only** per the OQ-18 recommendation. Residual → **OQ-18**. |
| **OQ-12** | Does a Viewer see negotiated pricing? Who may request a past-due override? | **PARTLY CLOSED** | Spec §4 settles role authority (Admin/Buyer act; Viewer read-only, so a Viewer can see the estimate incl. pricing). The override-requestor identity is still an OPEN business-owner call. |

## 2. Blocked by a missing upstream dependency (BLOCKED)

| ID | Question | Status | The blocker |
|----|----------|--------|-------------|
| **OQ-11** | Credit limit vs spending budget: one ceiling or two? Peak measured over what window? | **BLOCKED / REFRAMED** | NetSuite already enforces a real **credit limit** that counts open/unbilled orders (`creditUsed = balance + unbilledOrders`). The PRD's *"budget = 2× peak monthly sales / $500K baseline"* needs trailing/peak monthly sales, which **NetSuite does not expose**. Recommendation: enforce **NetSuite's credit limit as the single ceiling** unless Finance funds a separate peak-monthly-sales feed. Owner: Finance + Tech lead. |
| **OQ-04** | Is stock reserved at submission, at agreement, or not at all? | **BLOCKED** | `domain-api` exposes **no inventory/availability endpoint at all**. Reservation and the 24-hour hold have no backing service — a new NetSuite inventory integration is a prerequisite. Owner: Operations + Tech lead. |
| **OQ-03** | Budget enforcement: hard cap, soft gate with hold, or warn? | **OPEN, gated by OQ-04/OQ-11** | The "soft gate + 24h hold" option can't be built until inventory (OQ-04) exists; the cap value depends on OQ-11. Finance decides the policy; engineering flags the dependencies. |
| **OQ-19** | Should the 24-hour hold fire at estimate submission, or only at order placement? | **OPEN, gated by OQ-04** | Recommend **order placement only** (holding real stock on an un-reviewed estimate is wrong). Moot until inventory exists. Owner: Operations. |

## 3. Commercial / product decisions — greenfield, now provably unconstrained by code (OPEN)

| ID | Question | Owner | Recommendation |
|----|----------|-------|----------------|
| **OQ-02** | Is there a direct list-price order path, or is every order reviewed? | Commercial + Tech lead | Both docs already state list pricing is auto-approved. Adopt cleanly: **all-list cart → direct SO** (still via the order-confirmation step for fulfilment/terms + account checks); **any custom-priced line → estimate review**. This also answers **OQ-08** (mixed-cart routing). |
| **OQ-18** | Does past-due block negotiation, or only order creation? | Finance + Sales | Recommend **block only at order placement**; allow a past-due customer to build a cart and negotiate. |
| **OQ-07** | Reorder: draft estimate or direct order? Price/stock/grade drift? | Commercial | Greenfield (only an inert "Reorder" button exists). Recommend a **draft cart** pre-filled from the past order, re-validated against current price/stock/grade with drift flagged. |
| **OQ-21** | Disclose the computed spending budget / committed balance to the customer? | Commercial | If OQ-11 lands on NetSuite's credit limit (a figure the account already owns), the disclosure question softens. Still a commercial sign-off. |
| **OQ-22** | Publish unconfirmed grade definitions to customers, labelled "to be confirmed"? | Morris / Sal | Unchanged — commercial/legal weight; not a spec default. |
| **OQ-09** | Estimate validity period and counter-round limit. | Sales | Greenfield. |
| **OQ-10** | Past-due tolerance threshold (days & dollars). | Finance | Define on NetSuite's existing aging buckets (current / 30 / 60 / 90+), which are already live. |
| **OQ-24** | Downloadable estimate document: format, content, branding; SO equivalent? | Product | Greenfield. |
| **OQ-25** | Quantity model: MOQ, pack size, stepper vs free entry, cap at available stock. | Operations | Prototype does steppers of ±10, floored at 1, no MOQ/pack/cap. Confirm the policy; a stock cap depends on OQ-04. |
| **OQ-26** | If live inventory carries a grade code with no Grade entry, what does the badge show? | Operations | The platform's `status-badge` already has a neutral-grey fallback for unknown codes — reuse that pattern for grades. |
| **OQ-29** | Can a Rejected estimate be edited and resubmitted? | Sales | Greenfield (no estimate lifecycle exists yet). |
| **OQ-13–17** | Grade list & media; pricing tiers; inventory-visibility rules; quantity-display thresholds; competitor benchmark. | Morris / Sal / Commercial | Unchanged; all greenfield. |
| **—** | Notifications of estimate status changes (in-app / email / SMS). | Product + Tech lead | Greenfield — no email/SMS system exists; the notification bell is a static placeholder. |

---

## Where the ten "top" questions now sit

Seven of the original top ten are Finance / Operations / Tech-lead items, which confirms the customer-facing design is mature and the commercial + integration layers are what lag. What changed with the real repo in hand:

- **Four were expected to be "settled by the repo" (OQ-05/06/20/27).** They are — but by the platform's *architecture*, not by an existing Stage-2 build: live-read standing, portal-DB estimates + NetSuite-write SO, a net-new server cart, per-account persistence.
- **Two became hard blockers (OQ-11, OQ-04):** the budget formula and stock holds depend on NetSuite data/endpoints that do not exist. See the *Integration-Reality Brief*.
- **The rest are clean commercial calls** with no code to contradict them.

*End of document*
