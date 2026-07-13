'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Smartphone, Tablet, Laptop, Watch, Headphones, Plus, Minus, ShoppingCart, X, Tag, ArrowRight, SlidersHorizontal, Trash2, Check, Heart, Bookmark, BookmarkPlus, Pencil, Lock, MapPin, Package, ShieldCheck } from 'lucide-react'
import { GRADES, GRADE_BY_CODE, gradeBadgeClass } from '@/lib/grades'

const OFFER_REASONS = ['Volume commitment', 'Competitor quote', 'Budget constraint', 'Repeat order', 'Other']

const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 })

const devices = [
  // Smartphones
  { id: 'D1', name: 'iPhone 13 Pro', brand: 'Apple', model: 'iPhone 13 Pro', category: 'Smartphones', grade: 'C6', storage: 128, price: 229, qty: 1240, color: 'Graphite', carrier: 'Unlocked', location: 'Miami, FL', hot: true, tag: 'Spring Clearance' },
  { id: 'D2', name: 'iPhone 14', brand: 'Apple', model: 'iPhone 14', category: 'Smartphones', grade: 'C6', storage: 256, price: 389, qty: 860, color: 'Blue', carrier: 'Unlocked', location: 'Dallas, TX', hot: true, tag: 'Best Seller' },
  { id: 'D3', name: 'iPhone 13', brand: 'Apple', model: 'iPhone 13', category: 'Smartphones', grade: 'C4', storage: 128, price: 199, qty: 2100, color: 'Black', carrier: 'AT&T', location: 'Chicago, IL', hot: false },
  { id: 'D4', name: 'Samsung Galaxy S23', brand: 'Samsung', model: 'Galaxy S23', category: 'Smartphones', grade: 'C6', storage: 256, price: 349, qty: 540, color: 'Black', carrier: 'Unlocked', location: 'Miami, FL', hot: true, tag: 'New Arrival' },
  { id: 'D5', name: 'Samsung Galaxy S22', brand: 'Samsung', model: 'Galaxy S22', category: 'Smartphones', grade: 'C4', storage: 128, price: 219, qty: 980, color: 'White', carrier: 'T-Mobile', location: 'Los Angeles, CA', hot: false },
  { id: 'D6', name: 'Google Pixel 8', brand: 'Google', model: 'Pixel 8', category: 'Smartphones', grade: 'C5', storage: 128, price: 299, qty: 420, color: 'Black', carrier: 'Unlocked', location: 'Dallas, TX', hot: true, tag: 'Limited' },
  { id: 'D7', name: 'Google Pixel 7', brand: 'Google', model: 'Pixel 7', category: 'Smartphones', grade: 'C4', storage: 128, price: 189, qty: 610, color: 'White', carrier: 'Verizon', location: 'Chicago, IL', hot: false },
  { id: 'D8', name: 'iPhone 14', brand: 'Apple', model: 'iPhone 14', category: 'Smartphones', grade: 'C5', storage: 128, price: 319, qty: 730, color: 'Silver', carrier: 'T-Mobile', location: 'Los Angeles, CA', hot: false },
  { id: 'D9', name: 'Samsung Galaxy S23', brand: 'Samsung', model: 'Galaxy S23', category: 'Smartphones', grade: 'C5', storage: 512, price: 379, qty: 210, color: 'Graphite', carrier: 'Unlocked', location: 'Miami, FL', hot: false },
  { id: 'D10', name: 'Samsung Galaxy S22', brand: 'Samsung', model: 'Galaxy S22', category: 'Smartphones', grade: 'C6', storage: 256, price: 259, qty: 340, color: 'Blue', carrier: 'AT&T', location: 'Dallas, TX', hot: false },
  { id: 'D11', name: 'Google Pixel 8', brand: 'Google', model: 'Pixel 8', category: 'Smartphones', grade: 'C4', storage: 256, price: 269, qty: 155, color: 'White', carrier: 'Unlocked', location: 'Chicago, IL', hot: false },
  { id: 'D12', name: 'iPhone 13 Pro', brand: 'Apple', model: 'iPhone 13 Pro', category: 'Smartphones', grade: 'CPO', storage: 256, price: 279, qty: 480, color: 'Silver', carrier: 'Unlocked', location: 'Los Angeles, CA', hot: false },
  { id: 'D13', name: 'iPhone 12', brand: 'Apple', model: 'iPhone 12', category: 'Smartphones', grade: 'C2', storage: 64, price: 159, qty: 1520, color: 'Black', carrier: 'Verizon', location: 'Chicago, IL', hot: false },
  { id: 'D14', name: 'Samsung Galaxy S23', brand: 'Samsung', model: 'Galaxy S23', category: 'Smartphones', grade: 'CPO', storage: 512, price: 429, qty: 120, color: 'White', carrier: 'Unlocked', location: 'Miami, FL', hot: false },
  { id: 'D15', name: 'Google Pixel 7', brand: 'Google', model: 'Pixel 7', category: 'Smartphones', grade: 'C5', storage: 256, price: 239, qty: 260, color: 'Blue', carrier: 'T-Mobile', location: 'Dallas, TX', hot: false },
  { id: 'D16', name: 'iPhone 14', brand: 'Apple', model: 'iPhone 14', category: 'Smartphones', grade: 'C6', storage: 512, price: 469, qty: 90, color: 'Graphite', carrier: 'AT&T', location: 'Los Angeles, CA', hot: false },
  // Tablets
  { id: 'D17', name: 'iPad Air', brand: 'Apple', model: 'iPad Air', category: 'Tablets', grade: 'C6', storage: 256, price: 399, qty: 300, color: 'Blue', carrier: 'Wi-Fi', location: 'Miami, FL', hot: true, tag: 'New Arrival' },
  { id: 'D18', name: 'iPad', brand: 'Apple', model: 'iPad', category: 'Tablets', grade: 'C4', storage: 64, price: 219, qty: 540, color: 'Silver', carrier: 'Wi-Fi', location: 'Dallas, TX', hot: false },
  { id: 'D19', name: 'Galaxy Tab S8', brand: 'Samsung', model: 'Galaxy Tab S8', category: 'Tablets', grade: 'MD A', storage: 128, price: 349, qty: 180, color: 'Graphite', carrier: 'Wi-Fi', location: 'Chicago, IL', hot: false },
  // Laptops
  { id: 'D20', name: 'MacBook Air 13"', brand: 'Apple', model: 'MacBook Air 13"', category: 'Laptops', grade: 'CPO', storage: 256, price: 749, qty: 90, color: 'Silver', carrier: null, location: 'Los Angeles, CA', hot: false },
  { id: 'D21', name: 'MacBook Pro 14"', brand: 'Apple', model: 'MacBook Pro 14"', category: 'Laptops', grade: 'MD B', storage: 512, price: 1099, qty: 60, color: 'Graphite', carrier: null, location: 'Miami, FL', hot: false },
  // Wearables
  { id: 'D22', name: 'Apple Watch Series 8', brand: 'Apple', model: 'Apple Watch Series 8', category: 'Wearables', grade: 'C6', storage: null, price: 199, qty: 260, color: 'Black', carrier: null, location: 'Dallas, TX', hot: false },
  { id: 'D23', name: 'Galaxy Watch 5', brand: 'Samsung', model: 'Galaxy Watch 5', category: 'Wearables', grade: 'C2', storage: null, price: 129, qty: 340, color: 'Black', carrier: null, location: 'Chicago, IL', hot: false },
  { id: 'D24', name: 'Pixel Watch', brand: 'Google', model: 'Pixel Watch', category: 'Wearables', grade: 'C5', storage: null, price: 149, qty: 150, color: 'Black', carrier: null, location: 'Los Angeles, CA', hot: false },
  // Accessories
  { id: 'D25', name: 'AirPods Pro', brand: 'Apple', model: 'AirPods Pro', category: 'Accessories', grade: 'COB', storage: null, price: 129, qty: 800, color: 'White', carrier: null, location: 'Miami, FL', hot: false },
  { id: 'D26', name: 'Galaxy Buds2', brand: 'Samsung', model: 'Galaxy Buds2', category: 'Accessories', grade: 'COB', storage: null, price: 69, qty: 620, color: 'White', carrier: null, location: 'Dallas, TX', hot: false },
]

