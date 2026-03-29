'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Download, CheckCircle2, Circle, Truck, FileText, Package, ArrowLeft } from 'lucide-react'

const shipments = [
  { id: 'SHP-78432', order: 'PCS-2024-1847', carrier: 'FedEx Freight', status: 'In Transit', eta: 'Mar 28' },
  { id: 'SHP-78431', order: 'PCS-2024-1845', carrier: 'UPS Ground', status: 'Delivered', eta: 'Mar 25' },
  { id: 'SHP-78430', order: 'PCS-2024-1843', carrier: 'FedEx Ground', status: 'Delivered', eta: 'Mar 23' },
  { id: 'SHP-78429', order: 'PCS-2024-1842', carrier: 'FedEx Freight', status: 'In Transit', eta: 'Mar 27' },
  { id: 'SHP-78428', order: 'PCS-2024-1840', carrier: 'Customer Pickup', status: 'Pickup Ready', eta: 'Mar 26' },
  { id: 'SHP-78427', order: 'PCS-2024-1838', carrier: 'UPS Freight', status: 'Exception', eta: 'Delayed' },
]

const statusStyles = {
  'In Transit': 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  'Delivered': 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  'Pickup Ready': 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  'Exception': 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
}

const mobileStatusStyles = {
  'In Transit': 'bg-blue-500/15 text-blue-400',
  'Delivered': 'bg-green-500/15 text-green-400',
  'Pickup Ready': 'bg-orange-500/15 text-orange-400',
  'Exception': 'bg-red-500/15 text-red-400',
}

const tabs = ['All', 'In Transit', 'Delivered', 'Exception', 'Pickup']

const trackingSteps = [
  { label: 'Label Created', date: 'Mar 25', done: true },
  { label: 'Picked Up', date: 'Mar 26', done: true },
  { label: 'In Transit', date: 'Now', done: true, active: true },
  { label: 'Out for Delivery', date: 'Mar 28', done: false },
  { label: 'Delivered', date: 'ETA Mar 28', done: false },
]

