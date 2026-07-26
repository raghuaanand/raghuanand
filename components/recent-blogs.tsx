"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  title: string;
  slug: string;
  description: string;
  pubDate: string;
  readingTime: string;
};

export default function RecentBlogs() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/medium-posts")
      .then((res) => (res.ok ? res.json() : Promise.resolve({ posts: [] })))
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
      <div className="flex items-center justify-start gap-4 mb-2">
        <h2 className="font-display text-2xl text-ink-900 mb-1">
          Recent blog posts
        </h2>
        <Link
          href="/blogs"
          className="text-sm text-blue-600 hover:text-blue-400 hover:underline transition-colors hover:underline-offset-4"
        >
          Full archive →
        </Link>
      </div>
      <p className="text-sm text-ink-600 mb-4">
        Things I have written recently.
      </p>

      <div className="space-y-6">
        {posts.map((p) => {
          const formatted = new Date(p.pubDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <article key={p.slug}>
              <Link
                href={`/blogs/${p.slug}`}
                className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-0 group"
                prefetch
              >
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
    </section>
  );
}
