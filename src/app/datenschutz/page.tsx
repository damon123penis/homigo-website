import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  FileText,
  Server,
  Cookie,
  BarChart3,
  Megaphone,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  CreditCard,
  Truck,
  User,
  AlertTriangle,
  Star,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | homigo – Smart Home ohne Kabelsalat',
  description:
    'Datenschutzerklärung von homigo. Informationen zur Verarbeitung personenbezogener Daten beim Besuch der Website und im Shop (Shopify), Bestellungen, Zahlung, Versand (DHL), Cookies, Einwilligungen, Google Analytics/Tag Manager, Marketing, YouTube-Einbindungen sowie Newsletter (Shopify Email) und Bewertungen (Judge.me).',
  alternates: { canonical: 'https://www.homigo.tech/datenschutz' },
  robots: { index: true, follow: true },
}

export default function DatenschutzPage() {
  const updated = '24.01.2026'

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Hero */}
        <section className="rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15">
              <Shield className="h-6 w-6 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Datenschutzerklärung</h1>
              <p className="mt-3 max-w-3xl text-sm text-slate-200 sm:text-base">
                Nachfolgend informieren wir dich über die Verarbeitung personenbezogener Daten beim Besuch und bei der Nutzung
                unserer Website sowie des integrierten Shops (Bestellung, Zahlung, Versand) und der eingebundenen Dienste
                (z. B. Terminbuchung, Analytics, Marketing).
              </p>
              <p className="mt-4 text-xs text-slate-300">Stand: {updated}</p>
            </div>
          </div>
        </section>

        {/* Quick cards */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <Eye className="h-6 w-6 text-emerald-700" />
            <p className="mt-3 font-semibold text-slate-900">Transparenz</p>
            <p className="mt-1 text-sm text-slate-600">Welche Daten wir wofür verarbeiten – Website und Shop.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <Lock className="h-6 w-6 text-emerald-700" />
            <p className="mt-3 font-semibold text-slate-900">Sicherheit</p>
            <p className="mt-1 text-sm text-slate-600">SSL/TLS, Fraud-Prevention und minimierte Datenerfassung.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <UserCheck className="h-6 w-6 text-emerald-700" />
            <p className="mt-3 font-semibold text-slate-900">Deine Rechte</p>
            <p className="mt-1 text-sm text-slate-600">Auskunft, Löschung, Widerspruch, Widerruf.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <FileText className="h-6 w-6 text-emerald-700" />
            <p className="mt-3 font-semibold text-slate-900">Einwilligungen</p>
            <p className="mt-1 text-sm text-slate-600">Cookie-Consent via Klaro (Opt-in).</p>
          </div>
        </section>

        {/* TOC */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Inhalt</h2>
          <div className="mt-4 grid gap-2 text-sm text-emerald-700 sm:grid-cols-2">
            <a className="hover:underline" href="#verantwortlicher">
              1) Verantwortlicher
            </a>
            <a className="hover:underline" href="#serverlog">
              2) Datenerfassung beim Besuch (Server-Logfiles)
            </a>
            <a className="hover:underline" href="#hosting">
              3) Hosting / CDN (Vercel / Cloudflare / Shopify)
            </a>
            <a className="hover:underline" href="#cookies">
              4) Cookies & Einwilligungsmanagement (Klaro)
            </a>
            <a className="hover:underline" href="#shop">
              5) Shop, Warenkorb & Checkout (Shopify)
            </a>
            <a className="hover:underline" href="#zahlung">
              6) Zahlungsabwicklung
            </a>
            <a className="hover:underline" href="#versand">
              7) Versand & Zustellung (DHL)
            </a>
            <a className="hover:underline" href="#bewertungen">
              8) Bewertungen & Bewertungserinnerungen (Judge.me)
            </a>
            <a className="hover:underline" href="#kontakt">
              9) Kontakt & Terminbuchung (Formular / E-Mail / Calendly)
            </a>
            <a className="hover:underline" href="#analytics">
              10) Webanalyse, Marketing & Newsletter (Google / YouTube / Shopify Email)
            </a>
            <a className="hover:underline" href="#rechte">
              11) Betroffenenrechte
            </a>
            <a className="hover:underline" href="#speicherdauer">
              12) Speicherdauer
            </a>
          </div>
        </section>

        {/* Main content */}
        <section className="mt-8 space-y-8">
          {/* 1 */}
          <div id="verantwortlicher" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">1) Einleitung & Kontaktdaten des Verantwortlichen</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst. Wir verarbeiten
              personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website und eines Online-Shops
              sowie zur Beantwortung deiner Anfragen oder zur Durchführung vorvertraglicher Maßnahmen/Verträge erforderlich ist
              oder du eingewilligt hast.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Verantwortlicher (Art. 4 Nr. 7 DSGVO)</p>
              <address className="mt-3 not-italic text-sm text-slate-700">
                <div className="font-semibold">Damon Schacht</div>
                <div>homigo – Smart Home Beratung</div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-700" />
                    <span>Frankenallee 23A, 60327 Frankfurt am Main, Deutschland</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-emerald-700" />
                    <a className="text-emerald-700 hover:underline" href="tel:+4915227178595">
                      +49 152 27178595
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-700" />
                    <a className="text-emerald-700 hover:underline" href="mailto:hallo@homigo.tech">
                      hallo@homigo.tech
                    </a>
                  </div>
                </div>
              </address>
            </div>
          </div>

          {/* 2 */}
          <div id="serverlog" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                <Server className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">2) Datenerfassung beim Besuch unserer Website</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Bei der bloß informatorischen Nutzung erheben wir nur die Daten, die dein Browser an den Server übermittelt
                  („Server-Logfiles“). Dazu können gehören: aufgerufene Seite, Datum/Uhrzeit, übertragene Datenmenge,
                  Referrer-URL, Browsertyp/-version, Betriebssystem sowie IP-Adresse.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Stabilität, Sicherheit und
                  Fehleranalyse). Eine Zusammenführung dieser Daten mit anderen Datenquellen findet grundsätzlich nicht
                  statt. Wir behalten uns vor, Logfiles nachträglich zu prüfen, wenn konkrete Anhaltspunkte auf eine
                  rechtswidrige Nutzung hinweisen.
                </p>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">SSL-/TLS-Verschlüsselung</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Diese Website nutzt SSL-/TLS-Verschlüsselung zum Schutz der Übertragung vertraulicher Inhalte. Eine
                    verschlüsselte Verbindung erkennst du an „https://“ und am Schloss-Symbol im Browser.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div id="hosting" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                <Server className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">3) Hosting & Content-Delivery-Network</h2>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">3.1 Vercel (Website-Hosting)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Unsere Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA („Vercel") gehostet.
                  Dabei werden die bei Nutzung unserer Website entstehenden Daten (z. B. Server-Logfiles) verarbeitet.
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und performanten
                  Online-Angebot) und ggf. Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen), wenn du Kontakt aufnimmst.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Sofern erforderlich, schließen wir mit Dienstleistern Verträge zur Auftragsverarbeitung (Art. 28 DSGVO).
                  Bei einer Übermittlung in Drittländer (z. B. USA) erfolgt diese auf Grundlage geeigneter Garantien
                  (z. B. EU-US Data Privacy Framework und/oder Standardvertragsklauseln), soweit anwendbar.
                </p>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">3.2 Cloudflare (DNS/CDN, Security)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Für die Auslieferung und Absicherung unserer Website kann Cloudflare, Inc., 101 Townsend St, San Francisco,
                  CA 94107, USA eingesetzt werden (z. B. als DNS-/Proxy- und/oder CDN-Dienst). Cloudflare kann technische
                  Zugriffsdaten (insb. IP-Adresse, Requests) verarbeiten, um Inhalte schneller und sicherer bereitzustellen.
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Stabilität, Performance und
                  Schutz vor Angriffen).
                </p>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">3.3 Shopify (Shop-System / Commerce-Backend)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Unser Online-Shop wird technisch über Shopify bereitgestellt. Anbieter ist Shopify International Limited,
                  Victoria Buildings, 2nd Floor, 1-2 Haddington Road, Dublin 4, D04 XN32, Irland („Shopify"). Je nach
                  Funktionalität können Daten auch an Shopify Inc., 150 Elgin St, Ottawa, ON K2P 1L4, Kanada übertragen
                  werden. Shopify verarbeitet Daten zur Bereitstellung des Shops (Produktkatalog, Warenkorb, Checkout,
                  Bestellabwicklung, Betrugsprävention, Support).
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Rechtsgrundlagen sind Art. 6 Abs. 1 lit. b DSGVO (Shop-Nutzung, Bestellungen, Kundenkonto), Art. 6 Abs. 1
                  lit. f DSGVO (sicherer Betrieb und Missbrauchsprävention) sowie – soweit erforderlich – Art. 6 Abs. 1 lit. a
                  DSGVO (Einwilligungen, z. B. Marketing/Analytics). Soweit Shopify als Auftragsverarbeiter tätig wird,
                  erfolgt dies auf Grundlage eines Vertrags zur Auftragsverarbeitung (Art. 28 DSGVO).
                </p>

                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-800" />
                    <div>
                      <p className="text-sm font-semibold text-amber-900">Hinweis zu Shopify-„Network Intelligence“</p>
                      <p className="mt-2 text-sm text-amber-900">
                        Shopify kann bestimmte Informationen über Interaktionen mit Shops verarbeiten, um die Sicherheit zu
                        verbessern, Betrug zu verhindern und Dienste weiterzuentwickeln („Shopify Network Intelligence“).
                        Weitere Informationen stellt Shopify in der „Shopify Consumer Privacy Policy“ bereit.
                      </p>
                      <p className="mt-2 text-sm">
                        <a
                          className="font-semibold text-amber-900 underline underline-offset-2"
                          href="https://www.shopify.com/legal/privacy"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Shopify Consumer Privacy Policy
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div id="cookies" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                <Cookie className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">4) Cookies & Einwilligungsmanagement</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Wir verwenden Cookies und ähnliche Technologien, um die Website und den Shop bereitzustellen, Einstellungen
                  zu speichern und – sofern du zustimmst – Dienste für Statistik/Marketing/externe Inhalte zu laden.
                </p>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">4.1 Cookie-Consent-Tool (Klaro)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Zur Einholung wirksamer Einwilligungen nutzen wir das Cookie-Consent-Tool „Klaro" (kiprotect). Das Tool
                  wird beim Seitenaufruf angezeigt und ermöglicht dir, Einwilligungen für bestimmte Dienste zu erteilen oder
                  zu widerrufen. Dabei wird ein technisch notwendiges Cookie gesetzt, um deine Auswahl zu speichern.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung zur Einwilligungsverwaltung) sowie
                  Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an rechtskonformem, nutzerfreundlichem
                  Einwilligungsmanagement). Einwilligungspflichtige Dienste (z. B. Analytics/Marketing) werden erst nach
                  Einwilligung geladen (Art. 6 Abs. 1 lit. a DSGVO).
                </p>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">Cookie-Einstellungen ändern</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Du kannst deine Einwilligungen jederzeit über „Cookie-Einstellungen" in der Fußzeile ändern oder
                    widerrufen.
                  </p>
                </div>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">4.2 Technisch notwendige Shop-Cookies</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Damit der Shop funktioniert, sind technisch notwendige Cookies/Local-Storage-Informationen erforderlich,
                  z. B. um Warenkorb-Inhalte zu speichern, den Checkout zu ermöglichen oder Sicherheitsfunktionen umzusetzen.
                  Ohne diese Cookies kann der Shop ggf. nicht oder nicht vollständig genutzt werden.
                </p>
              </div>
            </div>
          </div>

          {/* 5 */}
          <div id="shop" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                <ShoppingCart className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">5) Shop, Warenkorb & Checkout (Shopify)</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Wenn du unseren Shop nutzt (Produkte ansehen, Warenkorb, Checkout), verarbeiten wir die dafür erforderlichen
                  Daten. Dabei wird Shopify als Shop-System eingesetzt. Je nach Nutzung verarbeiten wir insbesondere:
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  <li>Bestands- und Kontaktdaten (Name, E-Mail, Anschrift, ggf. Telefonnummer)</li>
                  <li>Bestelldaten (Artikel, Preise, Liefer-/Rechnungsadresse, Bestellstatus)</li>
                  <li>Zahlungsdaten (in der Regel durch Zahlungsdienstleister; siehe Abschnitt 6)</li>
                  <li>Technische Daten (IP-Adresse, Geräte-/Browserinformationen, Session-/Warenkorb-IDs)</li>
                </ul>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">5.1 Kundenkonto (optional)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Sofern wir dir die Einrichtung eines Kundenkontos anbieten und du ein Konto erstellst, verarbeiten wir die
                  von dir angegebenen Daten zur Kontoverwaltung (z. B. Bestellübersicht, Adressen). Rechtsgrundlage ist
                  Art. 6 Abs. 1 lit. b DSGVO.
                </p>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">5.2 Bestellabwicklung, Rechnungen, Kommunikation</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Zur Durchführung des Kaufvertrags verarbeiten wir Bestell- und Kontaktdaten (Art. 6 Abs. 1 lit. b DSGVO).
                  Außerdem speichern wir Daten zur Erfüllung gesetzlicher Pflichten (z. B. handels- und steuerrechtliche
                  Aufbewahrungspflichten; Art. 6 Abs. 1 lit. c DSGVO).
                </p>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">5.3 Betrugsprävention & Sicherheit</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Zur Verhinderung von Betrug, Missbrauch und Angriffen können Sicherheits- und Risikosignale verarbeitet
                  werden (z. B. IP-Adresse, Geräte-/Browsermerkmale, Auffälligkeiten im Bestellverhalten). Rechtsgrundlage ist
                  Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Sicherheit und Betrugsprävention).
                </p>
              </div>
            </div>
          </div>

          {/* 6 */}
          <div id="zahlung" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                <CreditCard className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">6) Zahlungsabwicklung</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Die Zahlungsabwicklung erfolgt – je nach gewählter Zahlungsart – über Shopify (insbesondere Shopify
                  Payments) und/oder eingebundene Zahlungsdienstleister. Dabei werden die für die Zahlung erforderlichen
                  Informationen (z. B. Name, Betrag, Währung, Transaktionsdaten) an den jeweiligen Zahlungsdienstleister
                  übermittelt. Zahlungsdaten (z. B. Kreditkartennummern) werden in der Regel nicht von uns, sondern durch den
                  Zahlungsdienstleister verarbeitet.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Soweit Zahlungsdienstleister eigene
                  Zwecke verfolgen (z. B. Betrugsprävention), gelten deren Datenschutzhinweise.
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">Hinweis</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Welche konkreten Zahlungsarten angeboten werden, wird dir im Checkout angezeigt. Die dort verlinkten
                    Datenschutzinformationen des jeweiligen Zahlungsdienstleisters sind maßgeblich.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 7 */}
          <div id="versand" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                <Truck className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">7) Versand & Zustellung</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Zur Lieferung von Bestellungen geben wir – soweit erforderlich – Versand- und Kontaktdaten (z. B. Name,
                  Adresse) an Versanddienstleister weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Erfüllung des
                  Kaufvertrags).
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Je nach Versanddienstleister kann eine Sendungsverfolgung angeboten werden. Dabei können Statusdaten zur
                  Lieferung verarbeitet werden.
                </p>
                <h3 className="mt-6 text-lg font-semibold text-slate-900">7.1 DHL (Versanddienstleister)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Für den Versand nutzen wir DHL (Deutsche Post AG, Charles-de-Gaulle-Straße 20, 53113 Bonn, Deutschland).
                  Zur Zustellung übermitteln wir die hierfür erforderlichen Daten (insb. Name, Lieferadresse und – sofern
                  für die Zustellung/Ankündigung erforderlich – E-Mail-Adresse und/oder Telefonnummer) an DHL.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Erfüllung des Kaufvertrags). Soweit DHL Daten für eigene
                  Zwecke verarbeitet (z. B. Sendungsankündigung, Nachforschungen, Betrugs- und Missbrauchsprävention), gelten
                  die Datenschutzhinweise von DHL.
                </p>
              </div>
            </div>
          </div>

          {/* 8 */}
          <div id="bewertungen" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                <Star className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">8) Bewertungen & Bewertungserinnerungen (Judge.me)</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Wir nutzen Judge.me, um Produktbewertungen anzuzeigen und – sofern du einwilligst oder dies im Rahmen der
                  Bestellabwicklung zulässig ist – Bewertungserinnerungen per E-Mail zu versenden. Anbieter ist Judge.me Ltd.
                  (c/o Buckworths, 2nd Floor, 1-3 Worship Street, London, England, EC2A 2AB, Vereinigtes Königreich).
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Hierfür können insbesondere folgende Daten verarbeitet werden: Name (oder gewählter Anzeigename),
                  E-Mail-Adresse, Bestellinformationen (z. B. bestellter Artikel, Bestelldatum) sowie die von dir abgegebene
                  Bewertung und ggf. technische Nutzungsdaten (z. B. IP-Adresse/Browserinformationen), soweit dies für die
                  Bereitstellung erforderlich ist.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Rechtsgrundlage ist – je nach Ausgestaltung – Art. 6 Abs. 1 lit. a DSGVO (Einwilligung, insbesondere für
                  Bewertungserinnerungen/Marketing-ähnliche Kontaktaufnahme) und/oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                  Interesse an transparenten Kundenbewertungen und der Verbesserung unseres Angebots). Du kannst eine erteilte
                  Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
                </p>
              </div>
            </div>
          </div>

          {/* 9 */}
          <div id="kontakt" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                <Mail className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">9) Kontaktaufnahme & Terminbuchung</h2>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">9.1 Kontakt (E-Mail / Formular)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Wenn du das Kontaktformular nutzt, verarbeiten wir die von dir eingegebenen Daten (Name, E-Mail, Telefon
                  (optional), Betreff und Nachricht). Zusätzlich speichern wir technische Metadaten, die uns helfen, deine
                  Anfrage zuverlässig zu bearbeiten (z. B. Zeitpunkt, die aufgerufene Seite (URL) und den User-Agent deines
                  Browsers).
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Wir speichern Kontaktanfragen in einer Datenbank bei Supabase (Hosting-Region: Irland / EU). Außerdem
                  können wir deine Anfrage in Notion (Notion Labs, Inc.) übernehmen, damit wir sie intern organisieren,
                  bearbeiten und dokumentieren können (z. B. als Ticket/CRM-Eintrag).
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Für den Versand und Empfang von E-Mails (z. B. Benachrichtigung an uns und Bestätigung an dich) nutzen wir
                  den Dienst Resend (Resend, Inc.). Dabei werden deine E-Mail-Adresse sowie der Inhalt der Nachricht
                  verarbeitet, um die Kommunikation bereitzustellen.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen), soweit deine Anfrage auf den
                  Abschluss eines Vertrages gerichtet ist, und ansonsten Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                  an der Beantwortung und Dokumentation von Anfragen). Sofern Dienstleister in unserem Auftrag tätig sind,
                  erfolgt dies im Rahmen einer Auftragsverarbeitung (Art. 28 DSGVO).
                </p>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">9.2 Terminbuchung über Calendly</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Für die Terminbuchung nutzen wir Calendly (Calendly LLC, USA). Wenn du einen Termin buchst, werden die von
                  dir eingegebenen Daten (z. B. Name, E-Mail, Terminwunsch) an Calendly übermittelt und dort verarbeitet, um
                  den Termin zu organisieren und zu bestätigen.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Sofern Calendly als eingebetteter Dienst auf der Website geladen wird, kann dies Cookies/ähnliche
                  Technologien erfordern. Das Laden erfolgt daher – soweit technisch erforderlich – erst nach deiner
                  Einwilligung über das Cookie-Consent-Tool (Art. 6 Abs. 1 lit. a DSGVO). Unabhängig davon ist die
                  Terminabwicklung regelmäßig auch als vorvertragliche Maßnahme zulässig (Art. 6 Abs. 1 lit. b DSGVO), wenn du
                  aktiv eine Buchung vornimmst.
                </p>
              </div>
            </div>
          </div>

          {/* 10 */}
          <div id="analytics" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                <BarChart3 className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">10) Webanalyse & Marketing</h2>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">10.1 Google Analytics 4 (GA4)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Diese Website kann Google Analytics 4 nutzen, einen Webanalysedienst der Google Ireland Limited, Gordon
                  House, 4 Barrow St, Dublin, D04 E5W5, Irland („Google"). Google Analytics verwendet Cookies und ähnliche
                  Technologien, um deine Nutzung der Website zu analysieren.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Dabei können insbesondere Nutzungsdaten (Seitenaufrufe, Interaktionen), Geräte-/Browserinformationen und –
                  technisch bedingt – deine IP-Adresse verarbeitet werden. Wir verwenden Google Analytics nur nach deiner
                  ausdrücklichen Einwilligung über unser Cookie-Consent-Tool (Art. 6 Abs. 1 lit. a DSGVO). Ohne Einwilligung
                  wird GA4 nicht geladen.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Es kann zu Übermittlungen an Server der Google LLC in den USA kommen. Google kann sich – je nach
                  Konfiguration – auf geeignete Garantien (z. B. EU-US Data Privacy Framework und/oder
                  Standardvertragsklauseln) stützen.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem du GA4 in den
                  Cookie-Einstellungen deaktivierst.
                </p>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">10.2 YouTube-Einbindungen (Videos)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Wenn wir Videos über YouTube einbinden, ist Anbieter in der Regel Google Ireland Limited, Gordon House,
                  Barrow Street, Dublin 4, Irland („Google"). Beim Aufruf einer Seite mit eingebettetem YouTube-Video können
                  Daten (z. B. IP-Adresse, Geräte-/Browserinformationen, aufgerufene Seite) an Google übermittelt und dort
                  verarbeitet werden. Sofern du bei YouTube/Google eingeloggt bist, kann die Nutzung deinem Profil zugeordnet
                  werden.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Wir binden YouTube-Videos – soweit möglich – datenschutzfreundlich ein (z. B. über die
                  „nocookie"-Domain/erweiterter Datenschutzmodus). Das Laden externer Inhalte erfolgt – soweit technisch
                  erforderlich – erst nach deiner Einwilligung über das Cookie-Consent-Tool (Art. 6 Abs. 1 lit. a DSGVO).
                </p>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">10.3 Marketing- & Remarketing-Technologien (optional)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Sofern wir Marketing- oder Remarketing-Technologien (z. B. Meta Pixel, Google Ads Conversion Tracking)
                  einsetzen, erfolgt dies ausschließlich nach deiner Einwilligung über das Cookie-Consent-Tool
                  (Art. 6 Abs. 1 lit. a DSGVO). Details zu den konkret aktivierten Diensten findest du in den
                  Cookie-Einstellungen.
                </p>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">10.4 Shopify-Analytics (optional)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Shopify kann im Shop-Kontext statistische Auswertungen bereitstellen (z. B. Seitenaufrufe, Conversion,
                  Warenkorbaktionen). Soweit hierfür Cookies/ähnliche Technologien verwendet werden, erfolgt dies nur nach
                  Einwilligung über das Cookie-Consent-Tool (Art. 6 Abs. 1 lit. a DSGVO). Technisch notwendige Messungen zur
                  Shop-Bereitstellung können sich zudem auf Art. 6 Abs. 1 lit. f DSGVO stützen.
                </p>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">10.5 Newsletter (Shopify Email)</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Wenn du dich zu unserem Newsletter anmeldest, verarbeiten wir deine E-Mail-Adresse (und ggf. freiwillige
                  Angaben wie Name) zum Versand von Informationen über Angebote und Inhalte. Für den Versand nutzen wir
                  Shopify Email (Shopify International Limited, Irland; ggf. Shopify Inc., Kanada).
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Der Newsletter-Versand erfolgt im Double-Opt-in-Verfahren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO
                  (Einwilligung). Du kannst dich jederzeit über den Abmeldelink im Newsletter oder per Nachricht an uns
                  abmelden; anschließend löschen wir deine Daten aus dem Newsletter-Verteiler, sofern keine anderweitige
                  Rechtsgrundlage für eine Speicherung besteht.
                </p>
              </div>
            </div>
          </div>

          {/* 11 */}
          <div id="rechte" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">11) Rechte der betroffenen Personen</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Dir stehen nach der DSGVO insbesondere folgende Rechte zu: Auskunft (Art. 15), Berichtigung (Art. 16),
              Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerruf
              erteilter Einwilligungen (Art. 7 Abs. 3). Außerdem besteht ein Beschwerderecht bei einer Aufsichtsbehörde
              (Art. 77).
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Widerspruchsrecht (Art. 21 DSGVO)</p>
              <p className="mt-2 text-sm text-slate-700">
                Wenn wir Daten auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO) verarbeiten, kannst du aus
                Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit Widerspruch gegen diese Verarbeitung
                einlegen. Werden Daten zu Zwecken der Direktwerbung verarbeitet, kannst du jederzeit Widerspruch dagegen
                einlegen.
              </p>
            </div>
          </div>

          {/* 12 */}
          <div id="speicherdauer" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">12) Dauer der Speicherung</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Die Speicherdauer richtet sich nach dem Zweck der jeweiligen Verarbeitung und – soweit einschlägig – nach
              gesetzlichen Aufbewahrungsfristen.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                Daten aus Bestellungen und Rechnungen speichern wir entsprechend gesetzlicher Aufbewahrungspflichten
                (regelmäßig 6 bzw. 10 Jahre).
              </li>
              <li>
                Daten, die auf Grundlage einer Einwilligung verarbeitet werden, speichern wir bis zum Widerruf der
                Einwilligung.
              </li>
              <li>
                Daten aus Kontaktanfragen (E-Mail/Formular) speichern wir grundsätzlich so lange, wie dies zur Bearbeitung
                und Nachverfolgung erforderlich ist. In der Regel prüfen wir spätestens nach 24 Monaten, ob eine weitere
                Speicherung erforderlich ist, und löschen oder anonymisieren die Anfrage, sofern keine gesetzlichen Pflichten
                oder berechtigte Gründe entgegenstehen.
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Soweit wir Anfragen sowohl in Supabase als auch in Notion speichern, gilt diese Speicherdauer entsprechend für
              beide Systeme. Wenn wir löschen, löschen wir die Daten – soweit praktikabel – in allen verbundenen Systemen.
            </p>
          </div>

          {/* Optional: internal links */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">Weitere Hinweise</h2>
            <p className="mt-2 text-sm text-slate-700">
              Ergänzende Informationen findest du auch im{' '}
              <Link href="/impressum" className="font-semibold text-emerald-700 hover:underline">
                Impressum
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}