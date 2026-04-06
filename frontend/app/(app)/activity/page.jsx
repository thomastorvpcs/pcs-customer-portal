'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, CheckCircle2, Package, CreditCard, AlertTriangle, FileText, MessageSquare, Calendar } from 'lucide-react'

const stats = [
  { label: "Today's Activities", value: '24', sub: '+8 from yesterday', subColor: 'text-green-500' },
  { label: 'This Week', value: '156', sub: 'Last 7 days', subColor: 'text-gray-400 dark:text-blue-300/50' },
  { label: 'Pending Actions', value: '5', sub: 'Requires attention', subColor: 'text-orange-500', valueColor: 'text-orange-500' },
  { label: 'Team Members', value: '8', sub: 'Active now', subColor: 'text-gray-400 dark:text-blue-300/50' },
]

const mobileStats = [
  { label: 'Today', value: '24', sub: '+8', subColor: 'text-green-500' },
  { label: 'This Week', value: '156', sub: 'Last 7 days', subColor: 'text-gray-400 dark:text-blue-300/50' },
  { label: 'Pending', value: '5', sub: '●', subColor: 'text-orange-500', valueColor: 'text-orange-500' },
  { label: 'Team Active', value: '8', sub: '', subColor: '' },
]

const desktopTabs = ['All', 'Orders', 'Shipments', 'Payments', 'Support']
const mobileTabs = ['All', 'Orders', 'Shipments', 'Payments']

