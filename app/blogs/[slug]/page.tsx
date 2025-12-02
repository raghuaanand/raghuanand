export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { stripHtml, removeFirstHeadingFromHtml, removeFirstHeadingFromMarkdown } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import BlogSidebar from "@/components/blog-sidebar";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    select: {
      title: true,
      description: true,
      excerpt: true,
      publishedAt: true,
      createdAt: true,
    },
  });
  if (!post) {
    return { title: "Post not found" };
  }

  const description = post.description || (post.excerpt ? stripHtml(post.excerpt) : "Read this article by Raghu Anand");
  const url = `https://raghuanand.me/blogs/${params.slug}`;

  // Format date for OG image
  const date = post.publishedAt ?? post.createdAt;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Generate dynamic OG image URL
  const ogImageUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://raghuanand.me'}/api/og`);
  ogImageUrl.searchParams.set('title', post.title);
  ogImageUrl.searchParams.set('author', 'Raghu Anand');
  ogImageUrl.searchParams.set('date', formattedDate);

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
          url: ogImageUrl.toString(),
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
      images: [ogImageUrl.toString()],
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
      relatedPosts: {
        where: { published: true },
        select: { id: true, title: true, slug: true, publishedAt: true, createdAt: true },
      },
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Fetch recommended posts (3 most recent, excluding current)
  const recommendedPosts = await prisma.post.findMany({
    where: {
      published: true,
      id: { not: post.id },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      publishedAt: true,
      createdAt: true,
    },
  });

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
            <header className="mb-12">
              <div className="flex items-center gap-2 text-sm text-ink-500 mb-6 font-medium">
                <Link href="/blogs" className="hover:text-ink-900 transition-colors flex items-center gap-1">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Articles
                </Link>
                <span className="text-stone-300">•</span>
                <time dateTime={date.toISOString()}>{formatted}</time>
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-ink-900 mb-8 leading-[1.1] tracking-tight">
                {post.title}
              </h1>

              {/* Author Mini-Profile */}
              <div className="flex items-center gap-4 py-6 border-y border-stone-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-stone-200 ring-2 ring-white shadow-sm">
                  <Image
                    src="/profile.png"
                    alt="Raghu Anand"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold text-ink-900">Raghu Anand</span>
                  <span className="text-ink-500 text-sm">Software Engineer</span>
                </div>
              </div>
            </header>

            {/* Blog Content */}
            <article className="prose prose-lg prose-stone max-w-none 
              prose-headings:font-display prose-headings:font-semibold prose-headings:text-ink-900 
              prose-p:text-ink-700 prose-p:leading-relaxed 
              prose-a:text-ink-900 prose-a:decoration-stone-300 prose-a:underline-offset-4 hover:prose-a:decoration-ink-900 hover:prose-a:text-accent-rust prose-a:transition-all
              prose-strong:text-ink-900 prose-strong:font-semibold
              prose-code:text-ink-900 prose-code:bg-stone-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-stone-900 prose-pre:text-stone-50 prose-pre:rounded-xl prose-pre:shadow-sm
              prose-img:rounded-xl prose-img:shadow-md
              prose-blockquote:border-l-4 prose-blockquote:border-accent-rust prose-blockquote:bg-stone-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            ">
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

            {/* Related Posts (Series) */}
            {(post as any).relatedPosts && (post as any).relatedPosts.length > 0 && (
              <div className="mt-16 pt-10 border-t border-stone-200">
                <div className="flex items-center gap-2 mb-6">
                  <span className="p-1.5 bg-stone-100 rounded text-ink-500">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink-900">More in this series</h3>
                </div>

                <div className="grid gap-3">
                  {(post as any).relatedPosts.map((related: any) => (
                    <Link
                      key={related.id}
                      href={`/blogs/${related.slug}`}
                      className="group flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100 hover:border-stone-300 hover:shadow-sm transition-all"
                    >
                      <span className="font-medium text-ink-700 group-hover:text-ink-900 transition-colors">
                        {related.title}
                      </span>
                      <span className="text-stone-400 group-hover:text-accent-rust group-hover:translate-x-1 transition-all">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Posts */}
            <div className="mt-20 pt-12 border-t border-stone-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-2xl font-semibold text-ink-900">Recommended for you</h3>
                <Link href="/blogs" className="text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors flex items-center gap-1">
                  View all
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedPosts.map((rec) => (
                  <Link key={rec.id} href={`/blogs/${rec.slug}`} className="group block h-full">
                    <article className="flex flex-col h-full p-5 bg-white rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all">
                      <h4 className="font-semibold text-lg text-ink-900 group-hover:text-accent-rust transition-colors mb-3 line-clamp-2 leading-tight">
                        {rec.title}
                      </h4>
                      <div className="mt-auto pt-4 flex items-center justify-between text-xs text-ink-400 font-medium">
                        <time>
                          {new Date(rec.publishedAt ?? rec.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                        <span className="group-hover:translate-x-1 transition-transform text-stone-300 group-hover:text-accent-rust">
                          →
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar Column */}
          <BlogSidebar />

        </div>
      </div>
    </div>
  );
}