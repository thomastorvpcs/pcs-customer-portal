# PCS Wireless Customer Portal — Business Requirements

**Document Version:** 1.0  
**Date:** July 2, 2026  
**Stage:** Stage 2 — Customer Self-Service & Revenue  
**Status:** Draft — Pending Business Sign-Off  
**Prepared by:** Development Team  
**Review Required From:** Business Stakeholders

---

## Purpose

This document describes all functionality included in **Stage 2** of the PCS Wireless Customer Portal. Stage 2 builds on the Stage 1 foundation (Authentication, Dashboard, Orders, Shipments, Financial, Support, Settings) with self-service and revenue-generating features: **Returns (RMA)**, **Catalog & Quotes**, **Online Payments**, and **Reorder**.

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
| **Stage 2** | Returns (RMA), Catalog & Quotes, Online Payments, Reorder | **This document** |
| Stage 3 | Integrations, Shipment Enhancements, New Customer Application, Meeting Scheduler, and advanced backlog | Upcoming |

> **Cross-portal note:** Customer-side Returns pair with the Sales Portal "RMA Management Queue", and customer-side Quotes pair with the Sales Portal "Quote Creation & Approvals". Those back-office capabilities are tracked separately in the Sales Portal requirements and are **not** in scope for this document.

---

## Table of Contents

