'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Play, Search, ScanLine,
  ClipboardCheck, Sparkles, BatteryCharging, ChevronDown, Camera, X, Store,
} from 'lucide-react'
import { GRADES, COMPARE_ROWS } from '@/lib/grades'

const processSteps = [
  { icon: ScanLine, title: 'Inspect', text: 'Every device is examined for cosmetic condition — screen, housing, and edges.' },
  { icon: ClipboardCheck, title: 'Full functional test', text: 'A multi-point test verifies buttons, cameras, sensors, speakers, and connectivity.' },
  { icon: Sparkles, title: 'Clean & grade', text: 'Units are professionally cleaned and assigned a grade based on cosmetic wear.' },
  { icon: ShieldCheck, title: 'Certify', text: 'Each device is data-wiped, certified, and prepared for shipment.' },
]

const faqs = [
  { q: 'Are all devices tested, regardless of grade?', a: 'Yes. Every device — Grade A or Grade B — passes the same full functional test. The grade only reflects cosmetic condition, never how the device works.' },
  { q: 'What does the grade actually refer to?', a: 'Primarily the cosmetic appearance: scratches, scuffs, and general signs of use on the screen and housing. All grades are fully functional and certified.' },
  { q: 'Will a Grade B device perform worse than Grade A?', a: 'No. Performance and functionality are identical. The difference is purely how the device looks, which is why Grade B costs less.' },
  { q: 'What about battery health?', a: 'Grade A devices ship with battery health of 90% or higher; Grade B with 80% or higher (for devices that have a battery).' },
  { q: 'Can I filter the catalog by grade?', a: 'Yes. Use the Grade filter in the catalog sidebar to show only the grades you want.' },
]

