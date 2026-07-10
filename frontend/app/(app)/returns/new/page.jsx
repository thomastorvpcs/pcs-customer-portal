'use client'

// RMA submission wizard (UI-only demo). Flow:
//   1 Source   — from a sales order, an invoice, or a bulk CSV upload
//   2 Devices  — enter IMEIs, return reasons, per-device notes
//   3 Validate — run the rule book, show a per-IMEI verdict table
//   4 Evidence — attach photos/video per device (required-image gating)
//   5 Review   — accept policy, preview the createRMA payload, submit
// After submit: a next-steps screen (tracking, return instructions, policy).
// Nothing is persisted or sent anywhere — this is a stakeholder demo.

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, Send, ShieldCheck, ClipboardCheck,
  Smartphone, FileInput, Image as ImageIcon, ShoppingCart, FileText, Upload,
  AlertTriangle, ChevronRight, Truck, Info,
} from 'lucide-react'

import WizardSteps from '@/components/rma/WizardSteps'
import DeviceRows from '@/components/rma/DeviceRows'
import ValidationTable from '@/components/rma/ValidationTable'
import BulkUpload from '@/components/rma/BulkUpload'
import ImageUploader from '@/components/rma/ImageUploader'
import { inputClass, labelClass, darkBtn } from '@/components/rma/shared'
import { validateDevice, RULE_BOOK } from '@/lib/rma-rules'
import {
  MOCK_SALES_ORDERS, MOCK_INVOICES, MOCK_CUSTOMER, CARRIERS, RETURN_INSTRUCTIONS,
  RETURN_POLICY_TEXT, seedRowsFromSource, emptyRow, factsForImei, buildCreateRmaPayload, generateRmaRef,
} from '@/lib/rma-mock'

const steps = [
  { n: 1, label: 'Source', icon: FileInput },
  { n: 2, label: 'Devices', icon: Smartphone },
  { n: 3, label: 'Validate', icon: ShieldCheck },
  { n: 4, label: 'Evidence', icon: ImageIcon },
  { n: 5, label: 'Review', icon: ClipboardCheck },
]

// Facts passed to the rule book — only for devices we recognise on file.
const factsFor = (r) => {
  if (!(r.itemId || r.model)) return {}
  return { soldDate: r.soldDate, deliveryDate: r.deliveryDate, grade: r.grade, category: r.category, icloudLocked: r.icloudLocked, mdm: r.mdm }
}

