'use client'

// Per-device evidence uploader. UI-only: files are previewed client-side via
// object URLs and never uploaded/persisted. Accepts images and MP4 video.

import { useRef } from 'react'
import { UploadCloud, X, Film } from 'lucide-react'

const ACCEPT = 'image/png,image/jpeg,image/jpg,video/mp4'

export default function ImageUploader({ files = [], onChange, compact = false }) {
  const inputRef = useRef(null)

  const addFiles = (fileList) => {
    const added = Array.from(fileList).map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
      isVideo: f.type.startsWith('video'),
    }))
    onChange([...files, ...added])
  }

  const remove = (i) => {
    const f = files[i]
    if (f?.url) URL.revokeObjectURL(f.url)
    onChange(files.filter((_, idx) => idx !== i))
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`w-full border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer ${compact ? 'px-3 py-4' : 'px-4 py-6'}`}
      >
        <UploadCloud size={compact ? 20 : 24} className="text-gray-400 dark:text-blue-300/50 mb-1" />
        <p className="text-xs font-medium text-gray-600 dark:text-gray-300">Add photos / video</p>
        <p className="text-[10px] text-gray-400 dark:text-blue-300/50 mt-0.5">PNG, JPG, MP4 · up to 10MB each</p>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) addFiles(e.target.files)
          e.target.value = ''
        }}
      />

      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {files.map((f, i) => (
            <div key={`${f.name}-${i}`} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-[#1a2540] group">
              {f.isVideo ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-blue-300/50">
                  <Film size={22} />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${f.name}`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
