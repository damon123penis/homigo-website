// src/app/shop/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/client";

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

async function getProductSuggestions(): Promise<Array<{ title: string; handle: string }>> {
  // Lightweight, server-rendered suggestions (native browser autocomplete via <datalist>).
  // Keeps UX simple without turning the whole layout into a client component.
  const query = /* GraphQL */ `
    query ProductSuggestions($first: Int!) {
      products(first: $first, sortKey: TITLE) {
        edges {
          node {
            title
            handle
          }
        }
      }
    }
  `;

  type Resp = {
    products?: {
      edges?: Array<{ node: { title: string; handle: string } }>;
    };
  };

  try {
    const data = await shopifyFetch<Resp>(query, { first: 50 }, { cache: "force-cache" });
    const edges = data?.products?.edges ?? [];
    return edges
      .map((e) => e.node)
      .filter((p) => Boolean(p?.title) && Boolean(p?.handle));
  } catch {
    return [];
  }
}

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const [cartCount, suggestions] = await Promise.all([
    getCartCount(),
    getProductSuggestions(),
  ]);

  const SHOP_DOMAIN =
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    process.env.SHOPIFY_STORE_DOMAIN ||
    "";
  const STOREFRONT_TOKEN =
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    "";
  const CAN_CLIENT_PREDICTIVE =
    Boolean(SHOP_DOMAIN) &&
    Boolean(STOREFRONT_TOKEN) &&
    !STOREFRONT_TOKEN.startsWith("shpat_") &&
    !STOREFRONT_TOKEN.startsWith("shppa_");

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
                <input type="hidden" name="view" value="products" />
                <div className="relative">
                  <input
                    id="shop-search-input-desktop"
                    name="q"
                    list="product-suggestions"
                    placeholder="Produkte suchen…"
                    className="w-72 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                  <div
                    id="shop-search-results-desktop"
                    className="absolute left-0 right-0 top-[calc(100%+8px)] hidden rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden"
                  ></div>
                </div>
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
            <input type="hidden" name="view" value="products" />
            <div className="relative">
              <input
                id="shop-search-input-mobile"
                name="q"
                list="product-suggestions"
                placeholder="Produkte suchen…"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
              <div
                id="shop-search-results-mobile"
                className="absolute left-0 right-0 top-[calc(100%+8px)] hidden rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden"
              ></div>
            </div>
          </form>

          <datalist id="product-suggestions">
            {suggestions.map((p) => (
              <option key={p.handle} value={p.title} />
            ))}
          </datalist>

          {CAN_CLIENT_PREDICTIVE ? (
            <script
              dangerouslySetInnerHTML={{
                __html: `
;(function(){
  const SHOP_DOMAIN = ${JSON.stringify(SHOP_DOMAIN)};
  const STOREFRONT_TOKEN = ${JSON.stringify(STOREFRONT_TOKEN)};
  const queryInputIds = ['shop-search-input-desktop', 'shop-search-input-mobile'];
  const resultsIds = ['shop-search-results-desktop', 'shop-search-results-mobile'];

  function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function createItemLink(href, title, imgUrl, imgAlt) {
    const link = document.createElement('a');
    link.href = href;
    link.className = 'flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-900';
    if(imgUrl){
      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = imgAlt || '';
      img.className = 'h-10 w-10 rounded-lg object-cover bg-slate-100 flex-shrink-0';
      link.appendChild(img);
    }
    const span = document.createElement('span');
    span.textContent = title;
    link.appendChild(span);
    return link;
  }

  function createHeader(text) {
    const div = document.createElement('div');
    div.className = 'px-4 py-2 text-xs font-semibold text-slate-500 border-b border-slate-200';
    div.textContent = text;
    return div;
  }

  async function fetchPredictiveSearch(query) {
    const url = \`https://\${SHOP_DOMAIN}/api/2024-07/graphql.json\`;
    const graphqlQuery = {
      query: \`
        query Predictive($q: String!) {
          predictiveSearch(query: $q, limit: 10, types: [PRODUCT, COLLECTION]) {
            products {
              id
              title
              handle
              featuredImage { url altText }
            }
            collections {
              id
              title
              handle
              image { url altText }
            }
          }
        }
      \`,
      variables: { q: query },
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify(graphqlQuery),
      credentials: 'omit',
    });
    if (!res.ok) return null;
    const json = await res.json().catch(() => null);
    return json?.data?.predictiveSearch || null;
  }

  function clearResults(container) {
    container.innerHTML = '';
    container.classList.add('hidden');
  }

  function hideAllResults() {
    resultsIds.forEach(id => {
      const el = document.getElementById(id);
      if(el){
        clearResults(el);
      }
    });
  }

  function setupInput(inputId, resultsId) {
    const input = document.getElementById(inputId);
    const resultsContainer = document.getElementById(resultsId);
    if (!input || !resultsContainer) return;

    let lastQuery = '';

    const onInput = debounce(async () => {
      const q = input.value.trim();
      if (q.length < 2) {
        clearResults(resultsContainer);
        return;
      }
      if (q === lastQuery) return;
      lastQuery = q;

      resultsContainer.classList.add('hidden');
      resultsContainer.innerHTML = '';

      const data = await fetchPredictiveSearch(q);
      if (!data) {
        clearResults(resultsContainer);
        return;
      }

      const { products = [], collections = [] } = data;
      if (products.length === 0 && collections.length === 0) {
        clearResults(resultsContainer);
        return;
      }

      // Build results
      if (products.length > 0) {
        resultsContainer.appendChild(createHeader('Produkte'));
        products.forEach(p => {
          const href = '/shop/products/' + p.handle;
          const imgUrl = p.featuredImage?.url || '';
          const imgAlt = p.featuredImage?.altText || '';
          resultsContainer.appendChild(createItemLink(href, p.title, imgUrl, imgAlt));
        });
      }
      if (collections.length > 0) {
        resultsContainer.appendChild(createHeader('Collections'));
        collections.forEach(c => {
          const href = '/shop/collections/' + c.handle;
          const imgUrl = c.image?.url || '';
          const imgAlt = c.image?.altText || '';
          resultsContainer.appendChild(createItemLink(href, c.title, imgUrl, imgAlt));
        });
      }
      resultsContainer.classList.remove('hidden');
    }, 200);

    input.addEventListener('input', onInput);

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        clearResults(resultsContainer);
        input.blur();
      }
    });

    // Hide results on outside click
    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
        clearResults(resultsContainer);
      }
    });
  }

  queryInputIds.forEach((inputId, i) => {
    setupInput(inputId, resultsIds[i]);
  });
})();
              `,
              }}
            />
          ) : null}
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