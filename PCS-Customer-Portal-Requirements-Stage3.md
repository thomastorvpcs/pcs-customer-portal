# PCS Wireless Customer Portal — Business Requirements

**Document Version:** 1.0  
**Date:** July 2, 2026  
**Stage:** Stage 3 — Integrations, Automation & Advanced  
**Status:** Draft — Pending Business Sign-Off  
**Prepared by:** Development Team  
**Review Required From:** Business Stakeholders

---

## Purpose

This document describes all functionality included in **Stage 3** of the PCS Wireless Customer Portal. Stage 3 covers capabilities that depend on external readiness — carrier agreements, ERP connectivity, calendar integration, and payment/telephony vendors — as well as prospect-facing self-service onboarding.

Stage 3 features were previously listed under "Out of Scope" in the Stage 1 requirements and are formalised here as user stories and use cases. Because several of these features carry **external prerequisites**, each dependency is called out explicitly so that scheduling can account for it.

Please review each section and indicate:
- **Approved** — functionality is correct as described
- **Change Required** — something needs to be different (add comment)
- **Out of Scope** — functionality should be deferred or removed

---

## Delivery Stages

| Stage | Scope | Status |
|-------|-------|--------|
| Stage 1 | Authentication (Auth0), Dashboard, Orders, Shipments, Financial, Support, Settings & Profile | Delivered / In progress |
| Stage 2 | Returns (RMA), Catalog & Sales Estimates, Online Payments, Reorder | See Stage 2 requirements |
| **Stage 3** | Integrations, Shipment Enhancements, New Customer Application, Meeting Scheduler, advanced backlog | **This document** |

---

## Table of Contents

