# PCS Backoffice Portal — Business Requirements

**Document Version:** 1.1  
**Date:** May 4, 2026  
**Stages:** All Stages (1–7)  
**Status:** Draft — Pending Business Sign-Off  
**Prepared by:** Development Team  
**Review Required From:** Business Stakeholders

---

## Purpose

This document describes the functionality of the PCS Wireless Sales Backoffice Portal. **Stage 1** is fully scoped with user stories and use cases for business sign-off. Stages 2 through 7 are summarised by feature area for visibility; each will receive its own full requirements and sign-off process before entering development.

Please review Stage 1 and indicate:
- **Approved** — functionality is correct as described
- **Change Required** — something needs to be different (add comment)
- **Out of Scope** — functionality should be removed or deferred

---

## Delivery Stages

| Stage | Scope | Status |
|-------|-------|--------|
| **Stage 1** | Support Ticket Agent View | **This document** |
| Stage 2 | RMA Management Queue | Upcoming |
| Stage 3 | Authentication, Dashboard, Customer Search & List, Customer 360 View | Upcoming |
| Stage 4 | Inventory Browser with Floor Pricing & Quote Creation Tool | Upcoming |
| Stage 5 | Customer Analytics & AI Insights | Upcoming |
| Stage 6 | Quote Approvals | Upcoming |
| Stage 7 | Calendar & Meeting Scheduling (Office 365 Integration) | Upcoming |

> **Note on Authentication:** Basic authentication is a prerequisite for all stages. The full Azure Active Directory (Azure AD) SSO implementation is formally scoped in Stage 3. Stages 1 and 2 may use a simplified login mechanism during development and will be upgraded to Azure AD SSO when Stage 3 is delivered.

---

## Table of Contents

