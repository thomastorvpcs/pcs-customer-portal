'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Download, Truck, FileText, RotateCcw, Eye, CheckCircle2, CircleDot, Circle } from 'lucide-react'

const orders = [
  {
    id: 'PCS-2024-1847',
    po: 'WH-48291',
    date: 'Mar 25, 2024',
    status: 'Shipped',
    items: 500,
    total: '$84,500',
    description: 'iPhone 13 Pro · Miami, FL',
    shipFrom: 'PCS Wireless MLC, Miami FL',
    shipTo: 'Wireless Depot, Dallas TX',
    totalValue: '$84,500.00',
    lineItems: '4 products, 500 units · iPhone 13 Pro, iPhone 12, Galaxy S21...',
    orderDate: 'March 25, 2024',
    estimatedDelivery: 'March 28, 2024',
    tracking: { status: 'In transit - Memphis, TN to Dallas, TX', carrier: 'FedEx Ground', number: '748923848392', eta: 'Est. Mar 28' },
    timeline: [
      { label: 'Order Confirmed', date: 'Mar 25', done: true },
      { label: 'QC Complete', date: 'Mar 25', done: true },
      { label: 'Packed', date: 'Mar 26', done: true },
      { label: 'Shipped', date: 'Mar 27', done: false, active: true },
      { label: 'Delivered', date: 'Est Mar 28', done: false },
    ],
  },
  {
    id: 'PCS-2024-1846',
    po: 'WH-48290',
    date: 'Mar 24, 2024',
    status: 'Processing',
    items: 1200,
    total: '$156,000',
    description: 'Samsung Galaxy S23 · Dallas, TX',
    shipFrom: 'PCS Wireless MLC, Miami FL',
    shipTo: 'T-Mobile Retail, Dallas TX',
    totalValue: '$156,000.00',
    lineItems: '3 products, 1200 units · Galaxy S23, Galaxy A54, Galaxy Tab...',
    orderDate: 'March 24, 2024',
    estimatedDelivery: 'March 30, 2024',
    tracking: null,
    timeline: [
      { label: 'Order Confirmed', date: 'Mar 24', done: true },
      { label: 'QC Complete', date: 'Mar 25', done: true },
      { label: 'Packed', date: 'Mar 26', done: false, active: true },
      { label: 'Shipped', date: 'Pending', done: false },
      { label: 'Delivered', date: 'Est Mar 30', done: false },
    ],
  },
  {
    id: 'PCS-2024-1845',
    po: 'WH-48289',
    date: 'Mar 23, 2024',
    status: 'Delivered',
    items: 250,
    total: '$32,750',
    description: 'iPhone 14 · Los Angeles, CA',
    shipFrom: 'PCS Wireless MLC, Miami FL',
    shipTo: 'Metro by T-Mobile, Los Angeles CA',
    totalValue: '$32,750.00',
    lineItems: '2 products, 250 units · iPhone 14, iPhone 14 Plus',
    orderDate: 'March 23, 2024',
    estimatedDelivery: 'March 25, 2024',
    tracking: { status: 'Delivered - Los Angeles, CA', carrier: 'FedEx Ground', number: '374839201847', eta: 'Mar 25' },
    timeline: [
      { label: 'Order Confirmed', date: 'Mar 23', done: true },
      { label: 'QC Complete', date: 'Mar 23', done: true },
      { label: 'Packed', date: 'Mar 24', done: true },
      { label: 'Shipped', date: 'Mar 24', done: true },
      { label: 'Delivered', date: 'Mar 25', done: true, active: true },
    ],
  },
  {
    id: 'PCS-2024-1844',
    po: 'WH-48288',
    date: 'Mar 22, 2024',
    status: 'On Hold',
    items: 800,
    total: '$98,400',
    description: 'Google Pixel 8 · Miami, FL',
    shipFrom: 'PCS Wireless MLC, Miami FL',
    shipTo: 'Verizon Wireless, Chicago IL',
    totalValue: '$98,400.00',
    lineItems: '2 products, 800 units · Pixel 8, Pixel 8 Pro',
    orderDate: 'March 22, 2024',
    estimatedDelivery: 'TBD',
    tracking: null,
    timeline: [
      { label: 'Order Confirmed', date: 'Mar 22', done: true },
      { label: 'QC Complete', date: 'Mar 23', done: false, active: true },
      { label: 'Packed', date: 'Pending', done: false },
      { label: 'Shipped', date: 'Pending', done: false },
      { label: 'Delivered', date: 'TBD', done: false },
    ],
  },
  {
    id: 'PCS-2024-1843',
    po: 'WH-49267',
    date: 'Mar 21, 2024',
    status: 'Delivered',
    items: 320,
    total: '$44,800',
    description: 'iPhone 13 · Chicago, IL',
    shipFrom: 'PCS Wireless MLC, Miami FL',
    shipTo: 'AT&T Store, Chicago IL',
    totalValue: '$44,800.00',
    lineItems: '2 products, 320 units · iPhone 13, iPhone 13 Mini',
    orderDate: 'March 21, 2024',
    estimatedDelivery: 'March 23, 2024',
    tracking: { status: 'Delivered - Chicago, IL', carrier: 'UPS Ground', number: '1Z839201847364', eta: 'Mar 23' },
    timeline: [
      { label: 'Order Confirmed', date: 'Mar 21', done: true },
      { label: 'QC Complete', date: 'Mar 21', done: true },
      { label: 'Packed', date: 'Mar 22', done: true },
      { label: 'Shipped', date: 'Mar 22', done: true },
      { label: 'Delivered', date: 'Mar 23', done: true, active: true },
    ],
  },
  {
    id: 'PCS-2024-1842',
    po: 'WH-48286',
    date: 'Mar 20, 2024',
    status: 'Shipped',
    items: 180,
    total: '$21,600',
    description: 'Samsung Galaxy A54 · New York, NY',
    shipFrom: 'PCS Wireless MLC, Miami FL',
    shipTo: 'Metro by T-Mobile, New York NY',
    totalValue: '$21,600.00',
    lineItems: '1 product, 180 units · Samsung Galaxy A54',
    orderDate: 'March 20, 2024',
    estimatedDelivery: 'March 27, 2024',
    tracking: { status: 'In transit - Philadelphia, PA to New York, NY', carrier: 'UPS Ground', number: '1Z738291047364', eta: 'Est. Mar 27' },
    timeline: [
      { label: 'Order Confirmed', date: 'Mar 20', done: true },
      { label: 'QC Complete', date: 'Mar 21', done: true },
      { label: 'Packed', date: 'Mar 21', done: true },
      { label: 'Shipped', date: 'Mar 22', done: false, active: true },
      { label: 'Delivered', date: 'Est Mar 27', done: false },
    ],
  },
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

const tabs = ['All', 'Processing', 'Shipped', 'Delivered', 'On Hold']
const mobileTabs = ['All', 'Processing', 'Shipped', 'Delivered']

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [mobileTab, setMobileTab] = useState('All')
  const [selectedOrder, setSelectedOrder] = useState(orders[0])

  const filtered = activeTab === 'All' ? orders : orders.filter((o) => o.status === activeTab)
  const mobileFiltered = mobileTab === 'All' ? orders : orders.filter((o) => o.status === mobileTab)

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] pb-4">
        <div className="flex items-center justify-between px-4 pt-5 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <button className="text-gray-500 dark:text-gray-400"><SlidersHorizontal size={18} /></button>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-[#152035] rounded-xl mx-4 px-4 py-3 mb-4 border border-gray-100 dark:border-white/5">
          <Search size={16} className="text-gray-400 flex-shrink-0" />
          <input
            placeholder="Search by order #, PO #..."
            className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto px-4 pb-2 mb-4 scrollbar-none">
          {mobileTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                mobileTab === tab
                  ? 'bg-[#0b1b3a] text-white'
                  : 'bg-white dark:bg-[#152035] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="px-4 space-y-3">
          {mobileFiltered.map((order) => (
            <div
              key={order.id}
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
                    order.estimatedDelivery === 'TBD' ? 'text-red-500 dark:text-red-400' :
                    order.status === 'Delivered' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'
                  }`}>{order.estimatedDelivery}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex gap-5 p-6 h-full min-h-0">

        {/* Left: Order List */}
        <div className="w-[380px] flex-shrink-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col min-h-0">

          {/* Search + actions */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <div className="relative flex-1">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search by order #, PO #..."
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400"
              />
            </div>
            <button className="flex items-center gap-1 px-3 py-2 text-xs border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] whitespace-nowrap">
              <SlidersHorizontal size={12} /> Filter
            </button>
            <button className="flex items-center gap-1 px-3 py-2 text-xs border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] whitespace-nowrap">
              <Download size={12} /> Export
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 dark:border-gray-700 px-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-2 border-b border-gray-100 dark:border-gray-700">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Order</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Status</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Total</span>
          </div>

          {/* Order rows */}
          <div className="flex-1 overflow-auto divide-y divide-gray-50 dark:divide-gray-700">
            {filtered.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`w-full text-left px-4 py-3 grid grid-cols-[1fr_auto_auto] gap-2 items-center transition-colors ${
                  selectedOrder?.id === order.id
                    ? 'bg-[#0b1b3a] dark:bg-blue-900/40'
                    : 'hover:bg-gray-50 dark:hover:bg-[#1a2540]'
                }`}
              >
                <div className="min-w-0">
                  <p className={`text-sm font-semibold truncate ${selectedOrder?.id === order.id ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}>
                    {order.id}
                  </p>
                  <p className={`text-xs truncate mt-0.5 ${selectedOrder?.id === order.id ? 'text-blue-200/70' : 'text-gray-400'}`}>
                    PO: {order.po} · {order.items} items
                  </p>
                  <p className={`text-xs mt-0.5 ${selectedOrder?.id === order.id ? 'text-blue-200/50' : 'text-gray-400'}`}>
                    {order.date}
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                  selectedOrder?.id === order.id
                    ? 'bg-white/10 text-white'
                    : statusStyles[order.status]
                }`}>
                  {order.status}
                </span>
                <span className={`text-sm font-semibold whitespace-nowrap ${selectedOrder?.id === order.id ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                  {order.total}
                </span>
              </button>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <span className="text-xs text-gray-400">Showing 1–{filtered.length} of 47</span>
            <button className="text-xs text-blue-600 hover:underline font-medium">Next</button>
          </div>
        </div>

        {/* Right: Order Detail */}
        {selectedOrder && (
          <div className="flex-1 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-auto">
            <div className="p-6">

              {/* Order header */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedOrder.id}</h2>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[selectedOrder.status]}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{selectedOrder.items} units · {selectedOrder.description}</p>
                </div>
              </div>

              {/* Order Status timeline */}
              <div className="mt-5 mb-5">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Order Status</p>
                <div className="flex items-start">
                  {selectedOrder.timeline.map((step, i) => (
                    <div key={i} className="flex items-start flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className="flex items-center w-full">
                          {i > 0 && <div className={`flex-1 h-0.5 -mr-1 ${selectedOrder.timeline[i - 1].done ? 'bg-green-400' : selectedOrder.timeline[i - 1].active ? 'bg-blue-400' : 'bg-gray-200 dark:bg-gray-600'}`} />}
                          <div className="flex-shrink-0 z-10">
                            {step.done ? (
                              <CheckCircle2 size={24} className="text-green-500" fill="#f0fdf4" />
                            ) : step.active ? (
                              <CircleDot size={24} className="text-blue-500" fill="#eff6ff" />
                            ) : (
                              <Circle size={24} className="text-gray-300 dark:text-gray-600" fill="white" />
                            )}
                          </div>
                          {i < selectedOrder.timeline.length - 1 && <div className={`flex-1 h-0.5 -ml-1 ${step.done ? 'bg-green-400' : step.active ? 'progress-line-animated' : 'bg-gray-200 dark:bg-gray-600'}`} />}
                        </div>
                        <p className={`text-xs font-medium mt-2 text-center ${step.done ? 'text-gray-700 dark:text-gray-300' : step.active ? 'text-blue-600' : 'text-gray-400'}`}>{step.label}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking box */}
              {selectedOrder.tracking && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 rounded-lg px-4 py-3 flex items-center gap-3 mb-5">
                  <Truck size={16} className="text-blue-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{selectedOrder.tracking.status}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{selectedOrder.tracking.carrier} · #{selectedOrder.tracking.number} · {selectedOrder.tracking.eta}</p>
                  </div>
                </div>
              )}

              {/* Order Details grid */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                {[
                  { label: 'Ship From', value: selectedOrder.shipFrom },
                  { label: 'Ship To', value: selectedOrder.shipTo },
                  { label: 'Total Value', value: selectedOrder.totalValue },
                  { label: 'Line Items', value: selectedOrder.lineItems },
                  { label: 'Order Date', value: selectedOrder.orderDate },
                  { label: 'Estimated Delivery', value: selectedOrder.estimatedDelivery },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">{value}</p>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 mb-5">
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                  <Eye size={14} /> View All
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                  <FileText size={14} /> Invoice
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors font-medium">
                  <Truck size={14} /> Track Shipment
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-[#0b1b3a] dark:border-blue-400 rounded-lg text-[#0b1b3a] dark:text-blue-400 hover:bg-[#0b1b3a]/5 dark:hover:bg-blue-400/10 transition-colors">
                  <RotateCcw size={14} /> Reorder
                </button>
              </div>

              {/* Documents */}
              <div className="border border-gray-100 dark:border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">Documents</p>
                  <p className="text-xs text-gray-400">Download order confirmation, packing list, and BOL</p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-amber-400 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-400/10 transition-colors whitespace-nowrap font-medium">
                  <Download size={13} /> Download All
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  )
}