1. [Integrations](#1-integrations)
2. [Shipment Enhancements](#2-shipment-enhancements)
3. [New Customer Application](#3-new-customer-application)
4. [Meeting Scheduler](#4-meeting-scheduler)
5. [General & Advanced (Epics)](#5-general--advanced-epics)
6. [Dashboard Additions](#6-dashboard-additions)
7. [User Roles & Permissions](#7-user-roles--permissions)
8. [Out of Scope for Stage 3](#8-out-of-scope-for-stage-3)

---

## 1. Integrations

Admins can connect the portal to their own systems and to PCS's fulfilment systems, and manage programmatic access.

> **Prerequisite:** A published PCS public API and webhook infrastructure must be available before this feature can be delivered.

### User Stories

**US-110** — As an Admin, I want to view, copy, and regenerate production and test API keys so that I can integrate the portal with my own systems.

**US-111** — As an Admin, I want to configure webhook endpoints and subscribe them to specific events so that my systems are notified when account events occur.

**US-112** — As an Admin, I want to view the delivery status of recent webhook events so that I can diagnose integration issues.

**US-113** — As an Admin, I want to connect an ERP/WMS system (SAP or NetSuite) so that portal data stays in sync with my back-office systems.

**US-114** — As an Admin, I want to see the sync status of a connected ERP/WMS and trigger a manual sync so that I can confirm data is up to date.

**US-115** — As an Admin, I want to configure additional third-party integrations so that I can extend the portal to other tools we use.

**US-116** — As an Admin, I want to revoke an API key or disable an integration so that I can immediately cut off access when needed.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-110 | Manage API keys | Admin | Production and test API keys are viewed, copied, or regenerated |
| UC-111 | Configure webhook | Admin | A webhook endpoint is added with a selected set of event subscriptions |
| UC-112 | View webhook deliveries | Admin | Recent webhook delivery attempts are shown with status and response codes |
| UC-113 | Connect ERP/WMS | Admin | SAP or NetSuite connection is configured and authorised |
| UC-114 | View sync status / manual sync | Admin | Last sync time and status shown; a manual sync can be triggered |
| UC-115 | Configure custom integration | Admin | An additional third-party integration is configured |
| UC-116 | Revoke access | Admin | An API key is revoked or an integration disabled; access stops immediately |

---

## 2. Shipment Enhancements

Extends the Stage 1 Shipment Tracking module with real-time carrier data, customer pickup workflows, and delivery alerts.

> **Prerequisites:** Carrier tracking and delivery SMS require carrier integration agreements. Customer pickup authorization requires an Operations process definition. These must be in place before the corresponding stories are delivered.

### User Stories

**US-120** — As a customer, I want a direct link to the carrier's tracking page for a shipment so that I can see real-time delivery updates. *(Requires carrier integration agreements.)*

**US-121** — As a customer, I want to register a driver and save pickup contacts so that authorised people can collect shipments on my behalf. *(Requires Operations process definition.)*

**US-122** — As a customer, I want to generate a pickup authorization document so that my driver can present proof of authorization at collection. *(Requires Operations process definition.)*

**US-123** — As a customer, I want to receive SMS alerts for shipment delivery events so that I know when a shipment has been delivered. *(Requires carrier integration.)*

**US-124** — As a customer, I want to manage my saved pickup contacts so that I can keep the authorised list current.

**US-125** — As a customer, I want to see which shipments are eligible for pickup so that I know when the pickup workflow applies.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-120 | Open carrier tracking | Customer | A direct link opens the carrier's real-time tracking page for the shipment |
| UC-121 | Register driver / pickup contact | Customer | A driver or pickup contact is registered and saved to the account |
| UC-122 | Generate pickup authorization | Customer | A pickup authorization document is generated for download |
| UC-123 | Receive delivery SMS | Customer | An SMS alert is sent when a shipment is delivered, per notification preferences |
| UC-124 | Manage pickup contacts | Customer | Saved pickup contacts are added, edited, or removed |
| UC-125 | View pickup-eligible shipments | Customer | Shipments eligible for customer pickup are identified in the shipment list |

---

## 3. New Customer Application

A self-service application wizard allowing prospective customers to register their business and request a PCS account. This extends portal access beyond existing customers; submitted applications are reviewed by PCS staff (back-office review, tracked in the Sales Portal).

### User Stories

**US-130** — As a prospective customer, I want to enter my company information so that PCS can identify my business.

**US-131** — As a prospective customer, I want to provide my contact and address details so that PCS can reach me and set up billing/shipping.

**US-132** — As a prospective customer, I want to describe my business profile (volume, device interests, countries) so that PCS can assess my account.

**US-133** — As a prospective customer, I want to upload the required documents so that PCS can verify my business.

**US-134** — As a prospective customer, I want to review my application and confirm the terms before submitting so that I can check everything is correct.

**US-135** — As a prospective customer, I want to receive a reference number after submitting so that I can follow up on my application.

**US-136** — As a prospective customer, I want to be notified of the outcome of my application so that I know whether my account has been approved.

### Application Steps

| Step | Title | Key Fields / Actions |
|------|-------|----------------------|
| 1 | Company Information | Legal business name, trading name, company registration number, VAT/tax ID, industry vertical, website URL |
| 2 | Contact Details | Primary contact name, job title, email, phone; billing address; optional shipping address toggle |
| 3 | Business Profile | Years in operation, estimated monthly volume, device types of interest, countries of operation |
| 4 | Document Upload | Certificate of incorporation, proof of address, photo ID |
| 5 | Review & Submit | Summary, T&Cs confirmation, Submit Application; customer receives a reference number |

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-130 | Enter company information | Prospect | Company details captured in Step 1 |
| UC-131 | Enter contact details | Prospect | Contact and address details captured in Step 2 |
| UC-132 | Enter business profile | Prospect | Business profile captured in Step 3 |
| UC-133 | Upload documents | Prospect | Required documents uploaded in Step 4 |
| UC-134 | Review & submit | Prospect | Application summary reviewed, terms confirmed, and application submitted |
| UC-135 | Receive reference number | Prospect | A unique application reference number is issued on submission |
| UC-136 | Receive application outcome | Prospect | Prospect is notified when the application is approved or declined |

---

## 4. Meeting Scheduler

Customers can schedule meetings with their assigned PCS Sales Representative.

> **Prerequisite:** Sales representative calendar availability requires calendar integration (e.g. Office 365). This must be in place before delivery.

### User Stories

**US-140** — As a customer, I want to book a call or meeting with my assigned PCS Sales Representative so that I can discuss my account.

**US-141** — As a customer, I want to see available time slots from my sales rep's calendar so that I can choose a time that works for both of us.

**US-142** — As a customer, I want to receive a confirmation email and calendar invite so that the meeting is added to my calendar.

**US-143** — As a customer, I want to view my upcoming and past meetings so that I can keep track of my engagements with PCS.

**US-144** — As a customer, I want to reschedule an upcoming meeting so that I can move it when my availability changes.

**US-145** — As a customer, I want to cancel an upcoming meeting so that I can release the slot if I no longer need it.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-140 | Book a meeting | Customer | A meeting is booked with the assigned sales rep at a selected time |
| UC-141 | View availability | Customer | Available slots from the sales rep's calendar are displayed |
| UC-142 | Receive confirmation & invite | Customer | Confirmation email and calendar invite are sent to both parties |
| UC-143 | View meeting history | Customer | Upcoming and past meetings are listed |
| UC-144 | Reschedule meeting | Customer | An upcoming meeting is moved to a new available slot; both parties are notified |
| UC-145 | Cancel meeting | Customer | An upcoming meeting is cancelled and the slot released; both parties are notified |

---

## 5. General & Advanced (Epics)

The following are captured as higher-level epics. Each will be broken down into full user stories and receive its own sign-off before development, as priorities are confirmed.

| ID | Epic | Description |
|----|------|-------------|
| US-150 | Live chat with support | Real-time chat between customers and the PCS support team, complementing the ticket system |
| US-151 | Reporting & analytics dashboard | Custom reporting and a data-analytics dashboard over the customer's orders, shipments, and financials |
| US-152 | Multi-currency billing | Invoicing and financial display in multiple currencies |
| US-153 | Native mobile app | Native iOS / Android applications |
| US-154 | Passwordless / passkey login | Passwordless and passkey authentication (Auth0-supported), extending the Stage 1 login |
| US-155 | Advanced notification controls | Finer-grained, per-event notification routing across email, SMS, and in-app channels |

---

## 6. Dashboard Additions

| Addition | Description |
|----------|-------------|
| Integration health indicator | Status of connected ERP/WMS and recent webhook delivery health (Admin view) |
| Upcoming meetings panel | Next scheduled meeting(s) with the sales rep |
| Live chat launcher | Entry point to start a live chat with support (when the Live Chat epic is delivered) |

---

## 7. User Roles & Permissions

Stage 3 features are added to the access matrix. Role definitions are unchanged (Admin, Buyer, Viewer).

| Feature | Admin | Buyer | Viewer |
|---------|-------|-------|--------|
| Manage API keys | ✓ | — | — |
| Configure webhooks | ✓ | — | — |
| Connect / sync ERP/WMS | ✓ | — | — |
| Configure custom integrations | ✓ | — | — |
| View carrier tracking | ✓ | ✓ | ✓ |
| Register driver / manage pickup contacts | ✓ | ✓ | — |
| Generate pickup authorization | ✓ | ✓ | — |
| Book / reschedule / cancel meetings | ✓ | ✓ | — |
| View meetings | ✓ | ✓ | ✓ |

> **New Customer Application** is completed by prospective customers who do not yet have portal access, so it sits outside the Admin/Buyer/Viewer matrix.

---

## 8. Out of Scope for Stage 3

- Any feature not explicitly listed above.
- Epics in Section 5 are not committed to a delivery date; they will be prioritised and broken down separately.
- Sales Portal capabilities (RMA Management Queue, Sales Estimate Approvals, Backoffice Dashboard, Customer Analytics & AI Insights) — tracked in the Sales Portal requirements.

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