export default function ShipmentsPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [selected, setSelected] = useState(shipments[0])
  const [mobileSelected, setMobileSelected] = useState(null)

  const filtered = activeTab === 'All' ? shipments : shipments.filter((s) => {
    if (activeTab === 'Pickup') return s.status === 'Pickup Ready'
    return s.status === activeTab
  })

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden min-h-screen bg-[#f1f5f9] dark:bg-[#0d1829] pb-4">
        {mobileSelected ? (
          /* Detail View */
          <div>
            <div className="flex items-center gap-3 px-4 pt-5 pb-4">
              <button onClick={() => setMobileSelected(null)} className="text-blue-500">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">{mobileSelected.id}</h1>
              <span className={`ml-auto px-2.5 py-1 rounded-full text-xs font-medium ${mobileStatusStyles[mobileSelected.status]}`}>
                {mobileSelected.status}
              </span>
            </div>

            <div className="px-4 space-y-4">
              {/* Carrier info */}
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <p className="text-xs text-gray-400 mb-1">Order</p>
                <p className="text-sm font-semibold text-blue-600 mb-3">{mobileSelected.order}</p>
                <p className="text-xs text-gray-400 mb-1">Carrier</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{mobileSelected.carrier}</p>
                <p className="text-xs text-gray-400 mb-1">ETA</p>
                <p className={`text-sm font-semibold ${mobileSelected.status === 'Exception' ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{mobileSelected.eta}</p>
              </div>

              {/* Tracking Timeline */}
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Tracking Timeline</h3>
                <div className="flex items-start">
                  {trackingSteps.map((step, i) => (
                    <div key={step.label} className="flex items-start flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className="flex items-center w-full">
                          {i > 0 && <div className={`flex-1 h-0.5 -mr-1 ${!step.done ? 'bg-gray-200 dark:bg-gray-600' : trackingSteps[i - 1].done && !trackingSteps[i - 1].active ? 'bg-green-400' : 'bg-blue-400'}`} />}
                          <div className="flex-shrink-0 z-10">
                            {step.done ? (
                              <CheckCircle2 size={20} className={step.active ? 'text-blue-500' : 'text-green-500'} fill={step.active ? '#eff6ff' : '#f0fdf4'} />
                            ) : (
                              <Circle size={20} className="text-gray-300 dark:text-gray-600" fill="white" />
                            )}
                          </div>
                          {i < trackingSteps.length - 1 && <div className={`flex-1 h-0.5 -ml-1 ${step.done && !step.active ? 'bg-green-400' : step.active ? 'bg-blue-400' : 'bg-gray-200 dark:bg-gray-600'}`} />}
                        </div>
                        <p className={`text-[9px] font-medium mt-1.5 text-center leading-tight ${step.active ? 'text-blue-600' : step.done ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>{step.label}</p>
                        <p className="text-[8px] text-gray-400 mt-0.5">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl px-3 py-2.5 flex items-start gap-2">
                  <Truck size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-200">Departed FedEx location - Memphis, TN</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Mar 26, 2024 at 8:42 PM</p>
                  </div>
                </div>
              </div>

              {/* Shipment Details */}
              <div className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Shipment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Ship From', value: 'PCS Wireless – Miami, FL' },
                    { label: 'Ship To', value: 'Wireless Depot – Dallas, TX' },
                    { label: 'Weight', value: '2,450 lbs / 4 pallets' },
                    { label: 'Items', value: '500 devices' },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="text-xs text-gray-800 dark:text-gray-200 font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-[#152035]">
                  <FileText size={14} /> BOL
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-[#152035]">
                  <Package size={14} /> Packing List
                </button>
                <button className="flex-1 py-3 text-sm font-medium bg-[#0b1b3a] text-white rounded-xl">
                  Track
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <>
            <div className="flex items-center justify-between px-4 pt-5 pb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shipments</h1>
              <button className="text-gray-500 dark:text-gray-400"><SlidersHorizontal size={18} /></button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-white dark:bg-[#152035] rounded-xl mx-4 px-4 py-3 mb-4 border border-gray-100 dark:border-white/5">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input placeholder="Search by tracking number..." className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none" />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto px-4 pb-2 mb-4 scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab ? 'bg-[#0b1b3a] text-white' : 'bg-white dark:bg-[#152035] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Shipment Cards */}
            <div className="px-4 space-y-3">
              {filtered.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setMobileSelected(s)}
                  className="w-full text-left bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{s.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.order}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${mobileStatusStyles[s.status]}`}>{s.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.carrier}</p>
                    <p className={`text-xs font-semibold ${s.status === 'Exception' ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>ETA: {s.eta}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shipments</h1>

        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input placeholder="Search by tracking number..." className="pl-8 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg w-80 bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#152035] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">
              <SlidersHorizontal size={14} /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#152035] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        <div className="flex gap-1 mb-4">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab ? 'bg-[#0b1b3a] text-white' : 'bg-white dark:bg-[#152035] border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <div className="w-[380px] flex-shrink-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  {['Shipment', 'Status', 'ETA'].map((col) => (
                    <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                {filtered.map((s) => (
                  <tr key={s.id} onClick={() => setSelected(s)} className={`cursor-pointer transition-colors ${selected?.id === s.id ? 'bg-blue-50/60 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-[#1a2540]'}`}>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.order}</p>
                      <p className="text-xs text-gray-400">{s.carrier}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusStyles[s.status]}`}>{s.status}</span>
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium ${s.status === 'Exception' ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>{s.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <span className="text-xs text-gray-400">Showing 1–6 of 24</span>
              <button className="text-xs text-blue-600 hover:underline font-medium">Next</button>
            </div>
          </div>

          {selected && (
            <div className="flex-1 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{selected.id}</h2>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[selected.status]}`}>{selected.status}</span>
                </div>
                <p className="text-xs text-gray-400">Order: {selected.order} &nbsp;|&nbsp; {selected.carrier} &nbsp;|&nbsp; 12399AA1C123456784</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Tracking Timeline</h3>
                <div className="flex items-start">
                  {trackingSteps.map((step, i) => (
                    <div key={step.label} className="flex items-start flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className="flex items-center w-full">
                          {i > 0 && <div className={`flex-1 h-0.5 -mr-1 ${!step.done ? 'bg-gray-200 dark:bg-gray-600' : trackingSteps[i - 1].done && !trackingSteps[i - 1].active ? 'bg-green-400' : 'bg-blue-400'}`} />}
                          <div className="flex-shrink-0 z-10">
                            {step.done ? (
                              <CheckCircle2 size={24} className={step.active ? 'text-blue-500' : 'text-green-500'} fill={step.active ? '#eff6ff' : '#f0fdf4'} />
                            ) : (
                              <Circle size={24} className="text-gray-300 dark:text-gray-600" fill="white" />
                            )}
                          </div>
                          {i < trackingSteps.length - 1 && <div className={`flex-1 h-0.5 -ml-1 ${step.done && !step.active ? 'bg-green-400' : step.active ? 'bg-blue-400' : 'bg-gray-200 dark:bg-gray-600'}`} />}
                        </div>
                        <p className={`text-xs font-medium mt-2 text-center ${step.active ? 'text-blue-600' : step.done ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>{step.label}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg px-4 py-3 flex items-start gap-3">
                  <Truck size={15} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Departed FedEx location - Memphis, TN</p>
                    <p className="text-xs text-gray-400 mt-0.5">Mar 26, 2024 at 8:42 PM</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Shipment Details</h3>
                <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                  {[
                    { label: 'Ship From', value: 'PCS Wireless – Miami, FL', sub: '33122' },
                    { label: 'Ship To', value: 'Wireless Depot – Dallas, TX', sub: '75201' },
                    { label: 'Weight', value: '2,450 lbs', sub: '4 pallets' },
                    { label: 'Items', value: '500 devices', sub: 'iPhone 13 Pro, Galaxy S22' },
                    { label: 'Ship Date', value: 'Mar 25, 2024' },
                    { label: 'Service', value: 'FedEx Freight Priority' },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{item.value}</p>
                      {item.sub && <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {[{ label: 'BOL', icon: FileText }, { label: 'Packing List', icon: Package }].map(({ label, icon: Icon }) => (
                  <button key={label} className="flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                    <Icon size={14} />{label}
                  </button>
                ))}
                <button className="px-4 py-2 text-sm font-medium bg-white dark:bg-[#1e2d45] border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">View Order</button>
                <button className="px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#112654] transition-colors">Track on Carrier</button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Pickup Authorization</p>
                  <p className="text-xs text-gray-400 mt-0.5">Register drivers for customer pickup shipments</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium border border-orange-300 text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">Manage Pickups</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
