export const dynamic = "force-dynamic";

import Link from "next/link";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Blogs | Raghu Anand",
  description: "Technical articles and thoughts on software engineering, databases, and system design.",
};

export default async function BlogsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  const postCount = posts.length;

  return (
    <div className="min-h-screen bg-background text-ink-900">
      <div className="content-container py-12">
        <header className="mb-12">
          <h1 className="font-display text-3xl md:text-5xl text-ink-900 mb-6">
            Blogs ({postCount})
          </h1>
          <p className="text-base md:text-base text-ink-600 leading-relaxed max-w-2xl mb-4">
            Every week, I document and articulate my thoughts and learnings on Software Engineering,
            Database Internals, and System Design. Here are all blogs I wrote to date.
          </p>
          <p className="text-base text-ink-600">
            If you find my writings helpful and interesting, consider subscribing to my{" "}
            <a
              href="/rss.xml"
              className="text-ink-900 hover:text-ink-600 underline underline-offset-4 transition-colors"
            >
              RSS feed
            </a>{" "}
            in your favourite RSS Reader.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="py-12">
            <p className="text-ink-500">No published posts yet.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {posts.map((post) => {
              const date = post.publishedAt ?? post.createdAt;
              const formatted = new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <article key={post.id}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-2 group"
                    prefetch={true}
                  >
                    <time className="font-mono text-sm text-ink-500 w-32 shrink-0">
                      {formatted} :
                    </time>
                    <h2 className="text-sm font-normal md:text-lg text-blue-600 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}