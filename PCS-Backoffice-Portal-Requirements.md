# PCS Backoffice Portal — Business Requirements

**Document Version:** 1.0  
**Date:** May 4, 2026  
**Stages:** All Stages (1–7)  
**Status:** Draft — Pending Business Sign-Off  
**Prepared by:** Development Team  
**Review Required From:** Business Stakeholders

---

## Purpose

This document describes all functionality planned for the PCS Wireless Sales Backoffice Portal across all delivery stages. It is intended for business stakeholder review to confirm the feature set is complete, correctly scoped per stage, and aligned with business needs before each stage enters development.

Please review each section and indicate:
- **Approved** — functionality is correct as described
- **Change Required** — something needs to be different (add comment)
- **Out of Scope** — functionality should be removed or deferred

---

## Delivery Stages

| Stage | Scope | Status |
|-------|-------|--------|
| **Stage 1** | Support Ticket Agent View | This document |
| **Stage 2** | RMA Management Queue | This document |
| **Stage 3** | Authentication, Dashboard, Customer Search & List, Customer 360 View | This document |
| **Stage 4** | Inventory Browser with Floor Pricing & Quote Creation Tool | This document |
| **Stage 5** | Customer Analytics & AI Insights | This document |
| **Stage 6** | Quote Approvals | This document |
| **Stage 7** | Calendar & Meeting Scheduling (Office 365 Integration) | This document |

> **Note on Authentication:** Basic authentication is a prerequisite for all stages. The full Azure Active Directory (Azure AD) SSO implementation is formally scoped in Stage 3. Stages 1 and 2 may use a simplified login mechanism during development and will be upgraded to Azure AD SSO when Stage 3 is delivered.

---

## Table of Contents

