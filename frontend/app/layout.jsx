import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata = {
  title: 'PCS Wireless Customer Portal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="md:h-screen md:overflow-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
