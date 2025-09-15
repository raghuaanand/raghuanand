"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BlogList, { Blog } from "@/components/blog-list";
import NotionEditor from "@/components/notion-editor";

export default function WritePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && (session?.user as any)?.role === "ADMIN") {
      fetchBlogs();
    }

  // no-op: editor is opened via onEdit handler
  }, [status, session]);

  async function fetchBlogs() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/posts?all=1");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data.posts || []);
    } catch (e) {
      setError("Could not load blogs");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch {
      alert("Failed to delete blog");
    }
  }

  function handleEdit(id: string) {
    setEditId(id);
    setShowEditor(true);
  }

  function handleWriteNew() {
    setEditId(null);
    setShowEditor(true);
  }

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (status !== "authenticated" || (session?.user as any)?.role !== "ADMIN") {
    router.replace(`/signin?callbackUrl=${encodeURIComponent("/write")}`);
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-white max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Write</h1>
      <button
        className="mb-6 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        onClick={handleWriteNew}
      >
        Write New Blog
      </button>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div>Loading blogs...</div>
      ) : (
        <BlogList blogs={blogs} onDelete={handleDelete} />
      )}
      {showEditor && (
        <div className="mt-8">
          <NotionEditor
            editId={editId}
            onClose={() => {
              setShowEditor(false);
              // clear edit query param
              router.replace('/write');
            }}
            onSaved={(post) => {
              // optimistic update: replace or add
              setBlogs((prev) => {
                const exists = prev.find((b) => b.id === post.id);
                if (exists) {
                  return prev.map((b) => (b.id === post.id ? { ...b, title: post.title, slug: post.slug, published: post.published } : b));
                }
                return [{ id: post.id, title: post.title, slug: post.slug, published: post.published, publishedAt: null, createdAt: new Date().toISOString() }, ...prev];
              });
              setShowEditor(false);
            }}
          />
        </div>
      )}
    </div>
  );
}import Link from "next/link";