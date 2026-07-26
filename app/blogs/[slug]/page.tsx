import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getMediumPostBySlug, getMediumPosts } from "@/lib/services/blog";
import BlogSidebar from "@/components/blog-sidebar";
import { stripHtml } from "@/lib/utils";

export const revalidate = 3600;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const post = await getMediumPostBySlug(params.slug);
  if (!post) {
    return { title: "Post not found" };
  }

  const description = post.description || stripHtml(post.content).substring(0, 160);
  const url = `https://raghuanand.tech/blogs/${params.slug}`;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: "Raghu Anand",
      locale: "en_US",
      type: "article" as const,
      publishedTime: post.pubDate,
      authors: [post.author],
      tags: post.categories,
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: "/profile.png",
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : ["/profile.png"],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await getMediumPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const posts = await getMediumPosts();
  const currentIndex = posts.findIndex((p) => p.slug === params.slug);
  const recommendedPosts = posts
    .filter((_, i) => i !== currentIndex)
    .slice(0, 3);

  const formatted = new Date(post.pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white pt-12 pb-16">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
          {/* Main Content Column */}
          <main className="min-w-0 max-w-[90ch]">
            {/* Header Section */}
            <header className="mb-12">
              <div className="flex items-center gap-2 text-sm text-ink-500 mb-6 font-medium">
                <Link
                  href="/blogs"
                  className="hover:text-ink-900 transition-colors flex items-center gap-1"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Articles
                </Link>
                <span className="text-stone-300">•</span>
                <time dateTime={post.pubDate}>{formatted}</time>
                <span className="text-stone-300">•</span>
                <span className="text-ink-500">{post.readingTime}</span>
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
                  <span className="font-semibold text-ink-900">
                    {post.author}
                  </span>
                  <span className="text-ink-500 text-sm">Software Engineer</span>
                </div>
              </div>

              {/* Categories */}
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 text-xs font-medium text-ink-600 bg-stone-100 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Blog Content */}
            <article
              className="prose prose-lg prose-stone max-w-none 
              prose-headings:font-display prose-headings:font-semibold prose-headings:text-ink-900 
              prose-p:text-ink-700 prose-p:leading-relaxed 
              prose-a:text-ink-900 prose-a:decoration-stone-300 prose-a:underline-offset-4 hover:prose-a:decoration-ink-900 hover:prose-a:text-accent-rust prose-a:transition-all
              prose-strong:text-ink-900 prose-strong:font-semibold
              prose-code:text-ink-900 prose-code:bg-stone-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-stone-900 prose-pre:text-stone-50 prose-pre:rounded-xl prose-pre:shadow-sm
              prose-img:rounded-none prose-img:shadow-none
              prose-blockquote:border-l-4 prose-blockquote:border-accent-rust prose-blockquote:bg-stone-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic"
            >
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="blog-content"
              />
            </article>

            {/* Read on Medium Button */}
            <div className="mt-12 pt-8 border-t border-stone-200">
              <a
                href={post.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-ink-900 text-white rounded-lg hover:bg-ink-800 transition-colors font-medium"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
                Read original on Medium
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            {/* Recommended Posts */}
            <div className="mt-20 pt-12 border-t border-stone-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-2xl font-semibold text-ink-900">
                  Recommended for you
                </h3>
                <Link
                  href="/blogs"
                  className="text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors flex items-center gap-1"
                >
                  View all
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedPosts.map((rec) => (
                  <Link
                    key={rec.slug}
                    href={`/blogs/${rec.slug}`}
                    className="group block h-full"
                  >
                    <article className="flex flex-col h-full p-5 bg-white rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all">
                      <h4 className="font-semibold text-lg text-ink-900 group-hover:text-accent-rust transition-colors mb-3 line-clamp-2 leading-tight">
                        {rec.title}
                      </h4>
                      <div className="mt-auto pt-4 flex items-center justify-between text-xs text-ink-400 font-medium">
                        <time>
                          {new Date(rec.pubDate).toLocaleDateString("en-US", {
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
