# PCS Sales Portal — Business Requirements

**Document Version:** 1.0  
**Date:** May 7, 2026  
**Status:** Draft — Pending Business Sign-Off  
**Prepared by:** Development Team  
**Review Required From:** Business Stakeholders

---

## Purpose

This document describes the functionality of the PCS Wireless Sales Portal. **Stage 1** is fully scoped with user stories and use cases for business sign-off. Remaining features are summarised by feature area for visibility; each will receive its own full requirements and sign-off process before entering development.

Please review Stage 1 and indicate:
- **Approved** — functionality is correct as described
- **Change Required** — something needs to be different (add comment)
- **Out of Scope** — functionality should be removed or deferred

---

## Delivery Stages

| Stage | Scope | Status |
|-------|-------|--------|
| **Stage 1** | Authentication, Support Ticket Agent View, Customer Search & List, Customer 360 — Core | **This document** |
| Future | RMA Management, Dashboard KPIs, Inventory Browser, Quote Creation & Approvals, Customer Analytics & AI Insights, Calendar & Meeting Scheduling | Upcoming |

---

## Table of Contents

1. [Stage 1 — Core Functionality](#1-stage-1--core-functionality)
2. [User Roles & Permissions](#2-user-roles--permissions)
3. [Out of Scope](#3-out-of-scope)

---

## 1. Stage 1 — Core Functionality

Stage 1 delivers the foundational layer of the Sales Portal: authentication, the support ticket agent view, and core customer account management. These features provide immediate operational value and establish the data and access patterns used by all future stages.

---

### 1.1 Authentication

Authentication is powered by Auth0 integrated with Microsoft Entra ID. Staff log in with their existing @pcsww.com Microsoft account — no separate credentials are required. Non-PCS accounts are rejected at the Auth0 layer. Session management and token handling are managed by Auth0.

#### User Stories

**US-B-01** — As a staff member, I want to log in to the Sales Portal using my PCS Microsoft account so that I do not need a separate username and password.

#### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-01 | Sign in via Auth0 / Entra ID | Staff Member | Authenticated using @pcsww.com credentials via Auth0; non-PCS accounts are rejected with a message directing the user to IT; on success, user is taken to the main portal view |

---

### 1.2 Support Ticket Agent View

A two-panel support interface allowing sales reps and support agents to view, manage, and respond to customer support tickets.

#### User Stories

**US-B-02** — As a support agent, I want to see a list of all customer support tickets so that I can triage and respond to open requests.

**US-B-03** — As a support agent, I want to filter tickets by status (Open, In Progress, Waiting, Resolved) so that I can focus on tickets that need attention.

**US-B-04** — As a support agent, I want to filter tickets by priority (Urgent, High, Normal, Low) so that I can handle the most critical issues first.

**US-B-05** — As a support agent, I want to filter tickets by category (Order Issue, Shipping, RMA, Billing, Quote, Certificate, General) so that I can work through a specific type of request.

**US-B-06** — As a support agent, I want to filter tickets by assigned sales rep so that I can view only the tickets relevant to my accounts.

**US-B-07** — As a support agent, I want to select a ticket from the list and see the full conversation thread in a detail panel so that I can understand the complete history before responding.

**US-B-08** — As a support agent, I want to read customer messages and previous agent replies in a clear threaded view so that I can follow the dialogue without confusion.

**US-B-09** — As a support agent, I want to type and send a reply to a customer ticket so that I can respond to their request directly from the portal.

**US-B-10** — As a support agent, I want to add an internal note to a ticket that is only visible to staff so that I can communicate context to colleagues without the customer seeing it.

**US-B-11** — As a support agent, I want to change the status of a ticket (Open → In Progress → Waiting → Resolved) so that the ticket lifecycle is accurately tracked.

**US-B-12** — As a support agent, I want to change the priority of a ticket so that escalations are reflected immediately.

**US-B-13** — As a support agent, I want to reassign a ticket to another agent or sales rep so that the right person handles the issue.

**US-B-14** — As a support agent, I want to see a visual priority indicator (colour-coded dot) on each ticket in the list so that I can spot urgent tickets at a glance without reading every row.

**US-B-15** — As a support agent, I want to see an empty state when no ticket is selected so that the interface is clear and I know to choose a ticket from the list.

#### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-02 | View ticket list | Agent | All tickets displayed with ID, subject, customer, category, priority indicator, status, and last updated timestamp |
| UC-B-03 | Filter by status | Agent | Ticket list filtered to the selected status; count updates |
| UC-B-04 | Filter by priority | Agent | Ticket list filtered to the selected priority level |
| UC-B-05 | Filter by category | Agent | Ticket list filtered to the selected category |
| UC-B-06 | Filter by sales rep | Agent | Ticket list filtered to tickets assigned to the selected rep |
| UC-B-07 | Select ticket | Agent | Right panel displays the full ticket detail and conversation thread; selected ticket highlighted in list |
| UC-B-08 | Deselect ticket | Agent | Pressing Escape or clicking elsewhere deselects the ticket; right panel returns to empty state |
| UC-B-09 | Read conversation thread | Agent | Customer messages shown right-aligned (blue); agent messages shown left-aligned (white with Agent badge); internal notes shown left-aligned (amber with Internal Note badge, italic text) |
| UC-B-10 | Reply to ticket | Agent | Agent types reply in textarea, clicks Send; message added to thread with agent name, timestamp, and Agent badge; customer is notified |
| UC-B-11 | Add internal note | Agent | Agent switches to Internal Note mode, types note, clicks Add; note appears in thread with amber background and Internal Note badge; not visible to customer |
| UC-B-12 | Change ticket status | Agent | Status dropdown updated; change reflected in ticket list and detail header immediately |
| UC-B-13 | Change ticket priority | Agent | Priority dropdown updated; priority indicator in ticket list updates immediately |
| UC-B-14 | Reassign ticket | Agent | Assignee dropdown updated to selected agent or sales rep |
| UC-B-15 | View empty state | Agent | When no ticket is selected, right panel displays a centred icon and "Select a ticket to view details" message |

#### Ticket Status Definitions

| Status | Meaning |
|--------|---------|
| Open | Ticket has been submitted and is awaiting first response |
| In Progress | A staff member is actively working on the issue |
| Waiting | Response has been sent; awaiting customer reply |
| Resolved | Issue has been closed |

#### Ticket Priority Definitions

| Priority | Indicator | Meaning |
|----------|-----------|---------|
| Urgent | Red dot | Business-critical issue requiring immediate response |
| High | Amber dot | Important issue to be addressed same day |
| Normal | Blue dot | Standard request with no time pressure |
| Low | Grey dot | Minor or informational request |

#### Ticket Categories

Order Issue, Shipping, RMA Enquiry, Billing, Quote, Certificate, General

#### Reply vs Internal Note

| Mode | Visibility | Background |
|------|-----------|------------|
| Reply | Customer and staff | White (agent message) |
| Internal Note | Staff only | Amber |

---

### 1.3 Customer Search & List

A searchable, filterable directory of customer accounts. Sales reps and managers can locate accounts quickly and navigate directly to the Customer 360 view.

#### User Stories

**US-B-16** — As a sales rep, I want to search for a customer by company name, email address, or phone number so that I can quickly find the account I need.

**US-B-17** — As a sales rep, I want to filter the customer list by account status (Active, On Hold, Suspended) so that I can identify accounts that require attention.

**US-B-18** — As a sales rep, I want to see a count of matching customer records so that I know how many results are returned.

**US-B-19** — As a sales rep, I want to click a customer row to open their account so that I can view their full details.

#### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-16 | Search customers | Sales Rep / Manager | Real-time filtering of list by company name, email address, or phone number |
| UC-B-17 | Filter by account status | Sales Rep / Manager | Customer list filtered to Active, On Hold, or Suspended accounts |
| UC-B-18 | View result count | Sales Rep / Manager | Count of matching records shown (e.g. "Showing 12 customers") |
| UC-B-19 | Open customer account | Sales Rep / Manager | Navigates to the Customer 360 view for the selected customer |

---

### 1.4 Customer 360 View

A profile view for each customer account. Stage 1 delivers the account header and the Portal Users tab, which enables sales reps to manage who has access to the customer-facing portal on behalf of the account.

#### User Stories

**US-B-20** — As a sales rep, I want to view a customer's key account information (company name, status, location, sales rep, primary contact, credit limit, account age) so that I have full context before interacting with the account.

**US-B-21** — As a sales rep, I want to see a list of authorised portal users for a customer account so that I know who currently has access on the customer's behalf.

**US-B-22** — As a sales rep, I want to invite a new portal user for a customer account so that I can grant them access to the customer portal.

**US-B-23** — As a sales rep, I want to reset the password for a portal user so that I can help them regain access without contacting IT.

**US-B-24** — As a sales rep, I want to deactivate a portal user so that I can revoke access when a contact leaves the customer's organisation.

#### Use Cases

| ID | Use Case | Actor | Outcome |
|----|----------|-------|---------|
| UC-B-20 | View customer header | Sales Rep / Manager | Company name, status badge, location, assigned sales rep, primary contact, credit limit, available credit, and account age displayed |
| UC-B-21 | View portal users | Sales Rep / Manager | Table of authorised portal users with name, email, role, and status |
| UC-B-22 | Invite portal user | Sales Rep / Manager | Invitation email sent to the specified address; user record created with Pending status |
| UC-B-23 | Reset portal user password | Sales Rep / Manager | Password reset email sent to the user's registered email address |
| UC-B-24 | Deactivate portal user | Sales Rep / Manager | User status set to Inactive; customer portal access revoked immediately |

---

## 2. User Roles & Permissions

### Role Definitions

| Role | Description |
|------|-------------|
| Sales Representative | Full access to all Stage 1 features; cannot approve quotes in future stages |
| Sales Manager | Full access to all stages including future quote approvals and AI insights |
| Support Agent | Access to support ticket view only; cannot access customer accounts or financial data |

### Access Matrix — Stage 1

| Feature | Sales Rep | Sales Manager | Support Agent |
|---------|-----------|---------------|---------------|
| Sign in via Auth0 / Entra ID | ✓ | ✓ | ✓ |
| View support tickets | ✓ | ✓ | ✓ |
| Reply to tickets | ✓ | ✓ | ✓ |
| Add internal notes | ✓ | ✓ | ✓ |
| Change ticket status / priority / assignee | ✓ | ✓ | ✓ |
| Search & view customer list | ✓ | ✓ | — |
| View Customer 360 | ✓ | ✓ | — |
| Manage portal users (invite / reset / deactivate) | ✓ | ✓ | — |

---

## 3. Out of Scope

The following features are planned for future delivery. Each feature area will receive its own full requirements and sign-off process before development begins.

| Feature Area | Description |
|-------------|-------------|
| Backoffice Dashboard | Account-wide KPI cards (Total Customers, Open RMAs, Open Tickets, Pending Quotes, Revenue MTD), quick action buttons, recent activity feed, and upcoming meetings panel |
| RMA Management Queue | Centralised queue for reviewing, approving, or refusing customer return requests; resolution tracking with credit memo, replacement, or partial credit outcomes |
| Advanced Customer 360 | Invoice history, financial aging breakdown, shipments, RMA history, open quotes, and chronological account activity log |
| Inventory Browser | Live inventory view across warehouse locations with tier pricing, floor prices, low-stock indicators, and margin colour coding |
| Quote Creation Tool | Build and submit custom product quotes for customers, with product catalog browsing, custom pricing, draft saving, and manager submission |
| Quote Approvals | Manager-only approval queue for reviewing, approving, counter-offering, or rejecting submitted quotes |
| Customer Analytics & AI Insights | Purchase behaviour analytics, AI-generated account summaries, at-risk customer alerts, aging inventory recommendations, and customer segmentation |
| Calendar & Meeting Scheduling | Office 365–integrated calendar for scheduling and managing customer meetings with Outlook invite sync |

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
