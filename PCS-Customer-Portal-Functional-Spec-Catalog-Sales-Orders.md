# PCS Wireless Customer Portal — Functional Specification
## Catalog, Grading Guide & Sales Order Creation

**Document Version:** 1.0
**Date:** July 24, 2026
**Status:** Draft — for review
**Prepared by:** Development Team
**Companion to:** *PCS Customer Portal — Business Requirements, Stage 2* (v1.6)

---

## How to read this document

This is the **mid-level functional specification** for three focus areas of Stage 2: the **Catalog**, the **Grading Guide**, and **Sales Order creation** (cart → sales estimate → confirmation → sales order). It sits **between** the business requirements (the *why* — user stories US-XX / use cases UC-XX in the requirements doc) and the eventual technical design (the *how*).

For every screen it states **what information is shown**, **what each control does when the user interacts with it**, the **states** in between (empty / disabled / error / loading), and **acceptance criteria** written as Given / When / Then.

- **FR-x-nn** — a numbered functional requirement.
- **AC** — acceptance criteria a build must satisfy, in Given/When/Then form.
- **Traceability** — each section names the requirement stories/use cases it realises; a full matrix is in Section 6.
- **Prototype reference** — the behaviour described is demonstrated in the current UI prototype unless marked *(proposed)* or *(pending)*.

> **Scope:** Catalog, Grading Guide, and Sales Order creation only. The other Stage 2 modules (Online Payments, Reorder, Dashboard additions) and Returns/RMA are **not** covered here. Where a behaviour depends on a still-open commercial decision, it is marked **(pending)** and listed in Section 5.

---

## Global UI conventions

These apply to every screen in this document.

- **Responsive**: each screen has a **mobile** layout (single column; cart and detail open as bottom sheets/full-screen dialogs) and a **desktop** layout (multi-column; cart and filters shown as side panels). Behaviour and information are equivalent across both.
- **Theme**: every screen supports light and dark themes.
- **Money**: unit and line prices display as `$#,###.00` (two decimals). Account-level figures (budget, balances) display as whole dollars `$#,###`.
- **Quantity**: cart quantities step in units of **10** and never go below 1. Minimum-order-quantity, pack size, and stock caps are **(pending)** — see Section 5.
- **Dialogs**: every modal / bottom sheet closes on **Escape**, on clicking the backdrop, and via its explicit close (✕) control. Opening a full-screen dialog locks background scroll.
- **Persistence**: saved searches and favorites persist between visits. *(Proposed: tied to the user account so they follow the user across devices; the prototype persists them per-browser — see Section 5.)*
- **Permissions**: viewing is available to all roles; actions that build/submit/confirm an order require **Admin** or **Buyer** (Viewer is read-only). See Section 4.

---

## 1. Catalog

Realises **US-90, US-91, US-92, US-98, US-99, US-106, US-107** and (link) **US-108**; use cases **UC-90, UC-90a, UC-91, UC-92, UC-98, UC-99, UC-106, UC-107**.

### 1.1 Catalog page — layout & information shown  *(US-90 / UC-90)*

The catalog page is composed of these regions, top to bottom:

1. **Page header** — title "Catalog", a one-line subtitle, and a **"How our grading works"** link (shield icon) to the Grading Guide (Section 2).
2. **Promotional banner** — a single full-width featured deal (headline, price highlight, and a **Shop Deal** button). *(US-99)*
3. **Hottest Offers** — a row/grid of featured devices. *(US-98 — see 1.8)*
4. **Controls bar** — keyword **search** field, **ordering-location** picker (1.2), **Favorites** toggle (1.5), **Sort** selector (1.3), and a **View Cart** button showing the number of distinct lines.
5. **Saved-search chips** — one-click shortcuts for saved searches (1.4).
6. **Filters** — a sidebar (desktop) or collapsible panel (mobile) (1.3 / 1.4).
7. **Results grid** — product cards for the filtered inventory.
8. **Cart** — a side panel (desktop) or bottom sheet (mobile) (1.7).

