import { NextResponse } from "next/server";
import { getMediumPosts } from "@/lib/services/blog";

export async function GET() {
  try {
    const posts = await getMediumPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("GET /api/medium-posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Medium posts" },
      { status: 500 }
    );
  }
}
