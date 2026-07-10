'use client'

// Shared, presentational RMA pieces used by both the Returns list/detail page
// (app/(app)/returns/page.jsx) and the submission wizard (returns/new/page.jsx).
// Extracted verbatim so the two surfaces stay visually in sync.

import { Image as ImageIcon, CheckCircle2, CircleDot, Circle } from 'lucide-react'

// Shared Tailwind class strings (mirrors the constants used in app/apply/page.jsx)
// so the wizard and its sub-components stay visually consistent.
export const inputClass = 'w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 bg-white dark:bg-[#1e2d45] focus:outline-none focus:ring-2 focus:ring-blue-500'
export const labelClass = 'block text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5'
export const darkBtn = 'bg-[#0b1b3a] text-white hover:bg-[#0d2147]'

// RMA lifecycle — must match the Sales Portal RMA Management Queue.
export const stages = ['Submitted', 'Under Review', 'Approved', 'Shipped', 'Received', 'Diagnostic', 'Complete']

export function buildTimeline(reachedIndex) {
  return stages.map((label, i) => ({
    label,
    done: i < reachedIndex,
    active: i === reachedIndex,
  }))
}

export const statusStyles = {
  Submitted: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  'Under Review': 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  Approved: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
  Shipped: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  Received: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  Diagnostic: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  Complete: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
}

export const mobileStatusStyles = {
  Submitted: 'bg-blue-500/15 text-blue-400',
  'Under Review': 'bg-amber-500/15 text-amber-400',
  Approved: 'bg-teal-500/15 text-teal-400',
  Shipped: 'bg-indigo-500/15 text-indigo-400',
  Received: 'bg-purple-500/15 text-purple-400',
  Diagnostic: 'bg-amber-500/15 text-amber-400',
  Complete: 'bg-green-500/15 text-green-400',
}

export const rank = (status) => stages.indexOf(status)
export const isApprovedPlus = (status) => rank(status) >= rank('Approved')
export const isComplete = (status) => status === 'Complete'

export function StatusTimeline({ timeline, variant = 'desktop' }) {
  if (variant === 'mobile') {
    return (
      <div className="flex flex-col">
        {timeline.map((step, i) => (
          <div key={step.label} className="flex items-stretch gap-3">
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0 z-10">
                {step.done ? (
                  <CheckCircle2 size={20} className="text-green-500" fill="#f0fdf4" />
                ) : step.active ? (
                  <CircleDot size={20} className="text-blue-500" fill="#eff6ff" />
                ) : (
                  <Circle size={20} className="text-gray-300 dark:text-gray-600" fill="white" />
                )}
              </div>
              {i < timeline.length - 1 && (
                <div className={`w-0.5 flex-1 my-1 ${step.done ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-600'}`} />
              )}
            </div>
            <p className={`text-xs font-medium pb-4 pt-0.5 ${step.active ? 'text-blue-600' : step.done ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>
              {step.label}
            </p>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="flex items-start">
      {timeline.map((step, i) => (
        <div key={step.label} className="flex items-start flex-1">
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {i > 0 && <div className={`flex-1 h-0.5 -mr-1 ${timeline[i - 1].done ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-600'}`} />}
              <div className="flex-shrink-0 z-10">
                {step.done ? (
                  <CheckCircle2 size={22} className="text-green-500" fill="#f0fdf4" />
                ) : step.active ? (
                  <CircleDot size={22} className="text-blue-500" fill="#eff6ff" />
                ) : (
                  <Circle size={22} className="text-gray-300 dark:text-gray-600" fill="white" />
                )}
              </div>
              {i < timeline.length - 1 && <div className={`flex-1 h-0.5 -ml-1 ${step.done ? 'bg-green-400' : step.active ? 'bg-blue-300 dark:bg-blue-700' : 'bg-gray-200 dark:bg-gray-600'}`} />}
            </div>
            <p className={`text-[11px] font-medium mt-2 text-center leading-tight ${step.done ? 'text-gray-700 dark:text-gray-300' : step.active ? 'text-blue-600' : 'text-gray-400'}`}>{step.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function DevicesTable({ devices }) {
  return (
    <div className="border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="grid grid-cols-[1.4fr_1.4fr_1fr] gap-2 px-3 py-2 bg-gray-50 dark:bg-[#1a2540] border-b border-gray-100 dark:border-gray-700">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">IMEI</span>
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Model</span>
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Complaint Reason</span>
      </div>
      <div className="divide-y divide-gray-50 dark:divide-gray-700">
        {devices.map((d) => (
          <div key={d.imei} className="grid grid-cols-[1.4fr_1.4fr_1fr] gap-2 px-3 py-2.5">
            <span className="text-xs font-mono text-gray-700 dark:text-gray-300 truncate">{d.imei}</span>
            <span className="text-xs text-gray-800 dark:text-gray-200 truncate">{d.model}</span>
            <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium truncate">{d.complaintReason}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Evidence thumbnails. Accepts either plain filename strings (existing mock
// records) or { name, url } objects (live client previews from the wizard).
export function EvidenceStrip({ evidence }) {
  return (
    <div className="flex flex-wrap gap-3">
      {evidence.map((item) => {
        const name = typeof item === 'string' ? item : item.name
        const url = typeof item === 'string' ? null : item.url
        return (
          <div key={name} className="w-24">
            <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-[#1a2540] border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden">
              {url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt={name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon size={26} className="text-gray-400 dark:text-blue-300/50" />
              )}
            </div>
            <p className="text-[10px] text-gray-400 dark:text-blue-300/50 mt-1 truncate">{name}</p>
          </div>
        )
      })}
    </div>
  )
}
