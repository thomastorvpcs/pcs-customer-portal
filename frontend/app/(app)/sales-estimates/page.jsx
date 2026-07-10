'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, Plus, Download, Copy, ShoppingCart, FileText, Check, X, ArrowLeft, ArrowRight, CircleDot, Reply, PackageCheck } from 'lucide-react'

const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 })

const initialEstimates = [
  {
    id: 'SE-2024-0142',
    created: 'Mar 26, 2024',
    validUntil: 'Apr 9, 2024',
    status: 'Accepted',
    orderId: 'SO-2024-0142',
    customer: 'John Davis',
    rep: 'Michael Torres',
    lineItems: [
      { product: 'iPhone 13 Pro', sku: 'APL-13P-128', grade: 'C6', storage: '128GB', qty: 200, yourPrice: 415.0, pcsPrice: 415.0 },
      { product: 'iPhone 12', sku: 'APL-12-64', grade: 'C2', storage: '64GB', qty: 150, yourPrice: 245.0, pcsPrice: 245.0 },
    ],
    history: [
      { date: 'Mar 26', label: 'Draft created', note: 'Built from catalog cart' },
      { date: 'Mar 26', label: 'Submitted', note: 'Sent to PCS for review' },
      { date: 'Mar 27', label: 'Under Review', note: 'Michael Torres reviewing' },
      { date: 'Mar 28', label: 'Accepted by PCS', note: 'Pricing confirmed by PCS' },
      { date: 'Mar 28', label: 'Converted to Sales Order', note: 'SO-2024-0142 created automatically on acceptance' },
    ],
  },
  {
    id: 'SE-2024-0141',
    created: 'Mar 25, 2024',
    validUntil: 'Apr 8, 2024',
    status: 'Counter-Offered',
    customer: 'John Davis',
    rep: 'Michael Torres',
    lineItems: [
      { product: 'Samsung Galaxy S23', sku: 'SAM-S23-256', grade: 'C6', storage: '256GB', qty: 300, yourPrice: 380.0, pcsPrice: 398.0 },
      { product: 'Galaxy A54', sku: 'SAM-A54-128', grade: 'C4', storage: '128GB', qty: 200, yourPrice: 165.0, pcsPrice: 172.0 },
    ],
    history: [
      { date: 'Mar 25', label: 'Draft created' },
      { date: 'Mar 25', label: 'Submitted', note: 'Proposed pricing sent' },
      { date: 'Mar 26', label: 'Under Review' },
      { date: 'Mar 27', label: 'Counter-Offered', note: 'PCS proposed revised pricing' },
    ],
  },
  {
    id: 'SE-2024-0140',
    created: 'Mar 24, 2024',
    validUntil: 'Apr 7, 2024',
    status: 'Under Review',
    customer: 'John Davis',
    rep: 'Michael Torres',
    lineItems: [
      { product: 'Google Pixel 8', sku: 'GOO-P8-128', grade: 'C5', storage: '128GB', qty: 120, yourPrice: 350.0, pcsPrice: null },
      { product: 'Pixel 8 Pro', sku: 'GOO-P8P-256', grade: 'C6', storage: '256GB', qty: 80, yourPrice: 520.0, pcsPrice: null },
    ],
    history: [
      { date: 'Mar 24', label: 'Draft created' },
      { date: 'Mar 24', label: 'Submitted' },
      { date: 'Mar 25', label: 'Under Review', note: 'Awaiting PCS pricing confirmation' },
    ],
  },
  {
    id: 'SE-2024-0139',
    created: 'Mar 23, 2024',
    validUntil: 'Apr 6, 2024',
    status: 'Submitted',
    customer: 'John Davis',
    rep: 'Michael Torres',
    lineItems: [
      { product: 'iPhone 14', sku: 'APL-14-128', grade: 'C5', storage: '128GB', qty: 250, yourPrice: 480.0, pcsPrice: null },
    ],
    history: [
      { date: 'Mar 23', label: 'Draft created' },
      { date: 'Mar 23', label: 'Submitted', note: 'Sent to PCS for review' },
    ],
  },
  {
    id: 'SE-2024-0138',
    created: 'Mar 22, 2024',
    validUntil: 'Apr 5, 2024',
    status: 'Draft',
    customer: 'John Davis',
    rep: 'Michael Torres',
    lineItems: [
      { product: 'Samsung Galaxy S22', sku: 'SAM-S22-128', grade: 'C4', storage: '128GB', qty: 100, yourPrice: 290.0, pcsPrice: null },
      { product: 'iPhone 13', sku: 'APL-13-128', grade: 'C4', storage: '128GB', qty: 60, yourPrice: 355.0, pcsPrice: null },
    ],
    history: [
      { date: 'Mar 22', label: 'Draft created', note: 'Not yet submitted' },
    ],
  },
  {
    id: 'SE-2024-0137',
    created: 'Mar 18, 2024',
    validUntil: 'Apr 1, 2024',
    status: 'Rejected',
    customer: 'John Davis',
    rep: 'Michael Torres',
    lineItems: [
      { product: 'Google Pixel 7', sku: 'GOO-P7-128', grade: 'C4', storage: '128GB', qty: 90, yourPrice: 210.0, pcsPrice: 265.0 },
    ],
    history: [
      { date: 'Mar 18', label: 'Draft created' },
      { date: 'Mar 18', label: 'Submitted' },
      { date: 'Mar 19', label: 'Under Review' },
      { date: 'Mar 20', label: 'Rejected', note: 'Proposed price below floor' },
    ],
  },
]

