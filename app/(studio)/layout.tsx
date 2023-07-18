import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Qualion',
  description: 'Bleeding-edge science, tech, and AI news',
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
