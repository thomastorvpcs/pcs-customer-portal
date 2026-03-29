'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu, X, LayoutDashboard, ShoppingCart, Truck, BarChart2,
  Headphones, Settings, FileText, RotateCcw, Smartphone, Bell,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/shipments', label: 'Shipments', icon: Truck },
  { href: '/financial', label: 'Financial', icon: BarChart2 },
  { href: '/support', label: 'Support', icon: Headphones },
  { href: '/settings', label: 'Settings', icon: Settings },
]

const bottomItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/shipments', label: 'Shipments', icon: Truck },
  { href: '/financial', label: 'Financial', icon: BarChart2 },
  { href: '/support', label: 'Support', icon: Headphones },
]

const quickActions = [
  { label: 'Request Quote', icon: FileText },
  { label: 'Create RMA', icon: RotateCcw },
  { label: 'Device Lookup', icon: Smartphone },
]

export default function MobileNav() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0b1b3a] border-b border-white/10 sticky top-0 z-30 flex-shrink-0">
        <button onClick={() => setDrawerOpen(true)} className="text-white p-1">
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-end gap-0.5">
            <span className="w-1.5 h-3 rounded-sm bg-blue-400 opacity-60" />
            <span className="w-1.5 h-4 rounded-sm bg-blue-300 opacity-80" />
            <span className="w-1.5 h-2 rounded-sm bg-blue-400 opacity-60" />
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-100">pcs wireless</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-white/60 p-1"><Bell size={18} /></button>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">JD</div>
        </div>
      </header>

      {/* Drawer Overlay */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[270px] bg-[#0d1829] z-50 md:hidden flex flex-col transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-0.5">
              <span className="w-1.5 h-3 rounded-sm bg-blue-400 opacity-60" />
              <span className="w-1.5 h-4 rounded-sm bg-blue-300 opacity-80" />
              <span className="w-1.5 h-2 rounded-sm bg-blue-400 opacity-60" />
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-100">pcs wireless</span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="px-3 py-4 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-yellow-400/15 text-yellow-400 font-medium'
                    : 'text-blue-200/60 hover:bg-white/5 hover:text-blue-100'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-yellow-400' : ''} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Quick Actions */}
        <div className="px-3 pt-2 pb-4 border-t border-white/10">
          <p className="text-[10px] text-blue-300/50 uppercase tracking-widest mb-3 px-3 mt-4">Quick Actions</p>
          {quickActions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-blue-200/60 hover:bg-white/5 hover:text-blue-100 transition-colors text-left"
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Sales Rep */}
        <div className="mt-auto px-5 py-5 border-t border-white/10">
          <p className="text-[10px] text-blue-300/50 uppercase tracking-widest mb-3">Your Sales Rep</p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">MT</div>
            <div>
              <p className="text-sm font-semibold text-white">Michael Torres</p>
              <p className="text-xs text-blue-300/50">m.torres@pcsww.com</p>
            </div>
          </div>
          <button className="mt-2 text-xs text-yellow-400 hover:text-yellow-300 transition-colors">Contact</button>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0b1b3a] border-t border-white/10 flex z-40">
        {bottomItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors ${isActive ? 'text-yellow-400' : 'text-blue-200/40'}`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
