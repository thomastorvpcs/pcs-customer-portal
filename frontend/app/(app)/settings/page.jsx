'use client'

import { useState } from 'react'
import { Building2, Users, SlidersHorizontal, Zap, Shield, CheckCircle, FileText, Mail, Truck, CreditCard, Headphones, Package, Eye, Copy, Trash2, Pencil, Plus } from 'lucide-react'

const navItems = [
  { key: 'company', label: 'Company', sub: 'Business details', icon: Building2 },
  { key: 'users', label: 'Users', sub: 'Team management', icon: Users },
  { key: 'preferences', label: 'Preferences', sub: 'Notifications, defaults', icon: SlidersHorizontal },
  { key: 'integrations', label: 'Integrations', sub: 'API, webhooks, ERP', icon: Zap },
  { key: 'security', label: 'Security', sub: 'Password, 2FA, sessions', icon: Shield },
]

const users = [
  { initials: 'JD', bg: 'bg-[#0b1b3a]', name: 'John Davis', email: 'john.davis@techmobile.com', role: 'Admin', status: 'Active', lastActive: 'Just now', isCurrentUser: true },
  { initials: 'SM', bg: 'bg-teal-700', name: 'Sarah Mitchell', email: 'sarah.mitchell@techmobile.com', role: 'Admin', status: 'Active', lastActive: '2 hours ago', isCurrentUser: false },
  { initials: 'MR', bg: 'bg-purple-500', name: 'Mike Rodriguez', email: 'm.ke.r@techmobile.com', role: 'Buyer', status: 'Active', lastActive: 'Yesterday', isCurrentUser: false },
  { initials: 'LC', bg: 'bg-indigo-500', name: 'Lisa Chen', email: 'lisa.chen@techmobile.com', role: 'Buyer', status: 'Active', lastActive: 'Mar 25, 2024', isCurrentUser: false },
  { initials: 'DP', bg: 'bg-emerald-500', name: 'David Park', email: 'david.park@techmobile.com', role: 'Buyer', status: 'Inactive', lastActive: 'Mar 10, 2024', isCurrentUser: false },
  { initials: 'AW', bg: 'bg-orange-400', name: 'Amy Wilson', email: 'amy.wilson@techmobile.com', role: 'Viewer', status: 'Active', lastActive: 'Mar 26, 2024', isCurrentUser: false },
]

const emailNotifications = [
  { key: 'orderConfirm', icon: Mail, label: 'Order Confirmations', sub: 'Receive email when orders are confirmed', defaultOn: true },
  { key: 'shipmentUpdates', icon: Truck, label: 'Shipment Updates', sub: 'Get notified when shipments status changes', defaultOn: true },
  { key: 'invoiceReminders', icon: FileText, label: 'Invoice Reminders', sub: 'Payment due date reminders and overdue notices', defaultOn: true },
  { key: 'supportTickets', icon: Headphones, label: 'Support Ticket Updates', sub: 'Responses and status changes to your tickets', defaultOn: false },
]

const smsNotifications = [
  { key: 'shipmentDelivered', icon: Package, label: 'Shipment Delivered', sub: 'Text alert when shipment is delivered', defaultOn: true },
  { key: 'paymentAlerts', icon: CreditCard, label: 'Payment Due Alerts', sub: 'Urgent reminders for past-due invoices', defaultOn: false },
]

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${on ? 'bg-[#0b1b3a]' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )
}

const roleStyles = {
  Admin: 'bg-orange-50 text-orange-600',
  Buyer: 'bg-blue-50 text-blue-600',
  Viewer: 'bg-gray-100 text-gray-500',
}