// The stock locations available to this customer. In production this comes from
// the customer's NetSuite locations; here all four are available for the demo.
const ALL_LOCATIONS = ['Miami, FL', 'Dallas, TX', 'Los Angeles, CA', 'Chicago, IL']

// Which locations stock a given device. Deterministic from the id so it's stable:
// always the device's primary location, plus a varied subset of the others — so
// switching the ordering location genuinely changes what's available.
function locationsFor(d) {
  const n = parseInt(String(d.id).replace(/\D/g, ''), 10) || 0
  return ALL_LOCATIONS.filter((loc, i) => loc === d.location || (n + i * 7) % 3 === 0)
}
const availableAt = (d, loc) => locationsFor(d).includes(loc)

const filterGroups = {
  category: ['Smartphones', 'Tablets', 'Laptops', 'Wearables', 'Accessories'],
  brand: ['Apple', 'Samsung', 'Google'],
  model: ['iPhone 14', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 12', 'Galaxy S23', 'Galaxy S22', 'Pixel 8', 'Pixel 7', 'iPad Air', 'iPad', 'Galaxy Tab S8', 'MacBook Air 13"', 'MacBook Pro 14"', 'Apple Watch Series 8', 'Galaxy Watch 5', 'Pixel Watch', 'AirPods Pro', 'Galaxy Buds2'],
  grade: GRADES.map((g) => g.code),
  storage: [64, 128, 256, 512],
  color: ['Black', 'White', 'Blue', 'Graphite', 'Silver'],
  carrier: ['Unlocked', 'AT&T', 'T-Mobile', 'Verizon'],
}

const groupMeta = {
  category: { label: 'Category', fmt: (o) => o },
  brand: { label: 'Brand', fmt: (o) => o },
  model: { label: 'Model', fmt: (o) => o },
  grade: { label: 'Grade', fmt: (o) => o },
  storage: { label: 'Storage', fmt: (o) => o + 'GB' },
  color: { label: 'Color', fmt: (o) => o },
  carrier: { label: 'Carrier', fmt: (o) => o },
}

const catIcon = { Smartphones: Smartphone, Tablets: Tablet, Laptops: Laptop, Wearables: Watch, Accessories: Headphones }

// Adaptive spec line — omits attributes that don't apply (e.g. laptops/wearables have no carrier)
const specLine = (d) => [d.storage ? `${d.storage}GB` : null, d.color, d.carrier].filter(Boolean).join(' · ')

// Per-location stock breakdown for the detail view. Derived deterministically
// from the device's total quantity and primary location (mock data only — in
// production this comes from NetSuite's per-location inventory, see the
// Catalog ↔ NetSuite mapping). The primary location holds the largest share.
const LOCATION_WEIGHTS = [0.55, 0.25, 0.12, 0.08]
function stockByLocation(d) {
  const locs = locationsFor(d)
  const ordered = [d.location, ...locs.filter((l) => l !== d.location)]
  const rows = ordered.map((location, i) => ({ location, qty: Math.floor(d.qty * (LOCATION_WEIGHTS[i] || 0)) }))
  const allocated = rows.reduce((sum, r) => sum + r.qty, 0)
  rows[0].qty += d.qty - allocated // remainder to the primary location so the total matches exactly
  return rows.filter((r) => r.qty > 0)
}

const qtyAt = (d, loc) => { const r = stockByLocation(d).find((x) => x.location === loc); return r ? r.qty : 0 }

// Card availability text. In "All locations" browse mode we show where the
// device is stocked; for a specific location we show that location's quantity.
const availabilityLabel = (d, loc) => loc === 'ALL'
  ? `${locationsFor(d).length} location${locationsFor(d).length !== 1 ? 's' : ''} · ${d.qty.toLocaleString()} total`
  : `${loc} · ${qtyAt(d, loc).toLocaleString()} avail`

const DEFAULT_MAX = 1200
const SAVED_KEY = 'pcs.catalog.savedSearches.v2'
const FAV_KEY = 'pcs.catalog.favorites'

const normPayload = (p) => JSON.stringify({
  search: (p.search || '').trim().toLowerCase(),
  categories: [...(p.categories || [])].sort(),
  brands: [...(p.brands || [])].sort(),
  models: [...(p.models || [])].sort(),
  grades: [...(p.grades || [])].sort(),
  storages: [...(p.storages || [])].sort(),
  locations: [...(p.locations || [])].sort(),
  colors: [...(p.colors || [])].sort(),
  carriers: [...(p.carriers || [])].sort(),
  maxPrice: p.maxPrice ?? DEFAULT_MAX,
})

export default function CatalogPage() {
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [grades, setGrades] = useState([])
  const [storages, setStorages] = useState([])
  const [locations, setLocations] = useState([])
  const [colors, setColors] = useState([])
  const [carriers, setCarriers] = useState([])
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX)
  const [sort, setSort] = useState('Price')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([]) // { id, qty, customPrice }
  const [cartOpen, setCartOpen] = useState(false)
  const [quoteStep, setQuoteStep] = useState('cart') // 'cart' | 'pricing'
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState(null) // device shown in the detail view
  const [activeLocation, setActiveLocation] = useState('ALL') // catalog view: 'ALL' (browse) or a specific location
  const [orderLocation, setOrderLocation] = useState(null) // the cart's single ordering location (null when cart empty)
  const [pendingLocation, setPendingLocation] = useState(null) // { location, orphaned:[cartItems] } — confirm switch that drops items
  const [addConflict, setAddConflict] = useState(null) // { id, amount, itemLoc } — adding an item not stocked at the order location

  // Saved searches + favorites (persisted to localStorage)
  const [savedSearches, setSavedSearches] = useState([])
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const [hydrated, setHydrated] = useState(false)

  // Load persisted state once, client-side only (avoids hydration mismatch)
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]')
      if (Array.isArray(s)) setSavedSearches(s)
      const f = JSON.parse(localStorage.getItem(FAV_KEY) || '[]')
      if (Array.isArray(f)) setFavorites(f)
    } catch { /* ignore malformed storage */ }
    setHydrated(true)
  }, [])

  // Pre-apply a grade filter when arriving from the grading guide (/catalog?grade=A)
  useEffect(() => {
    const g = new URLSearchParams(window.location.search).get('grade')
    if (g && filterGroups.grade.includes(g)) setGrades([g])
  }, [])

  useEffect(() => { if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(savedSearches)) }, [savedSearches, hydrated])
  useEffect(() => { if (hydrated) localStorage.setItem(FAV_KEY, JSON.stringify(favorites)) }, [favorites, hydrated])

  const stateByKey = {
    category: [categories, setCategories],
    brand: [brands, setBrands],
    model: [models, setModels],
    grade: [grades, setGrades],
    storage: [storages, setStorages],
    location: [locations, setLocations],
    color: [colors, setColors],
    carrier: [carriers, setCarriers],
  }

  const toggle = (list, setList, val) =>
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val])

  // In "All locations" the grid shows every device; a specific location filters to it.
  const inView = (d) => activeLocation === 'ALL' || availableAt(d, activeLocation)

  const filtered = devices
    .filter((d) => (categories.length ? categories.includes(d.category) : true))
    .filter((d) => (brands.length ? brands.includes(d.brand) : true))
    .filter((d) => (models.length ? models.includes(d.model) : true))
    .filter((d) => (grades.length ? grades.includes(d.grade) : true))
    .filter((d) => (storages.length ? storages.includes(d.storage) : true))
    .filter((d) => inView(d))
    .filter((d) => (colors.length ? colors.includes(d.color) : true))
    .filter((d) => (carriers.length ? carriers.includes(d.carrier) : true))
    .filter((d) => d.price <= maxPrice)
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    .filter((d) => (showFavorites ? favorites.includes(d.id) : true))
    .sort((a, b) =>
      sort === 'Price' ? a.price - b.price : sort === 'Name' ? a.name.localeCompare(b.name) : b.qty - a.qty
    )

  // Facet auto-disable: which option values still yield ≥1 device given the OTHER
  // active filter groups + search + price (mirrors the Online Catalog's matchesOtherFilters).
  const selByKey = { category: categories, brand: brands, model: models, grade: grades, storage: storages, location: locations, color: colors, carrier: carriers }
  const matchesSearchPrice = (d) => d.price <= maxPrice && d.name.toLowerCase().includes(search.toLowerCase()) && inView(d)
  const deviceMatchesExcept = (d, exceptKey) =>
    Object.entries(selByKey).every(([k, vals]) => (k === exceptKey || !vals.length ? true : vals.includes(d[k])))
  const enabledByKey = {}
  for (const key of Object.keys(filterGroups)) {
    const set = new Set()
    for (const opt of filterGroups[key]) {
      if (devices.some((d) => d[key] === opt && matchesSearchPrice(d) && deviceMatchesExcept(d, key))) set.add(opt)
    }
    enabledByKey[key] = set
  }

  const hottest = devices.filter((d) => d.hot && inView(d))

  const deviceById = (id) => devices.find((d) => d.id === id)

  // A cart (and the sales estimate built from it) is limited to a single stock
  // location. Browsing ("All locations") is separate from that ordering location.
  const cartLocation = orderLocation

  const addLine = (id, amount) => {
    setCart((c) => (c.find((i) => i.id === id) ? c.map((i) => (i.id === id ? { ...i, qty: i.qty + amount } : i)) : [...c, { id, qty: amount, customPrice: '' }]))
    setQuoteStep('cart')
    setCartOpen(true)
  }

  // Adding an item: the first item commits the cart's ordering location (the
  // active location, or the item's primary location when browsing all). Once a
  // location is committed, only items stocked there can be added — otherwise the
  // customer is prompted to start a new cart at the item's location.
  const addToQuote = (id, amount = 10) => {
    const dev = deviceById(id)
    if (orderLocation) {
      if (availableAt(dev, orderLocation)) addLine(id, amount)
      else setAddConflict({ id, amount, itemLoc: dev.location })
    } else {
      setOrderLocation(activeLocation === 'ALL' ? dev.location : activeLocation)
      addLine(id, amount)
    }
  }

  // Start a fresh cart for a different location (from the add-conflict prompt).
  const startNewCartFromConflict = () => {
    if (!addConflict) return
    setCart([{ id: addConflict.id, qty: addConflict.amount, customPrice: '' }])
    setOrderLocation(addConflict.itemLoc)
    setQuoteStep('cart'); setCartOpen(true)
    setAddConflict(null)
  }

  // Choosing a location: 'ALL' just changes the browse view. A specific location
  // becomes the ordering location; if the cart has items not stocked there, warn
  // and confirm, then drop those items on switch.
  const requestLocationChange = (newLoc) => {
    if (!newLoc || newLoc === activeLocation) return
    if (newLoc === 'ALL') { setActiveLocation('ALL'); return }
    const orphaned = cart.filter((i) => !availableAt(deviceById(i.id), newLoc))
    if (orphaned.length > 0) { setPendingLocation({ location: newLoc, orphaned }); return }
    setActiveLocation(newLoc)
    if (cart.length) setOrderLocation(newLoc)
  }
  const confirmLocationChange = () => {
    if (!pendingLocation) return
    const newLoc = pendingLocation.location
    const kept = cart.filter((i) => availableAt(deviceById(i.id), newLoc))
    setCart(kept)
    setOrderLocation(kept.length ? newLoc : null)
    setActiveLocation(newLoc)
    setPendingLocation(null)
  }

  // Product detail view
  const openProduct = (d) => setActiveProduct(d)
  const closeProduct = () => setActiveProduct(null)
  const addFromDetail = (id, qty) => { addToQuote(id, qty); closeProduct() }

  // Close the detail view on Escape and lock body scroll while it's open
  useEffect(() => {
    if (!activeProduct) return
    const onKey = (e) => { if (e.key === 'Escape') closeProduct() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow }
  }, [activeProduct])

  // Close the pricing modal on Escape (returns to the cart step)
  useEffect(() => {
    if (!(cartOpen && quoteStep === 'pricing')) return
    const onKey = (e) => { if (e.key === 'Escape') setQuoteStep('cart') }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [cartOpen, quoteStep])

  // Dismiss the location-switch prompt on Escape (keeps the current location)
  useEffect(() => {
    if (!pendingLocation) return
    const onKey = (e) => { if (e.key === 'Escape') setPendingLocation(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [pendingLocation])

  // Dismiss the add-conflict prompt on Escape
  useEffect(() => {
    if (!addConflict) return
    const onKey = (e) => { if (e.key === 'Escape') setAddConflict(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [addConflict])

  // Releasing the ordering-location lock once the cart is empty.
  useEffect(() => { if (cart.length === 0 && orderLocation !== null) setOrderLocation(null) }, [cart, orderLocation])
  const changeQty = (id, delta) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)))
  const setCustomPrice = (id, val) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, customPrice: val.replace(/[^0-9.]/g, '') } : i)))
  const removeLine = (id) => setCart((c) => c.filter((i) => i.id !== id))

  // Per-line custom-pricing gate (pricing step): request → pick reason + acknowledge → unlock offer input
  const updateLine = (id, patch) => setCart((c) => c.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  const requestPricing = (id) => updateLine(id, { requesting: true })
  const cancelPricing = (id) => updateLine(id, { requesting: false, reason: '', ack: false })
  const setLineReason = (id, reason) => updateLine(id, { reason })
  const toggleLineAck = (id) => setCart((c) => c.map((i) => (i.id === id ? { ...i, ack: !i.ack } : i)))
  const enablePricing = (id) =>
    setCart((c) => c.map((i) => (i.id === id && i.reason && i.ack ? { ...i, unlocked: true, requesting: false } : i)))
  const resetLine = (id) => updateLine(id, { unlocked: false, requesting: false, reason: '', ack: false, customPrice: '' })
  const pricingCtl = { requestPricing, cancelPricing, setLineReason, toggleLineAck, enablePricing, resetLine }

  const cartCount = cart.reduce((n, i) => n + i.qty, 0)
  const lineUnit = (i) => {
    const dev = devices.find((d) => d.id === i.id)
    return i.customPrice !== '' ? parseFloat(i.customPrice) || 0 : dev.price
  }
  const subtotal = cart.reduce((sum, i) => sum + lineUnit(i) * i.qty, 0)
  const listSubtotal = cart.reduce((sum, i) => sum + (devices.find((d) => d.id === i.id)?.price || 0) * i.qty, 0)

  const activeFilterCount =
    categories.length + brands.length + models.length + grades.length + storages.length + locations.length + colors.length + carriers.length + (maxPrice < DEFAULT_MAX ? 1 : 0)

  const clearFilters = () => {
    setCategories([]); setBrands([]); setModels([]); setGrades([]); setStorages([]); setLocations([]); setColors([]); setCarriers([]); setMaxPrice(DEFAULT_MAX); setSearch('')
  }

  // ── Favorites ──
  const isFavorite = (id) => favorites.includes(id)
  const toggleFavorite = (id) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))

  // ── Saved searches ──
  const currentPayload = { search, categories, brands, models, grades, storages, locations, colors, carriers, maxPrice }
  const activeSavedId = (() => {
    const cur = normPayload(currentPayload)
    const hit = savedSearches.find((s) => normPayload(s.payload) === cur)
    return hit ? hit.id : null
  })()

  const saveCurrent = () => {
    const name = saveName.trim()
    if (!name) return
    setSavedSearches((list) => [...list, { id: String(Date.now()), name, payload: currentPayload }])
    setSaveName('')
  }
  const applySaved = (s) => {
    const p = s.payload || {}
    setSearch(p.search || '')
    setCategories(p.categories || []); setBrands(p.brands || []); setModels(p.models || [])
    setGrades(p.grades || []); setStorages(p.storages || [])
    setLocations(p.locations || []); setColors(p.colors || []); setCarriers(p.carriers || [])
    setMaxPrice(p.maxPrice ?? DEFAULT_MAX)
    setShowFavorites(false)
    setFiltersOpen(false)
  }
  const deleteSaved = (id) => {
    setSavedSearches((l) => l.filter((x) => x.id !== id))
    if (editingId === id) setEditingId(null)
  }
  const startRename = (s) => { setEditingId(s.id); setRenameValue(s.name) }
  const commitRename = (id) => {
    setSavedSearches((l) => l.map((x) => (x.id === id ? { ...x, name: renameValue.trim() || x.name } : x)))
    setEditingId(null)
  }

  const savedProps = {
    savedSearches, activeSavedId, saveName, setSaveName, saveCurrent, applySaved,
    deleteSaved, startRename, editingId, renameValue, setRenameValue, commitRename,
  }

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] pb-24">
        <div className="px-4 pt-5 pb-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Catalog</h1>
          <p className="text-sm text-gray-400 dark:text-blue-300/50 mt-0.5">Browse available inventory and build your cart</p>
          <Link href="/catalog/grades" className="inline-flex items-center gap-1 text-xs font-medium text-[#0b1b3a] dark:text-blue-300 mt-1.5 hover:underline">
            <ShieldCheck size={13} /> How our grading works
          </Link>
        </div>

        {/* Promo banner */}
        <div className="mx-4 mb-4 rounded-2xl p-4 bg-gradient-to-r from-[#0b1b3a] to-blue-700 relative overflow-hidden">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-yellow-400">Spring Clearance</p>
          <p className="text-white font-bold text-lg leading-tight mt-1">Grade A iPhone 13 Pro from <span className="text-yellow-400">$229</span>/unit</p>
          <button className="mt-3 inline-flex items-center gap-1.5 bg-yellow-400/15 text-yellow-400 text-sm font-medium px-3 py-1.5 rounded-lg">
            Shop Deal <ArrowRight size={14} />
          </button>
        </div>

        {/* Hottest offers */}
        <div className="px-4 mb-1 flex items-center gap-1.5">
          <Tag size={14} className="text-yellow-600 dark:text-yellow-400" />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Hottest Offers</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 py-3 scrollbar-none">
          {hottest.map((d) => (
            <div key={d.id} onClick={() => openProduct(d)} className="flex-shrink-0 w-40 bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 p-3 relative cursor-pointer active:scale-[0.98] transition-transform">
              <button onClick={(e) => { e.stopPropagation(); toggleFavorite(d.id) }} className="absolute top-2 right-2 z-10">
                <Heart size={16} className={isFavorite(d.id) ? 'text-rose-500' : 'text-gray-300 dark:text-gray-500'} fill={isFavorite(d.id) ? 'currentColor' : 'none'} />
              </button>
              <div className="bg-yellow-400/15 rounded-xl h-20 flex items-center justify-center mb-2">
                <DeviceIcon category={d.category} size={30} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{d.name}</p>
              <p className="text-xs text-gray-400 dark:text-blue-300/50">{d.grade}{d.storage ? ` · ${d.storage}GB` : ''}</p>
              <p className="text-yellow-600 dark:text-yellow-400 font-bold text-sm mt-1">from {fmt(d.price)}</p>
            </div>
          ))}
        </div>

        {/* Search + filter toggle */}
        <div className="px-4 mt-2">
          <div className="flex items-center gap-2 bg-white dark:bg-[#152035] rounded-xl px-4 py-3 border border-gray-100 dark:border-white/5">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search devices..." className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none" />
            <button onClick={() => setFiltersOpen((v) => !v)} className="relative text-gray-500 dark:text-gray-400">
              <SlidersHorizontal size={18} />
              {activeFilterCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#0b1b3a] text-white text-[9px] font-bold flex items-center justify-center">{activeFilterCount}</span>}
            </button>
          </div>
          <LocationPicker value={activeLocation} onChange={requestLocationChange} className="mt-2 w-full" />
          <p className="mt-1 text-[11px] text-gray-400 dark:text-blue-300/50">
            {orderLocation ? `Ordering from ${orderLocation}` : activeLocation === 'ALL' ? 'Browsing all locations — pick one, or add an item, to start an order' : `Ordering from ${activeLocation}`}
          </p>
        </div>

        {/* Favorites toggle + saved chips */}
        <div className="px-4 mt-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button onClick={() => setShowFavorites((v) => !v)} className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${showFavorites ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400' : 'bg-white dark:bg-[#152035] border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}>
            <Heart size={13} fill={showFavorites ? 'currentColor' : 'none'} /> Favorites ({favorites.length})
          </button>
          {savedSearches.map((s) => (
            <button key={s.id} onClick={() => applySaved(s)} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeSavedId === s.id ? 'bg-[#0b1b3a] text-white border-[#0b1b3a]' : 'bg-white dark:bg-[#152035] border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}>{s.name}</button>
          ))}
        </div>

        {/* Filters panel */}
        {filtersOpen && (
          <div className="mx-4 mt-3 bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Filters</p>
              {activeFilterCount > 0 && <button onClick={clearFilters} className="text-xs text-blue-600">Clear</button>}
            </div>
            <SavedSearchPanel {...savedProps} />
            <FilterGroups stateByKey={stateByKey} toggle={toggle} enabledByKey={enabledByKey} dense />
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Max Price</p>
              <input type="range" min="50" max="1200" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#0b1b3a]" />
              <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">Up to {fmt(maxPrice)}</p>
            </div>
          </div>
        )}

        {/* Catalog grid */}
        <div className="px-4 mt-4 grid grid-cols-2 gap-3">
          {filtered.map((d) => (
            <div key={d.id} onClick={() => openProduct(d)} className="bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 p-3 cursor-pointer active:scale-[0.98] transition-transform">
              <div className="relative bg-gray-50 dark:bg-[#1e2d45] rounded-xl h-24 flex items-center justify-center mb-2">
                <DeviceIcon category={d.category} size={34} className="text-gray-300 dark:text-gray-500" />
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(d.id) }} className="absolute top-2 right-2">
                  <Heart size={16} className={isFavorite(d.id) ? 'text-rose-500' : 'text-gray-300 dark:text-gray-500'} fill={isFavorite(d.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="flex items-start justify-between gap-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{d.name}</p>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${gradeBadgeClass(d.grade)}`}>{d.grade}</span>
              </div>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-0.5">{specLine(d)}</p>
              <p className="text-[11px] text-gray-400 dark:text-blue-300/40 mt-0.5">{availabilityLabel(d, activeLocation)}</p>
              <p className="text-gray-900 dark:text-white font-bold text-sm mt-1">from {fmt(d.price)}</p>
              <button onClick={(e) => { e.stopPropagation(); addToQuote(d.id) }} className="mt-2 w-full py-2 text-xs font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147]">Add to Cart</button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-10 text-sm text-gray-400">
              {showFavorites ? 'No favorite devices yet. Tap the heart on a device to save it here.' : 'No devices match your filters.'}
            </div>
          )}
        </div>

        {/* Floating cart button */}
        {cartCount > 0 && !cartOpen && (
          <button onClick={() => setCartOpen(true)} className="fixed bottom-20 right-4 z-30 flex items-center gap-2 bg-[#0b1b3a] text-white px-4 py-3 rounded-full shadow-lg">
            <ShoppingCart size={18} /> <span className="text-sm font-medium">View Cart ({cart.length})</span>
          </button>
        )}

        {/* Cart bottom sheet */}
        {cartOpen && (
          <div className="fixed inset-0 z-40 flex items-end bg-black/40" onClick={() => setCartOpen(false)}>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-h-[85vh] overflow-auto bg-white dark:bg-[#152035] rounded-t-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Your Cart</h3>
                  {cartLocation && <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 dark:text-blue-300/70 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full"><MapPin size={11} /> {cartLocation}</span>}
                </div>
                <button onClick={() => setCartOpen(false)} className="text-gray-400"><X size={20} /></button>
              </div>
              <CartLines cart={cart} mode="cart" lineUnit={lineUnit} changeQty={changeQty} setCustomPrice={setCustomPrice} removeLine={removeLine} pricingCtl={pricingCtl} />
              <CartFooter cart={cart} step="cart" subtotal={subtotal} listSubtotal={listSubtotal} cartCount={cartCount} onContinue={() => setQuoteStep('pricing')} />
            </div>
          </div>
        )}
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block md:p-4 xl:p-8">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Catalog</h1>
          <p className="text-sm text-gray-400 dark:text-blue-300/50 mt-0.5">Browse available inventory and build your cart</p>
          <Link href="/catalog/grades" className="inline-flex items-center gap-1 text-xs font-medium text-[#0b1b3a] dark:text-blue-300 mt-1.5 hover:underline">
            <ShieldCheck size={13} /> How our grading works
          </Link>
        </div>

        {/* Promo banner */}
        <div className="rounded-xl p-6 mb-5 bg-gradient-to-r from-[#0b1b3a] via-[#123164] to-blue-700 relative overflow-hidden flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400 mb-1">Spring Clearance Event</p>
            <p className="text-white font-bold text-2xl leading-tight">Grade A iPhone 13 Pro from <span className="text-yellow-400">$229</span>/unit</p>
            <p className="text-blue-200/70 text-sm mt-1">Limited quantities across select refurbished models · Ends soon</p>
          </div>
          <button className="flex items-center gap-2 bg-yellow-400 text-[#0b1b3a] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-yellow-300 transition-colors whitespace-nowrap">
            Shop Deal <ArrowRight size={16} />
          </button>
        </div>

        {/* Hottest offers */}
        <div className="mb-2 flex items-center gap-1.5">
          <Tag size={16} className="text-yellow-600 dark:text-yellow-400" />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Hottest Offers</h2>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {hottest.map((d) => (
            <div key={d.id} onClick={() => openProduct(d)} className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 relative cursor-pointer hover:border-blue-200 dark:hover:border-blue-800/60 hover:shadow-md transition-all">
              <button onClick={(e) => { e.stopPropagation(); toggleFavorite(d.id) }} className="absolute top-3 left-3 z-10">
                <Heart size={17} className={isFavorite(d.id) ? 'text-rose-500' : 'text-gray-300 dark:text-gray-500 hover:text-rose-400'} fill={isFavorite(d.id) ? 'currentColor' : 'none'} />
              </button>
              {d.tag && <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-400/15 text-yellow-600 dark:text-yellow-400">{d.tag}</span>}
              <div className="bg-yellow-400/15 rounded-xl h-24 flex items-center justify-center mb-3">
                <DeviceIcon category={d.category} size={38} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{d.name}</p>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-0.5">{d.grade}{d.storage ? ` · ${d.storage}GB` : ''} · {d.qty.toLocaleString()} avail</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-yellow-600 dark:text-yellow-400 font-bold">from {fmt(d.price)}</p>
                <button onClick={(e) => { e.stopPropagation(); addToQuote(d.id) }} className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[#0b1b3a] text-white hover:bg-[#0d2147]">Add</button>
              </div>
            </div>
          ))}
        </div>

        {/* Main 3-column layout */}
        <div className="flex gap-6">
          {/* Filter sidebar */}
          <aside className="w-[230px] flex-shrink-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 self-start">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Filters</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-blue-600 hover:underline">Clear</button>
              )}
            </div>

            <SavedSearchPanel {...savedProps} />

            <FilterGroups stateByKey={stateByKey} toggle={toggle} enabledByKey={enabledByKey} />

            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Max Price</p>
              <input type="range" min="50" max="1200" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#0b1b3a]" />
              <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">Up to {fmt(maxPrice)}</p>
            </div>
          </aside>

          {/* Catalog main */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4 gap-3">
              <LocationPicker value={activeLocation} onChange={requestLocationChange} className="flex-shrink-0" />
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search devices..." className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowFavorites((v) => !v)} className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border transition-colors ${showFavorites ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 bg-white dark:bg-[#152035] hover:bg-gray-50 dark:hover:bg-[#1a2540]'}`}>
                  <Heart size={15} fill={showFavorites ? 'currentColor' : 'none'} /> Favorites ({favorites.length})
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Sort</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Price</option>
                    <option>Name</option>
                    <option>Newest</option>
                  </select>
                </div>
                <button onClick={() => setCartOpen((v) => !v)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147]">
                  <ShoppingCart size={16} /> View Cart ({cart.length})
                </button>
              </div>
            </div>

            {/* Saved-search shortcut chips */}
            {savedSearches.length > 0 && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1"><Bookmark size={12} /> Saved</span>
                {savedSearches.map((s) => (
                  <button key={s.id} onClick={() => applySaved(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeSavedId === s.id ? 'bg-[#0b1b3a] text-white border-[#0b1b3a]' : 'bg-white dark:bg-[#152035] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-300'}`}>{s.name}</button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mb-3 gap-3">
              <p className="text-xs text-gray-400">{filtered.length} devices {showFavorites ? 'in favorites' : activeLocation === 'ALL' ? 'across all locations' : `at ${activeLocation}`}</p>
              <p className="text-xs text-gray-400">{orderLocation ? `Ordering from ${orderLocation}` : activeLocation === 'ALL' ? 'Browsing — pick a location or add an item to order' : `Ordering from ${activeLocation}`}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((d) => (
                <div key={d.id} onClick={() => openProduct(d)} className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 flex flex-col cursor-pointer hover:border-blue-200 dark:hover:border-blue-800/60 hover:shadow-md transition-all">
                  <div className="relative bg-gray-50 dark:bg-[#1e2d45] rounded-xl h-28 flex items-center justify-center mb-3">
                    <DeviceIcon category={d.category} size={42} className="text-gray-300 dark:text-gray-500" />
                    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(d.id) }} className="absolute top-2 right-2">
                      <Heart size={17} className={isFavorite(d.id) ? 'text-rose-500' : 'text-gray-300 dark:text-gray-500 hover:text-rose-400'} fill={isFavorite(d.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{d.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap ${gradeBadgeClass(d.grade)}`}>{d.grade}</span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-1">{specLine(d)}</p>
                  <p className="text-[11px] text-gray-400 dark:text-blue-300/40 mt-0.5">{availabilityLabel(d, activeLocation)}</p>
                  <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-50 dark:border-gray-700">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide">from</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white leading-none">{fmt(d.price)}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); addToQuote(d.id) }} className="flex items-center gap-1 px-3 py-2 text-xs font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147]">
                      <Plus size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-12 text-sm text-gray-400">
                  {showFavorites ? 'No favorite devices yet. Click the heart on a device to save it here.' : 'No devices match your filters.'}
                </div>
              )}
            </div>
          </div>

          {/* Cart panel */}
          {cartOpen && (
            <aside className="w-[300px] flex-shrink-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 self-start">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Your Cart</h3>
                  {cartLocation && <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 dark:text-blue-300/70 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full"><MapPin size={11} /> {cartLocation}</span>}
                </div>
                <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
              </div>
              <CartLines cart={cart} mode="cart" lineUnit={lineUnit} changeQty={changeQty} setCustomPrice={setCustomPrice} removeLine={removeLine} pricingCtl={pricingCtl} />
              <CartFooter cart={cart} step="cart" subtotal={subtotal} listSubtotal={listSubtotal} cartCount={cartCount} onContinue={() => setQuoteStep('pricing')} />
            </aside>
          )}
        </div>
      </div>

      {/* ── CART / CHECKOUT MODAL ── opens from the cart's "Continue to checkout" */}
      {cartOpen && quoteStep === 'pricing' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onMouseDown={() => setQuoteStep('cart')}
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 shadow-2xl p-4 md:p-5"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Your Cart</h3>
                {cartLocation && <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 dark:text-blue-300/70 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full"><MapPin size={11} /> {cartLocation}</span>}
              </div>
              <button onClick={() => setQuoteStep('cart')} aria-label="Close" className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-4">Review each line and optionally propose your own per-unit pricing before submitting.</p>
            <CartLines cart={cart} mode="pricing" lineUnit={lineUnit} changeQty={changeQty} setCustomPrice={setCustomPrice} removeLine={removeLine} pricingCtl={pricingCtl} />
            <CartFooter cart={cart} step="pricing" subtotal={subtotal} listSubtotal={listSubtotal} cartCount={cartCount} onContinue={() => setQuoteStep('pricing')} />
          </div>
        </div>
      )}

      {/* ── PRODUCT DETAIL ── */}
      {activeProduct && (
        <ProductDetail
          device={activeProduct}
          onClose={closeProduct}
          onAddToQuote={addFromDetail}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      )}

      {/* ── ADD FROM ANOTHER LOCATION ── a cart holds one location; offer a new cart */}
      {addConflict && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onMouseDown={() => setAddConflict(null)}>
          <div onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Different location" className="w-full max-w-sm bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 shadow-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Item from a different location</h3>
                <p className="text-sm text-gray-500 dark:text-blue-300/60 mt-1 leading-snug">
                  Your cart is ordering from <span className="font-medium text-gray-700 dark:text-gray-200">{orderLocation}</span>, and a cart can only contain items from one location. <span className="font-medium text-gray-700 dark:text-gray-200">{deviceById(addConflict.id)?.name}</span> isn&apos;t stocked there. Start a new cart at <span className="font-medium text-gray-700 dark:text-gray-200">{addConflict.itemLoc}</span>?
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setAddConflict(null)} className="flex-1 py-2 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">Keep current cart</button>
              <button onClick={startNewCartFromConflict} className="flex-1 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147]">Start new cart</button>
            </div>
          </div>
        </div>
      )}

      {/* ── LOCATION SWITCH ── confirm dropping items not stocked at the new location */}
      {pendingLocation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onMouseDown={() => setPendingLocation(null)}>
          <div onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Switch location" className="w-full max-w-sm bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 shadow-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Switch to {pendingLocation.location}?</h3>
                <p className="text-sm text-gray-500 dark:text-blue-300/60 mt-1 leading-snug">
                  {pendingLocation.orphaned.length} item{pendingLocation.orphaned.length !== 1 ? 's' : ''} in your cart {pendingLocation.orphaned.length !== 1 ? 'are' : 'is'} not available at <span className="font-medium text-gray-700 dark:text-gray-200">{pendingLocation.location}</span> and will be removed:
                </p>
                <ul className="mt-2 space-y-1">
                  {pendingLocation.orphaned.map((i) => {
                    const dev = deviceById(i.id)
                    return <li key={i.id} className="text-xs text-gray-600 dark:text-gray-300 truncate">• {dev?.name} <span className="text-gray-400">×{i.qty}</span></li>
                  })}
                </ul>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setPendingLocation(null)} className="flex-1 py-2 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">Keep {orderLocation}</button>
              <button onClick={confirmLocationChange} className="flex-1 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147]">Switch &amp; remove {pendingLocation.orphaned.length}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function DeviceIcon({ category, size, className }) {
  const Icon = catIcon[category] || Smartphone
  return <Icon size={size} className={className} />
}

// Ordering-location selector. Changing it flows through requestLocationChange,
// which may prompt before dropping cart items not stocked at the new location.
function LocationPicker({ value, onChange, className = '' }) {
  return (
    <label className={`flex items-center gap-2 bg-white dark:bg-[#152035] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 ${className}`}>
      <MapPin size={15} className="text-[#0b1b3a] dark:text-blue-400 flex-shrink-0" />
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide hidden lg:inline">Location</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 min-w-0 bg-transparent text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none cursor-pointer">
        <option value="ALL">All locations</option>
        {ALL_LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
      </select>
    </label>
  )
}

function ProductDetail({ device: d, onClose, onAddToQuote, isFavorite, toggleFavorite }) {
  const [qty, setQty] = useState(10)
  const g = GRADE_BY_CODE[d.grade]
  const lineTotal = d.price * (Number(qty) || 0)
  const specs = [
    ['Category', d.category],
    ['Brand', d.brand],
    ['Model', d.model],
    ['Storage', d.storage ? `${d.storage}GB` : '—'],
    ['Color', d.color || '—'],
    ['Carrier', d.carrier || '—'],
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 md:backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${d.name} details`}
        className="relative w-full md:w-auto md:max-w-3xl max-h-[92vh] md:max-h-[88vh] overflow-y-auto bg-white dark:bg-[#152035] rounded-t-2xl md:rounded-2xl border border-gray-100 dark:border-white/5 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-[#1e2d45]/80 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#243350]"
        >
          <X size={18} />
        </button>

        <div className="md:grid md:grid-cols-2">
          {/* Left: image + specs */}
          <div className="p-5 md:p-6">
            <div className="relative bg-gray-50 dark:bg-[#1e2d45] rounded-2xl h-48 md:h-56 flex items-center justify-center">
              <DeviceIcon category={d.category} size={72} className="text-gray-300 dark:text-gray-500" />
              {d.tag && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-yellow-400/15 text-yellow-600 dark:text-yellow-400">{d.tag}</span>
              )}
              <button onClick={() => toggleFavorite(d.id)} aria-label="Toggle favorite" className="absolute top-3 right-3">
                <Heart size={20} className={isFavorite(d.id) ? 'text-rose-500' : 'text-gray-300 dark:text-gray-500 hover:text-rose-400'} fill={isFavorite(d.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mt-5 mb-3">Device Specifications</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {specs.map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">{k}</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: header, availability, grade, add to quote */}
          <div className="p-5 md:p-6 border-t md:border-t-0 md:border-l border-gray-100 dark:border-white/5">
            <p className="text-xs font-semibold text-gray-400 dark:text-blue-300/50 uppercase tracking-wide">{d.brand}</p>
            <div className="flex items-start justify-between gap-3 mt-1 pr-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{d.name}</h3>
              <Link href={`/catalog/grades#${g?.slug || ''}`} className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium hover:ring-2 hover:ring-blue-300 dark:hover:ring-blue-600 transition ${gradeBadgeClass(d.grade)}`} title="See what this grade means">{d.grade}</Link>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{fmt(d.price)}</span>
              <span className="text-xs text-gray-400">/ unit · list price</span>
            </div>

            {/* Availability by location */}
            <div className="mt-4 rounded-xl bg-gray-50 dark:bg-[#1e2d45] p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wide"><Package size={13} /> Availability by location</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{d.qty.toLocaleString()} total</span>
              </div>
              <div className="space-y-1.5">
                {stockByLocation(d).map((row) => (
                  <div key={row.location} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200"><MapPin size={14} className="text-gray-400 flex-shrink-0" /> {row.location}</span>
                    <span className="text-gray-900 dark:text-white font-medium">{row.qty.toLocaleString()} units</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade guide — links to the full grading guide page */}
            {g && (
              <Link href={`/catalog/grades#${g.slug}`} className="mt-3 flex gap-2 rounded-xl border border-gray-100 dark:border-gray-700 p-3 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group">
                <ShieldCheck size={16} style={{ color: g.accent }} className="flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{g.name}</p>
                  <p className="text-xs text-gray-400 dark:text-blue-300/60 leading-snug mt-0.5">{g.short}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0b1b3a] dark:text-blue-300 mt-1.5 group-hover:underline">
                    See grade examples <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            )}

            {/* Add to quote */}
            <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Quantity</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty((q) => Math.max(1, (Number(q) || 1) - 10))} className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"><Minus size={13} /></button>
                  <input
                    value={qty}
                    onChange={(e) => setQty(e.target.value.replace(/[^0-9]/g, ''))}
                    onBlur={() => setQty((q) => Math.max(1, Number(q) || 1))}
                    className="w-14 text-center text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1e2d45] border border-gray-200 dark:border-gray-600 rounded py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={() => setQty((q) => (Number(q) || 0) + 10)} className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"><Plus size={13} /></button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-gray-400">Est. subtotal</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{fmt(lineTotal)}</span>
              </div>
              <button
                onClick={() => onAddToQuote(d.id, Math.max(1, Number(qty) || 1))}
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147]"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <p className="text-[11px] text-gray-400 dark:text-blue-300/50 text-center leading-snug mt-2">You'll be able to propose custom pricing at checkout.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterGroups({ stateByKey, toggle, enabledByKey, dense }) {
  return (
    <>
      {Object.entries(filterGroups).map(([key, opts]) => {
        const [list, setList] = stateByKey[key]
        const meta = groupMeta[key]
        const enabled = enabledByKey?.[key]
        return (
          <div key={key} className={dense ? '' : 'mb-5'}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">{meta.label}</p>
            {dense ? (
              <div className="flex flex-wrap gap-2">
                {opts.map((o) => {
                  const on = list.includes(o)
                  const disabled = !on && enabled && !enabled.has(o)
                  return (
                    <button key={o} disabled={disabled} onClick={() => !disabled && toggle(list, setList, o)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${on ? 'bg-[#0b1b3a] text-white border-[#0b1b3a]' : disabled ? 'bg-gray-50 dark:bg-white/5 text-gray-300 dark:text-gray-600 border-gray-100 dark:border-gray-700 cursor-not-allowed' : 'bg-white dark:bg-[#152035] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'}`}>
                      {meta.fmt(o)}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-1.5">
                {opts.map((o) => {
                  const on = list.includes(o)
                  const disabled = !on && enabled && !enabled.has(o)
                  return (
                    <label key={o} onClick={() => !disabled && toggle(list, setList, o)} className={`flex items-center gap-2 text-sm ${disabled ? 'cursor-not-allowed text-gray-300 dark:text-gray-600' : 'cursor-pointer text-gray-700 dark:text-gray-300'}`}>
                      <span className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${on ? 'bg-[#0b1b3a] border-[#0b1b3a]' : disabled ? 'border-gray-200 dark:border-gray-700' : 'border-gray-300 dark:border-gray-600'}`}>
                        {on && <Check size={12} className="text-white" />}
                      </span>
                      <span>{meta.fmt(o)}</span>
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

function SavedSearchPanel({ savedSearches, activeSavedId, saveName, setSaveName, saveCurrent, applySaved, deleteSaved, startRename, editingId, renameValue, setRenameValue, commitRename }) {
  return (
    <div className="border-b border-gray-100 dark:border-gray-700 pb-4 mb-4">
      <div className="flex items-center gap-1.5 mb-2">
        <Bookmark size={13} className="text-gray-400" />
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Saved Searches</p>
      </div>
      <div className="flex gap-2 mb-3">
        <input
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') saveCurrent() }}
          placeholder="Save current search as…"
          className="flex-1 min-w-0 px-2.5 py-1.5 text-xs border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={saveCurrent} disabled={!saveName.trim()} className="px-2.5 py-1.5 text-xs font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 flex-shrink-0">
          <BookmarkPlus size={13} /> Save
        </button>
      </div>
      {savedSearches.length === 0 ? (
        <p className="text-xs text-gray-400">No saved searches yet. Set filters, then save them for one-click reuse.</p>
      ) : (
        <div className="space-y-1.5">
          {savedSearches.map((s) => (
            <div key={s.id} className={`rounded-lg border px-2.5 py-1.5 ${activeSavedId === s.id ? 'border-[#0b1b3a] bg-[#0b1b3a]/5 dark:bg-blue-900/20' : 'border-gray-100 dark:border-gray-700'}`}>
              {editingId === s.id ? (
                <div className="flex items-center gap-1.5">
                  <input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') commitRename(s.id) }}
                    autoFocus
                    className="flex-1 min-w-0 px-2 py-1 text-xs border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={() => commitRename(s.id)} className="text-green-600 hover:text-green-700"><Check size={15} /></button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <button onClick={() => applySaved(s)} className="flex items-center gap-1.5 min-w-0 flex-1 text-left">
                    <Bookmark size={12} className={activeSavedId === s.id ? 'text-[#0b1b3a] dark:text-blue-400 flex-shrink-0' : 'text-gray-300 flex-shrink-0'} fill={activeSavedId === s.id ? 'currentColor' : 'none'} />
                    <span className={`text-xs truncate ${activeSavedId === s.id ? 'font-semibold text-[#0b1b3a] dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>{s.name}</span>
                  </button>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => startRename(s)} className="text-gray-300 hover:text-gray-500"><Pencil size={12} /></button>
                    <button onClick={() => deleteSaved(s.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={12} /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CartLines({ cart, mode, lineUnit, changeQty, setCustomPrice, removeLine, pricingCtl }) {
  if (cart.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-8">No items yet. Add devices to build your cart.</p>
  }
  return (
    <div className="space-y-3 mb-4">
      {cart.map((i) => {
        const dev = devices.find((d) => d.id === i.id)
        const lineTotal = mode === 'pricing' ? lineUnit(i) * i.qty : dev.price * i.qty
        return (
          <div key={i.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{dev.name}</p>
                <p className="text-xs text-gray-400 dark:text-blue-300/50">{dev.grade}{dev.storage ? ` · ${dev.storage}GB` : ''}</p>
              </div>
              <button onClick={() => removeLine(i.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={15} /></button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button onClick={() => changeQty(i.id, -10)} className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"><Minus size={12} /></button>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-10 text-center">{i.qty}</span>
                <button onClick={() => changeQty(i.id, 10)} className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"><Plus size={12} /></button>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{fmt(lineTotal)}</p>
            </div>

            {/* Cart step, or pricing step before this line is unlocked: show list price */}
            {(mode === 'cart' || (mode === 'pricing' && !i.unlocked)) && (
              <p className="text-[11px] text-gray-400 dark:text-blue-300/50 mt-1.5">{fmt(dev.price)} / unit · list price</p>
            )}

            {mode === 'pricing' && !i.unlocked && !i.requesting && (
              <button onClick={() => pricingCtl.requestPricing(i.id)} className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">
                <Lock size={12} /> Request custom pricing
              </button>
            )}

            {mode === 'pricing' && !i.unlocked && i.requesting && (
              <div className="mt-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-700 p-2.5 space-y-2.5">
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Reason for custom pricing</label>
                  <select value={i.reason || ''} onChange={(e) => pricingCtl.setLineReason(i.id, e.target.value)} className="mt-1 w-full px-2.5 py-1.5 text-xs border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled>Select a reason…</option>
                    {OFFER_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <label className="flex items-start gap-2 text-[11px] text-gray-600 dark:text-gray-300 leading-snug cursor-pointer">
                  <input type="checkbox" checked={!!i.ack} onChange={() => pricingCtl.toggleLineAck(i.id)} className="mt-0.5 accent-[#0b1b3a]" />
                  <span>I understand any price I propose is a request, reviewed and confirmed by PCS.</span>
                </label>
                <div className="flex gap-2">
                  <button onClick={() => pricingCtl.cancelPricing(i.id)} className="flex-1 py-1.5 text-xs font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">Cancel</button>
                  <button onClick={() => pricingCtl.enablePricing(i.id)} disabled={!i.reason || !i.ack} className="flex-1 py-1.5 text-xs font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] disabled:opacity-40 disabled:cursor-not-allowed">Enable price field</button>
                </div>
              </div>
            )}

            {mode === 'pricing' && i.unlocked && (
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Your offer / unit (list {fmt(dev.price)})</label>
                  <button onClick={() => pricingCtl.resetLine(i.id)} className="text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">Use list price</button>
                </div>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input value={i.customPrice} onChange={(e) => setCustomPrice(i.id, e.target.value)} placeholder={dev.price.toFixed(2)} className="w-full pl-6 pr-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                {i.reason && <p className="text-[10px] text-gray-400 mt-1">Reason: {i.reason}</p>}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function CartFooter({ cart, step, subtotal, listSubtotal, cartCount, onContinue }) {
  if (cart.length === 0) return null
  const shownSubtotal = step === 'pricing' ? subtotal : listSubtotal
  return (
    <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-400">Units</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{cartCount.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">Subtotal</span>
        <span className="text-lg font-bold text-gray-900 dark:text-white">{fmt(shownSubtotal)}</span>
      </div>
      {step === 'pricing' ? (
        <>
          <Link href="/sales-estimates" className="block w-full text-center py-2.5 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] mb-2">
            Submit for Review
          </Link>
          <p className="text-[11px] text-gray-400 dark:text-blue-300/50 text-center leading-snug">
            Prices shown are indicative. PCS will respond with confirmed pricing after review.
          </p>
        </>
      ) : (
        <>
          <button onClick={onContinue} className="w-full flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] mb-2">
            Continue to checkout <ArrowRight size={14} />
          </button>
          <p className="text-[11px] text-gray-400 dark:text-blue-300/50 text-center leading-snug">
            You'll be able to propose your own pricing on the next step.
          </p>
        </>
      )}
    </div>
  )
}
