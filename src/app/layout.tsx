import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'homigo - Smart Home Beratung',
  description: 'Smart Home ohne Kabelsalat. Dein persönlicher Service für einfache, digitale Smart-Home-Lösungen in der Rhein-Main-Region.',
  keywords: 'Smart Home, Beratung, Rhein-Main, Hausautomation, Damon',
  authors: [{ name: 'homigo' }],
  creator: 'homigo',
  publisher: 'homigo',
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1B4A5C',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}