1. [Stage 1 — Support Ticket Agent View](#1-stage-1--support-ticket-agent-view)
2. [Stage 2 — RMA Management Queue](#2-stage-2--rma-management-queue)
3. [Stage 3 — Authentication, Dashboard, Customer Search & Customer 360](#3-stage-3--authentication-dashboard-customer-search--customer-360)
4. [Stage 4 — Inventory Browser & Quote Creation Tool](#4-stage-4--inventory-browser--quote-creation-tool)
5. [Stage 5 — Customer Analytics & AI Insights](#5-stage-5--customer-analytics--ai-insights)
6. [Stage 6 — Quote Approvals](#6-stage-6--quote-approvals)
7. [Stage 7 — Calendar & Meeting Scheduling](#7-stage-7--calendar--meeting-scheduling)
8. [User Roles & Permissions](#8-user-roles--permissions)

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

## 2. Stage 2 — RMA Management Queue

A centralised queue for sales reps to review, approve, or refuse customer return requests (RMAs). Builds on Stage 1 by adding the first transactional workflow to the backoffice.

### User Stories

**US-B-15** — As a sales rep, I want to see a summary of RMA activity (total, pending review, approved, refused) so that I can understand the current returns workload at a glance.

**US-B-16** — As a sales rep, I want to filter the RMA list by status (All, Pending Review, Approved, Refused, Complete) so that I can focus on items needing action.

**US-B-17** — As a sales rep, I want to see the list of RMAs with key details — customer, date, order, device count, complaint reason, and status — so that I can prioritise my review queue.

**US-B-18** — As a sales rep, I want to open a pending RMA and review the specific device IMEIs and complaint reasons so that I can make an informed approval or refusal decision.

**US-B-19** — As a sales rep, I want to approve an RMA by selecting a resolution type (Credit Memo, Replacement, or Partial Credit) and adding notes so that the customer's return is processed correctly.

**US-B-20** — As a sales rep, I want to refuse an RMA by selecting a refusal reason and adding notes so that the customer is informed clearly why their return was declined.

**US-B-21** — As a sales rep, I want to see a notification confirming my approval or refusal action so that I know the action was recorded.

**US-B-22** — As a sales rep, I want the KPI counts and status tab counts to update immediately after I approve or refuse an RMA so that my queue always reflects the current state.

**US-B-23** — As a sales rep, I want to view a completed, approved, or refused RMA in a read-only view so that I can refer back to past decisions.

**US-B-24** — As a sales rep, I want to export the RMA list so that I can use the data in reports or share it with colleagues.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-15 | View RMA dashboard | Sales Rep | Page displays 4 KPI cards: Total RMAs (month to date), Pending Review, Approved (MTD), Refused (MTD) |
| UC-B-16 | Filter by status tab | Sales Rep | RMA list filtered to selected status; tab count badges update dynamically |
| UC-B-17 | View RMA list | Sales Rep | Table shows RMA #, Customer, Date, Order #, Device Count, Complaint Reason, Status badge, and action button |
| UC-B-18 | Open pending RMA for review | Sales Rep | Review modal opens showing RMA reference details and a device table (IMEI, Model, Complaint per device) |
| UC-B-19 | Approve RMA | Sales Rep | Rep selects Resolution Type, adds optional notes, clicks Approve; RMA status changes to Approved; green toast notification appears; KPI and tab counts update |
| UC-B-20 | Refuse RMA | Sales Rep | Rep selects Refusal Reason, adds optional notes, clicks Refuse; RMA status changes to Refused; red toast notification appears; KPI and tab counts update |
| UC-B-21 | View non-pending RMA | Sales Rep | View modal opens in read-only mode showing the same device table plus resolution details (if approved) or refusal reason (if refused) |
| UC-B-22 | Export RMA list | Sales Rep | Current filtered RMA list exported as a file (e.g. CSV) |

### RMA Resolution Types

| Resolution | Meaning |
|------------|---------|
| Credit Memo | A credit is issued to the customer's account |
| Replacement | Replacement devices are sent to the customer |
| Partial Credit | A portion of the original value is credited |

### RMA Refusal Reasons

Warranty Expired, Out of Policy, Damage Not Covered, Insufficient Documentation, Customer Error, Other

### RMA Status Definitions

| Status | Meaning |
|--------|---------|
| Submitted | Customer has submitted the RMA; awaiting staff review |
| Pending Review | RMA is in the staff review queue |
| Approved | RMA has been approved with a resolution assigned |
| Refused | RMA has been declined with a reason recorded |
| Complete | Resolution has been fully processed (credit issued or replacement shipped) |

---

## 3. Stage 3 — Authentication, Dashboard, Customer Search & Customer 360

Delivers the full internal authentication layer (Azure AD SSO), the main backoffice dashboard with account-wide KPIs, the customer directory, and the comprehensive Customer 360 view. This stage transforms the backoffice from a standalone tool set into a fully integrated sales management platform.

### 3.1 Authentication

#### User Stories

**US-B-25** — As a PCS staff member, I want to log in using my Microsoft (@pcsww.com) account via Single Sign-On so that I do not need a separate username and password for the backoffice.

**US-B-26** — As a PCS staff member, I want the login page to display my verified identity (name and email) before I authenticate so that I can confirm I am logging in with the correct account.

**US-B-27** — As the system, when a user attempts to log in with a non-PCS Microsoft account, I want authentication to fail with a clear message directing them to IT, so that the portal is restricted to authorised personnel only.

**US-B-28** — As a PCS staff member whose SSO session has expired, I want to be prompted to re-authenticate through Microsoft so that my session is renewed securely.

#### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-23 | Log in via Azure AD SSO | Staff member | User clicks Sign in with Microsoft; Azure AD authenticates; user is redirected to the backoffice dashboard |
| UC-B-24 | View pre-filled identity | Staff member | Login page displays user's name and @pcsww.com email with a verified checkmark before sign-in is clicked |
| UC-B-25 | Reject non-PCS account | Non-PCS user | Authentication fails; page displays message directing user to IT for access |
| UC-B-26 | Re-authenticate expired session | Staff member | User is redirected to Microsoft login; on success, returned to their previous location in the portal |

---

### 3.2 Dashboard

#### User Stories

**US-B-29** — As a sales rep, I want to see key business metrics (total customers, open RMAs, open tickets, pending quotes, revenue month to date) on the dashboard so that I have an immediate overview of the sales pipeline.

**US-B-30** — As a sales rep, I want quick-action buttons on the dashboard linking to common tasks (Create Quote, View Pending RMAs, Customer Lookup, Schedule Meeting) so that I can navigate to the most-used workflows in one click.

**US-B-31** — As a sales rep, I want to see a recent activity feed showing the latest events across all customers so that I can stay informed about account activity without visiting each customer individually.

**US-B-32** — As a sales rep, I want to see a panel showing my upcoming meetings so that I can prepare for scheduled appointments without opening the calendar.

**US-B-33** — As a sales rep, I want a global search bar in the page header so that I can quickly find a customer, quote, or RMA from anywhere in the portal.

#### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-27 | View dashboard KPIs | Sales Rep | Dashboard displays 5 KPI cards: Total Customers, Open RMAs, Open Tickets, Pending Quotes, Revenue MTD — each with a supporting sub-metric |
| UC-B-28 | Use Quick Action | Sales Rep | Clicking Create Quote, View Pending RMAs, Customer Lookup, or Schedule Meeting navigates to the relevant page |
| UC-B-29 | View recent activity feed | Sales Rep | Last 8–10 account events displayed chronologically with icon, description, and timestamp |
| UC-B-30 | View upcoming meetings | Sales Rep | Next 3–4 meetings shown with customer name, meeting type, date, and time; clicking a meeting opens its detail |
| UC-B-31 | Use global search | Sales Rep | Typing in the header search bar surfaces matching customers, quotes, and RMAs; selecting a result navigates to it |

#### Dashboard KPI Definitions

| KPI | Definition |
|-----|------------|
| Total Customers | Count of active customer accounts |
| Open RMAs | Count of RMAs not yet in Complete or Refused status |
| Open Tickets | Count of support tickets not in Resolved status |
| Pending Quotes | Count of quotes awaiting manager approval |
| Revenue MTD | Total order value invoiced in the current calendar month |

---

### 3.3 Customer Search & List

#### User Stories

**US-B-34** — As a sales rep, I want to search for a customer by company name, email address, or phone number so that I can find a specific account quickly.

**US-B-35** — As a sales rep, I want to filter the customer list by assigned sales rep, location, account status, and primary device type so that I can segment accounts relevant to my work.

**US-B-36** — As a sales rep, I want to reset all active filters with a single button so that I can start a fresh search without manually clearing each filter.

**US-B-37** — As a sales rep, I want to see a results count so that I know how many customers match my current search.

**US-B-38** — As a sales rep, I want to click on a customer row to open that customer's full account view so that I can access their details without additional navigation.

**US-B-39** — As a sales rep, I want to export the filtered customer list as a CSV so that I can use the data in external reports or planning tools.

#### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-32 | Search customers | Sales Rep | Customer list filters in real time to accounts matching the entered text (company name, email, or phone) |
| UC-B-33 | Filter by sales rep | Sales Rep | List filtered to customers assigned to the selected rep |
| UC-B-34 | Filter by location | Sales Rep | List filtered to customers in the selected city/state |
| UC-B-35 | Filter by status | Sales Rep | List filtered to Active, On Hold, or Suspended accounts |
| UC-B-36 | Filter by device type | Sales Rep | List filtered to customers who primarily buy the selected device brand |
| UC-B-37 | Reset filters | Sales Rep | All filters cleared; full customer list restored; result count updates |
| UC-B-38 | View result count | Sales Rep | A count of matching records is displayed (e.g. "Showing 12 customers") |
| UC-B-39 | Open customer account | Sales Rep | Clicking a row navigates to the Customer 360 view for that customer |
| UC-B-40 | Export customer list | Sales Rep | Current filtered list exported as a CSV file |

#### Customer Status Definitions

| Status | Meaning |
|--------|---------|
| Active | Account is in good standing |
| On Hold | Account activity is temporarily paused (e.g. credit review) |
| Suspended | Account access is restricted |

---

### 3.4 Customer 360 View

#### User Stories

**US-B-40** — As a sales rep, I want to see a customer header showing company name, status, location, assigned rep, primary contact, credit limit, available credit, account age, and payment terms so that I have the most important account facts at the top of the page.

**US-B-41** — As a sales rep, I want to navigate between nine tabs (Overview, Invoices, Financial, Shipments, Support Cases, RMA, Quotes, Portal Users, Activity) so that I can access any aspect of the account without leaving the page.

**US-B-42** — As a sales rep, I want the Overview tab to show spending KPIs, open item counts, and recent orders so that I get an at-a-glance summary of the account's activity.

**US-B-43** — As a sales rep, I want the Invoices tab to show the customer's full invoice history so that I can answer billing questions.

**US-B-44** — As a sales rep, I want the Financial tab to show the account balance summary and aging breakdown so that I can assess collection risk.

**US-B-45** — As a sales rep, I want the Shipments tab to show active and recent shipments for the account so that I can respond to delivery queries.

**US-B-46** — As a sales rep, I want the Support Cases tab to show all open support tickets for the account so that I can see what service issues are in progress.

**US-B-47** — As a sales rep, I want the RMA tab to show the customer's full return history and return rate percentage so that I can monitor return behaviour.

**US-B-48** — As a sales rep, I want the Quotes tab to show all open and historical quotes for the account so that I can track deal progression.

**US-B-49** — As a sales admin, I want the Portal Users tab to show all sub-users on the customer's portal account so that I can manage access on behalf of the customer.

**US-B-50** — As a sales admin, I want to invite a new portal user for a customer by entering their details and setting an initial password so that the user can access the customer portal immediately.

**US-B-51** — As a sales admin, I want to reset a portal user's password by setting a temporary password so that the user can regain access if they are locked out.

**US-B-52** — As a sales rep, I want the Activity tab to show a chronological timeline of the customer's account events so that I can see what actions they have taken recently.

**US-B-53** — As a sales rep, I want the Activity tab to show what the customer has recently searched for in the portal so that I can understand their product interests and prepare relevant offers.

#### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-41 | View customer header | Sales Rep | Page shows company name, status badge, location, sales rep, contact details, and 4 quick-stat cards (Credit Limit, Available Credit, Account Age, Payment Terms) |
| UC-B-42 | Navigate tabs | Sales Rep | Clicking a tab shows the corresponding content panel; active tab is highlighted |
| UC-B-43 | Return to customer list | Sales Rep | Clicking Back to Customers navigates to the customer list, preserving any active filters |
| UC-B-44 | View Overview tab | Sales Rep | Shows KPIs (Total Spending, Open RMAs, RMA %, Open Tickets, Open Offers) and a recent orders table |
| UC-B-45 | View Invoices tab | Sales Rep | Invoice table shows Invoice #, Date, Amount, Due Date, Status, Balance |
| UC-B-46 | View Financial tab | Sales Rep | Account balance summary and aging breakdown (Current, 30, 60, 90+ days) displayed |
| UC-B-47 | View Shipments tab | Sales Rep | Active and recent shipments table displayed |
| UC-B-48 | View Support Cases tab | Sales Rep | Open support tickets for the account listed with status and priority |
| UC-B-49 | View RMA tab | Sales Rep | RMA history table with return rate % indicator |
| UC-B-50 | View Quotes tab | Sales Rep | Open and historical quotes table with status and value |
| UC-B-51 | View Portal Users tab | Sales Admin | User table shows Name, Email, Phone, Role, Status, Last Login, and action buttons |
| UC-B-52 | Invite portal user | Sales Admin | Admin fills in first name, last name, email, phone, role, and sets an initial password; submits; new user row appears with Pending Invite status; user receives access |
| UC-B-53 | Reset portal user password | Sales Admin | Admin sets a temporary password; submits; user is required to change password on next login; confirmation toast displayed |
| UC-B-54 | View Activity timeline | Sales Rep | Chronological log of account events (logins, orders, downloads, quote requests) displayed |
| UC-B-55 | View recent portal searches | Sales Rep | Sidebar shows the search terms the customer has recently entered in the customer portal |

#### Portal User Role Definitions

| Role | Access Level |
|------|-------------|
| Admin | Full access to customer portal including user management |
| Buyer | Can create orders, view financial data |
| Viewer | Read-only access |

---

## 4. Stage 4 — Inventory Browser & Quote Creation Tool

Gives sales reps visibility into live inventory across warehouse locations, including tier pricing and floor prices, and the ability to build and submit custom quotes for customers.

### 4.1 Inventory Browser

#### User Stories

**US-B-54** — As a sales rep, I want to see an ERP sync status banner so that I know when inventory data was last updated and understand it cannot be edited here.

**US-B-55** — As a sales rep, I want to see inventory KPIs (total SKUs, total units, warehouses, low stock alerts) so that I have an overview of stock health.

**US-B-56** — As a sales rep, I want to filter inventory by warehouse/location so that I can see what is available at a specific facility.

**US-B-57** — As a sales rep, I want to filter inventory by brand, grade, and storage so that I can find specific products quickly.

**US-B-58** — As a sales rep, I want to search inventory by product name, SKU, or lot ID so that I can locate a specific item.

**US-B-59** — As a sales rep, I want to see a low stock indicator on items with limited availability so that I know to set expectations with the customer.

**US-B-60** — As a sales rep, I want to expand an inventory row to see the full price tier breakdown (quantity ranges and prices) so that I know exactly what pricing to offer a customer at a given volume.

**US-B-61** — As a sales rep, I want to see the floor price for each product so that I know the minimum price I am allowed to quote.

**US-B-62** — As a sales rep, I want margin percentages colour-coded (green, amber, red) based on distance from floor price so that I can instantly judge whether a price is acceptable.

#### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-56 | View inventory KPIs | Sales Rep | Page displays 4 KPI cards: Total SKUs, Total Units, Warehouses, Low Stock Alerts |
| UC-B-57 | View ERP sync status | Sales Rep | Banner shows last sync time and a note that data is read-only |
| UC-B-58 | Filter by warehouse | Sales Rep | Inventory list filtered to the selected warehouse location |
| UC-B-59 | Filter by brand/grade/storage | Sales Rep | Inventory list filtered by selected combination of dimensions |
| UC-B-60 | Search inventory | Sales Rep | List filtered in real time to products matching the search term |
| UC-B-61 | Reset filters | Sales Rep | All filters and search cleared; full inventory list restored |
| UC-B-62 | Identify low stock items | Sales Rep | Items with limited stock display an amber indicator in the quantity column |
| UC-B-63 | Expand row for price tiers | Sales Rep | Clicking a row reveals a price tier table (quantity range, unit price, margin from floor) and product details (colour, warehouse, stock status, floor price) |
| UC-B-64 | Read margin indicators | Sales Rep | Margin % displayed in green (>20%), amber (10–20%), or red (<10%) |

---

### 4.2 Quote Creation Tool

#### User Stories

**US-B-63** — As a sales rep, I want to select a customer before building a quote so that the quote is correctly associated with the right account.

**US-B-64** — As a sales rep, I want to browse a product catalog and search or filter by brand so that I can find the products to include in a quote.

**US-B-65** — As a sales rep, I want to add products to a quote builder and see the quote summary update in real time so that I can construct an offer efficiently.

**US-B-66** — As a sales rep, I want the tier price to auto-update based on the quantity I enter so that the correct volume pricing is applied automatically.

**US-B-67** — As a sales rep, I want to enter a custom price per unit and see the resulting margin calculated instantly so that I can make informed pricing decisions.

**US-B-68** — As a sales rep, I want to be clearly warned if my custom price is below the floor price so that I do not accidentally submit an unacceptable quote.

**US-B-69** — As a sales rep, I want to add notes to a quote so that I can provide context for the approving manager.

**US-B-70** — As a sales rep, I want to save a quote as a draft so that I can return to it later before submitting.

**US-B-71** — As a sales rep, I want to submit a completed quote for manager approval so that the deal can progress to the customer.

**US-B-72** — As a sales rep, I want to view and manage all my existing quotes (Draft, Submitted, Approved, etc.) in a management view so that I can track the status of every deal.

**US-B-73** — As a sales rep, I want to withdraw a quote that has not yet been approved so that I can cancel a deal that is no longer relevant.

#### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-65 | Select customer | Sales Rep | Customer selected from dropdown; quote is associated with that account |
| UC-B-66 | Browse product catalog | Sales Rep | Products displayed as cards with name, grade, storage, colour, price tiers, available quantity, and floor price |
| UC-B-67 | Search/filter catalog | Sales Rep | Catalog filtered by search term or brand filter in real time |
| UC-B-68 | Add product to quote | Sales Rep | Product added to Quote Builder panel; line item shows product details, quantity, tier price, and custom price input |
| UC-B-69 | Adjust quantity | Sales Rep | Quantity updated; tier price auto-recalculates based on new quantity range |
| UC-B-70 | Enter custom price | Sales Rep | Custom price entered; margin calculated as ((custom price − floor price) / custom price × 100)%; margin displayed with colour coding |
| UC-B-71 | Trigger below-floor warning | Sales Rep | If custom price < floor price: input highlighted red, warning icon shown, margin shown as negative |
| UC-B-72 | Remove product from quote | Sales Rep | Line item removed from Quote Builder; summary totals update |
| UC-B-73 | Add notes | Sales Rep | Notes textarea filled; notes saved with the quote and visible to the approving manager |
| UC-B-74 | Save as draft | Sales Rep | Quote saved with Draft status; accessible in Quote Management view for future editing |
| UC-B-75 | Submit quote | Sales Rep | Quote submitted with Submitted status; enters manager approval queue; toast confirmation shown |
| UC-B-76 | View quote management | Sales Rep | Tab shows all quotes with status filter, columns for Quote #, Customer, Date, Items, Total, Margin %, Status, and action buttons |
| UC-B-77 | Withdraw quote | Sales Rep | Quote that has not yet been approved is cancelled; status updated to Withdrawn |

### Quote Statuses

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

### Margin Colour Coding

| Range | Colour | Meaning |
|-------|--------|---------|
| > 20% | Green | Healthy margin |
| 10–20% | Amber | Acceptable but worth noting |
| < 10% | Red | Below acceptable threshold |

---

## 5. Stage 5 — Customer Analytics & AI Insights

Adds an analytics layer to the Customer 360 view and a standalone insights dashboard. Uses AI to surface purchase behaviour patterns, flag at-risk accounts, and highlight aging inventory opportunities. This stage is data-driven and requires sufficient transaction history to be meaningful.

### User Stories

**US-B-74** — As a sales rep, I want to see a customer's purchase behaviour analytics (order frequency, average order value, top product categories, preferred grades) so that I can tailor my outreach and recommendations.

**US-B-75** — As a sales rep, I want to see an AI-generated product recommendation for each customer based on their purchase history so that I can proactively suggest relevant products.

**US-B-76** — As a sales rep, I want to be alerted when a customer's order frequency or spend has declined significantly so that I can proactively engage at-risk accounts before they churn.

**US-B-77** — As a sales manager, I want to see an aging inventory insights panel that identifies products with slow movement and suggests pricing adjustments so that we can reduce overstock.

**US-B-78** — As a sales manager, I want to see which customers are the best fit for clearing slow-moving inventory so that I can target them with specific offers.

**US-B-79** — As a sales rep, I want to see a spend trend chart for each customer showing month-by-month order value over the past 12 months so that I can identify growth or decline patterns.

**US-B-80** — As a sales rep, I want to see customer segmentation (e.g. High Value, Growth, At Risk, Dormant) applied to the customer list so that I can prioritise outreach effectively.

**US-B-81** — As a sales manager, I want to see an AI-generated summary of a customer account (key facts, recent trends, recommended actions) so that I can brief myself quickly before a customer call.

**US-B-82** — As a sales rep, I want to export analytics data for a customer or the full portfolio so that I can use it in external reporting.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-78 | View customer purchase behaviour | Sales Rep | Analytics panel in Customer 360 shows: order frequency, average order value, top categories, preferred grade, spend trend chart (12 months) |
| UC-B-79 | View AI product recommendations | Sales Rep | AI-generated list of recommended products for the customer based on purchase history, displayed with reasoning |
| UC-B-80 | View at-risk customer alert | Sales Rep | Customers with significantly declining order frequency or spend flagged with an alert badge in the customer list and on the customer header |
| UC-B-81 | View AI account summary | Sales Rep | One-paragraph AI-generated summary of the customer account surfaced at the top of the Customer 360 view, covering key facts, recent trends, and suggested next actions |
| UC-B-82 | View aging inventory insights | Sales Manager | Dashboard panel shows slow-moving SKUs with days-in-stock, current quantity, and AI-suggested price adjustment to stimulate movement |
| UC-B-83 | View best-fit customers for clearance | Sales Manager | For each aging SKU, a list of customers most likely to purchase (based on purchase history) is surfaced with suggested outreach action |
| UC-B-84 | View customer segments | Sales Rep | Customer list displays a segment badge per account (High Value, Growth, At Risk, Dormant) based on AI classification |
| UC-B-85 | Filter by segment | Sales Rep | Customer list filter includes segment dimension; list filtered to selected segment |
| UC-B-86 | Export analytics data | Sales Rep / Manager | Customer analytics data or portfolio summary exported as a file (CSV or PDF) |

### Customer Segment Definitions

| Segment | Definition |
|---------|------------|
| High Value | Consistently high spend and order frequency |
| Growth | Order frequency or spend increasing quarter-over-quarter |
| At Risk | Declining order frequency or spend versus prior period |
| Dormant | No orders placed in the past 90 days |

---

## 6. Stage 6 — Quote Approvals

A manager-only approval queue where Sales Managers review quotes submitted by sales reps and approve, counter-offer, or reject them before they reach the customer.

### User Stories

**US-B-83** — As a sales manager, I want to see a summary of the quote approval queue (pending, approved MTD, counter-offered, average margin) so that I can understand the volume and quality of deals in progress.

**US-B-84** — As a sales manager, I want to filter the approval queue by status tab so that I can focus on pending quotes or review historical decisions.

**US-B-85** — As a sales manager, I want to open a pending quote and see the rep's notes, all line items, and each item's catalog price, floor price, offered price, and margin so that I can make an informed decision.

**US-B-86** — As a sales manager, I want to approve a quote as submitted so that it proceeds to the customer without modification.

**US-B-87** — As a sales manager, I want to counter-offer a quote by entering adjusted prices on individual line items and adding a note so that I can propose better terms without rejecting the deal outright.

**US-B-88** — As a sales manager, I want to reject a quote by selecting a reason and adding notes so that the sales rep understands why the deal cannot proceed.

**US-B-89** — As a sales manager, I want to receive a confirmation notification after each approval decision so that I know the action was recorded.

**US-B-90** — As a sales manager, I want the KPI counts and status tabs to update immediately after I take an approval action so that the queue always reflects current state.

**US-B-91** — As a sales manager, I want to view the details of a historical quote (approved, counter-offered, or rejected) in read-only mode so that I can refer back to past decisions.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-87 | View approval queue KPIs | Sales Manager | Page displays 4 KPI cards: Pending Approval, Approved MTD, Counter-Offered, Average Margin % |
| UC-B-88 | Filter by status tab | Sales Manager | Queue filtered to selected status; counts update |
| UC-B-89 | View queue table | Sales Manager | Table shows Quote #, Customer, Sales Rep, Date, Total ($), Margin % (colour-coded), Status, and action button |
| UC-B-90 | Open pending quote for review | Sales Manager | Review modal opens showing: Quote #, Customer, Rep, Date, Rep notes, and line items table (Product, Qty, Catalog Price, Floor Price, Offered Price, Margin %, Adjusted Price column) |
| UC-B-91 | Approve quote | Sales Manager | Manager clicks Approve; quote status changes to Approved; green toast notification; KPI and table update |
| UC-B-92 | Counter-offer quote | Sales Manager | Manager clicks Counter-Offer; Adjusted Price inputs on each line item become editable; manager enters prices and notes; clicks Send Counter-Offer; status changes to Counter-Offered; amber toast; KPI and table update |
| UC-B-93 | Reject quote | Sales Manager | Manager clicks Reject; rejection reason dropdown and notes field appear; manager selects reason and clicks Confirm Rejection; status changes to Rejected; red toast; KPI and table update |
| UC-B-94 | View historical quote | Sales Manager | View modal opens in read-only mode; shows counter-offer notes (amber background) or rejection reason and notes (red background) depending on outcome |

### Quote Approval Actions

| Action | Actor | Status After | Notification |
|--------|-------|-------------|--------------|
| Approve | Sales Manager | Approved | Green toast |
| Counter-Offer | Sales Manager | Counter-Offered | Amber toast |
| Reject | Sales Manager | Rejected | Red toast |

### Rejection Reasons

Price Below Acceptable, Account on Hold, Margin Too Low, Product Unavailable, Customer Credit Issue, Other

---

## 7. Stage 7 — Calendar & Meeting Scheduling

A calendar interface integrated with Microsoft Office 365 that allows sales reps to schedule, view, and manage customer meetings and internal appointments, with automatic Outlook calendar invites.

### User Stories

**US-B-92** — As a sales rep, I want to see a visual calendar of all my scheduled meetings so that I have a clear picture of my availability.

**US-B-93** — As a sales rep, I want to switch between a weekly and monthly calendar view so that I can plan at different levels of detail.

**US-B-94** — As a sales rep, I want to navigate to previous and future weeks or months so that I can review past meetings and plan upcoming ones.

**US-B-95** — As a sales rep, I want to see my Office 365 connection status and last sync time so that I know my calendar is up to date.

**US-B-96** — As a sales rep, I want to create a new meeting by entering a title, description, date, start and end time, meeting type, linked customer, and location so that the meeting is fully documented.

**US-B-97** — As a sales rep, I want to send an Outlook calendar invite as part of creating a meeting so that the customer and I both have the appointment in our calendars.

**US-B-98** — As a sales rep, I want meetings to be colour-coded by type (Customer Review, Quote Discussion, Support Follow-up, Product Demo, Onboarding, Internal) so that I can distinguish meeting purposes at a glance.

**US-B-99** — As a sales rep, I want to click on a meeting block to see its full details (title, customer, type, location, description) so that I can review what was planned without opening a separate page.

**US-B-100** — As a sales rep, I want to see a sidebar listing my next upcoming meetings so that I can check what is coming without navigating away from the page.

**US-B-101** — As a sales rep, I want to edit a meeting's details (time, description, location) so that I can update arrangements when they change.

**US-B-102** — As a sales rep, I want to cancel a meeting so that it is removed from both the calendar and any associated Outlook invites.

### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-95 | View weekly calendar | Sales Rep | Calendar displays a 7-column grid (Mon–Sun) with time slots from 8am to 5pm; meeting blocks placed at correct times |
| UC-B-96 | View monthly calendar | Sales Rep | Calendar displays a full-month grid with meeting indicators (coloured dot + title) per day |
| UC-B-97 | Navigate calendar | Sales Rep | Clicking Previous/Next arrows moves to the prior or next period; Today button returns to the current week/month |
| UC-B-98 | View Office 365 status | Sales Rep | Banner displays Microsoft logo, connected email address, and last sync timestamp with a green status dot |
| UC-B-99 | Create meeting | Sales Rep | Modal opened; rep fills Title, Description, Date, Start Time, End Time, Meeting Type, Customer, Location, and Send Outlook Invite checkbox; clicks Create Meeting; meeting appears on calendar with type colour |
| UC-B-100 | Send Outlook invite | Sales Rep | When Send Outlook Invite is checked (default), calendar invite sent to customer and rep via Office 365 on meeting creation |
| UC-B-101 | Skip Outlook invite | Sales Rep | When Send Outlook Invite is unchecked, meeting is saved locally without sending an email invite |
| UC-B-102 | View meeting detail | Sales Rep | Clicking a meeting block opens a detail modal showing title, date, time range, customer, type badge, location, and description |
| UC-B-103 | View upcoming meetings sidebar | Sales Rep | Sidebar lists next 3–4 meetings with type colour dot, title, time, and customer name; clicking a meeting opens its detail modal |
| UC-B-104 | Edit meeting | Sales Rep | Sales rep opens a meeting's detail and edits time, description, or location; changes saved; Outlook invite updated if applicable |
| UC-B-105 | Cancel meeting | Sales Rep | Sales rep cancels a meeting; it is removed from the calendar; cancellation notice sent via Outlook if an invite was sent |

### Meeting Types

| Type | Colour | Use Case |
|------|--------|---------|
| Customer Review | Blue | Regular account check-in |
| Quote Discussion | Purple | Quote negotiation or presentation |
| Support Follow-up | Amber | Follow-up on an escalated ticket |
| Product Demo | Green | Product demonstration |
| Onboarding | Blue | New customer onboarding call |
| Internal | Grey | Internal team meetings |

### Meeting Location Options

Microsoft Teams, Phone Call, PCS Miami Office, PCS Dallas Office, Other

---

## 8. User Roles & Permissions

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

## Sign-Off

This document covers all seven planned stages of the PCS Backoffice Portal. Please indicate your sign-off decision for each stage separately.

| Stage | Reviewer | Role | Decision | Date | Comments |
|-------|----------|------|----------|------|----------|
| Stage 1 — Support Tickets | | | | | |
| Stage 2 — RMA Management | | | | | |
| Stage 3 — Auth, Dashboard, Customers | | | | | |
| Stage 4 — Inventory & Quotes | | | | | |
| Stage 5 — Analytics & AI Insights | | | | | |
| Stage 6 — Quote Approvals | | | | | |
| Stage 7 — Calendar & Meetings | | | | | |

**Decision options:** Approved / Approved with Changes / Not Approved

---

*End of Document*
