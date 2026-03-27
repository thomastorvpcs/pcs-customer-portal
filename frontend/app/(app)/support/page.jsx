'use client'

import { useState } from 'react'
import { RefreshCw, Paperclip, Send } from 'lucide-react'

const tickets = [
  {
    id: 'TKT-2024-0882',
    priority: 'Urgent',
    title: 'Missing devices in shipment',
    category: 'Order Issue',
    updated: 'Updated 2 hours ago',
    status: 'Open',
  },
  {
    id: 'TKT-2024-0889',
    priority: 'In Progress',
    title: 'RMA status inquiry',
    category: 'RMA',
    updated: 'Updated 1 day ago',
    status: 'In Progress',
  },
  {
    id: 'TKT-2024-0865',
    priority: 'Waiting',
    title: 'Invoice discrepancy',
    category: 'Billing',
    updated: 'Updated 3 days ago',
    status: 'Waiting',
  },
  {
    id: 'TKT-2024-0878',
    priority: 'Resolved',
    title: 'Certificate of conformity request',
    category: 'Certificate',
    updated: 'Resolved 5 days ago',
    status: 'Resolved',
  },
  {
    id: 'TKT-2024-0871',
    priority: 'Resolved',
    title: 'Quote revision needed',
    category: 'Quote',
    updated: 'Resolved 1 week ago',
    status: 'Resolved',
  },
]

const priorityStyles = {
  Urgent: 'bg-red-50 text-red-600',
  'In Progress': 'bg-blue-50 text-blue-600',
  Waiting: 'bg-yellow-50 text-yellow-600',
  Resolved: 'bg-green-50 text-green-600',
}

const conversation = [
  {
    name: 'John Davis',
    role: 'Customer',
    time: 'Mar 25, 10:42 AM',
    message: 'We received shipment SHP-2024-1523 today but the count is off. We ordered 500 iPhone 12 units but only received 485. Can you please investigate and send the missing 15 units?',
    initials: 'JD',
    bg: 'bg-[#0b1b3a]',
  },
  {
    name: 'Sarah Thompson',
    role: 'Order Support',
    time: 'Mar 25, 2:15 PM',
    message: "Hi John, thank you for reaching out. I'm sorry to hear about the discrepancy. I've checked our shipping manifest and it shows 500 units were packed. I've escalated this to our warehouse team to review the packing footage. We'll have an update for you within 24 hours.",
    initials: 'ST',
    bg: 'bg-orange-400',
  },
  {
    name: 'Sarah Thompson',
    role: 'Order Support',
    time: 'Today, 9:30 AM',
    message: "Update: We've confirmed the shortage. The 15 missing units will be shipped today via overnight delivery at no extra charge. You'll receive tracking info shortly. Apologies for the inconvenience.",
    initials: 'ST',
    bg: 'bg-orange-400',
  },
]

export default function SupportPage() {
  const [selected, setSelected] = useState(tickets[0])
  const [reply, setReply] = useState('')

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Support</h1>

      <div className="flex gap-4 h-[calc(100vh-180px)]">
        {/* Left: Ticket List */}
        <div className="w-[340px] flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
          {/* Filters */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Waiting</option>
              <option>Resolved</option>
            </select>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>All Categories</option>
              <option>Order Issue</option>
              <option>RMA</option>
              <option>Billing</option>
            </select>
          </div>

          <p className="px-4 py-2 text-xs font-semibold text-gray-400">{tickets.length} Tickets</p>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelected(ticket)}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  selected?.id === ticket.id
                    ? 'border-l-2 border-blue-500 bg-blue-50/40'
                    : 'border-l-2 border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityStyles[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                  <span className="text-xs text-gray-400">{ticket.id}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-0.5">{ticket.title}</p>
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
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            {/* Ticket Header */}
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-2">{selected.title}</h2>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityStyles[selected.priority]}`}>
                  {selected.priority}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600">
                  {selected.status === 'In Progress' ? 'Open' : selected.status}
                </span>
                <span className="text-xs text-gray-400">{selected.category}</span>
                <span className="text-xs text-gray-400">Created Mar 25, 2024</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>
                  Related: <span className="text-blue-600 font-medium">PCS-2024-1847</span>
                </span>
                <span>Assigned: Order Support</span>
              </div>
            </div>

            {/* Conversation */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <h3 className="text-sm font-semibold text-gray-900">Conversation</h3>
              {conversation.map((msg, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${msg.bg} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                    {msg.initials}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-sm font-semibold text-gray-900">{msg.name}</span>
                        <span className="text-xs text-gray-400 ml-2">{msg.role}</span>
                      </div>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="px-6 py-4 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-900 mb-2">Reply</p>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your message..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                  <Paperclip size={14} />
                  Attach file
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#112654] transition-colors">
                  <Send size={13} />
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
