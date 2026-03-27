'use client'

import { useState } from 'react'
import { AlertTriangle, CreditCard, FileText, Download } from 'lucide-react'

const accountSummary = [
  {
    label: 'Total Outstanding',
    value: '$247,850.00',
    sub: 'Across 12 invoices',
    subColor: 'text-gray-400',
    icon: FileText,
    iconColor: 'text-blue-500',
  },
  {
    label: 'Past Due',
    value: '$45,200.00',
    valueColor: 'text-red-500',
    sub: '3 invoices overdue',
    subColor: 'text-gray-400',
    icon: AlertTriangle,
    iconColor: 'text-red-400',
  },
  {
    label: 'Credit Limit',
    value: '$500,000',
    sub: '30% available',
    subColor: 'text-green-500',
    icon: CreditCard,
    iconColor: 'text-blue-500',
  },
  {
    label: 'Payment Terms',
    value: 'Net 30',
    sub: 'Standard terms',
    subColor: 'text-gray-400',
    icon: FileText,
    iconColor: 'text-blue-400',
  },
]

const agingSummary = [
  { label: 'Current', value: '$156,450', labelColor: 'text-green-500' },
  { label: '30 Days', value: '$46,200', labelColor: 'text-yellow-500' },
  { label: '60 Days', value: '$28,400', labelColor: 'text-orange-500' },
  { label: '90+ Days', value: '$16,800', labelColor: 'text-red-500', valueColor: 'text-red-500' },
]

const invoices = [
  { id: 'INV-2024-0892', order: 'PCS-2024-1820', date: 'Feb 15, 2024', due: 'Feb 15, 2024', dueRed: true, status: 'Past Due', amount: '$28,450.00', balance: '$28,450.00', balanceRed: true },
  { id: 'INV-2024-0915', order: 'PCS-2024-1835', date: 'Mar 05, 2024', due: 'Apr 04, 2024', status: 'Open', amount: '$84,500.00', balance: '$84,500.00' },
  { id: 'INV-2024-0928', order: 'PCS-2024-1842', date: 'Mar 18, 2024', due: 'Apr 17, 2024', status: 'Open', amount: '$156,000.00', balance: '$118,100.00' },
  { id: 'INV-2024-0887', order: 'PCS-2024-1815', date: 'Feb 08, 2024', due: 'Mar 09, 2024', status: 'Paid', amount: '$42,300.00', balance: '$0.00', balanceGreen: true },
  { id: 'INV-2024-0875', order: 'PCS-2024-1798', date: 'Jan 25, 2024', due: 'Feb 24, 2024', status: 'Paid', amount: '$67,800.00', balance: '$0.00', balanceGreen: true },
  { id: 'INV-2024-0862', order: 'PCS-2024-1782', date: 'Jan 12, 2024', due: 'Feb 11, 2024', status: 'Paid', amount: '$38,950.00', balance: '$0.00', balanceGreen: true },
]

const statusStyles = {
  'Past Due': 'bg-red-50 text-red-600',
  'Open': 'bg-blue-50 text-blue-600',
  'Paid': 'bg-green-50 text-green-600',
}

const tabs = ['Invoices', 'Payments', 'Credit Memos']

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState('Invoices')

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Financial</h1>

      {/* Account Summary */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Account Summary</h2>
        <div className="grid grid-cols-4 gap-4">
          {accountSummary.map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <item.icon size={15} className={item.iconColor} />
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{item.label}</p>
              </div>
              <p className={`text-2xl font-bold ${item.valueColor || 'text-gray-900'}`}>{item.value}</p>
              <p className={`text-xs mt-1 ${item.subColor}`}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Aging Summary */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Aging Summary</h2>
        <div className="grid grid-cols-4 gap-4">
          {agingSummary.map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${item.labelColor}`}>{item.label}</p>
              <p className={`text-2xl font-bold ${item.valueColor || 'text-gray-900'}`}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {/* Tabs + Statement button */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-[#0b1b3a] text-white'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#112654] transition-colors">
            <Download size={14} />
            Statement
          </button>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Invoice #', 'Order', 'Date', 'Due Date', 'Status', 'Amount', 'Balance', 'Action'].map((col) => (
                <th key={col} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-gray-900">{inv.id}</td>
                <td className="px-5 py-4 text-sm text-blue-600 font-medium">{inv.order}</td>
                <td className="px-5 py-4 text-sm text-gray-500">{inv.date}</td>
                <td className={`px-5 py-4 text-sm font-medium ${inv.dueRed ? 'text-red-500' : 'text-gray-500'}`}>{inv.due}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[inv.status]}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-gray-700 font-medium">{inv.amount}</td>
                <td className={`px-5 py-4 text-sm font-medium ${inv.balanceRed ? 'text-red-500' : inv.balanceGreen ? 'text-green-500' : 'text-gray-700'}`}>
                  {inv.balance}
                </td>
                <td className="px-5 py-4">
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <Download size={13} />
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Show
            <select className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            per page
          </div>
          <span className="text-sm text-gray-500">Showing 1–6 of 24 invoices</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md">1</button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
