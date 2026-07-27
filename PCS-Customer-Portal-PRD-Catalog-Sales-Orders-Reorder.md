# PCS Wireless Customer Portal — Product Requirements
## Catalog, Sales Estimates & Sales Orders, and Reorder

**Document Version:** 1.0  
**Date:** July 27, 2026  
**Status:** Draft — Pending Business Sign-Off  
**Prepared by:** Development Team  
**Review Required From:** Business Stakeholders  
**Companion:** *Functional Specification — Catalog, Grading Guide & Sales Order Creation* (mid-level interaction detail + acceptance criteria)

**Origin (July 27, 2026):** Split out of the Stage 2 requirements (v1.6) into a dedicated PRD. **Catalog, Sales Estimates & Sales Orders, and Reorder** are the single source of truth here. **Online Payments** remains in the Stage 2 requirements document; **Returns (RMA)** is in its own document.

---

## Purpose

This document defines the requirements for three customer-facing feature areas of the PCS Wireless Customer Portal:

- **Catalog** — browse and search inventory, filter/sort, the grading guide, favorites, and saved searches.
- **Sales Estimates & Sales Orders** — build a cart, propose custom pricing, submit an estimate, negotiate counter-offers, and confirm & place a sales order (including the account-standing controls: past-due block, credit / spending-budget hold).
- **Reorder** — repeat a previous order.

It is intended for business stakeholder review. Please review each section and indicate:
- **Approved** — functionality is correct as described
- **Change Required** — something needs to be different (add comment)
- **Out of Scope** — functionality should be deferred

The mid-level interaction detail and acceptance criteria for these features are in the companion **Functional Specification**.

---

## Table of Contents

