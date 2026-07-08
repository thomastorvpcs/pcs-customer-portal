# PCS Wireless Customer Portal — Stage 2 Feature Tickets

**Document Version:** 1.2
**Date:** July 8, 2026
**Stage / Module:** Stage 2 — Catalog, Quotes & Offers
**Status:** Draft — For Development Refinement
**Prepared by:** Business Analysis
**Audience:** Development team (to write technical requirements); open questions flagged for Business

---

## Purpose

This document sits **between** the Stage 2 business requirements (the `US-##` user stories and `UC-##` use cases) and the developers' technical tickets. The user stories say *what* a customer wants and *why*; they intentionally do not say *how the feature should behave*. This document fills that gap with **mid-level feature tickets** that describe the behaviour in enough detail for a developer to write technical requirements without having to guess at the flow, rules, and edge cases.

Each ticket is written in **product / behavioural terms only**. It deliberately contains **no technical detail** — no data models, endpoints, or technology choices. Those decisions belong to the developers and are the output of the next step, informed by these tickets.

**Scope:** the **Catalog, Quotes & Offers** module of Stage 2 (`US-90`–`US-99`, `US-106`, `US-107`). It also specifies two catalog enhancements added during Stage 2 delivery — a **product detail view** (CQ-10) and a **device grading guide** (CQ-11). The other Stage 2 modules (Returns/RMA, Online Payments, Reorder, and the Stage 2 dashboard additions) are not covered here and can be added as further sections later.

The behaviours below are concrete because they are grounded in the agreed Stage 2 requirements (catalog attributes and filter dimensions, the quote status list, the custom-pricing gating).

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

### CQ-01 · Catalog page layout & product display

**User stories:** US-90  ·  **Who:** Admin, Buyer, Viewer

**Summary.** A customer opens the catalog and sees the available inventory laid out clearly, with each product presented as a card showing the key details needed to decide what to quote.

**How it works**
- The catalog page is composed, top to bottom, of: a page heading; a **promotional banner** (see CQ-09); a **Hottest Offers** rail of featured devices (see CQ-09); and the **main catalog area**.
- The main catalog area places the **filter controls** and the **product grid** side by side on desktop (filters in a left column, grid to the right), and stacks them on mobile with the filters in a collapsible panel.
- Above the grid is a controls row: keyword **search**, a **Favorites** toggle, a **sort** control, a **View Quote** button, the customer's **saved-search shortcuts**, and a **count of matching devices**.
- Products are shown as a **responsive grid of cards** — two per row on mobile, up to three per row on larger screens.
- **Each product card shows:**
  - A device image/thumbnail (a category-based placeholder where real imagery is not yet available).
  - A **favorite** toggle (see CQ-04).
  - The **device name**.
  - A **grade badge** (e.g. Grade A, Grade B).
  - A **spec line** of the attributes that apply: storage, colour, and carrier. Attributes that do not apply to a product (e.g. carrier for a laptop, storage for a wearable) are omitted rather than shown blank.
  - The **stock location** and **quantity available**.
  - An indicative **"from" price**.
  - An **Add to Quote** action (see CQ-05).
  - An optional **highlight tag** on featured items (e.g. "New Arrival", "Best Seller", "Limited").
- **Empty state:** when no devices match the current filters, a clear message is shown; a distinct message is shown when the Favorites filter is on but the customer has no favorites.

**Rules & constraints**
- Only inventory that is available to purchase is listed.
- Attributes that do not apply to a product type are omitted from the card, not shown blank.
- Price is presented as an indicative "from" amount, not a firm price.
- The layout adapts to screen size (mobile vs desktop) but presents the same information on each card.

**Acceptance criteria**
- The catalog displays the available devices as a grid of product cards.
- Each card shows: name, grade, the applicable spec line, stock location, quantity available, an indicative "from" price, a favorite toggle, and an Add to Quote action.
- The grid reflows to the screen width (two cards per row on mobile, up to three on desktop) without dropping any of that information.
- A count of the devices currently shown is displayed and stays accurate as filters change.
- When nothing matches, an appropriate empty-state message is shown.

**Open questions for the business**
- Will real product photography be available per device, or should category placeholder imagery be used for now?
- *(Resolved)* Should a customer be able to open a **product detail view**? Yes — a product detail view is now specified in **CQ-10**. Whether it should show **per-grade pricing** remains open and is carried into CQ-10's open questions.
- Should the card show a single "from" price, or a price range across grades/storage tiers?
- Is quantity shown as an exact number, or banded (e.g. "1,000+ available") for commercial reasons?
- With real inventory the grid could be large — should it paginate, load more on scroll, or cap results?

---

### CQ-02 · Filter, search & sort the catalog

**User stories:** US-91  ·  **Who:** Admin, Buyer, Viewer

