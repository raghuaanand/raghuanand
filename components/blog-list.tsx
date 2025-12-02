import Link from "next/link";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
};

interface BlogListProps {
  blogs: Blog[];
  onDelete: (id: string) => void;
}

export default function BlogList({ blogs, onDelete }: BlogListProps) {
  return (
    <div className="mb-12">
      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-stone-200 border-dashed">
          <p className="text-ink-500 mb-2">No articles yet</p>
          <p className="text-sm text-ink-400">Start writing your first story</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group bg-white p-5 rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${blog.published
                      ? 'bg-green-50 text-green-700 border border-green-100'
                      : 'bg-stone-100 text-stone-600 border border-stone-200'
                    }`}>
                    {blog.published ? "Published" : "Draft"}
                  </span>
                  <span className="text-xs text-ink-400 font-mono">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                </div>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="block group-hover:text-accent-rust transition-colors"
                >
                  <h3 className="text-lg font-semibold text-ink-900 truncate pr-4">
                    {blog.title}
                  </h3>
                </Link>
              </div>

              <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                <Link
                  href={`/write/edit/${blog.id}`}
                  className="p-2 text-ink-500 hover:text-ink-900 hover:bg-stone-100 rounded-md transition-colors"
                  title="Edit"
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
                <button
                  onClick={() => onDelete(blog.id)}
                  className="p-2 text-ink-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete"
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
