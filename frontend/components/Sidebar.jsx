'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, Truck, BarChart2, Headphones, Settings } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/shipments', label: 'Shipments', icon: Truck },
  { href: '/financial', label: 'Financial', icon: BarChart2 },
  { href: '/support', label: 'Support', icon: Headphones },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-44 h-full bg-[#0b1b3a] flex flex-col text-white flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-6">
        <div className="flex items-center gap-2">
          <div className="flex items-end gap-0.5">
            <span className="w-1.5 h-3 rounded-sm bg-blue-400 opacity-60"></span>
            <span className="w-1.5 h-4 rounded-sm bg-blue-300 opacity-80"></span>
            <span className="w-1.5 h-2 rounded-sm bg-blue-400 opacity-60"></span>
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-100">
            pcs wireless
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-blue-200/60 hover:bg-white/5 hover:text-blue-100'
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Sales Rep */}
      <div className="px-5 py-5 border-t border-white/10">
        <p className="text-[10px] text-blue-300/50 uppercase tracking-widest mb-2">Your Sales Rep</p>
        <p className="text-sm font-semibold text-white">Michael Torres</p>
        <p className="text-xs text-blue-300/50 mt-0.5">m.torres@pcsww.com</p>
        <button className="mt-2 text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
          Contact
        </button>
      </div>
    </div>
  )
}
