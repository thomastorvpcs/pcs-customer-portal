# PCS Wireless Customer Portal — Stage 2 Feature Tickets

**Document Version:** 1.7
**Date:** July 13, 2026
**Stage / Module:** Stage 2 — Catalog, Sales Estimates & Offers
**Status:** Draft — For Development Refinement
**Prepared by:** Business Analysis
**Audience:** Development team (to write technical requirements); open questions flagged for Business

---

> **Revision 1.7 (July 13, 2026):** Updated the Catalog & Sales Estimates tickets to reflect the built **ordering-location** picker — browse *All locations* or order from one, the location filtering the catalog with per-location availability shown on cards, and the single-location cart that warns and drops only the unavailable items when the location is switched (CQ-01, CQ-02, CQ-05).

## Purpose

This document sits **between** the Stage 2 business requirements (the `US-##` user stories and `UC-##` use cases) and the developers' technical tickets. The user stories say *what* a customer wants and *why*; they intentionally do not say *how the feature should behave*. This document fills that gap with **mid-level feature tickets** that describe the behavior in enough detail for a developer to write technical requirements without having to guess at the flow, rules, and edge cases.

Each ticket is written in **product / behavioral terms only**. It deliberately contains **no technical detail** — no data models, endpoints, or technology choices. Those decisions belong to the developers and are the output of the next step, informed by these tickets.

**Scope:** the **Catalog, Sales Estimates & Offers** module of Stage 2 (`US-90`–`US-99`, `US-106`–`US-109`). It also specifies two catalog enhancements added during Stage 2 delivery — a **product detail view** (CQ-10) and a **device grading guide** (CQ-11, `US-108`). The other Stage 2 modules (Returns/RMA, Online Payments, Reorder, and the Stage 2 dashboard additions) are not covered here and can be added as further sections later.

The behaviors below are concrete because they are grounded in the agreed Stage 2 requirements (catalog attributes and filter dimensions, the sales estimate status list, the custom-pricing gating).

---

## How to read a ticket

Every ticket uses the same fields:

- **User stories** — the `US-##`(s) this ticket elaborates.
- **Who** — the roles that can use it (Admin / Buyer / Viewer, per the Stage 2 access matrix).
- **Summary** — one sentence: what the feature lets the user do.
- **How it works** — the behavior step by step: entry points, what the user sees and does, the options available, and what happens on each action.
- **Rules & constraints** — eligibility, validation, limits, and what is allowed vs blocked.
- **States** — where relevant, the statuses something moves through and what each means.
- **Acceptance criteria** — testable, behavior-only statements to confirm the feature is done.
- **Open questions for the business** — product decisions still to be made, surfaced rather than assumed.

---

## Table of Contents

