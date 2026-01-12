import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.homigo.tech'),
  title: 'Beratung | homigo – Smart Home ohne Kabelsalat',
  description:
    'Persönliche Smart-Home-Beratung von homigo: erst kostenloses Kennenlernen, dann ein klares Konzept mit Einkaufsliste – und auf Wunsch Umsetzung remote oder vor Ort in der Rhein‑Main‑Region.',
  keywords: [
    'Smart Home Beratung',
    'Smart Home Konzept',
    'Smart Home Setup',
    'Rhein-Main',
    'Mörfelden-Walldorf',
    'Frankfurt Smart Home',
    'Philips Hue Einrichtung',
    'Shelly Einrichtung',
    'Home Assistant Integration',
    'Matter',
    'Zigbee',
  ],
  alternates: {
    canonical: '/beratung',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Beratung | homigo',
    description:
      'Klarer Prozess, transparente Pakete: Kennenlernen, Konzept, Umsetzung (remote oder vor Ort) und optionaler Support.',
    url: '/beratung',
    siteName: 'homigo',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/Logo.png',
        width: 1200,
        height: 630,
        alt: 'homigo – Smart Home ohne Kabelsalat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beratung | homigo',
    description: 'Smart Home ohne Kabelsalat: Kennenlernen, Konzept, Umsetzung – passend zu deinem Zuhause.',
    images: ['/images/Logo.png'],
  },
}

type Step = {
  step: string
  title: string
  duration: string
  badge: string
  bullets: string[]
  outcome: string
}

const STEPS: Step[] = [
  {
    step: '01',
    title: 'Kennenlern‑Call',
    duration: '15 Min (kostenlos)',
    badge: 'Unverbindlich',
    bullets: [
      'Wohnsituation & Ziele (Wohnung/Haus, Miete/Eigentum)',
      'Technik‑Check: WLAN, Smartphone (iOS/Android), vorhandene Geräte',
      'Grobe Budget‑ und Zeitrahmen‑Klärung',
      'Passt homigo zu deinem Projekt? Nächste Schritte',
    ],
    outcome:
      'Du erhältst eine klare Einschätzung und weißt, ob wir gemeinsam weitergehen — ohne Verkaufsdruck.',
  },
  {
    step: '02',
    title: 'Individuelles Smart‑Home‑Konzept',
    duration: '30–60 Min + Ausarbeitung',
    badge: 'Kostenpflichtig',
    bullets: [
      'Prioritäten & Use‑Cases: Licht, Heizung, Steckdosen, Sicherheit, Energie',
      'Systemempfehlung (Plug & Play, Matter, Home Assistant – passend zu dir)',
      'Konkrete Einkaufsliste inkl. Budget‑Optionen (Good / Better / Best)',
      'Umsetzungsplan: Reihenfolge, Stolpersteine, Best Practices',
    ],
    outcome:
      'Du bekommst ein umsetzbares Konzept (PDF/Notion), das du selbst umsetzen kannst — oder wir übernehmen die Einrichtung.',
  },
  {
    step: '03',
    title: 'Umsetzung & Einrichtung',
    duration: 'Remote oder vor Ort',
    badge: 'Optional',
    bullets: [
      'Remote‑Setup im Videocall oder Vor‑Ort‑Einrichtung (Rhein‑Main)',
      'App‑Integration & Automationen nach Konzept',
      'Einweisung: einfache Bedienung, Szenen, Routinen',
      'Qualitätscheck: Stabilität, Reichweite, Backups/Notfallplan',
    ],
    outcome: 'Alles funktioniert im Alltag — verständlich, stabil und ohne Kabelsalat.',
  },
  {
    step: '04',
    title: 'Erweiterung & Support',
    duration: 'Flexibel',
    badge: 'Optional',
    bullets: [
      'Erweiterungen (z. B. neue Räume, Sensorik, Energie‑Use‑Cases)',
      'Wartungspakete (Updates, Monitoring, Optimierungen)',
      'Troubleshooting bei Änderungen im Haushalt/WLAN/Apps',
    ],
    outcome: 'Dein Smart Home wächst mit — ohne dass du bei jedem Schritt wieder bei null anfängst.',
  },
]

