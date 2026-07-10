'use client'

// Renders per-IMEI validation verdicts produced by validateDevice().
// Mirrors the example in the RMA instructions:
//   IMEI | Return Reason | Days Sold | Validation | RMA Status
// Every line's RMA Status is "Pending" — final approval happens in NetSuite.

import { CheckCircle2, XCircle, AlertTriangle, ImageUp } from 'lucide-react'

const toneStyles = {
  accept: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  reject: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  warn: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}
const toneIcon = { accept: CheckCircle2, reject: XCircle, warn: AlertTriangle }

const pending = 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'

function ValidationCell({ v }) {
  if (!v) return <span className="text-xs text-gray-400">Not validated</span>
  const Icon = toneIcon[v.tone] || AlertTriangle
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${toneStyles[v.tone]}`} title={v.message}>
      <Icon size={13} /> {v.status}
    </span>
  )
}

function ImageFlag({ row }) {
  if (!row.validation?.imageRequired) return <span className="text-xs text-gray-400">—</span>
  const has = row.files && row.files.length > 0
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${has ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
      <ImageUp size={12} /> {has ? 'Attached' : 'Required'}
    </span>
  )
}

export default function ValidationTable({ rows }) {
  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-2">
        {rows.map((row, i) => (
          <div key={row.deviceId || i} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-gray-700 dark:text-gray-300 truncate">{row.deviceId || row.imei || '—'}</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${pending}`}>Pending</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span className="text-yellow-600 dark:text-yellow-400 font-medium">{row.reason || 'No reason'}</span>
              <span>{row.validation?.daysSold != null ? `${row.validation.daysSold} days` : '—'}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <ValidationCell v={row.validation} />
              <ImageFlag row={row} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block border border-gray-100 dark:border-gray-700 rounded-lg overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#1a2540] border-b border-gray-100 dark:border-gray-700">
              {['IMEI / Device ID', 'Return Reason', 'Days Sold', 'Validation', 'Image', 'RMA Status'].map((c) => (
                <th key={c} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {rows.map((row, i) => (
              <tr key={row.deviceId || i}>
                <td className="px-3 py-2.5 text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.deviceId || row.imei || '—'}</td>
                <td className="px-3 py-2.5 text-xs text-yellow-600 dark:text-yellow-400 font-medium whitespace-nowrap">{row.reason || 'No reason'}</td>
                <td className="px-3 py-2.5 text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">{row.validation?.daysSold != null ? `${row.validation.daysSold}` : '—'}</td>
                <td className="px-3 py-2.5"><ValidationCell v={row.validation} /></td>
                <td className="px-3 py-2.5"><ImageFlag row={row} /></td>
                <td className="px-3 py-2.5"><span className={`px-2 py-1 rounded-full text-xs font-medium ${pending}`}>Pending</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
