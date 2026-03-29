'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, Truck, BarChart2, Activity, Headphones, Settings } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/shipments', label: 'Shipments', icon: Truck },
  { href: '/financial', label: 'Financial', icon: BarChart2 },
  { href: '/activity', label: 'Recent Activities', icon: Activity },
  { href: '/support', label: 'Support', icon: Headphones },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-44 h-full bg-white dark:bg-[#0b1b3a] border-r border-gray-200 dark:border-white/10 hidden md:flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-6">
        <Image src="/Logo.png" alt="PCS Wireless" width={120} height={36} className="object-contain" priority />
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
                  ? 'bg-yellow-400/15 text-yellow-600 dark:text-yellow-400 font-medium'
                  : 'text-gray-500 dark:text-blue-200/60 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-blue-100'
              }`}
            >
              <Icon size={15} className={isActive ? 'text-yellow-600 dark:text-yellow-400' : ''} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Sales Rep */}
      <div className="px-5 py-5 border-t border-gray-200 dark:border-white/10">
        <p className="text-[10px] text-gray-400 dark:text-blue-300/50 uppercase tracking-widest mb-2">Your Sales Rep</p>
        <p className="text-sm font-semibold text-gray-800 dark:text-white">Michael Torres</p>
        <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-0.5">m.torres@pcsww.com</p>
        <button className="mt-2 text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors">
          Contact
        </button>
      </div>
    </div>
  )
}
