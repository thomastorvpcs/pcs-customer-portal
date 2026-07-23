# PCS Wireless Customer Portal — Business Requirements

**Document Version:** 1.5  
**Date:** July 23, 2026  
**Stage:** Stage 2 — Customer Self-Service & Revenue  
**Status:** Draft — Pending Business Sign-Off  
**Prepared by:** Development Team  
**Review Required From:** Business Stakeholders

**Revision 1.5 (July 23, 2026):** Recorded the commercial decisions from the catalog open-questions review. Finalised the **catalog filter list** (US-91). Added **ordering controls** tied to account standing: a past-due account can build a cart but cannot create a sales order (US-156); an order over the customer's available credit / spending budget is accepted but its stock is held for 24 hours, then released (US-157); and a default **spending budget** caps open exposure — baseline $500K, or up to 2× peak monthly sales for large accounts (US-158). Confirmed that **buy-it-now (list) pricing is auto-approved** while custom offers remain PCS-reviewed. Listed the catalog decisions still open on the commercial side (approved grade list & media, customer pricing tiers, inventory-visibility rules, exact quantity-display thresholds, competitor benchmark).

**Revision 1.4 (July 13, 2026):** Expanded **Returns (RMA)** to the full submission flow now prototyped — sales-order / invoice / bulk-upload entry, device selection with IMEI search, the return-eligibility rule book with per-IMEI validation, evidence with required-image gating, submission to NetSuite, and the post-submission steps (customer-provided tracking and return label, return-policy acceptance, additional images on request). Added a customer **ordering location** to the **Catalog**: browse inventory across all locations or order from one, with the chosen location filtering the catalog and governing the single-location cart.

---

## Purpose

This document describes all functionality included in **Stage 2** of the PCS Wireless Customer Portal. Stage 2 builds on the Stage 1 foundation (Authentication, Dashboard, Orders, Shipments, Financial, Support, Settings) with self-service and revenue-generating features: **Returns (RMA)**, **Catalog & Sales Estimates**, **Online Payments**, and **Reorder**.

It is intended for business stakeholder review to confirm the Stage 2 feature set is complete and accurate before development begins. Stage 2 features were previously listed under "Out of Scope" in the Stage 1 requirements; they are now formalised here as user stories and use cases.

Please review each section and indicate:
- **Approved** — functionality is correct as described
- **Change Required** — something needs to be different (add comment)
- **Out of Scope** — functionality should be deferred to a later stage

---

## Delivery Stages

| Stage | Scope | Status |
|-------|-------|--------|
| Stage 1 | Authentication (Auth0), Dashboard, Orders, Shipments, Financial, Support, Settings & Profile | Delivered / In progress |
| **Stage 2** | Returns (RMA), Catalog & Sales Estimates, Online Payments, Reorder | **This document** |
| Stage 3 | Integrations, Shipment Enhancements, New Customer Application, Meeting Scheduler, and advanced backlog | Upcoming |

> **Cross-portal note:** Customer-side Returns pair with the Sales Portal "RMA Management Queue", and customer-side Sales Estimates pair with the Sales Portal "Sales Estimate Creation & Approvals". Those back-office capabilities are tracked separately in the Sales Portal requirements and are **not** in scope for this document.

---

## Table of Contents

