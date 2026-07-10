'use client'

// Horizontal step indicator for the RMA submission wizard.
// Mirrors the pattern in app/apply/page.jsx.

import { Check } from 'lucide-react'

export default function WizardSteps({ steps, step }) {
  return (
    <div className="flex items-center justify-between mb-6">
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
  )
}
