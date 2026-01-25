import type { Metadata } from "next";
import React from "react";
import { getPage } from "@/lib/content";

// Option A:
// - TOC/Übersicht bleibt im TSX
// - Inhalt kommt aus content/pages/agb.md

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("agb");

  return {
    title: page.title || "AGB | homigo",
    description: page.seoDescription || "",
    robots: { index: true, follow: true },
  };
}

export default async function AgbPage() {
  const page = await getPage("agb");

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* HERO */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Allgemeine Geschäftsbedingungen
        </h1>
        {page.updated ? (
          <p className="mt-2 text-sm text-slate-600">{page.updated}</p>
        ) : null}
        <p className="mt-4 text-sm text-slate-700">
          Hier findest du die Bedingungen für die Nutzung unseres Online-Shops und den
          Einkauf bei homigo.
        </p>
      </div>

      {/* TOC / ÜBERSICHT */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="text-sm font-semibold text-slate-900">Übersicht</div>
        <ul className="mt-3 grid gap-2 text-sm text-slate-700">
          <li><a className="hover:underline" href="#geltungsbereich">1. Geltungsbereich</a></li>
          <li><a className="hover:underline" href="#anbieter-vertragspartner">2. Anbieter, Vertragspartner, Kontakt</a></li>
          <li><a className="hover:underline" href="#produkte">3. Produkte</a></li>
          <li><a className="hover:underline" href="#bestellungen">4. Bestellungen & Vertragsschluss</a></li>
          <li><a className="hover:underline" href="#preise-zahlung">5. Preise & Zahlung</a></li>
          <li><a className="hover:underline" href="#versand-lieferung">6. Versand & Lieferung</a></li>
          <li><a className="hover:underline" href="#widerruf">7. Widerruf</a></li>
          <li><a className="hover:underline" href="#gewaehrleistung">8. Gewährleistung & Mängelhaftung</a></li>
          <li><a className="hover:underline" href="#haftung">9. Haftung</a></li>
          <li><a className="hover:underline" href="#schlussbestimmungen">10. Schlussbestimmungen</a></li>
        </ul>

        <p className="mt-4 text-xs text-slate-500">
          Hinweis: Die Links funktionieren, wenn du in `content/pages/agb.md` explizite
          Anker-IDs setzt (siehe unten).
        </p>
      </div>

      {/* CONTENT */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <div
          className="prose prose-slate max-w-none
            prose-headings:scroll-mt-24
            prose-p:my-3
            prose-ul:my-3 prose-ol:my-3
            prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Hinweis: Diese Seite stellt allgemeine Informationen bereit und ersetzt keine Rechtsberatung.
      </div>
    </div>
  );
}