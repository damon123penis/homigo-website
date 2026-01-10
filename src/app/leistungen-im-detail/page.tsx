import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Leistungen im Detail | homigo – Smart Home Beratung & Setup',
  description:
    'Pakete und Zusatzservices von homigo: Smart-Home-Beratung online (bundesweit) und Vor-Ort-Setup in der Rhein-Main-Region. Plug & Play statt Kabelsalat – persönlich, einfach, digital.',
  keywords: [
    'Smart Home Beratung',
    'Smart Home Setup',
    'Rhein-Main',
    'Frankfurt Smart Home',
    'Philips Hue Einrichtung',
    'Shelly Installation',
    'Home Assistant Integration',
    'EcoFlow Smart Home',
    'Alexa Google Home Apple HomeKit',
  ],
  alternates: {
    canonical: 'https://www.homigo.tech/leistungen-im-detail',
  },
  openGraph: {
    title: 'Leistungen im Detail | homigo',
    description:
      'Online-Beratung bundesweit oder Vor-Ort-Service im Rhein-Main-Gebiet. Transparente Pakete, klare Empfehlungen, saubere Integration.',
    url: 'https://www.homigo.tech/leistungen-im-detail',
    siteName: 'homigo',
    locale: 'de_DE',
    type: 'website',
  },
}

const PRICING = {
  online: {
    title: 'Online-Beratung (bundesweit)',
    badge: 'Remote',
    main: {
      name: 'Smart Home Starterpaket',
      price: '69 €',
      highlight: 'Klarer Start ohne Fehlkäufe – mit Einkaufsliste und einfacher Anleitung.',
      bullets: [
        '30 Minuten Videocall: Wir klären Ziele und Bestand.',
        'Empfehlung inkl. konkreter Einkaufsliste.',
        'Einfache Schritt-für-Schritt-Anleitung für die Einrichtung.',
      ],
    },
  },
  onsite: {
    title: 'Vor-Ort-Service (Rhein-Main)',
    badge: 'Vor Ort',
    main: {
      name: 'Smart Home Starterpaket',
      price: '129€',
      highlight: 'Einrichtung bei dir zu Hause – inkl. Tests, Feinschliff und Übergabe.',
      bullets: [
        'Beratung & Setup vor Ort (Rhein-Main-Region).',
        'Einrichtung, Tests und kurze Einweisung.',
        'Anfahrt bis 40 km inklusive (danach nach Absprache).',
      ],
    },
  },
}
const SHARED_ADDONS: { name: string; price: string; desc: string; appliesTo?: 'online' | 'onsite' | 'both' }[] = [
  {
    name: 'Remote-Setup-Hilfe',
    price: '39 €',
    desc: 'Persönliche Begleitung bei der Einrichtung per Videocall',
    appliesTo: 'online',
  },
  {
    name: 'Erweitertes System',
    price: '69 €',
    desc: 'Integration komplexer Systeme (z. B. Home Assistant)',
    appliesTo: 'both',
  },
  {
    name: 'Hardware-Lieferung',
    price: 'individuell',
    desc: 'Beschaffung & Lieferung der Komponenten zu attraktiven Preisen',
    appliesTo: 'both',
  },
  {
    name: 'Wartungsservice',
    price: 'individuell',
    desc: 'Optional: Betreuung & Wartung nach der Einrichtungsphase',
    appliesTo: 'both',
  },
]
const SUPPORTED_BRANDS = [
  {
    title: 'Beleuchtung & Ambiente',
    items: ['Philips Hue', 'IKEA TRÅDFRI', 'Govee (je nach Use-Case)'],
  },
  {
    title: 'Schalter, Relais & Sensorik',
    items: ['Shelly', 'Sonoff (je nach Modell)', 'Aqara (v. a. Sensorik)'],
  },
  {
    title: 'Zentrale / Automationen',
    items: ['Home Assistant (advanced)', 'Apple Home / HomeKit', 'Google Home', 'Amazon Alexa'],
  },
  {
    title: 'Energie & Balkonkraftwerk-Integration',
    items: ['EcoFlow (PowerStream/Powerstations)', 'Tibber (preisbasierte Logik – sofern genutzt)'],
  },
  {
    title: 'Netzwerk & Stabilität',
    items: ['Fritz!Box / gängige Router-Setups (Analyse & Optimierung)'],
  },
]

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold text-emerald-700">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      <p className="mt-3 text-base text-slate-600">{subtitle}</p>
    </div>
  )
}

