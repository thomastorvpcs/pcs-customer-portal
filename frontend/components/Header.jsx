import { Search, Bell } from 'lucide-react'

export default function Header() {
  return (
    <div className="flex items-center justify-end gap-3 px-8 py-4 bg-white dark:bg-[#152035] border-b border-gray-100 dark:border-gray-700">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          placeholder="Search..."
          className="pl-8 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#1e2d45] text-gray-800 dark:text-gray-200 placeholder-gray-400"
        />
      </div>
      <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
        <Bell size={18} />
      </button>
      <div className="w-8 h-8 rounded-full bg-[#0b1b3a] flex items-center justify-center text-white text-sm font-semibold">
        J
      </div>
    </div>
  )
}
