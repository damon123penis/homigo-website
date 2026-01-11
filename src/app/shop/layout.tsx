// src/app/shop/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { BackButton } from "./_components/BackButton";

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
  const [cartCount] = await Promise.all([getCartCount()]);

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
              <BackButton />
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
              {/* Server-seitige Suche: query param `q` */}
              <form action="/shop" method="GET" className="hidden md:flex">
                <input type="hidden" name="view" value="products" />
                <div className="relative">
                  <input
                    id="shop-search-input-desktop"
                    name="q"
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
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                aria-label="Zum Warenkorb"
                title="Warenkorb"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M6 6h15l-1.5 9h-13z" />
                  <path d="M6 6l-2-3H1" />
                  <path d="M8 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                  <path d="M18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>

                {cartCount > 0 ? (
                  <span className="absolute -right-2 -top-2 inline-flex min-w-[20px] items-center justify-center rounded-full bg-white px-1.5 py-0.5 text-[11px] font-bold text-emerald-700 shadow">
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
                placeholder="Produkte suchen…"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
              <div
                id="shop-search-results-mobile"
                className="absolute left-0 right-0 top-[calc(100%+8px)] hidden rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden"
              ></div>
            </div>
          </form>

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

  function hideAllResults(exceptEl) {
    resultsIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (exceptEl && el === exceptEl) return;
      el.classList.add('hidden');
    });
  }

  function setupInput(inputId, resultsId) {
    const input = document.getElementById(inputId);
    const resultsContainer = document.getElementById(resultsId);
    if (!input || !resultsContainer) return;

    resultsContainer.classList.add('z-50');

    let lastQuery = '';

    input.addEventListener('focus', () => {
      hideAllResults(resultsContainer);
    });

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
      resultsContainer.innerHTML = '<div class="px-4 py-3 text-sm text-slate-500">Suche…</div>';
      resultsContainer.classList.remove('hidden');

      const data = await fetchPredictiveSearch(q);
      resultsContainer.innerHTML = '';
      if (!data) {
        clearResults(resultsContainer);
        return;
      }

      const { products = [], collections = [] } = data;
      if (products.length === 0 && collections.length === 0) {
        clearResults(resultsContainer);
        return;
      }

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
  }

  queryInputIds.forEach((inputId, i) => {
    setupInput(inputId, resultsIds[i]);
  });

  document.addEventListener('click', (e) => {
    const t = e.target;
    const clickedInside = queryInputIds.some((id, idx) => {
      const input = document.getElementById(id);
      const box = document.getElementById(resultsIds[idx]);
      return (input && input.contains(t)) || (box && box.contains(t));
    });
    if (!clickedInside) {
      resultsIds.forEach((id) => {
        const box = document.getElementById(id);
        if (box) clearResults(box);
      });
    }
  });
})();
                `,
              }}
            />
          ) : null}
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pt-10 pb-0">
        {children}

        {/* Shop-Hinweis: soll direkt vor dem globalen Website-Footer enden (kein doppelter Footer). */}
        <div className="mt-8 border-t border-slate-200 bg-white/0 py-6">
          <p className="text-center text-xs text-slate-500">
            Checkout und Zahlung erfolgen über Shopify.
          </p>
        </div>
      </main>
    </div>
  );
}