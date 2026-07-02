'use client'

import { useState } from 'react'
import {
  Zap, KeyRound, Copy, RefreshCw, Eye, EyeOff, Plus, Webhook,
  Server, CheckCircle, Puzzle, ShieldCheck,
} from 'lucide-react'

const apiKeys = [
  { id: 'prod', name: 'Production', prefix: 'pk_live', masked: 'pk_live_••••••••3f9a', full: 'pk_live_4a91c7e208b6d5f43f9a', created: 'Jan 15, 2026' },
  { id: 'test', name: 'Test', prefix: 'pk_test', masked: 'pk_test_••••••••8c21', full: 'pk_test_9f21ab77e4d0c6b28c21', created: 'Jan 15, 2026' },
]

const initialWebhooks = [
  { id: 'wh_1', url: 'https://api.techmobile.com/hooks/orders', events: ['order.created', 'order.shipped'], status: 'Active', last: '2 min ago' },
  { id: 'wh_2', url: 'https://erp.techmobile.com/hooks/billing', events: ['invoice.paid', 'invoice.overdue'], status: 'Failing', last: '3 hours ago' },
]

const recentDeliveries = [
  { id: 'd1', event: 'order.shipped', code: 200, time: '2 min ago' },
  { id: 'd2', event: 'order.created', code: 200, time: '18 min ago' },
  { id: 'd3', event: 'invoice.overdue', code: 500, time: '3 hours ago' },
  { id: 'd4', event: 'invoice.paid', code: 200, time: '5 hours ago' },
]

const eventOptions = ['order.created', 'order.shipped', 'order.cancelled', 'invoice.paid', 'invoice.overdue', 'shipment.delivered']

const erpSystems = [
  { id: 'sap', name: 'SAP', desc: 'ERP · Finance & Inventory', connected: true, lastSync: '5 minutes ago' },
  { id: 'netsuite', name: 'NetSuite', desc: 'ERP / WMS · Order Fulfillment', connected: false, lastSync: null },
]

const cardBase = 'bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm'
const cardBaseMobile = 'bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5'
const sectionTitle = 'text-sm font-semibold text-gray-900 dark:text-white'
const uppercaseLabel = 'text-[10px] font-semibold text-gray-400 uppercase tracking-wide'
const darkBtn = 'bg-[#0b1b3a] text-white hover:bg-[#0d2147]'

function AdminPill() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-yellow-50 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400">
      <ShieldCheck size={12} /> Admin only
    </span>
  )
}

function StatusBadge({ status }) {
  const active = status === 'Active'
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${
      active ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-500' : 'bg-red-500'}`} />
      {status}
    </span>
  )
}

