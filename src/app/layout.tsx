import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

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

        {/* Klaro-Konfiguration (inline) */}
        <Script id="klaro-config" strategy="afterInteractive">
          {`
            window.klaroConfig = {
              elementID: 'klaro',
              storageMethod: 'cookie',
              storageName: 'klaro',
              cookieExpiresAfterDays: 365,
              default: false,

              translations: {
                de: {
                  privacyPolicyUrl: '/datenschutz',
                  consentNotice: {
                    description: 'Wir nutzen Cookies für Statistik, Marketing und externe Inhalte (z. B. Terminbuchung).',
                    learnMore: 'Einstellungen',
                    acceptAll: 'Alle akzeptieren',
                    decline: 'Ablehnen'
                  },
                  purposes: {
                    analytics: 'Statistik',
                    marketing: 'Marketing',
                    functional: 'Funktional'
                  }
                }
              },

              services: [
                {
                  name: 'google-analytics',
                  title: 'Google Analytics (GA4)',
                  purposes: ['analytics'],
                  cookies: [/^_ga/, /^_gid/, /^_gat/, /^_ga_/, /^_gac_/],
                  onlyOnce: true
                },
                {
                  name: 'meta-pixel',
                  title: 'Meta Pixel',
                  purposes: ['marketing'],
                  cookies: ['_fbp', 'fr'],
                  onlyOnce: true
                },
                {
                  name: 'calendly',
                  title: 'Calendly (Terminbuchung)',
                  purposes: ['functional'],
                  onlyOnce: true
                }
              ]
            };
          `}
        </Script>

        {/* Klaro-Library vom CDN */}
        <Script
          src="https://cdn.kiprotect.com/klaro/v0.7/klaro.js"
          strategy="afterInteractive"
        />

        <Analytics />
      </body>
    </html>
  )
}