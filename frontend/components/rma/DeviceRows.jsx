'use client'

// Editable device list for the RMA wizard. Each row: Device ID / IMEI,
// Return Reason, Customer Notes. When a Device ID matches a device on file,
// the model/grade facts auto-fill (and drive later validation).

import { Plus, Trash2 } from 'lucide-react'
import { inputClass, labelClass } from '@/components/rma/shared'
import { REASON_LABELS } from '@/lib/rma-rules'
import { factsForImei, emptyRow } from '@/lib/rma-mock'

const FACT_KEYS = ['itemId', 'model', 'grade', 'category', 'soldDate', 'deliveryDate', 'icloudLocked', 'mdm']
const factPatch = (facts) => FACT_KEYS.reduce((acc, k) => ({ ...acc, [k]: facts[k] }), {})

export default function DeviceRows({ rows, onChange }) {
  const update = (i, patch) => onChange(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))

  const setDeviceId = (i, value) => {
    const facts = factsForImei(value.trim())
    update(i, facts ? { deviceId: value, imei: value, ...factPatch(facts) } : { deviceId: value, imei: value })
  }

  const addRow = () => onChange([...rows, emptyRow()])
  const removeRow = (i) => onChange(rows.length > 1 ? rows.filter((_, idx) => idx !== i) : rows)

  return (
    <div className="space-y-3">
      {rows.map((row, i) => (
        <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3 grid gap-3 sm:grid-cols-[1.3fr_1.2fr_1fr_auto] sm:items-start">
          <div>
            <label className={labelClass}>Device ID / IMEI</label>
            <input
              value={row.deviceId}
              onChange={(e) => setDeviceId(i, e.target.value)}
              placeholder="15-digit IMEI"
              maxLength={20}
              className={`${inputClass} font-mono`}
            />
            {row.model ? (
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 truncate">{row.model}{row.grade ? ` · ${row.grade}` : ''}</p>
            ) : row.deviceId ? (
              <p className="text-[11px] text-amber-500 mt-1">Not found on file — will be verified manually</p>
            ) : null}
          </div>
          <div>
            <label className={labelClass}>Return Reason</label>
            <select value={row.reason} onChange={(e) => update(i, { reason: e.target.value })} className={inputClass}>
              <option value="">Select a reason…</option>
              {REASON_LABELS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Customer Notes</label>
            <input
              value={row.notes}
              onChange={(e) => update(i, { notes: e.target.value })}
              placeholder="Optional"
              className={inputClass}
            />
          </div>
          <div className="flex sm:pt-6 justify-end">
            <button type="button" onClick={() => removeRow(i)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" aria-label="Remove device">
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      ))}

      <button type="button" onClick={addRow} className="inline-flex items-center gap-1 text-sm font-medium text-[#0b1b3a] dark:text-blue-400 hover:underline">
        <Plus size={14} /> Add device
      </button>
    </div>
  )
}
