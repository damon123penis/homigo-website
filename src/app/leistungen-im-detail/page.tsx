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
      highlight: 'Ideal für einen klaren Start ohne Fehlkäufe – mit konkreter Einkaufsliste und Anleitung.',
      bullets: [
        '30-minütiger Videocall zur Analyse deines Bedarfs',
        'Individuelles Konzept mit Produktempfehlungen',
        'Detaillierte Einrichtungsanleitung (Schritt-für-Schritt)',
      ],
    },
    addons: [
      {
        name: 'Remote-Setup-Hilfe',
        price: '39 €',
        desc: 'Persönliche Begleitung bei der Einrichtung per Videocall',
      },
      {
        name: 'Erweitertes System',
        price: '69 €',
        desc: 'Integration komplexer Systeme (z. B. Home Assistant)',
      },
      {
        name: 'Hardware-Lieferung',
        price: 'individuell',
        desc: 'Beschaffung & Lieferung der Komponenten zu attraktiven Preisen',
      },
      {
        name: 'Wartungsservice',
        price: 'individuell',
        desc: 'Optional: Betreuung & Wartung nach der Einrichtungsphase',
      },
    ],
  },
  onsite: {
    title: 'Vor-Ort-Service (Rhein-Main-Region)',
    badge: 'Vor Ort',
    main: {
      name: 'Smart Home Starterpaket',
      price: '119 €',
      highlight: 'Für alle, die direkt ein funktionierendes Setup möchten – inkl. Einrichtung & Tests.',
      bullets: [
        'Persönliche Beratung vor Ort',
        'Maßgeschneidertes Konzept mit Einkaufsliste',
        'Komplette Einrichtung & App-Integration',
        'Anfahrt bis 40 km inklusive',
      ],
    },
    addons: [
      {
        name: 'Erweitertes System',
        price: '69 €',
        desc: 'Integration komplexer Systeme (z. B. Home Assistant)',
      },
      {
        name: 'Hardware-Lieferung',
        price: 'individuell',
        desc: 'Beschaffung & Lieferung der Komponenten zu attraktiven Preisen',
      },
      {
        name: 'Wartungsservice',
        price: 'individuell',
        desc: 'Optional: Betreuung & Wartung nach der Einrichtungsphase',
      },
    ],
  },
}

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
  ctaLabel,
  ctaHref,
}: {
  badge: string
  title: string
  name: string
  price: string
  highlight: string
  bullets: string[]
  ctaLabel: string
  ctaHref: string
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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

      <div className="mt-5 rounded-2xl bg-slate-50 p-5">
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

        <a
          href={ctaHref}
          className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
        >
          {ctaLabel}
        </a>

        <p className="mt-3 text-center text-xs text-slate-500">
          Kostenloses Kennenlernen, danach transparentes Paket – ohne Überraschungen.
        </p>
      </div>
    </div>
  )
}