1. [Stage 1 — Support Ticket Agent View](#1-stage-1--support-ticket-agent-view)
2. [User Roles & Permissions](#2-user-roles--permissions)
3. [Out of Scope / Upcoming Stages](#3-out-of-scope--upcoming-stages)

---

## 1. Stage 1 — Support Ticket Agent View

A two-panel support interface allowing sales reps and support agents to view, manage, and respond to customer support tickets. This is the first stage delivered because it provides immediate value for customer service operations with minimal dependencies.

### User Stories

**US-B-01** — As a support agent, I want to see a list of all customer support tickets so that I can triage and respond to open requests.

**US-B-02** — As a support agent, I want to filter tickets by status (Open, In Progress, Waiting, Resolved) so that I can focus on tickets that need attention.

**US-B-03** — As a support agent, I want to filter tickets by priority (Urgent, High, Normal, Low) so that I can handle the most critical issues first.

**US-B-04** — As a support agent, I want to filter tickets by category (Order Issue, Shipping, RMA, Billing, Quote, Certificate, General) so that I can work through a specific type of request.

**US-B-05** — As a support agent, I want to filter tickets by assigned sales rep so that I can view only the tickets relevant to my accounts.

**US-B-06** — As a support agent, I want to select a ticket from the list and see the full conversation thread in a detail panel so that I can understand the complete history before responding.

**US-B-07** — As a support agent, I want to read customer messages and previous agent replies in a clear threaded view so that I can follow the dialogue without confusion.

**US-B-08** — As a support agent, I want to type and send a reply to a customer ticket so that I can respond to their request directly from the portal.

**US-B-09** — As a support agent, I want to add an internal note to a ticket that is only visible to staff so that I can communicate context to colleagues without the customer seeing it.

**US-B-10** — As a support agent, I want to change the status of a ticket (Open → In Progress → Waiting → Resolved) so that the ticket lifecycle is accurately tracked.

**US-B-11** — As a support agent, I want to change the priority of a ticket so that escalations are reflected immediately.

**US-B-12** — As a support agent, I want to reassign a ticket to another agent or sales rep so that the right person handles the issue.

**US-B-13** — As a support agent, I want to see a visual priority indicator (colour-coded dot) on each ticket in the list so that I can spot urgent tickets at a glance without reading every row.

**US-B-14** — As a support agent, I want to see an empty state when no ticket is selected so that the interface is clear and I know to choose a ticket from the list.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-01 | View ticket list | Agent | All tickets displayed with ID, subject, customer, category, priority indicator, status, and last updated timestamp |
| UC-B-02 | Filter by status | Agent | Ticket list filtered to the selected status; count updates |
| UC-B-03 | Filter by priority | Agent | Ticket list filtered to the selected priority level |
| UC-B-04 | Filter by category | Agent | Ticket list filtered to the selected category |
| UC-B-05 | Filter by sales rep | Agent | Ticket list filtered to tickets assigned to the selected rep |
| UC-B-06 | Select ticket | Agent | Right panel displays the full ticket detail and conversation thread; selected ticket highlighted in list |
| UC-B-07 | Deselect ticket | Agent | Pressing Escape or clicking elsewhere deselects the ticket; right panel returns to empty state |
| UC-B-08 | Read conversation thread | Agent | Customer messages shown right-aligned (blue); agent messages shown left-aligned (white with Agent badge); internal notes shown left-aligned (amber with Internal Note badge, italic text) |
| UC-B-09 | Reply to ticket | Agent | Agent types reply in textarea, clicks Send; message added to thread with agent name, timestamp, and Agent badge; customer is notified |
| UC-B-10 | Add internal note | Agent | Agent switches to Internal Note mode, types note, clicks Add; note appears in thread with amber background and Internal Note badge; not visible to customer |
| UC-B-11 | Change ticket status | Agent | Status dropdown updated; change reflected in ticket list and detail header immediately |
| UC-B-12 | Change ticket priority | Agent | Priority dropdown updated; priority indicator in ticket list updates immediately |
| UC-B-13 | Reassign ticket | Agent | Assignee dropdown updated to selected agent or sales rep |
| UC-B-14 | View empty state | Agent | When no ticket is selected, right panel displays a centred icon and "Select a ticket to view details" message |

### Ticket Status Definitions

| Status | Meaning |
|--------|---------|
| Open | Ticket has been submitted and is awaiting first response |
| In Progress | A staff member is actively working on the issue |
| Waiting | Response has been sent; awaiting customer reply |
| Resolved | Issue has been closed |

### Ticket Priority Definitions

| Priority | Indicator | Meaning |
|----------|-----------|---------|
| Urgent | Red dot | Business-critical issue requiring immediate response |
| High | Amber dot | Important issue to be addressed same day |
| Normal | Blue dot | Standard request with no time pressure |
| Low | Grey dot | Minor or informational request |

### Ticket Categories

Order Issue, Shipping, RMA Enquiry, Billing, Quote, Certificate, General

### Reply vs Internal Note

| Mode | Visibility | Background |
|------|-----------|------------|
| Reply | Customer and staff | White (agent message) |
| Internal Note | Staff only | Amber |

---

## 2. User Roles & Permissions

### Role Definitions

| Role | Description |
|------|-------------|
| Sales Representative | Full access to Stages 1–5 and 7; cannot approve quotes (Stage 6) |
| Sales Manager | Full access to all stages including quote approval |
| Support Agent | Access to Stage 1 (Support Tickets) only; cannot access financial, RMA, or inventory data |

### Access Matrix

| Feature | Sales Rep | Sales Manager | Support Agent |
|---------|-----------|---------------|---------------|
| View support tickets | ✓ | ✓ | ✓ |
| Reply to tickets | ✓ | ✓ | ✓ |
| Add internal notes | ✓ | ✓ | ✓ |
| Change ticket status / priority / assignee | ✓ | ✓ | ✓ |
| View RMA queue | ✓ | ✓ | — |
| Approve / Refuse RMAs | ✓ | ✓ | — |
| Log in via Azure AD SSO | ✓ | ✓ | ✓ |
| View dashboard KPIs | ✓ | ✓ | — |
| Search customer list | ✓ | ✓ | — |
| View Customer 360 | ✓ | ✓ | — |
| Invite / reset portal users | ✓ | ✓ | — |
| View inventory & pricing | ✓ | ✓ | — |
| Create & submit quotes | ✓ | ✓ | — |
| Approve / counter-offer / reject quotes | — | ✓ | — |
| View customer analytics | ✓ | ✓ | — |
| View AI insights dashboard | — | ✓ | — |
| Create & manage meetings | ✓ | ✓ | — |

---

## 3. Out of Scope / Upcoming Stages

The following functionality is **not** included in Stage 1. Each stage will require its own full requirements and sign-off process before development begins.

---

### Stage 2 — RMA Management Queue

A centralised queue for sales reps to review, approve, or refuse customer return requests (RMAs). Builds on Stage 1 by adding the first transactional workflow to the backoffice.

| Feature | Description |
|---------|-------------|
| RMA summary dashboard | 4 KPI cards: Total RMAs (MTD), Pending Review, Approved (MTD), Refused (MTD) |
| Status tab filtering | Filter RMA list by All, Pending Review, Approved, Refused, or Complete; tab count badges update dynamically |
| RMA list view | Table showing RMA #, Customer, Date, Order #, Device Count, Complaint Reason, and Status |
| RMA review modal | Modal showing RMA reference details and a device table (IMEI, Model, Complaint per device) |
| Approve RMA | Select resolution type (Credit Memo, Replacement, or Partial Credit), add optional notes, and confirm; status updates to Approved |
| Refuse RMA | Select refusal reason, add optional notes, and confirm; status updates to Refused |
| Read-only RMA view | View completed, approved, or refused RMAs in a read-only modal with resolution or refusal details |
| Export RMA list | Export the current filtered RMA list as a CSV file |

#### RMA Resolution Types

| Resolution | Meaning |
|------------|---------|
| Credit Memo | A credit is issued to the customer's account |
| Replacement | Replacement devices are sent to the customer |
| Partial Credit | A portion of the original value is credited |

#### RMA Refusal Reasons

Warranty Expired, Out of Policy, Damage Not Covered, Insufficient Documentation, Customer Error, Other

#### RMA Status Definitions

| Status | Meaning |
|--------|---------|
| Submitted | Customer has submitted the RMA; awaiting staff review |
| Pending Review | RMA is in the staff review queue |
| Approved | RMA has been approved with a resolution assigned |
| Refused | RMA has been declined with a reason recorded |
| Complete | Resolution has been fully processed (credit issued or replacement shipped) |

---

### Stage 3 — Authentication, Dashboard, Customer Search & Customer 360

Delivers the full internal authentication layer (Azure AD SSO), the main backoffice dashboard with account-wide KPIs, the customer directory, and the comprehensive Customer 360 view.

#### 3.1 Authentication

| Feature | Description |
|---------|-------------|
| Azure AD SSO login | Staff log in with their @pcsww.com Microsoft account via Single Sign-On |
| Pre-filled identity display | Login page shows the user's verified name and email before sign-in is clicked |
| Non-PCS account rejection | Authentication fails for non-@pcsww.com accounts; message directs user to IT for access |
| Session re-authentication | Expired sessions redirect the user to Microsoft login; on success, returned to previous location |

#### 3.2 Dashboard

| Feature | Description |
|---------|-------------|
| KPI cards | 5 cards: Total Customers, Open RMAs, Open Tickets, Pending Quotes, Revenue MTD — each with a supporting sub-metric |
| Quick actions | Buttons for Create Quote, View Pending RMAs, Customer Lookup, and Schedule Meeting |
| Recent activity feed | Last 8–10 account events displayed chronologically with icon, description, and timestamp |
| Upcoming meetings panel | Next 3–4 meetings shown with customer name, meeting type, date, and time |
| Global search | Header search bar surfaces matching customers, quotes, and RMAs; selecting a result navigates to it |

#### 3.3 Customer Search & List

| Feature | Description |
|---------|-------------|
| Customer search | Real-time search by company name, email address, or phone number |
| Filter by sales rep | Filter list to customers assigned to a selected rep |
| Filter by location | Filter list by city or state |
| Filter by account status | Filter by Active, On Hold, or Suspended |
| Filter by device type | Filter by the customer's primary device brand |
| Reset filters | Clear all active filters with a single button; result count updates |
| Result count | Displays count of matching records (e.g. "Showing 12 customers") |
| Open customer account | Click a row to navigate to the Customer 360 view for that customer |
| Export customer list | Export the current filtered list as a CSV file |

#### 3.4 Customer 360 View

| Feature | Description |
|---------|-------------|
| Customer header | Company name, status badge, location, sales rep, primary contact, credit limit, available credit, account age, and payment terms |
| Tab navigation | Nine tabs: Overview, Invoices, Financial, Shipments, Support Cases, RMA, Quotes, Portal Users, Activity |
| Overview tab | KPIs (Total Spending, Open RMAs, RMA %, Open Tickets, Open Offers) and a recent orders table |
| Invoices tab | Invoice history: Invoice #, Date, Amount, Due Date, Status, Balance |
| Financial tab | Account balance summary and aging breakdown (Current, 30, 60, 90+ days) |
| Shipments tab | Active and recent shipments table |
| Support Cases tab | Open support tickets for the account with status and priority |
| RMA tab | Full return history table with return rate % indicator |
| Quotes tab | Open and historical quotes with status and value |
| Portal Users tab | View, invite, and reset passwords for customer portal sub-users |
| Activity tab | Chronological account event log and recent customer portal search terms |

---

### Stage 4 — Inventory Browser & Quote Creation Tool

Gives sales reps visibility into live inventory across warehouse locations, including tier pricing and floor prices, and the ability to build and submit custom quotes for customers.

#### 4.1 Inventory Browser

| Feature | Description |
|---------|-------------|
| ERP sync status banner | Shows last sync time; data is read-only (managed by ERP) |
| Inventory KPIs | 4 cards: Total SKUs, Total Units, Warehouses, Low Stock Alerts |
| Filter by warehouse | Filter inventory to a specific warehouse location |
| Filter by brand / grade / storage | Multi-dimension product filtering |
| Search inventory | Real-time search by product name, SKU, or lot ID |
| Low stock indicator | Amber indicator on items with limited availability |
| Price tier breakdown | Expandable row showing quantity ranges, unit prices, and margin vs. floor price |
| Floor price display | Minimum allowed price shown per product |
| Margin colour coding | Margin % shown in green (>20%), amber (10–20%), or red (<10%) |

#### 4.2 Quote Creation Tool

| Feature | Description |
|---------|-------------|
| Customer selection | Associate the quote with a specific customer account before building |
| Product catalog browse | Browse products as cards with name, grade, storage, colour, price tiers, quantity, and floor price |
| Search / filter catalog | Filter by brand or search by product name in real time |
| Add product to quote | Add products to the Quote Builder panel; line item shows details, quantity, tier price, and custom price input |
| Tier price auto-update | Tier price recalculates automatically when quantity is changed |
| Custom pricing with margin | Enter a custom per-unit price; resulting margin shown with colour coding |
| Below-floor price warning | Input highlighted red with warning icon if custom price falls below floor price |
| Add notes | Notes saved with quote and visible to the approving manager |
| Save as draft | Save quote with Draft status for future editing |
| Submit for approval | Submit quote for manager review; status changes to Submitted; confirmation toast shown |
| Quote management view | View all quotes with status filter, columns, and action buttons |
| Withdraw quote | Cancel a quote that has not yet been approved; status changes to Withdrawn |

#### Quote Statuses

| Status | Meaning |
|--------|---------|
| Draft | Quote saved but not yet submitted |
| Submitted | Quote submitted for manager approval |
| Under Review | Manager is actively reviewing the quote |
| Approved | Manager has approved the quote; ready to send to customer |
| Counter-Offered | Manager has proposed adjusted pricing |
| Accepted | Customer has accepted the quote |
| Rejected | Quote rejected by manager or declined by customer |
| Expired | Quote validity period has passed |
| Withdrawn | Sales rep cancelled the quote before approval |

---

### Stage 5 — Customer Analytics & AI Insights

Adds an analytics layer to the Customer 360 view and a standalone insights dashboard. Uses AI to surface purchase behaviour patterns, flag at-risk accounts, and highlight aging inventory opportunities.

| Feature | Description |
|---------|-------------|
| Purchase behaviour analytics | Order frequency, average order value, top product categories, preferred grade, and 12-month spend trend chart per customer |
| AI product recommendations | AI-generated list of recommended products per customer based on purchase history, displayed with reasoning |
| At-risk customer alerts | Customers with declining order frequency or spend flagged with an alert badge in the customer list and on the customer header |
| AI account summary | One-paragraph AI-generated overview of the customer with key facts, recent trends, and suggested next actions |
| Aging inventory insights | Dashboard panel showing slow-moving SKUs with days-in-stock, current quantity, and AI-suggested price adjustment |
| Best-fit customers for clearance | For each aging SKU, a list of customers most likely to purchase is surfaced with a suggested outreach action |
| Customer segmentation | Segment badge per account (High Value, Growth, At Risk, Dormant) applied to the customer list |
| Segment filtering | Filter customer list by segment |
| Analytics export | Export customer analytics data or portfolio summary as CSV or PDF |

#### Customer Segment Definitions

| Segment | Definition |
|---------|------------|
| High Value | Consistently high spend and order frequency |
| Growth | Order frequency or spend increasing quarter-over-quarter |
| At Risk | Declining order frequency or spend versus prior period |
| Dormant | No orders placed in the past 90 days |

---

### Stage 6 — Quote Approvals

A manager-only approval queue where Sales Managers review quotes submitted by sales reps and approve, counter-offer, or reject them before they reach the customer.

| Feature | Description |
|---------|-------------|
| Approval queue KPIs | 4 cards: Pending Approval, Approved MTD, Counter-Offered, Average Margin % |
| Status tab filtering | Filter queue by Pending, Approved, Counter-Offered, Rejected, or historical |
| Queue table | Quote #, Customer, Sales Rep, Date, Total ($), Margin % (colour-coded), Status, and action button |
| Quote review modal | Rep notes and line items with catalog price, floor price, offered price, and margin per line |
| Approve | One-click approval; status changes to Approved; sales rep notified |
| Counter-offer | Edit adjusted prices per line item, add notes, send; status changes to Counter-Offered |
| Reject | Select rejection reason, add notes; status changes to Rejected; sales rep notified |
| Historical quote view | Read-only view of approved, counter-offered, or rejected quotes with outcome details |

#### Quote Approval Actions

| Action | Actor | Status After | Notification |
|--------|-------|-------------|--------------|
| Approve | Sales Manager | Approved | Green toast |
| Counter-Offer | Sales Manager | Counter-Offered | Amber toast |
| Reject | Sales Manager | Rejected | Red toast |

#### Rejection Reasons

Price Below Acceptable, Account on Hold, Margin Too Low, Product Unavailable, Customer Credit Issue, Other

---

### Stage 7 — Calendar & Meeting Scheduling

A calendar interface integrated with Microsoft Office 365 that allows sales reps to schedule, view, and manage customer meetings and internal appointments, with automatic Outlook calendar invites.

| Feature | Description |
|---------|-------------|
| Weekly calendar view | 7-column grid (Mon–Sun) with time slots 8am–5pm; meeting blocks placed at correct times |
| Monthly calendar view | Full-month grid with meeting indicators (coloured dot + title) per day |
| Calendar navigation | Previous/Next arrows for week or month; Today button returns to current period |
| Office 365 connection status | Banner showing connected email address and last sync timestamp |
| Create meeting | Enter title, description, date, start/end time, meeting type, customer, and location; optionally send Outlook calendar invite |
| Outlook calendar invite | Invite sent to customer and rep via Office 365 when option is selected |
| Meeting colour-coding | Meetings colour-coded by type for at-a-glance distinction |
| Meeting detail popup | Click a meeting block to view title, customer, type, location, and description |
| Upcoming meetings sidebar | Next 3–4 meetings listed with type, title, time, and customer name |
| Edit meeting | Update time, description, or location; Outlook invite updated if applicable |
| Cancel meeting | Remove meeting from calendar; cancellation notice sent via Outlook if an invite was sent |

#### Meeting Types

| Type | Colour | Use Case |
|------|--------|---------|
| Customer Review | Blue | Regular account check-in |
| Quote Discussion | Purple | Quote negotiation or presentation |
| Support Follow-up | Amber | Follow-up on an escalated ticket |
| Product Demo | Green | Product demonstration |
| Onboarding | Blue | New customer onboarding call |
| Internal | Grey | Internal team meetings |

#### Meeting Location Options

Microsoft Teams, Phone Call, PCS Miami Office, PCS Dallas Office, Other

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
