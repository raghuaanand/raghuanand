import prisma from "@/lib/prisma";
import EditorClient from "../editor-client";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export const dynamic = "force-dynamic";

export default async function EditPage({ params }: Props) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) return notFound();

  // Render a server wrapper that passes the id to the client editor
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-6">Edit Post</h1>
  {/* Client-side editor loaded with editId */}
  <EditorClient editId={params.id} />
      </div>
    </div>
  );
}
