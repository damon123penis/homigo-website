import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, Calendar, CheckCircle } from 'lucide-react'
import ContactForm from '../../components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Kontakt | homigo – Smart Home ohne Kabelsalat',
  description:
    'Kontakt zu homigo: Stelle deine Frage oder buche direkt ein Erstgespräch. Smart-Home-Beratung online bundesweit und vor Ort in der Rhein-Main-Region.',
  alternates: {
    canonical: 'https://www.homigo.tech/kontakt',
  },
  robots: { index: true, follow: true },
}

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main>
        {/* Hero */}
        <section className="bg-slate-900 text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Lass uns dein Smart Home pragmatisch planen
              </h1>
              <p className="mt-4 text-base text-slate-200 sm:text-lg">
                Am schnellsten geht’s über ein kurzes Erstgespräch. Alternativ kannst du mir auch eine Nachricht schicken.
                Danach erhältst du einen klaren nächsten Schritt – Konzept, Setup und Umsetzung (remote oder vor Ort).
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="https://calendly.com/homigo-de/30min"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
                >
                  <Calendar className="h-4 w-4" />
                  Erstgespräch buchen
                </a>
                <Link
                  href="/customerjourney"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
                >
                  So läuft der Prozess ab
                </Link>
              </div>

              <p className="mt-4 text-xs text-slate-300">
                Hinweis: Das Erstgespräch dient der Orientierung. Ein konkretes Konzept / Setup erfolgt anschließend als bezahltes Paket.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-12">
              {/* Left: Form */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Nachricht senden</h2>
                      <p className="mt-2 text-sm text-slate-600">
                        Für eine schnelle Klärung: buche bevorzugt ein Erstgespräch. Wenn du lieber schreibst, nutze das Formular.
                      </p>
                    </div>
                    <a
                      href="https://calendly.com/homigo-de/30min"
                      className="hidden whitespace-nowrap rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 sm:inline-flex"
                    >
                      Erstgespräch buchen
                    </a>
                  </div>

                  <div className="mt-6">
                    <ContactForm />
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Tipp für bessere Antworten</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Schreib kurz dazu: iOS/Android, Räume (Anzahl), WLAN/Router, Ziele (Komfort/Sicherheit/Energie) und grobes Budget.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Conversion / Journey */}
              <aside className="lg:col-span-5">
                <div className="space-y-6 lg:sticky lg:top-24">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-slate-900">Dein nächster Schritt</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Der effizienteste Weg ist ein kurzes Erstgespräch – danach weißt du genau, welches Paket passt.
                    </p>

                    <ol className="mt-5 space-y-4 text-sm text-slate-700">
                      <li className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                          1
                        </span>
                        Anforderungen klären (Ziele, Budget, Rahmenbedingungen).
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                          2
                        </span>
                        Paket wählen: Starter (Plug-&-Play) oder erweitert (z. B. Home Assistant).
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                          3
                        </span>
                        Umsetzung remote oder vor Ort – inkl. App-Integration & Übergabe.
                      </li>
                    </ol>

                    <div className="mt-6 grid gap-2">
                      <a
                        href="https://calendly.com/homigo-de/30min"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
                      >
                        <Calendar className="h-4 w-4" />
                        Erstgespräch buchen
                      </a>
                      <Link
                        href="/leistungen-im-detail"
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        Pakete ansehen
                      </Link>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Schnelle Rückmeldung</p>
                          <p className="text-sm text-slate-600">In der Regel innerhalb von 24 Stunden.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Mietwohnung geeignet</p>
                          <p className="text-sm text-slate-600">Fokus auf Plug-&-Play ohne Umbau.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Direct contact */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-slate-900">Direkter Kontakt</h3>
                    <div className="mt-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                          <Mail className="h-5 w-5 text-emerald-700" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">E-Mail</p>
                          <a href="mailto:hallo@homigo.tech" className="text-sm text-emerald-700 hover:underline">
                            hallo@homigo.tech
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                          <Phone className="h-5 w-5 text-emerald-700" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Telefon</p>
                          <a href="tel:+4915227178595" className="text-sm text-emerald-700 hover:underline">
                            +49 152 27178595
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                          <MapPin className="h-5 w-5 text-emerald-700" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Service-Gebiet</p>
                          <p className="text-sm text-slate-600">Rhein‑Main‑Region</p>
                          <p className="text-xs text-slate-500">Online bundesweit</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
                      <p className="text-sm font-semibold text-emerald-900">Verfügbarkeit</p>
                      <div className="mt-2 space-y-2 text-sm text-emerald-900/80">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Mo–Fr: 17:00–21:00 Uhr</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Sa: 09:00–17:00 Uhr</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Termine auch außerhalb möglich</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}