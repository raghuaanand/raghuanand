import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const createPostSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(300).optional().nullable(),
  slug: z.string().min(3).max(220).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().min(1),
  contentType: z.string().optional().default("html"),
  published: z.boolean().optional().default(false),
});

function toExcerpt(content: string, contentType: string = "html", maxLen = 180): string {
  let text = content;
  
  if (contentType === "html") {
    // Strip HTML tags for excerpt
    text = content
      .replace(/<[^>]*>/g, " ") // Remove HTML tags
      .replace(/\s+/g, " ") // Normalize whitespace
      .trim();
  } else {
    // Handle markdown (legacy)
    text = content
      .replace(/`{1,3}[\s\S]*?`{1,3}/g, " ") // inline/blocks code
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
      .replace(/\[[^\]]*\]\([^)]*\)/g, " ") // links
      .replace(/[*_~>#-]+/g, " ") // md symbols
      .replace(/`/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + "…" : text;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = createPostSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", issues: parsed.error.flatten() }, { status: 400 });
  }

  const { title, description, slug, content, contentType, published } = parsed.data;

  // Enforce unique slug
  const existingSlug = await prisma.post.findUnique({ where: { slug } });
  if (existingSlug) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const excerpt = toExcerpt(content, contentType);

  const post = await prisma.post.create({
    data: {
      title,
      description,
      slug,
      content,
      contentType,
      excerpt,
      published: !!published,
      publishedAt: published ? new Date() : null,
      authorId: (session.user as any).id as string,
    },
    select: { id: true, slug: true, published: true },
  });

  // Revalidate listings and detail (if published)
  revalidatePath("/blogs");
  if (post.published) {
    revalidatePath(`/blogs/${post.slug}`);
  }

  return NextResponse.json({ id: post.id, slug: post.slug }, { status: 201 });
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const all = url.searchParams.get("all");

    // If requesting all posts, require admin session
    if (all === "1") {
      const session = await getServerSession(authOptions);
      if (!session || (session.user as any)?.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const posts = await prisma.post.findMany({
        orderBy: [{ createdAt: "desc" }],
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          excerpt: true,
          published: true,
          publishedAt: true,
          createdAt: true,
        },
      });
      return NextResponse.json({ posts });
    }

    // Default: only published posts
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
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}