**FR-C-01 — Product card contents.** Each card shows: device image/placeholder, name, **grade badge**, a spec line (`storage · color · carrier`), an **availability label** (see 1.2), a **"from" unit price**, a **favorite** (heart) toggle, and an **Add to Cart** button.

**FR-C-02 — Card click.** Clicking anywhere on a card except the heart or Add-to-Cart button opens the **product detail** view (1.6). Clicking the heart toggles favorite without opening detail. Clicking **Add to Cart** adds the device (1.7) without opening detail.

**FR-C-03 — Results count & context.** Above the grid the page shows the number of devices displayed and whether the view is *all locations*, *a named location*, or *favorites*, plus a line stating the current ordering context ("Browsing…", or "Ordering from {location}").

**FR-C-04 — Empty state.** When no device matches the active filters/search, the grid shows an empty message. In the Favorites view with no favorites, it shows a "no favorites yet" prompt instead.

**AC**
- **Given** the catalog is open with no filters, **when** it loads, **then** all in-stock devices are shown with card details per FR-C-01 and the count reflects the total shown.
- **Given** a card, **when** the user clicks its body, **then** the product detail opens; **when** the user clicks its heart, **then** only the favorite state toggles; **when** the user clicks Add to Cart, **then** the item is added and the cart opens.
- **Given** filters that match nothing, **when** applied, **then** the empty-state message is shown and the count reads 0.

### 1.2 Ordering location  *(US-92 / UC-90a)*

**FR-C-05 — Location picker.** A location control offers **All locations** (default) plus each stock location available to the account. Selecting **All locations** is a browse mode across every location; selecting a specific location makes it the **ordering location**.

**FR-C-06 — Effect of a specific location.** Selecting a location filters the grid, the Hottest Offers, and the filter facets to what that location stocks, and binds the cart to it (1.7).

**FR-C-07 — Availability label.** Each card's availability label depends on context: in **All locations** it shows "{n} locations · {total} total"; with an ordering location set it shows "{location} · {qty} avail", or "Not stocked at {location}" for devices that location does not carry.

**FR-C-08 — Switching location with a non-empty cart.** Covered by the location-switch rules in 1.7 (warn + drop only unavailable items on confirm).

**AC**
- **Given** the default view, **when** the page loads, **then** the location is **All locations** and cards show location-count/total availability.
- **Given** a specific location is selected, **then** the grid, Hottest Offers, and facets show only what that location stocks and each card shows that location's quantity (or "not stocked here").

### 1.3 Filter, search & sort  *(US-91 / UC-91)*

**FR-C-09 — Filter dimensions.** The filter set is exactly: **Product Category (line of business), Manufacturer, Model, Storage, Color, Grade, SIM Type**, a **Price** ceiling, and **Location** (via the picker in 1.2). Each dimension (except Price/Location) is a multi-select list; selecting values narrows results; selecting none means "no constraint".

**FR-C-10 — Facet auto-disable.** Within a dimension, an option that would yield zero results given the *other* active filters + search + price + location is shown **disabled** (not hidden). Already-selected options are never disabled.

**FR-C-11 — Price ceiling.** The Price control sets a maximum unit price; only devices at or below it are shown. Its current value is displayed ("Up to $X").

**FR-C-12 — Keyword search.** The search field matches on a **contains** (case-insensitive substring) basis across **product name, model, manufacturer, color, grade, and SIM type**. It combines (AND) with the active filters.

**FR-C-13 — Sort.** Sort options are **Price** (low → high, **default** *(proposed)*), **Name** (A → Z), and **Newest** (most-recently listed). Changing sort re-orders the grid immediately.

**FR-C-14 — Active-filter count & clear.** A badge shows the number of active filter constraints (each selected value + a below-max price counts as one). A **Clear** action resets all filters, the price ceiling, and the search (it does not change the ordering location or favorites view).

**AC**
- **Given** "Manufacturer = Apple" is selected, **when** the Model facet is evaluated, **then** non-Apple models are disabled while Apple models remain selectable.
- **Given** the search term "pixel", **when** entered, **then** only devices whose name/model/manufacturer/color/grade/SIM type contains "pixel" (case-insensitive) remain, combined with any active filters.
- **Given** several active filters, **when** Clear is pressed, **then** all filters, the price ceiling, and the search reset and the full (location-scoped) grid returns.

