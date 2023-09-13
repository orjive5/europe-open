import '../globals.css'
import type { Metadata } from 'next'
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ReactQueryProvider } from '@/lib/ReactQueryProvider';
import { ThemeProvider } from "@/components/themeProvider";
import NextTopLoader from 'nextjs-toploader';
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

  return (
    <ReactQueryProvider>
      <html lang="en">
          <body>
            <main style={montserrat.style} className="p-8 flex flex-col gap-8 mx-auto min-h-screen w-full">
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
          </body>
      </html>
    </ReactQueryProvider>
  )
}