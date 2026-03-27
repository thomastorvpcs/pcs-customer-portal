import './globals.css'

export const metadata = {
  title: 'PCS Wireless Customer Portal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