function AddonList({ items }: { items: { name: string; price: string; desc: string }[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">Zusätzliche Services</h3>
      <p className="mt-1 text-sm text-slate-600">Flexibel buchbar – passend zu deinem Setup und Budget.</p>

      <div className="mt-5 space-y-3">
        {items.map((it) => (
          <div key={it.name} className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold text-slate-900">{it.name}</div>
                <div className="mt-1 text-sm text-slate-600">{it.desc}</div>
              </div>
              <div className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
                {it.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-600">
          Im Erstgespräch klären wir Ziele, Geräte, App-Ökosystem (iOS/Android), WLAN/Router und Budget – danach erhältst
          du eine klare Empfehlung.
        </p>
      </div>
    </div>
  )
}

function DifferentiationTable() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Warum homigo statt klassischer Elektriker?</h2>
          <p className="mt-1 text-sm text-slate-600">
            Fokus auf nutzerfreundliche Plug-&-Play-Systeme, saubere App-Integration und nachvollziehbare Automationen.
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Kriterium</th>
              <th className="px-4 py-3 font-semibold">homigo</th>
              <th className="px-4 py-3 font-semibold">Elektrikerbetrieb (typisch)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-4 py-3 font-semibold text-slate-900">Systemansatz</td>
              <td className="px-4 py-3 text-slate-700">Hersteller-übergreifend, Plug-&-Play, pragmatisch</td>
              <td className="px-4 py-3 text-slate-700">Oft fest verdrahtet, projekthaft, teils proprietär</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold text-slate-900">Bedienbarkeit</td>
              <td className="px-4 py-3 text-slate-700">App-First, einfache Routinen, verständliche Übergabe</td>
              <td className="px-4 py-3 text-slate-700">Technikfokus, Übergabe teils knapp dokumentiert</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold text-slate-900">Transparenz</td>
              <td className="px-4 py-3 text-slate-700">Klare Pakete + optionale Add-ons</td>
              <td className="px-4 py-3 text-slate-700">Häufig nach Aufwand, schwer vergleichbar</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold text-slate-900">Online-Abwicklung</td>
              <td className="px-4 py-3 text-slate-700">Remote möglich (bundesweit), schnelle Iterationen</td>
              <td className="px-4 py-3 text-slate-700">Meist vor Ort, längere Vorlaufzeiten</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold text-slate-900">Kompatibilität</td>
              <td className="px-4 py-3 text-slate-700">Ökosystem-Check (iOS/Android, Alexa/Google/Apple)</td>
              <td className="px-4 py-3 text-slate-700">Fokus auf Elektro-/Gebäudetechnik, weniger App-Ökosystem</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold text-slate-900">Nachbetreuung</td>
              <td className="px-4 py-3 text-slate-700">Optionaler Wartungsservice, Remote-Feinschliff</td>
              <td className="px-4 py-3 text-slate-700">Service meist für Installation, weniger für Apps/Automationen</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Hinweis: Elektrikerbetriebe unterscheiden sich stark. Die Tabelle beschreibt typische Unterschiede in Projekten
        mit Fokus auf fest verdrahtete Elektroinstallationen.
      </p>
    </div>
  )
}

function Brands() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">Hersteller & Systeme, mit denen wir häufig arbeiten</h2>
      <p className="mt-1 text-sm text-slate-600">
        Schwerpunkt: massenmarkttaugliche Komponenten, die sich sauber integrieren lassen. Abhängig von deinem Use-Case
        empfehlen wir die passendste Kombination.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {SUPPORTED_BRANDS.map((b) => (
          <div key={b.title} className="rounded-2xl bg-slate-50 p-5">
            <div className="text-sm font-semibold text-slate-900">{b.title}</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {b.items.map((it) => (
                <li key={it} className="flex gap-2">
                  <span className="mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
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

function FAQ() {
  const faqs = [
    {
      q: 'Ist das Erstgespräch wirklich kostenlos?',
      a: 'Ja. Wir klären kurz Ziele, Ausgangslage und ob du eher Online oder Vor-Ort brauchst. Für die Konzepterstellung (Starterpaket) fällt dann der Paketpreis an.',
    },
    {
      q: 'Welche Systeme unterstützt du?',
      a: 'Fokus auf Plug-&-Play-Lösungen (z. B. Philips Hue, Shelly) und bei Bedarf erweiterte Setups (z. B. Home Assistant).',
    },
    {
      q: 'Kann ich Hardware direkt über dich beziehen?',
      a: 'Optional ja (Hardware-Lieferung). Mittelfristig kann dein Setup auch direkt über ein Shop-Modul als vorkonfiguriertes Bundle bestellbar werden.',
    },
    {
      q: 'Wie läuft Vor-Ort ab?',
      a: 'Wir stimmen vorab ab, welche Komponenten vorhanden sind. Vor Ort kümmern wir uns um Einrichtung, Integration und Tests. Anfahrt bis 40 km ist im Starterpaket enthalten.',
    },
  ]

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">FAQ</h2>
      <div className="mt-4 divide-y divide-slate-200">
        {faqs.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              {f.q}
              <span className="float-right text-slate-400 group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-2 text-sm text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
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
          price: 119,
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

        <div className="mx-auto mt-8 max-w-5xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-900">1) Kostenloses Kennenlernen</div>
                <p className="mt-2 text-sm text-slate-600">
                  Kurzer Call: Ziele, Budget, Geräte/Ökosystem (iOS/Android), WLAN/Router, gewünschte Räume.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-900">2) Paket auswählen</div>
                <p className="mt-2 text-sm text-slate-600">
                  Du bekommst eine klare Empfehlung. Danach starten wir mit Konzept & Setup – transparent als Paketpreis.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-900">3) Setup & Feinschliff</div>
                <p className="mt-2 text-sm text-slate-600">
                  Einrichtung, Automationen, Tests. Optional: Hardware-Lieferung und Wartungspaket.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href="https://calendly.com/deinname/erstberatung"
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
              Tipp: Wenn du schon Geräte hast, sag es im Call – wir prüfen Kompatibilität und vermeiden doppelte Käufe.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 pt-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <PricingCard
              badge={PRICING.online.badge}
              title={PRICING.online.title}
              name={PRICING.online.main.name}
              price={PRICING.online.main.price}
              highlight={PRICING.online.main.highlight}
              bullets={PRICING.online.main.bullets}
              ctaLabel="Online Erstgespräch buchen"
              ctaHref="https://calendly.com/deinname/erstberatung"
            />
            <AddonList items={PRICING.online.addons} />
          </div>

          <div className="space-y-6">
            <PricingCard
              badge={PRICING.onsite.badge}
              title={PRICING.onsite.title}
              name={PRICING.onsite.main.name}
              price={PRICING.onsite.main.price}
              highlight={PRICING.onsite.main.highlight}
              bullets={PRICING.onsite.main.bullets}
              ctaLabel="Vor-Ort Erstgespräch buchen"
              ctaHref="https://calendly.com/deinname/erstberatung"
            />
            <AddonList items={PRICING.onsite.addons} />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Brands />
          <DifferentiationTable />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <FAQ />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">Nächster Schritt</h2>
            <p className="mt-2 text-sm text-slate-600">
              Wenn du möchtest, können wir dein Setup nach dem Konzept so vorbereiten, dass es später über ein Shop-Modul
              als vorkonfiguriertes Bundle pro Raum bestellbar ist.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="https://calendly.com/deinname/erstberatung"
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