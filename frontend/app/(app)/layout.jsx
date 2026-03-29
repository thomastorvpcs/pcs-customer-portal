import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import MobileNav from '@/components/MobileNav'

export default function AppLayout({ children }) {
  return (
    <div className="flex md:h-screen md:overflow-hidden bg-[#f1f5f9] dark:bg-[#0d1829] flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav />
        <Header />
        <main className="flex-1 md:overflow-auto md:min-h-0 bg-[#f1f5f9] dark:bg-[#0d1829] pb-16 md:pb-0">
          {children}
        </main>
      </div>
    </div>
  )
}
