import Link from 'next/link'
import Script from 'next/script'
import type { Metadata } from 'next'
import {
  Smartphone,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  ShoppingCart,
  Calendar,
} from 'lucide-react'
import ModernSmartHomeConfigurator from '../../components/sections/smart-home-generator'

export const metadata: Metadata = {
  title: 'Smart Home Generator | homigo – Konfiguration in 3 Minuten',
  description:
    'Stelle dir dein Smart Home virtuell zusammen: Licht, Sicherheit, Energie & Automationen – mit klaren Empfehlungen. Ergebnis: Konzept & nächste Schritte. homigo – Smart Home ohne Kabelsalat.',
  alternates: {
    canonical: 'https://www.homigo.tech/smart-home-generator',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: 'https://www.homigo.tech/smart-home-generator',
    title: 'Smart Home Generator | homigo',
    description:
      'Konfiguriere dein Smart Home in wenigen Minuten und erhalte klare Empfehlungen & nächste Schritte – online oder vor Ort.',
    siteName: 'homigo',
  },
}

const faqs = [
  {
    q: 'Kostet der Smart Home Generator etwas?',
    a: 'Nein. Der Generator ist kostenlos und hilft dir, Anforderungen zu strukturieren und passende Komponenten/Schwerpunkte zu definieren.',
  },
  {
    q: 'Brauche ich Vorkenntnisse?',
    a: 'Nein. Du wirst Schritt für Schritt geführt. Wenn du willst, übernehmen wir die Einrichtung für dich – remote oder vor Ort.',
  },
  {
    q: 'Kann ich das Ergebnis später kaufen?',
    a: 'Ja. Perspektivisch kannst du aus deiner Konfiguration eine Einkaufsliste/Warenkorb erstellen. Bis dahin setzen wir das Ergebnis in ein Angebot oder Konzept um.',
  },
  {
    q: 'Welche Systeme unterstützt ihr?',
    a: 'Fokus auf Plug-&-Play (z. B. Philips Hue, Shelly, EcoFlow) und – auf Wunsch – erweiterte Setups (z. B. Home Assistant).',
  },
]

export default function SmartHomeGeneratorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* JSON-LD: FAQ */}
      <Script
        id="smart-home-generator-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Top utility row */}
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zur Startseite
          </Link>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/leistungen-im-detail"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Leistungen
            </Link>
            <Link
              href="/customerjourney"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Prozess
            </Link>
            <a
              href="https://calendly.com/deinname/erstberatung"
              className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
            >
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Erstgespräch buchen
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pb-14">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                <Sparkles className="h-4 w-4" />
                Kostenloser Smart Home Generator
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Konfiguriere dein Smart Home in 3 Minuten
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
                Wähle deine Ziele (Komfort, Sicherheit, Energie) – und erhalte eine klare Richtung für dein Setup.
                Danach unterstützen wir dich bei der Umsetzung: remote bundesweit oder vor Ort in der Rhein‑Main‑Region.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#konfigurator"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Jetzt konfigurieren
                </a>
                <a
                  href="https://calendly.com/deinname/erstberatung"
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
                >
                  Erstgespräch buchen
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Ohne Kabelsalat</p>
                    <p className="text-sm text-slate-600">Plug-&-Play statt Umbau – ideal für Mietwohnungen.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Klarer nächster Schritt</p>
                    <p className="text-sm text-slate-600">Aus der Konfiguration wird ein umsetzbares Konzept.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500">
                    <Smartphone className="h-5 w-5 text-slate-900" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Was du hier bekommst</p>
                    <p className="text-sm text-slate-600">Inspiration + klare Umsetzungsrichtung</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                    Prioritäten: Komfort, Sicherheit, Energie
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                    Passende Systemlogik (Plug-&-Play / erweitert)
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                    Nächste Schritte: Remote oder Vor‑Ort‑Umsetzung
                  </li>
                </ul>

                <div className="mt-6 rounded-2xl bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Shop‑Anbindung (demnächst)</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Perspektivisch kannst du aus deiner Konfiguration eine Einkaufsliste bzw. einen Warenkorb erstellen.
                    Heute nutzen wir das Ergebnis als Grundlage für ein Angebot oder Setup‑Plan.
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-500"
                      aria-disabled="true"
                      title="Kommt demnächst"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Warenkorb
                    </button>
                    <Link
                      href="/kontakt"
                      className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Ergebnis besprechen
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configurator */}
      <section id="konfigurator" className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
              <h2 className="text-xl font-bold text-slate-900">Dein Smart Home Setup</h2>
              <p className="mt-2 text-sm text-slate-600">
                Konfiguriere Schritt für Schritt. Wenn du dir unsicher bist, buche ein kurzes Erstgespräch – wir klären alles pragmatisch.
              </p>
              <div className="mt-6">
                <ModernSmartHomeConfigurator />
              </div>
            </div>
          </div>

          {/* Conversion sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-semibold text-slate-900">Nächster Schritt nach der Konfiguration</p>
                <ol className="mt-3 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                      1
                    </span>
                    Du sagst uns, was dir wichtig ist (Budget, Räume, Ziele).
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                      2
                    </span>
                    Wir machen daraus ein umsetzbares Konzept (Plug-&-Play oder erweitert).
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                      3
                    </span>
                    Umsetzung remote oder vor Ort – inkl. sauberer App‑Einrichtung.
                  </li>
                </ol>

                <div className="mt-5 grid gap-2">
                  <a
                    href="https://calendly.com/deinname/erstberatung"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
                  >
                    <Calendar className="h-4 w-4" />
                    Erstgespräch buchen
                  </a>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Frage stellen
                  </Link>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Hinweis: Der Generator liefert Orientierung. Für konkrete Auswahl (z. B. Systemgrenzen, Datenschutz, Installation)
                  erstellen wir auf Wunsch ein individuelles Konzept.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white">
                <p className="text-sm font-semibold">Pro‑Tipp</p>
                <p className="mt-2 text-sm text-slate-200">
                  Notiere dir kurz: Smartphone‑System (iOS/Android), Räume (Anzahl), WLAN/Router und Prioritäten. Das beschleunigt die Empfehlung.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">{f.q}</p>
                <p className="mt-2 text-sm text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://calendly.com/deinname/erstberatung"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
            >
              <Calendar className="h-4 w-4" />
              Erstgespräch buchen
            </a>
            <Link
              href="/leistungen-im-detail"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Pakete ansehen
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}