const activities = [
  {
    group: 'Today',
    date: 'Mar 29',
    items: [
      {
        id: 'ORD-2024-4521',
        title: 'Order #ORD-2024-4521 has been confirmed',
        mobileTitle: 'Order #ORD-4521 confirmed',
        desc: '150 units iPhone 14 Pro Max · Total: $127,500.00',
        mobileDesc: '150 units · $127,500',
        time: '2:34 PM',
        icon: CheckCircle2,
        iconBg: 'bg-green-50 dark:bg-green-500/20',
        iconColor: 'text-green-500',
        category: 'Orders',
        action: null,
        href: '/orders',
      },
      {
        id: 'SHP-8834',
        title: 'Shipment #SHP-8834 is out for delivery',
        mobileTitle: 'Shipment #SHP-8834 out',
        desc: 'Estimated arrival: Today by 5:00 PM · FedEx Ground',
        mobileDesc: 'Arriving today by 5 PM',
        time: '11:15 AM',
        icon: Package,
        iconBg: 'bg-blue-50 dark:bg-blue-500/20',
        iconColor: 'text-blue-500',
        category: 'Shipments',
        action: null,
        href: '/shipments',
      },
      {
        id: 'INV-8821',
        title: 'Payment received for Invoice #INV-8821',
        mobileTitle: null,
        desc: 'Amount: $45,200.00 · ACH Transfer',
        mobileDesc: 'Amount: $45,200.00 · ACH',
        time: '9:42 AM',
        icon: CreditCard,
        iconBg: 'bg-teal-50 dark:bg-teal-500/20',
        iconColor: 'text-teal-500',
        category: 'Payments',
        action: null,
        href: '/financial',
      },
      {
        id: 'RMA-4525',
        title: 'RMA #RMA-4525 requires approval',
        mobileTitle: 'RMA #RMA-4525 needs approval',
        desc: '25 units returned · Reason: Defective screen',
        mobileDesc: '25 units · Defective screen',
        time: null,
        icon: AlertTriangle,
        iconBg: 'bg-red-50 dark:bg-red-500/20',
        iconColor: 'text-red-500',
        category: 'Support',
        action: 'Action Needed',
        href: '/support',
      },
    ],
  },
  {
    group: 'Yesterday',
    date: 'Mar 28',
    items: [
      {
        id: 'SHP-8830',
        title: 'Shipment #SHP-8830 delivered successfully',
        mobileTitle: 'Shipment #SHP-8830 delivered',
        desc: 'Signed by: John Martinez · 200 units Galaxy S24',
        mobileDesc: '200 units Galaxy S24',
        time: '4:18 PM',
        icon: CheckCircle2,
        iconBg: 'bg-green-50 dark:bg-green-500/20',
        iconColor: 'text-green-500',
        category: 'Shipments',
        action: null,
        href: '/shipments',
      },
      {
        id: 'CM-2024-0156',
        title: 'Credit memo #CM-2024-0156 applied to account',
        mobileTitle: null,
        desc: 'Amount: $4,250.00 · Applied to INV-8834',
        mobileDesc: '$4,250.00 · INV-8834',
        time: '2:05 PM',
        icon: FileText,
        iconBg: 'bg-gray-100 dark:bg-gray-500/20',
        iconColor: 'text-gray-500',
        category: 'Payments',
        action: null,
        href: '/financial',
      },
      {
        id: 'TKT-1892',
        title: 'Support ticket #TKT-1892 resolved',
        mobileTitle: null,
        desc: 'Issue: Tracking number not updating · Resolved by Agent',
        mobileDesc: 'Tracking number not updating',
        time: '10:30 AM',
        icon: MessageSquare,
        iconBg: 'bg-purple-50 dark:bg-purple-500/20',
        iconColor: 'text-purple-500',
        category: 'Support',
        action: null,
        href: '/support',
      },
    ],
  },
]

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [mobileTab, setMobileTab] = useState('All')

  const filterItems = (items, tab) => tab === 'All' ? items : items.filter(i => i.category === tab)
  const filterGroups = (tab) => activities
    .map(g => ({ ...g, items: filterItems(g.items, tab) }))
    .filter(g => g.items.length > 0)

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] pb-4">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-5 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activities</h1>
          <div className="flex items-center gap-3">
            <Search size={18} className="text-gray-400 dark:text-blue-300/50" />
            <SlidersHorizontal size={18} className="text-gray-400 dark:text-blue-300/50" />
          </div>
        </div>

        {/* Stat Cards — 2x2 grid */}
        <div className="grid grid-cols-2 gap-3 px-4 mb-4">
          {mobileStats.map((s) => (
            <div key={s.label} className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
              <p className="text-xs text-gray-500 dark:text-blue-300/50 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.valueColor || 'text-gray-900 dark:text-white'}`}>{s.value}</p>
              {s.sub && <p className={`text-xs mt-0.5 font-medium ${s.subColor}`}>{s.sub}</p>}
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-4 mb-4 overflow-x-auto scrollbar-none">
          {mobileTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                mobileTab === tab
                  ? 'bg-[#0b1b3a] dark:bg-blue-600 text-white'
                  : 'text-gray-500 dark:text-blue-300/50 border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Activity Groups */}
        <div className="px-4 space-y-4">
          {filterGroups(mobileTab).map((group) => (
            <div key={group.group}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-500 dark:text-blue-300/50">{group.group}</p>
                <p className="text-xs text-gray-400 dark:text-blue-300/40">{group.date}</p>
              </div>
              <div className="bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 divide-y divide-gray-50 dark:divide-white/5">
                {group.items.map((item) => (
                  <Link key={item.id} href={item.href} className="flex items-start gap-3 px-4 py-3">
                    <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <item.icon size={16} className={item.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                          {item.mobileTitle || item.title}
                        </p>
                        {item.time && <span className="text-xs text-gray-400 dark:text-blue-300/40 flex-shrink-0">{item.time}</span>}
                      </div>
                      <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-0.5">{item.mobileDesc}</p>
                      {item.action && (
                        <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-red-500 text-white">
                          Action
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="px-4 mt-4">
          <button className="w-full py-3 text-sm font-medium border border-gray-200 dark:border-white/10 rounded-xl text-gray-600 dark:text-gray-300 bg-white dark:bg-[#152035]">
            Load More
          </button>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block flex-1 p-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white dark:bg-[#152035] rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium mb-2">{s.label}</p>
              <p className={`text-2xl font-bold ${s.valueColor || 'text-gray-900 dark:text-white'}`}>{s.value}</p>
              <p className={`text-xs mt-0.5 ${s.subColor}`}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Main Panel */}
        <div className="bg-white dark:bg-[#152035] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-700">
            <div className="flex gap-1">
              {desktopTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-[#0b1b3a] dark:bg-blue-600 text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1a2540]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
              <Calendar size={14} /> Last 7 days
            </button>
          </div>

          {/* Activity Groups */}
          <div className="divide-y divide-gray-50 dark:divide-gray-700">
            {filterGroups(activeTab).map((group) => (
              <div key={group.group}>
                <div className="flex items-center justify-between px-5 py-3 bg-gray-50/60 dark:bg-[#1a2540]/40">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{group.group}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{group.date}</p>
                </div>
                {group.items.map((item) => (
                  <Link key={item.id} href={item.href} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 dark:hover:bg-[#1a2540] transition-colors">
                    <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <item.icon size={18} className={item.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {item.action && (
                        <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-red-500 text-white">
                          Action Needed
                        </span>
                      )}
                      {item.time && <span className="text-sm text-gray-400 dark:text-gray-500 w-16 text-right">{item.time}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-400 dark:text-gray-500">Showing 7 of 156 activities</p>
            <button className="px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
