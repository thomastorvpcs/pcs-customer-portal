'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, Download } from 'lucide-react'

const orders = [
  { id: 'PCS-2024-1847', po: 'PO: WI-49329', date: 'Mar 25, 2024', status: 'Shipped', items: 500, total: '$84,500', facility: 'Miami, FL', eta: 'Mar 28' },
  { id: 'PCS-2024-1846', po: 'PO: WI-48290', date: 'Mar 24, 2024', status: 'Processing', items: 1200, total: '$156,000', facility: 'Dallas, TX', eta: 'Mar 30' },
  { id: 'PCS-2024-1845', po: 'PO: WI-48289', date: 'Mar 23, 2024', status: 'Delivered', items: 250, total: '$32,750', facility: 'Los Angeles, CA', eta: 'Mar 25' },
  { id: 'PCS-2024-1844', po: 'PO: WI-48788', date: 'Mar 22, 2024', status: 'On Hold', items: 800, total: '$98,400', facility: 'Miami, FL', eta: 'TBD' },
  { id: 'PCS-2024-1843', po: 'PO: WI-49267', date: 'Mar 21, 2024', status: 'Delivered', items: 320, total: '$44,800', facility: 'Chicago, IL', eta: 'Mar 23' },
  { id: 'PCS-2024-1842', po: 'PO: WI-48286', date: 'Mar 20, 2024', status: 'Shipped', items: 180, total: '$21,600', facility: 'New York, NY', eta: 'Mar 27' },
]

const statusStyles = {
  Shipped: 'bg-teal-50 text-teal-700',
  Processing: 'bg-blue-50 text-blue-700',
  Delivered: 'bg-green-50 text-green-700',
  'On Hold': 'bg-red-50 text-red-600',
}

const tabs = ['All Orders', 'Processing', 'Shipped', 'Delivered', 'On Hold']

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('All Orders')
  const filtered = activeTab === 'All Orders' ? orders : orders.filter((o) => o.status === activeTab)

  return (
    <div className="flex-1 p-8 bg-[#f1f5f9] overflow-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search by order #, PO #, or product..."
              className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              <SlidersHorizontal size={14} /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Order #', 'Date', 'Status', 'Items', 'Total', 'Facility', 'ETA', 'Actions'].map((col) => (
                <th key={col} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-gray-900">{order.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{order.po}</p>
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">{order.date}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">{order.items}</td>
                <td className="px-5 py-4 text-sm text-gray-700 font-medium">{order.total}</td>
                <td className="px-5 py-4 text-sm text-blue-600">{order.facility}</td>
                <td className="px-5 py-4 text-sm text-gray-500">{order.eta}</td>
                <td className="px-5 py-4">
                  <Link href={`/orders/${order.id}`} className="text-sm text-blue-600 hover:underline">
                    View
                  </Link>
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
          <span className="text-sm text-gray-500">Showing 1–6 of 47 orders</span>
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
