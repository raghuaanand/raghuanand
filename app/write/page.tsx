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
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="font-mono text-sm text-text-tertiary">Loading...</p>
      </div>
    );
  }
  if (status !== "authenticated" || (session?.user as any)?.role !== "ADMIN") {
    router.replace(`/signin?callbackUrl=${encodeURIComponent("/write")}`);
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="font-mono text-sm text-text-tertiary">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="content-wide px-6 md:px-8 py-4">
        <header className="mb-12 pb-8 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-light tracking-tight text-ink-900 mb-4">
              Write
            </h1>
            <p className="text-md text-text-secondary">Manage your blog posts</p>
          </div>
          <button
            className="px-6 py-3 bg-accent-rust text-black transition-colors font-medium text-sm rounded-lg border-2 border-gray-400 hover:border-ink-700 "
            onClick={handleWriteNew}
          >
            New Article
          </button>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="py-12">
            <p className="font-mono text-sm text-text-tertiary">Loading articles...</p>
          </div>
        ) : (
          <BlogList blogs={blogs} onDelete={handleDelete} />
        )}

        {showEditor && (
          <div className="mt-12 pt-12 border-t border-stone-200">
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
    </div>
  );
}