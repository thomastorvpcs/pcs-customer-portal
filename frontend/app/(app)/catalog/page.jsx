'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Smartphone, Plus, Minus, ShoppingCart, X, Tag, ArrowRight, SlidersHorizontal, Trash2, CheckCircle2 } from 'lucide-react'

const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 })

const devices = [
  { id: 'D1', name: 'iPhone 13 Pro', type: 'iPhone', grade: 'A', storage: 128, price: 229, qty: 1240, hot: true, tag: 'Spring Clearance' },
  { id: 'D2', name: 'iPhone 14', type: 'iPhone', grade: 'A', storage: 256, price: 389, qty: 860, hot: true, tag: 'Best Seller' },
  { id: 'D3', name: 'iPhone 13', type: 'iPhone', grade: 'B', storage: 128, price: 199, qty: 2100, hot: false },
  { id: 'D4', name: 'Samsung Galaxy S23', type: 'Samsung', grade: 'A', storage: 256, price: 349, qty: 540, hot: true, tag: 'New Arrival' },
  { id: 'D5', name: 'Samsung Galaxy S22', type: 'Samsung', grade: 'B', storage: 128, price: 219, qty: 980, hot: false },
  { id: 'D6', name: 'Google Pixel 8', type: 'Pixel', grade: 'A', storage: 128, price: 299, qty: 420, hot: true, tag: 'Limited' },
  { id: 'D7', name: 'Google Pixel 7', type: 'Pixel', grade: 'B', storage: 128, price: 189, qty: 610, hot: false },
  { id: 'D8', name: 'iPhone 14', type: 'iPhone', grade: 'B', storage: 128, price: 319, qty: 730, hot: false },
  { id: 'D9', name: 'Samsung Galaxy S23', type: 'Samsung', grade: 'B', storage: 512, price: 379, qty: 210, hot: false },
  { id: 'D10', name: 'Samsung Galaxy S22', type: 'Samsung', grade: 'A', storage: 256, price: 259, qty: 340, hot: false },
  { id: 'D11', name: 'Google Pixel 8', type: 'Pixel', grade: 'B', storage: 256, price: 269, qty: 155, hot: false },
  { id: 'D12', name: 'iPhone 13 Pro', type: 'iPhone', grade: 'A', storage: 256, price: 279, qty: 480, hot: false },
]

const filterGroups = {
  type: ['iPhone', 'Samsung', 'Pixel'],
  grade: ['A', 'B'],
  storage: [64, 128, 256, 512],
}

const gradeBadge = {
  A: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  B: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
}

