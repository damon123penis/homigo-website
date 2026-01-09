

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'So läuft’s ab | homigo – Smart Home ohne Kabelsalat',
  description:
    'So begleitet dich homigo Schritt für Schritt: kostenloses Kennenlernen, bezahltes Smart-Home-Konzept, Umsetzung (remote oder vor Ort) und optionaler Support. Klar, persönlich, digital.',
  alternates: {
    canonical: 'https://www.homigo.tech/customerjourney',
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

const steps: Step[] = [
  {
    step: '01',
    title: 'Kennenlern-Call',
    duration: '15 Min (kostenlos)',
    badge: 'Unverbindlich',
    bullets: [
      'Wohnsituation & Ziele (Wohnung/Haus, Miete/Eigentum)',
      'Technik-Check: WLAN, Smartphone (iOS/Android), vorhandene Geräte',
      'Grobe Budget- und Zeitrahmen-Klärung',
      'Passt homigo zu deinem Projekt? Nächste Schritte',
    ],
    outcome:
      'Du erhältst eine klare Einschätzung und weißt, ob wir gemeinsam weitergehen — ohne dass wir schon “Beratung verschenken”.',
  },
  {
    step: '02',
    title: 'Individuelles Smart‑Home‑Konzept',
    duration: '30–60 Min + Ausarbeitung',
    badge: 'Kostenpflichtig',
    bullets: [
      'Prioritäten & Use‑Cases: Licht, Heizung, Steckdosen, Sicherheit, Energie',
      'Systemempfehlung (Plug & Play, Matter, Home Assistant – passend zu dir)',
      'Konkrete Einkaufsliste inkl. Budget-Optionen (Good / Better / Best)',
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
      'Remote-Setup im Videocall oder Vor‑Ort‑Einrichtung (Rhein‑Main)',
      'App‑Integration & Automationen nach Konzept',
      'Einweisung: einfache Bedienung, Szenen, Routinen',
      'Qualitätscheck: Stabilität, Reichweite, Backups/Notfallplan',
    ],
    outcome:
      'Alles funktioniert im Alltag — verständlich, stabil und ohne Kabelsalat.',
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
    outcome:
      'Dein Smart Home wächst mit — ohne dass du bei jedem Schritt wieder bei null anfängst.',
  },
]

const faqs = [
  {
    q: 'Warum ist die Konzepterstellung kostenpflichtig?',
    a: 'Weil hier die eigentliche Planungsarbeit und Erfahrung steckt. So erhältst du ein durchdachtes Ergebnis statt “Trial & Error”. Die Konzeptkosten können bei Umsetzung angerechnet werden.',
  },
  {
    q: 'Muss ich danach auch die Umsetzung buchen?',
    a: 'Nein. Du kannst das Konzept selbst umsetzen oder später wieder auf mich zukommen. Du behältst die volle Kontrolle.',
  },
  {
    q: 'Geht das auch in einer Mietwohnung?',
    a: 'Ja. Ich setze bevorzugt auf rückstandsfrei installierbare Plug‑&‑Play‑Lösungen, die ohne Umbau funktionieren.',
  },
  {
    q: 'Welche Systeme unterstützt du?',
    a: 'Von einfachen Plug‑&‑Play‑Setups (z. B. Hue/Shelly) bis zu erweiterten Setups (z. B. Home Assistant) – immer passend zu deinem Technik‑Level und Budget.',
  },
]

function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="https://calendly.com/homigo-de/30min"
        className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
      >
        Kostenloses Kennenlernen buchen
      </a>
      <Link
        href="/leistungen-im-detail"
        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        Pakete & Preise ansehen
      </Link>
    </div>
  )
}

export default function CustomerJourneyPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-18">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Klarer Prozess. Saubere Ergebnisse.
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                So führt dich homigo zum Smart Home –
                <span className="text-emerald-600"> ohne Kabelsalat</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                Du bekommst einen strukturierten Ablauf, transparente Pakete und eine Lösung, die im Alltag funktioniert.
                Erst Orientierung (kurz & kostenlos), dann ein echtes Konzept – und auf Wunsch die komplette Umsetzung.
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
                  Smart Home wirkt einfach – bis man vor 5 Apps, 20 Geräten und widersprüchlichen Tipps steht.
                  Im Konzept bekommst du Klarheit: kompatibel, wartbar, alltagstauglich.
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
                  <p className="text-sm font-semibold text-slate-900">Tipp</p>
                  <p className="mt-1 text-sm text-slate-700">
                    Die Konzeptkosten können bei einer anschließenden Umsetzung angerechnet werden.
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href="/leistungen-im-detail"
                    className="text-sm font-semibold text-emerald-700 hover:text-emerald-600"
                  >
                    Pakete im Detail ansehen →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Der Ablauf in 4 Schritten
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-700 sm:text-base">
              Transparent, strukturiert, ohne Überraschungen – damit du schnell von der Idee zur funktionierenden Lösung kommst.
            </p>
          </div>
          <div className="hidden sm:block">
            <CTAButtons />
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {steps.map((s) => (
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

              {/* Micro-CTA per step */}
              {s.step === '01' && (
                <div className="mt-5">
                  <a
                    href="https://calendly.com/homigo-de/30min"
                    className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-600"
                  >
                    Kostenloses Kennenlernen buchen →
                  </a>
                </div>
              )}
              {s.step === '02' && (
                <div className="mt-5">
                  <Link
                    href="/leistungen-im-detail"
                    className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-600"
                  >
                    Konzept-Paket ansehen →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <CTAButtons />
        </div>
      </section>

      {/* Conversion band */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Du willst erst sicher sein, ob Smart Home bei dir Sinn macht?
              </h2>
              <p className="mt-2 text-sm text-slate-200 sm:text-base">
                Dann starte mit dem kostenlosen Kennenlern-Call. Wenn es passt, bekommst du danach ein echtes Konzept –
                ohne Verkaufsdruck, ohne Fachchinesisch.
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="flex flex-col gap-3 sm:items-start">
                <a
                  href="https://calendly.com/homigo-de/30min"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
                >
                  Kennenlern-Call buchen über Calendly (externer Anbieter)
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Erst Frage stellen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">FAQ</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-700 sm:text-base">
              Die häufigsten Fragen – kurz, klar und ohne Umwege.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
                <span className="mr-2 text-emerald-600">+</span>
                {f.q}
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-sm text-slate-700">
            Du bist dir unsicher, welcher Schritt für dich passt? Dann starte mit dem kostenlosen Kennenlernen.
          </p>
          <div className="mt-4">
            <CTAButtons />
          </div>
        </div>
      </section>
    </main>
  )
}