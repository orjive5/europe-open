import '../globals.css'
import type { Metadata } from 'next'
import { getPages } from '@/sanity/sanity-utils';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ReactQueryProvider } from '@/lib/ReactQueryProvider';
import { ThemeProvider } from "@/components/themeProvider";

import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Europe Open',
  description: 'Europe Open online music competition',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // // get all of our pages from Sanity
  const pages = await getPages();
  return (
    <ReactQueryProvider>
      <html lang="en">
          <body style={montserrat.style} className="flex flex-col justify-between mx-auto h-screen min-w-full">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header />
                <main>
                    {children}
                </main>
              <Footer />
            </ThemeProvider>
          </body>
      </html>
    </ReactQueryProvider>
  )
}