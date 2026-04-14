'use client'

import { useState } from 'react'
import { RefreshCw, Paperclip, Send, ArrowLeft } from 'lucide-react'

const tickets = [
  { id: 'TKT-2024-0882', priority: 'Urgent', title: 'Missing devices in shipment', category: 'Order Issue', updated: 'Updated 2 hours ago', status: 'Open' },
  { id: 'TKT-2024-0889', priority: 'In Progress', title: 'RMA status inquiry', category: 'RMA', updated: 'Updated 1 day ago', status: 'In Progress' },
  { id: 'TKT-2024-0865', priority: 'Waiting', title: 'Invoice discrepancy', category: 'Billing', updated: 'Updated 3 days ago', status: 'Waiting' },
  { id: 'TKT-2024-0878', priority: 'Resolved', title: 'Certificate of conformity request', category: 'Certificate', updated: 'Resolved 5 days ago', status: 'Resolved' },
  { id: 'TKT-2024-0871', priority: 'Resolved', title: 'Quote revision needed', category: 'Quote', updated: 'Resolved 1 week ago', status: 'Resolved' },
]

const priorityStyles = {
  Urgent: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  'In Progress': 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  Waiting: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  Resolved: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
}

const mobilePriorityStyles = {
  Urgent: 'bg-red-500/15 text-red-400',
  'In Progress': 'bg-blue-500/15 text-blue-400',
  Waiting: 'bg-yellow-500/15 text-yellow-400',
  Resolved: 'bg-green-500/15 text-green-400',
}

const conversation = [
  { name: 'John Davis', role: 'Customer', time: 'Mar 25, 10:42 AM', message: 'We received shipment SHP-2024-1523 today but the count is off. We ordered 500 iPhone 12 units but only received 485. Can you please investigate and send the missing 15 units?', initials: 'JD', bg: 'bg-[#0b1b3a]' },
  { name: 'Sarah Thompson', role: 'Order Support', time: 'Mar 25, 2:15 PM', message: "Hi John, thank you for reaching out. I'm sorry to hear about the discrepancy. I've checked our shipping manifest and it shows 500 units were packed. I've escalated this to our warehouse team to review the packing footage. We'll have an update for you within 24 hours.", initials: 'ST', bg: 'bg-orange-400' },
  { name: 'Sarah Thompson', role: 'Order Support', time: 'Today, 9:30 AM', message: "Update: We've confirmed the shortage. The 15 missing units will be shipped today via overnight delivery at no extra charge. You'll receive tracking info shortly. Apologies for the inconvenience.", initials: 'ST', bg: 'bg-orange-400' },
]

export default function SupportPage() {
  const [selected, setSelected] = useState(tickets[0])
  const [mobileSelected, setMobileSelected] = useState(null)
  const [reply, setReply] = useState('')

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] pb-4">
        {mobileSelected ? (
          /* Ticket Detail */
          <div>
            <div className="flex items-center gap-3 px-4 pt-5 pb-4">
              <button onClick={() => setMobileSelected(null)} className="text-blue-500">
                <ArrowLeft size={20} />
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{mobileSelected.title}</p>
                <p className="text-xs text-gray-400">{mobileSelected.id}</p>
              </div>
              <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium ${mobilePriorityStyles[mobileSelected.priority]}`}>
                {mobileSelected.priority}
              </span>
            </div>

            {/* Conversation */}
            <div className="px-4 space-y-3 mb-4">
              {conversation.map((msg, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${msg.bg} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                    {msg.initials}
                  </div>
                  <div className="flex-1 bg-white dark:bg-[#152035] rounded-2xl px-4 py-3 border border-gray-100 dark:border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">{msg.name}</span>
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="px-4">
              <div className="bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 p-3">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your message..."
                  rows={3}
                  className="w-full bg-transparent text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none resize-none"
                />
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <button className="flex items-center gap-1 text-sm text-gray-400">
                    <Paperclip size={14} /> Attach
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg">
                    <Send size={12} /> Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Ticket List */
          <>
            <div className="flex items-center justify-between px-4 pt-5 pb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support</h1>
            </div>

            <div className="px-4 space-y-3">
              {tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setMobileSelected(ticket)}
                  className="w-full text-left bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${mobilePriorityStyles[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                    <span className="text-xs text-gray-400">{ticket.id}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{ticket.title}</p>
                  <p className="text-xs text-blue-500 mb-2">{ticket.category}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <RefreshCw size={10} />
                    {ticket.updated}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex flex-1 md:p-4 xl:p-8 flex-col">
        <div className="flex md:gap-3 xl:gap-4 flex-1 min-h-0">
          {/* Left: Ticket List */}
          <div className="md:w-[280px] xl:w-[340px] flex-shrink-0 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <select className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#1e2d45]">
                <option>All Status</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Waiting</option>
                <option>Resolved</option>
              </select>
              <select className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#1e2d45]">
                <option>All Categories</option>
                <option>Order Issue</option>
                <option>RMA</option>
                <option>Billing</option>
              </select>
            </div>

            <p className="px-4 py-2 text-xs font-semibold text-gray-400">{tickets.length} Tickets</p>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-700">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelected(ticket)}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    selected?.id === ticket.id
                      ? 'border-l-2 border-blue-500 bg-blue-50/40 dark:bg-blue-900/20'
                      : 'border-l-2 border-transparent hover:bg-gray-50 dark:hover:bg-[#1a2540]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityStyles[ticket.priority]}`}>{ticket.priority}</span>
                    <span className="text-xs text-gray-400">{ticket.id}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{ticket.title}</p>
                  <p className="text-xs text-blue-500 mb-1">{ticket.category}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <RefreshCw size={10} />
                    {ticket.updated}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Ticket Detail */}
          {selected && (
            <div className="flex-1 bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col overflow-hidden">
              <div className="md:px-4 xl:px-6 md:py-3 xl:py-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="md:text-base xl:text-lg font-bold text-gray-900 dark:text-white mb-2">{selected.title}</h2>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityStyles[selected.priority]}`}>{selected.priority}</span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {selected.status === 'In Progress' ? 'Open' : selected.status}
                  </span>
                  <span className="text-xs text-gray-400">{selected.category}</span>
                  <span className="text-xs text-gray-400">Created Mar 25, 2024</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Related: <span className="text-blue-600 font-medium">PCS-2024-1847</span></span>
                  <span>Assigned: Order Support</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto md:px-4 xl:px-6 md:py-4 xl:py-5 md:space-y-4 xl:space-y-5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Conversation</h3>
                {conversation.map((msg, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full ${msg.bg} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                      {msg.initials}
                    </div>
                    <div className="flex-1 bg-[#f1f5f9] dark:bg-[#1e2d45] rounded-xl px-4 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{msg.name}</span>
                          <span className="text-xs text-gray-400 ml-2">{msg.role}</span>
                        </div>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:px-4 xl:px-6 md:py-3 xl:py-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Reply</p>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your message..."
                  rows={3}
                  className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 bg-white dark:bg-[#1e2d45] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Paperclip size={14} /> Attach file
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#112654] transition-colors">
                    <Send size={13} /> Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
