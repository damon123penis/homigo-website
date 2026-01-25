import type { Metadata } from "next";
import React from "react";
import { getPage } from "@/lib/content";

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
    </div>
  );
}