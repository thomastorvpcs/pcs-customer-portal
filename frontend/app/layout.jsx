import './globals.css'

export const metadata = {
  title: 'PCS Wireless Customer Portal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">{children}</body>
    </html>
  )
}
