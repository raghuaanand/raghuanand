export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { stripHtml, removeFirstHeadingFromHtml, removeFirstHeadingFromMarkdown } from "@/lib/utils";
import Image from "next/image";
import BlogSidebar from "@/components/blog-sidebar";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    select: { title: true, description: true, excerpt: true },
  });
  if (!post) {
    return { title: "Post not found" };
  }

  const description = post.description || (post.excerpt ? stripHtml(post.excerpt) : "Read this article by Raghu Anand");
  const url = `https://raghuanand.me/blogs/${params.slug}`;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: "Raghu Anand",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: "/profile.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: ["/profile.png"],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    select: {
      id: true,
      title: true,
      content: true,
      contentType: true,
      published: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  const date = post.publishedAt ?? post.createdAt;
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isHtml = post.contentType === 'html';

  return (
    <div className="min-h-screen bg-white pt-12 pb-16">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">

          {/* Main Content Column */}
          <main className="min-w-0 max-w-[90ch]">
            {/* Header Section */}
            <header className="mb-10">
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-red-600 mb-6 leading-tight tracking-tight">
                {post.title}
              </h1>

              {/* Author Mini-Profile (Mobile/Desktop consistent) */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-stone-200">
                  <Image
                    src="/profile.png"
                    alt="Raghu Anand"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-medium text-ink-900 text-sm">Raghu Anand</span>
                  <span className="text-ink-500 text-xs mt-1">
                    <time dateTime={date.toISOString()}>{formatted}</time>
                  </span>
                </div>
              </div>
            </header>

            {/* Blog Content */}
            <article className="prose prose-compact max-w-none">
              {isHtml ? (
                <div
                  dangerouslySetInnerHTML={{ __html: removeFirstHeadingFromHtml(post.content) }}
                  className="blog-content"
                />
              ) : (
                <div className="blog-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {removeFirstHeadingFromMarkdown(post.content)}
                  </ReactMarkdown>
                </div>
              )}
            </article>
          </main>

          {/* Sidebar Column */}
          <BlogSidebar />

        </div>
      </div>
    </div>
  );
}