function RmaWizard() {
  const router = useRouter()
  const params = useSearchParams()
  const initialInvoice = params.get('invoice')
  const initialOrder = params.get('order')

  const [step, setStep] = useState(1)
  const [kind, setKind] = useState(initialInvoice ? 'invoice' : initialOrder ? 'order' : null)
  const [sourceId, setSourceId] = useState(initialInvoice || initialOrder || '')
  const [rows, setRows] = useState(() => {
    if (initialInvoice) return seedRowsFromSource('invoice', initialInvoice)
    if (initialOrder) return seedRowsFromSource('order', initialOrder)
    return []
  })
  const [validated, setValidated] = useState(false)
  const [policyAccepted, setPolicyAccepted] = useState(false)

  // Post-submission next-steps state
  const [submitted, setSubmitted] = useState(false)
  const [rmaRef, setRmaRef] = useState(null)
  const [carrier, setCarrier] = useState('')
  const [tracking, setTracking] = useState('')
  const [returnAck, setReturnAck] = useState(false)
  const [extraFiles, setExtraFiles] = useState([])

  const changeRows = (next) => { setRows(next); setValidated(false) }

  const chooseSource = (kindSel) => {
    setKind(kindSel)
    setValidated(false)
    if (kindSel === 'order') { const o = MOCK_SALES_ORDERS[0]; setSourceId(o.id); setRows(seedRowsFromSource('order', o.id)) }
    else if (kindSel === 'invoice') { const iv = MOCK_INVOICES[0]; setSourceId(iv.id); setRows(seedRowsFromSource('invoice', iv.id)) }
    else { setSourceId(''); setRows([]) }
  }

  const selectSource = (id) => { setSourceId(id); setRows(seedRowsFromSource(kind, id)); setValidated(false) }

  const importBulk = (parsed) => {
    const mapped = parsed.map((p) => {
      const facts = factsForImei(p.deviceId.trim())
      return { ...emptyRow(), ...(facts || {}), deviceId: p.deviceId, imei: p.deviceId, reason: p.reason, notes: p.notes || '' }
    })
    changeRows(mapped)
    setStep(2)
  }

  const startManual = () => { setKind('manual'); setRows([emptyRow()]); setValidated(false) }

  const runValidation = () => {
    const today = new Date()
    setRows(rows.map((r) => ({ ...r, validation: validateDevice({ reason: r.reason, facts: factsFor(r), today }) })))
    setValidated(true)
  }

  const setRowFiles = (i, files) => setRows(rows.map((r, idx) => (idx === i ? { ...r, files } : r)))

  const submit = () => { setRmaRef(generateRmaRef()); setSubmitted(true) }

  // ── gating ──
  const hasDevices = rows.length > 0
  const devicesComplete = hasDevices && rows.every((r) => r.deviceId.trim() && r.reason)
  const blockingImage = rows.filter((r) => r.validation?.imageRequired && (!r.files || r.files.length === 0))
  const canSubmit = validated && policyAccepted && blockingImage.length === 0 && devicesComplete

  const canNext =
    (step === 1 && hasDevices) ||
    (step === 2 && devicesComplete) ||
    (step === 3 && validated) ||
    step === 4

  const next = () => setStep((s) => Math.min(5, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))

  const acceptedCount = rows.filter((r) => r.validation?.accepted).length
  const flaggedCount = rows.length - acceptedCount

  // ── Post-submission next-steps screen ──
  if (submitted) {
    return (
      <div className="min-h-full bg-[#f1f5f9] dark:bg-[#0d1829]">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-5">
          <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm px-6 py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={30} className="text-green-500" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">RMA submitted</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Your request was sent to PCS Wireless. The RMA team will review each device; final approval happens in NetSuite.
            </p>
            <div className="inline-flex items-center gap-6 border border-gray-200 dark:border-gray-600 rounded-xl px-6 py-3 mt-5">
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">RMA number</p>
                <p className="text-lg font-bold font-mono text-gray-900 dark:text-white">{rmaRef.name}</p>
              </div>
              <div className="border-l border-gray-200 dark:border-gray-600 pl-6">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Transaction ID</p>
                <p className="text-lg font-bold font-mono text-gray-900 dark:text-white">{rmaRef.transactionId}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2"><Truck size={16} className="text-gray-400" /> Next steps</h2>
            <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-4">Complete these to move your RMA forward.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Carrier <span className="text-red-500">*</span></label>
                <select value={carrier} onChange={(e) => setCarrier(e.target.value)} className={inputClass}>
                  <option value="">Select carrier…</option>
                  {CARRIERS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Tracking number <span className="text-red-500">*</span></label>
                <input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="e.g. 1Z999AA10123456784" className={`${inputClass} font-mono`} />
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-gray-50 dark:bg-[#1a2540] border border-gray-100 dark:border-gray-700 p-4">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1.5"><Info size={14} className="text-gray-400" /> Return instructions</p>
              <ol className="list-decimal list-inside space-y-1">
                {RETURN_INSTRUCTIONS.map((t) => <li key={t} className="text-xs text-gray-600 dark:text-gray-300">{t}</li>)}
              </ol>
            </div>

            <div className="mt-4">
              <label className={labelClass}>Additional images (if requested by the RMA team)</label>
              <ImageUploader files={extraFiles} onChange={setExtraFiles} />
            </div>

            <label className="flex items-start gap-2 mt-4 cursor-pointer">
              <input type="checkbox" checked={returnAck} onChange={(e) => setReturnAck(e.target.checked)} className="accent-blue-600 w-4 h-4 mt-0.5" />
              <span className="text-xs text-gray-600 dark:text-gray-300">{RETURN_POLICY_TEXT} <span className="font-medium text-gray-800 dark:text-gray-100">I have read and accept the return policy.</span></span>
            </label>

            <div className="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
              <Link href="/returns" className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
                Back to Returns
              </Link>
              <button
                onClick={() => router.push('/returns')}
                disabled={!carrier || !tracking.trim() || !returnAck}
                className={`inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-lg transition-colors ${darkBtn} disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                Done <Check size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Wizard ──
  return (
    <div className="min-h-full bg-[#f1f5f9] dark:bg-[#0d1829]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <Link href="/returns" className="text-blue-500 hover:text-blue-600"><ArrowLeft size={20} /></Link>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">New Return (RMA)</h1>
            <p className="text-sm text-gray-400 dark:text-blue-300/50">Submit devices for return authorization · {MOCK_CUSTOMER.name}</p>
          </div>
        </div>

        <WizardSteps steps={steps} step={step} />

        <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm px-5 md:px-6 py-6">

          {/* Step 1 — Source */}
          {step === 1 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">How do you want to start?</h2>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-5">Start from a sales order, an invoice, or upload a device list.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                {[
                  { k: 'order', label: 'From Sales Order', icon: ShoppingCart, desc: 'Pick a delivered order' },
                  { k: 'invoice', label: 'From Invoice', icon: FileText, desc: 'Enter an invoice number' },
                  { k: 'bulk', label: 'Bulk Upload', icon: Upload, desc: 'Upload a device list (CSV)' },
                ].map(({ k, label, icon: Icon, desc }) => (
                  <button
                    key={k}
                    onClick={() => chooseSource(k)}
                    className={`text-left rounded-xl border p-4 transition-all ${kind === k ? 'border-[#0b1b3a] bg-[#0b1b3a]/[0.03] dark:bg-blue-900/20 ring-1 ring-[#0b1b3a]' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'}`}
                  >
                    <Icon size={20} className="text-[#0b1b3a] dark:text-blue-400 mb-2" />
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
                    <p className="text-[11px] text-gray-400 dark:text-blue-300/50 mt-0.5">{desc}</p>
                  </button>
                ))}
              </div>

              {(kind === 'order' || kind === 'invoice') && (
                <div className="mb-2">
                  <label className={labelClass}>{kind === 'order' ? 'Sales order' : 'Invoice number'}</label>
                  <select value={sourceId} onChange={(e) => selectSource(e.target.value)} className={inputClass}>
                    {(kind === 'order' ? MOCK_SALES_ORDERS : MOCK_INVOICES).map((s) => (
                      <option key={s.id} value={s.id}>{s.id} · {s.devices.length} device{s.devices.length !== 1 ? 's' : ''}</option>
                    ))}
                    {sourceId && !(kind === 'order' ? MOCK_SALES_ORDERS : MOCK_INVOICES).some((s) => s.id === sourceId) && (
                      <option value={sourceId}>{sourceId}</option>
                    )}
                  </select>
                  {hasDevices && <p className="text-xs text-gray-400 mt-2">{rows.length} device{rows.length !== 1 ? 's' : ''} loaded — continue to review and set reasons.</p>}
                </div>
              )}

              {kind === 'bulk' && <BulkUpload onImport={importBulk} />}

              {!kind && (
                <button onClick={startManual} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Or enter devices manually →
                </button>
              )}
            </div>
          )}

          {/* Step 2 — Devices */}
          {step === 2 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Devices &amp; reasons</h2>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-5">Confirm each device, choose a return reason, and add optional notes.</p>
              <DeviceRows rows={rows} onChange={changeRows} />
              {!devicesComplete && hasDevices && (
                <p className="text-xs text-amber-500 mt-3 flex items-center gap-1"><AlertTriangle size={13} /> Every device needs an ID and a return reason.</p>
              )}
            </div>
          )}

          {/* Step 3 — Validate */}
          {step === 3 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Validate RMA data</h2>
                <button onClick={runValidation} className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${darkBtn}`}>
                  <ShieldCheck size={15} /> {validated ? 'Re-validate' : 'Validate RMA Data'}
                </button>
              </div>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-4">Each device is checked against the RMA rule book. Devices that fail can still be submitted — they will be reviewed manually and are not auto-approved.</p>

              {validated ? (
                <>
                  <ValidationTable rows={rows} />
                  <div className="mt-3 flex flex-wrap gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400"><CheckCircle2 size={13} /> {acceptedCount} accepted</span>
                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400"><AlertTriangle size={13} /> {flaggedCount} flagged (manual review)</span>
                  </div>
                  <details className="mt-4 group">
                    <summary className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer select-none"><ChevronRight size={13} className="group-open:rotate-90 transition-transform" /> Rules applied</summary>
                    <ul className="mt-2 space-y-1 pl-4">
                      {RULE_BOOK.map((r) => (
                        <li key={r.title} className="text-[11px] text-gray-500 dark:text-gray-400"><span className="font-semibold text-gray-700 dark:text-gray-300">{r.title}:</span> {r.detail}</li>
                      ))}
                    </ul>
                  </details>
                </>
              ) : (
                <div className="border border-dashed border-gray-200 dark:border-gray-600 rounded-lg py-10 text-center">
                  <ShieldCheck size={26} className="text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Click <span className="font-medium">Validate RMA Data</span> to check each device.</p>
                </div>
              )}
            </div>
          )}

          {/* Step 4 — Evidence */}
          {step === 4 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Evidence</h2>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-5">Attach photos or video per device. Reasons marked <span className="font-medium">Required</span> must have at least one file before you can submit.</p>
              <div className="space-y-4">
                {rows.map((row, i) => (
                  <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="min-w-0">
                        <p className="text-xs font-mono text-gray-700 dark:text-gray-300 truncate">{row.deviceId || '—'}</p>
                        <p className="text-[11px] text-gray-400 truncate">{row.model || 'Unrecognised device'} · <span className="text-yellow-600 dark:text-yellow-400">{row.reason || 'No reason'}</span></p>
                      </div>
                      {row.validation?.imageRequired && (
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${row.files?.length ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                          {row.files?.length ? 'Attached' : 'Image required'}
                        </span>
                      )}
                    </div>
                    <ImageUploader files={row.files} onChange={(files) => setRowFiles(i, files)} compact />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5 — Review & Submit */}
          {step === 5 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Review &amp; submit</h2>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-5">Confirm the request. Flagged devices are still submitted for manual review.</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Source', value: kind === 'bulk' ? 'Bulk upload' : (sourceId || 'Manual') },
                  { label: 'Devices', value: String(rows.length) },
                  { label: 'Accepted', value: String(acceptedCount) },
                  { label: 'Flagged', value: String(flaggedCount) },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-lg border border-gray-100 dark:border-gray-700 p-3">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{value}</p>
                  </div>
                ))}
              </div>

              <ValidationTable rows={rows} />

              {blockingImage.length > 0 && (
                <div className="mt-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-3 py-2.5 flex items-start gap-2">
                  <AlertTriangle size={15} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    {blockingImage.length} device{blockingImage.length !== 1 ? 's' : ''} need{blockingImage.length === 1 ? 's' : ''} an image before submission: <span className="font-mono">{blockingImage.map((r) => r.deviceId).join(', ')}</span>. Go back to Evidence to attach.
                  </p>
                </div>
              )}

              <details className="mt-4 group">
                <summary className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer select-none"><ChevronRight size={13} className="group-open:rotate-90 transition-transform" /> NetSuite payload preview (createRMA)</summary>
                <pre className="mt-2 text-[11px] leading-relaxed bg-gray-900 text-green-300 rounded-lg p-3 overflow-x-auto">{JSON.stringify(buildCreateRmaPayload(rows), null, 2)}</pre>
              </details>

              <label className="flex items-start gap-2 mt-4 cursor-pointer">
                <input type="checkbox" checked={policyAccepted} onChange={(e) => setPolicyAccepted(e.target.checked)} className="accent-blue-600 w-4 h-4 mt-0.5" />
                <span className="text-xs text-gray-600 dark:text-gray-300">I confirm the information is accurate and accept the PCS Wireless <span className="text-blue-600 dark:text-blue-400 underline">return policy</span>.</span>
              </label>
            </div>
          )}

          {/* Footer nav */}
          <div className="flex items-center justify-between mt-7 pt-5 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={back}
              disabled={step === 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={15} /> Back
            </button>
            {step < 5 ? (
              <button
                onClick={next}
                disabled={!canNext}
                className={`inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-lg transition-colors ${darkBtn} disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                Next <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={!canSubmit}
                className={`inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-lg transition-colors ${darkBtn} disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                <Send size={14} /> Submit RMA
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NewRmaPage() {
  return (
    <Suspense fallback={null}>
      <RmaWizard />
    </Suspense>
  )
}