function PricingCard({
  badge,
  title,
  name,
  price,
  highlight,
  bullets,
}: {
  badge: string
  title: string
  name: string
  price: string
  highlight: string
  bullets: string[]
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
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-base font-bold text-slate-900">{name}</h3>
          <span className="text-sm font-semibold text-emerald-700">{price}</span>
        </div>
        <p className="mt-2 text-sm text-slate-600">{highlight}</p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Optional:{' '}
          <a href="#addons" className="font-semibold text-emerald-700 hover:text-emerald-600">
            Zusatzservices ansehen
          </a>
        </p>
        <p className="mt-5 text-xs text-slate-500">
          Das Erstgespräch ist immer kostenlos. Buche es über den Button oben.
        </p>
      </div>
    </div>
  )
}

function AddonList({
  items,
  id,
}: {
  items: { name: string; price: string; desc: string; appliesTo?: 'online' | 'onsite' | 'both' }[]
  id?: string
}) {
  const groups: {
    key: 'online' | 'both' | 'onsite'
    title: string
    items: { name: string; price: string; desc: string; appliesTo?: 'online' | 'onsite' | 'both' }[]
  }[] = [
    {
      key: 'online',
      title: 'Für Online',
      items: items.filter((x) => x.appliesTo === 'online'),
    },
    {
      key: 'both',
      title: 'Für Online & Vor Ort',
      items: items.filter((x) => !x.appliesTo || x.appliesTo === 'both'),
    },
    {
      key: 'onsite',
      title: 'Für Vor Ort',
      items: items.filter((x) => x.appliesTo === 'onsite'),
    },
  ]
  return (
    <div id={id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">Zusätzliche Services</h3>
      <p className="mt-1 text-sm text-slate-600">Du buchst nur, was du wirklich brauchst.</p>

      <div className="mt-5 space-y-6">
        {groups
          .filter((g) => g.items.length > 0)
          .map((g) => (
            <div key={g.key}>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {g.title}
              </div>

              <div className="space-y-3">
                {g.items.map((it) => (
                  <div key={it.name} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 font-semibold text-slate-900">
                          <span>{it.name}</span>
                          {it.appliesTo && it.appliesTo !== 'both' ? (
                            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600 shadow-sm">
                              {it.appliesTo === 'online' ? 'Online' : 'Vor Ort'}
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
            </div>
          ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-600">
          Im Erstgespräch klären wir Ziele, Geräte, Handy-System (iOS/Android), WLAN und Budget. Danach bekommst du eine klare Empfehlung.
        </p>
      </div>
    </div>
  )
}

function DifferentiationTable() {
  const rows = [
    {
      k: 'Systemansatz',
      homigo: 'Hersteller-übergreifend, Plug-&-Play, pragmatisch',
      electrician: 'Oft fest verdrahtet, projekthaft, teils proprietär',
    },
    {
      k: 'Bedienbarkeit',
      homigo: 'App-First, einfache Routinen, verständliche Übergabe',
      electrician: 'Technikfokus, Übergabe teils knapp dokumentiert',
    },
    {
      k: 'Transparenz',
      homigo: 'Klare Pakete + optionale Add-ons',
      electrician: 'Häufig nach Aufwand, schwer vergleichbar',
    },
    {
      k: 'Online-Abwicklung',
      homigo: 'Remote möglich (bundesweit), schnelle Iterationen',
      electrician: 'Meist vor Ort, längere Vorlaufzeiten',
    },
    {
      k: 'Kompatibilität',
      homigo: 'Ökosystem-Check (iOS/Android, Alexa/Google/Apple)',
      electrician: 'Fokus auf Elektro-/Gebäudetechnik, weniger App-Ökosystem',
    },
    {
      k: 'Nachbetreuung',
      homigo: 'Optionaler Wartungsservice, Remote-Feinschliff',
      electrician: 'Service meist für Installation, weniger für Apps/Automationen',
    },
  ]

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Warum homigo statt klassischer Elektriker?</h2>
          <p className="mt-1 text-sm text-slate-600">
            Wir setzen auf einfache Plug-&-Play-Systeme, saubere App-Einrichtung und verständliche Automationen.
          </p>
        </div>
      </div>

      {/* Mobile: compact comparison cards */}
      <div className="mt-5 space-y-3 lg:hidden">
        {rows.map((r) => (
          <div key={r.k} className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">{r.k}</div>
            <div className="mt-3 grid gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">homigo</div>
                <div className="mt-1 text-sm text-slate-700">{r.homigo}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Elektrikerbetrieb</div>
                <div className="mt-1 text-sm text-slate-700">{r.electrician}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="mt-5 hidden lg:block">
        <div className="w-full rounded-2xl border border-slate-200">
          <table className="w-full table-auto text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Kriterium</th>
                <th className="px-4 py-3 font-semibold">homigo</th>
                <th className="px-4 py-3 font-semibold">Elektrikerbetrieb (typisch)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((r) => (
                <tr key={r.k}>
                  <td className="px-4 py-3 font-semibold text-slate-900 break-words whitespace-normal">{r.k}</td>
                  <td className="px-4 py-3 text-slate-700 break-words whitespace-normal">{r.homigo}</td>
                  <td className="px-4 py-3 text-slate-700 break-words whitespace-normal">{r.electrician}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Hinweis: Elektrikerbetriebe unterscheiden sich stark. Die Darstellung beschreibt typische Unterschiede in Projekten
        mit Fokus auf fest verdrahtete Elektroinstallationen.
      </p>
    </div>
  )
}

function Brands() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-bold text-slate-900">Hersteller & Systeme, mit denen wir häufig arbeiten</h2>
      <p className="mt-1 text-sm text-slate-600">
        Wir nutzen vor allem Geräte, die zuverlässig sind und gut zusammenarbeiten. Je nach Ziel empfehlen wir die beste Kombination.
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
        Markenhinweis: Alle genannten Marken sind Eigentum der jeweiligen Rechteinhaber. Nennungen dienen der
        Beschreibung von Kompatibilität/typischen Setups.
      </p>
    </div>
  )
}


export default function LeistungenImDetailPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: 'homigo',
    description:
      'Persönliche Smart-Home-Beratung und Setup – online bundesweit und vor Ort in der Rhein-Main-Region. Plug & Play statt Kabelsalat.',
    url: 'https://www.homigo.tech/leistungen-im-detail',
    image: 'https://www.homigo.tech/images/Logo.png',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Rhein-Main-Region' },
      { '@type': 'Country', name: 'Deutschland' },
    ],
    offers: {
      '@type': 'OfferCatalog',
      name: 'homigo Leistungspakete',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Smart Home Starterpaket (Online)',
          price: 69,
          priceCurrency: 'EUR',
          url: 'https://www.homigo.tech/leistungen-im-detail',
          category: 'https://schema.org/Service',
        },
        {
          '@type': 'Offer',
          name: 'Smart Home Starterpaket (Vor Ort)',
          price: 129,
          priceCurrency: 'EUR',
          url: 'https://www.homigo.tech/leistungen-im-detail',
          category: 'https://schema.org/Service',
        },
      ],
    },
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="px-4 pt-10 sm:pt-14">
        <SectionHeader
          eyebrow="Pakete & Zusatzservices"
          title="Leistungen im Detail"
          subtitle="Online bundesweit oder Vor-Ort in der Rhein-Main-Region. Plug & Play statt Kabelsalat – persönlich, einfach, digital."
        />

        <div className="mx-auto mt-8 max-w-6xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-900">1. Kostenloses Kennenlernen</div>
                <p className="mt-2 text-sm text-slate-600">
                  Kurzes Gespräch: Ziele, Budget, Geräte/Ökosystem (iOS/Android), WLAN/Router, gewünschte Räume.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-900">2. Paket auswählen</div>
                <p className="mt-2 text-sm text-slate-600">
                  Du bekommst eine klare Empfehlung. Danach starten wir mit Konzept & Setup – transparent als Paketpreis.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-900">3. Setup & Feinschliff</div>
                <p className="mt-2 text-sm text-slate-600">
                  Einrichtung, Automationen, Tests. Optional: Hardware-Lieferung und Wartungspaket.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href="https://calendly.com/homigo-de/30min"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              >
                Kostenloses Erstgespräch buchen
              </a>
              <Link
                href="/smart-home-generator"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Smart Home Generator starten
              </Link>
            </div>

            <p className="mt-4 text-center text-xs text-slate-500">
              Tipp: Wenn du schon Geräte hast, sag es im Gespräch – wir prüfen Kompatibilität und vermeiden doppelte Käufe.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 pt-10">
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <div className="h-full">
            <PricingCard
              badge={PRICING.online.badge}
              title={PRICING.online.title}
              name={PRICING.online.main.name}
              price={PRICING.online.main.price}
              highlight={PRICING.online.main.highlight}
              bullets={PRICING.online.main.bullets}
            />
          </div>
          <div className="h-full">
            <PricingCard
              badge={PRICING.onsite.badge}
              title={PRICING.onsite.title}
              name={PRICING.onsite.main.name}
              price={PRICING.onsite.main.price}
              highlight={PRICING.onsite.main.highlight}
              bullets={PRICING.onsite.main.bullets}
            />
          </div>
        </div>
        <div className="mt-8">
          <AddonList id="addons" items={SHARED_ADDONS} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Brands />
          <DifferentiationTable />
        </div>

        <div className="mt-8">
          <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">Nächster Schritt</h2>
            <p className="mt-2 text-sm text-slate-600">
              Worauf wartest du noch? Vereinbare einen Termin für ein Erstgespräch über Calendly und lass uns über dein zukünftiges Smart Home sprechen!
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="https://calendly.com/homigo-de/30min"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
              >
                Termin sichern
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Alternativ Kontakt aufnehmen
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Hinweis: Preise verstehen sich als Endpreise. Zusatzservices je nach Umfang/Komplexität.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}