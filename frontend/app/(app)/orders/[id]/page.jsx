import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Circle, Truck, FileText, LayoutList, FileCheck, Download } from 'lucide-react'

const statusSteps = [
  { label: 'Confirmed', date: 'Mar 25, 9:15 AM', done: true },
  { label: 'Credit Approved', date: 'Mar 25, 10:30 AM', done: true },
  { label: 'QC/Diagnostics', date: 'Mar 26, 2:45 PM', done: true },
  { label: 'Packing', date: 'Mar 26, 5:00 PM', done: true },
  { label: 'Shipped', date: 'Mar 27, 8:11 AM', done: true, active: true },
  { label: 'Delivered', date: 'Est. Apr 2', done: false },
]

const lineItems = [
  { product: 'iPhone 13 Pro Max', sku: 'IP13PM-256-GR', grade: 'Grade A', storage: '256GB', qty: 200, unitPrice: 245.0, total: 49000.0 },
  { product: 'iPhone 12 Pro', sku: 'IP12P-128-3L', grade: 'Grade A', storage: '128GB', qty: 150, unitPrice: 185.0, total: 27750.0 },
  { product: 'Samsung Galaxy S22 Ultra', sku: 'SGS22U-256-RK', grade: 'Grade B', storage: '256GB', qty: 100, unitPrice: 52.5, total: 5250.0 },
  { product: 'Google Pixel 7 Pro', sku: 'GP7P-128-WH', grade: 'Grade A', storage: '128GB', qty: 50, unitPrice: 50.0, total: 2500.0 },
]

const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 })

