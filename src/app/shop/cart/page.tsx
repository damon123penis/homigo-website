// src/app/shop/cart/page.tsx
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
  title: 'Warenkorb – homigo',
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
  // Shopify frequently uses "Default Title" for single-variant products.
  return t === 'default title' || t === 'default' || t === 'standard' || t === 'standardtitel';
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
  // Fallback for local/dev or non-proxied environments.
  // Prefer a dedicated shop URL if provided.
  return (
    process.env.NEXT_PUBLIC_SHOP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://shop.homigo.tech'
  );
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
  const tax = cart?.cost?.totalTaxAmount;
  const total = cart?.cost?.totalAmount;

  const errorFromRedirect = typeof searchParams?.error === 'string' ? searchParams.error : null;

async function updateLineAction(formData: FormData) {
  'use server';

  const lineId = String(formData.get('lineId') || '');
  if (!lineId) return;

  const inputQuantityRaw = formData.get('quantity');
  const raw = typeof inputQuantityRaw === 'string' && inputQuantityRaw.length > 0 ? inputQuantityRaw : '1';
  const quantity = Math.max(1, Number.parseInt(raw, 10) || 1);

  const maxQtyRaw = String(formData.get('maxQty') || '');
  const maxQty = maxQtyRaw !== '' && !Number.isNaN(Number(maxQtyRaw)) ? Number(maxQtyRaw) : undefined;

  if (typeof maxQty === 'number' && Number.isFinite(maxQty) && quantity > maxQty) {
    redirect(`/cart?error=${encodeURIComponent(`Maximal verfügbar: ${maxQty} Stück`)}`);
  }

  const result = await postCartAction({ action: 'update', lineId, quantity });

  if (!result.ok) {
    redirect(`/cart?error=${encodeURIComponent(result.error || 'Fehler')}`);
  }

  revalidatePath('/cart');
  redirect('/cart');
}

  async function removeLineAction(formData: FormData) {
    'use server';

    const lineId = String(formData.get('lineId') || '');
    if (!lineId) return;

    const result = await postCartAction({ action: 'remove', lineId });

    if (!result.ok) {
      redirect(`/cart?error=${encodeURIComponent(result.error || 'Fehler')}`);
    }

    revalidatePath('/cart');
    redirect('/cart');
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
            href="/"
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
                const qtyAvailNum = typeof quantityAvailable === 'number' ? quantityAvailable : undefined;
                const hasStockLimit = typeof qtyAvailNum === 'number' && Number.isFinite(qtyAvailNum);
                // Removed these two lines as per instructions:
                // const isOverStock = hasStockLimit && l.quantity > (qtyAvailNum as number);
                // const atStockLimit = hasStockLimit && l.quantity >= (qtyAvailNum as number);

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
                            <a className="font-semibold text-slate-900 hover:underline" href={`/products/${handle}`}>
                              {title}
                            </a>
                          ) : (
                            <div className="font-semibold text-slate-900">{title}</div>
                          )}
                          {variantTitle ? <div className="mt-1 text-sm text-slate-600">{variantTitle}</div> : null}
                        </div>

                        <div className="text-right text-sm text-slate-700">{formatMoney(l.cost?.totalAmount)}</div>
                      </div>

                      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <form action={updateLineAction} className="flex items-center gap-2">
                          <input type="hidden" name="lineId" value={l.id} />
                          <input type="hidden" name="maxQty" value={hasStockLimit ? String(qtyAvailNum) : ''} />

                          <input
                            type="number"
                            name="quantity"
                            min={1}
                            max={hasStockLimit ? (qtyAvailNum as number) : undefined}
                            defaultValue={l.quantity}
                            className="h-10 w-20 rounded-xl border border-slate-300 bg-white px-2 text-center text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                            aria-label="Menge"
                          />

                          <button
                            type="submit"
                            className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                          >
                            Aktualisieren
                          </button>
                        </form>

                        <form action={removeLineAction}>
                          <input type="hidden" name="lineId" value={l.id} />
                          <button
                            type="submit"
                            className="h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                          >
                            Entfernen
                          </button>
                        </form>
                      </div>
                      {hasStockLimit ? (
                        <div className="mt-2 text-xs text-slate-600">
                          Verfügbar: <span className="font-semibold text-slate-900">{qtyAvailNum}</span>
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

            {tax ? (
              <div className="mt-2 flex items-center justify-between text-slate-700">
                <span>Steuer</span>
                <span className="font-semibold text-slate-900">{formatMoney(tax)}</span>
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
            ) : tax ? (
              <p className="mt-3 text-xs text-slate-500">
                Preise zzgl. gesetzlicher MwSt. Die genaue Steuer wird im Checkout berechnet.
              </p>
            ) : (
              <p className="mt-3 text-xs text-slate-500">
                Preise inkl. gesetzlicher MwSt. Die endgültige Steuer wird im Checkout berechnet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}