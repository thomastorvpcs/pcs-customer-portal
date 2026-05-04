# PCS Wireless Customer Portal — Business Requirements

**Document Version:** 1.2  
**Date:** May 4, 2026  
**Stage:** Stage 1 — Core Functionality  
**Status:** Draft — Pending Business Sign-Off  
**Prepared by:** Development Team  
**Review Required From:** Business Stakeholders

---

## Purpose

This document describes all functionality included in **Stage 1** of the PCS Wireless Customer Portal. It is intended for business stakeholder review to confirm the Stage 1 feature set is complete and accurate before development of the live backend is finalized.

Subsequent stages are summarised in Section 13 for visibility but are **not** in scope for this sign-off.

Please review each section and indicate:
- **Approved** — functionality is correct as described
- **Change Required** — something needs to be different (add comment)
- **Out of Scope** — functionality should be removed from Stage 1

---

## Delivery Stages

| Stage | Scope | Status |
|-------|-------|--------|
| **Stage 1** | Core functionality: Dashboard, Orders, Shipments, Financial, Support, Settings & Profile | **This document** |
| Stage 2 | RMA / Returns | Upcoming |
| Stage 3 | New Customer Application (self-service registration wizard) | Upcoming |
| Stage 4 | Integrations (API Keys, Webhooks, ERP/WMS) | Upcoming |
| Stage 5 | Catalog, Quotes & Promotional Banners | Upcoming |
| Stage 6 | Meeting Scheduler | Upcoming |

---

## Table of Contents

