'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Video, MapPin, Mail, Calendar, Clock, CheckCircle2, RotateCcw, X } from 'lucide-react'

const rep = { name: 'Michael Torres', initials: 'MT', role: 'Senior Sales Representative', email: 'm.torres@pcsww.com', phone: '+1 (305) 555-0142' }

const days = [
  { key: 'mon', dow: 'Mon', day: '7', month: 'Jul' },
  { key: 'tue', dow: 'Tue', day: '8', month: 'Jul' },
  { key: 'wed', dow: 'Wed', day: '9', month: 'Jul' },
  { key: 'thu', dow: 'Thu', day: '10', month: 'Jul' },
  { key: 'fri', dow: 'Fri', day: '11', month: 'Jul' },
]

const slots = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30']

const meetingTypes = [
  { key: 'call', label: 'Call', icon: Phone },
  { key: 'video', label: 'Video', icon: Video },
  { key: 'inperson', label: 'In-person', icon: MapPin },
]

const upcoming = [
  { id: 1, subject: 'Q3 Inventory Planning Review', date: 'Jul 3, 2026', time: '10:30 AM EST', type: 'video', typeLabel: 'Video Call' },
  { id: 2, subject: 'Refurbished iPhone Bulk Pricing', date: 'Jul 8, 2026', time: '2:00 PM EST', type: 'call', typeLabel: 'Phone Call' },
]

const past = [
  { id: 3, subject: 'New Account Onboarding', date: 'Jun 18, 2026', time: '11:00 AM EST', type: 'video', typeLabel: 'Video Call' },
  { id: 4, subject: 'Miami Warehouse Walkthrough', date: 'Jun 5, 2026', time: '9:30 AM EST', type: 'inperson', typeLabel: 'In-person' },
]

const typeIcon = { call: Phone, video: Video, inperson: MapPin }

function MeetingRow({ m, showActions }) {
  const Icon = typeIcon[m.type]
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#152035]">
      <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-blue-600 dark:text-blue-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{m.subject}</p>
        <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-0.5">{m.date} · {m.time} · {m.typeLabel}</p>
      </div>
      {showActions && (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]"><RotateCcw size={12} /> Reschedule</button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border border-red-200 dark:border-red-800 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><X size={12} /> Cancel</button>
        </div>
      )}
    </div>
  )
}

