import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/**
 * Lädt eine Seite aus content/pages/<slug>.md (Decap CMS)
 * Erwartet Frontmatter: title, seo_description, updated (optional)
 * Erwartet Markdown-Body im "content"
 */
export async function getPage(slug: string) {
  const filePath = path.join(CONTENT_ROOT, "pages", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Content page not found: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  // Markdown -> HTML (Absätze/Listen bleiben korrekt)
  const processed = await remark()
    .use(gfm)       // Tabellen, Autolinks, Strikethrough etc.
    .use(html)
    .process(content);

  return {
    title: typeof data.title === "string" ? data.title : "",
    seoDescription:
      typeof data.seo_description === "string" ? data.seo_description : "",
    updated: typeof data.updated === "string" ? data.updated : "",
    html: processed.toString(),
  };
}