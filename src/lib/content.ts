// src/lib/content.ts
import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ContentPage = {
  title: string;
  seoDescription: string;
  updated: string;
  html: string;
};

function normalizeSlug(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const s = input.trim();
  if (!s) return null;

  // Guard against accidental stringified values
  const lower = s.toLowerCase();
  if (lower === "undefined" || lower === "null") return null;

  // Allow inputs like "/agb", "agb/", "pages/agb" and normalize to "agb"
  const stripped = s.replace(/^\/+/, "").replace(/\/+$/, "");
  const parts = stripped.split("/").filter(Boolean);

  // If someone passes "pages/x" or "/pages/x" take the last segment
  const last = parts[parts.length - 1] ?? "";

  // Basic safety: prevent path traversal and weird filenames
  const safe = last.replace(/\.\./g, "").replace(/[^a-zA-Z0-9_-]/g, "");
  return safe ? safe : null;
}

function fallbackPage(slug: string): ContentPage {
  return {
    title: "Seite nicht gefunden",
    seoDescription: "",
    updated: "",
    html: `<p>Die angeforderte Seite <code>${slug}</code> wurde nicht gefunden.</p>`,
  };
}

export async function getPage(slug: unknown): Promise<ContentPage> {
  const normalized = normalizeSlug(slug);
  if (!normalized) {
    // IMPORTANT: Do not crash the build because one page calls getPage(undefined).
    // Instead return a deterministic fallback and log for debugging.
    console.error(`[content] getPage(): invalid slug`, { slug });
    return fallbackPage(String(slug));
  }

  const filePath = path.join(CONTENT_ROOT, "pages", `${normalized}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`[content] getPage(): page not found`, { slug: normalized, filePath });
    return fallbackPage(normalized);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype) // mdast -> hast
    .use(rehypeSlug) // IDs an headings
    .use(rehypeStringify) // hast -> HTML string
    .process(content);

  return {
    title: typeof data.title === "string" ? data.title : "",
    seoDescription:
      typeof (data as any).seo_description === "string" ? (data as any).seo_description : "",
    updated: typeof data.updated === "string" ? data.updated : "",
    html: processed.toString(),
  };
}