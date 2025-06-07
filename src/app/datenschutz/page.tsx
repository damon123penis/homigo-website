import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield, Mail, Phone, MapPin, Lock, Eye, UserCheck, FileText } from 'lucide-react'
import Logo from '../../components/ui/Logo'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - homigo | Smart Home Beratung',
  description: 'Datenschutzerklärung für homigo Smart Home Service - Ihre Daten sind bei uns sicher',
  robots: 'noindex, nofollow',
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo showText={true} size="md" />
            <Link 
              href="/" 
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <Shield className="w-10 h-10 mr-4" />
            Datenschutzerklärung
          </h1>
          <p className="text-gray-300 text-lg">
            Ihre Daten sind bei uns sicher - Transparenz über unseren Umgang mit personenbezogenen Daten
          </p>
        </div>

        {/* Quick Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500 hover:shadow-lg transition-all">
            <Eye className="w-6 h-6 text-emerald-600 mb-2" />
            <h3 className="font-semibold text-slate-800">Transparenz</h3>
            <p className="text-sm text-gray-600">Vollständige Aufklärung über Datenverarbeitung</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500 hover:shadow-lg transition-all">
            <Lock className="w-6 h-6 text-emerald-600 mb-2" />
            <h3 className="font-semibold text-slate-800">Sicherheit</h3>
            <p className="text-sm text-gray-600">SSL-Verschlüsselung und sichere Übertragung</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500 hover:shadow-lg transition-all">
            <UserCheck className="w-6 h-6 text-emerald-600 mb-2" />
            <h3 className="font-semibold text-slate-800">Ihre Rechte</h3>
            <p className="text-sm text-gray-600">Auskunft, Berichtigung und Löschung</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500 hover:shadow-lg transition-all">
            <FileText className="w-6 h-6 text-emerald-600 mb-2" />
            <h3 className="font-semibold text-slate-800">DSGVO</h3>
            <p className="text-sm text-gray-600">Vollständig DSGVO-konform</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Datenschutz auf einen Blick */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-emerald-500">
              1. Datenschutz auf einen Blick
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Allgemeine Hinweise</h3>
                <p className="text-gray-700 leading-relaxed">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                  personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Datenerfassung auf dieser Website</h4>
                <div className="bg-emerald-50 p-4 rounded-xl border-l-4 border-emerald-500">
                  <h5 className="font-semibold text-slate-800 mb-2">Wer ist verantwortlich für die Datenerfassung?</h5>
                  <p className="text-gray-700 text-sm">
                    Die Datenverarbeitung erfolgt durch den Websitebetreiber. Kontaktdaten finden Sie 
                    im Abschnitt "Verantwortliche Stelle".
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Wie erfassen wir Ihre Daten?</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h5 className="font-semibold text-slate-800 mb-2">Direkte Datenangabe</h5>
                    <p className="text-gray-700 text-sm">
                      Daten, die Sie uns mitteilen (z.B. Kontaktformular, E-Mail-Anfragen)
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h5 className="font-semibold text-slate-800 mb-2">Automatische Erfassung</h5>
                    <p className="text-gray-700 text-sm">
                      Technische Daten (IP-Adresse, Browser, Betriebssystem) beim Websitebesuch
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Wofür nutzen wir Ihre Daten?</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Fehlerfreie Bereitstellung der Website</li>
                  <li>Smart Home Beratung und Projektplanung</li>
                  <li>Beantwortung von Anfragen</li>
                  <li>Vertragsabwicklung und Serviceleistungen</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Hosting */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-emerald-500">
              2. Hosting
            </h2>
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Vercel Hosting</h3>
              <p className="text-gray-700 mb-4">
                Diese Website wird bei Vercel gehostet. Die personenbezogenen Daten werden auf den 
                Servern des Hosting-Providers gespeichert. Dies können IP-Adressen, Kontaktanfragen, 
                Meta- und Kommunikationsdaten sowie sonstige Daten sein.
              </p>
              <p className="text-gray-700 text-sm">
                Das Hosting erfolgt zur Vertragserfüllung und im Interesse einer sicheren, 
                schnellen Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. b und f DSGVO).
              </p>
            </div>
          </section>

          {/* Verantwortliche Stelle */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-emerald-500">
              3. Verantwortliche Stelle
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-emerald-500">
              <address className="not-italic space-y-2 text-gray-700">
                <div className="font-semibold text-lg text-slate-800">Damon Schacht</div>
                <div>homigo - Smart Home Service</div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                  Frankenallee 23A, 60327 Frankfurt am Main
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-emerald-600" />
                  <a href="tel:+4915227178595" className="text-emerald-600 hover:text-emerald-700">
                    0152 27178595
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-emerald-600" />
                  <a href="mailto:hallo@homigo.tech" className="text-emerald-600 hover:text-emerald-700">
                    hallo@homigo.tech
                  </a>
                </div>
              </address>
            </div>
          </section>

          {/* Verarbeitete Daten */}
          <section>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Art der verarbeiteten Daten</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-4 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2">Kontaktdaten</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Name, E-Mail, Telefonnummer</li>
                  <li>• Anfragedaten und Projektdetails</li>
                  <li>• Smart Home Präferenzen</li>
                </ul>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2">Technische Daten</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• IP-Adresse und Browser-Informationen</li>
                  <li>• Betriebssystem und Gerätetype</li>
                  <li>• Uhrzeit des Seitenaufrufs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SSL-Verschlüsselung */}
          <section>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">SSL-Verschlüsselung</h3>
            <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
              <p className="text-gray-700">
                Diese Website nutzt SSL-bzw. TLS-Verschlüsselung zum Schutz vertraulicher Inhalte. 
                Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile von "http://" 
                auf "https://" wechselt und am Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </div>
          </section>

          {/* Ihre Rechte */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-emerald-500">
              4. Ihre Rechte
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-slate-800 mb-2">Auskunftsrecht</h4>
                  <p className="text-sm text-gray-700">
                    Unentgeltliche Auskunft über gespeicherte personenbezogene Daten, 
                    deren Herkunft und Empfänger.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-slate-800 mb-2">Berichtigung & Löschung</h4>
                  <p className="text-sm text-gray-700">
                    Recht auf Berichtigung unrichtiger oder Löschung unrechtmäßig 
                    gespeicherter Daten.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-slate-800 mb-2">Widerspruchsrecht</h4>
                  <p className="text-sm text-gray-700">
                    Widerspruch gegen die Verarbeitung Ihrer Daten bei berechtigten Interessen.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-slate-800 mb-2">Datenübertragbarkeit</h4>
                  <p className="text-sm text-gray-700">
                    Übertragung Ihrer Daten an Sie oder einen anderen Verantwortlichen 
                    in maschinenlesbarem Format.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact & Navigation */}
        <div className="mt-8 space-y-6">
          <div className="bg-emerald-50 p-6 rounded-xl border-l-4 border-emerald-500">
            <h3 className="font-semibold text-slate-800 mb-2">Fragen zum Datenschutz?</h3>
            <p className="text-gray-700 mb-4">
              Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte können Sie sich jederzeit an uns wenden:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:hallo@homigo.tech" 
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
              >
                <Mail className="w-4 h-4 mr-2" />
                hallo@homigo.tech
              </a>
              <a 
                href="tel:+4915227178595" 
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
              >
                <Phone className="w-4 h-4 mr-2" />
                0152 27178595
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/impressum"
              className="btn-secondary text-center"
            >
              Zum Impressum
            </Link>
            <Link
              href="/"
              className="btn-primary text-center"
            >
              Zurück zur Startseite
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Erstellt mit e-recht24.de</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-16 mt-12">
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
            <p>&copy; 2024 homigo. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}