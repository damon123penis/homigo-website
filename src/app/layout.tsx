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

          /* Mobile menu dropdown: closer + smoother */
          #mobile-nav-panel {
            margin-top: 0.5rem;
            opacity: 0;
            transform: translateY(-6px) scale(0.98);
            pointer-events: none;
            transition: opacity 160ms ease, transform 160ms ease;
            transform-origin: top left;
          }
          details[open] #mobile-nav-panel {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
          }
        `}</style>

        {/* Header / Navigation */}
        <header
          id="site-header"
          className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur transition-all duration-200"
        >
          <div
            id="site-header-inner"
            className="mx-auto relative flex max-w-6xl items-center justify-center md:justify-between px-6 py-4 transition-all duration-200"
          >
            <Link
              id="site-logo"
              href="/"
              className="mx-auto flex items-center gap-3 md:mx-0"
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
                href="/shop"
                className={navClass(isActive('/shop'))}
                aria-current={
                  isActive('/shop') ? 'page' : undefined
                }
              >
                Shop
              </Link>
              <Link
                href="/beratung"
                className={navClass(isActive('/beratung'))}
                aria-current={
                  isActive('/beratung') ? 'page' : undefined
                }
              >
                Beratung
              </Link>
              <Link
                href="/smart-home-generator"
                className={navClass(isActive('/smart-home-generator'))}
                aria-current={isActive('/smart-home-generator') ? 'page' : undefined}
              >
                Smart Home Generator
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
              href="https://calendly.com/homigo-de/30min"
              data-ga-cta="erstgespraech"
              data-ga-position="header"
              className="hidden md:inline-flex rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            >
              Erstgespräch buchen
            </a>

            {/* Mobile menu (no JS) */}
            <details className="absolute left-0 top-1/2 -translate-y-1/2 md:hidden">
              <summary
                aria-label="Menü öffnen"
                className="cursor-pointer list-none rounded-2xl border border-slate-200 bg-white p-2 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              >
                <span className="sr-only">Menü</span>
                <span aria-hidden="true" className="block w-6">
                  <span className="block h-0.5 w-full rounded bg-slate-900" />
                  <span className="mt-1.5 block h-0.5 w-full rounded bg-slate-900" />
                  <span className="mt-1.5 block h-0.5 w-full rounded bg-slate-900" />
                </span>
              </summary>
              <div
                id="mobile-nav-panel"
                className="absolute left-0 w-64 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
              >
                <div className="flex flex-col p-2.5">
                  <Link
                    href="/shop"
                    className={mobileNavClass(isActive('/shop'))}
                    aria-current={
                      isActive('/shop') ? 'page' : undefined
                    }
                  >
                    Shop
                  </Link>
                  <Link
                    href="/beratung"
                    className={mobileNavClass(isActive('/beratung'))}
                    aria-current={
                      isActive('/beratung') ? 'page' : undefined
                    }
                  >
                    Beratung
                  </Link>
                  <Link
                    href="/smart-home-generator"
                    className={mobileNavClass(isActive('/smart-home-generator'))}
                    aria-current={
                      isActive('/smart-home-generator') ? 'page' : undefined
                    }
                  >
                    Smart Home Generator
                  </Link>
                  <Link
                    href="/kontakt"
                    className={mobileNavClass(isActive('/kontakt'))}
                    aria-current={isActive('/kontakt') ? 'page' : undefined}
                  >
                    Kontakt
                  </Link>
                  <div className="my-2.5 h-px bg-slate-200" />
                  <a
                    href="https://calendly.com/homigo-de/30min"
                    data-ga-cta="erstgespraech"
                    data-ga-position="mobile_menu"
                    className="rounded-xl bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-slate-900 hover:bg-emerald-400"
                  >
                    Erstgespräch buchen
                  </a>
        {/* GA4 CTA Tracking – Erstgespräch buchen (consent-aware) */}
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
                  <Link href="/pages/agb" className="hover:text-slate-900">
                    AGB
                  </Link>
                  <Link href="/impressum" className="hover:text-slate-900">
                    Impressum
                  </Link>
                  <Link href="/datenschutz" className="hover:text-slate-900">
                    Datenschutz
                  </Link>
                  <Link href="/widerruf" className="hover:text-slate-900">
                    Widerrufsbelehrung
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
                <a
                  href="https://www.instagram.com/homigo_de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900"
                >
                  Instagram: @homigo_de
                </a>
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


        {/* GA4 setup (loaded only after Klaro consent via service callback) */}
        <Script id="ga4-setup" strategy="afterInteractive">
          {`
            (function () {
              var GA_ID = '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}';
              if (!GA_ID) return;

              window.__HOMIGO_GA_ID__ = GA_ID;

              window.homigoLoadGA4 = function () {
                try {
                  if (window.gtag) return;

                  var s = document.createElement('script');
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
                  s.async = true;
                  document.head.appendChild(s);

                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;

                  gtag('js', new Date());
                  gtag('config', GA_ID, {
                    anonymize_ip: true,
                    send_page_view: true
                  });
                } catch (e) {
                  // ignore
                }
              };
            })();
          `}
        </Script>
        <Script id="ga4-cta-tracking" strategy="afterInteractive">
          {`
            (function () {
              document.addEventListener('click', function (e) {
                var el = e.target && e.target.closest && e.target.closest('[data-ga-cta="erstgespraech"]');
                if (!el) return;

                // Only track if GA is active (consent given)
                if (typeof window.gtag !== 'function') return;

                try {
                  window.gtag('event', 'cta_erstgespraech_click', {
                    event_category: 'engagement',
                    event_label: 'erstgespraech',
                    position: el.getAttribute('data-ga-position') || 'unknown',
                    page_path: window.location.pathname
                  });
                } catch (e) {
                  // ignore
                }
              }, true);
            })();
          `}
        </Script>
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
                    description: 'Wir nutzen Cookies für Statistik und externe Inhalte (z. B. Terminbuchung).',
                    learnMore: 'Einstellungen',
                    acceptAll: 'Alle akzeptieren',
                    decline: 'Ablehnen'
                  },
                  purposes: {
                    analytics: 'Statistik',
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
                  onlyOnce: true,
                  callback: function(consent, service) {
                    var GA_ID = window.__HOMIGO_GA_ID__;

                    if (consent) {
                      if (window.homigoLoadGA4) {
                        window.homigoLoadGA4();
                      }
                      return;
                    }

                    // Consent revoked: stop further tracking immediately
                    try {
                      // 1) Disable further dispatches for this GA4 property
                      if (GA_ID) {
                        window['ga-disable-' + GA_ID] = true;
                      }

                      // 2) Ask gtag Consent Mode to deny analytics storage (if gtag is present)
                      if (typeof window.gtag === 'function') {
                        window.gtag('consent', 'update', {
                          analytics_storage: 'denied'
                        });
                      }

                      // 3) Best-effort: remove GA cookies immediately
                      var host = window.location.hostname;
                      function expireCookie(name, domain) {
                        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + domain;
                      }
                      var cookies = document.cookie ? document.cookie.split(';') : [];
                      cookies.forEach(function (c) {
                        var name = c.split('=')[0].trim();
                        if (/^_ga/.test(name) || /^_gid$/.test(name) || /^_gat/.test(name) || /^_gac_/.test(name)) {
                          // current host
                          expireCookie(name, host);
                          // parent domain
                          if (host.split('.').length > 2) {
                            expireCookie(name, '.' + host.split('.').slice(-2).join('.'));
                          } else {
                            expireCookie(name, '.' + host);
                          }
                          // no-domain fallback
                          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
                        }
                      });

                      // 4) If GA script was already loaded, reload once so no GA code remains active in memory.
                      // Some browsers may continue to send queued beacons in the current session otherwise.
                      if (!sessionStorage.getItem('homigoGaRevokedReloaded')) {
                        sessionStorage.setItem('homigoGaRevokedReloaded', '1');
                        if (window.gtag) {
                          setTimeout(function () {
                            window.location.reload();
                          }, 50);
                        }
                      }
                    } catch (e) {
                      // ignore
                    }
                  }
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

        {/* Close mobile menu after click/tap outside (no client component needed) */}
        <Script id="mobile-menu-close" strategy="afterInteractive">
          {`
            (function () {
              function bind() {
                var panel = document.getElementById('mobile-nav-panel');
                if (!panel) return;

                var details = panel.closest('details');
                if (!details) return;

                // Close when a link/button inside the panel is clicked
                panel.addEventListener('click', function (e) {
                  var t = e.target;
                  if (!t) return;

                  var el = t.closest('a,button');
                  if (!el) return;

                  if (details.open) {
                    details.open = false;
                  }
                });

                // Tap/click outside to close
                document.addEventListener(
                  'click',
                  function (e) {
                    if (!details.open) return;
                    var t = e.target;
                    if (!t) return;

                    // If the click is inside the details (summary or panel), do nothing
                    if (t.closest('details') === details) return;

                    details.open = false;
                  },
                  true
                );

                // ESC to close (nice-to-have)
                document.addEventListener('keydown', function (e) {
                  if (!details.open) return;
                  if (e.key === 'Escape') {
                    details.open = false;
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


        <Analytics />
      </body>
    </html>
  )
}