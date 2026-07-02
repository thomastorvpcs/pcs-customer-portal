'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CreditCard, Landmark, CheckCircle2, Download, ArrowLeft, Lock, ShieldCheck } from 'lucide-react'

const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 })

const mockInvoices = [
  { id: 'INV-8815', order: 'PCS-2024-1842', due: 'Jun 12, 2026', amount: 32750.0, status: 'Past Due' },
  { id: 'INV-8821', order: 'PCS-2024-1851', due: 'Jul 05, 2026', amount: 45200.0, status: 'Past Due' },
  { id: 'INV-8834', order: 'PCS-2024-1866', due: 'Jul 18, 2026', amount: 18450.0, status: 'Open' },
  { id: 'INV-8840', order: 'PCS-2024-1873', due: 'Jul 24, 2026', amount: 27600.0, status: 'Open' },
  { id: 'INV-8848', order: 'PCS-2024-1889', due: 'Aug 01, 2026', amount: 12980.0, status: 'Open' },
]

const statusStyle = {
  'Past Due': 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  Open: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
}

const uLabel = 'text-[10px] font-semibold text-gray-400 uppercase tracking-wide'
const inputCls =
  'w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'

export default function PayPage() {
  const [selected, setSelected] = useState([])
  const [method, setMethod] = useState('card')
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '', name: '' })
  const [ach, setAch] = useState({ name: '', routing: '', account: '' })
  const [paid, setPaid] = useState(false)

  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const allSelected = selected.length === mockInvoices.length
  const toggleAll = () => setSelected(allSelected ? [] : mockInvoices.map((i) => i.id))

  const totalOutstanding = mockInvoices.reduce((a, i) => a + i.amount, 0)
  const pastDue = mockInvoices.filter((i) => i.status === 'Past Due').reduce((a, i) => a + i.amount, 0)
  const selectedInvoices = mockInvoices.filter((i) => selected.includes(i.id))
  const total = selectedInvoices.reduce((a, i) => a + i.amount, 0)
  const confirmationNo = 'PMT-2026-' + (paid ? '004821' : '000000')

  const InvoiceRow = ({ inv, compact }) => (
    <label
      className={`flex items-center gap-3 ${compact ? 'px-4 py-3' : 'px-4 py-3.5'} cursor-pointer transition-colors ${
        selected.includes(inv.id) ? 'bg-blue-50/60 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-[#1a2540]'
      }`}
    >
      <input
        type="checkbox"
        checked={selected.includes(inv.id)}
        onChange={() => toggle(inv.id)}
        className="w-4 h-4 rounded accent-[#0b1b3a]"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{inv.id}</p>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusStyle[inv.status]}`}>{inv.status}</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">Order {inv.order} &middot; Due {inv.due}</p>
      </div>
      <p className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">{fmt(inv.amount)}</p>
    </label>
  )

  const PaymentFields = () => (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={() => setMethod('card')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
            method === 'card'
              ? 'bg-[#0b1b3a] text-white border-[#0b1b3a] hover:bg-[#0d2147]'
              : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'
          }`}
        >
          <CreditCard size={15} /> Credit Card
        </button>
        <button
          onClick={() => setMethod('ach')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
            method === 'ach'
              ? 'bg-[#0b1b3a] text-white border-[#0b1b3a] hover:bg-[#0d2147]'
              : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'
          }`}
        >
          <Landmark size={15} /> ACH / Bank
        </button>
      </div>
      {method === 'card' ? (
        <div className="space-y-3">
          <div>
            <p className={uLabel + ' mb-1'}>Card Number</p>
            <input value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} placeholder="4242 4242 4242 4242" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={uLabel + ' mb-1'}>Expiry</p>
              <input value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} placeholder="MM / YY" className={inputCls} />
            </div>
            <div>
              <p className={uLabel + ' mb-1'}>CVC</p>
              <input value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} placeholder="123" className={inputCls} />
            </div>
          </div>
          <div>
            <p className={uLabel + ' mb-1'}>Name on Card</p>
            <input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="John Davis" className={inputCls} />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <p className={uLabel + ' mb-1'}>Account Name</p>
            <input value={ach.name} onChange={(e) => setAch({ ...ach, name: e.target.value })} placeholder="John Davis" className={inputCls} />
          </div>
          <div>
            <p className={uLabel + ' mb-1'}>Routing Number</p>
            <input value={ach.routing} onChange={(e) => setAch({ ...ach, routing: e.target.value })} placeholder="021000021" className={inputCls} />
          </div>
          <div>
            <p className={uLabel + ' mb-1'}>Account Number</p>
            <input value={ach.account} onChange={(e) => setAch({ ...ach, account: e.target.value })} placeholder="000123456789" className={inputCls} />
          </div>
        </div>
      )}
    </div>
  )

  const SuccessCard = () => (
    <div className="text-center py-6">
      <div className="mx-auto w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
        <CheckCircle2 size={30} className="text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payment successful</h3>
      <p className="text-sm text-gray-400 mt-1">{fmt(total)} paid via {method === 'card' ? 'Credit Card' : 'ACH / Bank Transfer'}</p>
      <div className="mt-4 mx-auto max-w-xs bg-gray-50 dark:bg-[#1a2540]/40 border border-gray-100 dark:border-gray-700 rounded-lg px-4 py-3">
        <p className={uLabel}>Confirmation Number</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{confirmationNo}</p>
      </div>
      <p className="text-xs text-gray-400 mt-3">Your account balances have been updated.</p>
      <div className="flex flex-col gap-2 mt-5 max-w-xs mx-auto">
        <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors">
          <Download size={15} /> Download Receipt
        </button>
        <Link href="/financial" className="text-sm text-blue-600 hover:underline font-medium">Back to Financial</Link>
      </div>
    </div>
  )

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] min-h-full pb-8">
        <div className="px-4 pt-5 pb-4">
          <Link href="/financial" className="flex items-center gap-1.5 text-sm text-blue-500 mb-3">
            <ArrowLeft size={16} /> Financial
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pay Invoices</h1>
          <p className="text-sm text-gray-400 mt-1">Settle outstanding balances online</p>
        </div>

        <div className="flex gap-3 overflow-x-auto px-4 pb-2 mb-4 scrollbar-none">
          {[
            { label: 'Total Outstanding', value: fmt(totalOutstanding) },
            { label: 'Past Due', value: fmt(pastDue), color: 'text-red-500' },
            { label: 'Selected to Pay', value: fmt(total), color: 'text-yellow-600 dark:text-yellow-400' },
          ].map((s) => (
            <div key={s.label} className="flex-shrink-0 w-40 bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
              <p className="text-xs text-gray-400 mb-2">{s.label}</p>
              <p className={`text-lg font-bold ${s.color || 'text-gray-900 dark:text-white'}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {paid ? (
          <div className="px-4">
            <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
              <SuccessCard />
            </div>
          </div>
        ) : (
          <div className="px-4 space-y-4">
            <div className="bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/5">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Step 1 &middot; Select Invoices</p>
                <button onClick={toggleAll} className="text-xs text-blue-600 font-medium">{allSelected ? 'Clear' : 'Select all'}</button>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-white/5">
                {mockInvoices.map((inv) => <InvoiceRow key={inv.id} inv={inv} compact />)}
              </div>
            </div>

            <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Step 2 &middot; Payment Method</p>
              <PaymentFields />
            </div>

            <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Step 3 &middot; Review &amp; Pay</p>
              <div className="space-y-1.5 mb-3">
                {selectedInvoices.length === 0 ? (
                  <p className="text-xs text-gray-400">No invoices selected yet.</p>
                ) : (
                  selectedInvoices.map((i) => (
                    <div key={i.id} className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{i.id}</span>
                      <span className="text-gray-900 dark:text-white font-medium">{fmt(i.amount)}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-between border-t border-gray-100 dark:border-white/5 pt-3 mb-4">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{fmt(total)}</span>
              </div>
              <button
                disabled={total === 0}
                onClick={() => setPaid(true)}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-xl bg-[#0b1b3a] text-white hover:bg-[#0d2147] transition-colors disabled:opacity-40"
              >
                <Lock size={14} /> Pay {fmt(total)}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block md:p-4 xl:p-8">
        <Link href="/financial" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline mb-3">
          <ArrowLeft size={16} /> Back to Financial
        </Link>
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pay Invoices</h1>
          <p className="text-sm text-gray-400 mt-1">Settle outstanding balances online</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { label: 'Total Outstanding', value: fmt(totalOutstanding), sub: `${mockInvoices.length} invoices` },
            { label: 'Past Due', value: fmt(pastDue), color: 'text-red-500', sub: '2 overdue' },
            { label: 'Selected to Pay', value: fmt(total), color: 'text-yellow-600 dark:text-yellow-400', sub: `${selected.length} selected` },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
              <p className={uLabel + ' mb-2'}>{s.label}</p>
              <p className={`text-2xl font-bold ${s.color || 'text-gray-900 dark:text-white'}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 items-start">
          {/* Left: invoice selection */}
          <div className="flex-1 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Step 1 &middot; Select Invoices</p>
              <button onClick={toggleAll} className="text-xs text-blue-600 hover:underline font-medium">{allSelected ? 'Clear selection' : 'Select all'}</button>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {mockInvoices.map((inv) => <InvoiceRow key={inv.id} inv={inv} />)}
            </div>
          </div>

          {/* Right: sticky payment + summary */}
          <div className="w-[380px] flex-shrink-0 sticky top-4 space-y-4">
            {paid ? (
              <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                <SuccessCard />
              </div>
            ) : (
              <>
                <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Step 2 &middot; Payment Method</p>
                  <PaymentFields />
                </div>
                <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Step 3 &middot; Review &amp; Pay</p>
                  <div className="space-y-1.5 mb-3">
                    {selectedInvoices.length === 0 ? (
                      <p className="text-xs text-gray-400">Select invoices on the left to begin.</p>
                    ) : (
                      selectedInvoices.map((i) => (
                        <div key={i.id} className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">{i.id}</span>
                          <span className="text-gray-900 dark:text-white font-medium">{fmt(i.amount)}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Method</span>
                    <span>{method === 'card' ? 'Credit Card' : 'ACH / Bank Transfer'}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 dark:border-gray-700 pt-3 mt-3 mb-4">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{fmt(total)}</span>
                  </div>
                  <button
                    disabled={total === 0}
                    onClick={() => setPaid(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-lg bg-[#0b1b3a] text-white hover:bg-[#0d2147] transition-colors disabled:opacity-40"
                  >
                    <Lock size={14} /> Pay {fmt(total)}
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 mt-3">
                    <ShieldCheck size={13} /> Payments are encrypted and processed securely
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
