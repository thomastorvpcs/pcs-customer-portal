import { Search, Bell } from 'lucide-react'

export default function Header() {
  return (
    <div className="flex items-center justify-end gap-3 px-8 py-4 bg-white border-b border-gray-100">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search..."
          className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button className="p-2 text-gray-500 hover:text-gray-700">
        <Bell size={18} />
      </button>
      <div className="w-8 h-8 rounded-full bg-[#0b1b3a] flex items-center justify-center text-white text-sm font-semibold">
        M
      </div>
    </div>
  )
}
