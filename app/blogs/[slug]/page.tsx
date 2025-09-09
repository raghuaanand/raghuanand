export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    select: { title: true, excerpt: true },
  });
  if (!post) {
    return { title: "Post not found" };
  }
  return {
    title: post.title,
    description: post.excerpt || undefined,
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
  const formatted = new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isHtml = post.contentType === 'html';

  return (
    <div className="min-h-screen bg-white">
      <div className="md:max-w-3xl max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-8">{formatted}</p>

        <article className="prose prose-neutral max-w-none">
          {isHtml ? (
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="prose prose-neutral max-w-none"
            />
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          )}
        </article>
      </div>
    </div>
  );
}