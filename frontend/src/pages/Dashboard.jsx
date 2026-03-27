import { AlertTriangle, ShoppingBag, Truck, DollarSign, TicketCheck, ChevronRight, FileText, RotateCcw, Headphones, Smartphone } from 'lucide-react'

const stats = [
  {
    label: 'Open Orders',
    value: '12',
    sub: '$284,500',
    link: 'View all orders',
    icon: ShoppingBag,
    iconColor: 'text-blue-500',
  },
  {
    label: 'Pending Shipments',
    value: '8',
    sub: null,
    link: 'Track shipments',
    icon: Truck,
    iconColor: 'text-teal-500',
  },
  {
    label: 'Outstanding Balance',
    value: '$47,230',
    sub: '$15,450 past due',
    subRed: true,
    link: 'View invoices',
    icon: DollarSign,
    iconColor: 'text-rose-500',
  },
  {
    label: 'Support Tickets',
    value: '3',
    sub: null,
    link: 'View tickets',
    icon: TicketCheck,
    iconColor: 'text-purple-500',
  },
]

const quickActions = [
  { label: 'Request Quote', desc: 'Get pricing for bulk orders', icon: FileText, bg: 'bg-blue-50', color: 'text-blue-500' },
  { label: 'Create RMA', desc: 'Return defective devices', icon: RotateCcw, bg: 'bg-rose-50', color: 'text-rose-500' },
  { label: 'Contact Support', desc: 'Get help from our team', icon: Headphones, bg: 'bg-orange-50', color: 'text-orange-500' },
  { label: 'Device Lookup', desc: 'Check device availability', icon: Smartphone, bg: 'bg-green-50', color: 'text-green-500' },
]

const recentActivity = [
  {
    title: 'Order #PCS-2024-1847 shipped',
    desc: '500 units iPhone 13 Pro via FedEx Ground',
    time: '2 hours ago',
    dot: 'bg-teal-500',
  },
  {
    title: 'Invoice #INV-8834 generated',
    desc: '$24,750.00 · Due April 19, 2024',
    time: '4 hours ago',
    dot: 'bg-blue-500',
  },
  {
    title: 'Quote #QT-4421 awaiting approval',
    desc: '1,200 units Samsung Galaxy S23 · $106,000',
    time: 'Yesterday',
    dot: 'bg-yellow-500',
  },
  {
    title: 'Support ticket #TKT-2847 resolved',
    desc: 'Shipping address update completed',
    time: '2 days ago',
    dot: 'bg-purple-500',
  },
]

export default function Dashboard() {
  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Alert Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-yellow-800">
          <AlertTriangle size={15} className="text-yellow-500 flex-shrink-0" />
          <span>
            You have 2 invoices past due totaling{' '}
            <strong>$2,450.00</strong>. Please review your outstanding balance to avoid service
            interruption.
          </span>
        </div>
        <button className="text-sm font-medium text-yellow-700 hover:text-yellow-900 ml-6 whitespace-nowrap">
          View now
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                {s.label}
              </p>
              <s.icon size={17} className={s.iconColor} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            {s.sub && (
              <p className={`text-xs mt-0.5 ${s.subRed ? 'text-red-500' : 'text-gray-400'}`}>
                {s.sub}
              </p>
            )}
            <a href="#" className="text-xs text-blue-600 hover:underline mt-3 block">
              {s.link}
            </a>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0`}>
                    <a.icon size={16} className={a.color} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{a.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
            <a href="#" className="text-xs text-blue-600 hover:underline">
              View all
            </a>
          </div>
          <div className="space-y-5">
            {recentActivity.map((a) => (
              <div key={a.title} className="flex items-start gap-3">
                <span
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.dot}`}
                ></span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