function IntegrationsContent({ mobile }) {
  const [reveal, setReveal] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  const [newEvents, setNewEvents] = useState([])
  const [webhooks, setWebhooks] = useState(initialWebhooks)
  const [systems, setSystems] = useState(erpSystems)
  const [syncing, setSyncing] = useState(null)

  const cx = mobile ? cardBaseMobile : cardBase

  const toggleReveal = (id) => setReveal((r) => ({ ...r, [id]: !r[id] }))
  const toggleEvent = (ev) => setNewEvents((e) => (e.includes(ev) ? e.filter((x) => x !== ev) : [...e, ev]))

  const addEndpoint = () => {
    if (!newUrl.trim()) return
    setWebhooks((w) => [...w, { id: `wh_${w.length + 1}`, url: newUrl, events: newEvents.length ? newEvents : ['order.created'], status: 'Active', last: 'never' }])
    setNewUrl('')
    setNewEvents([])
    setShowForm(false)
  }

  const connect = (id) => setSystems((s) => s.map((sys) => (sys.id === id ? { ...sys, connected: true, lastSync: 'just now' } : sys)))
  const syncNow = (id) => {
    setSyncing(id)
    setTimeout(() => {
      setSystems((s) => s.map((sys) => (sys.id === id ? { ...sys, lastSync: 'just now' } : sys)))
      setSyncing(null)
    }, 900)
  }

  return (
    <div className={mobile ? 'space-y-4' : 'space-y-6 max-w-5xl'}>
      {/* API Keys */}
      <div className={`${cx} p-5`}>
        <div className="flex items-center gap-2 mb-1">
          <KeyRound size={16} className="text-yellow-600 dark:text-yellow-400" />
          <h2 className={sectionTitle}>API Keys</h2>
        </div>
        <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-4">Authenticate requests to the PCS Wireless API.</p>
        <div className="space-y-3">
          {apiKeys.map((k) => (
            <div key={k.id} className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3.5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="w-24 flex-shrink-0">
                  <p className={uppercaseLabel}>Key</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{k.name}</p>
                </div>
                <div className="flex-1 min-w-[180px]">
                  <p className={uppercaseLabel}>Secret</p>
                  <div className="flex items-center gap-2 mt-0.5 min-w-0">
                    <span className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate">{reveal[k.id] ? k.full : k.masked}</span>
                    <button onClick={() => toggleReveal(k.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0">
                      {reveal[k.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                <div className="hidden sm:block w-28 flex-shrink-0">
                  <p className={uppercaseLabel}>Created</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">{k.created}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                    <Copy size={12} /> Copy
                  </button>
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                    <RefreshCw size={12} /> Regenerate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setReveal((r) => ({ prod: !r.prod || !r.test, test: !r.prod || !r.test }))} className="mt-3 text-xs font-medium text-yellow-600 dark:text-yellow-400 hover:underline">
          {reveal.prod && reveal.test ? 'Hide all keys' : 'Reveal all keys'}
        </button>
      </div>

      {/* Webhooks */}
      <div className={`${cx} p-5`}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Webhook size={16} className="text-yellow-600 dark:text-yellow-400" />
            <h2 className={sectionTitle}>Webhooks</h2>
          </div>
          <button onClick={() => setShowForm((s) => !s)} className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${darkBtn}`}>
            <Plus size={14} /> Add Endpoint
          </button>
        </div>
        <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-4">Receive real-time event notifications at your endpoints.</p>

        {showForm && (
          <div className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-4 mb-4 bg-gray-50/50 dark:bg-[#1a2540]/40">
            <label className={`block ${uppercaseLabel} mb-1.5`}>Endpoint URL</label>
            <input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://api.example.com/hooks"
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 bg-white dark:bg-[#1e2d45] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <label className={`block ${uppercaseLabel} mb-2`}>Subscribe to events</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {eventOptions.map((ev) => (
                <label key={ev} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-colors ${
                  newEvents.includes(ev) ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'
                }`}>
                  <input type="checkbox" checked={newEvents.includes(ev)} onChange={() => toggleEvent(ev)} className="accent-blue-600 w-3 h-3" />
                  {ev}
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={addEndpoint} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${darkBtn}`}>Save Endpoint</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">Cancel</button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                {['Endpoint', 'Events', 'Status', 'Last delivery'].map((c) => (
                  <th key={c} className={`py-2.5 text-left ${uppercaseLabel} pr-4`}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {webhooks.map((wh) => (
                <tr key={wh.id}>
                  <td className="py-3 pr-4">
                    <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{wh.url}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-1">
                      {wh.events.map((ev) => (
                        <span key={ev} className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">{ev}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 pr-4"><StatusBadge status={wh.status} /></td>
                  <td className="py-3 text-sm text-gray-500 dark:text-gray-400">{wh.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className={`${uppercaseLabel} mb-2`}>Recent deliveries</p>
          <ul className="space-y-1.5">
            {recentDeliveries.map((d) => (
              <li key={d.id} className="flex items-center justify-between text-sm">
                <span className="font-mono text-gray-600 dark:text-gray-300">{d.event}</span>
                <div className="flex items-center gap-3">
                  <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                    d.code === 200 ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400'
                  }`}>{d.code}</span>
                  <span className="text-xs text-gray-400 dark:text-blue-300/50 w-20 text-right">{d.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ERP / WMS */}
      <div className={`${cx} p-5`}>
        <div className="flex items-center gap-2 mb-1">
          <Server size={16} className="text-yellow-600 dark:text-yellow-400" />
          <h2 className={sectionTitle}>ERP / WMS</h2>
        </div>
        <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-4">Sync inventory, orders, and fulfillment with your enterprise systems.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {systems.map((sys) => (
            <div key={sys.id} className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{sys.name}</p>
                {sys.connected ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle size={11} /> Connected
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">Not connected</span>
                )}
              </div>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-3">{sys.desc}</p>
              {sys.connected ? (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {syncing === sys.id ? 'Syncing…' : `Last sync: ${sys.lastSync}`}
                  </span>
                  <button onClick={() => syncNow(sys.id)} disabled={syncing === sys.id} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors disabled:opacity-50">
                    <RefreshCw size={12} className={syncing === sys.id ? 'animate-spin' : ''} /> Sync now
                  </button>
                </div>
              ) : (
                <button onClick={() => connect(sys.id)} className={`w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${darkBtn}`}>Connect</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom integrations */}
      <div className={`${cx} p-5`}>
        <div className="flex items-center gap-2 mb-1">
          <Puzzle size={16} className="text-yellow-600 dark:text-yellow-400" />
          <h2 className={sectionTitle}>Custom integrations</h2>
        </div>
        <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-4">Build a bespoke connection to any internal or third-party service.</p>
        <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-xl px-6 py-10 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#1e2d45] flex items-center justify-center mb-3">
            <Puzzle size={22} className="text-gray-300 dark:text-gray-500" />
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">No custom integrations yet</p>
          <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-4 mt-1">Connect a custom endpoint to extend the portal.</p>
          <button className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${darkBtn}`}>
            <Plus size={14} /> Add integration
          </button>
        </div>
      </div>
    </div>
  )
}

export default function IntegrationsPage() {
  return (
    <>
      {/* MOBILE */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] px-4 pt-5 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Integrations</h1>
          <AdminPill />
        </div>
        <p className="text-sm text-gray-400 dark:text-blue-300/50 mb-5">Connect the portal to your systems</p>
        <IntegrationsContent mobile />
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block flex-1 md:p-4 xl:p-8 bg-[#f1f5f9] dark:bg-[#0d1829]">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-yellow-50 dark:bg-yellow-400/10 flex items-center justify-center">
            <Zap size={18} className="text-yellow-600 dark:text-yellow-400" />
          </div>
          <h1 className="text-xl xl:text-2xl font-bold text-gray-900 dark:text-white">Integrations</h1>
          <AdminPill />
        </div>
        <p className="text-sm text-gray-400 dark:text-blue-300/50 mb-6 ml-12">Connect the portal to your systems</p>
        <IntegrationsContent />
      </div>
    </>
  )
}
