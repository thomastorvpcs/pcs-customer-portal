'use client'

import { useState } from 'react'
import { Download, SlidersHorizontal, Search, ArrowLeft, FileText, CreditCard, RotateCcw } from 'lucide-react'

const mobileStats = [
  { label: 'Outstanding', value: '$247,850', sub: '12 invoices', subColor: 'text-gray-400' },
  { label: 'Past Due', value: '$45,200', valueColor: 'text-red-500', sub: '3 overdue', subColor: 'text-red-400' },
  { label: 'Credit Limit', value: '$500K', sub: '50% available', subColor: 'text-green-500' },
]

const accountSummary = [
  { label: 'Total Outstanding', value: '$247,850.00', sub: '12 invoices' },
  { label: 'Past Due', value: '$45,200.00', valueColor: 'text-red-500', sub: '3 invoices overdue', subColor: 'text-red-400' },
  { label: 'Credit Limit', value: '$500,000', sub: '50% available ($250K)', subColor: 'text-green-500' },
  { label: 'Payment Terms', value: 'Net 30', sub: 'Standard terms' },
]

const agingSummary = [
  { label: 'Current', value: '$156,450', dot: 'bg-green-500' },
  { label: '30 Days', value: '$46,200', dot: 'bg-yellow-400' },
  { label: '60 Days', value: '$28,400', dot: 'bg-orange-400' },
  { label: '90+ Days', value: '$16,800', dot: 'bg-red-500', valueColor: 'text-red-500' },
]

