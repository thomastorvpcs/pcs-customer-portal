'use client'

// Reusable tracking editor for an RMA. Supports multiple carrier + tracking
// number entries, each editable at any time. Used on the RMA detail view and
// on the wizard's post-submission next-steps screen. UI-only (client state).

import { Trash2, Plus } from 'lucide-react'
import { inputClass } from '@/components/rma/shared'
import { CARRIERS } from '@/lib/rma-mock'

const newId = () => `trk-${Date.now()}-${Math.floor(Math.random() * 100000)}`

export default function TrackingSection({ tracking = [], onChange }) {
  const update = (id, patch) => onChange(tracking.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  const add = () => onChange([...tracking, { id: newId(), carrier: '', number: '' }])
  const remove = (id) => onChange(tracking.filter((t) => t.id !== id))

  return (
    <div className="space-y-2">
      {tracking.length === 0 && (
        <p className="text-xs text-gray-400 dark:text-blue-300/50">No tracking numbers yet — add one below.</p>
      )}
      {tracking.map((t) => (
        <div key={t.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
          <select
            value={t.carrier}
            onChange={(e) => update(t.id, { carrier: e.target.value })}
            className={`${inputClass} sm:w-44 sm:flex-shrink-0`}
          >
            <option value="">Carrier…</option>
            {CARRIERS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            value={t.number}
            onChange={(e) => update(t.id, { number: e.target.value })}
            placeholder="Tracking number"
            className={`${inputClass} font-mono sm:flex-1`}
          />
          <button
            type="button"
            onClick={() => remove(t.id)}
            className="self-end sm:self-auto p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove tracking number"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="inline-flex items-center gap-1 text-sm font-medium text-[#0b1b3a] dark:text-blue-400 hover:underline">
        <Plus size={14} /> Add tracking number
      </button>
    </div>
  )
}