export default function MeetingsPage() {
  const [selectedDay, setSelectedDay] = useState('mon')
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [meetingType, setMeetingType] = useState('video')
  const [booked, setBooked] = useState(false)

  const canConfirm = selectedSlot && meetingType && !booked
  const selectedDayObj = days.find((d) => d.key === selectedDay)

  const BookingPanel = ({ mobile }) => (
    <div className={`bg-white dark:bg-[#152035] ${mobile ? 'rounded-2xl border-gray-100 dark:border-white/5' : 'rounded-xl border-gray-100 dark:border-gray-700 shadow-sm'} border p-4 xl:p-6`}>
      {booked ? (
        <div className="flex flex-col items-center text-center py-8">
          <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-4">
            <CheckCircle2 size={28} className="text-green-500" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Meeting booked</h3>
          <p className="text-sm text-gray-500 dark:text-blue-300/50 max-w-sm">
            {meetingTypes.find((t) => t.key === meetingType)?.label} on {selectedDayObj?.dow}, {selectedDayObj?.month} {selectedDayObj?.day} at {selectedSlot}. Calendar invite sent to john.davis@wirelessdepot.com and m.torres@pcsww.com.
          </p>
          <button onClick={() => { setBooked(false); setSelectedSlot(null) }} className="mt-5 px-4 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147]">Book another meeting</button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} className="text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Book a Meeting</h3>
          </div>

          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Select a day</p>
          <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none">
            {days.map((d) => (
              <button key={d.key} onClick={() => { setSelectedDay(d.key); setSelectedSlot(null) }}
                className={`flex-shrink-0 w-16 rounded-xl py-2.5 text-center border transition-all ${selectedDay === d.key ? 'bg-[#0b1b3a] text-white border-[#0b1b3a] hover:bg-[#0d2147]' : 'bg-white dark:bg-[#1e2d45] border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300'}`}>
                <p className={`text-[10px] font-medium ${selectedDay === d.key ? 'text-blue-200/70' : 'text-gray-400'}`}>{d.dow}</p>
                <p className="text-lg font-bold leading-tight">{d.day}</p>
                <p className={`text-[10px] ${selectedDay === d.key ? 'text-blue-200/70' : 'text-gray-400'}`}>{d.month}</p>
              </button>
            ))}
          </div>

          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Available times</p>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {slots.map((s) => (
              <button key={s} onClick={() => setSelectedSlot(s)}
                className={`flex items-center justify-center gap-1 py-2 text-sm rounded-lg border transition-all ${selectedSlot === s ? 'bg-[#0b1b3a] text-white border-[#0b1b3a] hover:bg-[#0d2147]' : 'bg-white dark:bg-[#1e2d45] border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300'}`}>
                {s}
              </button>
            ))}
          </div>

          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Meeting type</p>
          <div className="flex gap-2 mb-5">
            {meetingTypes.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setMeetingType(key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm rounded-lg border transition-all ${meetingType === key ? 'bg-[#0b1b3a] text-white border-[#0b1b3a] hover:bg-[#0d2147]' : 'bg-white dark:bg-[#1e2d45] border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300'}`}>
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          <button onClick={() => canConfirm && setBooked(true)} disabled={!canConfirm}
            className={`w-full py-3 text-sm font-medium rounded-lg transition-colors ${canConfirm ? 'bg-[#0b1b3a] text-white hover:bg-[#0d2147]' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}>
            {selectedSlot ? `Confirm Booking · ${selectedDayObj?.dow} ${selectedSlot}` : 'Select a time to continue'}
          </button>
        </>
      )}
    </div>
  )

  const RepCard = ({ mobile }) => (
    <div className={`bg-white dark:bg-[#152035] ${mobile ? 'rounded-2xl border-gray-100 dark:border-white/5' : 'rounded-xl border-gray-100 dark:border-gray-700 shadow-sm'} border p-4 xl:p-6`}>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-[#0b1b3a] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">{rep.initials}</span>
        </div>
        <div className="min-w-0">
          <p className="text-base font-bold text-gray-900 dark:text-white">{rep.name}</p>
          <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">{rep.role}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><Mail size={14} className="text-gray-400" /> {rep.email}</div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><Phone size={14} className="text-gray-400" /> {rep.phone}</div>
      </div>
      <button className="mt-4 w-full py-2.5 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147]">Book a Meeting</button>
    </div>
  )

  const MeetingsLists = ({ mobile }) => (
    <>
      <div className={`bg-white dark:bg-[#152035] ${mobile ? 'rounded-2xl border-gray-100 dark:border-white/5' : 'rounded-xl border-gray-100 dark:border-gray-700 shadow-sm'} border p-4 xl:p-6`}>
        <div className="flex items-center gap-2 mb-3">
          <Clock size={16} className="text-yellow-600 dark:text-yellow-400" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Upcoming Meetings</h3>
        </div>
        <div className="space-y-2">{upcoming.map((m) => <MeetingRow key={m.id} m={m} showActions />)}</div>
      </div>
      <div className={`bg-white dark:bg-[#152035] ${mobile ? 'rounded-2xl border-gray-100 dark:border-white/5' : 'rounded-xl border-gray-100 dark:border-gray-700 shadow-sm'} border p-4 xl:p-6`}>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Past Meetings</h3>
        <div className="space-y-2 opacity-80">{past.map((m) => <MeetingRow key={m.id} m={m} showActions={false} />)}</div>
      </div>
    </>
  )

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] pb-6">
        <div className="px-4 pt-5 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meetings</h1>
          <p className="text-sm text-gray-500 dark:text-blue-300/50 mt-0.5">Schedule time with your PCS Sales Representative</p>
        </div>
        <div className="px-4 space-y-4">
          <RepCard mobile />
          <BookingPanel mobile />
          <MeetingsLists mobile />
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block flex-1 md:p-4 xl:p-8">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meetings</h1>
          <p className="text-sm text-gray-500 dark:text-blue-300/50 mt-0.5">Schedule time with your PCS Sales Representative</p>
        </div>
        <div className="flex md:gap-4 xl:gap-6 items-start">
          <div className="md:w-[300px] xl:w-[340px] flex-shrink-0 space-y-4">
            <RepCard mobile={false} />
          </div>
          <div className="flex-1 min-w-0">
            <BookingPanel mobile={false} />
          </div>
          <div className="md:w-[320px] xl:w-[380px] flex-shrink-0 space-y-4">
            <MeetingsLists mobile={false} />
          </div>
        </div>
      </div>
    </>
  )
}
