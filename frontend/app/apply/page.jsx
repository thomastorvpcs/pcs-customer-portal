'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Building2, Contact, Briefcase, FileUp, ClipboardCheck,
  Check, CheckCircle2, ArrowLeft, ArrowRight, UploadCloud, Mail,
} from 'lucide-react'

const steps = [
  { n: 1, label: 'Company', icon: Building2 },
  { n: 2, label: 'Contact', icon: Contact },
  { n: 3, label: 'Business', icon: Briefcase },
  { n: 4, label: 'Documents', icon: FileUp },
  { n: 5, label: 'Review', icon: ClipboardCheck },
]

const industries = ['Wholesale / Distribution', 'Retail', 'Repair & Refurbishment', 'Carrier / MVNO', 'E-commerce', 'Other']
const deviceTypes = ['iPhone', 'Samsung', 'Pixel', 'Other']

const inputClass = 'w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 bg-white dark:bg-[#1e2d45] focus:outline-none focus:ring-2 focus:ring-blue-500'
const labelClass = 'block text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5'
const darkBtn = 'bg-[#0b1b3a] text-white hover:bg-[#0d2147]'

function Field({ label, placeholder, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={inputClass} />
    </div>
  )
}

function DropZone({ label }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl px-4 py-8 flex flex-col items-center justify-center text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer">
        <UploadCloud size={24} className="text-gray-300 dark:text-gray-500 mb-2" />
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Drop file or click to upload</p>
        <p className="text-xs text-gray-400 dark:text-blue-300/50 mt-0.5">PDF, JPG or PNG · up to 10MB</p>
      </div>
    </div>
  )
}

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [sameShipping, setSameShipping] = useState(true)
  const [terms, setTerms] = useState(false)
  const [devices, setDevices] = useState(['iPhone'])
  const [form, setForm] = useState({
    legalName: '', tradingName: '', regNumber: '', vatId: '', industry: '', website: '',
    contactName: '', jobTitle: '', email: '', phone: '',
    billing: '', shipping: '',
    years: '', volume: '', countries: '',
  })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const toggleDevice = (d) => setDevices((ds) => (ds.includes(d) ? ds.filter((x) => x !== d) : [...ds, d]))

  const next = () => setStep((s) => Math.min(5, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0d1829]">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Image src="/Logo.png" alt="PCS Wireless" width={120} height={36} className="mb-8" />
          <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm px-6 py-14 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={34} className="text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application submitted</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              Thank you for applying to become a PCS Wireless partner. Our team will review your
              application and notify you by email once a decision has been made.
            </p>
            <div className="inline-block border border-gray-200 dark:border-gray-600 rounded-xl px-6 py-3 mb-8">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Reference number</p>
              <p className="text-lg font-bold font-mono text-gray-900 dark:text-white">APP-2026-00417</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-blue-300/50">
              <Mail size={13} /> A confirmation has been sent to {form.email || 'your email address'}
            </div>
            <div className="mt-8">
              <Link href="/login" className={`inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${darkBtn}`}>
                Go to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0d1829]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <Image src="/Logo.png" alt="PCS Wireless" width={120} height={36} className="mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New Customer Application</h1>
            <p className="text-sm text-gray-400 dark:text-blue-300/50 mt-1">Apply to become a PCS Wireless trade partner.</p>
          </div>
          <Link href="/login" className="text-sm text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap mt-1">
            Already have an account? Sign in
          </Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => {
            const done = step > s.n
            const current = step === s.n
            return (
              <div key={s.n} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    done ? 'bg-green-500 text-white' : current ? 'bg-[#0b1b3a] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {done ? <Check size={16} /> : s.n}
                  </div>
                  <span className={`text-[11px] font-medium hidden sm:block ${current ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-blue-300/50'}`}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 sm:mx-2 mb-5 ${step > s.n ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm px-6 py-7">
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Company Information</h2>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-5">Tell us about your business.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Legal business name" placeholder="TechMobile Distributors LLC" value={form.legalName} onChange={set('legalName')} />
                <Field label="Trading name" placeholder="TechMobile" value={form.tradingName} onChange={set('tradingName')} />
                <Field label="Company registration number" placeholder="12345678" value={form.regNumber} onChange={set('regNumber')} />
                <Field label="VAT / Tax ID" placeholder="GB123456789" value={form.vatId} onChange={set('vatId')} />
                <div>
                  <label className={labelClass}>Industry vertical</label>
                  <select value={form.industry} onChange={set('industry')} className={inputClass}>
                    <option value="">Select an industry…</option>
                    {industries.map((ind) => <option key={ind}>{ind}</option>)}
                  </select>
                </div>
                <Field label="Website URL" placeholder="https://techmobile.com" value={form.website} onChange={set('website')} />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Contact Details</h2>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-5">Who should we get in touch with?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Primary contact name" placeholder="John Davis" value={form.contactName} onChange={set('contactName')} />
                <Field label="Job title" placeholder="Procurement Manager" value={form.jobTitle} onChange={set('jobTitle')} />
                <Field label="Email" type="email" placeholder="john@techmobile.com" value={form.email} onChange={set('email')} />
                <Field label="Phone" placeholder="(214) 555-7890" value={form.phone} onChange={set('phone')} />
              </div>
              <div className="mt-4">
                <label className={labelClass}>Billing address</label>
                <textarea value={form.billing} onChange={set('billing')} rows={2} placeholder="4521 Commerce Way, Suite 200, Dallas, TX 75201" className={inputClass} />
              </div>
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input type="checkbox" checked={sameShipping} onChange={(e) => setSameShipping(e.target.checked)} className="accent-blue-600 w-4 h-4" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Shipping address same as billing</span>
              </label>
              {!sameShipping && (
                <div className="mt-4">
                  <label className={labelClass}>Shipping address</label>
                  <textarea value={form.shipping} onChange={set('shipping')} rows={2} placeholder="Enter shipping address" className={inputClass} />
                </div>
              )}
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Business Profile</h2>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-5">Help us understand your trading activity.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Years in operation" placeholder="7" value={form.years} onChange={set('years')} />
                <Field label="Estimated monthly volume (units)" placeholder="5,000" value={form.volume} onChange={set('volume')} />
              </div>
              <div className="mt-4">
                <label className={labelClass}>Device types of interest</label>
                <div className="flex flex-wrap gap-2">
                  {deviceTypes.map((d) => (
                    <label key={d} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                      devices.includes(d) ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'
                    }`}>
                      <input type="checkbox" checked={devices.includes(d)} onChange={() => toggleDevice(d)} className="accent-blue-600 w-3.5 h-3.5" />
                      {d}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <label className={labelClass}>Countries of operation</label>
                <input value={form.countries} onChange={set('countries')} placeholder="United States, United Kingdom, Germany" className={inputClass} />
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Document Upload</h2>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-5">Upload the required verification documents.</p>
              <div className="space-y-4">
                <DropZone label="Certificate of incorporation" />
                <DropZone label="Proof of address" />
                <DropZone label="Photo ID" />
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Review &amp; Submit</h2>
              <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-5">Confirm your details before submitting.</p>
              <div className="space-y-4">
                {[
                  { title: 'Company', rows: [['Legal name', form.legalName], ['Trading name', form.tradingName], ['Reg. number', form.regNumber], ['Industry', form.industry]] },
                  { title: 'Contact', rows: [['Contact', form.contactName], ['Email', form.email], ['Phone', form.phone], ['Billing', form.billing]] },
                  { title: 'Business', rows: [['Years', form.years], ['Monthly volume', form.volume], ['Devices', devices.join(', ')], ['Countries', form.countries]] },
                ].map((sec) => (
                  <div key={sec.title} className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">{sec.title}</p>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                      {sec.rows.map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-3 text-sm">
                          <dt className="text-gray-400 dark:text-blue-300/50">{k}</dt>
                          <dd className="text-gray-800 dark:text-gray-200 font-medium text-right truncate">{v || '—'}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <label className="flex items-start gap-2 mt-5 cursor-pointer">
                <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="accent-blue-600 w-4 h-4 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the PCS Wireless <span className="text-blue-600 dark:text-blue-400 underline">Terms &amp; Conditions</span> and confirm the information provided is accurate.
                </span>
              </label>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={back}
              disabled={step === 1}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={15} /> Back
            </button>
            {step < 5 ? (
              <button onClick={next} className={`inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${darkBtn}`}>
                Next <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={() => terms && setSubmitted(true)}
                disabled={!terms}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${darkBtn} disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                Submit Application <Check size={15} />
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-blue-300/50 mt-6">
          PCS Wireless · Supplying the World with Pre-Owned and New Devices.
        </p>
      </div>
    </div>
  )
}