**Summary.** A customer narrows down the catalog using filters, keyword search, and sorting to find the products they are interested in quickly.

**How it works**
- The customer can filter by: **category, brand, model, grade, storage, location, colour, carrier,** and a **maximum price**.
- Within a single filter (e.g. Brand), selecting more than one value **widens** the results (Apple *or* Samsung). Across different filters, selections **narrow** the results (Brand *and* Grade *and* …).
- Filter options that would return **no results** given the customer's other current selections are shown but **disabled**, so the customer cannot accidentally reach an empty list. This is recalculated every time any filter changes.
- The customer can search by keyword and sort results by **price, name, or newest**.
- A count of active filters is shown, along with a one-click **Clear** that resets all filters, the price limit, and the search.

**Rules & constraints**
- The price filter is an **upper bound** — it shows devices at or below the chosen price.
- Filtering, search, and sort all operate together on the same result set (the grid described in CQ-01).
- The disabled-option behaviour is recalculated on every change to any filter, search term, or price limit.

**Acceptance criteria**
- Applying any filter narrows the list to matching devices only, and the match count updates.
- An option that would yield zero results given the current selections is disabled, not hidden.
- Selecting multiple values in one filter broadens results; selecting across filters narrows them.
- Keyword search and sorting both operate on the currently filtered set.
- Clear resets all filters, the price limit, and the search box back to the full catalog.

**Open questions for the business**
- What is the default sort order on first load?
- Should keyword search match on product name only, or also model, SKU, and other attributes?
- Are there filter dimensions beyond those listed that customers will want (e.g. battery health, warranty, lot size)?

---

### CQ-03 · Save and re-apply a named search

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

### CQ-04 · Favorite devices and filter to favorites

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

### CQ-10 · Product detail view

**User stories:** US-90  ·  **Who:** Admin, Buyer, Viewer

**Summary.** A customer opens a single device from the catalog to see an expanded view with larger imagery, its full specifications, availability, and grade guidance, and can add it to a quote from there.

**How it works**
- Selecting a product card — in the main grid or in **Hottest Offers** — opens a **product detail view** presented as an overlay over the catalog, without navigating away from the current list, filters, or scroll position.
- The detail view shows, for the selected device:
  - An **enlarged image/visual** (a category-based placeholder where real imagery is not yet available), the **highlight tag** if the device has one, and a **favorite** toggle.
  - A header with **brand, device name, grade badge,** and the indicative **"from" unit price**.
  - A **Device Specifications** block listing the attributes that apply: category, brand, model, storage, colour, carrier. Attributes that do not apply are omitted, consistent with the card (see CQ-01).
  - An **Availability** block: stock location and quantity available.
  - **Grade guidance** — a short plain-language description of what the device's grade means, linking through to the full grading guide (see CQ-11).
- From the detail view the customer chooses a **quantity** and adds the device to the quote cart (see CQ-05); the running line subtotal is shown before adding.
- The detail view can be dismissed to return to the catalog exactly as it was — via an explicit close control, a click outside it, or pressing Escape.

**Rules & constraints**
- Opening the detail view does not lose the customer's current filters, search, sort, or position in the list.
- The **favorite** and **Add to Quote** actions on a card continue to work directly, without opening the detail view.
- The information shown mirrors the card's rules (see CQ-01): only available inventory, applicable attributes only, and an indicative "from" price.
- Quantity must be at least 1; adding respects the same cart rules as CQ-05 (an already-carted device has its quantity increased rather than duplicated).

**Acceptance criteria**
- Selecting a device opens a detail view showing enlarged imagery, the full applicable specifications, availability (location + quantity), grade guidance, and price.
- The detail view closes via an explicit control, an outside click, or Escape, returning to the catalog unchanged.
- The favorite toggle and Add to Quote action on a card do not open the detail view.
- Choosing a quantity and adding from the detail view places that quantity in the quote cart.
- The grade shown links to the corresponding grade explanation (CQ-11).

**Open questions for the business**
- When real imagery is available, should the detail view support multiple photos per device (a gallery/carousel)?
- Should the detail view show a price breakdown **per grade / storage tier** rather than a single "from" price? (Carried over from CQ-01.)
- Should it surface commercial detail not on the card — e.g. battery health, warranty terms, lead time, or per-location availability?
- Should the detail view be individually addressable (its own link) so a specific device can be shared or bookmarked?

---

### CQ-11 · Device grading guide

**User stories:** *(delivery enhancement — no dedicated user story; supports buyer confidence for US-90)*  ·  **Who:** Admin, Buyer, Viewer

**Summary.** A customer opens a dedicated page that explains what each device grade means — in plain language, with example media — so they understand exactly what condition they are buying.

