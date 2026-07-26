import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-white pt-12 pb-16">
      <div className="content-container">
        <div className="max-w-[90ch] mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm text-ink-500 mb-6 font-medium">
              <Link
                href="/blogs"
                className="hover:text-ink-900 transition-colors flex items-center gap-1"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Articles
              </Link>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-ink-900 mb-8 leading-[1.1] tracking-tight">
              Article not found
            </h1>
          </header>

          <div className="py-12 text-center border-t border-stone-200">
            <p className="text-ink-600 mb-6">
              The article you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink-900 text-white rounded-lg hover:bg-ink-800 transition-colors font-medium"
            >
              View all articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
