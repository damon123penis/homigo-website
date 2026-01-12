import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Calendar, Wifi, Smartphone, ShoppingBag, ArrowRight, PackageSearch, ClipboardList, Puzzle, Video } from 'lucide-react';
import SmartHomeBanner from '../components/layout/banner';

export const metadata: Metadata = {
  title: 'homigo – Smart Home ohne Kabelsalat',
  description:
    'Smart Home ohne Kabelsalat: persönliche Beratung & Setup plus kuratierter Shop mit kompatibler Hardware – online bundesweit und vor Ort in der Rhein-Main-Region.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'homigo – Smart Home ohne Kabelsalat',
    description:
      'Smart Home ohne Kabelsalat: persönliche Beratung & Setup plus kuratierter Shop mit kompatibler Hardware – online bundesweit und vor Ort in der Rhein-Main-Region.',
    url: 'https://www.homigo.tech/',
    siteName: 'homigo',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'homigo – Smart Home ohne Kabelsalat',
    description:
      'Smart Home ohne Kabelsalat: persönliche Beratung & Setup plus kuratierter Shop mit kompatibler Hardware – online bundesweit und vor Ort in der Rhein-Main-Region.',
  },
};

export default function HomePage() {

  const faqItems = [
    {
      question: 'Was ist alles möglich mit Smart Home?',
      answer:
        'Bei Smart Home Lösungen sind kaum Grenzen gesetzt. Neben klassischen Anwendungsgebieten mit smarter Licht- und Heizungssteuerung gibt es auch umfassendere Anwendungsgebiete wie ganzheitliche Haussteuerung inklusive Einbindung von Solarenergie und Speichertechnik, z.B. durch ein Balkonkraftwerk.',
    },
    {
      question: 'Muss ich mein Zuhause umbauen?',
      answer:
        'Nein! Wir arbeiten mit Produkten aus dem Einzelhandel für private Endkunden, die keine festen Einbauten benötigen. Dies spart teure Handwerksarbeiten.',
    },
    {
      question: 'Welche Marken und Systeme nutzt ihr?',
      answer:
        'Ich arbeite ausschließlich mit Consumer Produkten bekannter Marken, bevorzugt mit Shelly, Aqara, Tado, Philips Hue, Sonoff und anderen bewährten Smart-Home-Herstellern sowie Open Source Lösungen wie Home Assistant oder ioBroker.',
    },
    {
      question: 'Funktioniert das auch in Mietwohnungen?',
      answer: 'Absolut! Die meisten Lösungen lassen sich rückstandsfrei wieder entfernen – perfekt für Mieter.',
    },
    {
      question: 'Kann ich Hardware direkt über homigo beziehen?',
      answer: 'Ja. Im homigo Shop findest du kuratierte Smart-Home-Hardware (auch B‑Stock/Differenzbesteuerung), inkl. Kompatibilitätsinfos – oder wir empfehlen dir passende Alternativen im Call.',
    },
  ];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  name: 'homigo',
  image: ['https://www.homigo.tech/images/Logo.png'],
  logo: 'https://www.homigo.tech/images/Logo.png',
  description:
    'Persönliche Smart-Home-Beratung und Setup – online bundesweit und vor Ort in der Rhein-Main-Region. Plug & Play statt Kabelsalat.',
  url: 'https://homigo.tech/',
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Rhein-Main-Region',
      },
      {
        '@type': 'Country',
        name: 'Deutschland',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Frankenallee 23A',
      postalCode: '60327',
      addressLocality: 'Frankfurt am Main',
      addressCountry: 'DE',
    },
    telephone: '+49-152-27178595',
    email: 'hallo@homigo.tech',
    priceRange: '€€',
    founder: {
      '@type': 'Person',
      name: 'Damon Schacht',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <div>
        <SmartHomeBanner />
      </div>

      {/* Brand Logo Section */}
      <section className="bg-white pt-12 pb-6 md:pt-16 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <img
            src="/images/Logo.png"
            alt="homigo Logo"
            className="w-28 md:w-36 lg:w-40 opacity-90"
            loading="eager"
          />
        </div>
      </section>

      {/* Intro Claim Section */}
      <section className="bg-white pb-8 md:pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            <strong className="font-semibold text-slate-800">Dein Amigo fürs Smart Home.</strong>
            <br />
            Persönliche Beratung, einfache Systeme und Lösungen, die wirklich zu dir passen.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-4 text-white font-semibold shadow-sm hover:bg-emerald-700 transition"
            >
              Zum Shop
              <ShoppingBag className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-4 text-slate-900 font-semibold shadow-sm hover:bg-slate-50 transition"
            >
              Beratung & Setup
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 text-left">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="text-sm font-semibold text-slate-900">Passend statt maximal</div>
              <div className="mt-1 text-sm text-slate-600">Wir wählen die Lösung nach Budget, Wohnsituation und Alltag – nicht nach Buzzwords.</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="text-sm font-semibold text-slate-900">Kompatibilität im Blick</div>
              <div className="mt-1 text-sm text-slate-600">Zigbee, Matter, Thread & Co. – verständlich erklärt, damit es später wirklich zusammen läuft.</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="text-sm font-semibold text-slate-900">Shop + Hilfe, wenn du sie brauchst</div>
              <div className="mt-1 text-sm text-slate-600">Kaufe im Shop oder buche Unterstützung – du entscheidest, wie viel Hilfe du willst.</div>
            </div>
          </div>
        </div>
      </section>


      {/* Beratung Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Beratung, die zu dir passt</h2>
              <p className="mt-2 text-slate-600 max-w-2xl">
                Du willst Smart Home nutzen – ohne dich durch Funkstandards, Apps und Kompatibilitätslisten zu kämpfen?
                Ich helfe dir pragmatisch: passend zu Budget, Wohnsituation und dem, was im Alltag wirklich zählt.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/kontakt"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700"
              >
                Beratung anfragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/leistungen-im-detail"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-900 font-semibold hover:bg-slate-50"
              >
                So läuft’s ab
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-6 w-6 text-emerald-600" />
                <div className="text-sm font-semibold text-slate-900">1) Kurz verstehen</div>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Ziele, vorhandene Geräte, Wohnsituation, Budget. Wir klären, was du wirklich brauchst – und was nicht.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
              <div className="flex items-center gap-3">
                <Puzzle className="h-6 w-6 text-emerald-600" />
                <div className="text-sm font-semibold text-slate-900">2) Passend empfehlen</div>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Ich stelle eine kompatible Auswahl zusammen – von „preiswert reicht“ bis „Premium, wenn sinnvoll“.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
              <div className="flex items-center gap-3">
                <Video className="h-6 w-6 text-emerald-600" />
                <div className="text-sm font-semibold text-slate-900">3) Umsetzen nach Bedarf</div>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                DIY mit Anleitung oder gemeinsam im Call/Vor-Ort – du entscheidest, wie viel Hilfe du willst.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">Wichtig:</span> homigo ist für Menschen, die eine funktionierende Lösung wollen.
            Wenn du schon tief in Home Assistant & Automationen steckst, ist der Shop oft der schnellere Weg – mit Beratung nur bei Bedarf.
          </div>
        </div>
      </section>

      {/* Shop Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Shop: kuratiert, kompatibel, klar</h2>
              <p className="mt-2 text-slate-600 max-w-2xl">
                Keine endlosen Vergleichstabellen: Im Shop findest du ausgewählte Produkte mit Kompatibilitätsinfos –
                inklusive B‑Stock/Differenzbesteuerung, wenn verfügbar.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/shop/products"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700"
              >
                Alle Produkte
                <PackageSearch className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/shop/collections"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-900 font-semibold hover:bg-slate-50"
              >
                Kategorien
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-sm font-semibold text-slate-900">Kompatibilität schnell prüfen</div>
              <p className="mt-2 text-sm text-slate-600">
                Funkstandard, Hub‑Pflicht, Ökosysteme – damit du nicht aus Versehen das falsche Teil kaufst.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-sm font-semibold text-slate-900">Faire Optionen</div>
              <p className="mt-2 text-sm text-slate-600">
                Neuware, B‑Stock und Bundles – je nach Budget und Anspruch.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-sm font-semibold text-slate-900">Wenn’s hakt: Call statt Frust</div>
              <p className="mt-2 text-sm text-slate-600">
                Du kannst jederzeit Beratung dazubuchen – ohne dass du dich durch Foren kämpfen musst.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-4xl font-bold mb-8">Hi, ich bin Damon!</h2>
              <p className="text-xl text-gray-300 mb-8">
                Ich helfe dir, Smart Home so aufzusetzen, dass es im Alltag wirklich funktioniert – verständlich, pragmatisch und ohne unnötige Komplexität. Statt auf teure und komplizierte Systeme setze ich auf bewährte Smart Home Produkte, die du auch
                aus dem Handel kennst.
              </p>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Verständliche Sprache</h3>
                    <p className="text-gray-400 text-sm">Keine Fachbegriffe, alles erklärt</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Flexible Lösungen</h3>
                    <p className="text-gray-400 text-sm">Einfach statt kompliziert</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Transparente Preise</h3>
                    <p className="text-gray-400 text-sm">Festpreise, keine Überraschungen</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Online & Vor-Ort</h3>
                    <p className="text-gray-400 text-sm">Flexible Beratungsoptionen</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-500/20">
                  <img
                    src="/images/damon-portrait.jpg"
                    alt="Damon Schacht - homigo Gründer und Smart Home Berater"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500 rounded-full opacity-20"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-emerald-400 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Home Generator Bereich */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <Smartphone className="w-16 h-16 text-emerald-500 drop-shadow-lg" />
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Stelle dein eigenes Smart Home zusammen!</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Mit unserem interaktiven Smart Home Generator kannst du verschiedene Geräte und Räume ganz einfach zusammenstellen.
            Perfekt, um Inspiration für dein persönliches Smart Home Konzept zu bekommen – völlig unverbindlich.
          </p>
          <Link
            href="/smart-home-generator"
            className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 text-lg font-semibold transition-all transform hover:scale-105"
          >
            Jetzt ausprobieren
            <span className="ml-3">
              <Wifi className="w-6 h-6" />
            </span>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Häufige Fragen</h2>
            <p className="text-xl text-gray-600">Hier findest du Antworten auf wichtige Fragen.</p>
          </div>

          <div className="space-y-8">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{item.question}</h3>
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Du willst dein Zuhause smarter machen?</h2>
          <p className="text-xl mb-8 text-emerald-100">Komm gerne auf uns zu! Erstberatung für alle deine Smart Home Wünsche.</p>
          <Link
            href="/kontakt"
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 inline-flex items-center"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Beratung anfragen
          </Link>
        </div>
      </section>

    </div>
  );
}