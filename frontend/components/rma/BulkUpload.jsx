'use client'

// Bulk device upload for the RMA wizard. Parses a CSV client-side (no parser
// dependency is installed) into { deviceId, reason, notes } rows, previews
// them with per-row error flags, then hands valid rows to the parent.
// Columns: Device ID (required), Return Reason (required), Customer Notes (optional).

import { useRef, useState } from 'react'
import { Download, UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle } from 'lucide-react'
import { darkBtn } from '@/components/rma/shared'

const HEADERS = ['Device ID', 'Return Reason', 'Customer Notes']
const SAMPLE = [
  ['354872109348721', 'Cracked LCD', 'Screen cracked on arrival'],
  ['354872109348722', 'Battery Drain', ''],
  ['359102847561023', 'Deep Scratch', 'Deep scratch on rear glass'],
]

// Minimal CSV line splitter that respects double-quoted fields.
function splitCsvLine(line) {
  const out = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      out.push(cur); cur = ''
    } else {
      cur += ch
    }
  }
  out.push(cur)
  return out.map((s) => s.trim())
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '')
  if (!lines.length) return []
  const first = splitCsvLine(lines[0]).join(' ').toLowerCase()
  const hasHeader = first.includes('device')
  const body = hasHeader ? lines.slice(1) : lines
  return body.map((line) => {
    const [deviceId = '', reason = '', notes = ''] = splitCsvLine(line)
    return { deviceId, reason, notes, valid: !!deviceId && !!reason }
  })
}

export default function BulkUpload({ onImport }) {
  const inputRef = useRef(null)
  const [parsed, setParsed] = useState(null)
  const [fileName, setFileName] = useState('')

  const downloadTemplate = () => {
    const csv = [HEADERS, ...SAMPLE].map((r) => r.map((c) => (c.includes(',') ? `"${c}"` : c)).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'pcs-rma-bulk-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFile = async (file) => {
    setFileName(file.name)
    const text = await file.text()
    setParsed(parseCsv(text))
  }

  const validRows = parsed?.filter((r) => r.valid) || []

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={downloadTemplate} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
          <Download size={14} /> Download template
        </button>
        <span className="text-xs text-gray-400">Columns: Device ID, Return Reason, Customer Notes</span>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg px-4 py-8 flex flex-col items-center justify-center text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <UploadCloud size={26} className="text-gray-400 dark:text-blue-300/50 mb-2" />
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{fileName || 'Upload a .csv file'}</p>
        <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-0.5">No specific invoice required</p>
      </button>
      <input ref={inputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); e.target.value = '' }} />

      {parsed && (
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs">
            <FileSpreadsheet size={14} className="text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">{parsed.length} row{parsed.length !== 1 ? 's' : ''} parsed · {validRows.length} valid</span>
          </div>
          <div className="border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden max-h-56 overflow-y-auto">
            {parsed.map((r, i) => (
              <div key={i} className="grid grid-cols-[auto_1.3fr_1fr_1fr] gap-2 px-3 py-2 items-center border-b border-gray-50 dark:border-gray-700 last:border-0">
                {r.valid
                  ? <CheckCircle2 size={14} className="text-green-500" />
                  : <AlertTriangle size={14} className="text-amber-500" />}
                <span className="text-xs font-mono text-gray-700 dark:text-gray-300 truncate">{r.deviceId || <span className="text-red-500">missing ID</span>}</span>
                <span className="text-xs text-gray-600 dark:text-gray-300 truncate">{r.reason || <span className="text-red-500">missing reason</span>}</span>
                <span className="text-xs text-gray-400 truncate">{r.notes || '—'}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            disabled={!validRows.length}
            onClick={() => onImport(validRows)}
            className={`mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${darkBtn} disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            Add {validRows.length} device{validRows.length !== 1 ? 's' : ''} to RMA
          </button>
        </div>
      )}
    </div>
  )
}