const statusStyles = {
  Draft: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  Submitted: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  'Under Review': 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  'Counter-Offered': 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  Accepted: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  Declined: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  Rejected: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  Expired: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
}

const estimateKpis = [
  { label: 'All', filter: 'All' },
  { label: 'Draft', filter: 'Draft' },
  { label: 'Submitted', filter: 'Submitted' },
  { label: 'Under Review', filter: 'Under Review' },
  { label: 'Accepted', filter: 'Accepted' },
]

const itemCount = (q) => q.lineItems.reduce((a, i) => a + i.qty, 0)
const estimateTotal = (q) => q.lineItems.reduce((a, i) => a + (i.pcsPrice ?? i.yourPrice) * i.qty, 0)

export default function SalesEstimatesPage() {
  const [estimates, setEstimates] = useState(initialEstimates)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedId, setSelectedId] = useState(initialEstimates[0].id)
  const [mobileSelectedId, setMobileSelectedId] = useState(null)

  const filtered = activeFilter === 'All' ? estimates : estimates.filter((q) => q.status === activeFilter)
  const selected = estimates.find((q) => q.id === selectedId)
  const mobileSelected = estimates.find((q) => q.id === mobileSelectedId)

  const getCount = (filter) => (filter === 'All' ? estimates.length : estimates.filter((q) => q.status === filter).length)
  const getValue = (filter) => {
    const subset = filter === 'All' ? estimates : estimates.filter((q) => q.status === filter)
    return '$' + subset.reduce((acc, q) => acc + estimateTotal(q), 0).toLocaleString()
  }

  // ── Lifecycle actions on a counter-offer ──
  const updateEstimate = (id, updater) => setEstimates((list) => list.map((e) => (e.id === id ? updater(e) : e)))
  const withHistory = (e, label, note) => ({ ...e, history: [...e.history, { date: 'Today', label, note }] })

  // Accepting PCS's counter-offer reaches agreement, so the estimate is
  // automatically converted into a sales order — no separate accept step.
  const acceptCounter = (id) =>
    updateEstimate(id, (e) => {
      const orderId = e.id.replace('SE', 'SO')
      const lineItems = e.lineItems.map((li) => ({ ...li, yourPrice: li.pcsPrice ?? li.yourPrice }))
      let ne = withHistory(e, 'Counter-offer accepted', 'You accepted the revised PCS pricing')
      ne = withHistory(ne, 'Converted to Sales Order', `${orderId} created automatically on acceptance`)
      return { ...ne, status: 'Accepted', orderId, lineItems }
    })

  const declineCounter = (id) =>
    updateEstimate(id, (e) => ({ ...withHistory(e, 'Counter-offer declined', 'You declined the revised PCS pricing'), status: 'Declined' }))

  // Countering the counter sends revised pricing back to PCS for another review round.
  const sendCounter = (id, prices) =>
    updateEstimate(id, (e) => {
      const lineItems = e.lineItems.map((li) => ({ ...li, yourPrice: Number(prices[li.sku]) || li.yourPrice, pcsPrice: null }))
      return { ...withHistory(e, 'Counter-offer sent', 'You proposed revised pricing; awaiting PCS review'), status: 'Under Review', lineItems }
    })

  const LineItemsTable = ({ estimate }) => (
    <div className="overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-700 text-left">
            {['Product', 'SKU', 'Grade', 'Storage', 'Qty', 'Your Price', 'PCS Price'].map((h) => (
              <th key={h} className="px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
          {estimate.lineItems.map((it) => (
            <tr key={it.sku}>
              <td className="px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">{it.product}</td>
              <td className="px-3 py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap">{it.sku}</td>
              <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{it.grade}</td>
              <td className="px-3 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap">{it.storage}</td>
              <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{it.qty}</td>
              <td className="px-3 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmt(it.yourPrice)}</td>
              <td className="px-3 py-2 whitespace-nowrap font-medium text-yellow-600 dark:text-yellow-400">{it.pcsPrice != null ? fmt(it.pcsPrice) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const Timeline = ({ estimate }) => (
    <div className="space-y-0">
      {estimate.history.map((ev, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <CircleDot size={16} className={i === estimate.history.length - 1 ? 'text-[#0b1b3a] dark:text-blue-400' : 'text-gray-300 dark:text-gray-600'} />
            {i < estimate.history.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-600 my-0.5" />}
          </div>
          <div className="pb-4">
            <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">{ev.label}</p>
            <p className="text-[10px] text-gray-400 dark:text-blue-300/50 mt-1">{ev.date}</p>
            {ev.note && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{ev.note}</p>}
          </div>
        </div>
      ))}
    </div>
  )

  const ActionButtons = ({ estimate }) => (
    <div className="md:mb-3 xl:mb-5">
      {estimate.status === 'Accepted' && estimate.orderId && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/40 rounded-lg px-4 py-3">
          <div className="flex items-start gap-2 flex-1">
            <PackageCheck size={16} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">
              Accepted by PCS and automatically converted to Sales Order <span className="font-semibold text-gray-900 dark:text-white">{estimate.orderId}</span>.
            </p>
          </div>
          <Link href="/orders" className="flex items-center justify-center gap-1.5 px-4 py-2 text-sm bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors font-medium whitespace-nowrap">
            View Sales Order <ArrowRight size={14} />
          </Link>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
          <Download size={14} /> Download PDF
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
          <Copy size={14} /> Duplicate
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] pb-4">
        {mobileSelected ? (
          /* Detail View */
          <div>
            <div className="flex items-center gap-3 px-4 pt-5 pb-4">
              <button onClick={() => setMobileSelectedId(null)} className="text-blue-500">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">{mobileSelected.id}</h1>
              <span className={`ml-auto px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[mobileSelected.status]}`}>
                {mobileSelected.status}
              </span>
            </div>

            <div className="px-4 space-y-4">
              {/* Summary */}
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Created', value: mobileSelected.created },
                    { label: 'Valid Until', value: mobileSelected.validUntil },
                    { label: 'Items', value: itemCount(mobileSelected) },
                    { label: 'Total', value: fmt(estimateTotal(mobileSelected)) },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{s.label}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {mobileSelected.status === 'Counter-Offered' && (
                <CounterPanel estimate={mobileSelected} onAccept={acceptCounter} onDecline={declineCounter} onSendCounter={sendCounter} />
              )}

              {/* Line items */}
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Line Items</h3>
                <LineItemsTable estimate={mobileSelected} />
              </div>

              {/* Status history */}
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Status History</h3>
                <Timeline estimate={mobileSelected} />
              </div>

              <ActionButtons estimate={mobileSelected} />
            </div>
          </div>
        ) : (
          /* List View */
          <>
            <div className="flex items-center justify-between px-4 pt-5 pb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Estimates</h1>
              <Link href="/catalog" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-xl">
                <Plus size={16} /> New Estimate
              </Link>
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-[#152035] rounded-xl mx-4 px-4 py-3 mb-4 border border-gray-100 dark:border-white/5">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input
                placeholder="Search by estimate #..."
                className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto px-4 pb-2 mb-4 scrollbar-none">
              {estimateKpis.map((kpi) => (
                <button
                  key={kpi.filter}
                  onClick={() => setActiveFilter(kpi.filter)}
                  className={`flex-shrink-0 w-28 rounded-2xl p-3 text-left border transition-all ${
                    activeFilter === kpi.filter
                      ? 'bg-[#0b1b3a] border-[#0b1b3a]'
                      : 'bg-white dark:bg-[#152035] border-gray-100 dark:border-white/5'
                  }`}
                >
                  <p className={`text-[10px] font-semibold uppercase tracking-wide mb-1.5 ${activeFilter === kpi.filter ? 'text-blue-200/70' : 'text-gray-400 dark:text-blue-300/50'}`}>{kpi.label}</p>
                  <p className={`text-2xl font-bold leading-none mb-1 ${activeFilter === kpi.filter ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{getCount(kpi.filter)}</p>
                  <p className={`text-xs ${activeFilter === kpi.filter ? 'text-blue-200/60' : 'text-gray-400 dark:text-blue-300/50'}`}>{getValue(kpi.filter)}</p>
                </button>
              ))}
            </div>

            <div className="px-4 space-y-3">
              {filtered.map((estimate) => (
                <button
                  key={estimate.id}
                  onClick={() => setMobileSelectedId(estimate.id)}
                  className="w-full text-left bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5"
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-base font-bold text-gray-900 dark:text-white">{estimate.id}</p>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusStyles[estimate.status]}`}>
                      {estimate.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-3">{estimate.created}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 dark:text-blue-300/40 uppercase tracking-wide mb-1">Items</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{itemCount(estimate)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 dark:text-blue-300/40 uppercase tracking-wide mb-1">Total</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{fmt(estimateTotal(estimate))}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 dark:text-blue-300/40 uppercase tracking-wide mb-1">Valid</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{estimate.validUntil}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex flex-col md:p-4 xl:p-8 h-full min-h-0">

        {/* Search + actions */}
        <div className="flex items-center justify-between md:mb-3 xl:mb-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search by estimate #..."
              className="pl-8 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg md:w-60 xl:w-80 bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#152035] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">
              <SlidersHorizontal size={14} /> Filter
            </button>
            <Link href="/catalog" className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors font-medium">
              <Plus size={14} /> New Sales Estimate
            </Link>
          </div>
        </div>

        {/* KPI Filter Bar */}
        <div className="grid grid-cols-5 md:gap-2 xl:gap-3 md:mb-3 xl:mb-4">
          {estimateKpis.map((kpi) => (
            <button
              key={kpi.filter}
              onClick={() => setActiveFilter(kpi.filter)}
              className={`rounded-xl md:p-3 xl:p-4 text-left border transition-all ${
                activeFilter === kpi.filter
                  ? 'bg-[#0b1b3a] border-[#0b1b3a] shadow-md'
                  : 'bg-white dark:bg-[#152035] border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-sm'
              }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${activeFilter === kpi.filter ? 'text-blue-200/70' : 'text-gray-400 dark:text-gray-500'}`}>{kpi.label}</p>
              <p className={`md:text-xl xl:text-2xl font-bold leading-none md:mb-0.5 xl:mb-1 ${activeFilter === kpi.filter ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{getCount(kpi.filter)}</p>
              <p className={`text-xs ${activeFilter === kpi.filter ? 'text-blue-200/60' : 'text-gray-400 dark:text-gray-500'}`}>{getValue(kpi.filter)}</p>
            </button>
          ))}
        </div>

        <div className="flex md:gap-3 xl:gap-4 flex-1 min-h-0">

          {/* Left: Estimate List */}
          <div className="md:w-[300px] xl:w-[380px] flex-shrink-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col min-h-0">

            <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Estimate</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total</span>
            </div>

            <div className="flex-1 overflow-auto divide-y divide-gray-50 dark:divide-gray-700">
              {filtered.map((estimate) => (
                <button
                  key={estimate.id}
                  onClick={() => setSelectedId(estimate.id)}
                  className={`w-full text-left px-4 py-3 grid grid-cols-[1fr_auto_auto] gap-2 items-center transition-colors ${
                    selectedId === estimate.id
                      ? 'bg-[#0b1b3a] dark:bg-blue-900/40'
                      : 'hover:bg-gray-50 dark:hover:bg-[#1a2540]'
                  }`}
                >
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${selectedId === estimate.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {estimate.id}
                    </p>
                    <p className={`text-xs truncate mt-0.5 ${selectedId === estimate.id ? 'text-blue-200/70' : 'text-gray-400'}`}>
                      {itemCount(estimate)} items · {estimate.created}
                    </p>
                    <p className={`text-xs mt-0.5 ${selectedId === estimate.id ? 'text-blue-200/50' : 'text-gray-400'}`}>
                      Valid until {estimate.validUntil}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    selectedId === estimate.id ? 'bg-white/10 text-white' : statusStyles[estimate.status]
                  }`}>
                    {estimate.status}
                  </span>
                  <span className={`text-sm font-medium whitespace-nowrap ${selectedId === estimate.id ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                    {fmt(estimateTotal(estimate))}
                  </span>
                </button>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <span className="text-xs text-gray-400">Showing 1–{filtered.length} of {estimates.length}</span>
              <button className="text-xs text-blue-600 hover:underline font-medium">Next</button>
            </div>
          </div>

          {/* Right: Estimate Detail */}
          {selected && (
            <div className="flex-1 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-auto">
              <div className="md:p-4 xl:p-6">

                {/* Estimate header */}
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="md:text-base xl:text-xl font-bold text-gray-900 dark:text-white">{selected.id}</h2>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[selected.status]}`}>
                        {selected.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{selected.customer} · Rep: {selected.rep}</p>
                  </div>
                </div>

                {/* Summary grid */}
                <div className="grid grid-cols-4 md:gap-3 xl:gap-4 md:mt-3 md:mb-3 xl:mt-5 xl:mb-5">
                  {[
                    { label: 'Created', value: selected.created },
                    { label: 'Valid Until', value: selected.validUntil },
                    { label: 'Item Count', value: itemCount(selected) },
                    { label: 'Total', value: fmt(estimateTotal(selected)) },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                      <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">{value}</p>
                    </div>
                  ))}
                </div>

                {selected.status === 'Counter-Offered' && (
                  <CounterPanel estimate={selected} onAccept={acceptCounter} onDecline={declineCounter} onSendCounter={sendCounter} />
                )}

                {/* Line items table */}
                <div className="md:mb-3 xl:mb-5">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Line Items</p>
                  <LineItemsTable estimate={selected} />
                </div>

                {/* Status history */}
                <div className="md:mb-3 xl:mb-5">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Status History</p>
                  <Timeline estimate={selected} />
                </div>

                {/* Action buttons */}
                <ActionButtons estimate={selected} />

                {/* Documents */}
                <div className="border border-gray-100 dark:border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">Sales Estimate Document</p>
                    <p className="text-xs text-gray-400">Download a PDF copy of this sales estimate and its pricing</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-amber-400 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-400/10 transition-colors whitespace-nowrap font-medium">
                    <FileText size={13} /> Download PDF
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// Counter-offer panel: when PCS returns a counter-offer, the customer can
// accept it (which auto-converts to a sales order), decline it, or counter
// back with their own revised pricing.
function CounterPanel({ estimate, onAccept, onDecline, onSendCounter }) {
  const [countering, setCountering] = useState(false)
  const [prices, setPrices] = useState(() =>
    Object.fromEntries(estimate.lineItems.map((li) => [li.sku, String(li.yourPrice)]))
  )

  const setPrice = (sku, val) => setPrices((p) => ({ ...p, [sku]: val.replace(/[^0-9.]/g, '') }))

  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/40 rounded-lg px-4 py-3 md:mb-3 xl:mb-5">
      <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-1">PCS proposed revised pricing</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
        {estimate.rep} has counter-offered on this estimate. Review the PCS Price column, then accept it, decline it, or counter with your own pricing.
      </p>

      {!countering ? (
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onAccept(estimate.id)} className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors font-medium">
            <Check size={14} /> Accept
          </button>
          <button onClick={() => onDecline(estimate.id)} className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
            <X size={14} /> Decline
          </button>
          <button onClick={() => setCountering(true)} className="flex items-center gap-1.5 px-3 py-2 text-sm border border-purple-300 dark:border-purple-700 rounded-lg text-purple-700 dark:text-purple-300 hover:bg-purple-100/60 dark:hover:bg-purple-900/30 transition-colors">
            <Reply size={14} /> Counter
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#152035] border border-purple-100 dark:border-purple-800/40 rounded-lg p-3">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2">Your counter-offer — proposed unit price</p>
          <div className="space-y-2 mb-3">
            {estimate.lineItems.map((li) => (
              <div key={li.sku} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{li.product}</p>
                  <p className="text-[10px] text-gray-400">PCS: {li.pcsPrice != null ? fmt(li.pcsPrice) : '—'} · was {fmt(li.yourPrice)}</p>
                </div>
                <div className="relative flex-shrink-0">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    value={prices[li.sku]}
                    onChange={(e) => setPrice(li.sku, e.target.value)}
                    className="w-28 pl-6 pr-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => onSendCounter(estimate.id, prices)} className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors font-medium">
              <Reply size={14} /> Send counter-offer
            </button>
            <button onClick={() => setCountering(false)} className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
