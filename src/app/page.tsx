import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_COLLECTIONS } from "@/lib/shopify/queries";

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
  title: "homigo Shop | Smart Home ohne Kabelsalat",
  description:
    "Kuratiertes Smart‑Home‑Sortiment (B‑Stock & Neuwertig) und klare Kompatibilitätsinfos. Schnell finden, sicher über Shopify checkouten.",
  alternates: { canonical: "/shop" },
  openGraph: {
    type: "website",
    url: "/shop",
    title: "homigo Shop | Smart Home ohne Kabelsalat",
    description:
      "Kuratiertes Smart‑Home‑Sortiment (B‑Stock & Neuwertig) und klare Kompatibilitätsinfos.",
    siteName: "homigo",
    locale: "de_DE",
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
};

type CollectionsResp = {
  collections: {
    edges: Array<{
      node: {
        id: string;
        handle: string;
        title: string;
        description?: string | null;
        image?: { url: string; altText?: string | null } | null;
      };
    }>;
  };
};

function clampText(s: string, max = 120) {
  const t = (s || "").trim().replace(/\s+/g, " ");
  if (!t) return "";
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

export default async function ShopHomePage() {
  // Keep shop landing lightweight: show a handful of collections as entry points.
  const data = await shopifyFetch<CollectionsResp>(
    GET_COLLECTIONS,
    { first: 12 },
    { cache: "no-store" }
  );

  const collections = (data?.collections?.edges || [])
    .map((e) => e.node)
    .filter((c) => Boolean(c?.handle));

  const topCollections = collections.slice(0, 6);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              Kuratiert. Verständlich. Schnell einsatzbereit.
            </div>

            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              homigo Shop
              <span className="block text-emerald-700">Smart Home ohne Kabelsalat</span>
            </h1>

            <p className="mt-3 text-slate-600">
              B‑Stock, neuwertige Deals und ausgewählte Standardprodukte – mit klaren Kompatibilitätsinfos.
              Wenn du willst, helfen wir dir auch per Beratung beim Setup.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop/products"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Alle Produkte
              </Link>
              <Link
                href="/shop/collections"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Alle Kategorien
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                Beratung & Setup
              </Link>
            </div>
          </div>

          {/* Benefit cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:w-[420px]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="text-sm font-semibold text-slate-900">Passend statt maximal</div>
              <p className="mt-1 text-sm text-slate-600">
                Von günstigen Basics bis zu leistungsfähigen Setups – je nach Budget und Anspruch.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="text-sm font-semibold text-slate-900">Kompatibilität im Blick</div>
              <p className="mt-1 text-sm text-slate-600">
                Funkstandard, Hub‑Hinweise und Ökosysteme – damit du schneller entscheiden kannst.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="text-sm font-semibold text-slate-900">Schneller Checkout</div>
              <p className="mt-1 text-sm text-slate-600">Sicherer Shopify‑Checkout, Preise in EUR.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="text-sm font-semibold text-slate-900">B‑Stock & Differenz</div>
              <p className="mt-1 text-sm text-slate-600">
                Attraktive Deals – inkl. transparenter Hinweise auf Differenzbesteuerung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick navigation */}
      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/shop/products"
          className="group rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition"
        >
          <div className="text-sm font-semibold text-slate-900">Produkte stöbern</div>
          <div className="mt-2 text-slate-600">Alle Produkte auf einen Blick – inklusive Suche.</div>
          <div className="mt-4 text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
            Zu allen Produkten →
          </div>
        </Link>

        <Link
          href="/shop/collections"
          className="group rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition"
        >
          <div className="text-sm font-semibold text-slate-900">Nach Kategorien</div>
          <div className="mt-2 text-slate-600">Sensorik, Licht, Energie, Sicherheit – schnell filtern.</div>
          <div className="mt-4 text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
            Zu den Kategorien →
          </div>
        </Link>

        <Link
          href="/kontakt"
          className="group rounded-2xl border border-emerald-200 bg-emerald-50 p-6 hover:bg-emerald-100 transition"
        >
          <div className="text-sm font-semibold text-emerald-900">Unsicher bei der Auswahl?</div>
          <div className="mt-2 text-emerald-800">
            Kurze Beratung – wir prüfen Kompatibilität und schlagen passende Komponenten vor.
          </div>
          <div className="mt-4 text-sm font-semibold text-emerald-900">
            Beratung anfragen →
          </div>
        </Link>
      </section>

      {/* Featured collections */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Beliebte Kategorien</h2>
            <p className="mt-1 text-sm text-slate-600">Ein schneller Einstieg – oder direkt zu allen Kategorien.</p>
          </div>
          <Link
            href="/shop/collections"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Alle Kategorien →
          </Link>
        </div>

        {topCollections.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700">
            Aktuell sind keine Kategorien verfügbar.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topCollections.map((c) => (
              <Link
                key={c.id}
                href={`/shop/collections/${encodeURIComponent(c.handle)}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                {/* Image wrapper sized to content, not an oversized frame */}
                <div className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                  <div className="relative h-[160px] w-full overflow-hidden rounded-lg">
                    {c.image?.url ? (
                      <Image
                        src={c.image.url}
                        alt={c.image.altText || c.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-contain"
                        priority={false}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-slate-400">
                        Kein Kategoriebild
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-lg font-semibold text-slate-900">{c.title}</div>
                  {c.description ? (
                    <div className="mt-1 text-sm text-slate-600">{clampText(c.description, 110)}</div>
                  ) : (
                    <div className="mt-1 text-sm text-slate-600">Produkte ansehen und vergleichen.</div>
                  )}
                </div>

                <div className="mt-4 text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
                  Kategorie öffnen →
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <p className="text-xs text-slate-500">
        Hinweis: Der Checkout erfolgt sicher über Shopify.
      </p>
    </div>
  );
}