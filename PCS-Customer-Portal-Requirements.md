# PCS Wireless Customer Portal — Business Requirements

**Document Version:** 1.5  
**Date:** May 6, 2026  
**Stage:** Stage 1 — Core Functionality  
**Status:** Draft — Pending Business Sign-Off  
**Prepared by:** Development Team  
**Review Required From:** Business Stakeholders

---

## Purpose

This document describes all functionality included in **Stage 1** of the PCS Wireless Customer Portal. It is intended for business stakeholder review to confirm the Stage 1 feature set is complete and accurate before development of the live backend is finalized.

Out of scope items are listed in Section 12 for visibility but are **not** in scope for this sign-off.

Please review each section and indicate:
- **Approved** — functionality is correct as described
- **Change Required** — something needs to be different (add comment)
- **Out of Scope** — functionality should be removed from Stage 1

---

## Delivery Stages

| Stage | Scope | Status |
|-------|-------|--------|
| **Stage 1** | Authentication (Auth0), Dashboard, Orders, Shipments, Financial, Support, Settings & Profile | **This document** |
| Future | Feature areas listed in Section 12 — not yet assigned to delivery stages | Upcoming |

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
12. [Out of Scope](#12-out-of-scope)

---

## 1. Authentication & Access

### User Stories

**US-01** — As a customer, I want to log in with my email and password so that I can securely access my account.

**US-02** — As a customer, I want to log in using Single Sign-On (Google, Microsoft, or Apple) so that I don't need to manage a separate password.

**US-03** — As a customer, I want a "Forgot Password" link on the login page so that I can reset my password if I've forgotten it.

**US-04** — As an existing PCS customer, I want to receive portal login credentials from PCS staff so that I can begin managing my orders and account online.

**US-05** — As a customer, I want the portal to prevent access to all pages unless I am logged in, so that my account data is protected.

> **Note:** The portal is initially being rolled out to **existing PCS customers**. In Stage 1, portal access is provisioned by PCS staff for customers who already have an account with PCS. The self-service New Customer Application wizard — allowing prospective customers to apply for a new PCS account online — is out of scope for Stage 1.

> **Note on Authentication:** The portal uses **Auth0** as the authentication provider for Stage 1. Auth0 handles login (email/password and SSO), password reset, Two-Factor Authentication, and session management natively. Passwordless login and passkey authentication are supported by Auth0 but are not enabled in Stage 1.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-01 | Log in with email/password | Customer | User is authenticated and directed to the Dashboard |
| UC-02 | Log in via SSO | Customer | User is authenticated via Google, Microsoft, or Apple and directed to the Dashboard |
| UC-03 | Reset forgotten password | Customer | User clicks "Forgot Password", receives a reset email, and can set a new password |
| UC-04 | Receive portal access | Existing customer | PCS staff provisions portal access for an existing customer; customer receives credentials and can log in |
| UC-05 | Access protected page without login | Unauthenticated user | User is redirected to the login page |

---

## 2. Dashboard

### User Stories

**US-06** — As a customer, I want to see a summary of my account at a glance when I log in, so that I can quickly understand the current state of my business.

**US-07** — As a customer, I want to see key metrics on the dashboard — open orders, pending shipments, outstanding balance, and open support tickets — so that I know where attention is needed.

**US-08** — As a customer, I want to be alerted if I have past-due invoices directly on the dashboard, so that I can take immediate action.

**US-09** — As a customer, I want a quick-action button on the dashboard to contact support, so that I can raise a request without navigating through menus.

**US-10** — As a customer, I want to see a recent activity feed on the dashboard so that I can catch up on account events since my last visit.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-06 | View account KPIs | Customer | Dashboard displays: count of open orders, pending shipments, outstanding balance, and open support tickets |
| UC-07 | View past-due alert | Customer | A banner alerts the customer to past-due invoice amounts with a link to the Financial page |
| UC-08 | Use Quick Action | Customer | Customer clicks Contact Support and is taken to the Support page to raise a ticket |
| UC-09 | View recent activity | Customer | The last several account events are displayed in chronological order with links to related records |

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

**US-12** — As a customer, I want to see a list of all my orders so that I can track what I have purchased.

**US-13** — As a customer, I want to filter my orders by status (All, Processing, Shipped, Delivered, On Hold) so that I can focus on the orders that need attention.

**US-14** — As a customer, I want to search my orders by Order ID or PO Number so that I can quickly find a specific order.

**US-15** — As a customer, I want to view full details for a specific order — including line items, pricing, shipping details, and status timeline — so that I have complete visibility into each purchase.

**US-16** — As a customer, I want to see an order status timeline so that I can understand exactly where my order is in the fulfillment process.

> **Note:** The specific statuses shown in the order timeline are subject to confirmation with Operations. Steps such as Credit Approved and QC/Diagnostics will be included only if they reflect PCS's actual fulfillment workflow.

**US-17** — As a customer, I want to download documents associated with an order (Invoice, Packing List, Bill of Lading) so that I have records for my internal use.

**US-18** — As a customer, I want to export my order list so that I can use the data in my own systems. — As a customer, I want to export my order list so that I can use the data in my own systems.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-11 | View order list | Customer | All orders displayed with Order ID, PO Number, date, status, item count, and total value |
| UC-12 | Filter orders by status | Customer | List is filtered to show only orders of the selected status; KPI cards show count and value per status |
| UC-13 | Search orders | Customer | List is filtered in real-time to orders matching the entered Order ID or PO Number |
| UC-14 | View order detail | Customer | Full order record shown including: dates, addresses, line items table, status timeline, tracking info, and associated documents |
| UC-15 | Download order documents | Customer | Invoice, Packing List, or Bill of Lading file is downloaded to the user's device |
| UC-16 | Download all order documents | Customer | All documents for the order are downloaded together |
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

**US-20** — As a customer, I want to see all shipments associated with my account so that I can monitor the delivery of my orders.

**US-21** — As a customer, I want to filter shipments by status (In Transit, Delivered, Pickup Ready, Exception) so that I can focus on shipments needing action.

**US-22** — As a customer, I want to view the current status of my shipments so that I can see where they are and whether any action is needed.

**US-23** — As a customer, I want to see the most recent status update for a shipment so that I have the latest information available.

**US-24** — As a customer, I want to access shipment documents (Bill of Lading, Packing List) so that I have the paperwork I need for receiving.

> **Note:** Real-time carrier tracking integration and customer pickup authorization workflows require operational readiness and carrier agreements not yet in place for Stage 1. Shipment status will reflect information available from PCS's internal systems. These capabilities will be revisited for a future stage.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-19 | View shipment list | Customer | All shipments shown with Shipment ID, associated Order ID, carrier, status, and ETA |
| UC-20 | Filter shipments by status | Customer | List filtered to the selected status type |
| UC-21 | View shipment detail | Customer | Shipment record shown with current status, last update, shipping details, and associated documents |
| UC-22 | Download Bill of Lading | Customer | BOL document downloaded to user's device |
| UC-23 | Download Packing List | Customer | Packing List document downloaded |

### Shipment Status Definitions

| Status | Meaning |
|--------|---------|
| In Transit | Shipment is with the carrier and moving toward destination |
| Delivered | Shipment has been received at the destination |
| Pickup Ready | Shipment is available for customer pickup at a PCS facility |
| Exception | A delivery issue has occurred and requires follow-up |

---

## 5. Financial Management

### User Stories

**US-30** — As a customer, I want to see a summary of my account financial position — total outstanding, past due, credit limit, and payment terms — so that I can manage my payments effectively.

**US-31** — As a customer, I want to see an aging breakdown of my outstanding balance (Current, 30, 60, 90+ days) so that I can prioritize which invoices to pay.

**US-32** — As a customer, I want to view all my invoices with their status so that I can track what is paid and what is owed.

**US-33** — As a customer, I want to view the full details of an invoice — including line items and payment history — so that I can verify charges and reconcile my records.

**US-34** — As a customer, I want to download an invoice as a PDF so that I can share or store it.

**US-35** — As a customer, I want to download a full account statement so that I can reconcile my account.

**US-36** — As a customer, I want to dispute an invoice so that I can flag incorrect charges for review.

**US-37** — As a customer, I want to view all payments I have made, including method, date, amount, and which invoices they were applied to, so that I can maintain accurate payment records.

**US-38** — As a customer, I want to view all credit memos on my account, including the reason, any associated RMA reference number, and applied invoice, so that I understand any credits I have received.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-29 | View financial summary | Customer | Dashboard KPIs show: total outstanding, past due, credit limit, available credit, and payment terms |
| UC-30 | View aging summary | Customer | Outstanding balance broken down into aging buckets: Current, 30, 60, 90+ days |
| UC-31 | View invoice list | Customer | All invoices shown with ID, order, date, due date, amount, balance, and status |
| UC-32 | Filter invoices by status | Customer | List filtered to Open, Past Due, or Paid invoices |
| UC-33 | View invoice detail | Customer | Full invoice shown: bill-to address, line items, subtotal, tax, total, payment terms, payment history |
| UC-34 | Download invoice PDF | Customer | Invoice downloaded as a PDF file |
| UC-35 | Download account statement | Customer | Full account statement downloaded |
| UC-36 | Dispute an invoice | Customer | Customer can flag an invoice for review; support is notified |
| UC-37 | View payment list | Customer | All payments shown with reference ID, date, amount, method, and applied invoices |
| UC-38 | View payment detail | Customer | Full payment record: company, bank, confirmation number, applied-to invoice list |
| UC-39 | View credit memo list | Customer | All credit memos shown with ID, date, amount, reason, and status |
| UC-40 | View credit memo detail | Customer | Full credit memo: issued to, RMA reference, applied invoice, notes, line items |
| UC-41 | View RMA reference on credit memo | Customer | The RMA reference number is displayed on the credit memo as a read-only field (full RMA module is out of scope for Stage 1) |

### Invoice Status Definitions

| Status | Meaning |
|--------|---------|
| Open | Invoice is within payment terms and has an unpaid balance |
| Past Due | Invoice payment is overdue |
| Paid | Invoice has been fully paid |

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

**US-40** — As a customer, I want to see a chronological log of all activity on my account so that I have a full audit trail.

**US-41** — As a customer, I want to filter the activity log by category (Orders, Shipments, Payments, Support) so that I can find relevant events quickly.

**US-42** — As a customer, I want activities that require my attention to be visually flagged so that I don't miss important actions.

**US-43** — As a customer, I want each activity entry to link to the related record (order, invoice, ticket) so that I can navigate directly to the relevant page.

**US-44** — As a customer, I want activity entries grouped by date so that I can easily scan by time period.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-43 | View full activity log | Customer | All account events shown in reverse-chronological order, grouped by date |
| UC-44 | Filter by category | Customer | Log filtered to the selected category (All, Orders, Shipments, Payments, Support) |
| UC-45 | View items requiring action | Customer | Activities with pending actions are badged; customer can click through to take action |
| UC-46 | Navigate from activity to record | Customer | Clicking an activity entry navigates to the related order, invoice, or ticket |
| UC-47 | Load more activities | Customer | Additional activities are loaded on demand ("Load More") |

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

**US-45** — As a customer, I want to submit a support ticket so that I can get help from the PCS team.

**US-46** — As a customer, I want to view all my open and historical support tickets so that I can track the status of my requests.

**US-47** — As a customer, I want to filter tickets by status and category so that I can find specific tickets quickly.

**US-48** — As a customer, I want to read the full conversation thread for a support ticket so that I can follow the dialogue between myself and the support team.

**US-49** — As a customer, I want to reply to a ticket so that I can provide additional information or follow up on a request.

**US-50** — As a customer, I want to attach files to a support message so that I can share relevant documents or images with the support team.

**US-51** — As a customer, I want to see which PCS team member is assigned to my ticket so that I know who is handling my issue.

**US-52** — As a customer, I want to see if a ticket is linked to a specific order so that I can understand the context of the issue.

**US-53** — As a customer, I want to set the priority of a new support ticket (Normal or Urgent) so that urgent issues are flagged to the support team immediately.

**US-54** — As a customer, I want to optionally link a support ticket to an Order ID or Quote ID so that the support team has the relevant context without needing to ask for it.

**US-55** — As a customer, I want to rate my experience after a support ticket is resolved so that I can provide feedback on the service I received.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-48 | View ticket list | Customer | All tickets shown with ID, title, category, priority, status, and last updated time |
| UC-49 | Filter tickets by status | Customer | Ticket list filtered to the selected status |
| UC-50 | Filter tickets by category | Customer | Ticket list filtered to the selected category |
| UC-51 | View ticket detail | Customer | Full ticket shown: title, priority, status, category, created date, assigned team, related order, and full conversation thread |
| UC-52 | Reply to ticket | Customer | Customer types a reply and submits it; message is added to the conversation thread |
| UC-53 | Attach file to reply | Customer | Customer can attach a file to a support message |
| UC-54 | Create new ticket | Customer | Customer submits a new support request with category, subject, description, priority, optional linked record, and optional file attachments |
| UC-55 | Set ticket priority | Customer | Customer selects Normal or Urgent when creating a ticket; priority is visible to the support team |
| UC-56 | Link ticket to order or quote | Customer | Customer optionally enters an Order ID or Quote ID; reference displayed in the ticket detail for the support team |
| UC-57 | Rate resolved ticket | Customer | After a ticket is marked Resolved, customer is presented with a star rating; rating is submitted and recorded |

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

**US-56** — As an Admin, I want to update my company's business information (name, address, phone, email) so that our account details are accurate.

**US-57** — As an Admin, I want to manage our tax exemption status and upload a tax certificate so that our orders are processed correctly.

**US-58** — As an Admin, I want to invite new users to our account so that my team members can access the portal.

**US-59** — As an Admin, I want to assign roles to team members (Admin, Buyer, Viewer) so that each person has the appropriate level of access.

**US-60** — As an Admin, I want to activate or deactivate user accounts so that I can control who has access.

**US-61** — As a customer, I want to choose my preferred theme (Light, Dark, or System) so that the portal is comfortable to use.

**US-62** — As a customer, I want to control which email and SMS notifications I receive so that I am only alerted about the things that matter to me.

**US-63** — As a customer, I want to set my regional preferences (currency, timezone, date format) so that information is displayed in a format familiar to me.

**US-64** — As a customer, I want to change my password so that I can maintain account security.

**US-65** — As a customer, I want to enable Two-Factor Authentication (via Authenticator App or SMS) so that my account is more secure.

**US-66** — As a customer, I want to view and revoke active sessions so that I can ensure no unauthorized devices are logged in.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-58 | Edit company details | Admin | Company name, address, phone, and email updated and saved |
| UC-59 | Upload tax certificate | Admin | Tax certificate file uploaded; exemption status updated |
| UC-60 | Invite user | Admin | Invitation email sent to new user; they appear as pending in the user list |
| UC-61 | Assign/change user role | Admin | User's role updated to Admin, Buyer, or Viewer |
| UC-62 | Deactivate user | Admin | User's access is suspended; they cannot log in |
| UC-63 | Reactivate user | Admin | User's access is restored |
| UC-64 | Change theme | Customer | Selected theme (Light/Dark/System) applied and persisted |
| UC-65 | Toggle email notification | Customer | Notification preference saved; emails sent or suppressed accordingly |
| UC-66 | Toggle SMS notification | Customer | SMS notification preference saved |
| UC-67 | Update regional settings | Customer | Currency, timezone, and date format preferences saved and applied to display |
| UC-68 | Change password | Customer | Password updated after verifying current password |
| UC-69 | Enable 2FA | Customer | Two-Factor Authentication activated via Authenticator App or SMS |
| UC-70 | Revoke active session | Customer | Selected device session is terminated |

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

**US-67** — As a customer on desktop, I want a persistent sidebar navigation so that I can move between sections of the portal quickly.

**US-68** — As a customer on mobile, I want a bottom tab bar and a hamburger menu drawer so that navigation is accessible and familiar on a small screen.

**US-69** — As a customer, I want to see the name and contact details of my PCS Sales Representative in the navigation so that I can reach them easily.

**US-70** — As a customer, I want the portal to work well on both mobile and desktop screens so that I can use it from any device.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-71 | Use sidebar navigation | Customer (desktop) | Persistent sidebar displays all navigation links; active page is highlighted; clicking any link navigates to that section |
| UC-72 | Use mobile navigation | Customer (mobile) | Bottom tab bar shows primary navigation items; hamburger menu opens a full drawer with all navigation links |
| UC-73 | View sales rep details | Customer | Sales rep name, phone, and email are displayed in the navigation panel; customer can click to initiate contact |
| UC-74 | Use portal on mobile device | Customer | All pages render correctly on mobile screen sizes; layout adapts to the viewport without loss of functionality |

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

**US-71** — As a customer, I want to receive email notifications for key account events so that I am kept informed without needing to log in.

**US-72** — As a customer, I want to receive SMS notifications for urgent account events such as upcoming payment due dates so that I can act quickly.

**US-73** — As a customer, I want to see a notification bell in the portal so that I can view in-app alerts.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-75 | Receive email notification | Customer | When a key account event occurs (order confirmed, shipment update, invoice generated), customer receives a formatted email notification |
| UC-76 | Receive SMS notification | Customer | When an urgent account event occurs (e.g. payment due reminder), customer receives an SMS alert |
| UC-77 | View in-app notifications | Customer | Notification bell in the portal header shows an unread count badge; clicking opens a panel listing recent alerts; clicking an alert navigates to the relevant record |

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
| View Shipments | ✓ | ✓ | ✓ |
| View Financial | ✓ | ✓ | ✓ |
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

## 12. Out of Scope

The following functionality is not included in Stage 1. Items have not been committed to specific future stages; prioritisation and scheduling will be decided separately.

---

### RMA / Returns

| Feature | Description |
|---------|-------------|
| Submit RMA request | Customer selects an order, enters device IMEIs, selects a complaint reason, optionally uploads evidence, and submits |
| Complaint categories | Options including: Dead Pixel, Cracked LCD, Battery Drain, WiFi Not Working, Bluetooth, Charging Port, Speaker/Mic, Face ID, Touch ID, Camera, Water Damage, Cosmetic Damage, Wrong Item, Missing Accessories, Software Issue, Carrier Lock, IMEI Mismatch, Other |
| RMA status tracking | Customer tracks progress: Submitted → Under Review → Approved → Shipped → Received → Diagnostic → Complete |
| RMA detail view | Full RMA record showing IMEIs, models, complaint reasons, and resolution |
| RMA list | Customer can view all open and historical RMA requests with status filtering |
| Credit memo download | Customer can download the credit memo generated from an approved RMA |
| Return shipping labels | Customer can download or request a pre-paid return shipping label |
| RMA notifications | Email/SMS alerts for RMA status changes |
| Dashboard KPI | Open RMAs KPI card added to the dashboard |

---

### New Customer Application

New customers can complete a self-service application wizard to register their business and request a PCS account.

| Step | Title | Key Fields / Actions |
|------|-------|----------------------|
| 1 | Company Information | Legal business name, trading name, company registration number, VAT/tax ID, industry vertical, website URL |
| 2 | Contact Details | Primary contact name, job title, email, phone; billing address; optional shipping address toggle |
| 3 | Business Profile | Years in operation, estimated monthly volume, device types of interest, countries of operation |
| 4 | Document Upload | Certificate of incorporation, proof of address, photo ID |
| 5 | Review & Submit | Summary, T&Cs confirmation, Submit Application; customer receives a reference number |

---

### Integrations

| Feature | Description |
|---------|-------------|
| API key management | Admins can view, copy, and regenerate production and test API keys |
| Webhook configuration | Admins can manage webhook endpoints with event subscriptions |
| ERP/WMS integration | Connect SAP or NetSuite; view sync status and trigger manual syncs |
| Custom integrations | Configure additional third-party integrations |

---

### Catalog, Quotes & Promotional Banners

| Feature | Description |
|---------|-------------|
| Promotional offers on dashboard | A "Hottest Offers" section highlighting current deals and featured inventory |
| Device catalog | Browse available devices with filter sidebar and sort options |
| Quote cart | Build a quote with custom per-unit pricing; submit for PCS review |
| My Quotes | View and manage submitted quotes with full status history |
| Promotional banners | Full-width banners on dashboard and catalog surfacing featured deals |

---

### Meeting Scheduler

| Feature | Description |
|---------|-------------|
| Book a meeting | Customer schedules a call or meeting with their assigned PCS Sales Representative |
| Calendar availability | Available time slots pulled from the sales rep's calendar |
| Meeting confirmation | Confirmation email and calendar invite sent to both parties |
| Meeting history | Customer can view upcoming and past meetings |
| Reschedule / cancel | Customer can reschedule or cancel an upcoming meeting |

---

### Shipment Enhancements

| Feature | Description |
|---------|-------------|
| Carrier tracking link | Direct link to the carrier's tracking page for real-time updates (requires carrier integration agreements) |
| Customer pickup authorization | Driver registration, saved pickup contacts, and pickup authorization document generation (requires Operations process definition) |
| Delivery SMS notifications | SMS alerts for shipment delivery events (requires carrier integration) |

---

### Orders

| Feature | Description |
|---------|-------------|
| Reorder | Repeat a previous order pre-populated with the same items |

---

### Financial

| Feature | Description |
|---------|-------------|
| Invoice payment initiation | Customer initiates payment against an outstanding invoice directly in the portal |
| Online payment processing | Credit card and other direct payment methods |

---

### General

- Real-time / live chat with support
- Custom reporting or data analytics dashboard
- Multi-currency billing
- Native mobile app (iOS / Android)
- Passwordless login and passkey authentication (Auth0-supported; not enabled in Stage 1)

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
