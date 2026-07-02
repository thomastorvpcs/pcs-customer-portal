'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Truck, ExternalLink, PackageCheck, User, Plus, Pencil, Trash2, FileCheck2, Download, ArrowLeft, Info, MapPin } from 'lucide-react'

const shipments = [
  { id: 'SHP-4471', order: 'PCS-2024-1842', carrier: 'FedEx', tracking: '7749 1123 8890', status: 'In Transit' },
  { id: 'SHP-4468', order: 'PCS-2024-1835', carrier: 'UPS', tracking: '1Z999AA10123456784', status: 'Out for Delivery' },
]

const pickupShipments = [
  { id: 'SHP-4482', order: 'PCS-2024-1866', units: 320, desc: 'Refurbished iPhone 13 Pro' },
  { id: 'SHP-4485', order: 'PCS-2024-1873', units: 180, desc: 'Refurbished Galaxy S23' },
]

const carrierStyle = {
  FedEx: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  UPS: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

const uLabel = 'text-[10px] font-semibold text-gray-400 uppercase tracking-wide'
const inputCls =
  'w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'

export default function PickupPage() {
  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Miguel Santos', phone: '(305) 555-0147', license: 'FL-D8842190' },
    { id: 2, name: 'Andre Willis', phone: '(305) 555-0192', license: 'FL-W3391052' },
  ])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', license: '' })
  const [selectedShipment, setSelectedShipment] = useState(pickupShipments[0].id)
  const [selectedDriver, setSelectedDriver] = useState(drivers[0].id)
  const [generated, setGenerated] = useState(false)

  const addDriver = () => {
    if (!form.name) return
    setDrivers((d) => [...d, { id: Date.now(), ...form }])
    setForm({ name: '', phone: '', license: '' })
    setShowForm(false)
  }
  const removeDriver = (id) => setDrivers((d) => d.filter((x) => x.id !== id))

  const docRef = 'PUA-2026-002317'
  const InfoNote = ({ children }) => (
    <p className="flex items-start gap-1.5 text-xs text-gray-400 dark:text-blue-300/50 mt-2">
      <Info size={13} className="mt-0.5 flex-shrink-0" /> <span>{children}</span>
    </p>
  )

  const TrackingCard = ({ s, mobile }) => (
    <div className={`${mobile ? 'rounded-2xl border-gray-100 dark:border-white/5' : 'rounded-xl border-gray-100 dark:border-gray-700 shadow-sm'} bg-white dark:bg-[#152035] border p-4`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.id}</p>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${carrierStyle[s.carrier]}`}>{s.carrier}</span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">Order {s.order}</p>
        </div>
        <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 whitespace-nowrap">{s.status}</span>
      </div>
      <p className={uLabel}>Tracking Number</p>
      <p className="text-sm font-mono text-gray-800 dark:text-gray-200 mb-3">{s.tracking}</p>
      <button className="w-full flex items-center justify-center gap-1.5 py-2 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors">
        <ExternalLink size={14} /> Track on carrier site
      </button>
    </div>
  )

  const DriverRow = ({ d }) => (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#1a2540] flex items-center justify-center flex-shrink-0">
        <User size={16} className="text-gray-500 dark:text-blue-300/60" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{d.name}</p>
        <p className="text-xs text-gray-400">{d.phone} &middot; Lic {d.license}</p>
      </div>
      <button className="p-1.5 text-gray-400 hover:text-blue-600"><Pencil size={15} /></button>
      <button onClick={() => removeDriver(d.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={15} /></button>
    </div>
  )

  const AddDriverForm = () => (
    <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className={uLabel + ' mb-1'}>Name</p>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className={inputCls} />
        </div>
        <div>
          <p className={uLabel + ' mb-1'}>Phone</p>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(305) 555-0000" className={inputCls} />
        </div>
      </div>
      <div>
        <p className={uLabel + ' mb-1'}>License Number</p>
        <input value={form.license} onChange={(e) => setForm({ ...form, license: e.target.value })} placeholder="FL-000000000" className={inputCls} />
      </div>
      <div className="flex gap-2">
        <button onClick={addDriver} className="flex-1 py-2 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors">Save Driver</button>
        <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300">Cancel</button>
      </div>
    </div>
  )

  const AuthSection = ({ mobile }) => (
    <div className={`${mobile ? 'rounded-2xl border-gray-100 dark:border-white/5' : 'rounded-xl border-gray-100 dark:border-gray-700 shadow-sm'} bg-white dark:bg-[#152035] border p-4`}>
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Generate Pickup Authorization</p>
      {generated ? (
        <div className="text-center py-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
            <FileCheck2 size={24} className="text-green-600 dark:text-green-400" />
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">Authorization generated</p>
          <div className="mt-3 mx-auto max-w-xs bg-gray-50 dark:bg-[#1a2540]/40 border border-gray-100 dark:border-gray-700 rounded-lg px-4 py-3">
            <p className={uLabel}>Document Reference</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{docRef}</p>
          </div>
          <div className="flex flex-col gap-2 mt-4 max-w-xs mx-auto">
            <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors">
              <Download size={15} /> Download PDF
            </button>
            <button onClick={() => setGenerated(false)} className="text-sm text-blue-600 hover:underline font-medium">Generate another</button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <div>
              <p className={uLabel + ' mb-1'}>Pickup-Eligible Shipment</p>
              <select value={selectedShipment} onChange={(e) => setSelectedShipment(e.target.value)} className={inputCls}>
                {pickupShipments.map((s) => (
                  <option key={s.id} value={s.id}>{s.id} — {s.desc} ({s.units} units)</option>
                ))}
              </select>
            </div>
            <div>
              <p className={uLabel + ' mb-1'}>Authorized Driver</p>
              <select value={selectedDriver} onChange={(e) => setSelectedDriver(Number(e.target.value))} className={inputCls}>
                {drivers.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} — {d.license}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => setGenerated(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 mt-4 text-sm font-medium rounded-lg bg-[#0b1b3a] text-white hover:bg-[#0d2147] transition-colors"
          >
            <FileCheck2 size={15} /> Generate Authorization Document
          </button>
          <InfoNote>Pickup authorization follows the PCS Operations approval process and must be presented at the facility.</InfoNote>
        </>
      )}
    </div>
  )

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden bg-[#f1f5f9] dark:bg-[#0d1829] min-h-full pb-8">
        <div className="px-4 pt-5 pb-4">
          <Link href="/shipments" className="flex items-center gap-1.5 text-sm text-blue-500 mb-3">
            <ArrowLeft size={16} /> Shipments
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pickup &amp; Tracking</h1>
          <p className="text-sm text-gray-400 mt-1">Track shipments and authorize customer pickup</p>
        </div>

        <div className="px-4 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Truck size={16} className="text-gray-500 dark:text-blue-300/60" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Carrier Tracking</p>
            </div>
            <div className="space-y-3">
              {shipments.map((s) => <TrackingCard key={s.id} s={s} mobile />)}
            </div>
            <InfoNote>Live carrier tracking requires FedEx / UPS carrier integration.</InfoNote>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <PackageCheck size={16} className="text-gray-500 dark:text-blue-300/60" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Ready for Pickup</p>
            </div>
            <p className="flex items-center gap-1 text-xs text-gray-400 mb-3"><MapPin size={12} /> PCS Wireless MLC, Miami FL</p>
            <div className="space-y-3">
              {pickupShipments.map((s) => (
                <div key={s.id} className="bg-white dark:bg-[#152035] rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.desc} &middot; {s.units} units</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 whitespace-nowrap">Ready for Pickup</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#152035] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/5">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Saved Drivers</p>
              <button onClick={() => setShowForm((v) => !v)} className="flex items-center gap-1 text-xs text-blue-600 font-medium"><Plus size={14} /> Add Driver</button>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-white/5">
              {drivers.map((d) => <DriverRow key={d.id} d={d} />)}
            </div>
            {showForm && <AddDriverForm />}
          </div>

          <AuthSection mobile />
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block md:p-4 xl:p-8">
        <Link href="/shipments" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline mb-3">
          <ArrowLeft size={16} /> Back to Shipments
        </Link>
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pickup &amp; Tracking</h1>
          <p className="text-sm text-gray-400 mt-1">Track shipments and authorize customer pickup</p>
        </div>

        <div className="grid grid-cols-3 gap-4 items-start">
          {/* Left col: carrier tracking + pickup eligible */}
          <div className="col-span-2 space-y-4">
            <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Truck size={16} className="text-gray-500 dark:text-blue-300/60" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Carrier Tracking</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {shipments.map((s) => <TrackingCard key={s.id} s={s} />)}
              </div>
              <InfoNote>Live carrier tracking requires FedEx / UPS carrier integration.</InfoNote>
            </div>

            <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-1">
                <PackageCheck size={16} className="text-gray-500 dark:text-blue-300/60" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Ready for Pickup</p>
              </div>
              <p className="flex items-center gap-1 text-xs text-gray-400 mb-4"><MapPin size={12} /> PCS Wireless MLC, Miami FL</p>
              <div className="border border-gray-100 dark:border-gray-700 rounded-lg divide-y divide-gray-50 dark:divide-gray-700">
                {pickupShipments.map((s) => (
                  <div key={s.id} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Order {s.order} &middot; {s.desc} &middot; {s.units} units</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">Ready for Pickup</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Saved Pickup Contacts / Drivers</p>
                <button onClick={() => setShowForm((v) => !v)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors">
                  <Plus size={14} /> Add Driver
                </button>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-700">
                {drivers.map((d) => <DriverRow key={d.id} d={d} />)}
              </div>
              {showForm && <AddDriverForm />}
            </div>
          </div>

          {/* Right col: authorization (sticky) */}
          <div className="sticky top-4">
            <AuthSection />
          </div>
        </div>
      </div>
    </>
  )
}
