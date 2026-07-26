import { unstable_cache } from "next/cache";
import { fetchMediumFeed } from "./rss";
import type { MediumPost } from "@/lib/types";

export const getMediumPosts = unstable_cache(
  async (): Promise<MediumPost[]> => {
    return fetchMediumFeed();
  },
  ["medium-posts"],
  {
    revalidate: 3600,
    tags: ["medium-posts"],
  }
);

export async function getMediumPostBySlug(
  slug: string
): Promise<MediumPost | null> {
  const posts = await getMediumPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function getRecentPosts(count: number = 3): Promise<MediumPost[]> {
  const posts = await getMediumPosts();
  return posts.slice(0, count);
}
