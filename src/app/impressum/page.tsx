// src/app/impressum/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Impressum | homigo – Smart Home ohne Kabelsalat',
  description:
    'Impressum und Anbieterkennzeichnung für homigo. Smart-Home-Beratung online bundesweit und vor Ort in der Rhein-Main-Region.',
  alternates: {
    canonical: 'https://www.homigo.tech/impressum',
  },
  robots: { index: true, follow: true },
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Header / Intro */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="bg-slate-900 px-6 py-10 text-white sm:px-10">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Impressum</h1>
              <p className="mt-3 text-base text-slate-200 sm:text-lg">
                Anbieterkennzeichnung und rechtliche Informationen.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
                >
                  Kontakt
                </Link>
                <Link
                  href="/datenschutz"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15"
                >
                  Datenschutz
                </Link>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-10 sm:px-10">
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Left column */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-slate-900">Anbieter</h2>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <address className="not-italic text-sm text-slate-700">
                      <p className="text-base font-semibold text-slate-900">Damon Marcel Schacht</p>
                      <p className="mt-1">homigo – Smart Home Beratung</p>

                      <div className="mt-4 flex items-start gap-3">
                        <MapPin className="mt-0.5 h-5 w-5 text-emerald-700" />
                        <div>
                          <p className="font-semibold text-slate-900">Anschrift</p>
                          <p className="text-slate-600">Frankenallee 23A</p>
                          <p className="text-slate-600">60327 Frankfurt am Main</p>
                          <p className="text-xs text-slate-500">Deutschland</p>
                          <div className="mt-4">
                            <p className="font-semibold text-slate-900">Steuer-ID</p>
                            <p className="text-slate-600">DE454607218</p>
                          </div>
                        </div>
                      </div>
                    </address>
                  </div>

                  <h3 className="mt-8 text-lg font-bold text-slate-900">Kontakt</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                        <Mail className="h-5 w-5 text-emerald-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">E-Mail</p>
                        <a
                          href="mailto:hallo@homigo.tech"
                          className="block truncate text-sm text-emerald-700 hover:text-emerald-600 hover:underline"
                        >
                          hallo@homigo.tech
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                        <Phone className="h-5 w-5 text-emerald-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">Telefon</p>
                        <a
                          href="tel:+4915227178595"
                          className="block truncate text-sm text-emerald-700 hover:text-emerald-600 hover:underline"
                        >
                          +49 152 27178595
                        </a>
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-8 text-lg font-bold text-slate-900">Geschäftstätigkeit</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Smart-Home-Beratung und Konfiguration in der Rhein-Main-Region sowie bundesweite Online-Beratung
                    für einfache, digitale Smart-Home-Lösungen.
                  </p>

                  <h3 className="mt-8 text-lg font-bold text-slate-900">
                    Verbraucherstreitbeilegung / Universalschlichtungsstelle
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                    teilzunehmen.
                  </p>
                </div>
              </div>

              {/* Right column */}
              <aside className="lg:col-span-5">
                <div className="space-y-4 lg:sticky lg:top-24">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-slate-900">Schnelllinks</h3>
                    <div className="mt-4 grid gap-2">
                      <Link
                        href="/leistungen-im-detail"
                        className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        Pakete & Preise
                        <ExternalLink className="h-4 w-4 text-slate-500" />
                      </Link>
                      <Link
                        href="/customerjourney"
                        className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        Prozess
                        <ExternalLink className="h-4 w-4 text-slate-500" />
                      </Link>
                      <Link
                        href="/smart-home-generator"
                        className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        Smart Home Generator
                        <ExternalLink className="h-4 w-4 text-slate-500" />
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-emerald-50 p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-emerald-900">Kontakt bevorzugt?</h3>
                    <p className="mt-2 text-sm text-emerald-900/80">
                      Für eine schnelle Klärung buche direkt ein Erstgespräch oder schreibe kurz deine Anforderungen.
                    </p>
                    <div className="mt-5 grid gap-2">
                      <a
                        href="https://calendly.com/homigo-de/30min"
                        className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
                      >
                        Erstgespräch buchen
                      </a>
                      <Link
                        href="/kontakt"
                        className="inline-flex items-center justify-center rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-100"
                      >
                        Nachricht senden
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}