import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Europe Open',
  description: 'Europe Open online music competition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}
