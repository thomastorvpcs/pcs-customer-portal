import Link from 'next/link'
import { AlertTriangle, ShoppingBag, Truck, DollarSign, TicketCheck, ChevronRight, FileText, RotateCcw, Headphones, Smartphone, CheckCircle, Package, Truck as TruckIcon } from 'lucide-react'

const stats = [
  { label: 'Open Orders', value: '12', sub: '$284,500', href: '/orders', icon: ShoppingBag, iconColor: 'text-blue-500' },
  { label: 'Pending Shipments', value: '8', sub: 'In Transit', href: '/shipments', icon: Truck, iconColor: 'text-teal-500' },
  { label: 'Outstanding Balance', value: '$47,230', sub: '$12,450 past due', subRed: true, href: '/financial', icon: DollarSign, iconColor: 'text-rose-500' },
  { label: 'Support Tickets', value: '3', sub: 'Open', href: '/support', icon: TicketCheck, iconColor: 'text-purple-500' },
]

const quickActions = [
  { label: 'Request Quote', desc: 'Get pricing for bulk orders', icon: FileText, bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-500' },
  { label: 'Create RMA', desc: 'Return defective devices', icon: RotateCcw, bg: 'bg-rose-50 dark:bg-rose-900/20', color: 'text-rose-500' },
  { label: 'Contact Support', desc: 'Get help from our team', icon: Headphones, bg: 'bg-orange-50 dark:bg-orange-900/20', color: 'text-orange-500' },
  { label: 'Device Lookup', desc: 'Check device availability', icon: Smartphone, bg: 'bg-green-50 dark:bg-green-900/20', color: 'text-green-500' },
]

const recentActivity = [
  { title: 'Order #PCS-2024-1847 shipped', desc: '500 units iPhone 13 Pro via FedEx Ground', time: '2 hours ago', dot: 'bg-teal-500', icon: TruckIcon, iconBg: 'bg-teal-500/20', iconColor: 'text-teal-400' },
  { title: 'Payment received - $32,750', desc: 'Applied to INV-8815', time: 'Yesterday', dot: 'bg-blue-500', icon: CheckCircle, iconBg: 'bg-green-500/20', iconColor: 'text-green-400' },
  { title: 'Invoice INV-8821 generated', desc: '$34,750.00 · Due April 15, 2024', time: '2 days ago', dot: 'bg-blue-500', icon: FileText, iconBg: 'bg-red-500/20', iconColor: 'text-red-400' },
  { title: 'Support ticket #4521 resolved', desc: 'Shipping address update completed', time: '3 days ago', dot: 'bg-purple-500', icon: Headphones, iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400' },
  { title: 'Shipment SHP-78429 delivered', desc: '250 units · Dallas, TX', time: '4 days ago', dot: 'bg-teal-500', icon: Package, iconBg: 'bg-teal-500/20', iconColor: 'text-teal-400' },
]

const mobileQuickActions = [
  { label: 'Quote', icon: FileText, bg: 'bg-blue-500/20', color: 'text-blue-400' },
  { label: 'RMA', icon: RotateCcw, bg: 'bg-rose-500/20', color: 'text-rose-400' },
  { label: 'Support', icon: Headphones, bg: 'bg-orange-500/20', color: 'text-orange-400' },
  { label: 'Lookup', icon: Smartphone, bg: 'bg-green-500/20', color: 'text-green-400' },
]

export default function DashboardPage() {
  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden min-h-screen bg-[#f1f5f9] dark:bg-[#0d1829] px-4 pt-6">
        {/* Greeting */}
        <div className="mb-5">
          <p className="text-sm text-gray-500 dark:text-blue-300/60">Good morning,</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">John Davis</h1>
        </div>

        {/* Stat Cards — horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 mb-5 scrollbar-none">
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="flex-shrink-0 w-36 bg-white dark:bg-[#152035] rounded-2xl p-4 block border border-gray-100 dark:border-white/5"
            >
              <s.icon size={18} className={`${s.iconColor} mb-3`} />
              <p className="text-xs text-gray-500 dark:text-blue-300/50 mb-1">{s.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{s.value}</p>
              <p className={`text-xs mt-0.5 ${s.subRed ? 'text-red-500 dark:text-red-400' : 'text-gray-400 dark:text-blue-300/50'}`}>{s.sub}</p>
            </Link>
          ))}
        </div>

        {/* Payment Overdue Alert */}
        <div className="bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-500/40 rounded-2xl px-4 py-3 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={15} className="text-red-500 dark:text-red-400 flex-shrink-0" />
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">Payment Overdue</p>
          </div>
          <p className="text-xs text-red-500 dark:text-red-300/70 mb-2">INV-8815 is 5 days past due</p>
          <button className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">Pay Now</button>
        </div>

        {/* Quick Actions */}
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3">
            {mobileQuickActions.map((a) => (
              <button key={a.label} className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 rounded-2xl ${a.bg} flex items-center justify-center`}>
                  <a.icon size={22} className={a.color} />
                </div>
                <span className="text-xs text-gray-500 dark:text-blue-200/60">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            <button className="text-xs text-blue-600 dark:text-blue-400">View All</button>
          </div>
          <div className="bg-white dark:bg-[#152035] rounded-2xl divide-y divide-gray-100 dark:divide-white/5 border border-gray-100 dark:border-white/5">
            {recentActivity.map((a) => (
              <div key={a.title} className="flex items-center gap-3 px-4 py-3">
                <div className={`w-9 h-9 rounded-xl ${a.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <a.icon size={16} className={a.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white font-medium truncate">{a.title}</p>
                  <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

        {/* Alert Banner */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg px-4 py-3 flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-300">
            <AlertTriangle size={15} className="text-yellow-500 flex-shrink-0" />
            <span>
              You have 2 invoices past due totaling <strong>$12,450.00</strong>. Please review your outstanding balance to avoid service interruption.
            </span>
          </div>
          <button className="text-sm font-medium text-yellow-700 dark:text-yellow-400 hover:text-yellow-900 ml-6 whitespace-nowrap">
            View now
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <Link key={s.label} href={s.href} className="bg-white dark:bg-[#152035] rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md transition-all block">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">{s.label}</p>
                <s.icon size={17} className={s.iconColor} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              {s.sub && (
                <p className={`text-xs mt-0.5 ${s.subRed ? 'text-red-500' : 'text-gray-400'}`}>{s.sub}</p>
              )}
            </Link>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="col-span-1 bg-white dark:bg-[#152035] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0`}>
                      <a.icon size={16} className={a.color} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{a.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-span-2 bg-white dark:bg-[#152035] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
              <a href="#" className="text-xs text-blue-600 hover:underline">View all</a>
            </div>
            <div className="space-y-5">
              {recentActivity.map((a) => (
                <div key={a.title} className="flex items-start gap-3">
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.dot}`}></span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