### 1.4 Saved searches  *(US-106 / UC-106)*

**FR-C-15 — Save.** The customer types a name and saves the **current** filter + search + price combination as a named saved search.

**FR-C-16 — Apply.** Selecting a saved search (from the panel or a chip) re-applies its stored filters/search/price, exits the Favorites view, and closes the mobile filter panel. The chip/row for the currently-matching saved search is highlighted as active.

**FR-C-17 — Rename / delete.** Each saved search can be renamed inline or deleted. Deleting the active one clears the active highlight.

**FR-C-18 — Empty state.** With no saved searches, the panel shows a prompt explaining how to save one.

**AC**
- **Given** an active filter combination, **when** the customer names and saves it, **then** it appears as a chip/row and, while the current filters equal it, is marked active.
- **Given** a saved search, **when** applied, **then** the exact stored filters/search/price are restored and the grid updates.
- **Given** a saved search, **when** renamed or deleted, **then** the change persists across a reload.

### 1.5 Favorites  *(US-107 / UC-107)*

**FR-C-19 — Toggle.** The heart on a card (or in the product detail) toggles the device as a favorite; the filled/empty state reflects it.

**FR-C-20 — Favorites view.** A **Favorites** toggle (with a count) filters the grid to favorited devices only; toggling off returns to the normal grid. Favorites combine with the other filters.

**FR-C-21 — Out-of-stock favorites *(pending)*.** A favorited device that goes out of stock or is delisted **remains listed and is flagged** rather than silently dropped. *(Confirmation pending — Section 5.)*

**AC**
- **Given** a device, **when** its heart is toggled, **then** its favorite state flips and persists across a reload.
- **Given** the Favorites view, **when** enabled, **then** only favorited devices show and the count matches; **when** disabled, **then** the full grid returns.

### 1.6 Product detail  *(US-90; links to US-108 / UC-90)*

Opening a card (FR-C-02) shows a detail dialog containing:

**FR-C-22 — Detail contents.** Image/placeholder with any promotional tag and a favorite toggle; brand and name; a **grade badge that links to the Grading Guide** for that grade (Section 2); the **unit list price**; a **specifications** grid (Category, Manufacturer, Model, Storage, Color, Carrier, **SIM Type**); an **availability-by-location** breakdown with per-location quantities and a total; a **grade summary card** linking to the guide; a **quantity stepper** (± 10, editable), an **estimated subtotal** for the chosen quantity, and an **Add to Cart** button.

**FR-C-23 — Add from detail.** Adding from detail adds the chosen quantity to the cart (1.7) and closes the dialog.

**FR-C-24 — Grade links.** Clicking the grade badge or the grade summary card opens the Grading Guide at that grade (Section 2.4).

**AC**
- **Given** a product detail dialog, **then** it shows specs (including SIM Type), the per-location availability totalling the device's quantity, and the grade link.
- **Given** a quantity is set, **when** Add to Cart is pressed, **then** that quantity is added to the cart and the dialog closes.

### 1.7 Sales-estimate cart  *(US-92 / UC-92)*

The cart is the basis of a sales estimate. It is a **single-location** cart.

**FR-C-25 — Add / open.** Adding a device places a line (default quantity 10) and opens the cart. Adding an existing line increases its quantity.

**FR-C-26 — Ordering-location lock.** The first item added commits the cart's ordering location (the selected location, or the item's location when browsing All). A location badge on the cart shows it. Emptying the cart releases the lock.

**FR-C-27 — Add from another location.** While a location is committed, adding a device not stocked there opens an **"item from a different location"** prompt: **Keep current cart** (cancel) or **Start new cart** (replace the cart with just that item at its location).

**FR-C-28 — Switch location with items.** Changing the ordering location when the cart holds items not stocked at the new location opens a **switch-confirmation** listing those items: **Keep {current}** (cancel) or **Switch & remove {n}** (drop only the unavailable items and switch; the rest stay).

