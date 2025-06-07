// src/app/impressum/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'
import Logo from '../../components/ui/Logo'

export const metadata: Metadata = {
  title: 'Impressum - homigo | Smart Home ohne Kabelsalat',
  description: 'Impressum und rechtliche Informationen für homigo - Ihr Smart Home Experte in der Rhein-Main-Region',
  robots: 'noindex, nofollow',
}

export default function ImpressumPage() {
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
          <h1 className="text-4xl font-bold mb-4">📄 Impressum</h1>
          <p className="text-gray-300 text-lg">
            homigo - Smart Home ohne Kabelsalat
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Anbieter */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-emerald-500">
              Anbieter
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-emerald-500">
              <address className="not-italic space-y-2 text-gray-700">
                <div className="font-semibold text-lg text-slate-800">Damon Schacht</div>
                <div>homigo - Smart Home Beratung</div>
                <div className="flex items-center mt-3">
                  <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                  Frankenallee 23A, 60327 Frankfurt am Main
                </div>
              </address>
            </div>
          </section>

          {/* Kontakt */}
          <section>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Kontakt</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all">
                <Mail className="w-5 h-5 text-emerald-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">E-Mail</div>
                  <a 
                    href="mailto:hallo@homigo.tech" 
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    hallo@homigo.tech
                  </a>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all">
                <Phone className="w-5 h-5 text-emerald-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Telefon</div>
                  <a 
                    href="tel:+4915227178595" 
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    0152 27178595
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Geschäftstätigkeit */}
          <section>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Geschäftstätigkeit</h3>
            <p className="text-gray-700 leading-relaxed">
              Smart Home Beratung und -installation in der Rhein-Main-Region sowie bundesweite 
              Online-Beratung für einfache, digitale Smart-Home-Lösungen.
            </p>
          </section>

          {/* Verbraucherstreitbeilegung */}
          <section>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Verbraucherstreitbeilegung/Universalschlichtungsstelle
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/datenschutz"
            className="btn-secondary text-center"
          >
            Zur Datenschutzerklärung
          </Link>
          <Link
            href="/"
            className="btn-primary text-center"
          >
            Zurück zur Startseite
          </Link>
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