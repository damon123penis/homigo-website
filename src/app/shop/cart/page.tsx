// src/app/shop/cart/page.tsx
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

type Money = { amount: string; currencyCode: string };

type CartLine = {
  id: string;
  quantity: number;
  cost?: { totalAmount?: Money };
  merchandise?: {
    id: string;
    title: string;
    availableForSale: boolean;
    price?: Money;
    quantityAvailable?: number | null;
    product?: { handle: string; title: string; metafield?: { value?: string | null } | null };
    image?: { url: string; altText?: string | null };
  };
};

type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost?: {
    subtotalAmount?: Money;
    totalAmount?: Money;
    totalTaxAmount?: Money;
  };
  lines: CartLine[];
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Warenkorb – homigo Shop',
  robots: {
    index: false,
    follow: true,
  },
};

function formatMoney(m?: Money) {
  if (!m) return '';
  const amount = Number(m.amount);
  try {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: m.currencyCode,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${m.currencyCode}`;
  }
}

function isDefaultVariantTitle(title?: string) {
  if (!title) return false;
  const t = title.trim().toLowerCase();
  return t === 'default title' || t === 'default';
}

function isDifferenzLine(l: CartLine) {
  const v = l.merchandise?.product?.metafield?.value;
  return typeof v === 'string' && v.toLowerCase() === 'differenz';
}

function getBaseUrl() {
  const h = headers();
  const proto = h.get('x-forwarded-proto') || 'https';
  const host = h.get('x-forwarded-host') || h.get('host');
  if (host) return `${proto}://${host}`;
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.homigo.tech';
}

function getCookieHeader() {
  // Forward all cookies to the API route so the cookie-based cartId works.
  return cookies()
    .getAll()
    // Cookie values are already in a valid cookie format; do not URL-encode here,
    // otherwise Shopify IDs (gid://...) get corrupted.
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
}

function persistCartIdFromSetCookie(setCookie: string | null) {
  if (!setCookie) return;
  const match = setCookie.match(/(?:^|,\s*)homigo_cart_id=([^;]+)/i);
  if (match) {
    const cartId = decodeURIComponent(match[1]);
    cookies().set({
      name: 'homigo_cart_id',
      value: cartId,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }
}

async function fetchCart(): Promise<Cart | null> {
  const baseUrl = getBaseUrl();
  const cookieHeader = getCookieHeader();

  const res = await fetch(`${baseUrl}/api/cart`, {
    method: 'GET',
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    cache: 'no-store',
  });

  persistCartIdFromSetCookie(res.headers.get('set-cookie'));

  if (!res.ok) return null;
  const json = await res.json();
  return json?.cart ?? null;
}

async function postCartAction(payload: any): Promise<{ ok: boolean; error?: string }> {
  const baseUrl = getBaseUrl();
  const cookieHeader = getCookieHeader();

  const res = await fetch(`${baseUrl}/api/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  persistCartIdFromSetCookie(res.headers.get('set-cookie'));

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { ok: false, error: json?.error || 'Beim Aktualisieren ist etwas schiefgelaufen.' };
  }

  return { ok: true };
}

export default async function CartPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const cart = await fetchCart();
  const lines = cart?.lines ?? [];

  const subtotal = cart?.cost?.subtotalAmount;
  const total = cart?.cost?.totalAmount;

  const errorFromRedirect = typeof searchParams?.error === 'string' ? searchParams.error : null;

  async function updateLineAction(formData: FormData) {
    'use server';

    const lineId = String(formData.get('lineId') || '');

    // When clicking +/- we submit `setQuantity`. When clicking “Aktualisieren” we use the input `quantity`.
    const setQuantityRaw = formData.get('setQuantity');
    const inputQuantityRaw = formData.get('quantity');

    const raw =
      typeof setQuantityRaw === 'string' && setQuantityRaw.length > 0
        ? setQuantityRaw
        : typeof inputQuantityRaw === 'string' && inputQuantityRaw.length > 0
        ? inputQuantityRaw
        : '1';

    const quantity = Math.max(1, Number.parseInt(raw, 10) || 1);

    if (!lineId) return;

    const result = await postCartAction({ action: 'update', lineId, quantity });

    if (!result.ok) {
      // Keep it simple: redirect-style error handling via query param
      // (works without client-side state)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { redirect } = require('next/navigation');
      redirect(`/shop/cart?error=${encodeURIComponent(result.error || 'Fehler')}`);
    }

    revalidatePath('/shop/cart');
  }

  async function removeLineAction(formData: FormData) {
    'use server';

    const lineId = String(formData.get('lineId') || '');
    if (!lineId) return;

    const result = await postCartAction({ action: 'remove', lineId });

    if (!result.ok) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { redirect } = require('next/navigation');
      redirect(`/shop/cart?error=${encodeURIComponent(result.error || 'Fehler')}`);
    }

    revalidatePath('/shop/cart');
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-900">Warenkorb</h1>
      <p className="mt-2 text-slate-600">Hier kannst du Mengen anpassen oder direkt zur Kasse gehen.</p>

      {errorFromRedirect ? (
        <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800">
          {errorFromRedirect}
        </div>
      ) : null}

      {!cart || lines.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-slate-700">Dein Warenkorb ist noch leer.</p>
          <a
            href="/shop"
            className="mt-4 inline-flex rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Zum Shop
          </a>
        </div>
      ) : (
        <div className="mt-8 grid gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="space-y-5">
              {lines.map((l) => {
                const title = l.merchandise?.product?.title || 'Produkt';
                const variantTitleRaw = l.merchandise?.title || '';
                const variantTitle = isDefaultVariantTitle(variantTitleRaw) ? '' : variantTitleRaw;
                const handle = l.merchandise?.product?.handle;

                const quantityAvailable = l.merchandise?.quantityAvailable;
                const hasStockLimit = typeof quantityAvailable === 'number' && Number.isFinite(quantityAvailable);
                const isOverStock = hasStockLimit && l.quantity > (quantityAvailable as number);
                const atStockLimit = hasStockLimit && l.quantity >= (quantityAvailable as number);

                return (
                  <div key={l.id} className="flex gap-4 border-b border-slate-200 pb-5 last:border-b-0 last:pb-0">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50">
                      {l.merchandise?.image?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={l.merchandise.image.url}
                          alt={l.merchandise.image.altText || title}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          {handle ? (
                            <a className="font-semibold text-slate-900 hover:underline" href={`/shop/products/${handle}`}>
                              {title}
                            </a>
                          ) : (
                            <div className="font-semibold text-slate-900">{title}</div>
                          )}
                          {variantTitle ? <div className="mt-1 text-sm text-slate-600">{variantTitle}</div> : null}
                        </div>

                        <div className="text-right text-sm text-slate-700">{formatMoney(l.cost?.totalAmount)}</div>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <form action={updateLineAction} className="flex items-center gap-2">
                          <input type="hidden" name="lineId" value={l.id} />

                          <button
                            type="submit"
                            name="setQuantity"
                            value={Math.max(1, l.quantity - 1)}
                            className="h-10 w-10 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 hover:bg-slate-50"
                            aria-label="Menge reduzieren"
                            disabled={l.quantity <= 1}
                          >
                            −
                          </button>

                          <input
                            type="number"
                            name="quantity"
                            min={1}
                            max={hasStockLimit ? (quantityAvailable as number) : undefined}
                            defaultValue={l.quantity}
                            className="h-10 w-16 rounded-xl border border-slate-300 bg-white px-3 text-center text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                            aria-label="Menge"
                          />

                          <button
                            type="submit"
                            name="setQuantity"
                            value={l.quantity + 1}
                            className="h-10 w-10 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 hover:bg-slate-50"
                            aria-label="Menge erhöhen"
                            disabled={atStockLimit}
                          >
                            +
                          </button>

                          <button
                            type="submit"
                            className="ml-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                          >
                            Aktualisieren
                          </button>
                        </form>

                        <form action={removeLineAction}>
                          <input type="hidden" name="lineId" value={l.id} />
                          <button
                            type="submit"
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                          >
                            Entfernen
                          </button>
                        </form>
                      </div>
                      {hasStockLimit ? (
                        <div className="mt-2 text-xs text-slate-600">
                          Verfügbar: <span className="font-semibold text-slate-900">{quantityAvailable}</span>
                          {isOverStock ? (
                            <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-rose-800">
                              Menge überschreitet den verfügbaren Bestand.
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between text-slate-700">
              <span>Zwischensumme</span>
              <span className="font-semibold text-slate-900">{formatMoney(subtotal)}</span>
            </div>

            {cart?.cost?.totalTaxAmount ? (
              <div className="mt-2 flex items-center justify-between text-slate-700">
                <span>Steuer</span>
                <span className="font-semibold text-slate-900">{formatMoney(cart.cost.totalTaxAmount)}</span>
              </div>
            ) : null}

            <div className="mt-2 flex items-center justify-between text-slate-700">
              <span>Gesamt</span>
              <span className="text-xl font-bold text-slate-900">{formatMoney(total)}</span>
            </div>

            <a
              href={cart.checkoutUrl}
              className="mt-5 block w-full rounded-xl bg-emerald-600 px-4 py-3 text-center font-semibold text-white hover:bg-emerald-700"
              rel="nofollow"
            >
              Zur Kasse
            </a>

            {lines.some(isDifferenzLine) ? (
              <p className="mt-3 text-xs text-slate-600">
                Hinweis: Mindestens ein Artikel unterliegt der Differenzbesteuerung nach § 25a UStG. Die Umsatzsteuer wird hierfür nicht separat ausgewiesen.
              </p>
            ) : (
              <p className="mt-3 text-xs text-slate-500">Du wirst für die Zahlung sicher zu Shopify weitergeleitet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}