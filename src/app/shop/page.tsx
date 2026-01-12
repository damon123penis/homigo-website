import Link from "next/link";
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_COLLECTIONS } from "@/lib/shopify/queries";
import type { Metadata } from "next";

// Collections / images can be updated frequently in Shopify.
// Force dynamic rendering so newly added collection images/products appear immediately.
export const dynamic = "force-dynamic";

const SITE_URL = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "https://www.homigo.tech";
})();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shop | homigo",
    template: "%s | homigo",
  },
  description:
    "Kuratierter Smart‑Home Shop: einfache, kompatible Produkte für den Alltag. Auf Wunsch mit Beratung, damit alles schnell funktioniert.",
  alternates: {
    canonical: "/shop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/shop",
    title: "Shop | homigo",
    description:
      "Einfache, kompatible Smart‑Home Produkte. Auf Wunsch mit Beratung, damit alles schnell funktioniert.",
    siteName: "homigo",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | homigo",
    description:
      "Einfache, kompatible Smart‑Home Produkte. Auf Wunsch mit Beratung, damit alles schnell funktioniert.",
  },
};

type CollectionsResp = {
  collections: {
    edges: { node: { id: string; handle: string; title: string; description?: string; image?: { url: string; altText?: string } } }[];
  };
};

export default async function ShopHome() {
  const data = await shopifyFetch<CollectionsResp>(
    GET_COLLECTIONS,
    { first: 9 },
    { cache: "no-store" }
  );

  const canonicalUrl = `${SITE_URL}/shop`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "homigo Shop",
    url: canonicalUrl,
    description:
      "Smart-Home Hardware, Bundles und Services – passend zu deiner Beratung.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Shop",
          item: canonicalUrl,
        },
      ],
    },
  };

  return (
    <div className="relative space-y-10">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-56 bg-gradient-to-b from-emerald-50/70 to-transparent" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-slate-200/40 blur-3xl" />
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Dein Amigo fürs Smart Home
              <span className="relative ml-2 inline-block">
              homigo Shop
                <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-emerald-200/70" />
              </span>
            </h1>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Hier findest du Produkte, die im Alltag einfach funktionieren – klar beschrieben, kompatibel gedacht.
              Wenn du schon genau weißt, was du willst: schnapp dir unsere guten Deals. Wenn du unsicher bist: hol dir kurz
              Orientierung und vermeide Fehlkäufe.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop/products"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              >
                Produkte entdecken
              </Link>
              <Link
                href="/beratung"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/90 px-5 py-3 font-semibold text-slate-900 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                Beratung: kurz Klarheit holen
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Hinweis: Preise in EUR. Checkout &amp; Zahlung laufen sicher über Shopify.
            </p>
          </div>

          {/* Visual */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">Alltagstauglich ausgewählt</div>
                <div className="mt-1 text-sm text-slate-600">
                  Du bekommst Produkte, die zusammenpassen – mit klaren Angaben zu Funkstandard, Hub und Ökosystem.
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">Zwei Wege zum Ziel</div>
                <div className="mt-1 text-sm text-slate-600">
                  Direkt kaufen oder erst kurz beraten lassen – damit du schneller fertig bist und weniger zurückschickst.
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">Lieber neu oder generalüberholt?</div>
                <div className="mt-1 text-sm text-slate-600">
                  Neu, neuwertig, generalüberholt – immer transparent ausgewiesen.
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">Sicherer Checkout</div>
                <div className="mt-1 text-sm text-slate-600">
                  Checkout & Zahlung laufen direkt über Shopify. Du bleibst im Flow – ohne extra Accounts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Für wen ist der Shop? */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Für Einsteiger</div>
          <p className="mt-2 text-sm text-slate-600">
            Du willst Licht, Sensorik oder Steckdosen smart machen – ohne dich durch Foren zu wühlen.
            Du bekommst klare Empfehlungen und Produkte, die einfach zusammenspielen.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Für Pragmatiker</div>
          <p className="mt-2 text-sm text-slate-600">
            Du willst ein stabiles Setup, das später erweiterbar ist. Hier findest du kompatible Komponenten
            und saubere Produktdetails (Standard, Hub, Ökosystem).
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Für Nerds & Deals</div>
          <p className="mt-2 text-sm text-slate-600">
            Du weißt, was du tust – und willst gute Preise.
          </p>
        </div>
      </section>

      {/* Popular categories (preview, not a pure overview) */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Beliebte Kategorien</h2>
            <p className="mt-1 text-sm text-slate-600">
              Ein schneller Einstieg – oder spring direkt zu allen Produkten, wenn du schon ein Ziel hast.
            </p>
          </div>
          <Link
            href="/shop/collections"
            className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 sm:inline-flex"
          >
            Alle Kategorien
          </Link>
        </div>

        <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.collections.edges.slice(0, 6).map(({ node }) => (
            <Link
              key={node.id}
              href={`/shop/collections/${encodeURIComponent(node.handle)}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "16 / 10" }}>
                  {node.image?.url ? (
                    <Image
                      src={node.image.url}
                      alt={node.image.altText || node.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-slate-400">
                      Kein Kategoriebild
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-lg font-semibold text-slate-900">{node.title}</div>
                {node.description ? (
                  <div className="mt-1 text-sm text-slate-600 line-clamp-2">{node.description}</div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/shop/collections"
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Alle Kategorien
          </Link>
        </div>
      </section>

      {/* Assistance CTA */}
      <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Unsicher? Hol dir 15 Minuten Orientierung.</h2>
            <p className="mt-2 text-sm text-slate-600">
              Wenn du willst, prüfen wir kurz dein Ziel (WLAN, Handy, Ökosystem) und ich empfehle dir ein Setup,
              das sauber zusammenläuft – ohne Verkaufsdruck.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Link
              href="/beratung"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Kennenlern-Call starten
            </Link>
            <Link
              href="/shop/products"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-50"
            >
              Zu den Produkten
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}