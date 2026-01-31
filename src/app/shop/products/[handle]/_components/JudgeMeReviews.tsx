"use client";

import { useEffect } from "react";

type Props = {
  productId: string | number;
  productTitle: string;
  shopReviewsCount?: number;
};

declare global {
  interface Window {
    jdgm?: any;
  }
}

function loadScriptOnce(src: string) {
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) return;

  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}

export default function JudgeMeReviews({ productId, productTitle, shopReviewsCount = 0 }: Props) {
  useEffect(() => {
    // WICHTIG: richtige JDGM Widget URL deines Shops einsetzen
    // Üblicherweise: https://judge.me/widget_preloader.js oder /widgets/... abhängig von Judge.me Setup
    const JDGM_SCRIPT = "https://judge.me/widget_preloader.js";
    loadScriptOnce(JDGM_SCRIPT);

    // Falls jdgm bereits geladen ist, einmal neu initialisieren
    const interval = window.setInterval(() => {
      if (window.jdgm?.widget?.init) {
        window.jdgm.widget.init();
        window.clearInterval(interval);
      }
    }, 200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <div style={{ clear: "both" as any }} />
      <div
        id="judgeme_product_reviews"
        className="jdgm-widget jdgm-review-widget"
        data-product-title={productTitle}
        data-id={productId}
        data-product-id={productId}
        data-widget="review"
        data-auto-install="false"
        data-shop-reviews-count={String(shopReviewsCount)}
        data-entry-point="review_widget.js"
        data-entry-key="review-widget/main.js"
      />
    </>
  );
}