const PACKAGES = {
  free: {
    badge: 'Kostenlos',
    title: 'Kennenlern‑Call',
    price: '0 €',
    highlight: 'Kurz, klar, unverbindlich. Wir sortieren gemeinsam ein, was sinnvoll ist — und was nicht.',
    bullets: ['15 Minuten Videocall', 'Ziele + Bestand + Technik‑Check', 'Nächste Schritte & grober Fahrplan'],
    cta: { label: 'Kennenlernen buchen', href: 'https://calendly.com/homigo-de/30min' },
  },
  concept: {
    badge: 'Konzept',
    title: 'Smart‑Home‑Konzept',
    price: 'ab 69 €',
    highlight:
      'Du bekommst Klarheit: kompatibel, alltagstauglich, erweiterbar — mit Einkaufsliste und Umsetzungsplan.',
    bullets: [
      '30–60 Min Beratung + Ausarbeitung',
      'Einkaufsliste (Good/Better/Best)',
      'Umsetzungsreihenfolge + Best Practices',
    ],
    cta: { label: 'Erst Kennenlernen', href: 'https://calendly.com/homigo-de/30min' },
  },
  setup: {
    badge: 'Umsetzung',
    title: 'Setup & Feinschliff',
    price: 'ab 39 €',
    highlight:
      'Wenn du willst, setzen wir das Konzept gemeinsam um — remote im Videocall oder vor Ort im Rhein‑Main‑Gebiet.',
    bullets: ['Remote‑Setup‑Hilfe (Videocall)', 'Vor‑Ort‑Einrichtung (Rhein‑Main)', 'Tests, Übergabe, Stabilitäts‑Check'],
    cta: { label: 'Anfrage stellen', href: '/kontakt' },
  },
}

const ADDONS: { name: string; price: string; desc: string; badge?: string }[] = [
  { name: 'Remote‑Setup‑Hilfe', price: 'ab 39 €', desc: 'Gemeinsam einrichten – per Videocall, Schritt für Schritt.', badge: 'Remote' },
  {
    name: 'Erweitertes System',
    price: 'ab 69 €',
    desc: 'Integration komplexerer Setups (z. B. Home Assistant) – sauber & wartbar.',
    badge: 'Advanced',
  },
  {
    name: 'Hardware‑Beschaffung',
    price: 'individuell',
    desc: 'Wenn gewünscht: Komponenten passend zum Budget (Good/Better/Best) beschaffen.',
    badge: 'Optional',
  },
  {
    name: 'Support & Erweiterung',
    price: 'individuell',
    desc: 'Neue Räume, neue Geräte, Troubleshooting, Updates – ohne wieder bei null anzufangen.',
    badge: 'Optional',
  },
]

const SUPPORTED_BRANDS = [
  {
    title: 'Beleuchtung & Ambiente',
    items: ['Philips Hue', 'IKEA TRÅDFRI', 'Govee (je nach Use‑Case)'],
  },
  {
    title: 'Schalter, Relais & Sensorik',
    items: ['Shelly', 'Sonoff (je nach Modell)', 'Aqara (v. a. Sensorik)'],
  },
  {
    title: 'Zentrale / Automationen',
    items: ['Apple Home / HomeKit', 'Google Home', 'Amazon Alexa', 'Home Assistant (advanced)'],
  },
  {
    title: 'Energie & Balkonkraftwerk‑Integration',
    items: ['EcoFlow (PowerStream/Powerstations)', 'Tibber (preisbasierte Logik – sofern genutzt)'],
  },
]

function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="https://calendly.com/homigo-de/30min"
        className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
      >
        Kostenloses Kennenlernen buchen
      </a>
      <Link
        href="/shop"
        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        Zum Shop
      </Link>
    </div>
  )
}

