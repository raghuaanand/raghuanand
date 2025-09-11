import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Minimal slugify: lowercases, trims, replaces non-alphanumerics with hyphens, collapses multiple hyphens.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Strip HTML tags from a string and return plain text
 */
export function stripHtml(html: string): string {
  // Remove HTML tags
  const withoutTags = html.replace(/<[^>]*>/g, "");
  
  // Decode common HTML entities
  return withoutTags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&hellip;/g, "…")
    .trim();
}

/**
 * Truncate text to a specified length and add ellipsis if needed
 */
export function truncateText(text: string, maxLength: number = 200): string {
  if (text.length <= maxLength) return text;
  
  // Find the last space before maxLength to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "…";
}

/**
 * Remove the first heading (title) from HTML content
 */
export function removeFirstHeadingFromHtml(html: string): string {
  // Remove first h1, h2, h3, h4, h5, or h6 tag and its content
  return html.replace(/<h[1-6][^>]*>.*?<\/h[1-6]>\s*/i, "").trim();
}

/**
 * Remove the first heading (title) from Markdown content
 */
export function removeFirstHeadingFromMarkdown(markdown: string): string {
  // Remove first markdown heading (# ## ### etc.) and any following empty lines
  return markdown.replace(/^#{1,6}\s+.*?$/m, "").replace(/^\s*\n/, "").trim();
}
