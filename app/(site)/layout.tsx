import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getPages } from '@/sanity/sanity-utils';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Qualion',
  description: 'Bleeding-edge science, tech, and AI news',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // // get all of our pages
  const pages = await getPages();
  return (
    <html lang="en">
      <body className="mx-auto bg-primaryBg text-primaryTxt">
        <Header pages={pages} />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
