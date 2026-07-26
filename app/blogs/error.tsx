"use client";

import Link from "next/link";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background text-ink-900">
      <div className="content-container py-12">
        <header className="pb-8 mb-8 border-b-[2px]">
          <h1 className="font-display text-3xl md:text-5xl text-ink-900 mb-6">
            Something went wrong
          </h1>
        </header>

        <div className="py-12 text-center">
          <p className="text-ink-600 mb-6">
            We couldn&apos;t load the blog posts. Please try again later.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-4 py-2 bg-ink-900 text-white rounded-lg hover:bg-ink-800 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-4 py-2 border border-ink-200 rounded-lg hover:bg-ink-50 transition-colors"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
