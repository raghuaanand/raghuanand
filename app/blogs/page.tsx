export const dynamic = "force-dynamic";

import Link from "next/link";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Blogs",
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
      excerpt: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="md:max-w-5xl max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-8">Blogs</h1>

        {posts.length === 0 ? (
          <p className="text-gray-600">No published posts yet.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => {
              const date = post.publishedAt ?? post.createdAt;
              const formatted = new Date(date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <li key={post.id} className="border-b border-gray-200 pb-6">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group block"
                    prefetch={true}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{formatted}</p>
                    {post.excerpt ? (
                      <p className="text-gray-700 mt-3">{post.excerpt}</p>
                    ) : null}
                    <span className="inline-block mt-3 text-blue-600 underline underline-offset-2">
                      read
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}