'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, Trash2, MapPin, CheckCircle2, RotateCcw, FileText, ShoppingCart } from 'lucide-react'

const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 })

const sourceOrder = 'PCS-2024-1845'

const initialItems = [
  { id: 1, product: 'iPhone 13 Pro', sku: 'APL-13P-128-GRPH', grade: 'Grade A', storage: '128GB', qty: 50, price: 389.0 },
  { id: 2, product: 'Samsung Galaxy S22', sku: 'SAM-S22-256-BLK', grade: 'Grade A/B', storage: '256GB', qty: 30, price: 271.5 },
  { id: 3, product: 'iPhone 12', sku: 'APL-12-64-BLU', grade: 'Grade B', storage: '64GB', qty: 40, price: 214.0 },
]

const shipTo = { name: 'Wireless Depot', line1: '4820 NW 74th Ave', line2: 'Dallas, TX 75201', contact: 'John Davis' }

export default function ReorderPage() {
  const [quantities, setQuantities] = useState(Object.fromEntries(initialItems.map((i) => [i.id, i.qty])))
  const [placed, setPlaced] = useState(false)

  const setQty = (id, delta) => setQuantities((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) + delta) }))

  const lines = initialItems.map((i) => ({ ...i, qty: quantities[i.id], total: quantities[i.id] * i.price }))
  const itemCount = lines.reduce((a, l) => a + l.qty, 0)
  const subtotal = lines.reduce((a, l) => a + l.total, 0)
  const tax = subtotal * 0.07
  const total = subtotal + tax

  const Stepper = ({ id }) => (
    <div className="inline-flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
      <button onClick={() => setQty(id, -1)} className="px-2 py-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a2540]"><Minus size={13} /></button>
      <span className="px-3 text-sm font-semibold text-gray-900 dark:text-white tabular-nums">{quantities[id]}</span>
      <button onClick={() => setQty(id, 1)} className="px-2 py-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a2540]"><Plus size={13} /></button>
    </div>
  )

  const Banner = ({ mobile }) => (
    <Link href="/orders" className={`flex items-center gap-2 ${mobile ? 'mx-4' : ''} px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-sm`}>
      <ArrowLeft size={15} className="text-blue-500 flex-shrink-0" />
      <span className="text-gray-700 dark:text-gray-200">Reordering from <span className="font-semibold text-blue-600 dark:text-blue-400">{sourceOrder}</span></span>
    </Link>
  )

  const Summary = ({ mobile }) => (
    <div className={`bg-white dark:bg-[#152035] ${mobile ? 'rounded-2xl border-gray-100 dark:border-white/5' : 'rounded-xl border-gray-100 dark:border-gray-700 shadow-sm'} border p-4 xl:p-6`}>
      {placed ? (
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-4">
            <CheckCircle2 size={28} className="text-green-500" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Reorder placed</h3>
          <p className="text-sm text-gray-500 dark:text-blue-300/50 mb-4">New order <span className="font-semibold text-gray-900 dark:text-white">PCS-2024-1902</span> created.</p>
          <Link href="/orders" className="px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147]">View Orders</Link>
        </div>
      ) : (
        <>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between"><span className="text-gray-500 dark:text-blue-300/50">Items</span><span className="font-medium text-gray-900 dark:text-white">{itemCount}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-blue-300/50">Subtotal</span><span className="font-medium text-gray-900 dark:text-white">{fmt(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-blue-300/50">Estimated Tax (7%)</span><span className="font-medium text-gray-900 dark:text-white">{fmt(tax)}</span></div>
            <div className="flex justify-between pt-2.5 border-t border-gray-100 dark:border-gray-700"><span className="font-semibold text-gray-900 dark:text-white">Total</span><span className="font-bold text-gray-900 dark:text-white">{fmt(total)}</span></div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Ship To</p>
            <div className="flex items-start gap-2">
              <MapPin size={15} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p className="font-medium text-gray-900 dark:text-white">{shipTo.name}</p>
                <p>{shipTo.line1}</p>
                <p>{shipTo.line2}</p>
                <p className="text-xs text-gray-400 mt-0.5">Attn: {shipTo.contact}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]"><FileText size={14} /> Add to Estimate</button>
            <button onClick={() => itemCount > 0 && setPlaced(true)} disabled={itemCount === 0}
              className={`w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${itemCount > 0 ? 'bg-[#0b1b3a] text-white hover:bg-[#0d2147]' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}><ShoppingCart size={14} /> Place Reorder</button>
          </div>
        </>
      )}
    </div>
  )

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] pb-6">
        <div className="px-4 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <RotateCcw size={18} className="text-yellow-600 dark:text-yellow-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reorder</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-blue-300/50 mt-0.5">Repeat a previous order</p>
        </div>
        <div className="mb-4"><Banner mobile /></div>
        <div className="px-4 space-y-3 mb-4">
          {lines.map((l) => (
            <div key={l.id} className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{l.product}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{l.sku}</p>
                  <p className="text-xs text-gray-500 dark:text-blue-300/50 mt-0.5">{l.grade} · {l.storage}</p>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">{fmt(l.total)}</p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <Stepper id={l.id} />
                <span className="text-xs text-gray-400">{fmt(l.price)} / unit</span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4"><Summary mobile /></div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block flex-1 md:p-4 xl:p-8">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <RotateCcw size={20} className="text-yellow-600 dark:text-yellow-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reorder</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-blue-300/50 mt-0.5">Repeat a previous order</p>
        </div>
        <div className="mb-4"><Banner mobile={false} /></div>
        <div className="flex md:gap-4 xl:gap-6 items-start">
          <div className="flex-1 min-w-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  {['Product', 'Grade / Storage', 'Qty', 'Unit Price', 'Line Total', ''].map((col, i) => (
                    <th key={i} className={`px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide ${i >= 2 ? 'text-right' : 'text-left'}`}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                {lines.map((l) => (
                  <tr key={l.id}>
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{l.product}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{l.sku}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{l.grade} · {l.storage}</td>
                    <td className="px-4 py-4 text-right"><Stepper id={l.id} /></td>
                    <td className="px-4 py-4 text-right text-sm text-gray-600 dark:text-gray-300">{fmt(l.price)}</td>
                    <td className="px-4 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">{fmt(l.total)}</td>
                    <td className="px-4 py-4 text-right"><button className="text-gray-300 hover:text-red-500"><Trash2 size={15} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <span className="text-xs text-gray-400">{lines.length} line items from {sourceOrder}</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Subtotal: {fmt(subtotal)}</span>
            </div>
          </div>
          <div className="md:w-[300px] xl:w-[360px] flex-shrink-0"><Summary mobile={false} /></div>
        </div>
      </div>
    </>
  )
}