**FR-C-29 — Line controls.** Each cart line shows device name, grade/storage, a **quantity stepper** (± 10), the **line total**, the **unit list price**, and a **remove** control. The cart footer shows total **units** and the **subtotal** (at list price on the cart step).

**FR-C-30 — Continue.** A **Continue to checkout** action moves to the pricing/checkout step (Section 3.1–3.2). Quantity minimums/packs/stock caps are **(pending)** — Section 5.

**AC**
- **Given** an empty cart, **when** the first item is added, **then** the cart's ordering location is set to that item's context and shown as a badge.
- **Given** a committed location, **when** the customer adds an item not stocked there, **then** the different-location prompt appears and no line is added unless the customer starts a new cart.
- **Given** a cart with items, **when** the customer switches to a location missing some of them and confirms, **then** only the unavailable items are removed and the location switches.
- **Given** a cart line, **when** the quantity steppers are used, **then** quantity changes by 10 (never below 1) and the line total and subtotal update.

### 1.8 Hottest Offers & promotional banner  *(US-98, US-99 / UC-98, UC-99)*

**FR-C-31 — Hottest Offers.** A curated set of featured devices is shown as cards; each supports favorite, open-detail, and Add-to-Cart like a grid card. The set is scoped by the ordering location (1.2).

**FR-C-32 — Banner.** A full-width promotional banner is shown on the catalog (and dashboard). Its **Shop Deal** action navigates into the relevant catalog view.

**FR-C-33 — Curation is back-office.** Which items/banners are featured, their order, count, and scheduling are managed by PCS in the back office and are **out of scope** for the customer portal build (curation controls are not a customer-facing feature). *(Open question — Section 5.)*

**AC**
- **Given** a specific ordering location, **then** Hottest Offers shows only items available there.
- **Given** a promotional banner, **when** Shop Deal is clicked, **then** the customer is taken to the corresponding catalog view.

### Catalog data objects

**Catalog item** — id, name, manufacturer (brand), model, category (LOB), grade (code), storage, color, carrier/lock, **SIM type**, unit list price, per-location availability (location → quantity), total quantity, featured flag + promo tag.
**Cart line** — catalog-item reference, quantity, optional custom unit price + reason + acknowledgement (Section 3.1). The **cart** carries a single ordering location and a set of lines.

---

## 2. Grading Guide

Realises **US-108 / UC-108**. A standalone page (route `/catalog/grades`) explaining what each grade means.

### 2.1 Entry points

**FR-G-01 — Reachable from.** The guide is reachable from: the **"How our grading works"** link on the catalog header; the **grade badge** and **grade summary card** in the product detail (2.4); and any direct/bookmarked link. A **Back to Catalog** link and a bottom **Go to Catalog** button return the user.

### 2.2 Page layout & information shown

Top to bottom:

**FR-G-02 — Hero.** Title "Device Grading, Explained", an explainer that grades describe **cosmetic condition and workflow stage, not whether the device works**, and a row of **code chips** — one per grade code.

**FR-G-03 — "How every device is graded".** A four-step process (Inspect → Full functional test → Clean & grade → Certify), each with an icon, number, title, and description.

**FR-G-04 — Grade reference table.** One row per grade code, columns: **Code** (a chip), **Name**, **What it means**, and **Status** — either **Defined** or **To be confirmed** for codes whose criteria PCS is still finalising.

**FR-G-05 — Per-grade sections.** One section per grade, each showing: the code tile, name, badge, a **"Definition to be confirmed"** tag where applicable, a tagline and summary, an optional **source** note, and — **only when that content exists** — a **walkthrough video**, an **example-condition gallery** (thumbnails), a **"What to expect"** spec (Screen / Housing / Functionality / Battery), and an **"At a glance"** highlights list. Each section ends with a **"Shop {code} devices"** link.

**FR-G-06 — FAQ.** An accordion of common questions; one entry is open by default.

**FR-G-07 — Graceful degradation.** Where a grade has no media or defined spec yet, those blocks are omitted (no empty placeholders beyond a "coming soon" affordance in the video area). Placeholder grades are clearly badged **"Definition to be confirmed."**

### 2.3 Controls & interactions

