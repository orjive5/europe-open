import '../globals.css'
import type { Metadata } from 'next'
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ReactQueryProvider } from '@/lib/ReactQueryProvider';
import { ThemeProvider } from "@/components/themeProvider";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster"
import { Hanken_Grotesk } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
const hanken = Hanken_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Europe Open',
  description: 'Europe Open is an online music competition platform for classical musicians where music students from around the world submit their performance videos for evaluation by a professional jury.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ReactQueryProvider>
      <html lang="en">
        <body>
          <Analytics />
          <main className={`${hanken.className} p-2 sm:p-4 md:p-8 flex flex-col items-center gap-8 mx-auto min-h-screen w-full`}>
            <NextTopLoader
              color='#ea580c'
              showSpinner={false}
            />
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </main>
          <Toaster />
        </body>
      </html>
    </ReactQueryProvider>
  )
}