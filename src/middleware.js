import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};

function normalizeBaseUrl(input, fallback) {
  const raw = (input || fallback || "").trim();
  if (!raw) return "";

  // Accept either `https://shop.homigo.tech` OR `shop.homigo.tech`
  const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  // Remove trailing slashes for safe concatenation
  return withProto.replace(/\/+$/, "");
}

export function middleware(req) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  const isShopHost = host === "shop.homigo.tech" || host.startsWith("shop.homigo.tech:");
  const isMarketingHost =
    host === "www.homigo.tech" ||
    host === "homigo.tech" ||
    host.endsWith(".vercel.app");

  // Canonical shop base URL (robust against env values with/without protocol)
  const SHOP_BASE = normalizeBaseUrl(
    process.env.NEXT_PUBLIC_SHOP_URL || process.env.SHOP_URL,
    "https://shop.homigo.tech"
  );

  // Marketing-Domain: /shop und /shop/* auf Shop-Subdomain umleiten
  if (isMarketingHost && (url.pathname === "/shop" || url.pathname.startsWith("/shop/"))) {
    const rest = url.pathname.replace(/^\/shop\/?/, "");
    const target = rest ? `${SHOP_BASE}/${rest}` : SHOP_BASE;

    // Use an absolute URL string to avoid accidental double-prefixing.
    return NextResponse.redirect(target, 308);
  }

  // Shop-Subdomain: Root "/" -> intern "/shop" (URL bleibt clean; kein Redirect)
  if (isShopHost && url.pathname === "/") {
    const rewriteUrl = url.clone();
    rewriteUrl.pathname = "/shop";
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}