const invoices = [
  {
    id: 'INV-2024-0892', order: 'PCS-2024-1820', date: 'Feb 15, 2024', due: 'Feb 15, 2024', dueRed: true,
    status: 'Past Due', amount: '$28,450.00', balance: '$28,450.00', balanceRed: true,
    billTo: 'Wireless Depot Inc. · Dallas, TX 75201', terms: 'Net 30',
    lineItems: [
      { desc: 'iPhone 13 Pro – 128GB Space Black', qty: 100, unit: '$189.00', total: '$18,900.00' },
      { desc: 'Samsung Galaxy S21 – 256GB Phantom Gray', qty: 50, unit: '$185.00', total: '$9,250.00' },
      { desc: 'Shipping & Handling', qty: 1, unit: '$300.00', total: '$300.00' },
    ],
    subtotal: '$28,450.00', tax: '$0.00',
    paymentHistory: [],
  },
  {
    id: 'INV-2024-0915', order: 'PCS-2024-1835', date: 'Mar 05, 2024', due: 'Apr 04, 2024',
    status: 'Open', amount: '$84,500.00', balance: '$84,500.00',
    billTo: 'T-Mobile Retail · Dallas, TX 75202', terms: 'Net 30',
    lineItems: [
      { desc: 'iPhone 13 Pro – 256GB Gold', qty: 200, unit: '$215.00', total: '$43,000.00' },
      { desc: 'iPhone 12 – 128GB Blue', qty: 150, unit: '$275.00', total: '$41,250.00' },
      { desc: 'Shipping & Handling', qty: 1, unit: '$250.00', total: '$250.00' },
    ],
    subtotal: '$84,500.00', tax: '$0.00',
    paymentHistory: [],
  },
  {
    id: 'INV-2024-0928', order: 'PCS-2024-1842', date: 'Mar 18, 2024', due: 'Apr 17, 2024',
    status: 'Open', amount: '$156,000.00', balance: '$118,100.00',
    billTo: 'Metro by T-Mobile · New York, NY 10001', terms: 'Net 30',
    lineItems: [
      { desc: 'Samsung Galaxy S23 – 256GB Black', qty: 400, unit: '$210.00', total: '$84,000.00' },
      { desc: 'Samsung Galaxy A54 – 128GB White', qty: 300, unit: '$165.00', total: '$49,500.00' },
      { desc: 'Samsung Galaxy Tab S9 – 128GB Gray', qty: 50, unit: '$490.00', total: '$24,500.00' },
      { desc: 'Shipping & Handling', qty: 1, unit: '$500.00', total: '$500.00' },
    ],
    subtotal: '$156,000.00', tax: '$0.00',
    paymentHistory: [
      { date: 'Mar 25, 2024', method: 'Wire', amount: '$37,900.00' },
    ],
  },
  {
    id: 'INV-2024-0887', order: 'PCS-2024-1815', date: 'Feb 08, 2024', due: 'Mar 09, 2024',
    status: 'Paid', amount: '$42,300.00', balance: '$0.00', balanceGreen: true,
    billTo: 'AT&T Store · Chicago, IL 60601', terms: 'Net 30',
    lineItems: [
      { desc: 'iPhone 14 – 128GB Midnight', qty: 120, unit: '$220.00', total: '$26,400.00' },
      { desc: 'iPhone 14 Plus – 256GB Starlight', qty: 70, unit: '$225.00', total: '$15,750.00' },
      { desc: 'Shipping & Handling', qty: 1, unit: '$150.00', total: '$150.00' },
    ],
    subtotal: '$42,300.00', tax: '$0.00',
    paymentHistory: [
      { date: 'Mar 05, 2024', method: 'ACH', amount: '$42,300.00' },
    ],
  },
  {
    id: 'INV-2024-0875', order: 'PCS-2024-1798', date: 'Jan 25, 2024', due: 'Feb 24, 2024',
    status: 'Paid', amount: '$67,800.00', balance: '$0.00', balanceGreen: true,
    billTo: 'Verizon Wireless · Chicago, IL 60602', terms: 'Net 30',
    lineItems: [
      { desc: 'Google Pixel 8 – 128GB Obsidian', qty: 200, unit: '$210.00', total: '$42,000.00' },
      { desc: 'Google Pixel 8 Pro – 256GB Bay', qty: 100, unit: '$256.00', total: '$25,600.00' },
      { desc: 'Shipping & Handling', qty: 1, unit: '$200.00', total: '$200.00' },
    ],
    subtotal: '$67,800.00', tax: '$0.00',
    paymentHistory: [
      { date: 'Feb 20, 2024', method: 'Wire', amount: '$67,800.00' },
    ],
  },
  {
    id: 'INV-2024-0862', order: 'PCS-2024-1782', date: 'Jan 12, 2024', due: 'Feb 11, 2024',
    status: 'Paid', amount: '$38,950.00', balance: '$0.00', balanceGreen: true,
    billTo: 'Wireless Depot Inc. · Dallas, TX 75201', terms: 'Net 30',
    lineItems: [
      { desc: 'iPhone 13 – 128GB Pink', qty: 100, unit: '$195.00', total: '$19,500.00' },
      { desc: 'iPhone 13 Mini – 128GB Midnight', qty: 100, unit: '$193.00', total: '$19,300.00' },
      { desc: 'Shipping & Handling', qty: 1, unit: '$150.00', total: '$150.00' },
    ],
    subtotal: '$38,950.00', tax: '$0.00',
    paymentHistory: [
      { date: 'Feb 08, 2024', method: 'Check', amount: '$38,950.00' },
    ],
  },
]

const invoiceStatusStyles = {
  'Past Due': 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  'Open': 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  'Paid': 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
}

const mobileInvoiceStatus = {
  'Past Due': 'bg-red-500/15 text-red-400',
  'Open': 'bg-blue-500/15 text-blue-400',
  'Paid': 'bg-green-500/15 text-green-400',
}