function PackageCard({
  badge,
  title,
  price,
  highlight,
  bullets,
  cta,
}: {
  badge: string
  title: string
  price: string
  highlight: string
  bullets: string[]
  cta: { label: string; href: string }
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            {badge}
          </div>
          <h2 className="mt-3 text-lg font-bold text-slate-900">{title}</h2>
        </div>

        <div className="text-right">
          <div className="text-sm font-semibold text-slate-500">ab</div>
          <div className="text-3xl font-bold tracking-tight text-slate-900">{price}</div>
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col rounded-2xl bg-slate-50 p-5">
        <p className="text-sm text-slate-600">{highlight}</p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <a
            href={cta.href}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
          >
            {cta.label}
          </a>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Hinweis: Im Kennenlernen klären wir Ziele, Geräte, Handy‑System (iOS/Android), WLAN und Budget.
        </p>
      </div>
    </div>
  )
}

function Brands() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-bold text-slate-900">Systeme, mit denen wir häufig arbeiten</h2>
      <p className="mt-1 text-sm text-slate-600">
        Hersteller‑übergreifend, pragmatisch, budgetbewusst – je nach Ziel empfehlen wir die passende Kombination.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {SUPPORTED_BRANDS.map((b) => (
          <div key={b.title} className="rounded-2xl bg-slate-50 p-4 sm:p-5">
            <div className="text-sm font-semibold text-slate-900">{b.title}</div>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
              {b.items.map((it) => (
                <li key={it} className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Markenhinweis: Alle genannten Marken sind Eigentum der jeweiligen Rechteinhaber. Nennungen dienen der Beschreibung
        von Kompatibilität/typischen Setups.
      </p>
    </div>
  )
}

export default function BeratungPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'homigo',
    description:
      'Persönliche Smart‑Home‑Beratung und Setup – erst kostenloses Kennenlernen, dann Konzept und optional Umsetzung remote oder vor Ort in der Rhein‑Main‑Region. Plug & Play statt Kabelsalat.',
    url: 'https://www.homigo.tech/beratung',
    image: 'https://www.homigo.tech/images/Logo.png',
    telephone: '+49 152 27178595',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Waldenserstr. 55',
      postalCode: '64546',
      addressLocality: 'Mörfelden-Walldorf',
      addressCountry: 'DE',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Rhein-Main-Region' },
      { '@type': 'AdministrativeArea', name: 'Frankfurt am Main' },
      { '@type': 'AdministrativeArea', name: 'Mörfelden-Walldorf' },
      { '@type': 'Country', name: 'Deutschland' },
    ],
  }

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-18">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Beratung, die zu dir passt.
              </p>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Dein Amigo fürs Smart Home.
                <span className="text-emerald-600"> Ohne Kabelsalat.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                Persönliche Beratung, einfache Systeme und Lösungen, die wirklich zu dir passen. Erst Orientierung (kurz & kostenlos),
                dann ein echtes Konzept – und auf Wunsch die komplette Umsetzung.
              </p>

              <div className="mt-7">
                <CTAButtons />
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">1. Kennenlernen</p>
                  <p className="mt-1 text-sm text-slate-600">15 Min, kostenlos</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">2. Konzept</p>
                  <p className="mt-1 text-sm text-slate-600">Planung + Einkaufsliste</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">3. Umsetzung</p>
                  <p className="mt-1 text-sm text-slate-600">Remote oder vor Ort</p>
                </div>
              </div>
            </div>

            {/* Trust + value */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Wofür du bezahlst</p>
                <p className="mt-2 text-sm text-slate-700">
                  Smart Home wirkt einfach – bis man vor 5 Apps, 20 Geräten und widersprüchlichen Tipps steht. Im Konzept bekommst du
                  Klarheit: kompatibel, wartbar, alltagstauglich.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">Weniger Fehlkäufe:</span> gezielte Empfehlungen statt Trial & Error.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">Ein Plan, der hält:</span> Reihenfolge, Stolpersteine, Best Practices.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">Alltag statt Bastelprojekt:</span> stabil, verständlich, erweiterbar.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Optional</p>
                  <p className="mt-1 text-sm text-slate-700">
                    Wenn du nach dem Konzept die Umsetzung mit homigo machst, können Teile der Konzeptkosten angerechnet werden.
                  </p>
                </div>

                <div className="mt-6">
                  <a href="#pakete" className="text-sm font-semibold text-emerald-700 hover:text-emerald-600">
                    Pakete ansehen →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="pakete" className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Beratungspakete</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-700 sm:text-base">
              Starte kostenlos. Wenn es passt, wählst du das Paket, das zu deinem Tempo und deiner Wohnsituation passt.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <PackageCard {...PACKAGES.free} />
          <PackageCard {...PACKAGES.concept} />
          <PackageCard {...PACKAGES.setup} />
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900">Zusatzservices</h3>
          <p className="mt-1 text-sm text-slate-600">Du buchst nur, was du wirklich brauchst.</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {ADDONS.map((it) => (
              <div key={it.name} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 font-semibold text-slate-900">
                      <span>{it.name}</span>
                      {it.badge ? (
                        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600 shadow-sm">
                          {it.badge}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">{it.desc}</div>
                  </div>
                  <div className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
                    {it.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs text-slate-500">
            Hinweis: Preise sind Richtwerte (abhängig von Umfang/Komplexität). Im Kennenlern‑Call klären wir das transparent.
          </p>
        </div>
      </section>

      {/* Process steps */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Der Ablauf in 4 Schritten</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-700 sm:text-base">
              Transparent, strukturiert, ohne Überraschungen – damit du schnell von der Idee zur funktionierenden Lösung kommst.
            </p>
          </div>
          <div className="hidden sm:block">
            <CTAButtons />
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-emerald-700">SCHRITT {s.step}</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.duration}</p>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                  {s.badge}
                </span>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-900">Ergebnis</p>
                <p className="mt-1 text-sm text-slate-700">{s.outcome}</p>
              </div>

              {s.step === '01' ? (
                <div className="mt-5">
                  <a
                    href="https://calendly.com/homigo-de/30min"
                    className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-600"
                  >
                    Kostenloses Kennenlernen buchen →
                  </a>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <CTAButtons />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Brands />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">Für wen ist das ideal?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Für Menschen, die Smart Home im Alltag nutzen wollen – ohne stundenlang Foren zu lesen oder Geräte wieder zurückzuschicken.
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                <p className="text-sm text-slate-700">Du willst eine Lösung, die <span className="font-semibold text-slate-900">stabil</span> läuft.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                <p className="text-sm text-slate-700">Du brauchst <span className="font-semibold text-slate-900">Klarheit</span>, welche Systeme zusammenpassen.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                <p className="text-sm text-slate-700">Du möchtest <span className="font-semibold text-slate-900">ohne Baustelle</span> starten (Plug & Play).</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Nicht sicher?</p>
              <p className="mt-1 text-sm text-slate-700">
                Dann starte mit dem kostenlosen Kennenlernen. Danach weißt du, ob du ein Konzept brauchst – oder ob ein kleiner Quick‑Fix reicht.
              </p>
            </div>

            <div className="mt-6">
              <CTAButtons />
            </div>
          </div>
        </div>
      </section>

      {/* Conversion band */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Du willst erst sicher sein, ob Smart Home bei dir Sinn macht?</h2>
              <p className="mt-2 text-sm text-slate-200 sm:text-base">
                Dann starte mit dem kostenlosen Kennenlern‑Call. Wenn es passt, bekommst du danach ein echtes Konzept – ohne Verkaufsdruck, ohne Fachchinesisch.
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="flex flex-col gap-3 sm:items-start">
                <a
                  href="https://calendly.com/homigo-de/30min"
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
                >
                  Kennenlern‑Call buchen
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Erst Frage stellen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}