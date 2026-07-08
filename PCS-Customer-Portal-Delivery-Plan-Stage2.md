# PCS Wireless Customer Portal — Stage 2 Feature Tickets

**Document Version:** 1.0
**Date:** July 8, 2026
**Stage / Module:** Stage 2 — Catalog, Quotes & Offers
**Status:** Draft — For Development Refinement
**Prepared by:** Business Analysis
**Audience:** Development team (to write technical requirements); open questions flagged for Business

---

## Purpose

This document sits **between** the Stage 2 business requirements (the `US-##` user stories and `UC-##` use cases) and the developers' technical tickets. The user stories say *what* a customer wants and *why*; they intentionally do not say *how the feature should behave*. This document fills that gap with **mid-level feature tickets** that describe the behaviour in enough detail for a developer to write technical requirements without having to guess at the flow, rules, and edge cases.

Each ticket is written in **product / behavioural terms only**. It deliberately contains **no technical detail** — no data models, endpoints, screens-as-built, or technology choices. Those decisions belong to the developers and are the output of the next step, informed by these tickets.

**Scope:** the **Catalog, Quotes & Offers** module of Stage 2 (`US-90`–`US-99`, `US-106`, `US-107`). The other Stage 2 modules (Returns/RMA, Online Payments, Reorder, and the Stage 2 dashboard additions) are not covered here and can be added as further sections later.

The behaviours below are concrete because they are grounded in the agreed Stage 2 requirements (catalog filter dimensions, the quote status list, the custom-pricing gating).

---

## How to read a ticket

Every ticket uses the same fields:

- **User stories** — the `US-##`(s) this ticket elaborates.
- **Who** — the roles that can use it (Admin / Buyer / Viewer, per the Stage 2 access matrix).
- **Summary** — one sentence: what the feature lets the user do.
- **How it works** — the behaviour step by step: entry points, what the user sees and does, the options available, and what happens on each action.
- **Rules & constraints** — eligibility, validation, limits, and what is allowed vs blocked.
- **States** — where relevant, the statuses something moves through and what each means.
- **Acceptance criteria** — testable, behaviour-only statements to confirm the feature is done.
- **Open questions for the business** — product decisions still to be made, surfaced rather than assumed.

---

## Table of Contents

