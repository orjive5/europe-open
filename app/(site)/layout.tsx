import '../globals.css'
import type { Metadata } from 'next'
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ReactQueryProvider } from '@/lib/ReactQueryProvider';
import { ThemeProvider } from "@/components/themeProvider";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster"
import { Hanken_Grotesk } from 'next/font/google'
const hanken = Hanken_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Europe Open',
  description: 'Europe Open online music competition',
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
              <main style={hanken.style} className="p-2 sm:p-4 md:p-8 flex flex-col items-center gap-8 mx-auto min-h-screen w-full">
                <NextTopLoader
                  color='#ea580c'
                  showSpinner={false}
                />
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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