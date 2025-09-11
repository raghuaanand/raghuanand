export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { stripHtml, removeFirstHeadingFromHtml, removeFirstHeadingFromMarkdown } from "@/lib/utils";

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
  return {
    title: post.title,
    description: post.description || (post.excerpt ? stripHtml(post.excerpt) : undefined),
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
    <div className="min-h-screen bg-white mt-10">
      {/* Medium-style layout */}
      <div className="medium-container py-12">
        {/* Title section with Medium-style spacing */}
        <header className="mb-12">
          <h1 className="medium-title">{post.title}</h1>
          <div className="medium-meta">
            <time dateTime={date.toISOString()}>{formatted}</time>
          </div>
        </header>

        {/* Content section */}
        <article className="medium-content">
          {isHtml ? (
            <div 
              dangerouslySetInnerHTML={{ __html: removeFirstHeadingFromHtml(post.content) }}
              className="blog-content medium-content"
            />
          ) : (
            <div className="blog-content medium-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {removeFirstHeadingFromMarkdown(post.content)}
              </ReactMarkdown>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}