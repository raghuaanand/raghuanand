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

  const snippet = (text?: string | null) => {
    if (!text) return "";
    const trimmed = text.trim();
    if (trimmed.length === 0) return "";

    // take up to first 25 words
    const words = trimmed.split(/\s+/);
    let out = words.slice(0, 25).join(" ");

    // enforce 125 character limit
    if (out.length > 125) {
      out = out.slice(0, 125).replace(/\s+$/g, "");
      return out + "…";
    }

    // if we trimmed by words and original is longer, append ellipsis
    if (words.length > 25 || out.length < trimmed.length) {
      return out + "…";
    }

    return out;
  };

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

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold font-roboto mb-6">Recent writings</h2>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet.</p>
        ) : (
          posts.map((p) => (
            <article key={p.id} className="border-b-2 border-gray-200 pb-4">
              <Link href={`/blogs/${p.slug}`} className="group block" prefetch>
                <h3 className="text-xl font-roboto font-bold text-gray-900 group-hover:text-gray-700 mb-2 leading-tight">
                  {p.title}
                </h3>
                {p.description || p.excerpt ? (
                  <p className="text-gray-700 text-base leading-relaxed mb-3">{snippet(p.description ?? p.excerpt)}</p>
                ) : null}
                <span className="inline-block text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                  Read more →
                </span>
              </Link>
            </article>
          ))
        )}
      </div>

      <div className="mt-6">
        <Link href="/blogs" className="text-sm font-medium text-blue-600 hover:underline">
          See more blogs →
        </Link>
      </div>
    </section>
  );
}
