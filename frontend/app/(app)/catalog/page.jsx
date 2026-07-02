'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Smartphone, Plus, Minus, ShoppingCart, X, Tag, ArrowRight, SlidersHorizontal, Trash2, Check, Heart, Bookmark, BookmarkPlus, Pencil } from 'lucide-react'

const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 })

const devices = [
  { id: 'D1', name: 'iPhone 13 Pro', type: 'iPhone', grade: 'A', storage: 128, price: 229, qty: 1240, color: 'Graphite', carrier: 'Unlocked', location: 'Miami, FL', hot: true, tag: 'Spring Clearance' },
  { id: 'D2', name: 'iPhone 14', type: 'iPhone', grade: 'A', storage: 256, price: 389, qty: 860, color: 'Blue', carrier: 'Unlocked', location: 'Dallas, TX', hot: true, tag: 'Best Seller' },
  { id: 'D3', name: 'iPhone 13', type: 'iPhone', grade: 'B', storage: 128, price: 199, qty: 2100, color: 'Black', carrier: 'AT&T', location: 'Chicago, IL', hot: false },
  { id: 'D4', name: 'Samsung Galaxy S23', type: 'Samsung', grade: 'A', storage: 256, price: 349, qty: 540, color: 'Black', carrier: 'Unlocked', location: 'Miami, FL', hot: true, tag: 'New Arrival' },
  { id: 'D5', name: 'Samsung Galaxy S22', type: 'Samsung', grade: 'B', storage: 128, price: 219, qty: 980, color: 'White', carrier: 'T-Mobile', location: 'Los Angeles, CA', hot: false },
  { id: 'D6', name: 'Google Pixel 8', type: 'Pixel', grade: 'A', storage: 128, price: 299, qty: 420, color: 'Black', carrier: 'Unlocked', location: 'Dallas, TX', hot: true, tag: 'Limited' },
  { id: 'D7', name: 'Google Pixel 7', type: 'Pixel', grade: 'B', storage: 128, price: 189, qty: 610, color: 'White', carrier: 'Verizon', location: 'Chicago, IL', hot: false },
  { id: 'D8', name: 'iPhone 14', type: 'iPhone', grade: 'B', storage: 128, price: 319, qty: 730, color: 'Silver', carrier: 'T-Mobile', location: 'Los Angeles, CA', hot: false },
  { id: 'D9', name: 'Samsung Galaxy S23', type: 'Samsung', grade: 'B', storage: 512, price: 379, qty: 210, color: 'Graphite', carrier: 'Unlocked', location: 'Miami, FL', hot: false },
  { id: 'D10', name: 'Samsung Galaxy S22', type: 'Samsung', grade: 'A', storage: 256, price: 259, qty: 340, color: 'Blue', carrier: 'AT&T', location: 'Dallas, TX', hot: false },
  { id: 'D11', name: 'Google Pixel 8', type: 'Pixel', grade: 'B', storage: 256, price: 269, qty: 155, color: 'White', carrier: 'Unlocked', location: 'Chicago, IL', hot: false },
  { id: 'D12', name: 'iPhone 13 Pro', type: 'iPhone', grade: 'A', storage: 256, price: 279, qty: 480, color: 'Silver', carrier: 'Unlocked', location: 'Los Angeles, CA', hot: false },
  { id: 'D13', name: 'iPhone 12', type: 'iPhone', grade: 'B', storage: 64, price: 159, qty: 1520, color: 'Black', carrier: 'Verizon', location: 'Chicago, IL', hot: false },
  { id: 'D14', name: 'Samsung Galaxy S23', type: 'Samsung', grade: 'A', storage: 512, price: 429, qty: 120, color: 'White', carrier: 'Unlocked', location: 'Miami, FL', hot: false },
  { id: 'D15', name: 'Google Pixel 7', type: 'Pixel', grade: 'A', storage: 256, price: 239, qty: 260, color: 'Blue', carrier: 'T-Mobile', location: 'Dallas, TX', hot: false },
  { id: 'D16', name: 'iPhone 14', type: 'iPhone', grade: 'A', storage: 512, price: 469, qty: 90, color: 'Graphite', carrier: 'AT&T', location: 'Los Angeles, CA', hot: false },
]

const filterGroups = {
  type: ['iPhone', 'Samsung', 'Pixel'],
  grade: ['A', 'B'],
  storage: [64, 128, 256, 512],
  location: ['Miami, FL', 'Dallas, TX', 'Los Angeles, CA', 'Chicago, IL'],
  color: ['Black', 'White', 'Blue', 'Graphite', 'Silver'],
  carrier: ['Unlocked', 'AT&T', 'T-Mobile', 'Verizon'],
}