**FR-G-08 — Code chip / table code → jump.** Clicking a code chip (hero) or a code in the reference table scrolls to that grade's section and briefly highlights it.

**FR-G-09 — Example thumbnail → lightbox.** Clicking an example thumbnail opens a **lightbox** showing the larger image, the view label, and a caption. When a grade has multiple examples, the lightbox provides **previous/next** controls and supports **←/→** keys; **Esc** closes it.

**FR-G-10 — Video.** When a grade has a walkthrough video it plays inline (embedded or native); otherwise a "video coming soon" affordance is shown.

**FR-G-11 — FAQ accordion.** Clicking a question expands its answer and collapses any other open one; clicking the open question collapses it.

**FR-G-12 — Shop-grade link.** Clicking **"Shop {code} devices"** navigates to the catalog **pre-filtered to that grade** (2.4).

### 2.4 Deep-linking & catalog hand-off

**FR-G-13 — Anchor deep-link.** Opening the guide with a grade anchor (e.g. `…/grades#c6`) scrolls to and highlights that grade. The product-detail grade badge/card links here.

**FR-G-14 — Catalog grade pre-filter.** Opening the catalog with a grade parameter (e.g. `/catalog?grade=C6`) pre-applies that grade in the catalog's Grade filter. The guide's "Shop {code}" links use this.

### 2.5 Content status

**FR-G-15 — Content pending.** The guide presents the **main sellable grades** with description and example media; the **final approved grade list, definitions/thresholds, and real photos/videos are (pending)** commercial sign-off (Section 5). Codes without confirmed definitions are shown, labelled **"to be confirmed"**, for transparency.

**AC**
- **Given** the guide, **when** a hero code chip is clicked, **then** the page scrolls to that grade's section and highlights it briefly.
- **Given** a grade with multiple examples, **when** a thumbnail is opened, **then** the lightbox shows it with working previous/next (buttons and ←/→) and closes on Esc.
- **Given** a grade section, **when** "Shop {code} devices" is clicked, **then** the catalog opens pre-filtered to that grade.
- **Given** a grade whose definition is unconfirmed, **then** it is labelled "to be confirmed" in both the reference table and its section.

### Grade data object

**Grade** — code, slug, name, tagline, badge/accent styling, short blurb, full summary, optional source, `placeholder` flag; optional `spec` (screen / housing / functional / battery), `highlights[]`, `examples[]` (view, caption, image), and `videoUrl`/`poster`. This is the single source shared by the catalog grade badges/filter, the product detail, and this guide.

---

## 3. Sales Order Creation

The path from a built cart to a created sales order: **pricing step → submit sales estimate → PCS review / counter → order confirmation → sales order**. Realises **US-93, US-94, US-95, US-96, US-97, US-109, US-159** and the ordering controls **US-156, US-157, US-158**; use cases **UC-93 … UC-97, UC-109, UC-156 … UC-159**.

### 3.1 Pricing step — propose custom pricing  *(US-93 / UC-93)*

Reached from **Continue to checkout** (1.7). Each line starts at **list price**.

**FR-O-01 — Default list pricing.** On the pricing step every line shows the list unit price; the customer may submit at list price without proposing anything ("buy it now").

**FR-O-02 — Request custom pricing.** A per-line **Request custom pricing** control reveals a **reason** selector (Volume commitment, Competitor quote, Budget constraint, Repeat order, Other) and an **acknowledgement** checkbox ("any price I propose is a request, reviewed and confirmed by PCS"). The offer input stays locked until a reason is selected **and** the acknowledgement is ticked; then **Enable price field** unlocks the per-unit offer input for that line.

**FR-O-03 — Offer entry / reset.** With the field unlocked the customer enters a proposed per-unit price (numeric); the line total and subtotal reflect it. A **Use list price** control resets the line to list and re-locks it.

**FR-O-04 — Offer approval policy.** **List (buy-it-now) pricing is auto-approved** — orderable directly. **Custom / proposed prices are always reviewed by PCS** (no auto-approval at launch). This is stated to the customer on the step.

