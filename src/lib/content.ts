// src/lib/content.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export async function getPage(slug: string) {
  if (!slug || typeof slug !== "string") {
    throw new Error(`getPage(): invalid slug "${String(slug)}"`);
  }

  const filePath = path.join(CONTENT_ROOT, "pages", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Content page not found: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkSlug)
    .use(html)
    .process(content);

  return {
    title: typeof data.title === "string" ? data.title : "",
    seoDescription: typeof data.seo_description === "string" ? data.seo_description : "",
    updated: typeof data.updated === "string" ? data.updated : "",
    html: processed.toString(),
  };
}