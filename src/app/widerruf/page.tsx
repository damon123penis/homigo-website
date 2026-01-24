

import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Widerruf | homigo Shop",
  description:
    "Informationen zum Widerrufsrecht, zur Widerrufsbelehrung und ein Muster-Widerrufsformular für Bestellungen im homigo Shop.",
  robots: { index: true, follow: true },
};

export default function WiderrufPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Widerruf</h1>
        <p className="mt-2 text-slate-600">
          Hier findest du die Widerrufsbelehrung für Bestellungen im homigo Shop sowie ein
          Muster-Widerrufsformular.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="space-y-6 text-slate-800">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">1. Widerrufsrecht</h2>
            <p>
              Verbraucher:innen haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen
              Vertrag zu widerrufen.
            </p>
            <p>
              Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem du oder ein von dir benannter
              Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen hast bzw. hat.
            </p>
            <p>
              Um dein Widerrufsrecht auszuüben, musst du uns (homigo, Frankenallee 23a, 60327
              Frankfurt am Main, Deutschland, E-Mail: hallo@homigo.tech) mittels einer eindeutigen
              Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über deinen Entschluss,
              diesen Vertrag zu widerrufen, informieren. Du kannst dafür das unten stehende
              Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
            </p>
            <p>
              Zur Wahrung der Widerrufsfrist reicht es aus, dass du die Mitteilung über die Ausübung
              des Widerrufsrechts vor Ablauf der Widerrufsfrist absendest.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">2. Folgen des Widerrufs</h2>
            <p>
              Wenn du diesen Vertrag widerrufst, haben wir dir alle Zahlungen, die wir von dir
              erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten,
              die sich daraus ergeben, dass du eine andere Art der Lieferung als die von uns
              angebotene, günstigste Standardlieferung gewählt hast), unverzüglich und spätestens
              binnen 14 Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über deinen Widerruf
              dieses Vertrags bei uns eingegangen ist.
            </p>
            <p>
              Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das du bei der
              ursprünglichen Transaktion eingesetzt hast, es sei denn, mit dir wurde ausdrücklich
              etwas anderes vereinbart; in keinem Fall werden dir wegen dieser Rückzahlung Entgelte
              berechnet.
            </p>
            <p>
              Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben
              oder bis du den Nachweis erbracht hast, dass du die Waren zurückgesandt hast, je
              nachdem, welches der frühere Zeitpunkt ist.
            </p>
            <p>
              Du hast die Waren unverzüglich und in jedem Fall spätestens binnen 14 Tagen ab dem
              Tag, an dem du uns über den Widerruf dieses Vertrags unterrichtest, an uns
              zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn du die Waren vor Ablauf
              der Frist von 14 Tagen absendest.
            </p>
            <p>
              Wir übernehmen die unmittelbaren Kosten der Rücksendung der Waren, sofern die Rücksendung
              innerhalb von 14 Tagen ab Erhalt der Ware veranlasst wird (kostenlose Rücksendung).
            </p>
            <p className="text-sm text-slate-600">
              Hinweis: Das gesetzliche Widerrufsrecht bleibt hiervon unberührt. Die kostenlose Rücksendung
              ist ein zusätzlicher Service von homigo.
            </p>
            <p>
              Du musst für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser
              Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und
              Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">3. Rückgabe- &amp; Rücksendeprozess (30 Tage kostenlos)</h2>
            <p>
              Zusätzlich zum gesetzlichen Widerrufsrecht bieten wir dir eine kostenlose Rücksendung innerhalb
              von 30 Tagen ab Erhalt der Ware an. Damit es für dich unkompliziert bleibt, läuft die Rückgabe
              so ab:
            </p>

            <ol className="list-decimal space-y-2 pl-5 text-slate-700">
              <li>
                <span className="font-medium text-slate-900">Kontakt aufnehmen:</span> Schreibe uns kurz an
                <span className="font-semibold"> hallo@homigo.tech</span> mit deiner Bestellnummer und dem
                Artikel, den du zurücksenden möchtest.
              </li>
              <li>
                <span className="font-medium text-slate-900">Rücksendeetikett erhalten:</span> Wir senden dir
                ein kostenloses Rücksendeetikett bzw. die Rücksendeanweisungen per E-Mail.
              </li>
              <li>
                <span className="font-medium text-slate-900">Sicher verpacken:</span> Bitte sende die Ware
                nach Möglichkeit in der Originalverpackung oder einer gleichwertigen, transportsicheren
                Verpackung zurück.
              </li>
              <li>
                <span className="font-medium text-slate-900">Abgeben &amp; Nachweis aufbewahren:</span> Gib das
                Paket beim Versanddienstleister ab und bewahre den Einlieferungsbeleg auf.
              </li>
              <li>
                <span className="font-medium text-slate-900">Erstattung:</span> Nach Eingang und Prüfung der
                Rücksendung erstatten wir den Kaufbetrag gemäß den Regeln unter „Folgen des Widerrufs“.
              </li>
            </ol>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">Wichtige Hinweise</div>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  Die kostenlose Rücksendung gilt für Rückgaben innerhalb von 30 Tagen ab Erhalt. Danach ist
                  eine Rückgabe nur möglich, wenn gesetzliche Rechte (z. B. Gewährleistung) greifen.
                </li>
                <li>
                  Bitte vermeide Beschädigungen und entferne keine zwingend erforderlichen Siegel/Schutzfolien,
                  sofern diese für eine Rückgabe relevant sind.
                </li>
                <li>
                  Wenn du nur einen Teil einer Bestellung zurücksendest, erstatten wir die entsprechenden
                  Zahlungen für die zurückgesendeten Artikel.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">4. Ausschluss bzw. Erlöschen des Widerrufsrechts</h2>
            <p>
              Das Widerrufsrecht besteht, soweit gesetzlich zulässig, nicht bzw. erlischt bei
              Verträgen:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              <li>
                zur Lieferung versiegelter Waren, die aus Gründen des Gesundheitsschutzes oder der
                Hygiene nicht zur Rückgabe geeignet sind, wenn ihre Versiegelung nach der Lieferung
                entfernt wurde;
              </li>
              <li>
                zur Lieferung von Waren, die nach der Lieferung aufgrund ihrer Beschaffenheit
                untrennbar mit anderen Gütern vermischt wurden;
              </li>
              <li>
                zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine
                individuelle Auswahl oder Bestimmung durch den/die Verbraucher:in maßgeblich ist
                oder die eindeutig auf die persönlichen Bedürfnisse zugeschnitten sind;
              </li>
              <li>
                zur Lieferung von Ton- oder Videoaufnahmen oder Computersoftware in einer
                versiegelten Packung, wenn die Versiegelung nach der Lieferung entfernt wurde;
              </li>
              <li>
                zur Lieferung digitaler Inhalte, die nicht auf einem körperlichen Datenträger
                geliefert werden, wenn mit der Ausführung des Vertrags begonnen wurde, nachdem du
                ausdrücklich zugestimmt hast, dass wir mit der Ausführung des Vertrags vor Ablauf
                der Widerrufsfrist beginnen, und du deine Kenntnis davon bestätigt hast, dass du
                durch deine Zustimmung mit Beginn der Ausführung des Vertrags dein Widerrufsrecht
                verlierst.
              </li>
            </ul>
            <p className="text-sm text-slate-600">
              Hinweis: Ob ein Ausschluss/Ein Erlöschen im konkreten Fall greift, hängt von der
              bestellten Ware bzw. Leistung ab.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">5. Muster-Widerrufsformular</h2>
            <p className="text-slate-700">
              (Wenn du den Vertrag widerrufen willst, dann fülle bitte dieses Formular aus und sende
              es zurück.)
            </p>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="space-y-3 text-sm text-slate-800">
                <p>
                  An: <span className="font-semibold">homigo</span>, Frankenallee 23a, 60327 Frankfurt am Main,
                  Deutschland, E-Mail: hallo@homigo.tech
                </p>
                <p>
                  Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über
                  den Kauf der folgenden Waren (*) / die Erbringung der folgenden Dienstleistung (*):
                </p>
                <p className="rounded-lg bg-white px-3 py-2 text-slate-600">
                  ______________________________________________
                </p>
                <p>
                  Bestellt am (*) / erhalten am (*):
                </p>
                <p className="rounded-lg bg-white px-3 py-2 text-slate-600">
                  ______________________________________________
                </p>
                <p>
                  Name des/der Verbraucher(s):
                </p>
                <p className="rounded-lg bg-white px-3 py-2 text-slate-600">
                  ______________________________________________
                </p>
                <p>
                  Anschrift des/der Verbraucher(s):
                </p>
                <p className="rounded-lg bg-white px-3 py-2 text-slate-600">
                  ______________________________________________
                </p>
                <p>
                  Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):
                </p>
                <p className="rounded-lg bg-white px-3 py-2 text-slate-600">
                  ______________________________________________
                </p>
                <p>
                  Datum:
                </p>
                <p className="rounded-lg bg-white px-3 py-2 text-slate-600">
                  ______________________________________________
                </p>
                <p className="text-xs text-slate-500">(*) Unzutreffendes streichen.</p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">6. Kontakt</h2>
            <p className="text-slate-700">
              Wenn du Fragen zum Widerruf oder zur Rücksendung hast, melde dich kurz bei uns:
              <span className="font-semibold"> hallo@homigo.tech</span>.
            </p>
          </section>
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Stand: {new Date().toLocaleDateString("de-DE")}
      </p>
    </div>
  );
}