1. [Catalog](#1-catalog)
2. [Quotes](#2-quotes)
3. [Promotional Offers](#3-promotional-offers)
4. [Traceability](#4-traceability)
5. [Sign-Off](#5-sign-off)

---

## 1. Catalog

### CQ-01 · Browse, filter & sort the catalog

**User stories:** US-90, US-91  ·  **Who:** Admin, Buyer, Viewer

**Summary.** A customer browses available inventory and narrows it down using filters, keyword search, and sorting to find the products they are interested in.

**How it works**
- The catalog lists available devices. Each device shows its name, grade, storage (where applicable), colour and carrier (where applicable), stock location, quantity available, and an indicative "from" price.
- The customer can filter by: **category, brand, model, grade, storage, location, colour, carrier,** and a **maximum price**.
- Within a single filter (e.g. Brand), selecting more than one value widens the results (Apple *or* Samsung). Across different filters, selections narrow the results (Brand *and* Grade *and* …).
- Filter options that would return **no results** given the customer's other current selections are shown but **disabled**, so the customer cannot accidentally reach an empty list. This is recalculated every time any filter changes.
- The customer can search by keyword and sort the results by **price, name, or newest**.
- A running count of matching devices is shown, along with a count of active filters and a one-click **Clear** that resets all filters and search.

**Rules & constraints**
- Only inventory that is available to purchase is shown.
- The price filter is an **upper bound** — it shows devices at or below the chosen price.
- Attributes that do not apply to a device (e.g. carrier for a laptop, storage for a wearable) are simply omitted for that device rather than shown blank.

**Acceptance criteria**
- Applying any filter narrows the list to matching devices only, and the match count updates.
- An option that would yield zero results given the current selections is disabled, not hidden.
- Selecting multiple values in one filter broadens results; selecting across filters narrows them.
- Keyword search and sorting both operate on the currently filtered set.
- Clear resets all filters, the price limit, and the search box back to the full catalog.

**Open questions for the business**
- Is the "from" price a single list price shown to every customer, or customer-specific pricing?
- What is the default sort order on first load?
- Should keyword search match on product name only, or also model, SKU, and other attributes?

---

### CQ-02 · Save and re-apply a named search

**User stories:** US-106  ·  **Who:** Admin, Buyer, Viewer

**Summary.** A customer saves the current combination of filters and search under a name, then re-applies it later in one click.

**How it works**
- With any set of filters and/or a search term active, the customer can name and save it as a **saved search**.
- Saved searches appear as one-click shortcuts. Selecting one re-applies its exact filter/search combination to the catalog.
- The customer can **rename** and **delete** their saved searches.
- The saved search that matches the current filter selection is highlighted as **active**, so the customer can see when they are viewing a saved query versus an ad-hoc one.
- Saved searches persist across visits.

**Rules & constraints**
- A saved search must have a name; an empty name cannot be saved.
- Saved searches are personal to the customer who created them.
- Re-applying a saved search replaces the current filter selection (it does not add to it).

**Acceptance criteria**
- A customer can save the current filters + search under a name and see it appear as a shortcut.
- Selecting a saved search reproduces exactly the filters and search it was saved with.
- A saved search can be renamed and deleted, and deletion removes its shortcut.
- The shortcut matching the current selection is visibly marked as active.
- Saved searches are still present when the customer returns in a later session.

**Open questions for the business**
- Should saved searches be tied to the user's account and available on any device, or only in the browser where they were created?
- Is there a limit to how many saved searches a customer may keep?

---

### CQ-03 · Favorite devices and filter to favorites

**User stories:** US-107  ·  **Who:** Admin, Buyer, Viewer

**Summary.** A customer marks individual devices as favorites and can filter the catalog to show only those favorites.

**How it works**
- Each device in the catalog (including within the Hottest Offers section) has a favorite toggle.
- Toggling marks or unmarks the device as a favorite.
- A **Favorites** filter shows only favorited devices; the toggle also shows how many favorites the customer currently has.
- Favorites persist across visits.
- When the Favorites filter is on and the customer has no favorites, a short message explains how to add one.

**Rules & constraints**
- Favorites are personal to the customer.
- The Favorites filter combines with the other catalog filters and search.

**Acceptance criteria**
- Toggling favorite on a device adds it to the customer's favorites; toggling again removes it.
- The Favorites filter restricts the catalog to favorited devices only.
- The favorites count reflects the current number of favorited devices.
- Favorites are still present when the customer returns in a later session.

**Open questions for the business**
- Should favorites be tied to the user's account and available on any device, or only in the browser where they were created?
- If a favorited device goes out of stock or is delisted, should it still appear under Favorites (e.g. greyed out) or be dropped?

---

## 2. Quotes

### CQ-04 · Build a quote cart with quantities

**User stories:** US-92  ·  **Who:** Admin, Buyer

**Summary.** A customer adds devices to a quote cart with the quantities they need, so they can request pricing for a specific set of items.

**How it works**
- From the catalog (list or Hottest Offers), the customer adds a device to the **quote cart**.
- Each cart line shows the device, its grade/storage, the quantity, the list unit price, and the line total.
- The customer can increase or decrease the quantity per line, and remove a line.
- The cart shows the total number of units and a subtotal at **list prices**.
- The customer can keep browsing and adding devices; the cart is retained while they do.
- The cart is the starting point for a quote and leads into the pricing step (see CQ-05) and submission (see CQ-06).

**Rules & constraints**
- A line quantity must be at least 1.
- Adding a device already in the cart increases that line's quantity rather than creating a duplicate line.
- The cart shows list prices only; proposing different pricing is a separate, deliberate step (CQ-05).

**Acceptance criteria**
- A customer can add a device to the cart and see it as a line with quantity and list price.
- Quantity can be adjusted up and down, and a line can be removed.
- Adding an already-carted device increases its quantity instead of duplicating it.
- The cart's unit count and list subtotal update as lines and quantities change.
- A Viewer cannot build or submit a quote.

**Open questions for the business**
- Should quantity adjust in single units, or in packs (e.g. steps of 10)? Is there a minimum order quantity per device?
- Should the cart be limited to devices from a single stock location, or may it mix locations?
- Does stock availability cap the quantity a customer can request?

---

### CQ-05 · Propose custom pricing on a quote

**User stories:** US-93  ·  **Who:** Admin, Buyer

**Summary.** On a dedicated pricing step, the customer can request a custom per-unit price on individual quote lines, as a formal request subject to PCS review.

**How it works**
- Pricing is a **separate step** reached after the cart is built. The cart itself always shows list prices.
- On the pricing step every line starts at its list price. To propose a different price the customer must, **per line**: (1) request custom pricing, (2) select a **reason**, and (3) **acknowledge** that any proposed price is a request that PCS will review and confirm.
- Only after all three are done does the per-unit price field **unlock** for that line.
- The customer can **reset a line back to list price** at any point, which clears the proposed price and the reason.
- Lines the customer does not touch are submitted at list price.
- The running subtotal on the pricing step reflects the customer's proposed prices.

**Rules & constraints**
- Custom pricing is deliberate and per line — it is never applied in bulk or by default.
- Both a reason and the acknowledgement are mandatory before the price field unlocks.
- The reason is chosen from a standard list: **Volume commitment, Competitor quote, Budget constraint, Repeat order, Other.**
- Proposed prices are **requests, not commitments**; final pricing is confirmed by PCS.

**Acceptance criteria**
- A line's price field stays locked until that line's reason and acknowledgement are both provided.
- Resetting a line clears its proposed price and reason and returns it to list price.
- Lines left untouched are carried into the submitted quote at list price.
- The submitted quote records, per line, the proposed price and the selected reason.

**Open questions for the business**
- Is the reason list fixed as above, or should a free-text reason be allowed (e.g. for "Other")?
- Is there a floor/ceiling on how far a proposed price may deviate from the list price before it is auto-rejected or flagged?

---

### CQ-06 · Submit and track quotes, with status history

**User stories:** US-94, US-95, US-96  ·  **Who:** Admin, Buyer (submit); Admin, Buyer, Viewer (view)

**Summary.** A customer submits a built quote to PCS for review, then tracks every submitted quote and follows its status and negotiation history.

**How it works**
- From the pricing step the customer **submits** the quote for review. On submission the quote is created with a **reference number** and a status of **Submitted**, and PCS is notified to respond with confirmed pricing.
- The **Quotes list** shows all of the customer's quotes with reference number, created date, item count, total, and status. The customer can filter by status (All, Draft, Submitted, Under Review, Accepted) and search by reference number.
- Selecting a quote opens its **detail**: the assigned PCS rep, the created and valid-until dates, each line item with the customer's proposed **Your Price** alongside the **PCS Price**, and a chronological **status history** timeline of every change with dates and notes.
- When PCS has counter-offered, the detail highlights that revised pricing is proposed and offers the customer **Accept** or **Decline**.
- The customer can download a PDF copy of a quote.

**States**

| Status | Meaning |
|--------|---------|
| Draft | Quote is being built; not yet submitted |
| Submitted | Sent to PCS; awaiting review |
| Under Review | PCS is reviewing the requested pricing |
| Counter-Offered | PCS has responded with revised pricing; customer can Accept or Decline |
| Accepted | Pricing agreed; the quote can be converted to an order (see CQ-07) |
| Rejected | Quote declined |
| Expired | The quote's validity period has lapsed |

**Rules & constraints**
- A quote must contain at least one line item to be submitted.
- Once submitted, a quote is read-only to the customer except for responding to a counter-offer (Accept / Decline).
- The **PCS Price** for a line is shown only once PCS has set it; until then it is blank.
- The quote total reflects PCS pricing where it has been provided, otherwise the customer's proposed price.
- A quote past its valid-until date is treated as Expired and cannot be accepted or converted.

**Acceptance criteria**
- Submitting a built quote creates it with a reference number and status Submitted, and it appears in the customer's Quotes list.
- The list can be filtered by status and reflects the correct count and total per status.
- The detail shows line items with both Your Price and PCS Price, and a status-history timeline that lists each change with its date.
- A Counter-Offered quote presents Accept and Decline actions; other statuses do not.
- Accepting or declining a counter-offer records the outcome in the status history.

**Open questions for the business**
- Can a customer edit and resubmit a Rejected quote, or must they start a new one?
- When a customer declines a counter-offer, does the quote reopen for further negotiation or move straight to Rejected/closed?
- What is the default validity period of a quote, and can a customer request an extension near expiry?
- Should the customer be notified (email/SMS/in-app) when a quote's status changes?

---

### CQ-07 · Convert an accepted quote to an order

**User stories:** US-97  ·  **Who:** Admin, Buyer

**Summary.** A customer turns an accepted quote into an order without re-entering the line items, so they can complete the purchase.

**How it works**
- On an **Accepted** quote, the customer chooses **Convert to Order**.
- A new order is created **pre-populated** with the quote's line items, quantities, and the agreed (PCS-confirmed) pricing.
- The customer reviews and confirms the pre-populated order to place it.

**Rules & constraints**
- Convert to Order is available **only** when the quote's status is Accepted; it is disabled for every other status.
- The order is created at the **agreed pricing** from the accepted quote, not at list or the originally proposed price.
- An expired quote cannot be converted.

**Acceptance criteria**
- The Convert to Order action is enabled only for Accepted quotes and disabled otherwise.
- Converting produces a new order containing exactly the accepted quote's line items, quantities, and agreed prices.
- The customer can review the pre-populated order before it is placed.

**Open questions for the business**
- After conversion, what is the resulting quote's state — does it remain Accepted, or move to a "Converted/Closed" state to prevent double-ordering?
- Can a single accepted quote be converted more than once (partial or repeat orders), or only once?
- Are shipping and billing details carried from the account automatically, or confirmed during conversion?

---

## 3. Promotional Offers

### CQ-08 · Hottest Offers & promotional banners

**User stories:** US-98, US-99  ·  **Who:** Admin, Buyer, Viewer

**Summary.** Customers see curated featured deals — a "Hottest Offers" section and full-width promotional banners — so current deals and featured inventory are clearly highlighted.

**How it works**
- A **Hottest Offers** section surfaces a curated set of featured devices. Each featured item shows its device, an optional highlight tag (e.g. "Best Seller", "New Arrival", "Limited"), grade/storage, availability, and price, and can be added straight to a quote.
- A **promotional banner** presents a headline featured deal in a prominent full-width strip, with a short call to action that takes the customer to the relevant deal or catalog view.
- Hottest Offers and the promotional banner appear on the **catalog**, and Hottest Offers also appears on the **dashboard**.

**Rules & constraints**
- The set of featured offers and the banner content are **curated by PCS** (the curation/authoring itself is a back-office capability and is out of scope for this document).
- Featured items follow the same availability and pricing rules as the rest of the catalog.

**Acceptance criteria**
- The Hottest Offers section displays the curated featured devices with their tag, price, and availability.
- A featured device can be added to a quote directly from the offers section.
- The promotional banner is shown on the dashboard and catalog and links through to the featured deal/catalog view.

**Open questions for the business**
- How are offers and banners curated and scheduled (start/end dates), and by whom?
- How many featured items should Hottest Offers show, and in what order?
- Can more than one banner run at once (a rotation), or only one at a time?

---

## 4. Traceability

Every Catalog, Quotes & Offers user story maps to at least one ticket.

| User Story | Covered by |
|------------|------------|
| US-90 — Browse the catalog | CQ-01 |
| US-91 — Filter & sort the catalog (with auto-disabled options) | CQ-01 |
| US-92 — Add devices to a quote cart with quantity | CQ-04 |
| US-93 — Propose custom per-unit pricing | CQ-05 |
| US-94 — Submit a quote for review | CQ-06 |
| US-95 — View all submitted quotes with status | CQ-06 |
| US-96 — View a quote's full history & status changes | CQ-06 |
| US-97 — Convert an accepted quote into an order | CQ-07 |
| US-98 — "Hottest Offers" section | CQ-08 |
| US-99 — Promotional banners | CQ-08 |
| US-106 — Save & re-apply a named search | CQ-02 |
| US-107 — Favorite devices & filter to favorites | CQ-03 |

---

## 5. Sign-Off

| Reviewer | Role | Decision | Date | Comments |
|----------|------|----------|------|----------|
| | | | | |
| | | | | |
| | | | | |

**Decision options:** Approved / Approved with Changes / Not Approved

---

*End of Document*
