# PCS Wireless Customer Portal — Catalog ↔ NetSuite Field Mapping

**Document Version:** 0.2 (Draft for review)
**Date:** July 10, 2026
**Scope:** The item information shown in the **customer portal catalog** (list card, product detail view, filters, and the sales-estimate line items it feeds) and where each field is sourced from in **NetSuite**.
**Prepared by:** Development / Business Analysis
**Status:** Draft — NetSuite custom-field internal IDs to be confirmed with the NetSuite administrator

---

## Purpose

Before wiring the catalog to live data, we need an agreed mapping between **what the portal displays about each item** and **the NetSuite field it comes from**. This document lists every catalog data point, its NetSuite source, the field type, and any transformation applied on the way to the screen.

> **⚠ Confirm with NetSuite admin.** Standard NetSuite fields are named with confidence below. Domain attributes (grade, storage, colour, carrier, model, etc.) are almost certainly **custom item fields**; the `custitem_*` IDs shown are *conventional placeholders* and must be replaced with PCS's actual internal field IDs before development.

---

## Integration flow

NetSuite is the system of record. Item master + inventory data flows to the portal through the integration layer, not directly:

```
NetSuite (Item record + Inventory)  →  Boomi integration  →  Portal database
        (devices, device_inventory, locations)             →  Catalog UI
```

- The portal reads from its own tables (`devices`, `device_inventory`, `locations`), populated by a sync job (`POST /api/integrations/boomi/inventory/sync`).
- Therefore each row below has an implicit middle hop: **NetSuite field → integration payload → portal `devices`/inventory column → UI**. The "Portal field" column is the UI-facing name; the "NetSuite source" column is the origin.
- Pricing negotiation is **not** a catalog concern — the catalog shows an indicative "from" price only; firm pricing is handled later in the sales-estimate flow.

---

## 1. Identity & naming

| Portal field (what the customer sees) | NetSuite source field | NetSuite field type | Transform / notes |
|---|---|---|---|
| Item key (internal, not displayed) | `internalId` | Internal ID | Primary key for the catalog row; used to link estimate/order lines back to the item. |
| SKU (shown on estimate/order lines) | `itemid` | Name/Number (standard) | Displayed as the SKU on sales-estimate line items, not on the catalog card. |
| Product name (card + detail title) | `displayname` (fallback `itemid`) | Display Name (standard) | If Display Name is empty, compose from Model + Storage + Colour. |
| Brand / Manufacturer | `manufacturer` **or** `custitem_brand` ⚠ | Standard or Free-Form Text | Used on the detail spec grid; also a catalog **filter**. Confirm whether PCS uses the standard Manufacturer field or a custom one. |
| Model | `custitem_model` ⚠ | List/Record or Text | Detail spec grid + **filter**. |
| Model family (grouping) | `custitem_model_family` ⚠ | List/Record or Text | Used to group variants for filtering. |
| Category / Device class | Item **Class** or `custitem_device_category` ⚠ | List/Record | Drives the category icon (Smartphones, Tablets, Laptops, Wearables, Accessories) and the category **filter**. Confirm whether category = NetSuite Class, Category, or a custom field. |

---

## 2. Condition & specifications

| Portal field | NetSuite source field | NetSuite field type | Transform / notes |
|---|---|---|---|
| Grade (A / B) | `custitem_grade` ⚠ | List/Record | Drives the **grade badge** and links to the grading guide. Filter. Confirm the NetSuite grade value set maps to the portal's A/B (and any future grades). |
| Storage | `custitem_storage` ⚠ | Integer or List | Displayed as `128GB`; part of the spec line and **filter**. Store the raw number; portal appends "GB". |
| Colour | `custitem_color` ⚠ | List/Record | Spec line + **filter**. |
| Carrier | `custitem_carrier` ⚠ | List/Record | Spec line + **filter** (Unlocked, AT&T, T-Mobile, Verizon…). Omitted for products where it doesn't apply (e.g. laptops). |
| Screen size *(detail, optional)* | `custitem_screen_size` ⚠ | Text/Decimal | Shown in the detail spec grid if present. |
| Kit type *(detail, optional)* | `custitem_kit_type` ⚠ | List/Record | Detail spec grid. |
| Modular *(detail, optional)* | `custitem_modular` ⚠ | Checkbox/List | Detail spec grid. |
| Region *(optional)* | `custitem_region` ⚠ | List/Record | Optional filter; confirm if customer-facing. |
| Product notes / description *(detail)* | `salesdescription` | Sales Description (standard) | Shown in the detail view "Product notes" area. |

> Attributes that do not apply to a product type (e.g. carrier for a laptop, storage for a wearable) are **omitted**, not shown blank — so every field above should tolerate an empty value.

