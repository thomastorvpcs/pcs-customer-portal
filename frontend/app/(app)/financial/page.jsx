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

const methodStyle = {
  Wire: { desktop: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', mobile: 'bg-blue-500/15 text-blue-400' },
  ACH:  { desktop: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400', mobile: 'bg-green-500/15 text-green-400' },
  Check:{ desktop: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', mobile: 'bg-gray-500/15 text-gray-400' },
}

const payments = [
  {
    ref: 'PAY-2024-0892', method: 'Wire', date: 'Mar 25, 2024', amount: '$75,400.00',
    from: 'Wireless Depot Inc.', bank: 'Wells Fargo · ****4821', confirmationNo: 'WF20240325-4821',
    appliedTo: [
      { inv: 'INV-8821', amount: '$45,200.00' },
      { inv: 'INV-8819', amount: '$30,200.00' },
    ],
  },
  {
    ref: 'PAY-2024-0891', method: 'ACH', date: 'Mar 22, 2024', amount: '$32,750.00',
    from: 'T-Mobile Retail', bank: 'Bank of America · ****2209', confirmationNo: 'ACH20240322-2209',
    appliedTo: [
      { inv: 'INV-8815', amount: '$32,750.00' },
    ],
  },
  {
    ref: 'PAY-2024-0890', method: 'Check', date: 'Mar 18, 2024', amount: '$124,200.00',
    from: 'Metro by T-Mobile', bank: 'Check #10492', confirmationNo: 'CHK-10492',
    appliedTo: [
      { inv: 'INV-8810', amount: '$56,800.00' },
      { inv: 'INV-8808', amount: '$42,300.00' },
      { inv: 'INV-8806', amount: '$25,100.00' },
    ],
  },
  {
    ref: 'PAY-2024-0889', method: 'Wire', date: 'Mar 15, 2024', amount: '$56,800.00',
    from: 'AT&T Store', bank: 'Citibank · ****7734', confirmationNo: 'CB20240315-7734',
    appliedTo: [
      { inv: 'INV-8802', amount: '$56,800.00' },
    ],
  },
  {
    ref: 'PAY-2024-0888', method: 'ACH', date: 'Mar 10, 2024', amount: '$89,350.00',
    from: 'Verizon Wireless', bank: 'JPMorgan Chase · ****6612', confirmationNo: 'ACH20240310-6612',
    appliedTo: [
      { inv: 'INV-8798', amount: '$51,200.00' },
      { inv: 'INV-8795', amount: '$38,150.00' },
    ],
  },
  {
    ref: 'PAY-2024-0887', method: 'Wire', date: 'Mar 5, 2024', amount: '$41,600.00',
    from: 'Wireless Depot Inc.', bank: 'Wells Fargo · ****4821', confirmationNo: 'WF20240305-4821',
    appliedTo: [
      { inv: 'INV-8790', amount: '$41,600.00' },
    ],
  },
]

const creditMemos = [
  {
    id: 'CM-2024-0156', rma: 'RMA-4521', date: 'Mar 24, 2024',
    reason: 'Defective units', reasonStyle: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400', mobileReasonStyle: 'bg-red-500/15 text-red-400',
    appliedTo: 'INV-8834', amount: '$4,250.00',
    issuedTo: 'Wireless Depot Inc. · Dallas, TX 75201',
    notes: '25 units returned with defective screens. Devices tested and confirmed non-functional.',
    lineItems: [
      { desc: 'iPhone 13 Pro – Defective screen (25 units)', qty: 25, unit: '$170.00', total: '$4,250.00' },
    ],
  },
  {
    id: 'CM-2024-0155', rma: 'RMA-4518', date: 'Mar 20, 2024',
    reason: 'Pricing adjustment', reasonStyle: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', mobileReasonStyle: 'bg-yellow-500/15 text-yellow-400',
    appliedTo: 'INV-8821', amount: '$1,800.00',
    issuedTo: 'T-Mobile Retail · Dallas, TX 75202',
    notes: 'Pricing correction applied per revised contract terms effective Mar 1, 2024.',
    lineItems: [
      { desc: 'Samsung Galaxy S23 – Price adjustment (600 units @ $3.00)', qty: 600, unit: '$3.00', total: '$1,800.00' },
    ],
  },
  {
    id: 'CM-2024-0154', rma: 'RMA-4512', date: 'Mar 15, 2024',
    reason: 'Returned merchandise', reasonStyle: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', mobileReasonStyle: 'bg-gray-500/15 text-gray-400',
    appliedTo: 'INV-8815', amount: '$8,750.00',
    issuedTo: 'Metro by T-Mobile · New York, NY 10001',
    notes: '50 units returned in original packaging, unopened. Full credit issued.',
    lineItems: [
      { desc: 'iPhone 14 – 128GB Midnight (50 units returned)', qty: 50, unit: '$175.00', total: '$8,750.00' },
    ],
  },
  {
    id: 'CM-2024-0153', rma: 'RMA-4508', date: 'Mar 10, 2024',
    reason: 'Shipping damage', reasonStyle: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', mobileReasonStyle: 'bg-gray-500/15 text-gray-400',
    appliedTo: 'INV-8810', amount: '$2,400.00',
    issuedTo: 'AT&T Store · Chicago, IL 60601',
    notes: '12 units damaged in transit. Carrier claim filed. Credit issued pending insurance resolution.',
    lineItems: [
      { desc: 'Google Pixel 8 – Shipping damage (12 units)', qty: 12, unit: '$200.00', total: '$2,400.00' },
    ],
  },
  {
    id: 'CM-2024-0152', rma: 'RMA-4502', date: 'Mar 5, 2024',
    reason: 'Defective units', reasonStyle: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400', mobileReasonStyle: 'bg-red-500/15 text-red-400',
    appliedTo: 'INV-8802', amount: '$6,100.00',
    issuedTo: 'Verizon Wireless · Chicago, IL 60602',
    notes: '30 units with battery defects identified during customer QC inspection.',
    lineItems: [
      { desc: 'Samsung Galaxy A54 – Battery defect (30 units)', qty: 30, unit: '$165.00', total: '$4,950.00' },
      { desc: 'Return shipping & processing fee', qty: 1, unit: '$1,150.00', total: '$1,150.00' },
    ],
  },
  {
    id: 'CM-2024-0151', rma: 'RMA-4498', date: 'Feb 28, 2024',
    reason: 'Pricing adjustment', reasonStyle: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', mobileReasonStyle: 'bg-yellow-500/15 text-yellow-400',
    appliedTo: 'INV-8798', amount: '$3,200.00',
    issuedTo: 'Wireless Depot Inc. · Dallas, TX 75201',
    notes: 'Volume discount applied retroactively for Q1 2024 purchasing milestone.',
    lineItems: [
      { desc: 'Q1 volume discount – 400 units @ $8.00', qty: 400, unit: '$8.00', total: '$3,200.00' },
    ],
  },
]

const tabs = ['Invoices', 'Payments', 'Credit Memos']

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState('Invoices')
  const [selectedInvoice, setSelectedInvoice] = useState(invoices[0])
  const [selectedPayment, setSelectedPayment] = useState(payments[0])
  const [selectedCM, setSelectedCM] = useState(creditMemos[0])
  const [mobileSelected, setMobileSelected] = useState(null)

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] pb-4">
        {mobileSelected ? (
          /* Detail View */
          <div>
            <div className="flex items-center gap-3 px-4 pt-5 pb-4">
              <button onClick={() => setMobileSelected(null)} className="text-blue-500">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                {mobileSelected.type === 'invoice' ? mobileSelected.data.id
                  : mobileSelected.type === 'payment' ? mobileSelected.data.ref
                  : mobileSelected.data.id}
              </h1>
              {mobileSelected.type === 'invoice' && (
                <span className={`ml-auto px-2.5 py-1 rounded-full text-xs font-medium ${mobileInvoiceStatus[mobileSelected.data.status]}`}>
                  {mobileSelected.data.status}
                </span>
              )}
              {mobileSelected.type === 'payment' && (
                <span className={`ml-auto px-2.5 py-1 rounded-full text-xs font-medium ${methodStyle[mobileSelected.data.method].mobile}`}>
                  {mobileSelected.data.method}
                </span>
              )}
              {mobileSelected.type === 'cm' && (
                <span className={`ml-auto px-2.5 py-1 rounded-full text-xs font-medium ${mobileSelected.data.mobileReasonStyle}`}>
                  {mobileSelected.data.reason}
                </span>
              )}
            </div>

            {/* Invoice detail */}
            {mobileSelected.type === 'invoice' && (() => { const inv = mobileSelected.data; return (
            <div className="px-4 space-y-4">
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <p className="text-xs text-gray-400 mb-1">Order</p>
                <p className="text-sm font-semibold text-blue-600 mb-3">{inv.order}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-gray-400 mb-1">Invoice Date</p><p className="text-sm font-semibold text-gray-900 dark:text-white">{inv.date}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Due Date</p><p className={`text-sm font-semibold ${inv.dueRed ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{inv.due}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Amount</p><p className="text-sm font-semibold text-gray-900 dark:text-white">{inv.amount}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Balance Due</p><p className={`text-sm font-semibold ${inv.balanceRed ? 'text-red-500' : inv.balanceGreen ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>{inv.balance}</p></div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Line Items</h3>
                <div className="space-y-3">
                  {inv.lineItems.map((item, i) => (
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
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{inv.amount}</p>
                </div>
              </div>
              {inv.paymentHistory.length > 0 && (
                <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Payment History</h3>
                  <div className="space-y-2">
                    {inv.paymentHistory.map((p, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div><p className="text-xs font-medium text-gray-800 dark:text-gray-200">{p.method}</p><p className="text-[10px] text-gray-400">{p.date}</p></div>
                        <p className="text-xs font-semibold text-green-500">{p.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-[#152035]"><FileText size={14} /> PDF</button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-[#152035]"><RotateCcw size={14} /> Dispute</button>
                {inv.status !== 'Paid' && <button className="flex-1 py-3 text-sm font-medium bg-[#0b1b3a] text-white rounded-xl flex items-center justify-center gap-1.5"><CreditCard size={14} /> Pay Now</button>}
              </div>
            </div>
            )})()}

            {/* Payment detail */}
            {mobileSelected.type === 'payment' && (() => { const p = mobileSelected.data; return (
            <div className="px-4 space-y-4">
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <p className="text-xs text-gray-400 mb-1">From</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{p.from}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-gray-400 mb-1">Date</p><p className="text-sm font-semibold text-gray-900 dark:text-white">{p.date}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Amount</p><p className="text-sm font-semibold text-green-500">{p.amount}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Method</p><p className="text-sm font-semibold text-gray-900 dark:text-white">{p.method}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Confirmation</p><p className="text-xs font-semibold text-gray-900 dark:text-white">{p.confirmationNo}</p></div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                  <p className="text-xs text-gray-400 mb-1">Bank / Account</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{p.bank}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Applied To</h3>
                <div className="space-y-2">
                  {p.appliedTo.map((a, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <p className="text-sm text-blue-600 font-medium">{a.inv}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{a.amount}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/5 flex justify-between">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Total</p>
                  <p className="text-sm font-bold text-green-500">{p.amount}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-[#152035]"><FileText size={14} /> Receipt</button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-[#152035]"><Download size={14} /> Export</button>
              </div>
            </div>
            )})()}

            {/* Credit Memo detail */}
            {mobileSelected.type === 'cm' && (() => { const cm = mobileSelected.data; return (
            <div className="px-4 space-y-4">
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <p className="text-xs text-gray-400 mb-1">Issued To</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{cm.issuedTo}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-gray-400 mb-1">Date</p><p className="text-sm font-semibold text-gray-900 dark:text-white">{cm.date}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Amount</p><p className="text-sm font-semibold text-green-500">{cm.amount}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">RMA</p><p className="text-sm font-semibold text-blue-600">{cm.rma}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Applied To</p><p className="text-sm font-semibold text-blue-600">{cm.appliedTo}</p></div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                  <p className="text-xs text-gray-400 mb-1">Notes</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{cm.notes}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Line Items</h3>
                <div className="space-y-3">
                  {cm.lineItems.map((item, i) => (
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
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Total Credit</p>
                  <p className="text-sm font-bold text-green-500">{cm.amount}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-[#152035]"><FileText size={14} /> PDF</button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-[#152035]"><Download size={14} /> Export</button>
              </div>
            </div>
            )})()}
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
                    onClick={() => setMobileSelected({ type: 'invoice', data: inv })}
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
                  <button key={p.ref} onClick={() => setMobileSelected({ type: 'payment', data: p })} className="w-full text-left bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{p.ref}</p>
                      <p className="text-sm font-bold text-green-500">{p.amount}</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${methodStyle[p.method].mobile}`}>{p.method}</span>
                      <span className="text-xs text-gray-400">{p.date}</span>
                    </div>
                    <p className="text-xs text-gray-400">From: <span className="text-gray-600 dark:text-gray-300">{p.from}</span></p>
                    <p className="text-xs text-gray-400 mt-1">Applied to: <span className="text-blue-500">{p.appliedTo.map(a => a.inv).join(', ')}</span></p>
                  </button>
                ))}
              </div>
            )}

            {/* Credit Memo Cards */}
            {activeTab === 'Credit Memos' && (
              <div className="px-4 space-y-3">
                {creditMemos.map((cm) => (
                  <button key={cm.id} onClick={() => setMobileSelected({ type: 'cm', data: cm })} className="w-full text-left bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{cm.id}</p>
                      <p className="text-sm font-bold text-green-500">{cm.amount}</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${cm.mobileReasonStyle}`}>{cm.reason}</span>
                    </div>
                    <p className="text-xs text-gray-400">RMA: <span className="text-blue-500">{cm.rma}</span> · {cm.date}</p>
                    <p className="text-xs text-gray-400 mt-1">Applied to: <span className="text-blue-500">{cm.appliedTo}</span></p>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex flex-col md:p-4 xl:p-8 h-full min-h-0">
        {/* Account Summary KPIs */}
        <div className="grid grid-cols-4 md:gap-3 xl:gap-4 md:mb-3 xl:mb-4">
          {accountSummary.map((item) => (
            <div key={item.label} className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm md:p-3 xl:p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium md:mb-1 xl:mb-2">{item.label}</p>
              <p className={`md:text-xl xl:text-2xl font-bold ${item.valueColor || 'text-gray-900 dark:text-white'}`}>{item.value}</p>
              <p className={`text-xs mt-1 ${item.subColor || 'text-gray-400'}`}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Aging Summary */}
        <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm md:px-4 xl:px-6 md:py-2.5 xl:py-4 md:mb-3 xl:mb-4 flex items-center md:gap-5 xl:gap-10">
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
        <div className="flex items-center justify-between md:mb-3 xl:mb-4">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`md:px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
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
              <input placeholder="Search invoices..." className="pl-8 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg md:w-44 xl:w-56 bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#112654] transition-colors">
              <Download size={14} /> Statement
            </button>
          </div>
        </div>

        {/* Invoices: list + detail split */}
        {activeTab === 'Invoices' && (
          <div className="flex md:gap-3 xl:gap-4 flex-1 min-h-0">
            {/* Left: Invoice List */}
            <div className="md:w-[300px] xl:w-[380px] flex-shrink-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col min-h-0">
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
                <div className="md:p-4 xl:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between md:mb-3 xl:mb-5">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="md:text-base xl:text-xl font-bold text-gray-900 dark:text-white">{selectedInvoice.id}</h2>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${invoiceStatusStyles[selectedInvoice.status]}`}>{selectedInvoice.status}</span>
                      </div>
                      <p className="text-sm text-gray-400">Order: <span className="text-blue-600 font-medium">{selectedInvoice.order}</span> &nbsp;|&nbsp; {selectedInvoice.billTo}</p>
                    </div>
                    <div className="text-right">
                      <p className="md:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white">{selectedInvoice.amount}</p>
                      <p className={`text-sm mt-0.5 font-medium ${selectedInvoice.balanceRed ? 'text-red-500' : selectedInvoice.balanceGreen ? 'text-green-500' : 'text-gray-500'}`}>
                        Balance: {selectedInvoice.balance}
                      </p>
                    </div>
                  </div>

                  {/* Key Details */}
                  <div className="grid grid-cols-4 md:gap-3 xl:gap-4 md:mb-3 xl:mb-5">
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
                  <div className="md:mb-3 xl:mb-5">
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
                    <div className="md:mb-3 xl:mb-5">
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

        {/* Payments: list + detail split */}
        {activeTab === 'Payments' && (
          <div className="flex md:gap-3 xl:gap-4 flex-1 min-h-0">
            <div className="md:w-[300px] xl:w-[380px] flex-shrink-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col min-h-0">
              <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Reference</span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Method</span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Amount</span>
              </div>
              <div className="flex-1 overflow-auto divide-y divide-gray-50 dark:divide-gray-700">
                {payments.map((p) => (
                  <button
                    key={p.ref}
                    onClick={() => setSelectedPayment(p)}
                    className={`w-full text-left px-4 py-3 grid grid-cols-[1fr_auto_auto] gap-2 items-center transition-colors ${
                      selectedPayment?.ref === p.ref ? 'bg-[#0b1b3a] dark:bg-blue-900/40' : 'hover:bg-gray-50 dark:hover:bg-[#1a2540]'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${selectedPayment?.ref === p.ref ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{p.ref}</p>
                      <p className={`text-xs truncate mt-0.5 ${selectedPayment?.ref === p.ref ? 'text-blue-200/70' : 'text-gray-400'}`}>{p.from}</p>
                      <p className={`text-xs mt-0.5 ${selectedPayment?.ref === p.ref ? 'text-blue-200/50' : 'text-gray-400'}`}>{p.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${selectedPayment?.ref === p.ref ? 'bg-white/10 text-white' : methodStyle[p.method].desktop}`}>{p.method}</span>
                    <span className={`text-sm font-medium whitespace-nowrap ${selectedPayment?.ref === p.ref ? 'text-white' : 'text-green-500'}`}>{p.amount}</span>
                  </button>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <span className="text-xs text-gray-400">Showing 1–{payments.length} of 24</span>
                <button className="text-xs text-blue-600 hover:underline font-medium">Next</button>
              </div>
            </div>

            {selectedPayment && (
              <div className="flex-1 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-auto">
                <div className="md:p-4 xl:p-6">
                  <div className="flex items-start justify-between md:mb-3 xl:mb-5">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="md:text-base xl:text-xl font-bold text-gray-900 dark:text-white">{selectedPayment.ref}</h2>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${methodStyle[selectedPayment.method].desktop}`}>{selectedPayment.method}</span>
                      </div>
                      <p className="text-sm text-gray-400">From: <span className="text-gray-700 dark:text-gray-300 font-medium">{selectedPayment.from}</span> &nbsp;|&nbsp; {selectedPayment.bank}</p>
                    </div>
                    <div className="text-right">
                      <p className="md:text-xl xl:text-2xl font-bold text-green-500">{selectedPayment.amount}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Confirmation: {selectedPayment.confirmationNo}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 md:gap-3 xl:gap-4 md:mb-3 xl:mb-5">
                    {[
                      { label: 'Payment Date', value: selectedPayment.date },
                      { label: 'Method', value: selectedPayment.method },
                      { label: 'Bank / Account', value: selectedPayment.bank },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="md:mb-3 xl:mb-5">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Applied To</p>
                    <div className="border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50/60 dark:bg-[#1a2540]/40 border-b border-gray-100 dark:border-gray-700">
                            {['Invoice', 'Amount Applied'].map((col) => (
                              <th key={col} className="px-4 py-2.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                          {selectedPayment.appliedTo.map((a, i) => (
                            <tr key={i}>
                              <td className="px-4 py-3 text-sm text-blue-600 font-medium">{a.inv}</td>
                              <td className="px-4 py-3 text-sm font-semibold text-green-500">{a.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex justify-end px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/40 dark:bg-[#1a2540]/20">
                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-0.5">Total</p>
                          <p className="text-sm font-bold text-green-500">{selectedPayment.amount}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                      <FileText size={14} /> Receipt
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                      <Download size={14} /> Export
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Credit Memos: list + detail split */}
        {activeTab === 'Credit Memos' && (
          <div className="flex md:gap-3 xl:gap-4 flex-1 min-h-0">
            <div className="md:w-[300px] xl:w-[380px] flex-shrink-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col min-h-0">
              <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Credit Memo</span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Reason</span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Amount</span>
              </div>
              <div className="flex-1 overflow-auto divide-y divide-gray-50 dark:divide-gray-700">
                {creditMemos.map((cm) => (
                  <button
                    key={cm.id}
                    onClick={() => setSelectedCM(cm)}
                    className={`w-full text-left px-4 py-3 grid grid-cols-[1fr_auto_auto] gap-2 items-center transition-colors ${
                      selectedCM?.id === cm.id ? 'bg-[#0b1b3a] dark:bg-blue-900/40' : 'hover:bg-gray-50 dark:hover:bg-[#1a2540]'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${selectedCM?.id === cm.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{cm.id}</p>
                      <p className={`text-xs truncate mt-0.5 ${selectedCM?.id === cm.id ? 'text-blue-200/70' : 'text-gray-400'}`}>RMA: {cm.rma}</p>
                      <p className={`text-xs mt-0.5 ${selectedCM?.id === cm.id ? 'text-blue-200/50' : 'text-gray-400'}`}>{cm.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${selectedCM?.id === cm.id ? 'bg-white/10 text-white' : cm.reasonStyle}`}>{cm.reason}</span>
                    <span className={`text-sm font-medium whitespace-nowrap ${selectedCM?.id === cm.id ? 'text-white' : 'text-green-500'}`}>{cm.amount}</span>
                  </button>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <span className="text-xs text-gray-400">Showing 1–{creditMemos.length} of 18</span>
                <button className="text-xs text-blue-600 hover:underline font-medium">Next</button>
              </div>
            </div>

            {selectedCM && (
              <div className="flex-1 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-auto">
                <div className="md:p-4 xl:p-6">
                  <div className="flex items-start justify-between md:mb-3 xl:mb-5">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="md:text-base xl:text-xl font-bold text-gray-900 dark:text-white">{selectedCM.id}</h2>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${selectedCM.reasonStyle}`}>{selectedCM.reason}</span>
                      </div>
                      <p className="text-sm text-gray-400">RMA: <span className="text-blue-600 font-medium">{selectedCM.rma}</span> &nbsp;|&nbsp; Applied to: <span className="text-blue-600 font-medium">{selectedCM.appliedTo}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="md:text-xl xl:text-2xl font-bold text-green-500">{selectedCM.amount}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Credit Amount</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 md:gap-3 xl:gap-4 md:mb-3 xl:mb-5">
                    {[
                      { label: 'Date Issued', value: selectedCM.date },
                      { label: 'Applied To', value: selectedCM.appliedTo },
                      { label: 'Issued To', value: selectedCM.issuedTo },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="md:mb-3 xl:mb-5 bg-gray-50 dark:bg-[#1a2540]/40 border border-gray-100 dark:border-gray-700 rounded-lg px-4 py-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Notes</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{selectedCM.notes}</p>
                  </div>

                  <div className="md:mb-3 xl:mb-5">
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
                          {selectedCM.lineItems.map((item, i) => (
                            <tr key={i}>
                              <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">{item.desc}</td>
                              <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.qty}</td>
                              <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.unit}</td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">{item.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex justify-end px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/40 dark:bg-[#1a2540]/20">
                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-0.5">Total Credit</p>
                          <p className="text-sm font-bold text-green-500">{selectedCM.amount}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                      <Download size={14} /> Download PDF
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                      <RotateCcw size={14} /> View RMA
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