export default function SettingsPage() {
  const [active, setActive] = useState('company')
  const [toggles, setToggles] = useState(() => ({
    ...Object.fromEntries([...emailNotifications, ...smsNotifications].map((n) => [n.key, n.defaultOn])),
    authApp: true,
    smsVerify: false,
  }))

  return (
    <div className="flex-1 p-8 bg-[#f1f5f9]">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="flex gap-5">
        {/* Left Nav */}
        <div className="w-[220px] flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-2 self-start">
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

        {/* Company Panel */}
        {active === 'company' && (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-7 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Company Information</h2>
              <p className="text-sm text-gray-400 mt-1">Manage your business details and tax information</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Business Details</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Company Name</label>
                  <input defaultValue="TechMobile Distributors LLC" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Business Type</label>
                  <input defaultValue="Wholesale Reseller" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Business Address</label>
                <input defaultValue="4521 Commerce Way, Suite 200, Dallas, TX 75201" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone Number</label>
                  <input defaultValue="(214) 555-7890" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Email Address</label>
                  <input defaultValue="orders@techmobile.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Tax Information</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">EIN (Tax ID)</label>
                  <input defaultValue="82 1234567" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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

        {/* Users Panel */}
        {active === 'users' && (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-7">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                <p className="text-sm text-gray-400 mt-1">Manage team members and their access levels</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#112654] transition-colors">
                + Invite User
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 py-4 border-b border-gray-100 mb-2 text-sm text-gray-500">
              <span>Total Users: <strong className="text-gray-900">6</strong></span>
              <span>Admins: <strong className="text-gray-900">2</strong></span>
              <span>Buyers: <strong className="text-gray-900">3</strong></span>
              <span>Viewers: <strong className="text-gray-900">1</strong></span>
            </div>

            {/* Table */}
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['User', 'Role', 'Status', 'Last Active', 'Actions'].map((col) => (
                    <th key={col} className="py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pr-4">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.email} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${user.bg} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                          {user.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium ${roleStyles[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-sm text-gray-500">{user.lastActive}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                          Edit
                        </button>
                        {!user.isCurrentUser && (
                          <button className={`px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${
                            user.status === 'Inactive'
                              ? 'border-green-400 text-green-600 hover:bg-green-50'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}>
                            {user.status === 'Inactive' ? 'Activate' : 'Deactivate'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Role Permissions Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-4 flex-wrap">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Role Permissions:</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-600">Admin</span>
                <span className="text-xs text-gray-500">Full access, user management</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600">Buyer</span>
                <span className="text-xs text-gray-500">Create orders, view financial</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">Viewer</span>
                <span className="text-xs text-gray-500">Read-only access</span>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Panel */}
        {active === 'preferences' && (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-7 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
              <p className="text-sm text-gray-400 mt-1">Customize your notification and display settings</p>
            </div>

            {/* Email Notifications */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Email Notifications</h3>
              <p className="text-xs text-gray-400 mb-4">Choose which updates you'd like to receive via email</p>
              <div className="space-y-1">
                {emailNotifications.map(({ key, icon: Icon, label, sub }) => (
                  <div key={key} className="flex items-center justify-between py-4 border-b border-gray-50">
                    <div className="flex items-center gap-4">
                      <Icon size={16} className="text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                      </div>
                    </div>
                    <Toggle on={toggles[key]} onChange={(val) => setToggles((t) => ({ ...t, [key]: val }))} />
                  </div>
                ))}
              </div>
            </div>

            {/* SMS Notifications */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">SMS Notifications</h3>
              <p className="text-xs text-gray-400 mb-4">Get text messages for critical updates</p>
              <div className="space-y-1">
                {smsNotifications.map(({ key, icon: Icon, label, sub }) => (
                  <div key={key} className="flex items-center justify-between py-4 border-b border-gray-50">
                    <div className="flex items-center gap-4">
                      <Icon size={16} className="text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                      </div>
                    </div>
                    <Toggle on={toggles[key]} onChange={(val) => setToggles((t) => ({ ...t, [key]: val }))} />
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Settings */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Regional Settings</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Currency</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Timezone</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option>America/Chicago (CST)</option>
                    <option>America/New_York (EST)</option>
                    <option>America/Los_Angeles (PST)</option>
                    <option>America/Denver (MST)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Date Format</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Integrations Panel */}
        {active === 'integrations' && (
          <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-7 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Integrations</h2>
              <p className="text-sm text-gray-400 mt-1">Manage API keys, webhooks, and third-party connections</p>
            </div>

            {/* API Keys */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">API Keys</h3>
              <p className="text-xs text-gray-400 mb-4">Use API keys to authenticate requests to the PCS Wireless API</p>
              <div className="space-y-3">
                {[
                  { name: 'Production', key: 'pk_live_********************', created: 'Jan 15, 2024', active: true, label: 'Active' },
                  { name: 'Test / Sandbox', key: 'pk_test_********************', created: 'Jan 15, 2024', active: false, label: 'Test Mode' },
                ].map((k) => (
                  <div key={k.name} className="border border-gray-200 rounded-xl px-5 py-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-36 flex-shrink-0">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Key Name</p>
                        <p className="text-sm font-semibold text-gray-900">{k.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${k.active ? 'bg-green-500' : 'bg-orange-400'}`} />
                          <span className={`text-xs font-medium ${k.active ? 'text-green-600' : 'text-orange-500'}`}>{k.label}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">API Key</p>
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-sm font-mono text-gray-700 truncate">{k.key}</span>
                          <button className="text-gray-400 hover:text-gray-600 flex-shrink-0"><Eye size={14} /></button>
                          <button className="text-gray-400 hover:text-gray-600 flex-shrink-0"><Copy size={14} /></button>
                        </div>
                      </div>
                      <div className="w-32 flex-shrink-0">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Created</p>
                        <p className="text-sm text-gray-700">{k.created}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <button className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">Regenerate</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Webhooks */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-900">Webhooks</h3>
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#112654] transition-colors">
                  <Plus size={13} /> Add Webhook
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-4">Receive real-time notifications when events happen in your account</p>
              <div className="space-y-3">
                {[
                  { name: 'Order Status Updates', url: 'https://api.techmobile.com/webhooks/orders', tags: ['order.created', 'order.shipped'] },
                  { name: 'Invoice Notifications', url: 'https://api.techmobile.com/webhooks/billing', tags: ['invoice.email', 'invoice.paid'] },
                ].map((wh) => (
                  <div key={wh.name} className="border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 mb-0.5">{wh.name}</p>
                      <p className="text-xs text-gray-400 truncate">{wh.url}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {wh.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-xs font-medium text-green-600">Active</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"><Pencil size={13} /> Edit</button>
                      <button className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"><Trash2 size={13} /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ERP / WMS Integration */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">ERP / WMS Integration</h3>
              <p className="text-xs text-gray-400 mb-4">Connect your enterprise systems for automated data sync</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'SAP', sync: '5 minutes ago' },
                  { name: 'NetSuite', sync: '12 minutes ago' },
                ].map((erp) => (
                  <div key={erp.name} className="border border-gray-200 rounded-xl px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold text-gray-900">{erp.name}</p>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-600">Connected</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">Last sync: {erp.sync}</p>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">Configure</button>
                  </div>
                ))}
                <div className="border border-dashed border-gray-200 rounded-xl px-5 py-4 flex flex-col items-center justify-center gap-2 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <Zap size={20} className="text-gray-300" />
                  <p className="text-sm font-medium text-gray-500">Add Custom Integration</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Panel */}
        {active === 'security' && (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-7 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Security</h2>
              <p className="text-sm text-gray-400 mt-1">Manage your password, two-factor authentication, and active sessions</p>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-900">Password</h3>
                <span className="text-xs text-gray-400">Last changed: 40 days ago</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">Update your password to keep your account secure</p>
              <div className="space-y-3 max-w-md">
                <input type="password" placeholder="Current Password" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="password" placeholder="New Password" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="password" placeholder="Confirm New Password" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button className="mt-4 px-5 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#112654] transition-colors">
                Update Password
              </button>
            </div>

            {/* Two-Factor Authentication */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Two-Factor Authentication</h3>
              <p className="text-xs text-gray-400 mb-4">Add an extra layer of security to your account</p>
              <div className="space-y-1">
                {[
                  { key: 'authApp', icon: Shield, label: 'Authenticator App', sub: 'Use an app like Google Authenticator or Authy' },
                  { key: 'smsVerify', icon: Package, label: 'SMS Verification', sub: 'Receive codes via text message' },
                ].map(({ key, icon: Icon, label, sub }) => (
                  <div key={key} className="flex items-center justify-between py-4 border-b border-gray-50">
                    <div className="flex items-center gap-4">
                      <Icon size={16} className="text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                      </div>
                    </div>
                    <Toggle on={toggles[key] ?? (key === 'authApp')} onChange={(val) => setToggles((t) => ({ ...t, [key]: val }))} />
                  </div>
                ))}
              </div>
            </div>

            {/* Active Sessions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Active Sessions</h3>
              <p className="text-xs text-gray-400 mb-4">Manage and see where you're currently logged in</p>
              <div className="space-y-3">
                {[
                  { device: 'MacBook Pro - Chrome', location: 'Miami, FL, USA', current: true },
                  { device: 'iPhone 14 - Safari', location: 'Dallas, TX, USA', current: false },
                ].map((session) => (
                  <div key={session.device} className="border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Shield size={14} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900">{session.device}</p>
                          {session.current && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-600">Current</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{session.location}</p>
                      </div>
                    </div>
                    {!session.current && (
                      <button className="px-3 py-1.5 text-xs font-medium border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                        Revoke
                      </button>
                    )}
                    {session.current && (
                      <span className="text-xs text-gray-400">Active now</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {active !== 'company' && active !== 'users' && active !== 'preferences' && active !== 'integrations' && active !== 'security' && (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-7 flex items-center justify-center">
            <p className="text-sm text-gray-400">Select a section to manage settings</p>
          </div>
        )}
      </div>
    </div>
  )
}