1. [Returns (RMA)](#1-returns-rma)
2. [Catalog, Sales Estimates & Promotional Offers](#2-catalog-sales-estimates--promotional-offers)
3. [Online Payments](#3-online-payments)
4. [Reorder](#4-reorder)
5. [Dashboard Additions](#5-dashboard-additions)
6. [User Roles & Permissions](#6-user-roles--permissions)
7. [Out of Scope for Stage 2](#7-out-of-scope-for-stage-2)

---

## 1. Returns (RMA)

Customers can request returns for devices they have purchased, validate each device against PCS's return rules before submitting, attach the required evidence, and track the return through its lifecycle. The portal owns the **RMA submission** experience; PCS staff review, approve, and process returns in **NetSuite**, and status updates flow back to the portal. This module pairs with the Sales Portal RMA Management Queue.

### User Stories

**US-80** — As a customer, I want to start a return from a **sales order, an invoice, or a bulk device upload** so that I can raise an RMA whichever way fits how I track my stock. A bulk upload uses a template with Device ID (required), Return Reason (required), and Customer Notes (optional), and does not require a specific order or invoice.

**US-81** — As a customer, I want to see the devices on the selected order/invoice and **choose which ones to return** on a selection step, searching by IMEI to find them quickly, so that I include only the units I mean to.

**US-82** — As a customer, I want to confirm each device's **IMEI**, choose a **return reason**, and add optional **per-device notes** so that PCS understands exactly what is being returned and why.

**US-83** — As a customer, I want to run **"Validate RMA Data"** and see a per-IMEI verdict — accepted, or the specific reason it is not (out of return period, reason not accepted, iCloud lock, grade/product not eligible) — plus which devices require an image, so that I know what will and won't be accepted before I submit.

**US-84** — As a customer, I want to attach **photos or video per device**, and I want the form to prevent submission when a reason requires an image and none is attached, so that my request carries the substantiation PCS needs.

**US-85** — As a customer, I want to be able to **submit even when some devices fail validation** — they are submitted as *Pending* for manual review rather than blocked — so that edge cases are not silently dropped; the portal never auto-approves a device.

**US-86** — As a customer, I want a **reference number** on submission and to track the RMA through its lifecycle so that I always know where it stands.

**US-87** — As a customer, I want to add and update **tracking number(s) and carrier** on an RMA at any time — including more than one tracking number — so that PCS can follow the shipment(s) back. I supply my own return label.

**US-88** — As a customer, I want to see the **return instructions**, **accept the return policy**, and upload **additional images** if the RMA team requests them, so that I can complete the return and answer follow-ups.

**US-89** — As a customer, I want to **view a list of all my RMAs with status filtering** and open any RMA to see its devices, reasons, validation outcomes, tracking, evidence, resolution, and the credit memo from a completed RMA, so that I can manage returns in one place. (Email/SMS status notifications are a later enhancement.)

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-80 | Start an RMA | Customer | Customer starts from a sales order, an invoice, or a bulk upload (Device ID + Return Reason + optional Notes); an RMA draft is begun |
| UC-81 | Select devices | Customer | The source's devices are listed and searchable by IMEI; the customer selects which to return |
| UC-82 | Enter reason & notes | Customer | Each selected device is given a return reason and optional notes |
| UC-83 | Validate RMA data | Customer / System | Each device is checked against the rule book; a per-IMEI verdict (Accepted or the not-accepted reason) and any image requirement are shown |
| UC-84 | Attach evidence | Customer | Photos/video are attached per device; submission is blocked while a required image is missing |
| UC-85 | Submit RMA | Customer / System | The RMA is sent to NetSuite (createRMA) and created with a reference number; devices that failed validation are submitted as Pending for manual review |
| UC-86 | Track RMA status | Customer | Current RMA status is shown on a progress timeline |
| UC-87 | Manage tracking | Customer | The customer adds/edits one or more carrier + tracking-number entries on the RMA at any time |
| UC-88 | Complete return steps | Customer | The customer views return instructions, accepts the return policy, and can upload additional images on request (updateRMA) |
| UC-89 | View RMA list & detail | Customer | All RMAs shown with reference, order, date, device count, and status (filterable); detail shows devices, reasons, validation outcomes, tracking, evidence, resolution, and the credit memo |

### Return eligibility rule book

Validation applies these rules per device. A device that fails may still be submitted, but it is not auto-approved (it is submitted as *Pending* for manual review):

- **Return period** — accepted only if sold within **60 days** of the invoice date.
- **Cracked LCD** — accepted only if the RMA is raised within **7 days** of delivery.
- **iCloud lock** — **automatically rejected**.
- **MDM / carrier unlock** — allowed, but the IMEI is verified at approval.
- **Battery** — battery-related returns are **not accepted**.
- **Cosmetic** — minor scratches / cosmetic-only damage are **not accepted**; deep scratches are accepted.
- **Excluded stock** — **AS IS (WIP)** and **UR JP (SoftBank)** grades, and **brand products (iPads / accessories)**, are not eligible.
- **Evidence** — reasons that require a photo/video cannot be submitted without one attached.

### Submission & integration

On submit the portal sends a **createRMA** request to NetSuite (customer internal ID, subsidiary, location, and line items grouped by item, each carrying its device IDs and image links); NetSuite creates the RMA record and returns its reference. Additional images requested later trigger an **updateRMA**. Evidence is held in object storage (Azure) with links passed to NetSuite, and is deleted **30 days after** the RMA reaches Completed / Done / Closed. Approval and processing remain in NetSuite; the portal reflects the resulting status.

### Complaint Categories

Dead Pixel, Cracked LCD, Battery Drain, WiFi Not Working, Bluetooth, Charging Port, Speaker/Mic, Face ID, Touch ID, Camera, Water Damage, Cosmetic Damage, Minor Scratch, Deep Scratch, Wrong Item, Missing Accessories, Software Issue, Carrier Lock, IMEI Mismatch, Other.

### RMA Status Flow

| Status | Meaning |
|--------|---------|
| Submitted | Request received; awaiting PCS review |
| Under Review | PCS is assessing the request |
| Approved | Return authorised |
| Shipped | Customer has shipped the devices back (tracking added on the RMA) |
| Received | Devices received at PCS |
| Diagnostic | Devices under inspection |
| Complete | Return resolved; credit memo or replacement issued |

### Access

Submitting an RMA is available to **Admin and Buyer** roles; viewing RMAs and their documents is available to all roles (Viewer is read-only).

---

## 2. Catalog, Sales Estimates & Promotional Offers

Customers can browse available inventory — across all stock locations or focused on one — build a sales estimate with custom per-unit pricing, and submit it to PCS for review. Customers choose an **ordering location**; a sales estimate is fulfilled from a **single stock location**, so the cart is limited to items from the chosen location. Featured deals are surfaced on the dashboard and catalog. Customers can also save frequently-used filter/search combinations and favorite individual devices for quick return visits. Sales Estimate review and approval are handled by PCS staff through the Sales Portal.

### User Stories

**US-90** — As a customer, I want to browse the device catalog — across all stock locations, or focused on a single location — so that I can see what inventory is available to purchase and where.

**US-91** — As a customer, I want to filter, search, and sort the catalog so that I can find the products I am interested in quickly. The confirmed filter set is **Product Category (line of business), Manufacturer, Model, Storage, Color, Grade, SIM Type,** and a **Pricing** filter; the keyword search matches on a *contains* basis across product name, model, manufacturer, color, and grade. (Stock **Location** is chosen via the **ordering-location** control — see US-92 and "Stock location & ordering" below.) Filter options that would return no results given my current selection are disabled.

**US-92** — As a customer, I want to add devices to a sales estimate cart with the quantity I need so that I can request pricing for a specific set of items. I choose an **ordering location** (or browse *All locations*), and the cart is limited to that **single stock location**. Changing the ordering location warns me if the cart holds items the new location does not stock and, on confirm, removes only those; adding an item from another location while browsing all prompts me to start a new cart for it.

**US-93** — As a customer, I want to propose a custom per-unit price on sales estimate line items so that I can negotiate pricing with PCS. Proposing prices is a deliberate action taken on a separate pricing step, after the cart is built at list prices. On that step each line stays at list price until I explicitly request custom pricing, select a reason, and acknowledge that any proposed price is a request subject to PCS review.

> **Offer approval (confirmed):** For the initial build, **buy-it-now (list / price-sheet) pricing is auto-approved** — a customer can order it directly. **Custom offers and counter-offers are always reviewed by PCS**; there is no automatic approval of a proposed price at launch. Automatic approval ranges and an AI pricing agent for bidding counters are being explored separately and are **out of scope** for this stage (see Section 7).

**US-94** — As a customer, I want to submit my sales estimate to PCS for review so that a sales rep can respond with confirmed pricing.

**US-95** — As a customer, I want to view all my submitted sales estimates with their status so that I can track where each one stands.

**US-96** — As a customer, I want to view the full history and status changes of a sales estimate so that I can follow the negotiation.

**US-97** — As a customer, when PCS accepts my sales estimate, I want it to be automatically converted into a sales order so that I can complete my purchase without any extra steps — I do not need to separately accept or convert it.

**US-98** — As a customer, I want to see a "Hottest Offers" section on my dashboard so that I am aware of current deals and featured inventory.

**US-99** — As a customer, I want to see promotional banners on the dashboard and catalog so that featured deals are clearly highlighted.

**US-106** — As a customer, I want to save my current catalog filters and search as a named saved search so that I can re-apply a frequent query in one click.

**US-107** — As a customer, I want to mark individual devices as favorites and filter the catalog to just my favorites so that I can quickly return to products I am interested in.

**US-108** — As a customer, I want to open a guide that explains what each device grade means — with plain-language descriptions and example images and video — so that I understand exactly what condition I am buying before I add a device to a sales estimate. The guide presents the **main sellable grades**, each with a description and example photos/video; the final approved grade list and supporting media are being confirmed by the commercial team (see "Open commercial decisions" below).

**US-109** — As a customer, when PCS returns a counter-offer on my sales estimate, I want to accept it, decline it, or counter it with my own revised pricing so that I can negotiate to an agreed price. Accepting a counter-offer reaches agreement, so the sales estimate is automatically converted into a sales order without any further step.

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
| UC-97 | Auto-convert accepted sales estimate | System | When PCS accepts a sales estimate, a sales order is created automatically, pre-populated with its line items and agreed pricing — no separate customer action is required |
| UC-98 | View hottest offers | Customer | Dashboard displays a curated set of current deals and featured inventory |
| UC-99 | View promotional banner | Customer | Full-width promotional banners are displayed on the dashboard and catalog |
| UC-106 | Save & apply a search | Customer | Customer names and saves the current filter/search combination; saved searches appear as one-click shortcuts and can be applied, renamed, or deleted |
| UC-107 | Favorite a device | Customer | Customer marks/unmarks a device as a favorite; a Favorites filter shows only favorited devices; the customer's favorites persist across visits |
| UC-108 | View grading guide | Customer | Customer opens a guide explaining each catalog grade, with descriptions, example media, a side-by-side comparison, and an FAQ; reachable from the grade shown on a product and from the catalog |
| UC-109 | Respond to a counter-offer | Customer | On a counter-offered sales estimate the customer accepts it (agreement reached → auto-converts to a sales order), declines it, or counters with revised pricing (returns to PCS for review) |

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

> **Auto-conversion note (US-97 / US-109):** When an accepted sales estimate auto-converts to a sales order, the same standing checks apply — a past-due account holds the conversion (Finance notified) rather than creating the order.

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
| Accepted | Pricing agreed (by PCS, or by the customer accepting a counter-offer); the sales estimate is automatically converted into a sales order |
| Declined | Customer declined PCS's counter-offer |
| Rejected | PCS declined the sales estimate |
| Expired | Sales Estimate validity period has lapsed |

---

## 3. Online Payments

Customers can pay outstanding invoices directly in the portal. This extends the Stage 1 Financial module, which was view-and-download only.

> **Note:** Online payment processing requires an integrated payment provider (card and/or ACH). The provider selection and merchant onboarding are prerequisites for this feature and will be confirmed before development.

### User Stories

**US-100** — As a customer, I want to initiate a payment against an outstanding invoice from the portal so that I can settle my balance without contacting PCS.

**US-101** — As a customer, I want to pay by credit card or bank transfer (ACH) so that I can use my preferred payment method.

**US-102** — As a customer, I want to pay multiple invoices in a single transaction so that I can settle my account efficiently.

**US-103** — As a customer, I want to receive a payment confirmation and receipt so that I have a record of the transaction.

**US-104** — As a customer, I want my payment to be reflected immediately against the relevant invoice balances so that my financial summary stays accurate.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-100 | Initiate invoice payment | Customer | Customer selects an outstanding invoice and starts a payment |
| UC-101 | Select payment method | Customer | Customer chooses credit card or ACH and enters payment details securely |
| UC-102 | Pay multiple invoices | Customer | Customer selects several invoices and pays them in one transaction |
| UC-103 | Receive confirmation & receipt | Customer | On success, a confirmation is shown and a receipt is available to download |
| UC-104 | Update balances | Customer | Paid invoices update to reflect the payment; outstanding and past-due totals recalculate |

### Payment Methods

| Method | Description |
|--------|-------------|
| Credit Card | Card payment processed through the integrated payment provider |
| ACH / Bank Transfer | Direct bank transfer processed through the integrated payment provider |

---

## 4. Reorder

### User Stories

**US-105** — As a customer, I want to repeat a previous order pre-populated with the same items so that I can quickly reorder products I buy regularly.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-105 | Reorder previous order | Customer | Customer selects a past order and a new draft order (or sales estimate) is created pre-populated with the same line items for confirmation |

---

## 5. Dashboard Additions

Stage 2 adds the following to the Dashboard, consistent with how Stage 1 built the dashboard progressively.

| Addition | Description |
|----------|-------------|
| Open RMAs KPI card | Count of RMA requests not yet in Complete status |
| Open Sales Estimates KPI card | Count of submitted sales estimates awaiting resolution |
| Hottest Offers section | Curated current deals and featured inventory |
| Promotional banner | Full-width banner surfacing featured deals |
| Reorder quick action | Shortcut to reorder from a recent order |

---

## 6. User Roles & Permissions

Stage 2 features are added to the Stage 1 access matrix. Role definitions are unchanged (Admin, Buyer, Viewer).

| Feature | Admin | Buyer | Viewer |
|---------|-------|-------|--------|
| View catalog | ✓ | ✓ | ✓ |
| Submit RMA request | ✓ | ✓ | — |
| View RMA list & detail | ✓ | ✓ | ✓ |
| Download credit memo / return label | ✓ | ✓ | ✓ |
| Build & submit sales estimate | ✓ | ✓ | — |
| View sales estimates | ✓ | ✓ | ✓ |
| Convert sales estimate to order | ✓ | ✓ | — |
| Initiate invoice payment | ✓ | ✓ | — |
| Reorder previous order | ✓ | ✓ | — |

---

## 7. Out of Scope for Stage 2

The following remain deferred and are addressed in the Stage 3 requirements or the residual backlog:

- Integrations (API keys, webhooks, ERP/WMS sync, custom integrations)
- Shipment Enhancements (carrier tracking link, customer pickup authorization, delivery SMS)
- New Customer Application wizard (self-service prospect onboarding)
- Meeting Scheduler
- **Automatic offer approval & AI pricing agent** — auto-approval ranges for custom offers and an AI-driven agent for bidding counters (only buy-it-now / list pricing is auto-approved at launch; see US-93)
- Live chat, custom reporting / analytics dashboard, multi-currency billing, native mobile app, passwordless / passkey login

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
