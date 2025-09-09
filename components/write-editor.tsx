"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/utils";

export default function WriteEditor() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState<"idle" | "save" | "publish">("idle");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Auto-generate slug from title until user edits slug manually
  const [slugTouched, setSlugTouched] = useState(false);
  const onTitleChange = (v: string) => {
    setTitle(v);
    if (!slugTouched) {
      setSlug(slugify(v));
    }
  };

  const isValid = useMemo(() => {
    return title.trim().length >= 3 && content.trim().length > 0 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  }, [title, content, slug]);

  const submit = useCallback(
    async (publish: boolean) => {
      setSubmitting(publish ? "publish" : "save");
      setError(null);
      setMessage(null);

      try {
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            slug: slug.trim(),
            content,
            published: publish,
          }),
        });

        if (res.status === 409) {
          setError("Slug already exists. Please change the slug.");
          setSubmitting("idle");
          return;
        }

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          setError(body?.error || "Failed to save post");
          setSubmitting("idle");
          return;
        }

        const data = (await res.json()) as { id: string; slug: string };

        if (publish) {
          router.replace(`/blogs/${data.slug}`);
          return;
        }

        setMessage("Draft saved.");
      } catch (e) {
        setError("Network error. Please try again.");
      } finally {
        setSubmitting("idle");
      }
    },
    [title, slug, content, router]
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="md:max-w-5xl max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-6">Write</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="slug">Slug</label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value.toLowerCase());
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="auto-generated-from-title"
            />
            <p className="text-xs text-gray-500 mt-1">Lowercase letters, numbers, and hyphens only.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="content">Markdown</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={16}
              className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="# Heading&#10;&#10;Write your content in Markdown..."
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm text-gray-700">Preview</label>
              <span className="text-xs text-gray-500">GFM supported</span>
            </div>
            <article className="prose prose-neutral max-w-none border border-gray-200 rounded-md p-4 min-h-[12rem]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || "Nothing to preview yet."}</ReactMarkdown>
            </article>
          </div>
        </div>

        {error ? <p className="text-sm text-red-600 mt-4" role="alert">{error}</p> : null}
        {message ? <p className="text-sm text-green-700 mt-4">{message}</p> : null}

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => submit(false)}
            disabled={!isValid || submitting !== "idle"}
            className="rounded-md bg-gray-900 text-white px-4 py-2 hover:bg-gray-800 disabled:opacity-60"
          >
            {submitting === "save" ? "Saving..." : "Save draft"}
          </button>
          <button
            onClick={() => submit(true)}
            disabled={!isValid || submitting !== "idle"}
            className="rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting === "publish" ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}