"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
};

export default function RecentBlogs() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/posts")
      .then((res) => res.ok ? res.json() : Promise.resolve({ posts: [] }))
      .then((data) => {
        if (!mounted) return;
        const list = Array.isArray(data.posts) ? data.posts.slice(0, 3) : [];
        setPosts(list);
      })
      .catch(() => {
        /* ignore errors for now */
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (posts.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-3xl text-ink-900 mb-8">
        Recent blog posts
      </h2>

      <div className="space-y-6">
        {posts.map((p) => {
          const date = p.publishedAt ?? p.createdAt;
          const formatted = date ? new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }) : "";

          return (
            <article key={p.id}>
              <Link href={`/blogs/${p.slug}`} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-0 group" prefetch>
                <time className="font-mono text-sm text-ink-500 w-32 shrink-0">
                  {formatted}
                </time>
                <h3 className="text-base font-thin md:text-lg text-blue-600 group-hover:text-blue-400 transition-colors">
                  {p.title}
                </h3>
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-8">
        <Link href="/blogs" className="text-sm text-ink-900 hover:text-ink-600 transition-colors underline underline-offset-4">
          Full archive →
        </Link>
      </div>
    </section>
  );
}