export default function OrderDetailPage({ params }) {
  const totalQty = lineItems.reduce((s, i) => s + i.qty, 0)
  const totalValue = lineItems.reduce((s, i) => s + i.total, 0)

  return (
    <div className="flex-1 bg-[#f1f5f9] dark:bg-[#0d1829] overflow-auto">

      {/* ── MOBILE ── */}
      <div className="md:hidden">
        {/* Header */}
        <div className="bg-white dark:bg-[#152035] border-b border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
          <Link href="/orders" className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <ArrowLeft size={16} />
            <span>Orders</span>
          </Link>
          <h1 className="flex-1 text-sm font-bold text-gray-900 dark:text-white text-center">{params.id}</h1>
          <div className="w-8 h-8 rounded-full bg-[#0b1b3a] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">J</div>
        </div>

        <div className="px-4 py-4 space-y-4 pb-6">
          {/* Summary */}
          <div className="bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 p-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Order Date', value: 'March 25, 2024' },
                { label: 'PO Number', value: 'WH-48291' },
                { label: 'Total Value', value: fmt(totalValue) },
                { label: 'Facility', value: 'Miami, FL' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-semibold text-gray-400 dark:text-blue-300/40 uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Status — vertical timeline */}
          <div className="bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 p-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Order Status</h2>
            <div className="space-y-0">
              {statusSteps.map((step, i) => (
                <div key={step.label} className="flex gap-3">
                  {/* Icon + line */}
                  <div className="flex flex-col items-center">
                    <div className="flex-shrink-0">
                      {step.done ? (
                        <CheckCircle2 size={20} className={step.active ? 'text-blue-500' : 'text-green-500'} fill={step.active ? '#eff6ff' : '#f0fdf4'} />
                      ) : (
                        <Circle size={20} className="text-gray-300 dark:text-gray-600" />
                      )}
                    </div>
                    {i < statusSteps.length - 1 && (
                      <div className={`w-0.5 flex-1 my-1 min-h-[20px] ${step.done && !step.active ? 'bg-green-400' : step.active ? 'bg-blue-300' : 'bg-gray-200 dark:bg-gray-600'}`} />
                    )}
                  </div>
                  {/* Text */}
                  <div className="pb-4">
                    <p className={`text-sm font-medium ${step.active ? 'text-blue-600' : step.done ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Line Items — stacked cards */}
          <div className="bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden">
            <div className="px-4 pt-4 pb-2">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Line Items</h2>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-white/5">
              {lineItems.map((item) => (
                <div key={item.sku} className="px-4 py-3">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white pr-2">{item.product}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white flex-shrink-0">{fmt(item.total)}</p>
                  </div>
                  <p className="text-xs text-blue-500 font-mono mb-2">{item.sku}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${item.grade === 'Grade A' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>{item.grade}</span>
                    <span>{item.storage}</span>
                    <span>Qty: {item.qty}</span>
                    <span className="ml-auto">{fmt(item.unitPrice)}/unit</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#0b1b3a] px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-white/60">{totalQty} units</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">Total:</span>
                <span className="text-base font-bold text-yellow-400">{fmt(totalValue)}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 p-4">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { label: 'View Shipment', icon: Truck },
                { label: 'View Invoice', icon: FileText },
                { label: 'Device Manifest', icon: LayoutList },
                { label: 'Original Quote', icon: FileCheck },
              ].map(({ label, icon: Icon }) => (
                <button key={label} className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-100 dark:border-white/5 text-sm text-blue-600 dark:text-blue-400">
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300">
                <Download size={14} /> Download PDF
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium bg-[#0b1b3a] text-white rounded-xl">
                Reorder
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block">
        {/* Page Header */}
        <div className="bg-white dark:bg-[#152035] border-b border-gray-100 dark:border-gray-700 px-8 py-4 flex items-center justify-between">
          <Link href="/orders" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            <ArrowLeft size={15} />
            Back to Orders
          </Link>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Order {params.id}</h1>
          <div className="w-8 h-8 rounded-full bg-[#0b1b3a] flex items-center justify-center text-white text-sm font-semibold">J</div>
        </div>

        <div className="px-8 py-6 space-y-5">
          {/* Order Summary */}
          <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm px-8 py-5">
            <div className="grid grid-cols-4 gap-8">
              {[
                { label: 'Order Date', value: 'March 25, 2024' },
                { label: 'PO Number', value: 'WH-48291' },
                { label: 'Total Value', value: fmt(totalValue) },
                { label: 'Facility', value: 'Miami, FL' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Status */}
          <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm px-8 py-6">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-6">Order Status</h2>
            <div className="flex items-start">
              {statusSteps.map((step, i) => (
                <div key={step.label} className="flex items-start flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className="flex items-center w-full">
                      {i > 0 && (
                        <div className={`flex-1 h-0.5 -mr-1 ${statusSteps[i - 1].done ? (step.active ? 'bg-blue-400' : 'bg-green-400') : 'bg-gray-200 dark:bg-gray-600'}`} />
                      )}
                      <div className="flex-shrink-0 z-10">
                        {step.done ? (
                          <CheckCircle2 size={22} className={step.active ? 'text-blue-500' : 'text-green-500'} fill={step.active ? '#eff6ff' : '#f0fdf4'} />
                        ) : (
                          <Circle size={22} className="text-gray-300 dark:text-gray-600" />
                        )}
                      </div>
                      {i < statusSteps.length - 1 && (
                        <div className={`flex-1 h-0.5 -ml-1 ${step.done && !step.active ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-600'}`} />
                      )}
                    </div>
                    <p className={`text-xs font-medium mt-2 text-center ${step.active ? 'text-blue-600' : step.done ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 text-center">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="px-8 py-5">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Line Items</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-t border-b border-gray-100 dark:border-gray-700">
                  {['Product', 'SKU', 'Grade', 'Storage', 'Qty', 'Unit Price', 'Total'].map((col) => (
                    <th key={col} className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                {lineItems.map((item) => (
                  <tr key={item.sku} className="hover:bg-gray-50/50 dark:hover:bg-[#1a2540] transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{item.product}</td>
                    <td className="px-6 py-4 text-sm text-blue-600 font-mono">{item.sku}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.grade}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.storage}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.qty}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{fmt(item.unitPrice)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{fmt(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-[#0b1b3a] px-6 py-4 flex items-center justify-end gap-8">
              <span className="text-sm text-white/70">{totalQty}</span>
              <span className="text-sm font-medium text-white/70 ml-auto">Total:</span>
              <span className="text-base font-bold text-yellow-400">{fmt(totalValue)}</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              {[
                { label: 'View Shipment', icon: Truck },
                { label: 'View Invoice', icon: FileText },
                { label: 'Device Manifest', icon: LayoutList },
                { label: 'Original Quote', icon: FileCheck },
              ].map(({ label, icon: Icon }) => (
                <button key={label} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors flex items-center gap-1.5">
                <Download size={14} />
                Download PDF
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#112654] transition-colors">
                Reorder
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