export default function GradesPage() {
  const [activeSlug, setActiveSlug] = useState(null)
  const [openFaq, setOpenFaq] = useState(0)
  const [lightbox, setLightbox] = useState(null) // { grade, index }

  // Deep-link support: /catalog/grades#grade-a scrolls to and highlights a grade
  useEffect(() => {
    const applyHash = () => {
      const slug = window.location.hash.replace('#', '')
      if (!slug) return
      setActiveSlug(slug)
      const el = document.getElementById(slug)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  // Fade the highlight out after the scroll settles
  useEffect(() => {
    if (!activeSlug) return
    const t = setTimeout(() => setActiveSlug(null), 2600)
    return () => clearTimeout(t)
  }, [activeSlug])

  // Lightbox keyboard nav
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((l) => l && { ...l, index: (l.index + 1) % l.grade.examples.length })
      if (e.key === 'ArrowLeft') setLightbox((l) => l && { ...l, index: (l.index - 1 + l.grade.examples.length) % l.grade.examples.length })
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [lightbox])

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">
      {/* Breadcrumb / back */}
      <Link href="/catalog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-blue-300/60 hover:text-gray-800 dark:hover:text-blue-100 transition-colors mb-5">
        <ArrowLeft size={15} /> Back to Catalog
      </Link>

      {/* Hero */}
      <div className="rounded-2xl p-6 md:p-8 bg-gradient-to-br from-[#0b1b3a] via-[#123164] to-blue-700 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full mb-3">
            <ShieldCheck size={13} /> Buyer Confidence
          </div>
          <h1 className="text-white font-bold text-2xl md:text-3xl leading-tight">Device Grading, Explained</h1>
          <p className="text-blue-100/80 text-sm md:text-base mt-2 leading-relaxed">
            Every device we sell is fully tested and certified. Grades describe how a device <span className="text-white font-medium">looks</span> — not how it works — so you always know exactly what you're buying.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {GRADES.map((g) => (
              <a key={g.slug} href={`#${g.slug}`} className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors">
                Jump to {g.name} <ArrowRight size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* How we grade */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">How every device is graded</h2>
        <p className="text-sm text-gray-500 dark:text-blue-300/60 mt-1">A consistent four-step process before any device reaches the catalog.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {processSteps.map((s, i) => (
            <div key={s.title} className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-white/5 p-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-[#0b1b3a]/5 dark:bg-white/5 flex items-center justify-center text-[#0b1b3a] dark:text-blue-300">
                  <s.icon size={18} />
                </div>
                <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600">0{i + 1}</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-3">{s.title}</p>
              <p className="text-xs text-gray-500 dark:text-blue-300/60 mt-1 leading-snug">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Per-grade sections */}
      {GRADES.map((g) => (
        <section
          key={g.slug}
          id={g.slug}
          className={`mt-8 scroll-mt-24 rounded-2xl border bg-white dark:bg-[#152035] p-5 md:p-6 transition-all duration-500 ${
            activeSlug === g.slug
              ? 'border-blue-400 dark:border-blue-500 ring-2 ring-blue-400/40'
              : 'border-gray-100 dark:border-white/5'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" style={{ backgroundColor: `${g.accent}1a`, color: g.accent }}>
                {g.code}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{g.name}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${g.badge}`}>{g.code}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-blue-300/60">{g.tagline}</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-4">{g.summary}</p>

          {/* Media: video + example gallery */}
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <GradeVideo grade={g} />
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Camera size={12} /> Example condition
              </p>
              <div className="grid grid-cols-3 gap-2">
                {g.examples.map((ex, idx) => (
                  <button
                    key={ex.view}
                    onClick={() => setLightbox({ grade: g, index: idx })}
                    className="group text-left"
                  >
                    <div className="relative rounded-lg overflow-hidden aspect-square border border-gray-100 dark:border-white/5" style={{ background: `linear-gradient(135deg, ${g.accent}14, ${g.accent}05)` }}>
                      {ex.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={ex.src} alt={`${g.name} ${ex.view}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Camera size={22} style={{ color: g.accent }} className="opacity-50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <Search size={16} className="text-white opacity-0 group-hover:opacity-90 transition-opacity" />
                      </div>
                      <span className="absolute top-1.5 left-1.5 text-[9px] font-semibold px-1.5 py-0.5 rounded bg-white/85 dark:bg-black/50 text-gray-700 dark:text-gray-100">{ex.view}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-blue-300/60 mt-1 leading-tight">{ex.caption}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* What to expect */}
          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            <div className="rounded-xl bg-gray-50 dark:bg-[#1e2d45] p-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">What to expect</p>
              <SpecRow icon={Search} label="Screen" value={g.spec.screen} />
              <SpecRow icon={ScanLine} label="Housing" value={g.spec.housing} />
              <SpecRow icon={CheckCircle2} label="Functionality" value={g.spec.functional} />
              <SpecRow icon={BatteryCharging} label="Battery" value={g.spec.battery} last />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">At a glance</p>
              <ul className="space-y-2">
                {g.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <CheckCircle2 size={16} style={{ color: g.accent }} className="flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
              <Link href={`/catalog?grade=${g.code}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0b1b3a] dark:text-blue-300 hover:underline">
                <Store size={15} /> Shop {g.name} devices <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* Comparison table */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Grade A vs Grade B at a glance</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-white/5">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#1e2d45]">
                <th className="text-left font-semibold text-gray-500 dark:text-blue-300/60 px-4 py-3 w-36"> </th>
                {GRADES.map((g) => (
                  <th key={g.slug} className="text-left px-4 py-3">
                    <span className="font-bold text-gray-900 dark:text-white">{g.name}</span>
                    <span className="block text-[11px] font-normal text-gray-400 dark:text-blue-300/50">{g.tagline}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.key} className="border-t border-gray-100 dark:border-white/5">
                  <td className="px-4 py-3 font-medium text-gray-500 dark:text-blue-300/60 align-top">{row.label}</td>
                  {GRADES.map((g) => (
                    <td key={g.slug} className="px-4 py-3 text-gray-700 dark:text-gray-200 align-top">{g.spec[row.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Frequently asked</h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white dark:bg-[#152035] rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{f.q}</span>
                <ChevronDown size={16} className={`text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <p className="px-4 pb-4 -mt-1 text-sm text-gray-500 dark:text-blue-300/60 leading-relaxed">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-8 rounded-2xl bg-white dark:bg-[#152035] border border-gray-100 dark:border-white/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-base font-bold text-gray-900 dark:text-white">Ready to browse?</p>
          <p className="text-sm text-gray-500 dark:text-blue-300/60 mt-0.5">Every device is tested, certified, and clearly graded.</p>
        </div>
        <Link href="/catalog" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#0b1b3a] text-white rounded-lg hover:bg-[#0d2147] transition-colors whitespace-nowrap">
          <Store size={16} /> Go to Catalog
        </Link>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onMouseDown={() => setLightbox(null)}>
          <div className="relative w-full max-w-lg" onMouseDown={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} aria-label="Close" className="absolute -top-10 right-0 text-white/80 hover:text-white"><X size={24} /></button>
            {(() => {
              const g = lightbox.grade
              const ex = g.examples[lightbox.index]
              return (
                <div className="bg-white dark:bg-[#152035] rounded-2xl overflow-hidden">
                  <div className="relative aspect-video flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${g.accent}22, ${g.accent}08)` }}>
                    {ex.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={ex.src} alt={`${g.name} ${ex.view}`} className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center">
                        <Camera size={40} style={{ color: g.accent }} className="opacity-60 mx-auto" />
                        <p className="text-xs text-gray-400 mt-2">Example photo coming soon</p>
                      </div>
                    )}
                    {g.examples.length > 1 && (
                      <>
                        <button onClick={() => setLightbox((l) => ({ ...l, index: (l.index - 1 + g.examples.length) % g.examples.length }))} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"><ArrowLeft size={16} /></button>
                        <button onClick={() => setLightbox((l) => ({ ...l, index: (l.index + 1) % g.examples.length }))} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"><ArrowRight size={16} /></button>
                      </>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${g.badge}`}>{g.name}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{ex.view}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-blue-300/60 mt-1">{ex.caption}</p>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

function SpecRow({ icon: Icon, label, value, last }) {
  return (
    <div className={`flex items-start gap-2.5 ${last ? '' : 'pb-3 mb-3 border-b border-gray-200/70 dark:border-white/5'}`}>
      <Icon size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{label}</p>
        <p className="text-xs text-gray-500 dark:text-blue-300/60 leading-snug mt-0.5">{value}</p>
      </div>
    </div>
  )
}

function GradeVideo({ grade }) {
  const isEmbed = grade.videoUrl && /youtube|youtu\.be|vimeo/.test(grade.videoUrl)
  return (
    <div>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
        <Play size={12} /> Walkthrough video
      </p>
      <div className="relative rounded-xl overflow-hidden aspect-video border border-gray-100 dark:border-white/5" style={{ background: `linear-gradient(135deg, ${grade.accent}1f, ${grade.accent}08)` }}>
        {grade.videoUrl ? (
          isEmbed ? (
            <iframe src={grade.videoUrl} title={`${grade.name} walkthrough`} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          ) : (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video src={grade.videoUrl} poster={grade.poster || undefined} controls className="w-full h-full object-cover" />
          )
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/80 dark:bg-black/40 flex items-center justify-center shadow-sm">
              <Play size={22} style={{ color: grade.accent }} className="ml-0.5" fill="currentColor" />
            </div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-3">{grade.name} example walkthrough</p>
            <p className="text-[11px] text-gray-400 dark:text-blue-300/50 mt-0.5">Video coming soon</p>
          </div>
        )}
      </div>
    </div>
  )
}
