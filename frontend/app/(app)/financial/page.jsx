'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'

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
  { id: 'INV-2024-0892', order: 'PCS-2024-1820', date: 'Feb 15, 2024', due: 'Feb 15, 2024', dueRed: true, status: 'Past Due', amount: '$28,450.00', balance: '$28,450.00', balanceRed: true },
  { id: 'INV-2024-0915', order: 'PCS-2024-1835', date: 'Mar 05, 2024', due: 'Apr 04, 2024', status: 'Open', amount: '$84,500.00', balance: '$84,500.00' },
  { id: 'INV-2024-0928', order: 'PCS-2024-1842', date: 'Mar 18, 2024', due: 'Apr 17, 2024', status: 'Open', amount: '$156,000.00', balance: '$118,100.00' },
  { id: 'INV-2024-0887', order: 'PCS-2024-1815', date: 'Feb 08, 2024', due: 'Mar 09, 2024', status: 'Paid', amount: '$42,300.00', balance: '$0.00', balanceGreen: true },
  { id: 'INV-2024-0875', order: 'PCS-2024-1798', date: 'Jan 25, 2024', due: 'Feb 24, 2024', status: 'Paid', amount: '$67,800.00', balance: '$0.00', balanceGreen: true },
  { id: 'INV-2024-0862', order: 'PCS-2024-1782', date: 'Jan 12, 2024', due: 'Feb 11, 2024', status: 'Paid', amount: '$38,950.00', balance: '$0.00', balanceGreen: true },
]

const invoiceStatusStyles = {
  'Past Due': 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  'Open': 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  'Paid': 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
}

const payments = [
  { ref: 'PAY-2024-0892', method: 'Wire', methodStyle: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', date: 'Mar 25, 2024', appliedTo: ['INV-8821', 'INV-8819'], amount: '$75,400.00' },
  { ref: 'PAY-2024-0891', method: 'ACH', methodStyle: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400', date: 'Mar 22, 2024', appliedTo: ['INV-8815'], amount: '$32,750.00' },
  { ref: 'PAY-2024-0890', method: 'Check', methodStyle: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', date: 'Mar 18, 2024', appliedTo: ['INV-8810', 'INV-8808', 'INV-8806'], amount: '$124,200.00' },
  { ref: 'PAY-2024-0889', method: 'Wire', methodStyle: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', date: 'Mar 15, 2024', appliedTo: ['INV-8802'], amount: '$56,800.00' },
  { ref: 'PAY-2024-0888', method: 'ACH', methodStyle: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400', date: 'Mar 10, 2024', appliedTo: ['INV-8798', 'INV-8795'], amount: '$89,350.00' },
  { ref: 'PAY-2024-0887', method: 'Wire', methodStyle: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', date: 'Mar 5, 2024', appliedTo: ['INV-8790'], amount: '$41,600.00' },
]

const creditMemos = [
  { id: 'CM-2024-0156', rma: 'RMA-4521', date: 'Mar 24, 2024', reason: 'Defective units', reasonStyle: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400', appliedTo: 'INV-8834', amount: '$4,250.00' },
  { id: 'CM-2024-0155', rma: 'RMA-4518', date: 'Mar 20, 2024', reason: 'Pricing adjustment', reasonStyle: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', appliedTo: 'INV-8821', amount: '$1,800.00' },
  { id: 'CM-2024-0154', rma: 'RMA-4512', date: 'Mar 15, 2024', reason: 'Returned merchandise', reasonStyle: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', appliedTo: 'INV-8815', amount: '$8,750.00' },
  { id: 'CM-2024-0153', rma: 'RMA-4508', date: 'Mar 10, 2024', reason: 'Shipping damage', reasonStyle: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', appliedTo: 'INV-8810', amount: '$2,400.00' },
  { id: 'CM-2024-0152', rma: 'RMA-4502', date: 'Mar 5, 2024', reason: 'Defective units', reasonStyle: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400', appliedTo: 'INV-8802', amount: '$6,100.00' },
  { id: 'CM-2024-0151', rma: 'RMA-4498', date: 'Feb 28, 2024', reason: 'Pricing adjustment', reasonStyle: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', appliedTo: 'INV-8798', amount: '$3,200.00' },
]

const tabs = ['Invoices', 'Payments', 'Credit Memos']

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState('Invoices')

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Financial</h1>

      {/* Account Summary */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        {accountSummary.map((item) => (
          <div key={item.label} className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
            <p className="text-xs text-gray-400 mb-2">{item.label}</p>
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

      {/* Tab Table */}
      <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab ? 'bg-[#0b1b3a] text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a2540]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#112654] transition-colors">
            <Download size={14} />
            Download Statement
          </button>
        </div>

        {/* Invoices */}
        {activeTab === 'Invoices' && (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  {['Invoice #', 'Order', 'Date', 'Due Date', 'Status', 'Amount', 'Balance', 'Action'].map((col) => (
                    <th key={col} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a2540] transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white">{inv.id}</td>
                    <td className="px-5 py-4 text-sm text-blue-600 font-medium">{inv.order}</td>
                    <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{inv.date}</td>
                    <td className={`px-5 py-4 text-sm font-medium ${inv.dueRed ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>{inv.due}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${invoiceStatusStyles[inv.status]}`}>{inv.status}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">{inv.amount}</td>
                    <td className={`px-5 py-4 text-sm font-medium ${inv.balanceRed ? 'text-red-500' : inv.balanceGreen ? 'text-green-500' : 'text-gray-700 dark:text-gray-300'}`}>{inv.balance}</td>
                    <td className="px-5 py-4">
                      <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                        <Download size={13} /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                Show
                <select className="border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none bg-white dark:bg-[#1e2d45] text-gray-700 dark:text-gray-200">
                  <option>10</option><option>25</option><option>50</option>
                </select>
                per page
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Showing 1–6 of 24 invoices</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">Previous</button>
                <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md">1</button>
                <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">2</button>
                <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">Next</button>
              </div>
            </div>
          </>
        )}

        {/* Payments */}
        {activeTab === 'Payments' && (
          <>
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
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium ${p.methodStyle}`}>{p.method}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{p.date}</td>
                    <td className="px-5 py-4 text-sm text-blue-600 font-medium">{p.appliedTo.join(', ')}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-green-500">{p.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                Show
                <select className="border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none bg-white dark:bg-[#1e2d45] text-gray-700 dark:text-gray-200">
                  <option>10</option><option>25</option><option>50</option>
                </select>
                per page
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Showing 1-6 of 24 payments</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">Previous</button>
                <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md">1</button>
                <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">2</button>
                <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">Next</button>
              </div>
            </div>
          </>
        )}

        {/* Credit Memos */}
        {activeTab === 'Credit Memos' && (
          <>
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
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium ${cm.reasonStyle}`}>{cm.reason}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-blue-600 font-medium">{cm.appliedTo}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-green-500">{cm.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                Show
                <select className="border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none bg-white dark:bg-[#1e2d45] text-gray-700 dark:text-gray-200">
                  <option>10</option><option>25</option><option>50</option>
                </select>
                per page
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Showing 1-6 of 18 credit memos</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">Previous</button>
                <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md">1</button>
                <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">2</button>
                <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">Next</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