1. [Catalog, Sales Estimates & Sales Orders](#1-catalog-sales-estimates--sales-orders)
2. [Reorder](#2-reorder)
3. [Dashboard Additions](#3-dashboard-additions)
4. [User Roles & Permissions](#4-user-roles--permissions)
5. [Out of Scope](#5-out-of-scope)

---

## 1. Catalog, Sales Estimates & Sales Orders

Customers can browse available inventory — across all stock locations or focused on one — build a sales estimate with custom per-unit pricing, and submit it to PCS for review. Customers choose an **ordering location**; a sales estimate is fulfilled from a **single stock location**, so the cart is limited to items from the chosen location. Featured deals are surfaced on the dashboard and catalog. Customers can also save frequently-used filter/search combinations and favorite individual devices for quick return visits. Sales Estimate review and approval are handled by PCS staff through the Sales Portal.

> **Promotional offers — scope:** This PRD covers the **customer-facing display** of Hottest Offers and promotional banners (US-98 / US-99). **Creating, curating, and scheduling** offers, banners, and campaigns is a back-office capability covered by a separate **Sales Portal** PRD.

### User Stories

**US-90** — As a customer, I want to browse the device catalog — across all stock locations, or focused on a single location — so that I can see what inventory is available to purchase and where.

**US-91** — As a customer, I want to filter, search, and sort the catalog so that I can find the products I am interested in quickly. The confirmed filter set is **Product Category (line of business), Manufacturer, Model, Storage, Color, Grade, SIM Type,** and a **Pricing** filter; the keyword search matches on a *contains* basis across product name, model, manufacturer, color, and grade. (Stock **Location** is chosen via the **ordering-location** control — see US-92 and "Stock location & ordering" below.) Filter options that would return no results given my current selection are disabled.

**US-92** — As a customer, I want to add devices to a sales estimate cart with the quantity I need so that I can request pricing for a specific set of items. I choose an **ordering location** (or browse *All locations*), and the cart is limited to that **single stock location**. Changing the ordering location warns me if the cart holds items the new location does not stock and, on confirm, removes only those; adding an item from another location while browsing all prompts me to start a new cart for it.

**US-93** — As a customer, I want to propose a custom per-unit price on sales estimate line items so that I can negotiate pricing with PCS. Proposing prices is a deliberate action taken on a separate pricing step, after the cart is built at list prices. On that step each line stays at list price until I explicitly request custom pricing, select a reason, and acknowledge that any proposed price is a request subject to PCS review.

> **Offer approval (confirmed):** For the initial build, **buy-it-now (list / price-sheet) pricing is auto-approved** — a customer can order it directly. **Custom offers and counter-offers are always reviewed by PCS**; there is no automatic approval of a proposed price at launch. Automatic approval ranges and an AI pricing agent for bidding counters are being explored separately and are **out of scope** for this stage (see Section 5).

**US-94** — As a customer, I want to submit my sales estimate to PCS for review so that a sales rep can respond with confirmed pricing.

**US-95** — As a customer, I want to view all my submitted sales estimates with their status so that I can track where each one stands.

**US-96** — As a customer, I want to view the full history and status changes of a sales estimate so that I can follow the negotiation.

**US-97** — As a customer, when PCS accepts my sales estimate, I want to move straight to a short **order-confirmation step** — with the agreed line items and pricing already carried over — so that placing the sales order takes one quick confirmation rather than rebuilding the order. (See US-159 for the confirmation step.)

**US-98** — As a customer, I want to see a "Hottest Offers" section on my dashboard so that I am aware of current deals and featured inventory.

**US-99** — As a customer, I want to see promotional banners on the dashboard and catalog so that featured deals are clearly highlighted.

**US-106** — As a customer, I want to save my current catalog filters and search as a named saved search so that I can re-apply a frequent query in one click.

**US-107** — As a customer, I want to mark individual devices as favorites and filter the catalog to just my favorites so that I can quickly return to products I am interested in.

**US-108** — As a customer, I want to open a guide that explains what each device grade means — with plain-language descriptions and example images and video — so that I understand exactly what condition I am buying before I add a device to a sales estimate. The guide presents the **main sellable grades**, each with a description and example photos/video; the final approved grade list and supporting media are being confirmed by the commercial team (see "Open commercial decisions" below).

**US-109** — As a customer, when PCS returns a counter-offer on my sales estimate, I want to accept it, decline it, or counter it with my own revised pricing so that I can negotiate to an agreed price. Accepting a counter-offer reaches agreement and takes me to the same **order-confirmation step** (US-159) to place the sales order.

**US-159** — As a customer, once pricing is agreed (PCS accepted my estimate, or I accepted a counter-offer), I want an **order-confirmation step** where I confirm the **shipping address**, choose **delivery or pickup**, and confirm the **payment terms** — all pre-filled from my account — and then place the order, so that the sales order is created with the right fulfilment and billing details. The past-due / credit / spending-budget checks (US-156–158) are applied at this point.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-90 | Browse catalog | Customer | Available devices displayed with product, grade, storage, per-location availability, and indicative price; the All-locations view shows every location's inventory |
| UC-90a | Choose ordering location | Customer | Customer browses *All locations* or picks a specific one; the catalog filters to it, cards show its quantity, and the cart is bound to it |
| UC-91 | Filter / sort catalog | Customer | Catalog filtered and sorted by the selected criteria |
| UC-92 | Add to sales estimate cart | Customer | Selected device and quantity added; the cart is limited to the chosen ordering location — adding an item from another location prompts start-new-cart, and switching the ordering location drops only the cart items the new location does not stock |
| UC-93 | Set custom price | Customer | On the dedicated pricing step, each line stays at list price until the customer requests custom pricing, selects a reason, and acknowledges PCS review; the per-unit offer field then unlocks for that line |
| UC-94 | Submit sales estimate | Customer | Sales Estimate submitted to PCS; status set to Submitted and a reference number issued |
| UC-95 | View sales estimate list | Customer | All sales estimates shown with reference, date, item count, total, and status |
| UC-96 | View sales estimate detail & history | Customer | Full sales estimate shown with line items, pricing, and a chronological status history |
| UC-97 | Accepted estimate → order confirmation | Customer / System | When pricing is agreed, the customer is taken to the order-confirmation step (UC-159) with line items and agreed pricing carried over |
| UC-159 | Confirm & place sales order | Customer / System | Customer confirms shipping address, delivery vs. pickup, and payment terms (pre-filled from the account); on placing the order the sales order is created, subject to the account-standing checks (UC-156–158) |
| UC-98 | View hottest offers | Customer | Dashboard displays a curated set of current deals and featured inventory |
| UC-99 | View promotional banner | Customer | Full-width promotional banners are displayed on the dashboard and catalog |
| UC-106 | Save & apply a search | Customer | Customer names and saves the current filter/search combination; saved searches appear as one-click shortcuts and can be applied, renamed, or deleted |
| UC-107 | Favorite a device | Customer | Customer marks/unmarks a device as a favorite; a Favorites filter shows only favorited devices; the customer's favorites persist across visits |
| UC-108 | View grading guide | Customer | Customer opens a guide explaining each catalog grade, with descriptions, example media, a side-by-side comparison, and an FAQ; reachable from the grade shown on a product and from the catalog |
| UC-109 | Respond to a counter-offer | Customer | On a counter-offered sales estimate the customer accepts it (agreement reached → order-confirmation step), declines it, or counters with revised pricing (returns to PCS for review) |

### Stock location & ordering

- The customer selects an **ordering location**. **All locations** is the default and shows the full catalog for browsing; selecting a specific location filters the catalog (grid, hottest offers, and filter options) to what that location stocks.
- **Per-location availability** is shown on each product card: when browsing all locations a card shows how many locations stock the device and the total quantity; once an ordering location is set, the card shows that location's available quantity (or a "not stocked here" note for devices it does not carry).
- The **cart is limited to one location**. The first item added commits the ordering location; only items stocked there can be added afterwards, and adding an item from another location prompts the customer to start a new cart for it.
- **Changing the ordering location** with items in the cart warns the customer if any are not stocked at the new location and lists them; on confirm, only those items are removed and the location switches. Emptying the cart releases the location lock.

### Ordering controls — account standing, credit & spending budget

Sales-order creation is governed by the customer's financial standing. These rules were confirmed on the commercial side and mirror NetSuite's account data (AR balance, past-due aging, credit limit). A customer can always **browse the catalog and build a cart**; the controls apply at **checkout**, when the sales estimate / order is submitted.

**US-156** — As a past-due customer, I want to still build a cart, but I understand that I **cannot create a sales order** until my balance is brought current. At checkout I am shown a message asking me to contact the Finance department to post a payment, or to request an **override** if funds are on the way. PCS can **approve a customer's cart for order creation from the back office**, which releases the block.

**US-157** — As a customer whose order would take me **over my available credit / spending budget**, I want the order to still be created, with the **stock held for 24 hours**; if payment or approval is not received within that window, the order is **released**.

**US-158** — As a customer, I want a **spending budget** that caps how much open order value I can hold at any one time. The default baseline is **$500,000**; a customer whose monthly sales reach $500K or more is allowed up to **double their peak monthly sales**.

| Standing | Cart | Checkout / SO creation |
|----------|------|------------------------|
| Good standing | Allowed | Sales order created normally |
| **Past due** | Allowed | **Blocked** — prompt to contact Finance; back-office cart approval / override can release it |
| **Over credit / spending budget** | Allowed | **Allowed with a 24-hour stock hold** — released if payment/approval is not received |

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-156 | Past-due checkout block | Customer / System | A past-due account can build a cart but cannot submit; the customer is directed to Finance, and PCS can approve the cart from the back office |
| UC-157 | Over-limit 24h hold | Customer / System | An order over available credit / budget is created with stock held for 24h and released if unpaid/unapproved |
| UC-158 | Spending-budget cap | System | Open order exposure is capped at the spending budget (baseline $500K, or 2× peak monthly sales for large accounts) |

> **Order-creation note (US-97 / US-109 / US-159):** These checks run at the **order-confirmation step**, when the customer places the order — a past-due account is blocked (Finance notified) and an over-budget order is placed with the 24-hour stock hold.

### Sales order creation

Once pricing is agreed — PCS accepts the estimate, or the customer accepts a counter-offer — the customer completes a short **order-confirmation step** and the sales order is created. This answers the previously-open question of how fulfilment and billing details are set (CQ-08):

- **Line items & pricing** are carried over from the agreed sales estimate; they are not re-entered.
- **Shipping address** is pre-filled from the account's default and can be edited for this order.
- **Fulfilment** is chosen as **delivery** or **pickup** (pickup uses the ordering location).
- **Payment terms** default to the account's terms (e.g. Net 30) and can be changed to another allowed term.
- On **Place order**, the account-standing checks (US-156–158) are applied, then the sales order is created and linked from the sales estimate. The estimate keeps its **Accepted** status with a link to the resulting order.

### Open commercial decisions (pending)

The following catalog decisions are **not yet finalised** on the commercial side and are tracked here so the build can be completed once they land:

- **Approved grade list & media** — the final set of customer-facing grades, their descriptions, and supporting photos/videos (Morris / Sal to confirm).
- **Customer pricing tiers** — definition and setup of pricing tiers per region, created on the commercial side before pricing can be loaded.
- **Inventory-visibility rules** — whether availability/grouping is defined per customer group or per customer (dedicated commercial session).
- **Quantity-display thresholds** — the exact max display thresholds and how they map to customer classifications (e.g. 100+ standard vs. 300+/500+ for large wholesalers). Until confirmed, the catalog shows exact available quantities.
- **Competitor benchmark** — review of a competitor's offer and checkout journey before the offer flow is finalised.

### Sales Estimate Status Definitions

| Status | Meaning |
|--------|---------|
| Draft | Sales Estimate being built; not yet submitted |
| Submitted | Sent to PCS; awaiting review |
| Under Review | PCS is reviewing the requested pricing |
| Counter-Offered | PCS has responded with revised pricing; the customer can accept, decline, or counter it |
| Accepted | Pricing agreed (by PCS, or by the customer accepting a counter-offer); the customer completes the order-confirmation step to create the sales order, which is then linked from the estimate |
| Declined | Customer declined PCS's counter-offer |
| Rejected | PCS declined the sales estimate |
| Expired | Sales Estimate validity period has lapsed |

---

## 2. Reorder

### User Stories

**US-105** — As a customer, I want to repeat a previous order pre-populated with the same items so that I can quickly reorder products I buy regularly.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-105 | Reorder previous order | Customer | Customer selects a past order and a new draft order (or sales estimate) is created pre-populated with the same line items for confirmation |

---

## 3. Dashboard Additions

Stage 2 adds the following to the Dashboard, consistent with how Stage 1 built the dashboard progressively.

| Addition | Description |
|----------|-------------|
| Open Sales Estimates KPI card | Count of submitted sales estimates awaiting resolution |
| Hottest Offers section | Curated current deals and featured inventory |
| Promotional banner | Full-width banner surfacing featured deals |
| Reorder quick action | Shortcut to reorder from a recent order |

---

## 4. User Roles & Permissions

Role definitions are unchanged (Admin, Buyer, Viewer). Viewing is available to all roles; actions that build, submit, or place an order require Admin or Buyer.

| Feature | Admin | Buyer | Viewer |
|---------|-------|-------|--------|
| View catalog & grading guide | ✓ | ✓ | ✓ |
| Build & submit sales estimate | ✓ | ✓ | — |
| View sales estimates | ✓ | ✓ | ✓ |
| Confirm & place sales order | ✓ | ✓ | — |
| Reorder previous order | ✓ | ✓ | — |

---

## 5. Out of Scope

The following are not part of this PRD:

- **Online Payments** — paying invoices by card / ACH is maintained in a separate requirements document.
- **Returns (RMA)** — maintained in a separate Returns / RMA document.
- **Promotional offer / banner / campaign setup** — creating, curating, and scheduling Hottest Offers, banners, and campaigns is a back-office capability covered by a separate **Sales Portal** PRD; this PRD covers only their customer-facing display (US-98 / US-99).
- **Automatic offer approval & AI pricing agent** — auto-approval ranges for custom offers and an AI-driven agent for bidding counters (only buy-it-now / list pricing is auto-approved at launch; see US-93).
- **Later-stage platform items** — Integrations, Shipment Enhancements, New Customer Application, Meeting Scheduler, live chat, analytics dashboard, multi-currency billing, native mobile app, and passkey login (Stage 3 / backlog).

---

## Sign-Off

| Reviewer | Role | Decision | Date | Comments |
|----------|------|----------|------|----------|
| | | | | |
| | | | | |
| | | | | |

**Decision options:** Approved / Approved with Changes / Not Approved

---

*End of Document*
