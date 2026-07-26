import Parser from "rss-parser";
import type { MediumPost } from "@/lib/types";

const MEDIUM_RSS_URL = process.env.MEDIUM_RSS_URL || "https://medium.com/feed/@raghuaanand";

function estimateReadingTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

function extractCoverImage(content: string): string | null {
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
  return imgMatch ? imgMatch[1] : null;
}

function extractExcerpt(content: string, maxLength = 200): string {
  const text = content.replace(/<[^>]*>/g, "").trim();
  if (text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "…";
}

export async function fetchMediumFeed(): Promise<MediumPost[]> {
  const parser = new Parser({
    timeout: 10000,
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; BlogReader/1.0)",
    },
  });

  const feed = await parser.parseURL(MEDIUM_RSS_URL);

  return (feed.items || []).map((item) => {
    const link = item.link || "";
    const pathOnly = link.split("?")[0];
    const lastSegment = pathOnly.split("/").pop() || "";
    const slug = lastSegment.replace(/-[0-9a-f]{8,}$/, "") || slugify(item.title || "untitled");

    const content = item["content:encoded"] || item.content || "";
    const categories = Array.isArray(item.categories) ? item.categories : [];

    return {
      title: item.title || "Untitled",
      slug,
      pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
      coverImage: extractCoverImage(content),
      description: item.contentSnippet ? extractExcerpt(item.contentSnippet, 200) : extractExcerpt(content, 200),
      categories,
      readingTime: estimateReadingTime(content),
      mediumUrl: link,
      content,
      author: item.creator || feed.title || "Raghu Anand",
    };
  });
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
