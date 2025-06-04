import React from 'react';
import Logo from '@/components/ui/Logo';
import ContactForm from '@/components/forms/ContactForm';
import { Mail, Phone, MapPin, Clock, Calendar, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Kontakt - homigo Smart Home Beratung',
  description: 'Kontaktiere homigo für deine Smart Home Beratung. Kostenlose Erstberatung in der Rhein-Main-Region.',
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo showText={true} size="md" />
            <a href="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
              ← Zurück zur Hauptseite
            </a>
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="bg-slate-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Lass uns über dein Smart Home sprechen
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Kostenlose Erstberatung, individuelle Lösungen und kompetente Beratung - 
                ich freue mich auf deine Anfrage.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                
                {/* Direct Contact */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-6">Direkter Kontakt</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">E-Mail</p>
                        <a href="mailto:damon@homigo.tech" className="text-emerald-600 hover:underline">
                          damon@homigo.tech
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Telefon</p>
                        <a href="tel:+4912345678" className="text-emerald-600 hover:underline">
                          +49 (0) XXX XXXXXX
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Service-Gebiet</p>
                        <p className="text-gray-600">Rhein-Main-Region</p>
                        <p className="text-sm text-gray-500">Online bundesweit</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-6">Was du erwarten kannst</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Schnelle Antwort</p>
                        <p className="text-sm text-gray-600">Rückmeldung innerhalb von 24 Stunden</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Kostenlose Erstberatung</p>
                        <p className="text-sm text-gray-600">30 Minuten unverbindliche Beratung</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Individuelle Lösungen</p>
                        <p className="text-sm text-gray-600">Maßgeschneidert für deine Bedürfnisse</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-emerald-800 mb-4">Verfügbarkeit</h3>
                  <div className="space-y-2 text-sm text-emerald-700">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Mo - Fr: 9:00 - 18:00 Uhr</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Sa: 10:00 - 14:00 Uhr</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Termine auch außerhalb der Zeiten möglich</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 homigo. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}