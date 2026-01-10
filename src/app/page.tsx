import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Calendar, Wifi, Smartphone, Monitor, Wrench, Headphones, Home } from 'lucide-react';
import SmartHomeBanner from '../components/layout/banner';

export const metadata: Metadata = {
  title: 'homigo – Smart Home ohne Kabelsalat',
  description:
    'Persönliche Smart-Home-Beratung und Setup – online bundesweit und vor Ort in der Rhein-Main-Region. Plug & Play statt Kabelsalat.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'homigo – Smart Home ohne Kabelsalat',
    description:
      'Persönliche Smart-Home-Beratung und Setup – online bundesweit und vor Ort in der Rhein-Main-Region. Plug & Play statt Kabelsalat.',
    url: 'https://www.homigo.tech/',
    siteName: 'homigo',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'homigo – Smart Home ohne Kabelsalat',
    description:
      'Persönliche Smart-Home-Beratung und Setup – online bundesweit und vor Ort in der Rhein-Main-Region.',
  },
};

export default function HomePage() {
  const services = [
    {
      icon: <Monitor className="w-12 h-12 text-emerald-500" />,
      title: 'Online-Beratung',
      price: 'ab 69€',
      description: 'Bundesweite Beratung per Videocall mit individuellem Konzept und Einrichtungsanleitung.',
      features: ['30-min Videocall', 'Produktempfehlungen', 'Detaillierte Anleitung'],
    },
    {
      icon: <Home className="w-12 h-12 text-emerald-500" />,
      title: 'Vor-Ort-Service',
      price: 'ab 129€',
      description: 'Persönliche Beratung in der Rhein-Main-Region mit kompletter Einrichtung vor Ort.',
      features: ['Beratung vor Ort', 'Komplette Einrichtung', 'Anfahrt bis 40km inkl.'],
    },
    {
      icon: <Wrench className="w-12 h-12 text-emerald-500" />,
      title: 'Erweiterte Systeme',
      price: 'ab 59€',
      description: 'Integration komplexer Smart Home Systeme wie Home Assistant oder ioBroker.',
      features: ['Home Assistant Setup', 'System Integration', 'Komplexe Automatisierung'],
    },
    {
      icon: <Headphones className="w-12 h-12 text-emerald-500" />,
      title: 'Support & Wartung',
      price: 'individuell',
      description: 'Dauerhafte Betreuung und Wartungspakete auch nach der Einrichtungsphase.',
      features: ['Remote Support', 'Wartungspakete', 'Hardware-Lieferung'],
    },
  ];

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
      answer: 'Dies ist in Arbeit. Bald wird homigo auch zu deinem bevorzugten Smart Home Shop! Bleib gespannt.',
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
    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Smart Home Starterpaket (Online)',
        price: '69',
        priceCurrency: 'EUR',
        category: 'https://schema.org/Service',
        url: 'https://www.homigo.tech/',
      },
      {
        '@type': 'Offer',
        name: 'Smart Home Starterpaket (Vor Ort)',
        price: '119',
        priceCurrency: 'EUR',
        category: 'https://schema.org/Service',
        url: 'https://www.homigo.tech/',
      },
    ],
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
            <strong className="font-semibold text-slate-800">Dein Amigo fürs Smart Home.</strong><br />
            Persönliche Beratung, einfache Systeme und Lösungen, die wirklich zu dir passen.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-800 mb-4">Was bietet homigo?</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                href="/leistungen-im-detail"
                className="group"
                aria-label={`Mehr Informationen zu ${service.title}`}
              >
                <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1 text-center cursor-pointer group-hover:ring-2 group-hover:ring-emerald-500/40">
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{service.title}</h3>
                  <div className="text-2xl font-bold text-emerald-600 mb-4">{service.price}</div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
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
                Als Smart Home-Enthusiast und Gründer von homigo ist es meine Mission, Technologie für jeden zugänglich zu
                machen. Statt auf teure und komplizierte Systeme setzen wir auf bewährte Smart Home Produkte, die du auch
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
            Jetzt Beratung buchen
          </Link>
        </div>
      </section>

    </div>
  );
}