**AC**
- **Given** the pricing step, **then** each line is at list price and can be submitted without any custom pricing.
- **Given** a line, **when** the customer requests custom pricing, **then** the offer input stays locked until both a reason is chosen and the acknowledgement is ticked, after which it unlocks.
- **Given** an unlocked line, **when** "Use list price" is chosen, **then** the line reverts to list price and re-locks.

### 3.2 Account & order check, and submit  *(US-94, US-156–158 / UC-94, UC-156–158)*

The pricing/checkout step shows an **Account & order check** and the submit action. The checks below are the ordering controls confirmed on the commercial side.

**FR-O-05 — Account & order check panel.** Displays **Spending budget**, **Committed (open balance)**, **This order** (the step subtotal), and **Remaining after order**, plus a **status banner**: *good standing*, *over budget* (amber), *past due — blocked* (red), or *past due — approved* (green). A clearly-labelled **Demo** selector (Good standing / Past due / Over credit limit) lets a reviewer simulate each standing in the prototype.

**FR-O-06 — Spending budget rule *(US-158)*.** The budget caps open order value at any time: **baseline $500,000**, or **2× the account's peak monthly sales** when monthly sales are **≥ $500,000**. Remaining = budget − committed − this order.

**FR-O-07 — Good standing → submit.** When standing is good, **Submit for Review** submits the sales estimate: it is created with status **Submitted** and a reference number, and the customer is taken to the Sales Estimates list (3.3).

**FR-O-08 — Past due → block *(US-156)*.** When the account is past due, the submit button is shown as **"Payment required to submit"** and, when pressed, opens a **Payment-required dialog**: it states the past-due amount and invoice count, explains a cart can be built but an order cannot be created until the balance is current, and offers **contact Finance** details and a link to **View balance**. It also exposes a **back-office cart-approval override** (in the prototype, a "simulate Finance approving this cart" affordance); once approved, the block is released and the customer can submit.

**FR-O-09 — Over budget/credit → 24h hold *(US-157)*.** When the order exceeds available credit / spending budget, pressing submit opens an **over-limit dialog** explaining the order can be placed but the **stock is held for 24 hours** and released if payment/approval is not received. **Submit & hold 24h** proceeds; **Back to cart** cancels.

**FR-O-10 — Where checks apply.** These checks apply at the point the customer commits an order — i.e. submitting the estimate and again at order confirmation (3.5).

**AC**
- **Given** good standing, **when** Submit for Review is pressed, **then** a sales estimate is created (status Submitted, reference issued) and the customer lands on the estimates list.
- **Given** a past-due account, **when** submit is pressed, **then** the payment-required dialog blocks order creation and offers Finance contact + a back-office override; **when** the override is applied, **then** submission is allowed.
- **Given** an order over the spending budget, **when** submit is pressed, **then** the over-limit dialog explains the 24-hour hold and only proceeds on confirm.
- **Given** the check panel, **then** Spending budget, Committed, This order, and Remaining are shown and the status banner matches the standing.

### 3.3 View, track & inspect sales estimates  *(US-95, US-96 / UC-95, UC-96)*

**FR-O-11 — List & KPI filters.** The Sales Estimates page lists estimates with reference, created date, valid-until, item count, total, and status. **KPI filter tiles** (All, Draft, Submitted, Under Review, Accepted) each show a count and aggregate value and filter the list when selected. A search field filters by estimate number. A **New Sales Estimate** action returns to the catalog.

**FR-O-12 — Detail.** Selecting an estimate shows: header (id + status), customer/rep, a summary grid (created, valid-until, item count, total), the **counter-offer panel** when applicable (3.4), a **line-items table** (Product, SKU, Grade, Storage, Qty, **Your Price**, **PCS Price**), a **status-history timeline**, the **action buttons** (3.5 / documents), and a **downloadable sales-estimate document**.

**FR-O-13 — Status timeline.** The history lists each event with label, date, and note, most-recent last, with the latest highlighted.

**AC**
- **Given** the estimates list, **when** a KPI tile is selected, **then** the list filters to that status and the tile shows the matching count and value.
- **Given** an estimate, **when** selected, **then** its line items (with Your Price vs PCS Price), status history, and available actions are shown.