1. [Authentication & Access](#1-authentication--access)
2. [Dashboard](#2-dashboard)
3. [Order Management](#3-order-management)
4. [Shipment Tracking](#4-shipment-tracking)
5. [Financial Management](#5-financial-management)
6. [Activity Log](#6-activity-log)
7. [Support Tickets](#7-support-tickets)
8. [Account Settings](#8-account-settings)
9. [Navigation & Global UI](#9-navigation--global-ui)
10. [Notifications](#10-notifications)
11. [User Roles & Permissions](#11-user-roles--permissions)
12. [Out of Scope / Upcoming Stages](#12-out-of-scope--upcoming-stages)

---

## 1. Authentication & Access

### User Stories

**US-01** — As a customer, I want to log in with my email and password so that I can securely access my account.

**US-02** — As a customer, I want to log in using Single Sign-On (Google, Microsoft, or Apple) so that I don't need to manage a separate password.

**US-03** — As a customer, I want a "Forgot Password" link on the login page so that I can reset my password if I've forgotten it.

**US-04** — As a new customer whose account has been approved by PCS, I want to receive login credentials and access the portal so that I can begin managing my orders and account.

**US-05** — As a customer, I want the portal to prevent access to all pages unless I am logged in, so that my account data is protected.

> **Note:** The self-service New Customer Application wizard (multi-step registration, document upload, and application reference number) is scoped for **Stage 3**. In Stage 1, customer accounts are provisioned by PCS staff following an offline or email-based application process.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-01 | Log in with email/password | Customer | User is authenticated and directed to the Dashboard |
| UC-02 | Log in via SSO | Customer | User is authenticated via Google, Microsoft, or Apple and directed to the Dashboard |
| UC-03 | Reset forgotten password | Customer | User clicks "Forgot Password", receives a reset email, and can set a new password |
| UC-04 | Receive portal access | New customer | PCS provisions account; customer receives credentials and can log in |
| UC-05 | Access protected page without login | Unauthenticated user | User is redirected to the login page |

---

## 2. Dashboard

### User Stories

**US-06** — As a customer, I want to see a summary of my account at a glance when I log in, so that I can quickly understand the current state of my business.

**US-07** — As a customer, I want to see key metrics on the dashboard — open orders, pending shipments, outstanding balance, and open support tickets — so that I know where attention is needed.

**US-08** — As a customer, I want to be alerted if I have past-due invoices directly on the dashboard, so that I can take immediate action.

**US-09** — As a customer, I want a quick-action button on the dashboard to contact support, so that I can raise a request without navigating through menus.

**US-10** — As a customer, I want to see a recent activity feed on the dashboard so that I can catch up on account events since my last visit.

**US-76** — As a customer, I want to see a promotional offers section on the dashboard highlighting current deals and featured inventory so that I am aware of special pricing available to me.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-06 | View account KPIs | Customer | Dashboard displays: count of open orders, pending shipments, outstanding balance, and open support tickets |
| UC-07 | View past-due alert | Customer | A banner alerts the customer to past-due invoice amounts with a link to the Financial page |
| UC-08 | Use Quick Action | Customer | Customer clicks Contact Support and is taken to the Support page to raise a ticket |
| UC-09 | View recent activity | Customer | The last several account events are displayed in chronological order with links to related records |
| UC-71 | View promotional offers | Customer | A "Hottest Offers" banner displays featured deals with savings highlighted; clicking a deal navigates to the Catalog page with relevant filters pre-applied (available in Stage 5) |

### Dashboard KPI Definitions

| Metric | Definition |
|--------|------------|
| Open Orders | Count of orders in any non-delivered, non-cancelled status |
| Pending Shipments | Count of shipments currently in transit |
| Outstanding Balance | Total of unpaid invoice balances |
| Open Support Tickets | Count of tickets not in Resolved status |

> **Note:** A 5th KPI card — **Open RMAs** — will be added to the dashboard in Stage 2.

---

## 3. Order Management

### User Stories

**US-11** — As a customer, I want to see a list of all my orders so that I can track what I have purchased.

**US-12** — As a customer, I want to filter my orders by status (All, Processing, Shipped, Delivered, On Hold) so that I can focus on the orders that need attention.

**US-13** — As a customer, I want to search my orders by Order ID or PO Number so that I can quickly find a specific order.

**US-14** — As a customer, I want to view full details for a specific order — including line items, pricing, shipping details, and status timeline — so that I have complete visibility into each purchase.

**US-15** — As a customer, I want to see an order status timeline (Confirmed → Credit Approved → QC/Diagnostics → Packed → Shipped → Delivered) so that I can understand exactly where my order is in the process.

**US-16** — As a customer, I want to download documents associated with an order (Invoice, Packing List, Bill of Lading) so that I have records for my internal use.

**US-17** — As a customer, I want to reorder a previous order so that I can quickly repeat a purchase without re-entering all the details.

**US-18** — As a customer, I want to export my order list so that I can use the data in my own systems.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-10 | View order list | Customer | All orders displayed with Order ID, PO Number, date, status, item count, and total value |
| UC-11 | Filter orders by status | Customer | List is filtered to show only orders of the selected status; KPI cards show count and value per status |
| UC-12 | Search orders | Customer | List is filtered in real-time to orders matching the entered Order ID or PO Number |
| UC-13 | View order detail | Customer | Full order record shown including: dates, addresses, line items table, status timeline, tracking info, and associated documents |
| UC-14 | Download order documents | Customer | Invoice, Packing List, or Bill of Lading file is downloaded to the user's device |
| UC-15 | Download all order documents | Customer | All documents for the order are downloaded together |
| UC-16 | Reorder | Customer | A new order request is initiated pre-populated with the same items as the selected order |
| UC-17 | Export order list | Customer | Order data is exported as a file (e.g. CSV) |

### Order Data Fields

Each order record includes the following information:

| Field | Description |
|-------|-------------|
| Order ID | PCS-assigned order number (e.g. PCS-2024-1847) |
| PO Number | Customer's own purchase order number |
| Order Date | Date the order was placed |
| Status | Processing / Shipped / Delivered / On Hold |
| Items | Count of devices in the order |
| Total Value | Dollar value of the order |
| Ship From | Origin facility name and location |
| Ship To | Destination address |
| Line Items | Product, SKU, Grade (A/B), Storage, Qty, Unit Price, Total |
| Tracking | Carrier, tracking number, and ETA (when available) |
| Documents | Invoice, Packing List, Bill of Lading |

### Order Status Definitions

| Status | Meaning |
|--------|---------|
| Confirmed | Order received and confirmed by PCS |
| Credit Approved | Customer's credit has been verified and approved for the order value |
| QC / Diagnostics | Devices are undergoing quality control and diagnostic testing |
| Packed | Order has been packed and is ready for collection by the carrier |
| Shipped | Order is in transit with a carrier |
| Delivered | Order has been received at the destination |
| On Hold | Order requires attention before it can proceed |

---

## 4. Shipment Tracking

### User Stories

**US-19** — As a customer, I want to see all shipments associated with my account so that I can monitor the delivery of my orders.

**US-20** — As a customer, I want to filter shipments by status (In Transit, Delivered, Pickup Ready, Exception) so that I can focus on shipments needing action.

**US-21** — As a customer, I want to view a shipment tracking timeline so that I can see exactly where a shipment is in the delivery process.

**US-22** — As a customer, I want to see the last tracking event with a timestamp so that I have the most up-to-date status of a shipment.

**US-23** — As a customer, I want to access shipment documents (Bill of Lading, Packing List) so that I have the paperwork I need for receiving.

**US-24** — As a customer, I want to track a shipment on the carrier's website so that I can get real-time carrier-level updates.

**US-25** — As a customer arranging a customer pickup, I want to view the pickup authorization status and register my driver's details so that I can coordinate collection of my order.

**US-77** — As a customer arranging a pickup, I want to enter my driver's name, ID number, and vehicle information so that PCS can verify the person collecting the shipment.

**US-78** — As a customer, I want to select from previously saved pickup contacts so that I do not need to re-enter driver details for repeat collections.

**US-79** — As a customer, I want to generate a pickup authorization document so that my driver has the official paperwork required to collect the shipment at the PCS facility.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-18 | View shipment list | Customer | All shipments shown with Shipment ID, associated Order ID, carrier, status, and ETA |
| UC-19 | Filter shipments by status | Customer | List filtered to the selected status type |
| UC-20 | View shipment detail | Customer | Full shipment record shown: tracking timeline, last event, ship from/to, weight, item count, carrier, service type |
| UC-21 | Download Bill of Lading | Customer | BOL document downloaded to user's device |
| UC-22 | Download Packing List | Customer | Packing List document downloaded |
| UC-23 | Track on carrier website | Customer | User is linked to the carrier's tracking page with the tracking number pre-populated |
| UC-24 | View pickup authorization status | Customer | Pickup status shown (Pending / Authorized); driver registration form available for Pickup Ready shipments |
| UC-72 | Register driver for pickup | Customer | Customer enters driver name, ID number, and vehicle info; form submitted; pickup status changes to Authorized |
| UC-73 | Select saved pickup contact | Customer | Customer selects a previously saved driver from a dropdown; their details pre-fill the registration form |
| UC-74 | Generate pickup authorization document | Customer | Authorization document generated and available to download; driver presents it at the PCS facility for collection |

### Shipment Status Definitions

| Status | Meaning |
|--------|---------|
| In Transit | Shipment is with the carrier and moving toward destination |
| Out for Delivery | Shipment is on the final delivery vehicle |
| Delivered | Shipment has been received at the destination |
| Pickup Ready | Shipment is available for customer pickup at PCS facility |
| Exception | A delivery exception has occurred and requires follow-up |

### Shipment Tracking Timeline Steps

Label Created → Picked Up → In Transit → Out for Delivery → Delivered

---

## 5. Financial Management

### User Stories

**US-26** — As a customer, I want to see a summary of my account financial position — total outstanding, past due, credit limit, and payment terms — so that I can manage my payments effectively.

**US-27** — As a customer, I want to see an aging breakdown of my outstanding balance (Current, 30, 60, 90+ days) so that I can prioritize which invoices to pay.

**US-28** — As a customer, I want to view all my invoices with their status so that I can track what is paid and what is owed.

**US-29** — As a customer, I want to view the full details of an invoice — including line items and payment history — so that I can verify charges and reconcile my records.

**US-30** — As a customer, I want to download an invoice as a PDF so that I can share or store it.

**US-31** — As a customer, I want to download a full account statement so that I can reconcile my account.

**US-32** — As a customer, I want to initiate payment on an outstanding invoice so that I can settle my balance.

**US-33** — As a customer, I want to dispute an invoice so that I can flag incorrect charges for review.

**US-34** — As a customer, I want to view all payments I have made, including method, date, amount, and which invoices they were applied to, so that I can maintain accurate payment records.

**US-35** — As a customer, I want to view all credit memos on my account, including the reason, any associated RMA reference number, and applied invoice, so that I understand any credits I have received.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-25 | View financial summary | Customer | Dashboard KPIs show: total outstanding, past due, credit limit, available credit, and payment terms |
| UC-26 | View aging summary | Customer | Outstanding balance broken down into aging buckets: Current, 30, 60, 90+ days |
| UC-27 | View invoice list | Customer | All invoices shown with ID, order, date, due date, amount, balance, and status |
| UC-28 | Filter invoices by status | Customer | List filtered to Open, Past Due, or Paid invoices |
| UC-29 | View invoice detail | Customer | Full invoice shown: bill-to address, line items, subtotal, tax, total, payment terms, payment history |
| UC-30 | Download invoice PDF | Customer | Invoice downloaded as a PDF file |
| UC-31 | Download account statement | Customer | Full account statement downloaded |
| UC-32 | Initiate payment | Customer | Customer is able to initiate payment against an unpaid invoice |
| UC-33 | Dispute an invoice | Customer | Customer can flag an invoice for review; support is notified |
| UC-34 | View payment list | Customer | All payments shown with reference ID, date, amount, method, and applied invoices |
| UC-35 | View payment detail | Customer | Full payment record: company, bank, confirmation number, applied-to invoice list |
| UC-36 | View credit memo list | Customer | All credit memos shown with ID, date, amount, reason, and status |
| UC-37 | View credit memo detail | Customer | Full credit memo: issued to, RMA reference, applied invoice, notes, line items |
| UC-38 | View RMA reference on credit memo | Customer | The RMA reference number is displayed on the credit memo as a read-only field (full RMA module is Stage 2) |

### Invoice Status Definitions

| Status | Meaning |
|--------|---------|
| Open | Invoice is within payment terms and has an unpaid balance |
| Past Due | Invoice payment is overdue |
| Paid | Invoice has been fully paid |

### Payment Methods Supported

Wire Transfer, ACH, Check

### Account Summary KPIs

| KPI | Definition |
|-----|------------|
| Total Outstanding | Sum of all unpaid invoice balances |
| Past Due | Sum of balances on invoices past their due date |
| Credit Limit | Maximum credit extended to the customer |
| Available Credit | Credit Limit minus Total Outstanding |
| Payment Terms | Default payment terms (e.g. Net 30) |

---

## 6. Activity Log

### User Stories

**US-36** — As a customer, I want to see a chronological log of all activity on my account so that I have a full audit trail.

**US-37** — As a customer, I want to filter the activity log by category (Orders, Shipments, Payments, Support) so that I can find relevant events quickly.

**US-38** — As a customer, I want activities that require my attention to be visually flagged so that I don't miss important actions.

**US-39** — As a customer, I want each activity entry to link to the related record (order, invoice, ticket) so that I can navigate directly to the relevant page.

**US-40** — As a customer, I want activity entries grouped by date so that I can easily scan by time period.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-39 | View full activity log | Customer | All account events shown in reverse-chronological order, grouped by date |
| UC-40 | Filter by category | Customer | Log filtered to the selected category (All, Orders, Shipments, Payments, Support) |
| UC-41 | View items requiring action | Customer | Activities with pending actions are badged; customer can click through to take action |
| UC-42 | Navigate from activity to record | Customer | Clicking an activity entry navigates to the related order, invoice, or ticket |
| UC-43 | Load more activities | Customer | Additional activities are loaded on demand ("Load More") |

### Activity Types

| Category | Event Types |
|----------|-------------|
| Orders | Order confirmed, Order shipped, Order delivered |
| Shipments | Out for delivery, Delivered |
| Payments | Payment received, Credit memo applied, Invoice generated |
| Support | Support ticket created, Ticket resolved |

---

## 7. Support Tickets

### User Stories

**US-41** — As a customer, I want to submit a support ticket so that I can get help from the PCS team.

**US-42** — As a customer, I want to view all my open and historical support tickets so that I can track the status of my requests.

**US-43** — As a customer, I want to filter tickets by status and category so that I can find specific tickets quickly.

**US-44** — As a customer, I want to read the full conversation thread for a support ticket so that I can follow the dialogue between myself and the support team.

**US-45** — As a customer, I want to reply to a ticket so that I can provide additional information or follow up on a request.

**US-46** — As a customer, I want to attach files to a support message so that I can share relevant documents or images with the support team.

**US-47** — As a customer, I want to see which PCS team member is assigned to my ticket so that I know who is handling my issue.

**US-48** — As a customer, I want to see if a ticket is linked to a specific order so that I can understand the context of the issue.

**US-80** — As a customer, I want to set the priority of a new support ticket (Normal or Urgent) so that urgent issues are flagged to the support team immediately.

**US-81** — As a customer, I want to optionally link a support ticket to an Order ID or Quote ID so that the support team has the relevant context without needing to ask for it.

**US-82** — As a customer, I want to rate my experience after a support ticket is resolved so that I can provide feedback on the service I received.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-44 | View ticket list | Customer | All tickets shown with ID, title, category, priority, status, and last updated time |
| UC-45 | Filter tickets by status | Customer | Ticket list filtered to the selected status |
| UC-46 | Filter tickets by category | Customer | Ticket list filtered to the selected category |
| UC-47 | View ticket detail | Customer | Full ticket shown: title, priority, status, category, created date, assigned team, related order, and full conversation thread |
| UC-48 | Reply to ticket | Customer | Customer types a reply and submits it; message is added to the conversation thread |
| UC-49 | Attach file to reply | Customer | Customer can attach a file to a support message |
| UC-50 | Create new ticket | Customer | Customer submits a new support request with category, subject, description, priority, optional linked record, and optional file attachments |
| UC-75 | Set ticket priority | Customer | Customer selects Normal or Urgent when creating a ticket; priority is visible to the support team |
| UC-76 | Link ticket to order or quote | Customer | Customer optionally enters an Order ID or Quote ID; reference displayed in the ticket detail for the support team |
| UC-77 | Rate resolved ticket | Customer | After a ticket is marked Resolved, customer is presented with a star rating; rating is submitted and recorded |

### Ticket Priority Definitions

| Priority | Meaning |
|----------|---------|
| Urgent | Critical issue requiring immediate attention |
| In Progress | Issue is actively being worked on |
| Waiting | Awaiting customer or third-party response |
| Resolved | Issue has been resolved |

### Ticket Categories (Stage 1)

Order Issue, Shipping, RMA Enquiry, Billing

> **Note:** RMA Enquiry tickets allow customers to raise a return-related question via support. The full RMA workflow (submitting, tracking, and managing returns) is covered in Stage 2. Quote and Certificate categories will be added in Stage 5.

---

## 8. Account Settings

### User Stories

**US-49** — As an Admin, I want to update my company's business information (name, address, phone, email) so that our account details are accurate.

**US-50** — As an Admin, I want to manage our tax exemption status and upload a tax certificate so that our orders are processed correctly.

**US-51** — As an Admin, I want to invite new users to our account so that my team members can access the portal.

**US-52** — As an Admin, I want to assign roles to team members (Admin, Buyer, Viewer) so that each person has the appropriate level of access.

**US-53** — As an Admin, I want to activate or deactivate user accounts so that I can control who has access.

**US-54** — As a customer, I want to choose my preferred theme (Light, Dark, or System) so that the portal is comfortable to use.

**US-55** — As a customer, I want to control which email and SMS notifications I receive so that I am only alerted about the things that matter to me.

**US-56** — As a customer, I want to set my regional preferences (currency, timezone, date format) so that information is displayed in a format familiar to me.

**US-57** — As a customer, I want to change my password so that I can maintain account security.

**US-58** — As a customer, I want to enable Two-Factor Authentication (via Authenticator App or SMS) so that my account is more secure.

**US-59** — As a customer, I want to view and revoke active sessions so that I can ensure no unauthorized devices are logged in.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-51 | Edit company details | Admin | Company name, address, phone, and email updated and saved |
| UC-52 | Upload tax certificate | Admin | Tax certificate file uploaded; exemption status updated |
| UC-53 | Invite user | Admin | Invitation email sent to new user; they appear as pending in the user list |
| UC-54 | Assign/change user role | Admin | User's role updated to Admin, Buyer, or Viewer |
| UC-55 | Deactivate user | Admin | User's access is suspended; they cannot log in |
| UC-56 | Reactivate user | Admin | User's access is restored |
| UC-57 | Change theme | Customer | Selected theme (Light/Dark/System) applied and persisted |
| UC-58 | Toggle email notification | Customer | Notification preference saved; emails sent or suppressed accordingly |
| UC-59 | Toggle SMS notification | Customer | SMS notification preference saved |
| UC-60 | Update regional settings | Customer | Currency, timezone, and date format preferences saved and applied to display |
| UC-61 | Change password | Customer | Password updated after verifying current password |
| UC-62 | Enable 2FA | Customer | Two-Factor Authentication activated via Authenticator App or SMS |
| UC-63 | Revoke active session | Customer | Selected device session is terminated |

### Notification Types

| Type | Channel | Default |
|------|---------|---------|
| Order Confirmations | Email | On |
| Shipment Updates | Email | On |
| Invoice Reminders | Email | On |
| Support Ticket Updates | Email | Off |
| Shipment Delivered | SMS | On |
| Payment Due Alerts | SMS | Off |

---

## 9. Navigation & Global UI

### User Stories

**US-63** — As a customer on desktop, I want a persistent sidebar navigation so that I can move between sections of the portal quickly.

**US-64** — As a customer on mobile, I want a bottom tab bar and a hamburger menu drawer so that navigation is accessible and familiar on a small screen.

**US-65** — As a customer, I want to see the name and contact details of my PCS Sales Representative in the navigation so that I can reach them easily.

**US-66** — As a customer, I want the portal to work well on both mobile and desktop screens so that I can use it from any device.

### Navigation Structure

```
Dashboard
├── Orders
│   └── Order Detail
├── Shipments
├── Financial
│   ├── Invoices
│   ├── Payments
│   └── Credit Memos
├── Recent Activities
├── Support
└── Settings
    ├── Company
    ├── Users
    ├── Preferences
    └── Security
```

### Quick Actions (Stage 1)

| Action | Description |
|--------|-------------|
| Contact Support | Open a new support ticket or contact PCS directly |

> **Note:** Request Quote (Stage 5), Create RMA (Stage 2), and Device Lookup (Stage 5) will be added as quick actions in their respective stages.

---

## 10. Notifications

### User Stories

**US-67** — As a customer, I want to receive email notifications for key account events so that I am kept informed without needing to log in.

**US-68** — As a customer, I want to receive SMS notifications for urgent events such as delivery confirmations and upcoming payment due dates so that I can act quickly.

**US-69** — As a customer, I want to see a notification bell in the portal so that I can view in-app alerts.

---

## 11. User Roles & Permissions

### Role Definitions

| Role | Permissions |
|------|-------------|
| Admin | Full access to all features including user management, company settings, and security |
| Buyer | Can view orders, shipments, and financials; can submit support tickets; cannot manage users or integrations |
| Viewer | Read-only access to orders, shipments, and financials; cannot create or modify records |

### Access Matrix

| Feature | Admin | Buyer | Viewer |
|---------|-------|-------|--------|
| View Dashboard | ✓ | ✓ | ✓ |
| View Orders | ✓ | ✓ | ✓ |
| Reorder | ✓ | ✓ | — |
| View Shipments | ✓ | ✓ | ✓ |
| View Financial | ✓ | ✓ | ✓ |
| Pay Invoice | ✓ | ✓ | — |
| Dispute Invoice | ✓ | ✓ | — |
| View Activity Log | ✓ | ✓ | ✓ |
| Submit Support Ticket | ✓ | ✓ | ✓ |
| Reply to Ticket | ✓ | ✓ | ✓ |
| Manage Users | ✓ | — | — |
| Edit Company Details | ✓ | — | — |
| Edit Own Preferences | ✓ | ✓ | ✓ |
| Change Own Password | ✓ | ✓ | ✓ |
| Enable Own 2FA | ✓ | ✓ | ✓ |

---

## 12. Out of Scope / Upcoming Stages

The following functionality is **not** included in Stage 1. Each item is assigned to a future delivery stage and will require its own requirements and sign-off process before development begins.

---

### Stage 2 — RMA / Returns

| Feature | Description |
|---------|-------------|
| Submit RMA request | Customer selects an order, enters device IMEIs (one per line), selects a complaint reason from 18 categories, optionally uploads evidence files (up to 25MB), and submits |
| Complaint categories | 18 options including: Dead Pixel, Cracked LCD, Battery Drain, WiFi Not Working, Bluetooth, Charging Port, Speaker/Mic, Face ID, Touch ID, Camera, Water Damage, Cosmetic Damage, Wrong Item, Missing Accessories, Software Issue, Carrier Lock, IMEI Mismatch, Other |
| RMA status tracking | Customer tracks progress through 7 stages: Submitted → Under Review → Approved → Shipped → Received → Diagnostic → Complete |
| RMA detail view | Full RMA record showing IMEIs, models, complaint reasons, resolution (Credited / Replaced / Returned), and linked credit memo |
| RMA list | Customer can view all open and historical RMA requests with status filtering |
| RMA analytics | Summary cards showing return rate %, average resolution time, and open RMA count |
| Credit memo download | Customer can download the credit memo generated from an approved RMA |
| Return shipping labels | Customer can download or request a pre-paid return shipping label |
| RMA notifications | Email/SMS alerts for RMA status changes |
| Dashboard KPI | Open RMAs KPI card added to the dashboard |
| Activity log events | "RMA submitted" and "RMA credit issued" events added to the activity log |
| Support ticket category | "RMA" ticket category linked to active RMA records |

---

### Stage 3 — New Customer Application

New customers can complete a self-service application wizard to register their business and request a PCS account. The application is submitted for PCS staff review; the customer receives a reference number to track progress.

#### Wizard Steps

| Step | Title | Key Fields / Actions |
|------|-------|----------------------|
| 1 | Company Information | Legal business name, trading name, company registration number, VAT/tax ID, industry vertical, website URL |
| 2 | Contact Details | Primary contact name, job title, email, phone; billing address; optional shipping address toggle |
| 3 | Business Profile | Years in operation, estimated monthly device volume (tier selector), device types of interest (multiselect), countries of operation |
| 4 | Document Upload | Upload certificate of incorporation, proof of address, photo ID (drag-and-drop or file picker; PDF/JPG/PNG; max 10 MB each) |
| 5 | Review & Submit | Summary of all entered data; checkbox to confirm T&Cs and Privacy Policy; Submit Application button |

#### Monthly Volume Tiers

| Tier | Range |
|------|-------|
| Starter | 1–100 units/month |
| Growth | 101–500 units/month |
| Professional | 501–2 000 units/month |
| Enterprise | 2 001+ units/month |

#### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-64 | Start application | Prospective customer | Customer lands on the public registration page and begins the wizard |
| UC-65 | Enter company info | Prospective customer | Step 1 validated; customer proceeds to Step 2 |
| UC-66 | Enter contact details | Prospective customer | Step 2 validated; customer proceeds to Step 3 |
| UC-67 | Complete business profile | Prospective customer | Step 3 validated; customer proceeds to Step 4 |
| UC-68 | Upload documents | Prospective customer | Files accepted and stored; customer proceeds to Step 5 |
| UC-69 | Review and submit | Prospective customer | Application submitted; confirmation screen shows unique application reference number |
| UC-70 | Track application status | Prospective customer | Customer can return to the portal using the reference number to view status (Submitted / Under Review / Approved / Rejected) |

---

### Stage 4 — Integrations

| Feature | Description |
|---------|-------------|
| API key management | Admins can view, copy, and regenerate production and test API keys |
| Webhook configuration | Admins can add and manage webhook endpoints with event subscriptions (order.created, order.shipped, invoice.created, invoice.paid) |
| ERP/WMS integration | Connect SAP or NetSuite; view sync status and trigger manual syncs |
| Custom integrations | Admins can configure additional third-party integrations beyond SAP and NetSuite |
| Integrations settings tab | Dedicated Integrations section added to the Settings page |

---

### Stage 5 — Catalog, Quotes & Promotional Banners

| Feature | Description |
|---------|-------------|
| Device catalog | Browse available devices in a product grid with filter sidebar (Brand, Grade, Storage, Price Range, Colour, Deals, Availability) and sort options |
| Search | Search catalog by product name |
| Active filter pills | Removable filter pills displayed above the grid; Clear All resets all filters |
| Product cards | Each card shows device image, brand badge, stock indicator, specs, price, quantity selector (+/−), and Add to Quote button |
| Quote cart | Right-panel cart showing selected items with quantities, catalog price, custom offer price input, price difference indicator, and line totals |
| Offer pricing | Customer can propose a custom per-unit price on any cart item; the difference from catalog price is shown in real time |
| Submit quote | Customer submits quote for PCS review; quote appears in My Quotes with Submitted status |
| Save as template | Customer can save a cart configuration as a reusable quote template |
| Use template | Customer can populate the cart from a previously saved template |
| My Quotes table | Customer views all submitted quotes with status (Draft / Submitted / Under Review / Approved / Counter-Offered / Accepted / Rejected / Expired) |
| Quote detail | Full quote record with line items, pricing, validity period, and Accept / Request Revision / Reject actions |
| Promotional banners | Full-width banners on dashboard and catalog surfacing featured deals; clicking a banner card filters the catalog to the relevant products |
| Quick actions | "Request Quote" and "Device Lookup" added to navigation quick actions |
| Support ticket categories | "Quote" ticket category added |

---

### Stage 6 — Meeting Scheduler

| Feature | Description |
|---------|-------------|
| Book a meeting | Customer can schedule a call or meeting with their assigned PCS Sales Representative |
| Calendar availability | Available time slots pulled from the sales rep's calendar |
| Meeting confirmation | Confirmation email and calendar invite sent to both parties |
| Meeting history | Customer can view upcoming and past meetings |
| Reschedule / cancel | Customer can reschedule or cancel an upcoming meeting |

---

### General Items Not Assigned to a Stage

The following items are noted as out of scope but do not yet have a confirmed delivery stage:

- Online payment processing (credit card payments directly in the portal)
- Real-time / live chat with support
- Custom reporting or data analytics dashboard
- Multi-currency billing
- Native mobile app (iOS / Android)

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
