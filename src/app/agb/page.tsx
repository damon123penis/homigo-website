import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";

export async function getPage(slug: string) {
  const filePath = `content/${slug}.md`;

  const raw = fs.readFileSync(filePath, "utf8");

  // Parse frontmatter. If the file has a broken/unclosed frontmatter block,
  // gray-matter will treat the whole file as "data" and return empty content.
  // We guard against that so pages don't render blank.
  let data: any = {};
  let content = "";
  try {
    const parsed = matter(raw);
    data = parsed.data || {};
    content = typeof parsed.content === "string" ? parsed.content : "";
  } catch {
    // Fall back to raw content if parsing fails.
    content = raw;
  }

  // Fallback: if content is empty but the file looks like it contains more than just frontmatter,
  // strip the first frontmatter block manually (even if it's malformed).
  if (!content.trim()) {
    const fmFence = /^---\s*$|^\+\+\+\s*$/gm;
    const fences = Array.from(raw.matchAll(fmFence));
    if (fences.length >= 2) {
      const secondFenceIdx = fences[1].index ?? -1;
      if (secondFenceIdx >= 0) {
        content = raw.slice(secondFenceIdx + fences[1][0].length);
      }
    } else {
      // No (proper) closing fence found — treat whole file as markdown body.
      content = raw;
    }
  }

  const processed = await remark()
    .use(remarkGfm)
    // allowDangerousHtml lets raw HTML in markdown through;
    // if you don't use HTML in markdown, it's still safe here because we control the content files.
    .use(remarkRehype, { allowDangerousHtml: true })
    // Parse raw HTML nodes produced by allowDangerousHtml
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    title: typeof data.title === "string" ? data.title : "",
    seoDescription:
      typeof data.seo_description === "string" ? data.seo_description : "",
    updated: typeof data.updated === "string" ? data.updated : "",
    html: processed.toString(),
  };
}