export default function CatalogPage() {
  const [types, setTypes] = useState([])
  const [grades, setGrades] = useState([])
  const [storages, setStorages] = useState([])
  const [maxPrice, setMaxPrice] = useState(500)
  const [sort, setSort] = useState('Price')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([]) // { id, qty, customPrice }
  const [cartOpen, setCartOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const toggle = (list, setList, val) =>
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val])

  const filtered = devices
    .filter((d) => (types.length ? types.includes(d.type) : true))
    .filter((d) => (grades.length ? grades.includes(d.grade) : true))
    .filter((d) => (storages.length ? storages.includes(d.storage) : true))
    .filter((d) => d.price <= maxPrice)
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
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

  const activeFilterCount = types.length + grades.length + storages.length + (maxPrice < 500 ? 1 : 0)

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
            <div key={d.id} className="flex-shrink-0 w-40 bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 p-3">
              <div className="bg-yellow-400/15 rounded-xl h-20 flex items-center justify-center mb-2">
                <Smartphone size={30} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{d.name}</p>
              <p className="text-xs text-gray-400 dark:text-blue-300/50">Grade {d.grade} · {d.storage}GB</p>
              <p className="text-yellow-600 dark:text-yellow-400 font-bold text-sm mt-1">from {fmt(d.price)}</p>
            </div>
          ))}
        </div>

        {/* Search + filter chips */}
        <div className="px-4 mt-2">
          <div className="flex items-center gap-2 bg-white dark:bg-[#152035] rounded-xl px-4 py-3 border border-gray-100 dark:border-white/5">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search devices..." className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none" />
            <button onClick={() => setFiltersOpen((v) => !v)} className="text-gray-500 dark:text-gray-400"><SlidersHorizontal size={18} /></button>
          </div>
        </div>

        {filtersOpen && (
          <div className="px-4 mt-3 space-y-3">
            {Object.entries(filterGroups).map(([key, opts]) => {
              const [list, setList] = key === 'type' ? [types, setTypes] : key === 'grade' ? [grades, setGrades] : [storages, setStorages]
              return (
                <div key={key}>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{key === 'type' ? 'Device Type' : key === 'grade' ? 'Grade' : 'Storage'}</p>
                  <div className="flex flex-wrap gap-2">
                    {opts.map((o) => {
                      const on = list.includes(o)
                      return (
                        <button key={o} onClick={() => toggle(list, setList, o)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${on ? 'bg-[#0b1b3a] text-white border-[#0b1b3a]' : 'bg-white dark:bg-[#152035] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'}`}>
                          {key === 'grade' ? 'Grade ' + o : key === 'storage' ? o + 'GB' : o}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Catalog grid */}
        <div className="px-4 mt-4 grid grid-cols-2 gap-3">
          {filtered.map((d) => (
            <div key={d.id} className="bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 p-3">
              <div className="bg-gray-50 dark:bg-[#1e2d45] rounded-xl h-24 flex items-center justify-center mb-2">
                <Smartphone size={34} className="text-gray-300 dark:text-gray-500" />
              </div>
              <div className="flex items-start justify-between gap-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{d.name}</p>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${gradeBadge[d.grade]}`}>{d.grade}</span>
              </div>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-0.5">{d.storage}GB · {d.qty.toLocaleString()} avail</p>
              <p className="text-gray-900 dark:text-white font-bold text-sm mt-1">from {fmt(d.price)}</p>
              <button onClick={() => addToQuote(d.id)} className="mt-2 w-full py-2 text-xs font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147]">Add to Quote</button>
            </div>
          ))}
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
          <aside className="w-[220px] flex-shrink-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 self-start">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Filters</h3>
              {activeFilterCount > 0 && (
                <button onClick={() => { setTypes([]); setGrades([]); setStorages([]); setMaxPrice(500) }} className="text-xs text-blue-600 hover:underline">Clear</button>
              )}
            </div>

            {Object.entries(filterGroups).map(([key, opts]) => {
              const [list, setList] = key === 'type' ? [types, setTypes] : key === 'grade' ? [grades, setGrades] : [storages, setStorages]
              return (
                <div key={key} className="mb-5">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">{key === 'type' ? 'Device Type' : key === 'grade' ? 'Grade' : 'Storage'}</p>
                  <div className="space-y-1.5">
                    {opts.map((o) => {
                      const on = list.includes(o)
                      return (
                        <label key={o} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                          <span onClick={() => toggle(list, setList, o)} className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${on ? 'bg-[#0b1b3a] border-[#0b1b3a]' : 'border-gray-300 dark:border-gray-600'}`}>
                            {on && <CheckCircle2 size={12} className="text-white" />}
                          </span>
                          <span onClick={() => toggle(list, setList, o)}>{key === 'grade' ? 'Grade ' + o : key === 'storage' ? o + 'GB' : o}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Max Price</p>
              <input type="range" min="150" max="500" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#0b1b3a]" />
              <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">Up to {fmt(maxPrice)}</p>
            </div>
          </aside>

          {/* Catalog main */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4 gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search devices..." className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex items-center gap-3">
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

            <p className="text-xs text-gray-400 mb-3">{filtered.length} devices available</p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((d) => (
                <div key={d.id} className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 flex flex-col">
                  <div className="bg-gray-50 dark:bg-[#1e2d45] rounded-xl h-28 flex items-center justify-center mb-3">
                    <Smartphone size={42} className="text-gray-300 dark:text-gray-500" />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{d.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap ${gradeBadge[d.grade]}`}>Grade {d.grade}</span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-1">{d.storage}GB · {d.qty.toLocaleString()} available</p>
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
                <div className="col-span-full text-center py-12 text-sm text-gray-400">No devices match your filters.</div>
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
