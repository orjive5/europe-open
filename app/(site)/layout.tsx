import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { getPages } from '@/sanity/sanity-utils';
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Qualion',
  description: 'Bleeding-edge science, tech, and AI',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // get all of our pages
  const pages = await getPages();
  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto py-10">
        <header className='flex items-center justify-between'>
          <Link
            href="/"
            className='flex items-center gap-5'
          >
            <Image
              src="/qualion-logo.png"
              alt="Logo"
              width="32"
              height="32"
            />
            Qualion
          </Link>
          <div className='flex items-center gap-5 text-sm text-gray-600'>
            {pages.map(page => {
              return (
                <Link
                  key={page._id}
                  href={`/${page.slug}`}
                  className='hover:underline'
                >
                  {page.title}
                </Link>
              )
            })}
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