const groupMeta = {
  type: { label: 'Device Type', fmt: (o) => o },
  grade: { label: 'Grade', fmt: (o) => 'Grade ' + o },
  storage: { label: 'Storage', fmt: (o) => o + 'GB' },
  location: { label: 'Location', fmt: (o) => o },
  color: { label: 'Color', fmt: (o) => o },
  carrier: { label: 'Carrier', fmt: (o) => o },
}

const gradeBadge = {
  A: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  B: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
}

const DEFAULT_MAX = 500
const SAVED_KEY = 'pcs.catalog.savedSearches'
const FAV_KEY = 'pcs.catalog.favorites'

const normPayload = (p) => JSON.stringify({
  search: (p.search || '').trim().toLowerCase(),
  types: [...(p.types || [])].sort(),
  grades: [...(p.grades || [])].sort(),
  storages: [...(p.storages || [])].sort(),
  locations: [...(p.locations || [])].sort(),
  colors: [...(p.colors || [])].sort(),
  carriers: [...(p.carriers || [])].sort(),
  maxPrice: p.maxPrice ?? DEFAULT_MAX,
})

export default function CatalogPage() {
  const [types, setTypes] = useState([])
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
  const [filtersOpen, setFiltersOpen] = useState(false)

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

  useEffect(() => { if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(savedSearches)) }, [savedSearches, hydrated])
  useEffect(() => { if (hydrated) localStorage.setItem(FAV_KEY, JSON.stringify(favorites)) }, [favorites, hydrated])

  const stateByKey = {
    type: [types, setTypes],
    grade: [grades, setGrades],
    storage: [storages, setStorages],
    location: [locations, setLocations],
    color: [colors, setColors],
    carrier: [carriers, setCarriers],
  }

  const toggle = (list, setList, val) =>
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val])

  const filtered = devices
    .filter((d) => (types.length ? types.includes(d.type) : true))
    .filter((d) => (grades.length ? grades.includes(d.grade) : true))
    .filter((d) => (storages.length ? storages.includes(d.storage) : true))
    .filter((d) => (locations.length ? locations.includes(d.location) : true))
    .filter((d) => (colors.length ? colors.includes(d.color) : true))
    .filter((d) => (carriers.length ? carriers.includes(d.carrier) : true))
    .filter((d) => d.price <= maxPrice)
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    .filter((d) => (showFavorites ? favorites.includes(d.id) : true))
    .sort((a, b) =>
      sort === 'Price' ? a.price - b.price : sort === 'Name' ? a.name.localeCompare(b.name) : b.qty - a.qty
    )

  const hottest = devices.filter((d) => d.hot)

  const addToQuote = (id) => {
    setCart((c) => (c.find((i) => i.id === id) ? c.map((i) => (i.id === id ? { ...i, qty: i.qty + 10 } : i)) : [...c, { id, qty: 10, customPrice: '' }]))
    setCartOpen(true)
  }
  const changeQty = (id, delta) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)))
  const setCustomPrice = (id, val) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, customPrice: val.replace(/[^0-9.]/g, '') } : i)))
  const removeLine = (id) => setCart((c) => c.filter((i) => i.id !== id))

  const cartCount = cart.reduce((n, i) => n + i.qty, 0)
  const lineUnit = (i) => {
    const dev = devices.find((d) => d.id === i.id)
    return i.customPrice !== '' ? parseFloat(i.customPrice) || 0 : dev.price
  }
  const subtotal = cart.reduce((sum, i) => sum + lineUnit(i) * i.qty, 0)

  const activeFilterCount =
    types.length + grades.length + storages.length + locations.length + colors.length + carriers.length + (maxPrice < DEFAULT_MAX ? 1 : 0)

  const clearFilters = () => {
    setTypes([]); setGrades([]); setStorages([]); setLocations([]); setColors([]); setCarriers([]); setMaxPrice(DEFAULT_MAX); setSearch('')
  }

  // ── Favorites ──
  const isFavorite = (id) => favorites.includes(id)
  const toggleFavorite = (id) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))

  // ── Saved searches ──
  const currentPayload = { search, types, grades, storages, locations, colors, carriers, maxPrice }
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
    setTypes(p.types || []); setGrades(p.grades || []); setStorages(p.storages || [])
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
          <p className="text-sm text-gray-400 dark:text-blue-300/50 mt-0.5">Browse available inventory and build a quote</p>
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
            <div key={d.id} className="flex-shrink-0 w-40 bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 p-3 relative">
              <button onClick={() => toggleFavorite(d.id)} className="absolute top-2 right-2 z-10">
                <Heart size={16} className={isFavorite(d.id) ? 'text-rose-500' : 'text-gray-300 dark:text-gray-500'} fill={isFavorite(d.id) ? 'currentColor' : 'none'} />
              </button>
              <div className="bg-yellow-400/15 rounded-xl h-20 flex items-center justify-center mb-2">
                <Smartphone size={30} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{d.name}</p>
              <p className="text-xs text-gray-400 dark:text-blue-300/50">Grade {d.grade} · {d.storage}GB</p>
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
            <FilterGroups stateByKey={stateByKey} toggle={toggle} dense />
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Max Price</p>
              <input type="range" min="150" max="500" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#0b1b3a]" />
              <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">Up to {fmt(maxPrice)}</p>
            </div>
            <SavedSearchPanel {...savedProps} />
          </div>
        )}

        {/* Catalog grid */}
        <div className="px-4 mt-4 grid grid-cols-2 gap-3">
          {filtered.map((d) => (
            <div key={d.id} className="bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 p-3">
              <div className="relative bg-gray-50 dark:bg-[#1e2d45] rounded-xl h-24 flex items-center justify-center mb-2">
                <Smartphone size={34} className="text-gray-300 dark:text-gray-500" />
                <button onClick={() => toggleFavorite(d.id)} className="absolute top-2 right-2">
                  <Heart size={16} className={isFavorite(d.id) ? 'text-rose-500' : 'text-gray-300 dark:text-gray-500'} fill={isFavorite(d.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="flex items-start justify-between gap-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{d.name}</p>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${gradeBadge[d.grade]}`}>{d.grade}</span>
              </div>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-0.5">{d.storage}GB · {d.color} · {d.carrier}</p>
              <p className="text-[11px] text-gray-400 dark:text-blue-300/40 mt-0.5">{d.location} · {d.qty.toLocaleString()} avail</p>
              <p className="text-gray-900 dark:text-white font-bold text-sm mt-1">from {fmt(d.price)}</p>
              <button onClick={() => addToQuote(d.id)} className="mt-2 w-full py-2 text-xs font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147]">Add to Quote</button>
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
            <ShoppingCart size={18} /> <span className="text-sm font-medium">View Quote ({cart.length})</span>
          </button>
        )}

        {/* Cart bottom sheet */}
        {cartOpen && (
          <div className="fixed inset-0 z-40 flex items-end bg-black/40" onClick={() => setCartOpen(false)}>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-h-[85vh] overflow-auto bg-white dark:bg-[#152035] rounded-t-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Your Quote</h3>
                <button onClick={() => setCartOpen(false)} className="text-gray-400"><X size={20} /></button>
              </div>
              <CartLines cart={cart} lineUnit={lineUnit} changeQty={changeQty} setCustomPrice={setCustomPrice} removeLine={removeLine} />
              <CartFooter cart={cart} subtotal={subtotal} cartCount={cartCount} />
            </div>
          </div>
        )}
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block md:p-4 xl:p-8">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Catalog</h1>
          <p className="text-sm text-gray-400 dark:text-blue-300/50 mt-0.5">Browse available inventory and build a quote</p>
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
            <div key={d.id} className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 relative">
              <button onClick={() => toggleFavorite(d.id)} className="absolute top-3 left-3 z-10">
                <Heart size={17} className={isFavorite(d.id) ? 'text-rose-500' : 'text-gray-300 dark:text-gray-500 hover:text-rose-400'} fill={isFavorite(d.id) ? 'currentColor' : 'none'} />
              </button>
              {d.tag && <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-400/15 text-yellow-600 dark:text-yellow-400">{d.tag}</span>}
              <div className="bg-yellow-400/15 rounded-xl h-24 flex items-center justify-center mb-3">
                <Smartphone size={38} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{d.name}</p>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-0.5">Grade {d.grade} · {d.storage}GB · {d.qty.toLocaleString()} avail</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-yellow-600 dark:text-yellow-400 font-bold">from {fmt(d.price)}</p>
                <button onClick={() => addToQuote(d.id)} className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[#0b1b3a] text-white hover:bg-[#0d2147]">Add</button>
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

            <FilterGroups stateByKey={stateByKey} toggle={toggle} />

            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Max Price</p>
              <input type="range" min="150" max="500" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#0b1b3a]" />
              <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">Up to {fmt(maxPrice)}</p>
            </div>

            <SavedSearchPanel {...savedProps} />
          </aside>

          {/* Catalog main */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4 gap-3">
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
                  <ShoppingCart size={16} /> View Quote ({cart.length})
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

            <p className="text-xs text-gray-400 mb-3">{filtered.length} devices {showFavorites ? 'in favorites' : 'available'}</p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((d) => (
                <div key={d.id} className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 flex flex-col">
                  <div className="relative bg-gray-50 dark:bg-[#1e2d45] rounded-xl h-28 flex items-center justify-center mb-3">
                    <Smartphone size={42} className="text-gray-300 dark:text-gray-500" />
                    <button onClick={() => toggleFavorite(d.id)} className="absolute top-2 right-2">
                      <Heart size={17} className={isFavorite(d.id) ? 'text-rose-500' : 'text-gray-300 dark:text-gray-500 hover:text-rose-400'} fill={isFavorite(d.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{d.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap ${gradeBadge[d.grade]}`}>Grade {d.grade}</span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-1">{d.storage}GB · {d.color} · {d.carrier}</p>
                  <p className="text-[11px] text-gray-400 dark:text-blue-300/40 mt-0.5">{d.location} · {d.qty.toLocaleString()} available</p>
                  <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-50 dark:border-gray-700">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide">from</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white leading-none">{fmt(d.price)}</p>
                    </div>
                    <button onClick={() => addToQuote(d.id)} className="flex items-center gap-1 px-3 py-2 text-xs font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147]">
                      <Plus size={14} /> Add to Quote
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
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Your Quote</h3>
                <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
              </div>
              <CartLines cart={cart} lineUnit={lineUnit} changeQty={changeQty} setCustomPrice={setCustomPrice} removeLine={removeLine} />
              <CartFooter cart={cart} subtotal={subtotal} cartCount={cartCount} />
            </aside>
          )}
        </div>
      </div>
    </>
  )
}

function FilterGroups({ stateByKey, toggle, dense }) {
  return (
    <>
      {Object.entries(filterGroups).map(([key, opts]) => {
        const [list, setList] = stateByKey[key]
        const meta = groupMeta[key]
        return (
          <div key={key} className={dense ? '' : 'mb-5'}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">{meta.label}</p>
            {dense ? (
              <div className="flex flex-wrap gap-2">
                {opts.map((o) => {
                  const on = list.includes(o)
                  return (
                    <button key={o} onClick={() => toggle(list, setList, o)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${on ? 'bg-[#0b1b3a] text-white border-[#0b1b3a]' : 'bg-white dark:bg-[#152035] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'}`}>
                      {meta.fmt(o)}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-1.5">
                {opts.map((o) => {
                  const on = list.includes(o)
                  return (
                    <label key={o} onClick={() => toggle(list, setList, o)} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                      <span className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${on ? 'bg-[#0b1b3a] border-[#0b1b3a]' : 'border-gray-300 dark:border-gray-600'}`}>
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
    <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
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

function CartLines({ cart, lineUnit, changeQty, setCustomPrice, removeLine }) {
  if (cart.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-8">No items yet. Add devices to build your quote.</p>
  }
  return (
    <div className="space-y-3 mb-4">
      {cart.map((i) => {
        const dev = devices.find((d) => d.id === i.id)
        return (
          <div key={i.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{dev.name}</p>
                <p className="text-xs text-gray-400 dark:text-blue-300/50">Grade {dev.grade} · {dev.storage}GB</p>
              </div>
              <button onClick={() => removeLine(i.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={15} /></button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button onClick={() => changeQty(i.id, -10)} className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"><Minus size={12} /></button>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-10 text-center">{i.qty}</span>
                <button onClick={() => changeQty(i.id, 10)} className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"><Plus size={12} /></button>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{fmt(lineUnit(i) * i.qty)}</p>
            </div>
            <div className="mt-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Your price / unit (list {fmt(dev.price)})</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input value={i.customPrice} onChange={(e) => setCustomPrice(i.id, e.target.value)} placeholder={dev.price.toFixed(2)} className="w-full pl-6 pr-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function CartFooter({ cart, subtotal, cartCount }) {
  if (cart.length === 0) return null
  return (
    <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-400">Units</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{cartCount.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">Subtotal</span>
        <span className="text-lg font-bold text-gray-900 dark:text-white">{fmt(subtotal)}</span>
      </div>
      <Link href="/quotes" className="block w-full text-center py-2.5 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] mb-2">
        Submit Quote for Review
      </Link>
      <p className="text-[11px] text-gray-400 dark:text-blue-300/50 text-center leading-snug">
        Prices shown are indicative. PCS will respond with confirmed pricing after review.
      </p>
    </div>
  )
}
