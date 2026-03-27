'use client'

import { useState } from 'react'
import { Building2, Users, SlidersHorizontal, Zap, Shield, CheckCircle, FileText } from 'lucide-react'

const navItems = [
  { key: 'company', label: 'Company', sub: 'Business details', icon: Building2 },
  { key: 'users', label: 'Users', sub: 'Team management', icon: Users },
  { key: 'preferences', label: 'Preferences', sub: 'Notifications, defaults', icon: SlidersHorizontal },
  { key: 'integrations', label: 'Integrations', sub: 'API, webhooks, ERP', icon: Zap },
  { key: 'security', label: 'Security', sub: 'Password, 2FA, sessions', icon: Shield },
]

export default function SettingsPage() {
  const [active, setActive] = useState('company')

  return (
    <div className="flex-1 p-8 bg-[#f1f5f9]">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="flex gap-5">
        {/* Left Nav */}
        <div className="w-[220px] flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-2">
          {navItems.map(({ key, label, sub, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                active === key ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <Icon size={16} className={active === key ? 'text-blue-600' : 'text-gray-400'} />
              <div>
                <p className={`text-sm font-medium ${active === key ? 'text-blue-700' : 'text-gray-800'}`}>{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right Panel */}
        {active === 'company' && (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-7 space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-xl font-bold text-gray-900">Company Information</h2>
              <p className="text-sm text-gray-400 mt-1">Manage your business details and tax information</p>
            </div>

            {/* Business Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Business Details</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Company Name</label>
                  <input
                    defaultValue="TechMobile Distributors LLC"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Business Type</label>
                  <input
                    defaultValue="Wholesale Reseller"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Business Address</label>
                <input
                  defaultValue="4521 Commerce Way, Suite 200, Dallas, TX 75201"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone Number</label>
                  <input
                    defaultValue="(214) 555-7890"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Email Address</label>
                  <input
                    defaultValue="orders@techmobile.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Tax Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Tax Information</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">EIN (Tax ID)</label>
                  <input
                    defaultValue="82 1234567"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Tax Exempt Status</label>
                  <div className="flex items-center gap-2 border border-green-200 bg-green-50 rounded-lg px-3 py-2.5">
                    <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-green-700">Tax Exempt Verified</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Tax Exemption Certificate</label>
                <div className="border border-gray-200 rounded-lg px-4 py-4 flex items-center justify-center gap-3">
                  <FileText size={18} className="text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">TX_Exemption_2024.pdf</p>
                    <p className="text-xs text-gray-400 mt-0.5">Uploaded Jan 15, 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Account Status</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-xl px-5 py-4">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Account ID</p>
                  <p className="text-lg font-bold text-gray-900">TM-2024-0482</p>
                </div>
                <div className="border border-gray-200 rounded-xl px-5 py-4">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Member Since</p>
                  <p className="text-lg font-bold text-gray-900">March 2019</p>
                </div>
                <div className="border border-blue-200 rounded-xl px-5 py-4">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Account Tier</p>
                  <p className="text-lg font-bold text-blue-700">Gold Partner</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {active !== 'company' && (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-7 flex items-center justify-center">
            <p className="text-sm text-gray-400">Select a section to manage settings</p>
          </div>
        )}
      </div>
    </div>
  )
}