**How it works**
- A **grading guide** page explains the grades used across the catalog. It is reachable from: the **grade shown on the product detail view** (see CQ-10), the **grade badge**, and a **"How our grading works"** link on the catalog page.
- The page opens with a short explanation that grades describe a device's **cosmetic condition, not its functionality** — every device is fully tested regardless of grade — followed by the **grading process** (inspect → full functional test → clean & grade → certify).
- For **each grade** the page shows: the grade name and a short tagline; a plain-language summary; a **walkthrough video**; an **example-image gallery** (e.g. front, back, edges) that can be opened larger; a **what-to-expect breakdown** (screen, housing, functionality, battery); and an at-a-glance highlight list. A shortcut lets the customer jump straight to shopping that grade.
- A **comparison table** sets the grades side by side across the same dimensions, and a short **FAQ** answers common grading questions.
- When the guide is reached from a specific grade, it opens focused on that grade's section.

**Rules & constraints**
- The guide explains only the grades actually used in the catalog and stays consistent with the grade badges shown on cards and in the detail view (see CQ-01, CQ-10).
- Grades describe **cosmetic condition only**; the guide must make clear that all grades are fully tested and functional.
- The example media (images and video) is **curated content supplied by PCS**; where media is not yet available, the page shows a clear placeholder in its place.
- Choosing "shop this grade" from the guide applies that grade as a catalog filter.

**Acceptance criteria**
- A grading guide page is reachable from the product detail view, the grade badge, and a link on the catalog page.
- The page explains each catalog grade with a description, example media (or a placeholder), and a what-to-expect breakdown, plus a side-by-side comparison and an FAQ.
- Following a grade link from the catalog or detail view opens the guide focused on that grade.
- Choosing "shop this grade" returns to the catalog filtered to that grade.
- Grade names and definitions in the guide match the badges used elsewhere in the catalog.

**Open questions for the business**
- What are the **official** grade definitions and battery-health thresholds PCS wants published to customers? (The current copy uses working definitions — Grade A battery health ≥ 90%, Grade B ≥ 80% — pending confirmation.)
- Will PCS supply real example photography and walkthrough videos per grade, and who maintains them?
- Should the full set of internal grades (beyond those currently on sale in the catalog) be represented, or only the customer-facing grades?
- Should the guide content be authored/editable in a back-office tool, or is a fixed page acceptable for now?
- Should the guide be linked from further entry points — e.g. quote lines, order history, or global navigation/footer?

---

## 2. Quotes

### CQ-05 · Build a quote cart with quantities

**User stories:** US-92  ·  **Who:** Admin, Buyer

**Summary.** A customer adds devices to a quote cart with the quantities they need, so they can request pricing for a specific set of items.

**How it works**
- From the catalog (list or Hottest Offers), the customer adds a device to the **quote cart**.
- Each cart line shows the device, its grade/storage, the quantity, the list unit price, and the line total.
- The customer can increase or decrease the quantity per line, and remove a line.
- The cart shows the total number of units and a subtotal at **list prices**.
- The customer can keep browsing and adding devices; the cart is retained while they do.
- The cart is the starting point for a quote and leads into the pricing step (see CQ-06) and submission (see CQ-07).

**Rules & constraints**
- A line quantity must be at least 1.
- Adding a device already in the cart increases that line's quantity rather than creating a duplicate line.
- The cart shows list prices only; proposing different pricing is a separate, deliberate step (CQ-06).

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

### CQ-06 · Propose custom pricing on a quote

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

### CQ-07 · Submit and track quotes, with status history

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
| Accepted | Pricing agreed; the quote can be converted to an order (see CQ-08) |
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

### CQ-08 · Convert an accepted quote to an order

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

### CQ-09 · Hottest Offers & promotional banners

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
| US-90 — Browse the catalog | CQ-01, CQ-10 |
| US-91 — Filter & sort the catalog (with auto-disabled options) | CQ-02 |
| US-92 — Add devices to a quote cart with quantity | CQ-05 |
| US-93 — Propose custom per-unit pricing | CQ-06 |
| US-94 — Submit a quote for review | CQ-07 |
| US-95 — View all submitted quotes with status | CQ-07 |
| US-96 — View a quote's full history & status changes | CQ-07 |
| US-97 — Convert an accepted quote into an order | CQ-08 |
| US-98 — "Hottest Offers" section | CQ-09 |
| US-99 — Promotional banners | CQ-09 |
| US-106 — Save & re-apply a named search | CQ-03 |
| US-107 — Favorite devices & filter to favorites | CQ-04 |

**Delivery enhancements (no dedicated Stage 2 user story):** CQ-10 (Product detail view) extends US-90 and resolves an open question raised in CQ-01. CQ-11 (Device grading guide) is a buyer-confidence addition reached from the catalog and the detail view; it should be confirmed against PCS's official grade definitions (see CQ-11 open questions).

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
