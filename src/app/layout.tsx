import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.homigo.tech'),
  alternates: {
    canonical: 'https://www.homigo.tech/',
  },
  title: 'homigo - Smart Home Beratung',
  description:
    'Smart Home ohne Kabelsalat. Dein persönlicher Service für einfache, digitale Smart-Home-Lösungen in der Rhein-Main-Region.',
  keywords: 'Smart Home, Beratung, Rhein-Main, Hausautomation',
  authors: [{ name: 'homigo' }],
  creator: 'homigo',
  publisher: 'homigo',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
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
  // Server-side active nav highlighting (no client component required)
  const h = headers()
  const rawUrl =
    h.get('next-url') || h.get('x-next-url') || h.get('x-original-url') || '/'
  const pathname = rawUrl.split('?')[0]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  const navClass = (active: boolean) =>
    active
      ? 'text-sm font-semibold text-slate-900 underline decoration-emerald-500 decoration-2 underline-offset-8'
      : 'text-sm font-medium text-slate-700 hover:text-slate-900'

  const mobileNavClass = (active: boolean) =>
    active
      ? 'rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 bg-slate-50'
      : 'rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900'

  return (
    <html lang="de">
      <body className={inter.className}>
        {/* Skip link (Accessibility) */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow"
        >
          Zum Inhalt springen
        </a>
        <style>{`
          /* Responsive logo sizing */
          #site-logo img {
            height: 44px;
            width: auto;
            transition: transform 200ms ease;
          }
          @media (min-width: 640px) {
            #site-logo img {
              height: 52px;
            }
          }

          /* Subtle hover animation */
          #site-logo:hover img {
            transform: scale(1.02);
          }

          /* Shrink header on scroll */
          #site-header.scrolled {
            box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
          }
          #site-header.scrolled #site-header-inner {
            padding-top: 0.6rem;
            padding-bottom: 0.6rem;
          }
          #site-header.scrolled #site-logo img {
            height: 38px;
          }
          @media (min-width: 640px) {
            #site-header.scrolled #site-logo img {
              height: 46px;
            }
          }

          /* Make mobile header slightly more compact */
          @media (max-width: 767px) {
            #site-header-inner {
              padding-top: 0.75rem;
              padding-bottom: 0.75rem;
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }

          /* Mobile menu dropdown: slightly closer + aligned */
          #mobile-nav-panel {
            margin-top: 0.5rem;
          }

          /* Hide sticky CTA when footer is visible */
          #mobile-sticky-cta.is-hidden {
            opacity: 0;
            transform: translateY(12px);
            pointer-events: none;
          }
          #mobile-sticky-cta {
            transition: opacity 180ms ease, transform 180ms ease;
          }
        `}</style>

        {/* Header / Navigation */}
        <header
          id="site-header"
          className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur transition-all duration-200"
        >
          <div
            id="site-header-inner"
            className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-all duration-200"
          >
            <Link
              id="site-logo"
              href="/"
              className="flex items-center gap-3"
              aria-label="homigo Startseite"
            >
              <Image
                src="/images/Logo.png"
                alt="homigo – Smart Home ohne Kabelsalat"
                width={220}
                height={60}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden items-center gap-6 md:flex"
              aria-label="Hauptnavigation"
            >
              <Link
                href="/leistungen-im-detail"
                className={navClass(isActive('/leistungen-im-detail'))}
                aria-current={
                  isActive('/leistungen-im-detail') ? 'page' : undefined
                }
              >
                Leistungen
              </Link>
              <Link
                href="/customerjourney"
                className={navClass(isActive('/customerjourney'))}
                aria-current={isActive('/customerjourney') ? 'page' : undefined}
              >
                So arbeiten wir
              </Link>
              <Link
                href="/kontakt"
                className={navClass(isActive('/kontakt'))}
                aria-current={isActive('/kontakt') ? 'page' : undefined}
              >
                Kontakt
              </Link>
            </nav>

            {/* Primary CTA */}
            <a
              href="https://calendly.com/deinname/erstberatung"
              className="hidden rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 md:inline-flex"
            >
              Erstgespräch buchen
            </a>

            {/* Mobile menu (no JS) */}
            <details className="relative md:hidden">
              <summary className="cursor-pointer list-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                Menü
              </summary>
              <div
                id="mobile-nav-panel"
                className="absolute right-0 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
              >
                <div className="flex flex-col p-2">
                  <Link
                    href="/leistungen-im-detail"
                    className={mobileNavClass(isActive('/leistungen-im-detail'))}
                    aria-current={
                      isActive('/leistungen-im-detail') ? 'page' : undefined
                    }
                  >
                    Leistungen
                  </Link>
                  <Link
                    href="/customerjourney"
                    className={mobileNavClass(isActive('/customerjourney'))}
                    aria-current={
                      isActive('/customerjourney') ? 'page' : undefined
                    }
                  >
                    So arbeiten wir
                  </Link>
                  <Link
                    href="/kontakt"
                    className={mobileNavClass(isActive('/kontakt'))}
                    aria-current={isActive('/kontakt') ? 'page' : undefined}
                  >
                    Kontakt
                  </Link>
                  <div className="my-2 h-px bg-slate-200" />
                  <a
                    href="https://calendly.com/deinname/erstberatung"
                    className="rounded-xl bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-slate-900 hover:bg-emerald-400"
                  >
                    Erstgespräch buchen
                  </a>
                </div>
              </div>
            </details>
          </div>
        </header>

        {/* Main content */}
        <main id="main" className="pb-28 md:pb-0">
          {children}
        </main>

        {/* Footer */}
        <footer id="site-footer" className="border-t border-slate-200 bg-white pb-28 md:pb-0">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="grid items-center gap-6 md:grid-cols-3">
              {/* Left */}
              <div className="flex flex-col items-center gap-2 text-center text-sm text-slate-600 md:items-start md:text-left">
                <Link href="/leistungen-im-detail" className="hover:text-slate-900">
                  Leistungen
                </Link>
                <Link href="/customerjourney" className="hover:text-slate-900">
                  So arbeiten wir
                </Link>
                <Link href="/kontakt" className="hover:text-slate-900">
                  Kontakt
                </Link>
              </div>

              {/* Center (always centered logo) */}
              <div className="flex items-center justify-center">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  aria-label="homigo Startseite"
                >
                  <Image
                    src="/images/Logo.png"
                    alt="homigo"
                    width={120}
                    height={32}
                    priority={false}
                  />
                </Link>
              </div>

              {/* Right */}
              <div className="flex flex-col items-center gap-2 text-center text-sm text-slate-600 md:items-end md:text-right">
                <a href="mailto:hallo@homigo.tech" className="hover:text-slate-900">
                  hallo@homigo.tech
                </a>
                <a href="tel:+4915227178595" className="hover:text-slate-900">
                  +49 152 27178595
                </a>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-end">
                  <Link href="/impressum" className="hover:text-slate-900">
                    Impressum
                  </Link>
                  <Link href="/datenschutz" className="hover:text-slate-900">
                    Datenschutz
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row">
              <p>© {new Date().getFullYear()} homigo. Alle Rechte vorbehalten.</p>

              {/* No React onClick in Server Component: wired up via Script below */}
              <button
                type="button"
                data-klaro-open
                className="font-semibold text-emerald-700 hover:text-emerald-600"
              >
                Cookie-Einstellungen
              </button>
            </div>
          </div>
        </footer>

        {/* Mobile sticky CTA (Conversion) */}
        <div id="mobile-sticky-cta" className="fixed bottom-4 left-0 right-0 z-40 px-4 pb-[env(safe-area-inset-bottom)] md:hidden">
          <div className="mx-auto flex max-w-md items-center justify-center rounded-2xl bg-slate-900/90 p-2 shadow-lg backdrop-blur">
            <a
              href="https://calendly.com/deinname/erstberatung"
              className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-emerald-400"
            >
              Kostenloses Kennenlernen buchen
            </a>
          </div>
        </div>

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

        {/* Wire up footer cookie button (no client component needed) */}
        <Script id="klaro-open-handler" strategy="afterInteractive">
          {`
            (function () {
              function bind() {
                var btn = document.querySelector('[data-klaro-open]');
                if (!btn) return;
                btn.addEventListener('click', function () {
                  if (window.klaro && typeof window.klaro.show === 'function') {
                    window.klaro.show();
                  }
                });
              }
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', bind);
              } else {
                bind();
              }
            })();
          `}
        </Script>

        {/* Header shrink on scroll (no client component needed) */}
        <Script id="header-scroll-shrink" strategy="afterInteractive">
          {`
            (function () {
              var header = document.getElementById('site-header');
              if (!header) return;

              function onScroll() {
                if (window.scrollY > 8) header.classList.add('scrolled');
                else header.classList.remove('scrolled');
              }

              onScroll();
              window.addEventListener('scroll', onScroll, { passive: true });
            })();
          `}
        </Script>

        {/* Hide sticky CTA when footer is visible (better UX) */}
        <Script id="sticky-cta-hide-on-footer" strategy="afterInteractive">
          {`
            (function () {
              var cta = document.getElementById('mobile-sticky-cta');
              var footer = document.getElementById('site-footer');
              if (!cta || !footer) return;

              // Prefer IntersectionObserver if available
              if ('IntersectionObserver' in window) {
                var io = new IntersectionObserver(function (entries) {
                  var entry = entries && entries[0];
                  if (!entry) return;
                  if (entry.isIntersecting) cta.classList.add('is-hidden');
                  else cta.classList.remove('is-hidden');
                }, { root: null, threshold: 0.01 });

                io.observe(footer);
                return;
              }

              // Fallback: simple scroll check
              function onScroll() {
                var footerRect = footer.getBoundingClientRect();
                var viewH = window.innerHeight || document.documentElement.clientHeight;
                var isVisible = footerRect.top < viewH && footerRect.bottom > 0;
                if (isVisible) cta.classList.add('is-hidden');
                else cta.classList.remove('is-hidden');
              }

              onScroll();
              window.addEventListener('scroll', onScroll, { passive: true });
            })();
          `}
        </Script>

        <Analytics />
      </body>
    </html>
  )
}