'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus, ArrowLeft, ExternalLink, Download, FileText, LifeBuoy, Image as ImageIcon,
  UploadCloud, Trash2, X, CheckCircle2, CircleDot, Circle, SlidersHorizontal, Package,
} from 'lucide-react'

const complaintReasons = [
  'Dead Pixel', 'Cracked LCD', 'Battery Drain', 'WiFi Not Working', 'Bluetooth',
  'Charging Port', 'Speaker/Mic', 'Face ID', 'Touch ID', 'Camera', 'Water Damage',
  'Cosmetic Damage', 'Wrong Item', 'Missing Accessories', 'Software Issue',
  'Carrier Lock', 'IMEI Mismatch', 'Other',
]

const mockOrders = ['PCS-2024-1847', 'PCS-2024-1846', 'PCS-2024-1845', 'PCS-2024-1844', 'PCS-2024-1843']

const stages = ['Submitted', 'Under Review', 'Approved', 'Shipped', 'Received', 'Diagnostic', 'Complete']

function buildTimeline(reachedIndex) {
  return stages.map((label, i) => ({
    label,
    done: i < reachedIndex,
    active: i === reachedIndex,
  }))
}

const returns = [
  {
    id: 'RMA-2024-0087',
    order: 'PCS-2024-1845',
    created: 'Mar 26, 2024',
    status: 'Complete',
    resolution: 'Credit memo CM-3391 issued',
    creditMemo: 'CM-3391',
    devices: [
      { imei: '354872109348721', model: 'iPhone 13 Pro 128GB', complaintReason: 'Cracked LCD' },
      { imei: '354872109348722', model: 'iPhone 13 Pro 128GB', complaintReason: 'Battery Drain' },
    ],
    evidence: ['front_cracked.jpg', 'boot_screen.jpg'],
    timeline: buildTimeline(7),
  },
  {
    id: 'RMA-2024-0086',
    order: 'PCS-2024-1846',
    created: 'Mar 27, 2024',
    status: 'Shipped',
    resolution: 'Replacement shipped · FedEx 748920034812',
    creditMemo: null,
    devices: [
      { imei: '359102847561023', model: 'Galaxy S23 256GB', complaintReason: 'Charging Port' },
    ],
    evidence: ['charging_port.jpg'],
    timeline: buildTimeline(3),
  },
  {
    id: 'RMA-2024-0085',
    order: 'PCS-2024-1847',
    created: 'Mar 28, 2024',
    status: 'Approved',
    resolution: 'Return label issued — awaiting shipment',
    creditMemo: null,
    devices: [
      { imei: '354120983746512', model: 'iPhone 13 Pro 256GB', complaintReason: 'Dead Pixel' },
      { imei: '354120983746513', model: 'iPhone 13 Pro 256GB', complaintReason: 'Face ID' },
      { imei: '354120983746514', model: 'iPhone 12 64GB', complaintReason: 'WiFi Not Working' },
    ],
    evidence: ['dead_pixel_1.jpg', 'faceid_error.jpg'],
    timeline: buildTimeline(2),
  },
  {
    id: 'RMA-2024-0084',
    order: 'PCS-2024-1844',
    created: 'Mar 29, 2024',
    status: 'Under Review',
    resolution: 'Pending review',
    creditMemo: null,
    devices: [
      { imei: '357294018273645', model: 'Pixel 8 Pro 128GB', complaintReason: 'Water Damage' },
    ],
    evidence: ['water_indicator.jpg'],
    timeline: buildTimeline(1),
  },
  {
    id: 'RMA-2024-0083',
    order: 'PCS-2024-1843',
    created: 'Mar 30, 2024',
    status: 'Submitted',
    resolution: 'Pending',
    creditMemo: null,
    devices: [
      { imei: '353781092836471', model: 'iPhone 13 128GB', complaintReason: 'Wrong Item' },
      { imei: '353781092836472', model: 'iPhone 13 Mini 128GB', complaintReason: 'Missing Accessories' },
    ],
    evidence: ['box_contents.jpg'],
    timeline: buildTimeline(0),
  },
]

