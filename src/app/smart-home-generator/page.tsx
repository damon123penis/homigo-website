'use client';

import React from 'react';
import Logo from '../../components/ui/Logo';
import Link from 'next/link';
import { Calendar, Home as HomeIcon, Wifi, Smartphone, ArrowLeft } from 'lucide-react';
import ModernSmartHomeConfigurator from '../../components/sections/smart-home-generator'; // passe den Pfad ggf. an

export default function SmartHomeGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo showText={true} size="md" />
            <div className="flex gap-3">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg border border-emerald-600 text-emerald-600 hover:bg-emerald-100 transition-colors">
                <HomeIcon className="w-5 h-5 mr-2" />
                Zurück zur Startseite
              </Link>
              <Link href="/kontakt" className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                Beratung buchen
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 text-white py-20 mb-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Smartphone className="w-14 h-14 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Smart Home Generator
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Stelle dir dein persönliches Smart Home virtuell zusammen und entdecke, wie einfach moderne Technik zu dir nach Hause kommt. 
            Unser Generator bietet dir Inspiration für deine individuelle Lösung!
          </p>
        </div>
      </section>

      {/* Smart Home Generator Konfigurator */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <ModernSmartHomeConfigurator />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <Logo showText={true} size="lg" />
            <div className="mt-6 md:mt-0 flex flex-col md:flex-row gap-4 items-center">
              <Link href="/impressum" className="text-gray-400 hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-gray-400 hover:text-white transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 homigo. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}