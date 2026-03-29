'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, Download } from 'lucide-react'

const orders = [
  { id: 'PCS-2024-1847', po: 'WH-48291', date: 'Mar 25, 2024', status: 'Shipped', items: 500, total: '$84,500', facility: 'Miami, FL', eta: 'Mar 28' },
  { id: 'PCS-2024-1846', po: 'WH-48290', date: 'Mar 24, 2024', status: 'Processing', items: 1200, total: '$156,000', facility: 'Dallas, TX', eta: 'Mar 30' },
  { id: 'PCS-2024-1845', po: 'WH-48289', date: 'Mar 23, 2024', status: 'Delivered', items: 250, total: '$32,750', facility: 'Los Angeles, CA', eta: 'Mar 25' },
  { id: 'PCS-2024-1844', po: 'WH-48288', date: 'Mar 22, 2024', status: 'On Hold', items: 800, total: '$98,400', facility: 'Miami, FL', eta: 'TBD' },
  { id: 'PCS-2024-1843', po: 'WH-49267', date: 'Mar 21, 2024', status: 'Delivered', items: 320, total: '$44,800', facility: 'Chicago, IL', eta: 'Mar 23' },
  { id: 'PCS-2024-1842', po: 'WH-48286', date: 'Mar 20, 2024', status: 'Shipped', items: 180, total: '$21,600', facility: 'New York, NY', eta: 'Mar 27' },
]

const statusStyles = {
  Shipped: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  Processing: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Delivered: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'On Hold': 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
}

const mobileStatusStyles = {
  Shipped: 'bg-teal-500/20 text-teal-400',
  Processing: 'bg-blue-500/20 text-blue-400',
  Delivered: 'bg-green-500/20 text-green-400',
  'On Hold': 'bg-red-500/20 text-red-400',
}

const desktopTabs = ['All Orders', 'Processing', 'Shipped', 'Delivered', 'On Hold']
const mobileTabs = ['All', 'Processing', 'Shipped', 'Delivered']

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('All Orders')
  const [mobileTab, setMobileTab] = useState('All')

  const filtered = activeTab === 'All Orders' ? orders : orders.filter((o) => o.status === activeTab)
  const mobileFiltered = mobileTab === 'All' ? orders : orders.filter((o) => o.status === mobileTab)

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden min-h-screen bg-[#f1f5f9] dark:bg-[#0d1829] px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Orders</h1>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white dark:bg-[#152035] rounded-xl px-4 py-3 mb-4 border border-gray-100 dark:border-white/5">
          <Search size={16} className="text-gray-400 dark:text-blue-300/40 flex-shrink-0" />
          <input
            placeholder="Search orders..."
            className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-blue-300/40 focus:outline-none"
          />
          <SlidersHorizontal size={16} className="text-gray-400 dark:text-blue-300/40 flex-shrink-0" />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          {mobileTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                mobileTab === tab
                  ? 'bg-[#0b1b3a] text-white'
                  : 'text-gray-500 dark:text-blue-300/50 border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Order Cards */}
        <div className="space-y-3">
          {mobileFiltered.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5"
            >
              <div className="flex items-start justify-between mb-1">
                <p className="text-base font-bold text-gray-900 dark:text-white">{order.id}</p>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${mobileStatusStyles[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-3">PO: {order.po}</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 dark:text-blue-300/40 uppercase tracking-wide mb-1">Items</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{order.items}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 dark:text-blue-300/40 uppercase tracking-wide mb-1">Total</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{order.total}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 dark:text-blue-300/40 uppercase tracking-wide mb-1">
                    {order.status === 'Delivered' ? 'Delivered' : 'ETA'}
                  </p>
                  <p className={`text-sm font-bold ${
                    order.eta === 'TBD' ? 'text-red-500 dark:text-red-400' :
                    order.status === 'Delivered' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'
                  }`}>{order.eta}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Orders</h1>

        <div className="bg-white dark:bg-[#152035] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search by order #, PO #, or product..."
                className="pl-8 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                <SlidersHorizontal size={14} /> Filter
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                <Download size={14} /> Export
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 dark:border-gray-700 px-5">
            {desktopTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                  activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                {['Order #', 'Date', 'Status', 'Items', 'Total', 'Facility', 'ETA', 'Actions'].map((col) => (
                  <th key={col} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a2540] transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{order.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">PO: {order.po}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{order.items}</td>
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-200 font-medium">{order.total}</td>
                  <td className="px-5 py-4 text-sm text-blue-600">{order.facility}</td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{order.eta}</td>
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
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              Show
              <select className="border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none bg-white dark:bg-[#1e2d45] text-gray-700 dark:text-gray-200">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              per page
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Showing 1–6 of 47 orders</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">Previous</button>
              <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md">1</button>
              <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">2</button>
              <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
