'use client'

import React from 'react';
import Logo from '../components/ui/Logo';
import Link from 'next/link'; 
import { CheckCircle, Calendar, Mail, Phone, MapPin, Wifi, Shield, Lightbulb, Speaker, Zap, Home, Smartphone, Monitor, Wrench, Headphones } from 'lucide-react';

export default function HomePage() {
  const services = [
    {
      icon: <Monitor className="w-12 h-12 text-emerald-500" />,
      title: "Online-Beratung",
      price: "ab 69€",
      description: "Bundesweite Beratung per Videocall mit individuellem Konzept und Einrichtungsanleitung.",
      features: ["30-min Videocall", "Produktempfehlungen", "Detaillierte Anleitung"]
    },
    {
      icon: <Home className="w-12 h-12 text-emerald-500" />,
      title: "Vor-Ort-Service",
      price: "ab 129€",
      description: "Persönliche Beratung in der Rhein-Main-Region mit kompletter Einrichtung vor Ort.",
      features: ["Beratung vor Ort", "Komplette Einrichtung", "Anfahrt bis 40km inkl."]
    },
    {
      icon: <Wrench className="w-12 h-12 text-emerald-500" />,
      title: "Erweiterte Systeme",
      price: "ab 59€",
      description: "Integration komplexer Smart Home Systeme wie Home Assistant oder ioBroker.",
      features: ["Home Assistant Setup", "System Integration", "Komplexe Automatisierung"]
    },
    {
      icon: <Headphones className="w-12 h-12 text-emerald-500" />,
      title: "Support & Wartung",
      price: "individuell",
      description: "Dauerhafte Betreuung und Wartungspakete auch nach der Einrichtungsphase.",
      features: ["Remote Support", "Wartungspakete", "Hardware-Lieferung"]
    }
  ];

  const faqItems = [
    {
      question: "Muss ich mein Zuhause umbauen?",
      answer: "Nein! Wir arbeiten mit Produkten aus dem Einzelhandel für private Endkunden, die keine festen Einbauten benötigen. Dies spart teure Handwerksarbeiten."
    },
    {
      question: "Was ist alles möglich mit Smart Home?",
      answer: "Bei Smart Home Lösungen sind kaum Grenzen gesetzt. Neben klassischen Anwendungsgebieten mit smarter Licht- und Heizungssteuerung gibt es auch umfassendere Anwendungsgebiete wie ganzheitliche Haussteuerung inklusive Einbindung von Solarenergie und Speichertechnik, z.B. durch ein Balkonkraftwerk."
    },
    {
      question: "Welche Marken nutzt du?",
      answer: "Ich arbeite ausschließlich mit Consumer Produkten bekannter Marken, bevorzugt mit Shelly, Aqara, Tado, Philips Hue, Sonoff und anderen bewährten Smart-Home-Herstellern sowie Open Source Lösungen wie Home Assistant oder ioBroker."
    },
    {
      question: "Funktioniert das auch in Mietwohnungen?",
      answer: "Absolut! Die meisten Lösungen lassen sich rückstandsfrei wieder entfernen – perfekt für Mieter."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo showText={true} size="md" />
            <Link href="/kontakt" className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Beratung buchen
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Smart Home 
              <span className="text-emerald-400"> ohne Kabelsalat</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Willkommen bei homigo, deinem persönlichen Service für einfache, digitale 
              Smart-Home-Lösungen in der Rhein-Main-Region – und darüber hinaus online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/kontakt" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" />
                Jetzt Beratung buchen
              </Link>
              <a href="#services" className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all">
                Leistungen ansehen
              </a>
            </div>
            
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>komfortabler</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>sicherer</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-emerald-400" />
                <span>energieeffizienter</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Was bietet homigo?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maßgeschneiderte Smart Home-Beratung – egal ob online oder persönlich vor Ort.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1 text-center">
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
                Als Smart Home-Enthusiast und Gründer von homigo ist es meine Mission, 
                Technologie für jeden zugänglich zu machen. Statt auf teure und komplizierte 
                Systeme setzen wir auf bewährte Smart Home Produkte, die du auch aus dem Handel kennst.
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
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Stelle dein eigenes Smart Home zusammen!
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Mit unserem interaktiven Smart Home Generator kannst du verschiedene Geräte und Räume ganz einfach zusammenstellen.
            Perfekt, um Inspiration für dein persönliches Smart Home Konzept zu bekommen – völlig unverbindlich.
          </p>
          <Link 
            href="/smart-home-generator/smart-home-generator"
            className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 text-lg font-semibold transition-all transform hover:scale-105"
          >
            Jetzt ausprobieren
            <span className="ml-3"><Wifi className="w-6 h-6" /></span>
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
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Du willst dein Zuhause smarter machen?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Komm gerne auf uns zu! Kostenlose Erstberatung für alle deine Smart Home Wünsche.
          </p>
          <Link href="/kontakt" className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 inline-flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Jetzt Beratung buchen
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="mb-6">
                <Logo showText={true} size="lg" />
              </div>
              <p className="text-gray-400">
                Smart Home ohne Kabelsalat. Dein persönlicher Service für einfache, 
                digitale Smart-Home-Lösungen in der Rhein-Main-Region.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Kontakt</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span>hallo@homigo.tech</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>+49 152 27178595</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>Frankenallee 23a, 60327 Frankfurt am Main</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Rechtliches</h3>
              <div className="space-y-3">
                <Link href="/impressum" className="block text-gray-400 hover:text-white transition-colors">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="block text-gray-400 hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 mt-12 text-center text-gray-400">
            <p>&copy; 2025 homigo. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}