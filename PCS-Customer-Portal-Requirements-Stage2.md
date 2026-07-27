# PCS Wireless Customer Portal — Business Requirements
## Online Payments

**Document Version:** 1.7  
**Date:** July 27, 2026  
**Stage:** Stage 2  
**Status:** Draft — Pending Business Sign-Off  
**Prepared by:** Development Team  
**Review Required From:** Business Stakeholders

**Revision 1.7 (July 27, 2026):** Split the Stage 2 requirements into focused documents. **Catalog, Sales Estimates & Sales Orders, and Reorder** now live in a dedicated PRD (*PCS Customer Portal — Product Requirements: Catalog, Sales Estimates & Sales Orders, and Reorder*), their single source of truth. **Returns (RMA)** is in its own document. This document now covers **Online Payments** only.

---

## Purpose

This document describes the **Online Payments** functionality of the PCS Wireless Customer Portal. It extends the Stage 1 Financial module (previously view-and-download only) so customers can pay outstanding invoices directly in the portal.

> **Scope note:** Catalog, Sales Estimates & Sales Orders, and Reorder have moved to a dedicated PRD; Returns (RMA) is in its own document. This document is **Online Payments only**.

---

## 1. Online Payments

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

## 2. User Roles & Permissions

Role definitions are unchanged (Admin, Buyer, Viewer).

| Feature | Admin | Buyer | Viewer |
|---------|-------|-------|--------|
| View invoices & balances | ✓ | ✓ | ✓ |
| Initiate invoice payment | ✓ | ✓ | — |

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
