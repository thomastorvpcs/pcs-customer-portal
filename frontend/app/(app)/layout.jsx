import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        {children}
      </div>
    </div>
  )
}
