import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-auto min-h-0 bg-[#f1f5f9]">
          {children}
        </main>
      </div>
    </div>
  )
}
