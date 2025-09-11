export const dynamic = "force-dynamic";

import Link from "next/link";
import prisma from "@/lib/prisma";
import { stripHtml, truncateText } from "@/lib/utils";

export const metadata = {
  title: "Technical Writings",
  description: "Published articles",
};

export default async function BlogsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      excerpt: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  return (
    <div className="min-h-screen min-w- bg-white mt-10">
      <div className="medium-container py-12">
        {/* <h1 className="medium-title mb-12">Blogs</h1> */}

        {posts.length === 0 ? (
          <div className="medium-content">
            <p className="text-gray-600">No published posts yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => {
              const date = post.publishedAt ?? post.createdAt;
              const formatted = new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <article key={post.id} className="border-b-2 border-gray-300 pb-8">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group block"
                    prefetch={true}
                  >
                    <h2 className="text-2xl font-roboto font-bold text-gray-900 group-hover:text-gray-700 mb-2 leading-tight">
                      {post.title}
                    </h2>
                    <div className="medium-meta mb-3">{formatted}</div>
                    {post.description ? (
                      <p className="text-gray-700 text-base leading-relaxed mb-4">
                        {post.description}
                      </p>
                    ) : null}
                    <span className="inline-block text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                      Read more →
                    </span>
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