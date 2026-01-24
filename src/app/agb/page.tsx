

import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "AGB | homigo",
  description:
    "Allgemeine Geschäftsbedingungen (AGB) für den Online-Shop von homigo – Informationen zu Bestellung, Zahlung, Versand, Widerruf, Gewährleistung und Haftung.",
  robots: { index: true, follow: true },
};

export default function AgbPage() {
  const updated = "Stand: 24.01.2026";

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Allgemeine Geschäftsbedingungen</h1>
      <p className="mt-2 text-sm text-slate-600">{updated}</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="text-sm font-semibold text-slate-900">Übersicht</div>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-700">
          <li>
            <a className="hover:underline" href="#geltungsbereich">
              Geltungsbereich
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#anbieter">
              Anbieter, Vertragspartner, Kontakt
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#angebot-und-vertrag">
              Angebot, Vertragsschluss, Korrektur von Eingaben
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#preise-zahlung">
              Preise, Versandkosten, Zahlung
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#lieferung">
              Lieferung, Versand, Gefahrübergang
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#eigentuervorbehalt">
              Eigentumsvorbehalt
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#widerruf">
              Widerruf
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#gewaehrleistung">
              Gewährleistung
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#haftung">
              Haftung
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#bewertungen">
              Bewertungen &amp; Nutzerinhalte
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#geistiges-eigentum">
              Inhalte &amp; geistiges Eigentum
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#streitbeilegung">
              Streitbeilegung
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#schlussbestimmungen">
              Schlussbestimmungen
            </a>
          </li>
        </ol>
      </div>

      <div className="mt-8 prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-p:my-3 prose-ul:my-3 prose-ol:my-3 prose-li:my-1">
        <h2 id="geltungsbereich">1. Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen ("AGB") gelten für alle Bestellungen über unseren
          Online-Shop unter der Marke <strong>homigo</strong>. Sie gelten gegenüber Verbraucher:innen
          ("Verbraucher") und Unternehmer:innen ("Unternehmer") im Sinne der §§ 13, 14 BGB.
        </p>
        <p>
          Abweichende, entgegenstehende oder ergänzende Bedingungen werden nur dann Vertragsbestandteil,
          wenn wir ihrer Geltung ausdrücklich schriftlich zugestimmt haben.
        </p>

        <h2 id="anbieter">2. Anbieter, Vertragspartner, Kontakt</h2>
        <p>
          Vertragspartner für Bestellungen im Online-Shop ist:
          <br />
          <strong>homigo</strong>
          <br />
          Frankenallee 23a, 60327 Frankfurt am Main, Deutschland
          <br />
          E-Mail: <a href="mailto:hallo@homigo.tech">hallo@homigo.tech</a>
          <br />
          USt-IdNr.: DE454607218
        </p>
        <p>
          Informationen zu Verarbeitung personenbezogener Daten findest du in unserer Datenschutzerklärung.
        </p>

        <h2 id="angebot-und-vertrag">3. Angebot, Vertragsschluss, Korrektur von Eingaben</h2>
        <h3>3.1 Darstellung im Shop</h3>
        <p>
          Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar, sondern eine
          unverbindliche Aufforderung zur Abgabe einer Bestellung.
        </p>

        <h3>3.2 Bestellung und Vertragsschluss</h3>
        <p>
          Durch Anklicken des Buttons <em>"Jetzt kaufen"</em> (oder vergleichbar) gibst du ein verbindliches Angebot
          zum Kauf der im Warenkorb befindlichen Waren ab. Unmittelbar nach Absenden der Bestellung erhältst du eine
          Bestellbestätigung per E-Mail. Diese Bestellbestätigung stellt noch keine Annahme dar.
        </p>
        <p>
          Der Vertrag kommt zustande, sobald wir deine Bestellung durch eine ausdrückliche Auftragsbestätigung per
          E-Mail annehmen oder die Ware versenden.
        </p>

        <h3>3.3 Korrektur von Eingaben</h3>
        <p>
          Vor verbindlicher Abgabe der Bestellung kannst du deine Eingaben jederzeit über die im Bestellprozess
          vorgesehenen Korrekturmöglichkeiten (z. B. Warenkorb bearbeiten, Adressdaten ändern) berichtigen.
        </p>

        <h3>3.4 Speicherung des Vertragstextes</h3>
        <p>
          Wir speichern den Vertragstext und senden dir die Bestelldaten sowie diese AGB (z. B. per Link) zu.
          Den aktuellen Stand der AGB kannst du jederzeit auf dieser Seite einsehen.
        </p>

        <h2 id="preise-zahlung">4. Preise, Versandkosten, Zahlung</h2>
        <h3>4.1 Preise</h3>
        <p>
          Es gelten die zum Zeitpunkt der Bestellung im Online-Shop angegebenen Preise.
          Sofern nicht anders ausgewiesen, verstehen sich die Preise in Euro.
        </p>
        <p>
          <strong>Hinweis zur Differenzbesteuerung:</strong> Bei entsprechend gekennzeichneten Artikeln kann
          die Differenzbesteuerung nach § 25a UStG zur Anwendung kommen; in diesem Fall wird die Umsatzsteuer nicht
          separat ausgewiesen.
        </p>

        <h3>4.2 Versandkosten</h3>
        <p>
          Zusätzlich zu den angegebenen Preisen können Versandkosten anfallen. Die konkreten Versandkosten werden dir
          spätestens im Checkout angezeigt.
        </p>

        <h3>4.3 Zahlungsarten</h3>
        <p>
          In unserem Shop stehen dir die im Checkout angezeigten Zahlungsarten zur Verfügung (z. B. Shopify Payments,
          PayPal, Kreditkarte, Klarna, Apple Pay, Google Pay – je nach Verfügbarkeit).
        </p>
        <p>
          Die Zahlungsabwicklung erfolgt über die jeweils eingebundenen Zahlungsdienstleister. Es gelten ergänzend die
          Bedingungen der jeweiligen Anbieter.
        </p>

        <h2 id="lieferung">5. Lieferung, Versand, Gefahrübergang</h2>
        <h3>5.1 Versanddienstleister</h3>
        <p>
          Der Versand erfolgt in der Regel über <strong>DHL</strong> oder einen vergleichbaren Versanddienstleister.
        </p>

        <h3>5.2 Lieferzeiten</h3>
        <p>
          Lieferzeiten werden im Shop bzw. im Checkout angezeigt. Soweit keine Lieferzeit angegeben ist, beträgt die
          Lieferzeit innerhalb Deutschlands in der Regel 2–7 Werktage ab Vertragsschluss (bei Vorkasse ab
          Zahlungseingang). Angaben zu Lieferzeiten sind unverbindliche Schätzungen, sofern nicht ausdrücklich ein
          verbindlicher Termin zugesagt wurde.
        </p>

        <h3>5.3 Teillieferungen</h3>
        <p>
          Teillieferungen sind zulässig, soweit sie für dich zumutbar sind. Zusätzliche Versandkosten entstehen dir
          dadurch nicht, sofern nicht ausdrücklich etwas anderes vereinbart wurde.
        </p>

        <h3>5.4 Gefahrübergang</h3>
        <p>
          <strong>Für Verbraucher:</strong> Die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung der
          Ware geht erst mit Übergabe der Ware an dich über.
        </p>
        <p>
          <strong>Für Unternehmer:</strong> Die Gefahr geht mit Übergabe an den Versanddienstleister auf den Unternehmer
          über.
        </p>

        <h2 id="eigentuervorbehalt">6. Eigentumsvorbehalt</h2>
        <p>
          Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.
        </p>

        <h2 id="widerruf">7. Widerruf</h2>
        <p>
          Verbraucher haben ein gesetzliches Widerrufsrecht. Die Einzelheiten (Fristen, Ausnahmen, Ablauf)
          ergeben sich aus unserer Widerrufsbelehrung, die im Shop bereitgestellt wird.
        </p>
        <p>
          Hinweis: Das Widerrufsrecht kann bei bestimmten Waren ausgeschlossen sein (z. B. versiegelte Ware,
          die aus Hygienegründen nicht zur Rückgabe geeignet ist, wenn die Versiegelung entfernt wurde;
          kundenspezifische Anfertigungen), soweit die gesetzlichen Voraussetzungen erfüllt sind.
        </p>

        <h2 id="gewaehrleistung">8. Gewährleistung</h2>
        <p>
          Es gilt das gesetzliche Mängelhaftungsrecht.
        </p>
        <h3>8.1 Verbraucher</h3>
        <p>
          Für Verbraucher gelten die gesetzlichen Gewährleistungsrechte, insbesondere §§ 437 ff. BGB.
        </p>

        <h3>8.2 Unternehmer</h3>
        <p>
          Gegenüber Unternehmern gilt: Die Gewährleistungsfrist für neue Waren beträgt ein Jahr ab Ablieferung.
          Bei gebrauchten Waren kann die Gewährleistung – soweit gesetzlich zulässig – ausgeschlossen oder verkürzt
          sein; ein etwaiger Ausschluss/Verkürzung wird im Angebot/Checkout deutlich gemacht.
        </p>
        <p>
          Unternehmer müssen offensichtliche Mängel unverzüglich, spätestens innerhalb von 14 Tagen nach
          Wareneingang, schriftlich anzeigen. § 377 HGB bleibt unberührt.
        </p>

        <h2 id="haftung">9. Haftung</h2>
        <p>
          Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach den Vorschriften des
          Produkthaftungsgesetzes. Für leichte Fahrlässigkeit haften wir bei Verletzung einer wesentlichen
          Vertragspflicht (Kardinalpflicht) nur in Höhe des vorhersehbaren, vertragstypischen Schadens.
        </p>
        <p>
          Die Haftungsbeschränkungen gelten nicht bei Verletzung von Leben, Körper oder Gesundheit.
        </p>

        <h2 id="bewertungen">10. Bewertungen &amp; Nutzerinhalte</h2>
        <p>
          Sofern du Bewertungen oder sonstige Inhalte (z. B. über Judge.me) einreichst, bist du für deren
          Rechtmäßigkeit verantwortlich. Inhalte dürfen keine Rechte Dritter verletzen (z. B. Urheber-, Marken- oder
          Persönlichkeitsrechte) und keine rechtswidrigen, beleidigenden, diskriminierenden oder irreführenden Inhalte
          enthalten.
        </p>
        <p>
          Wir behalten uns vor, Inhalte zu prüfen und bei begründetem Anlass ganz oder teilweise zu entfernen
          (z. B. bei Rechtsverletzungen oder Verstößen gegen diese AGB).
        </p>

        <h2 id="geistiges-eigentum">11. Inhalte &amp; geistiges Eigentum</h2>
        <p>
          Alle Inhalte auf dieser Website (Texte, Bilder, Grafiken, Logos, Layout) sind urheberrechtlich geschützt.
          Eine Nutzung außerhalb der gesetzlich zulässigen Grenzen ist ohne unsere vorherige schriftliche Zustimmung
          nicht gestattet.
        </p>

        <h2 id="streitbeilegung">12. Streitbeilegung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">
            https://ec.europa.eu/consumers/odr
          </a>
          .
        </p>
        <p>
          Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2 id="schlussbestimmungen">13. Schlussbestimmungen</h2>
        <h3>13.1 Anwendbares Recht</h3>
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
          Für Verbraucher gilt diese Rechtswahl nur, soweit dadurch nicht der gewährte Schutz durch zwingende
          Bestimmungen des Rechts des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat,
          entzogen wird.
        </p>

        <h3>13.2 Gerichtsstand</h3>
        <p>
          Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen,
          ist ausschließlicher Gerichtsstand Frankfurt am Main. Für Verbraucher gelten die gesetzlichen Gerichtsstände.
        </p>

        <h3>13.3 Salvatorische Klausel</h3>
        <p>
          Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, bleibt die
          Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Hinweis:</strong> Diese AGB sind eine redaktionell überarbeitete Fassung auf Basis einer Shopify-Vorlage
          und allgemeinen rechtlichen Standards für deutsche Online-Shops. Sie ersetzen keine individuelle Rechtsberatung.
          Je nach Sortiment (z. B. digitale Inhalte/Services, Installation vor Ort, gebrauchte Ware, Batterien, WEEE,
          Verpackungsgesetz, besondere Garantiezusagen) können zusätzliche Klauseln bzw. Pflichtinformationen erforderlich sein.
        </div>
      </div>
    </div>
  );
}