const statusStyles = {
  Submitted: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  'Under Review': 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  Approved: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
  Shipped: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  Received: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  Diagnostic: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  Complete: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
}

const mobileStatusStyles = {
  Submitted: 'bg-blue-500/15 text-blue-400',
  'Under Review': 'bg-amber-500/15 text-amber-400',
  Approved: 'bg-teal-500/15 text-teal-400',
  Shipped: 'bg-indigo-500/15 text-indigo-400',
  Received: 'bg-purple-500/15 text-purple-400',
  Diagnostic: 'bg-amber-500/15 text-amber-400',
  Complete: 'bg-green-500/15 text-green-400',
}

const kpis = [
  { label: 'All', filter: 'All' },
  { label: 'Submitted', filter: 'Submitted' },
  { label: 'Approved', filter: 'Approved' },
  { label: 'In Transit', filter: 'Shipped' },
  { label: 'Complete', filter: 'Complete' },
]

const rank = (status) => stages.indexOf(status)
const isApprovedPlus = (status) => rank(status) >= rank('Approved')
const isComplete = (status) => status === 'Complete'

function StatusTimeline({ timeline, variant = 'desktop' }) {
  if (variant === 'mobile') {
    return (
      <div className="flex flex-col">
        {timeline.map((step, i) => (
          <div key={step.label} className="flex items-stretch gap-3">
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0 z-10">
                {step.done ? (
                  <CheckCircle2 size={20} className="text-green-500" fill="#f0fdf4" />
                ) : step.active ? (
                  <CircleDot size={20} className="text-blue-500" fill="#eff6ff" />
                ) : (
                  <Circle size={20} className="text-gray-300 dark:text-gray-600" fill="white" />
                )}
              </div>
              {i < timeline.length - 1 && (
                <div className={`w-0.5 flex-1 my-1 ${step.done ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-600'}`} />
              )}
            </div>
            <p className={`text-xs font-medium pb-4 pt-0.5 ${step.active ? 'text-blue-600' : step.done ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>
              {step.label}
            </p>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="flex items-start">
      {timeline.map((step, i) => (
        <div key={step.label} className="flex items-start flex-1">
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {i > 0 && <div className={`flex-1 h-0.5 -mr-1 ${timeline[i - 1].done ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-600'}`} />}
              <div className="flex-shrink-0 z-10">
                {step.done ? (
                  <CheckCircle2 size={22} className="text-green-500" fill="#f0fdf4" />
                ) : step.active ? (
                  <CircleDot size={22} className="text-blue-500" fill="#eff6ff" />
                ) : (
                  <Circle size={22} className="text-gray-300 dark:text-gray-600" fill="white" />
                )}
              </div>
              {i < timeline.length - 1 && <div className={`flex-1 h-0.5 -ml-1 ${step.done ? 'bg-green-400' : step.active ? 'bg-blue-300 dark:bg-blue-700' : 'bg-gray-200 dark:bg-gray-600'}`} />}
            </div>
            <p className={`text-[11px] font-medium mt-2 text-center leading-tight ${step.done ? 'text-gray-700 dark:text-gray-300' : step.active ? 'text-blue-600' : 'text-gray-400'}`}>{step.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function DevicesTable({ devices }) {
  return (
    <div className="border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="grid grid-cols-[1.4fr_1.4fr_1fr] gap-2 px-3 py-2 bg-gray-50 dark:bg-[#1a2540] border-b border-gray-100 dark:border-gray-700">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">IMEI</span>
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Model</span>
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Complaint Reason</span>
      </div>
      <div className="divide-y divide-gray-50 dark:divide-gray-700">
        {devices.map((d) => (
          <div key={d.imei} className="grid grid-cols-[1.4fr_1.4fr_1fr] gap-2 px-3 py-2.5">
            <span className="text-xs font-mono text-gray-700 dark:text-gray-300 truncate">{d.imei}</span>
            <span className="text-xs text-gray-800 dark:text-gray-200 truncate">{d.model}</span>
            <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium truncate">{d.complaintReason}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EvidenceStrip({ evidence }) {
  return (
    <div className="flex flex-wrap gap-3">
      {evidence.map((name) => (
        <div key={name} className="w-24">
          <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-[#1a2540] border border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <ImageIcon size={26} className="text-gray-400 dark:text-blue-300/50" />
          </div>
          <p className="text-[10px] text-gray-400 dark:text-blue-300/50 mt-1 truncate">{name}</p>
        </div>
      ))}
    </div>
  )
}

function NewRmaForm({ onCancel, onSubmit }) {
  const [order, setOrder] = useState('')
  const [rows, setRows] = useState([{ imei: '', complaintReason: '' }])

  const updateRow = (i, key, value) => setRows(rows.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)))
  const addRow = () => setRows([...rows, { imei: '', complaintReason: '' }])
  const removeRow = (i) => setRows(rows.length > 1 ? rows.filter((_, idx) => idx !== i) : rows)

  return (
    <div className="space-y-5">
      {/* Step 1: Order */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">1 · Select Order</p>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose an order…</option>
          {mockOrders.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {/* Step 2: Devices */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">2 · Devices</p>
          <button onClick={addRow} className="flex items-center gap-1 text-xs font-medium text-[#0b1b3a] dark:text-blue-400 hover:underline">
            <Plus size={13} /> Add device
          </button>
        </div>
        <div className="space-y-2">
          {rows.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={row.imei}
                onChange={(e) => updateRow(i, 'imei', e.target.value)}
                placeholder="15-digit IMEI"
                maxLength={15}
                className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <select
                value={row.complaintReason}
                onChange={(e) => updateRow(i, 'complaintReason', e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Complaint reason…</option>
                {complaintReasons.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <button onClick={() => removeRow(i)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Evidence */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">3 · Evidence</p>
        <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg px-4 py-8 flex flex-col items-center justify-center text-center">
          <UploadCloud size={26} className="text-gray-400 dark:text-blue-300/50 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Drop photos here or click to upload</p>
          <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-1">PNG, JPG up to 10MB each</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onSubmit}
          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors font-medium"
        >
          <CheckCircle2 size={14} /> Submit RMA
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default function ReturnsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState(returns[0])
  const [mobileSelected, setMobileSelected] = useState(null)
  const [showNew, setShowNew] = useState(false)

  const filtered = activeFilter === 'All' ? returns : returns.filter((r) => r.status === activeFilter)
  const getCount = (filter) => (filter === 'All' ? returns.length : returns.filter((r) => r.status === filter).length)
  const deviceCount = (r) => r.devices.length

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] pb-4">
        {showNew ? (
          <div>
            <div className="flex items-center gap-3 px-4 pt-5 pb-4">
              <button onClick={() => setShowNew(false)} className="text-blue-500"><ArrowLeft size={20} /></button>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">New RMA</h1>
            </div>
            <div className="px-4">
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <NewRmaForm onCancel={() => setShowNew(false)} onSubmit={() => setShowNew(false)} />
              </div>
            </div>
          </div>
        ) : mobileSelected ? (
          <div>
            <div className="flex items-center gap-3 px-4 pt-5 pb-4">
              <button onClick={() => setMobileSelected(null)} className="text-blue-500"><ArrowLeft size={20} /></button>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">{mobileSelected.id}</h1>
              <span className={`ml-auto px-2.5 py-1 rounded-full text-xs font-medium ${mobileStatusStyles[mobileSelected.status]}`}>
                {mobileSelected.status}
              </span>
            </div>

            <div className="px-4 space-y-4">
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Created</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{mobileSelected.created}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Order</p>
                    <Link href="/orders" className="text-sm font-semibold text-blue-600 dark:text-blue-400">{mobileSelected.order}</Link>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Devices</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{deviceCount(mobileSelected)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Resolution</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{mobileSelected.resolution}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">RMA Status</h3>
                <StatusTimeline timeline={mobileSelected.timeline} variant="mobile" />
              </div>

              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Devices</h3>
                <DevicesTable devices={mobileSelected.devices} />
              </div>

              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Evidence</h3>
                <EvidenceStrip evidence={mobileSelected.evidence} />
              </div>

              <div className="flex flex-col gap-2">
                {isComplete(mobileSelected.status) && (
                  <button className="flex items-center justify-center gap-1.5 py-3 text-sm border border-amber-400 rounded-xl text-amber-600 dark:text-amber-400 bg-white dark:bg-[#152035] font-medium">
                    <Download size={14} /> Download Credit Memo
                  </button>
                )}
                {isApprovedPlus(mobileSelected.status) && (
                  <button className="flex items-center justify-center gap-1.5 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-[#152035]">
                    <FileText size={14} /> Download Return Label
                  </button>
                )}
                <Link href="/support" className="flex items-center justify-center gap-1.5 py-3 text-sm font-medium bg-[#0b1b3a] text-white rounded-xl">
                  <LifeBuoy size={14} /> Contact Support
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-4 pt-5 pb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Returns (RMA)</h1>
              <button onClick={() => setShowNew(true)} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-xl">
                <Plus size={15} /> New
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto px-4 pb-2 mb-4 scrollbar-none">
              {kpis.map((kpi) => (
                <button
                  key={kpi.filter}
                  onClick={() => setActiveFilter(kpi.filter)}
                  className={`flex-shrink-0 w-28 rounded-2xl p-3 text-left border transition-all ${
                    activeFilter === kpi.filter ? 'bg-[#0b1b3a] border-[#0b1b3a]' : 'bg-white dark:bg-[#152035] border-gray-100 dark:border-white/5'
                  }`}
                >
                  <p className={`text-[10px] font-semibold uppercase tracking-wide mb-1.5 ${activeFilter === kpi.filter ? 'text-blue-200/70' : 'text-gray-400 dark:text-blue-300/50'}`}>{kpi.label}</p>
                  <p className={`text-2xl font-bold leading-none ${activeFilter === kpi.filter ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{getCount(kpi.filter)}</p>
                </button>
              ))}
            </div>

            <div className="px-4 space-y-3">
              {filtered.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setMobileSelected(r)}
                  className="w-full text-left bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5"
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-base font-bold text-gray-900 dark:text-white">{r.id}</p>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${mobileStatusStyles[r.status]}`}>{r.status}</span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-3">Order: {r.order} · {r.created}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 dark:text-blue-300/40 uppercase tracking-wide mb-1">Devices</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{deviceCount(r)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 dark:text-blue-300/40 uppercase tracking-wide mb-1">Resolution</p>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-snug">{r.resolution}</p>
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

        {/* Header */}
        <div className="flex items-center justify-between md:mb-3 xl:mb-4">
          <div>
            <h1 className="md:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white">Returns (RMA)</h1>
            <p className="text-sm text-gray-400 dark:text-blue-300/50">Refurbished device returns · John Davis</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#152035] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">
              <SlidersHorizontal size={14} /> Filter
            </button>
            <button
              onClick={() => setShowNew((v) => !v)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors font-medium"
            >
              <Plus size={15} /> New RMA
            </button>
          </div>
        </div>

        {/* KPI Filter Bar */}
        <div className="grid grid-cols-5 md:gap-2 xl:gap-3 md:mb-3 xl:mb-4">
          {kpis.map((kpi) => (
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
              <p className={`md:text-xl xl:text-2xl font-bold leading-none ${activeFilter === kpi.filter ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{getCount(kpi.filter)}</p>
            </button>
          ))}
        </div>

        <div className="flex md:gap-3 xl:gap-4 flex-1 min-h-0">

          {/* Left: RMA List */}
          <div className="md:w-[300px] xl:w-[380px] flex-shrink-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col min-h-0">
            <div className="grid grid-cols-[1fr_auto] gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">RMA</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</span>
            </div>
            <div className="flex-1 overflow-auto divide-y divide-gray-50 dark:divide-gray-700">
              {filtered.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={`w-full text-left px-4 py-3 grid grid-cols-[1fr_auto] gap-2 items-center transition-colors ${
                    selected?.id === r.id ? 'bg-[#0b1b3a] dark:bg-blue-900/40' : 'hover:bg-gray-50 dark:hover:bg-[#1a2540]'
                  }`}
                >
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${selected?.id === r.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{r.id}</p>
                    <p className={`text-xs truncate mt-0.5 ${selected?.id === r.id ? 'text-blue-200/70' : 'text-gray-400'}`}>{r.order} · {deviceCount(r)} device{deviceCount(r) > 1 ? 's' : ''}</p>
                    <p className={`text-xs mt-0.5 ${selected?.id === r.id ? 'text-blue-200/50' : 'text-gray-400'}`}>{r.created}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${selected?.id === r.id ? 'bg-white/10 text-white' : statusStyles[r.status]}`}>{r.status}</span>
                </button>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <span className="text-xs text-gray-400">Showing 1–{filtered.length} of {returns.length}</span>
              <button className="text-xs text-blue-600 hover:underline font-medium">Next</button>
            </div>
          </div>

          {/* Right: Detail or New RMA */}
          <div className="flex-1 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-auto">
            {showNew ? (
              <div className="md:p-4 xl:p-6">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="md:text-base xl:text-xl font-bold text-gray-900 dark:text-white">New Return Request</h2>
                    <p className="text-sm text-gray-400 dark:text-blue-300/50">Submit devices for return authorization</p>
                  </div>
                  <button onClick={() => setShowNew(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"><X size={18} /></button>
                </div>
                <NewRmaForm onCancel={() => setShowNew(false)} onSubmit={() => setShowNew(false)} />
              </div>
            ) : selected ? (
              <div className="md:p-4 xl:p-6">
                {/* RMA header */}
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="md:text-base xl:text-xl font-bold text-gray-900 dark:text-white">{selected.id}</h2>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[selected.status]}`}>{selected.status}</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Linked to <Link href="/orders" className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1 hover:underline">{selected.order} <ExternalLink size={12} /></Link>
                    </p>
                  </div>
                </div>

                {/* Summary grid */}
                <div className="grid grid-cols-4 md:gap-3 xl:gap-4 md:mt-3 md:mb-3 xl:mt-5 xl:mb-5">
                  {[
                    { label: 'Created', value: selected.created },
                    { label: 'Order', value: selected.order },
                    { label: 'Devices', value: String(deviceCount(selected)) },
                    { label: 'Resolution', value: selected.resolution },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                      <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Status timeline */}
                <div className="md:mb-3 xl:mb-5">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">RMA Status</p>
                  <StatusTimeline timeline={selected.timeline} />
                </div>

                {/* Devices table */}
                <div className="md:mb-3 xl:mb-5">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5"><Package size={15} className="text-gray-400" /> Devices</p>
                  <DevicesTable devices={selected.devices} />
                </div>

                {/* Evidence */}
                <div className="md:mb-3 xl:mb-5">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5"><ImageIcon size={15} className="text-gray-400" /> Evidence</p>
                  <EvidenceStrip evidence={selected.evidence} />
                </div>

                {/* Actions */}
                <div className="flex items-center flex-wrap gap-2">
                  {(isComplete(selected.status) || isApprovedPlus(selected.status)) && (
                    <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-amber-400 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-400/10 transition-colors font-medium">
                      <Download size={14} /> Download Credit Memo
                    </button>
                  )}
                  {isApprovedPlus(selected.status) && (
                    <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                      <FileText size={14} /> Download Return Label
                    </button>
                  )}
                  <Link href="/support" className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors font-medium">
                    <LifeBuoy size={14} /> Contact Support
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}
