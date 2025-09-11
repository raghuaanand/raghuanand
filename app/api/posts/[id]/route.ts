import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const updatePostSchema = z
  .object({
    title: z.string().min(3).max(200).optional(),
    description: z.string().max(300).optional().nullable(),
    slug: z
      .string()
      .min(3)
      .max(220)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    content: z.string().min(1).optional(),
    published: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

function toExcerpt(markdown: string, maxLen = 180): string {
  const text = markdown
    .replace(/`{1,3}[\s\S]*?`{1,3}/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[*_~>#-]+/g, " ")
    .replace(/`/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + "…" : text;
}

type RouteContext = {
  params: { id: string };
};

export async function PUT(req: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = updatePostSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", issues: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.post.findUnique({
    where: { id: params.id },
    select: { id: true, slug: true, content: true, published: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data = parsed.data;

  // If slug is changing, ensure uniqueness
  if (data.slug && data.slug !== existing.slug) {
    const collision = await prisma.post.findUnique({ where: { slug: data.slug } });
    if (collision) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
  }

  // Compute excerpt if content updated
  const updateData: any = { ...data };
  if (typeof data.content === "string") {
    updateData.excerpt = toExcerpt(data.content);
  }

  // Handle publishedAt transitions
  if (typeof data.published === "boolean") {
    if (data.published && !existing.published) {
      updateData.publishedAt = new Date();
    }
    if (!data.published) {
      updateData.publishedAt = null;
    }
  }

  const updated = await prisma.post.update({
    where: { id: params.id },
    data: updateData,
    select: { id: true, slug: true, published: true },
  });

  // Revalidate list and detail (old and new slug if changed)
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${existing.slug}`);
  revalidatePath(`/blogs/${updated.slug}`);

  return NextResponse.json({ id: updated.id, slug: updated.slug }, { status: 200 });
}

export async function DELETE(req: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.post.findUnique({ where: { id: params.id }, select: { id: true, slug: true } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.post.delete({ where: { id: params.id } });

  // Revalidate listing and detail
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${existing.slug}`);

  return NextResponse.json({ success: true });
}

export async function GET(req: Request, { params }: RouteContext) {
  try {
    const session = await getServerSession(authOptions);

    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        contentType: true,
        description: true,
        excerpt: true,
        published: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // If not published, require admin session
    if (!post.published) {
      if (!session || (session.user as any)?.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("GET /api/posts/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}