const payments = [
  { ref: 'PAY-2024-0892', method: 'Wire', methodStyle: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', date: 'Mar 25, 2024', appliedTo: ['INV-8821', 'INV-8819'], amount: '$75,400.00' },
  { ref: 'PAY-2024-0891', method: 'ACH', methodStyle: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400', date: 'Mar 22, 2024', appliedTo: ['INV-8815'], amount: '$32,750.00' },
  { ref: 'PAY-2024-0890', method: 'Check', methodStyle: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', date: 'Mar 18, 2024', appliedTo: ['INV-8810', 'INV-8808', 'INV-8806'], amount: '$124,200.00' },
  { ref: 'PAY-2024-0889', method: 'Wire', methodStyle: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', date: 'Mar 15, 2024', appliedTo: ['INV-8802'], amount: '$56,800.00' },
  { ref: 'PAY-2024-0888', method: 'ACH', methodStyle: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400', date: 'Mar 10, 2024', appliedTo: ['INV-8798', 'INV-8795'], amount: '$89,350.00' },
  { ref: 'PAY-2024-0887', method: 'Wire', methodStyle: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', date: 'Mar 5, 2024', appliedTo: ['INV-8790'], amount: '$41,600.00' },
]

const mobileMethodStyle = {
  Wire: 'bg-blue-500/15 text-blue-400',
  ACH: 'bg-green-500/15 text-green-400',
  Check: 'bg-gray-500/15 text-gray-400',
}

const creditMemos = [
  { id: 'CM-2024-0156', rma: 'RMA-4521', date: 'Mar 24, 2024', reason: 'Defective units', reasonStyle: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400', mobileReasonStyle: 'bg-red-500/15 text-red-400', appliedTo: 'INV-8834', amount: '$4,250.00' },
  { id: 'CM-2024-0155', rma: 'RMA-4518', date: 'Mar 20, 2024', reason: 'Pricing adjustment', reasonStyle: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', mobileReasonStyle: 'bg-yellow-500/15 text-yellow-400', appliedTo: 'INV-8821', amount: '$1,800.00' },
  { id: 'CM-2024-0154', rma: 'RMA-4512', date: 'Mar 15, 2024', reason: 'Returned merchandise', reasonStyle: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', mobileReasonStyle: 'bg-gray-500/15 text-gray-400', appliedTo: 'INV-8815', amount: '$8,750.00' },
  { id: 'CM-2024-0153', rma: 'RMA-4508', date: 'Mar 10, 2024', reason: 'Shipping damage', reasonStyle: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', mobileReasonStyle: 'bg-gray-500/15 text-gray-400', appliedTo: 'INV-8810', amount: '$2,400.00' },
  { id: 'CM-2024-0152', rma: 'RMA-4502', date: 'Mar 5, 2024', reason: 'Defective units', reasonStyle: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400', mobileReasonStyle: 'bg-red-500/15 text-red-400', appliedTo: 'INV-8802', amount: '$6,100.00' },
  { id: 'CM-2024-0151', rma: 'RMA-4498', date: 'Feb 28, 2024', reason: 'Pricing adjustment', reasonStyle: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', mobileReasonStyle: 'bg-yellow-500/15 text-yellow-400', appliedTo: 'INV-8798', amount: '$3,200.00' },
]

const tabs = ['Invoices', 'Payments', 'Credit Memos']

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState('Invoices')
  const [selectedInvoice, setSelectedInvoice] = useState(invoices[0])
  const [mobileSelected, setMobileSelected] = useState(null)

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] pb-4">
        {mobileSelected ? (
          /* Invoice Detail View */
          <div>
            <div className="flex items-center gap-3 px-4 pt-5 pb-4">
              <button onClick={() => setMobileSelected(null)} className="text-blue-500">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">{mobileSelected.id}</h1>
              <span className={`ml-auto px-2.5 py-1 rounded-full text-xs font-medium ${mobileInvoiceStatus[mobileSelected.status]}`}>
                {mobileSelected.status}
              </span>
            </div>

            <div className="px-4 space-y-4">
              {/* Key Info */}
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <p className="text-xs text-gray-400 mb-1">Order</p>
                <p className="text-sm font-semibold text-blue-600 mb-3">{mobileSelected.order}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Invoice Date</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{mobileSelected.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Due Date</p>
                    <p className={`text-sm font-semibold ${mobileSelected.dueRed ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{mobileSelected.due}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Amount</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{mobileSelected.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Balance Due</p>
                    <p className={`text-sm font-semibold ${mobileSelected.balanceRed ? 'text-red-500' : mobileSelected.balanceGreen ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>{mobileSelected.balance}</p>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Line Items</h3>
                <div className="space-y-3">
                  {mobileSelected.lineItems.map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 dark:text-gray-200 leading-snug">{item.desc}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Qty {item.qty} × {item.unit}</p>
                      </div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white flex-shrink-0">{item.total}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/5 flex justify-between">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Total</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{mobileSelected.amount}</p>
                </div>
              </div>

              {/* Payment History */}
              {mobileSelected.paymentHistory.length > 0 && (
                <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Payment History</h3>
                  <div className="space-y-2">
                    {mobileSelected.paymentHistory.map((p, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-gray-800 dark:text-gray-200">{p.method}</p>
                          <p className="text-[10px] text-gray-400">{p.date}</p>
                        </div>
                        <p className="text-xs font-semibold text-green-500">{p.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-[#152035]">
                  <FileText size={14} /> PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-[#152035]">
                  <RotateCcw size={14} /> Dispute
                </button>
                {mobileSelected.status !== 'Paid' && (
                  <button className="flex-1 py-3 text-sm font-medium bg-[#0b1b3a] text-white rounded-xl flex items-center justify-center gap-1.5">
                    <CreditCard size={14} /> Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <>
            <div className="flex items-center justify-between px-4 pt-5 pb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial</h1>
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <button><Download size={18} /></button>
                <button><SlidersHorizontal size={18} /></button>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="flex gap-3 overflow-x-auto px-4 pb-2 mb-4 scrollbar-none">
              {mobileStats.map((s) => (
                <div key={s.label} className="flex-shrink-0 w-36 bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                  <p className="text-xs text-gray-400 mb-2">{s.label}</p>
                  <p className={`text-xl font-bold ${s.valueColor || 'text-gray-900 dark:text-white'}`}>{s.value}</p>
                  <p className={`text-xs mt-1 ${s.subColor}`}>{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Segmented Tabs */}
            <div className="mx-4 mb-4 bg-gray-200/60 dark:bg-[#152035] rounded-xl p-1 flex gap-1">
              {['Invoices', 'Payments', 'Credits'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab === 'Credits' ? 'Credit Memos' : tab)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === (tab === 'Credits' ? 'Credit Memos' : tab)
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Invoice Cards */}
            {activeTab === 'Invoices' && (
              <div className="px-4 space-y-3">
                {invoices.map((inv) => (
                  <button
                    key={inv.id}
                    onClick={() => setMobileSelected(inv)}
                    className="w-full text-left bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{inv.id}</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{inv.amount}</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${mobileInvoiceStatus[inv.status]}`}>{inv.status}</span>
                      <span className="text-xs text-gray-400">{inv.date}</span>
                    </div>
                    <p className="text-xs text-gray-400">Due: <span className={inv.dueRed ? 'text-red-400' : 'text-gray-500 dark:text-gray-400'}>{inv.due}</span></p>
                    <p className="text-xs text-gray-400 mt-1">Order: <span className="text-blue-500">{inv.order}</span></p>
                  </button>
                ))}
              </div>
            )}

            {/* Payment Cards */}
            {activeTab === 'Payments' && (
              <div className="px-4 space-y-3">
                {payments.map((p) => (
                  <div key={p.ref} className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{p.ref}</p>
                      <p className="text-sm font-bold text-green-500">{p.amount}</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${mobileMethodStyle[p.method]}`}>{p.method}</span>
                      <span className="text-xs text-gray-400">{p.date}</span>
                    </div>
                    <p className="text-xs text-gray-400">Applied to: <span className="text-blue-500">{p.appliedTo.join(', ')}</span></p>
                  </div>
                ))}
              </div>
            )}

            {/* Credit Memo Cards */}
            {activeTab === 'Credit Memos' && (
              <div className="px-4 space-y-3">
                {creditMemos.map((cm) => (
                  <div key={cm.id} className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{cm.id}</p>
                      <p className="text-sm font-bold text-green-500">{cm.amount}</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${cm.mobileReasonStyle}`}>{cm.reason}</span>
                    </div>
                    <p className="text-xs text-gray-400">RMA: <span className="text-blue-500">{cm.rma}</span> · {cm.date}</p>
                    <p className="text-xs text-gray-400 mt-1">Applied to: <span className="text-blue-500">{cm.appliedTo}</span></p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex flex-col p-8 h-full min-h-0">
        {/* Account Summary KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {accountSummary.map((item) => (
            <div key={item.label} className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">{item.label}</p>
              <p className={`text-2xl font-bold ${item.valueColor || 'text-gray-900 dark:text-white'}`}>{item.value}</p>
              <p className={`text-xs mt-1 ${item.subColor || 'text-gray-400'}`}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Aging Summary */}
        <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm px-6 py-4 mb-4 flex items-center gap-10">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Aging Summary</p>
          {agingSummary.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-sm flex-shrink-0 ${item.dot}`} />
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
              <span className={`text-sm font-semibold ${item.valueColor || 'text-gray-900 dark:text-white'}`}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Tab Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab ? 'bg-[#0b1b3a] text-white' : 'bg-white dark:bg-[#152035] border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a2540]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input placeholder="Search invoices..." className="pl-8 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg w-56 bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#112654] transition-colors">
              <Download size={14} /> Statement
            </button>
          </div>
        </div>

        {/* Invoices: list + detail split */}
        {activeTab === 'Invoices' && (
          <div className="flex gap-4 flex-1 min-h-0">
            {/* Left: Invoice List */}
            <div className="w-[380px] flex-shrink-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col min-h-0">
              <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Invoice</span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Amount</span>
              </div>
              <div className="flex-1 overflow-auto divide-y divide-gray-50 dark:divide-gray-700">
                {invoices.map((inv) => (
                  <button
                    key={inv.id}
                    onClick={() => setSelectedInvoice(inv)}
                    className={`w-full text-left px-4 py-3 grid grid-cols-[1fr_auto_auto] gap-2 items-center transition-colors ${
                      selectedInvoice?.id === inv.id
                        ? 'bg-[#0b1b3a] dark:bg-blue-900/40'
                        : 'hover:bg-gray-50 dark:hover:bg-[#1a2540]'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${selectedInvoice?.id === inv.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{inv.id}</p>
                      <p className={`text-xs truncate mt-0.5 ${selectedInvoice?.id === inv.id ? 'text-blue-200/70' : 'text-gray-400'}`}>Order: {inv.order}</p>
                      <p className={`text-xs mt-0.5 ${selectedInvoice?.id === inv.id ? 'text-blue-200/50' : inv.dueRed ? 'text-red-400' : 'text-gray-400'}`}>Due {inv.due}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      selectedInvoice?.id === inv.id ? 'bg-white/10 text-white' : invoiceStatusStyles[inv.status]
                    }`}>{inv.status}</span>
                    <span className={`text-sm font-medium whitespace-nowrap ${selectedInvoice?.id === inv.id ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>{inv.amount}</span>
                  </button>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <span className="text-xs text-gray-400">Showing 1–{invoices.length} of 24</span>
                <button className="text-xs text-blue-600 hover:underline font-medium">Next</button>
              </div>
            </div>

            {/* Right: Invoice Detail */}
            {selectedInvoice && (
              <div className="flex-1 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-auto">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedInvoice.id}</h2>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${invoiceStatusStyles[selectedInvoice.status]}`}>{selectedInvoice.status}</span>
                      </div>
                      <p className="text-sm text-gray-400">Order: <span className="text-blue-600 font-medium">{selectedInvoice.order}</span> &nbsp;|&nbsp; {selectedInvoice.billTo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedInvoice.amount}</p>
                      <p className={`text-sm mt-0.5 font-medium ${selectedInvoice.balanceRed ? 'text-red-500' : selectedInvoice.balanceGreen ? 'text-green-500' : 'text-gray-500'}`}>
                        Balance: {selectedInvoice.balance}
                      </p>
                    </div>
                  </div>

                  {/* Key Details */}
                  <div className="grid grid-cols-4 gap-4 mb-5">
                    {[
                      { label: 'Invoice Date', value: selectedInvoice.date },
                      { label: 'Due Date', value: selectedInvoice.due, red: selectedInvoice.dueRed },
                      { label: 'Payment Terms', value: selectedInvoice.terms },
                      { label: 'Balance Due', value: selectedInvoice.balance, red: selectedInvoice.balanceRed, green: selectedInvoice.balanceGreen },
                    ].map(({ label, value, red, green }) => (
                      <div key={label}>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                        <p className={`text-sm font-semibold ${red ? 'text-red-500' : green ? 'text-green-500' : 'text-gray-800 dark:text-gray-200'}`}>{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Line Items */}
                  <div className="mb-5">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Line Items</p>
                    <div className="border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50/60 dark:bg-[#1a2540]/40 border-b border-gray-100 dark:border-gray-700">
                            {['Description', 'Qty', 'Unit Price', 'Total'].map((col) => (
                              <th key={col} className="px-4 py-2.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                          {selectedInvoice.lineItems.map((item, i) => (
                            <tr key={i}>
                              <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">{item.desc}</td>
                              <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.qty}</td>
                              <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.unit}</td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">{item.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex justify-end gap-8 px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/40 dark:bg-[#1a2540]/20">
                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-0.5">Subtotal</p>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{selectedInvoice.subtotal}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-0.5">Tax</p>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{selectedInvoice.tax}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-0.5">Total</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedInvoice.amount}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment History */}
                  {selectedInvoice.paymentHistory.length > 0 && (
                    <div className="mb-5">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Payment History</p>
                      <div className="border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50/60 dark:bg-[#1a2540]/40 border-b border-gray-100 dark:border-gray-700">
                              {['Date', 'Method', 'Amount'].map((col) => (
                                <th key={col} className="px-4 py-2.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{col}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                            {selectedInvoice.paymentHistory.map((p, i) => (
                              <tr key={i}>
                                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{p.date}</td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{p.method}</td>
                                <td className="px-4 py-3 text-sm font-semibold text-green-500">{p.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                      <Download size={14} /> Download PDF
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                      <RotateCcw size={14} /> Dispute
                    </button>
                    {selectedInvoice.status !== 'Paid' && (
                      <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#112654] transition-colors">
                        <CreditCard size={14} /> Pay Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payments: full-width table */}
        {activeTab === 'Payments' && (
          <div className="flex-1 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col min-h-0">
            <div className="flex-1 overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    {['Reference', 'Method', 'Date', 'Applied To', 'Amount'].map((col) => (
                      <th key={col} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                  {payments.map((p) => (
                    <tr key={p.ref} className="hover:bg-gray-50/50 dark:hover:bg-[#1a2540] transition-colors">
                      <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">{p.ref}</td>
                      <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded text-xs font-medium ${p.methodStyle}`}>{p.method}</span></td>
                      <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{p.date}</td>
                      <td className="px-5 py-4 text-sm text-blue-600 font-medium">{p.appliedTo.join(', ')}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-green-500">{p.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <span className="text-sm text-gray-400">Showing 1–6 of 24 payments</span>
              <button className="text-xs text-blue-600 hover:underline font-medium">Next</button>
            </div>
          </div>
        )}

        {/* Credit Memos: full-width table */}
        {activeTab === 'Credit Memos' && (
          <div className="flex-1 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col min-h-0">
            <div className="flex-1 overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    {['Credit Memo #', 'RMA', 'Date', 'Reason', 'Applied To', 'Amount'].map((col) => (
                      <th key={col} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                  {creditMemos.map((cm) => (
                    <tr key={cm.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a2540] transition-colors">
                      <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">{cm.id}</td>
                      <td className="px-5 py-4 text-sm text-blue-600 font-medium">{cm.rma}</td>
                      <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{cm.date}</td>
                      <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded text-xs font-medium ${cm.reasonStyle}`}>{cm.reason}</span></td>
                      <td className="px-5 py-4 text-sm text-blue-600 font-medium">{cm.appliedTo}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-green-500">{cm.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <span className="text-sm text-gray-400">Showing 1–6 of 18 credit memos</span>
              <button className="text-xs text-blue-600 hover:underline font-medium">Next</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
