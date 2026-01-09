import type { Metadata } from 'next';
import SmartHomeGenerator from '@/components/sections/smart-home-generator';

export const metadata: Metadata = {
  title: 'Smart Home Generator | homigo',
  description:
    'Stelle dir in wenigen Minuten dein Smart-Home-Setup zusammen: Räume wählen, Geräte hinzufügen und eine übersichtliche Auswahl erhalten.',
  alternates: {
    canonical: 'https://www.homigo.tech/smart-home-generator',
  },
  openGraph: {
    title: 'Smart Home Generator | homigo',
    description: 'Räume wählen, Geräte hinzufügen, Überblick erhalten – und anschließend ein Erstgespräch buchen.',
    url: 'https://www.homigo.tech/smart-home-generator',
    siteName: 'homigo',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function SmartHomeGeneratorPage() {
  return (
    <section aria-label="Smart Home Generator" className="pt-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="py-8 sm:py-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Smart Home Generator</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Wähle Räume aus, füge passende Geräte hinzu und erhalte eine kompakte Übersicht. Danach kannst du dein
            kostenloses Erstgespräch buchen – wir prüfen Kompatibilität und übernehmen auf Wunsch den kompletten Setup.
          </p>
        </header>
      </div>

      <SmartHomeGenerator />
    </section>
  );
}