---

## 3. Media

| Portal field | NetSuite source field | NetSuite field type | Transform / notes |
|---|---|---|---|
| Primary image / thumbnail | `storedisplayimage` **or** File Cabinet URL ⚠ | Image / File | **Currently a category-based placeholder icon** in the portal. Confirm whether product photography lives in NetSuite (item image / file cabinet) or an external DAM/URL. |
| Additional images (gallery) | `custitem_images` ⚠ | Multi-file / URL list | Optional; enables a detail-view gallery when real imagery exists. |

---

## 4. Pricing

| Portal field | NetSuite source field | NetSuite field type | Transform / notes |
|---|---|---|---|
| Indicative "from" unit price | `baseprice` (Base Price) **or** a specific price level ⚠ | Pricing sublist | Shown as `from $X`. **Confirm which price level** the catalog should surface (Base Price vs an online/customer-specific level). |
| Per-customer / contract price *(future)* | Customer price level / item pricing ⚠ | Pricing sublist | Out of scope for the indicative catalog price; relevant to the sales-estimate/quote flow. |

---

## 5. Availability & inventory

| Portal field | NetSuite source field | NetSuite field type | Transform / notes |
|---|---|---|---|
| Quantity available (total) | `quantityavailable` | Aggregate (standard) | Shown as "N available"; equals the sum of per-location quantities. Confirm whether to show exact numbers or banded (e.g. "1,000+"). |
| Per-location quantity | Inventory sublist `locationquantityavailable` | Location sublist | Feeds the detail "Availability" breakdown; total rolls up from these. Synced into `device_inventory(device_id, location_id, quantity)`. |
| Stock location(s) | Inventory **Location** (`inventorylocation`) | List/Record | Displayed as e.g. "Miami, FL"; also a **filter**. Synced into `locations`. Confirm which locations are exposed to customers. |

> **Single-location rule.** A sales estimate is fulfilled from **one** stock location, so its cart is limited to items from a single location. When estimate creation is wired up, the estimate header should carry that `location`, and per-location inventory (above) determines which items are eligible for a given location.

---

## 6. Merchandising (confirm owner: NetSuite vs portal back-office)

| Portal field | NetSuite source field | NetSuite field type | Transform / notes |
|---|---|---|---|
| Promo tag ("New Arrival", "Best Seller", "Limited") | `custitem_promo_tag` ⚠ *or* portal-managed | List/Record | Shown as a badge on featured cards. Decide whether curated in NetSuite or in a portal back-office tool. |
| "Hottest Offer" / featured flag | `custitem_featured` ⚠ *or* portal-managed | Checkbox | Controls the Hottest Offers rail and promo banner. |
| Catalog visibility flag | `isonline` **or** `custitem_show_in_portal` ⚠ | Checkbox | **Recommended:** an explicit flag controlling which items appear in the portal, rather than "anything with stock". Confirm. |

---

## 7. Not sourced from NetSuite (portal / user state)

These appear in the catalog experience but are **not** item data from NetSuite — no mapping required:

- **Favorites** and **saved searches** — per-user state stored in the portal.
- **Grade definitions, example images/videos, FAQ** — editorial content on the grading guide page (portal-managed).
- **Filters / sort / search** — derived at runtime from the mapped attributes above.

---

## 8. Open questions for NetSuite / Business

1. **Custom field IDs** — provide the actual `custitem_*` internal IDs for: brand, model, model family, category, grade, storage, colour, carrier, screen size, kit type, modular, region.
2. **Category** — is it NetSuite Class, the Category field, or a custom field?
3. **Manufacturer** — standard Manufacturer field or custom?
4. **Price level** — which price level should the catalog "from" price read (Base Price vs online/customer level)? Any per-customer catalog pricing?
5. **Catalog visibility** — is there (or should there be) an explicit "show in portal" flag, or is visibility "in stock at an exposed location"?
6. **Locations** — which inventory locations are exposed to customers, and should quantities be exact or banded?
7. **Images** — are product photos in NetSuite (item image / file cabinet) or an external source/URL?
8. **Merchandising** — are promo tags and the "featured/hottest" flag curated in NetSuite or in a portal back-office tool?
9. **Grade value set** — what is the full list of grade codes in NetSuite, and how do they map to the customer-facing grades (currently A / B)?

---

## Sign-Off

| Reviewer | Role | Decision | Date | Comments |
|----------|------|----------|------|----------|
| | NetSuite Administrator | | | |
| | Business Analysis | | | |
| | Development | | | |

**Decision options:** Approved / Approved with Changes / Not Approved

---

*End of Document*