1. [Catalog](#1-catalog)
2. [Sales Estimates](#2-sales-estimates)
3. [Promotional Offers](#3-promotional-offers)
4. [Traceability](#4-traceability)
5. [Sign-Off](#5-sign-off)

---

## 1. Catalog

### CQ-01 · Catalog page layout & product display

**User stories:** US-90  ·  **Who:** Admin, Buyer, Viewer

**Summary.** A customer opens the catalog and sees the available inventory laid out clearly, with each product presented as a card showing the key details needed to decide what to add to a sales estimate.

**How it works**
- The catalog page is composed, top to bottom, of: a page heading; a **promotional banner** (see CQ-09); a **Hottest Offers** rail of featured devices (see CQ-09); and the **main catalog area**.
- The main catalog area places the **filter controls** and the **product grid** side by side on desktop (filters in a left column, grid to the right), and stacks them on mobile with the filters in a collapsible panel.
- Above the grid is a controls row: keyword **search**, a **Favorites** toggle, a **sort** control, a **View Sales Estimate** button, the customer's **saved-search shortcuts**, and a **count of matching devices**.
- Products are shown as a **responsive grid of cards** — two per row on mobile, up to three per row on larger screens.
- **Each product card shows:**
  - A device image/thumbnail (a category-based placeholder where real imagery is not yet available).
  - A **favorite** toggle (see CQ-04).
  - The **device name**.
  - A **grade badge** (the PCS grade code, e.g. C6, CPO, TBG).
  - A **spec line** of the attributes that apply: storage, color, and carrier. Attributes that do not apply to a product (e.g. carrier for a laptop, storage for a wearable) are omitted rather than shown blank.
  - **Availability**: when browsing *All locations*, how many locations stock the device and the total quantity; once an ordering location is chosen, that location's **available quantity** (or a "not stocked here" note).
  - An indicative **"from" price**.
  - An **Add to Sales Estimate** action (see CQ-05).
  - An optional **highlight tag** on featured items (e.g. "New Arrival", "Best Seller", "Limited").
- **Empty state:** when no devices match the current filters, a clear message is shown; a distinct message is shown when the Favorites filter is on but the customer has no favorites.

**Rules & constraints**
- Only inventory that is available to purchase is listed.
- Attributes that do not apply to a product type are omitted from the card, not shown blank.
- Price is presented as an indicative "from" amount, not a firm price.
- The layout adapts to screen size (mobile vs desktop) but presents the same information on each card.

**Acceptance criteria**
- The catalog displays the available devices as a grid of product cards.
- Each card shows: name, grade, the applicable spec line, location availability (all-locations count/total, or the chosen ordering location's quantity), an indicative "from" price, a favorite toggle, and an Add to Sales Estimate action.
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
- The customer can filter by: **category, brand, model, grade, storage, color, carrier,** and a **maximum price**. (Stock **location** is chosen via the ordering-location control — see CQ-05 — rather than as a filter facet.)
- Within a single filter (e.g. Brand), selecting more than one value **widens** the results (Apple *or* Samsung). Across different filters, selections **narrow** the results (Brand *and* Grade *and* …).
- Filter options that would return **no results** given the customer's other current selections are shown but **disabled**, so the customer cannot accidentally reach an empty list. This is recalculated every time any filter changes.
- The customer can search by keyword and sort results by **price, name, or newest**.
- A count of active filters is shown, along with a one-click **Clear** that resets all filters, the price limit, and the search.

**Rules & constraints**
- The price filter is an **upper bound** — it shows devices at or below the chosen price.
- Filtering, search, and sort all operate together on the same result set (the grid described in CQ-01).
- The disabled-option behavior is recalculated on every change to any filter, search term, or price limit.

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
- If a favorited device goes out of stock or is delisted, should it still appear under Favorites (e.g. grayed out) or be dropped?

---

### CQ-10 · Product detail view

**User stories:** US-90  ·  **Who:** Admin, Buyer, Viewer

**Summary.** A customer opens a single device from the catalog to see an expanded view with larger imagery, its full specifications, availability, and grade guidance, and can add it to a sales estimate from there.

**How it works**
- Selecting a product card — in the main grid or in **Hottest Offers** — opens a **product detail view** presented as an overlay over the catalog, without navigating away from the current list, filters, or scroll position.
- The detail view shows, for the selected device:
  - An **enlarged image/visual** (a category-based placeholder where real imagery is not yet available), the **highlight tag** if the device has one, and a **favorite** toggle.
  - A header with **brand, device name, grade badge,** and the indicative **"from" unit price**.
  - A **Device Specifications** block listing the attributes that apply: category, brand, model, storage, color, carrier. Attributes that do not apply are omitted, consistent with the card (see CQ-01).
  - An **Availability** block: stock location and quantity available.
  - **Grade guidance** — a short plain-language description of what the device's grade means, linking through to the full grading guide (see CQ-11).
- From the detail view the customer chooses a **quantity** and adds the device to the sales estimate cart (see CQ-05); the running line subtotal is shown before adding.
- The detail view can be dismissed to return to the catalog exactly as it was — via an explicit close control, a click outside it, or pressing Escape.

**Rules & constraints**
- Opening the detail view does not lose the customer's current filters, search, sort, or position in the list.
- The **favorite** and **Add to Sales Estimate** actions on a card continue to work directly, without opening the detail view.
- The information shown mirrors the card's rules (see CQ-01): only available inventory, applicable attributes only, and an indicative "from" price.
- Quantity must be at least 1; adding respects the same cart rules as CQ-05 (an already-carted device has its quantity increased rather than duplicated).

**Acceptance criteria**
- Selecting a device opens a detail view showing enlarged imagery, the full applicable specifications, availability (location + quantity), grade guidance, and price.
- The detail view closes via an explicit control, an outside click, or Escape, returning to the catalog unchanged.
- The favorite toggle and Add to Sales Estimate action on a card do not open the detail view.
- Choosing a quantity and adding from the detail view places that quantity in the sales estimate cart.
- The grade shown links to the corresponding grade explanation (CQ-11).

**Open questions for the business**
- When real imagery is available, should the detail view support multiple photos per device (a gallery/carousel)?
- Should the detail view show a price breakdown **per grade / storage tier** rather than a single "from" price? (Carried over from CQ-01.)
- Should it surface commercial detail not on the card — e.g. battery health, warranty terms, lead time, or per-location availability?
- Should the detail view be individually addressable (its own link) so a specific device can be shared or bookmarked?

---

### CQ-11 · Device grading guide

**User stories:** US-108  ·  **Who:** Admin, Buyer, Viewer

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
- What are the **official** definitions and cosmetic/battery thresholds for each PCS grade code (C2–C6, CPO, COB, MD A/B, TBG/TBG2/TBG FIN, CRC/CRD/CRX, D2–D4)? The guide seeds descriptions from the internal list; several are flagged "definition to be confirmed" pending PCS input.
- Will PCS supply real example photography and walkthrough videos per grade, and who maintains them?
- Should the full set of internal grades (beyond those currently on sale in the catalog) be represented, or only the customer-facing grades?
- Should the guide content be authored/editable in a back-office tool, or is a fixed page acceptable for now?
- Should the guide be linked from further entry points — e.g. sales estimate lines, order history, or global navigation/footer?

---

## 2. Sales Estimates

### CQ-05 · Build a sales estimate cart with quantities

**User stories:** US-92  ·  **Who:** Admin, Buyer

**Summary.** A customer adds devices to a sales estimate cart with the quantities they need, so they can request pricing for a specific set of items.

**How it works**
- The customer picks an **ordering location** (defaulting to *All locations* for browsing); selecting a specific location filters the catalog to it and becomes the cart's location.
- From the catalog (list or Hottest Offers), the customer adds a device to the **sales estimate cart**.
- Each cart line shows the device, its grade/storage, the quantity, the list unit price, and the line total.
- The customer can increase or decrease the quantity per line, and remove a line.
- The cart shows the total number of units and a subtotal at **list prices**.
- The customer can keep browsing and adding devices; the cart is retained while they do.
- The cart is the starting point for a sales estimate and leads into the pricing step (see CQ-06) and submission (see CQ-07).

**Rules & constraints**
- A line quantity must be at least 1.
- Adding a device already in the cart increases that line's quantity rather than creating a duplicate line.
- The cart shows list prices only; proposing different pricing is a separate, deliberate step (CQ-06).
- **A cart — and the sales estimate built from it — may contain items from only one stock location.** The customer chooses an **ordering location** (or browses *All locations*); selecting a specific location filters the catalog to it. The first item added commits the ordering location; adding an item stocked at a different location prompts the customer to start a new cart for it. **Changing the ordering location** warns the customer if the cart holds items the new location does not stock and lists them; on confirm, only those items are removed and the location switches. Emptying the cart releases the location.

**Acceptance criteria**
- A customer can add a device to the cart and see it as a line with quantity and list price.
- Quantity can be adjusted up and down, and a line can be removed.
- Adding an already-carted device increases its quantity instead of duplicating it.
- The cart's unit count and list subtotal update as lines and quantities change.
- A Viewer cannot build or submit a sales estimate.
- The customer can browse *All locations* or order from one; the cart is limited to the chosen ordering location, adding an item from another location prompts a new cart, and switching the ordering location drops only the cart items the new location does not stock.

**Open questions for the business**
- Should quantity adjust in single units, or in packs (e.g. steps of 10)? Is there a minimum order quantity per device?
- *(Resolved)* A cart / sales estimate is limited to a **single stock location** (see Rules above), and the proactive **ordering-location picker** (All-locations browse + per-location availability) is now implemented. Real per-location inventory quantities are still to come from NetSuite.
- Does stock availability cap the quantity a customer can request?

---

### CQ-06 · Propose custom pricing on a sales estimate

**User stories:** US-93  ·  **Who:** Admin, Buyer

**Summary.** On a dedicated pricing step, the customer can request a custom per-unit price on individual sales estimate lines, as a formal request subject to PCS review.

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
- Lines left untouched are carried into the submitted sales estimate at list price.
- The submitted sales estimate records, per line, the proposed price and the selected reason.

**Open questions for the business**
- Is the reason list fixed as above, or should a free-text reason be allowed (e.g. for "Other")?
- Is there a floor/ceiling on how far a proposed price may deviate from the list price before it is auto-rejected or flagged?

---

### CQ-07 · Submit and track sales estimates, with status history

**User stories:** US-94, US-95, US-96  ·  **Who:** Admin, Buyer (submit); Admin, Buyer, Viewer (view)

**Summary.** A customer submits a built sales estimate to PCS for review, then tracks every submitted sales estimate and follows its status and negotiation history.

**How it works**
- From the pricing step the customer **submits** the sales estimate for review. On submission the sales estimate is created with a **reference number** and a status of **Submitted**, and PCS is notified to respond with confirmed pricing.
- The **Sales Estimates list** shows all of the customer's sales estimates with reference number, created date, item count, total, and status. The customer can filter by status (All, Draft, Submitted, Under Review, Accepted) and search by reference number.
- Selecting a sales estimate opens its **detail**: the assigned PCS rep, the created and valid-until dates, each line item with the customer's proposed **Your Price** alongside the **PCS Price**, and a chronological **status history** timeline of every change with dates and notes.
- When PCS has counter-offered, the detail highlights that revised pricing is proposed and offers the customer three responses: **Accept**, **Decline**, or **Counter**. Accepting reaches agreement and the sales estimate is automatically converted into a sales order (see CQ-08). Declining closes the sales estimate. Countering lets the customer propose their own revised per-unit pricing back to PCS, which returns the sales estimate to **Under Review** for another round.
- The customer can download a PDF copy of a sales estimate.

**States**

| Status | Meaning |
|--------|---------|
| Draft | Sales Estimate is being built; not yet submitted |
| Submitted | Sent to PCS; awaiting review |
| Under Review | PCS is reviewing the requested pricing |
| Counter-Offered | PCS has responded with revised pricing; customer can Accept, Decline, or Counter |
| Accepted | Pricing agreed (by PCS, or by the customer accepting a counter-offer); the sales estimate is **automatically converted into a sales order** (see CQ-08) |
| Declined | Customer declined PCS's counter-offer |
| Rejected | PCS declined the sales estimate |
| Expired | The sales estimate's validity period has lapsed |

**Rules & constraints**
- A sales estimate must contain at least one line item to be submitted.
- Once submitted, a sales estimate is read-only to the customer except for responding to a counter-offer (Accept / Decline / Counter).
- The **PCS Price** for a line is shown only once PCS has set it; until then it is blank.
- The sales estimate total reflects PCS pricing where it has been provided, otherwise the customer's proposed price.
- A sales estimate past its valid-until date is treated as Expired and cannot be accepted or converted.

**Acceptance criteria**
- Submitting a built sales estimate creates it with a reference number and status Submitted, and it appears in the customer's Sales Estimates list.
- The list can be filtered by status and reflects the correct count and total per status.
- The detail shows line items with both Your Price and PCS Price, and a status-history timeline that lists each change with its date.
- A Counter-Offered sales estimate presents Accept, Decline, and Counter actions; other statuses do not.
- Accepting, declining, or countering a counter-offer records the outcome in the status history; accepting also produces a sales order (see CQ-08).

**Open questions for the business**
- Can a customer edit and resubmit a Rejected sales estimate, or must they start a new one?
- Is there a limit to how many counter rounds (customer ↔ PCS) are allowed before a sales estimate must be accepted, declined, or expires?
- What is the default validity period of a sales estimate, and can a customer request an extension near expiry?
- Should the customer be notified (email/SMS/in-app) when a sales estimate's status changes?

---

### CQ-08 · Automatic conversion of an accepted sales estimate to a sales order

**User stories:** US-97, US-109  ·  **Who:** Admin, Buyer

**Summary.** When a sales estimate is accepted, it is **automatically converted into a sales order** — the customer does not perform any separate accept or convert step.

**How it works**
- **Acceptance is the trigger.** A sales estimate becomes **Accepted** in one of two ways: PCS accepts the customer's proposed pricing, or the customer accepts a PCS counter-offer (see CQ-07).
- On acceptance, a **sales order is created automatically**, **pre-populated** with the sales estimate's line items, quantities, and the agreed (PCS-confirmed) pricing.
- The customer is **not** asked to accept or convert anything. The accepted sales estimate links through to the sales order it produced, which then follows the normal order flow.

**Rules & constraints**
- Conversion happens **automatically on acceptance** — there is no manual "Convert to Order" step for the customer.
- The sales order is created at the **agreed pricing**, not at list or the originally proposed price.
- An expired sales estimate cannot be accepted, and therefore is never converted.

**Acceptance criteria**
- When a sales estimate reaches **Accepted**, a sales order is created automatically, with no customer action.
- The resulting sales order contains exactly the accepted sales estimate's line items, quantities, and agreed prices.
- The accepted sales estimate references the sales order it generated.
- No "Convert to Order" action is presented to the customer.

**Open questions for the business**
- Should the customer be notified (email/SMS/in-app) when acceptance produces a sales order?
- Does the resulting sales estimate move to a "Converted/Closed" state, or remain **Accepted** with a link to the order?
- Are shipping and billing details taken from the account automatically, or confirmed on the resulting sales order before fulfillment?

---

## 3. Promotional Offers

### CQ-09 · Hottest Offers & promotional banners

**User stories:** US-98, US-99  ·  **Who:** Admin, Buyer, Viewer

**Summary.** Customers see curated featured deals — a "Hottest Offers" section and full-width promotional banners — so current deals and featured inventory are clearly highlighted.

**How it works**
- A **Hottest Offers** section surfaces a curated set of featured devices. Each featured item shows its device, an optional highlight tag (e.g. "Best Seller", "New Arrival", "Limited"), grade/storage, availability, and price, and can be added straight to a sales estimate.
- A **promotional banner** presents a headline featured deal in a prominent full-width strip, with a short call to action that takes the customer to the relevant deal or catalog view.
- Hottest Offers and the promotional banner appear on the **catalog**, and Hottest Offers also appears on the **dashboard**.

**Rules & constraints**
- The set of featured offers and the banner content are **curated by PCS** (the curation/authoring itself is a back-office capability and is out of scope for this document).
- Featured items follow the same availability and pricing rules as the rest of the catalog.

**Acceptance criteria**
- The Hottest Offers section displays the curated featured devices with their tag, price, and availability.
- A featured device can be added to a sales estimate directly from the offers section.
- The promotional banner is shown on the dashboard and catalog and links through to the featured deal/catalog view.

**Open questions for the business**
- How are offers and banners curated and scheduled (start/end dates), and by whom?
- How many featured items should Hottest Offers show, and in what order?
- Can more than one banner run at once (a rotation), or only one at a time?

---

## 4. Traceability

Every Catalog, Sales Estimates & Offers user story maps to at least one ticket.

| User Story | Covered by |
|------------|------------|
| US-90 — Browse the catalog | CQ-01, CQ-10 |
| US-91 — Filter & sort the catalog (with auto-disabled options) | CQ-02 |
| US-92 — Add devices to a sales estimate cart with quantity | CQ-05 |
| US-93 — Propose custom per-unit pricing | CQ-06 |
| US-94 — Submit a sales estimate for review | CQ-07 |
| US-95 — View all submitted sales estimates with status | CQ-07 |
| US-96 — View a sales estimate's full history & status changes | CQ-07 |
| US-97 — Auto-convert an accepted sales estimate into a sales order | CQ-08 |
| US-98 — "Hottest Offers" section | CQ-09 |
| US-99 — Promotional banners | CQ-09 |
| US-106 — Save & re-apply a named search | CQ-03 |
| US-107 — Favorite devices & filter to favorites | CQ-04 |
| US-108 — View the device grading guide | CQ-11 |
| US-109 — Respond to a counter-offer (accept / decline / counter) | CQ-07, CQ-08 |

**Delivery enhancement:** CQ-10 (Product detail view) has no dedicated user story of its own — it extends US-90 (browse the catalog) and resolves an open question raised in CQ-01. The grade definitions and battery-health thresholds published by CQ-11 are still to be confirmed against PCS's official grading rules (see CQ-11 open questions).

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