1. [Returns (RMA)](#1-returns-rma)
2. [Catalog, Quotes & Promotional Offers](#2-catalog-quotes--promotional-offers)
3. [Online Payments](#3-online-payments)
4. [Reorder](#4-reorder)
5. [Dashboard Additions](#5-dashboard-additions)
6. [User Roles & Permissions](#6-user-roles--permissions)
7. [Out of Scope for Stage 2](#7-out-of-scope-for-stage-2)

---

## 1. Returns (RMA)

Customers can request returns against delivered orders, track the return through its lifecycle, and access the resulting documentation. This module surfaces on the customer side of the return process; PCS staff review and action requests through the Sales Portal RMA Management Queue.

### User Stories

**US-80** — As a customer, I want to submit an RMA request against a specific order so that I can return devices that have problems.

**US-81** — As a customer, I want to enter the affected device IMEIs on an RMA request so that PCS can identify exactly which units are being returned.

**US-82** — As a customer, I want to select a complaint reason for each returned device so that PCS understands the nature of the fault.

**US-83** — As a customer, I want to optionally upload supporting evidence (photos or documents) with an RMA request so that I can substantiate the fault.

**US-84** — As a customer, I want to track the status of my RMA request through each stage so that I know where it is in the returns process.

**US-85** — As a customer, I want to view the full details of an RMA — including IMEIs, models, complaint reasons, and resolution — so that I have a complete record of the return.

**US-86** — As a customer, I want to see a list of all my open and historical RMA requests with status filtering so that I can manage my returns in one place.

**US-87** — As a customer, I want to download the credit memo generated from an approved RMA so that I have a record of the credit I received.

**US-88** — As a customer, I want to download or request a pre-paid return shipping label so that I can ship the returned devices back to PCS.

**US-89** — As a customer, I want to receive email and SMS notifications when my RMA status changes so that I am kept informed without logging in.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-80 | Submit RMA request | Customer | Customer selects a delivered order, enters IMEIs, selects complaint reason(s), optionally uploads evidence, and submits; RMA created with status Submitted and a reference number |
| UC-81 | Enter device IMEIs | Customer | One or more device IMEIs are recorded against the RMA and validated against the selected order |
| UC-82 | Select complaint reason | Customer | A complaint category is assigned to each returned device |
| UC-83 | Upload evidence | Customer | Photos or documents are attached to the RMA request |
| UC-84 | Track RMA status | Customer | Current RMA status is displayed with a progress timeline |
| UC-85 | View RMA detail | Customer | Full RMA record shown: IMEIs, models, complaint reasons, status timeline, and resolution |
| UC-86 | View RMA list | Customer | All RMAs shown with reference, order, date, device count, and status; list can be filtered by status |
| UC-87 | Download credit memo | Customer | Credit memo generated from the approved RMA is downloaded to the user's device |
| UC-88 | Obtain return label | Customer | A pre-paid return shipping label is downloaded, or requested if not yet available |
| UC-89 | Receive RMA notification | Customer | On each RMA status change, an email and/or SMS alert is sent per the customer's notification preferences |

### Complaint Categories

Dead Pixel, Cracked LCD, Battery Drain, WiFi Not Working, Bluetooth, Charging Port, Speaker/Mic, Face ID, Touch ID, Camera, Water Damage, Cosmetic Damage, Wrong Item, Missing Accessories, Software Issue, Carrier Lock, IMEI Mismatch, Other.

### RMA Status Flow

| Status | Meaning |
|--------|---------|
| Submitted | Request received; awaiting PCS review |
| Under Review | PCS is assessing the request |
| Approved | Return authorised; return label available |
| Shipped | Customer has shipped the devices back |
| Received | Devices received at PCS |
| Diagnostic | Devices under inspection |
| Complete | Return resolved; credit memo or replacement issued |

---

## 2. Catalog, Quotes & Promotional Offers

Customers can browse available inventory, build a quote with custom per-unit pricing, and submit it to PCS for review. Featured deals are surfaced on the dashboard and catalog. Customers can also save frequently-used filter/search combinations and favorite individual devices for quick return visits. Quote review and approval are handled by PCS staff through the Sales Portal.

### User Stories

**US-90** — As a customer, I want to browse the device catalog so that I can see what inventory is available to purchase.

**US-91** — As a customer, I want to filter and sort the catalog (by device type, grade, storage, price) so that I can find the products I am interested in quickly.

**US-92** — As a customer, I want to add devices to a quote cart with the quantity I need so that I can request pricing for a specific set of items.

**US-93** — As a customer, I want to propose a custom per-unit price on quote line items so that I can negotiate pricing with PCS.

**US-94** — As a customer, I want to submit my quote to PCS for review so that a sales rep can respond with confirmed pricing.

**US-95** — As a customer, I want to view all my submitted quotes with their status so that I can track where each one stands.

**US-96** — As a customer, I want to view the full history and status changes of a quote so that I can follow the negotiation.

**US-97** — As a customer, I want to convert an accepted quote into an order so that I can complete my purchase without re-entering details.

**US-98** — As a customer, I want to see a "Hottest Offers" section on my dashboard so that I am aware of current deals and featured inventory.

**US-99** — As a customer, I want to see promotional banners on the dashboard and catalog so that featured deals are clearly highlighted.

**US-106** — As a customer, I want to save my current catalog filters and search as a named saved search so that I can re-apply a frequent query in one click.

**US-107** — As a customer, I want to mark individual devices as favorites and filter the catalog to just my favorites so that I can quickly return to products I am interested in.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-90 | Browse catalog | Customer | Available devices displayed with product, grade, storage, and indicative price |
| UC-91 | Filter / sort catalog | Customer | Catalog filtered and sorted by the selected criteria |
| UC-92 | Add to quote cart | Customer | Selected device and quantity added to the quote cart |
| UC-93 | Set custom price | Customer | Customer enters a proposed per-unit price on a quote line item |
| UC-94 | Submit quote | Customer | Quote submitted to PCS; status set to Submitted and a reference number issued |
| UC-95 | View quote list | Customer | All quotes shown with reference, date, item count, total, and status |
| UC-96 | View quote detail & history | Customer | Full quote shown with line items, pricing, and a chronological status history |
| UC-97 | Convert quote to order | Customer | An accepted quote is converted into a new order pre-populated with its line items |
| UC-98 | View hottest offers | Customer | Dashboard displays a curated set of current deals and featured inventory |
| UC-99 | View promotional banner | Customer | Full-width promotional banners are displayed on the dashboard and catalog |
| UC-106 | Save & apply a search | Customer | Customer names and saves the current filter/search combination; saved searches appear as one-click shortcuts and can be applied, renamed, or deleted |
| UC-107 | Favorite a device | Customer | Customer marks/unmarks a device as a favorite; a Favorites filter shows only favorited devices; the customer's favorites persist across visits |

### Quote Status Definitions

| Status | Meaning |
|--------|---------|
| Draft | Quote being built; not yet submitted |
| Submitted | Sent to PCS; awaiting review |
| Under Review | PCS is reviewing the requested pricing |
| Counter-Offered | PCS has responded with revised pricing |
| Accepted | Pricing agreed; quote can be converted to an order |
| Rejected | Quote declined |
| Expired | Quote validity period has lapsed |

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
| UC-105 | Reorder previous order | Customer | Customer selects a past order and a new draft order (or quote) is created pre-populated with the same line items for confirmation |

---

## 5. Dashboard Additions

Stage 2 adds the following to the Dashboard, consistent with how Stage 1 built the dashboard progressively.

| Addition | Description |
|----------|-------------|
| Open RMAs KPI card | Count of RMA requests not yet in Complete status |
| Open Quotes KPI card | Count of submitted quotes awaiting resolution |
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
| Build & submit quote | ✓ | ✓ | — |
| View quotes | ✓ | ✓ | ✓ |
| Convert quote to order | ✓ | ✓ | — |
| Initiate invoice payment | ✓ | ✓ | — |
| Reorder previous order | ✓ | ✓ | — |

---

## 7. Out of Scope for Stage 2

The following remain deferred and are addressed in the Stage 3 requirements or the residual backlog:

- Integrations (API keys, webhooks, ERP/WMS sync, custom integrations)
- Shipment Enhancements (carrier tracking link, customer pickup authorization, delivery SMS)
- New Customer Application wizard (self-service prospect onboarding)
- Meeting Scheduler
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
