import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Europe Open',
  description: 'Europe Open is an online music competition platform for classical musicians — a web app where music students from around the world submit their performance videos for evaluation by a professional jury.',
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