### 3.4 Respond to a counter-offer  *(US-109 / UC-109)*

When PCS returns revised pricing, the estimate status is **Counter-Offered** and a **counter panel** appears.

**FR-O-14 — Counter panel.** Explains PCS proposed revised pricing (visible in the PCS Price column) and offers three actions: **Accept**, **Decline**, **Counter**.

**FR-O-15 — Accept.** **Accept** locks in the PCS pricing (each line's price becomes the PCS price), records the acceptance in the history, and opens the **order-confirmation step** (3.5) to place the sales order.

**FR-O-16 — Decline.** **Decline** records the decline and sets status **Declined**; no order is created.

**FR-O-17 — Counter.** **Counter** reveals a per-line proposed-unit-price input; **Send counter-offer** returns the estimate to PCS with status **Under Review** and the revised prices (PCS price cleared pending re-review); **Cancel** dismisses without sending.

**AC**
- **Given** a Counter-Offered estimate, **when** Accept is pressed, **then** the line prices become the PCS prices and the order-confirmation step opens.
- **Given** the counter form, **when** revised prices are sent, **then** the estimate returns to Under Review carrying those prices.
- **Given** a Counter-Offered estimate, **when** Decline is pressed, **then** status becomes Declined and no order is created.

### 3.5 Order confirmation & sales-order creation  *(US-97, US-159 / UC-97, UC-159)*

Once pricing is agreed (PCS accepted the estimate, or the customer accepted a counter-offer), the estimate is **Accepted** and awaits order confirmation.

**FR-O-18 — Entry.** An Accepted estimate **without** an order shows a **"Confirm & place order"** action (and accepting a counter-offer opens the same step directly). An Accepted estimate **with** an order shows a **"placed as Sales Order {SO-id}"** banner and a **View Sales Order** link instead.

**FR-O-19 — Confirmation dialog contents.** The dialog shows an **order summary** (unit count, line count, total, and per-line totals) and collects: **Fulfilment** — **Delivery** or **Pickup**; **Shipping address** — pre-filled from the account and editable, shown for Delivery (Pickup shows a "pickup at the ordering location" note instead); **Payment terms** — a selector defaulting to the account's terms (e.g. Net 30) with allowed alternatives (Net 60, Prepaid / Wire); and an optional **PO number**. It also shows an **account-standing note** (good standing, or an over-budget 24-hour-hold note).

**FR-O-20 — Place order.** **Place sales order** applies the account-standing checks (3.2), then creates the sales order: it is assigned an **SO reference** derived from the estimate, the history records **"Order details confirmed"** (fulfilment · terms) and **"Sales Order created"**, and the estimate keeps status **Accepted** now **linked to the created order**. **Cancel** closes without creating an order.

**FR-O-21 — Line items & pricing carried over.** Line items and agreed prices are taken from the estimate; they are not re-entered.

**AC**
- **Given** an Accepted estimate with no order, **when** "Confirm & place order" is pressed, **then** the confirmation dialog opens pre-filled with the account's shipping address and payment terms.
- **Given** the dialog, **when** the customer chooses Pickup, **then** the shipping-address editor is replaced by a pickup note; **when** Delivery, **then** the address is editable.
- **Given** the dialog, **when** Place sales order is pressed, **then** a sales order is created, the estimate shows the "placed as {SO}" banner with a View Sales Order link, and the history records the confirmation and creation.
- **Given** an over-budget order at confirmation, **then** the 24-hour-hold note is shown before placing.

### Sales estimate & sales order data objects

**Sales estimate** — reference, created/valid-until dates, status, customer, rep, line items (product, SKU, grade, storage, qty, your price, PCS price), status history (events), and — once confirmed — a linked **order** with its confirmation details.
**Sales order (created)** — SO reference, source estimate reference, line items + agreed pricing, fulfilment (delivery/pickup), shipping address, payment terms, optional PO, and any 24-hour-hold flag.

### Sales-estimate status lifecycle

`Draft → Submitted → Under Review → (Counter-Offered ⇄ Under Review) → Accepted → [order confirmation] → Accepted + linked Sales Order`. Terminal branches: **Declined** (customer declined a counter), **Rejected** (PCS declined), **Expired** (validity lapsed). Validity period, counter-round limits, and status-change notifications are **(pending)** — Section 5.

---

## 4. Cross-cutting & non-functional

- **Roles & permissions.** Viewing the catalog, grading guide, and sales estimates is available to all roles. **Building/submitting an estimate**, **responding to a counter-offer**, and **confirming/placing a sales order** require **Admin** or **Buyer**; **Viewer** is read-only.
- **Persistence.** Favorites and saved searches persist between visits *(proposed: per account; prototype: per browser)*. Cart contents are session-scoped in the prototype.
- **Responsiveness.** Mobile uses bottom sheets / full-screen dialogs for cart, product detail, and confirmation; desktop uses side panels and centered dialogs. Feature parity is required across both.
- **Result volume.** With real inventory the grid may be large; **pagination / load-more / result cap** behaviour is **(pending)** — Section 5.
- **Notifications.** In-app/email/SMS notification of sales-estimate status changes is **(pending)** — Section 5.
- **Formatting.** Money and quantity per the Global UI conventions.

---

## 5. Open items affecting these areas

Carried from the requirements doc and the answers to the catalog open-questions review; these gate final behaviour:

| Area | Open item | Interim behaviour in this spec |
|------|-----------|--------------------------------|
| Catalog sort | Confirm the default sort order | **Proposed:** Price, low → high |
| Cart quantity | Minimum order quantity, pack-size steps, cap at available stock | Free-form; steps of 10, no MOQ/cap |
| Catalog quantity display | Exact max display thresholds per customer classification (100+ vs 300+/500+) | Exact quantities shown |
| Saved searches / favorites | Account-wide vs per-browser; any limits | Persisted per browser (proposed: per account) |
| Favorites | Out-of-stock/delisted favorites — keep (flagged) or drop | Kept and flagged |
| Sales estimates | Default validity period, counter-round limit, edit-and-resubmit of Rejected | Not enforced |
| Notifications | Status-change notifications (in-app/email/SMS) | Not built |
| Grading guide | Final approved grade list, definitions/thresholds, real photos/videos | Main grades shown; some "to be confirmed" |
| Offers | Curation, count, ordering, scheduling of Hottest Offers & banners | Back-office; not customer-facing |
| Pricing | Floor/ceiling on how far a proposed price may deviate before auto-flag | Not enforced (all custom offers reviewed) |
| Offers/AI | Auto-approval ranges & AI pricing agent for bidding counters | Out of scope (buy-it-now auto-approved only) |
| Competitor benchmark | Review competitor offer/checkout journey before finalising the offer flow | Pending |

---

## 6. Traceability matrix

| Requirement (US/UC) | Realised by |
|---------------------|-------------|
| US-90 / UC-90 (browse) | FR-C-01 – FR-C-04, FR-C-22 |
| US-90a / UC-90a (ordering location) | FR-C-05 – FR-C-08 |
| US-91 / UC-91 (filter/search/sort) | FR-C-09 – FR-C-14 |
| US-92 / UC-92 (cart) | FR-C-25 – FR-C-30 |
| US-98 / UC-98, US-99 / UC-99 (offers/banner) | FR-C-31 – FR-C-33 |
| US-106 / UC-106 (saved searches) | FR-C-15 – FR-C-18 |
| US-107 / UC-107 (favorites) | FR-C-19 – FR-C-21 |
| US-108 / UC-108 (grading guide) | FR-G-01 – FR-G-15 |
| US-93 / UC-93 (custom pricing) | FR-O-01 – FR-O-04 |
| US-94 / UC-94 (submit) + US-156–158 / UC-156–158 (controls) | FR-O-05 – FR-O-10 |
| US-95 / UC-95, US-96 / UC-96 (view/track) | FR-O-11 – FR-O-13 |
| US-109 / UC-109 (counter-offer) | FR-O-14 – FR-O-17 |
| US-97 / UC-97, US-159 / UC-159 (confirm & create SO) | FR-O-18 – FR-O-21 |

---

*End of document*
