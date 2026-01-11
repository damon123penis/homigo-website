// src/app/shop/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { cookies, headers } from "next/headers";

export const metadata: Metadata = {
  title: {
    default: "Shop | homigo",
    template: "%s | homigo Shop",
  },
};

function getBaseUrl() {
  const h = headers();
  const proto = h.get("x-forwarded-proto") || "https";
  const host = h.get("x-forwarded-host") || h.get("host");
  if (host) return `${proto}://${host}`;
  return process.env.NEXT_PUBLIC_SITE_URL || "https://www.homigo.tech";
}

function getCookieHeader() {
  return cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
}

async function getCartCount(): Promise<number> {
  try {
    const baseUrl = getBaseUrl();
    const cookieHeader = getCookieHeader();

    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "GET",
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      cache: "no-store",
    });

    if (!res.ok) return 0;
    const json = await res.json().catch(() => null);
    const totalQuantity = Number(json?.cart?.totalQuantity || 0);
    return Number.isFinite(totalQuantity) ? totalQuantity : 0;
  } catch {
    return 0;
  }
}

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const cartCount = await getCartCount();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/shop" className="text-lg font-bold text-slate-900">
                homigo Shop
              </Link>

              <nav className="hidden md:flex items-center gap-3 text-sm">
                <Link href="/shop" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">
                  Übersicht
                </Link>
                <Link
                  href="/shop?view=collections"
                  className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100"
                >
                  Kategorien
                </Link>
                <Link
                  href="/shop?view=products"
                  className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100"
                >
                  Produkte
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              {/* Server-seitige Suche: einfach query param `q` */}
              <form action="/shop" method="GET" className="hidden md:flex">
                <input
                  name="q"
                  placeholder="Produkte suchen…"
                  className="w-72 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </form>

              <Link
                href="/shop/cart"
                className="relative inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                aria-label="Zum Warenkorb"
              >
                Warenkorb
                {cartCount > 0 ? (
                  <span className="inline-flex min-w-[22px] items-center justify-center rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
                    {cartCount}
                  </span>
                ) : null}
              </Link>
            </div>
          </div>

          {/* Mobile Subnav */}
          <div className="mt-3 flex md:hidden items-center gap-2">
            <Link href="/shop" className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-sm font-semibold text-slate-900">
              Übersicht
            </Link>
            <Link
              href="/shop?view=collections"
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-sm font-semibold text-slate-900"
            >
              Collections
            </Link>
          </div>

          <form action="/shop" method="GET" className="mt-3 md:hidden">
            <input
              name="q"
              placeholder="Produkte suchen…"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </form>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pt-10 pb-10">
        {children}

        {/* Shop-Hinweis: soll direkt vor dem globalen Website-Footer enden (kein doppelter Footer). */}
        <div className="mt-12 border-t border-slate-200 bg-white/0 pt-8">
          <p className="text-center text-xs text-slate-500">
            Checkout und Zahlung erfolgen über Shopify.
          </p>
        </div>
      </main>
    </div>
  );
}