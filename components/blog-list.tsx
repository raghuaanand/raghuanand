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
      <h2 className="font-display text-2xl font-normal tracking-tight text-ink-900 mb-8">
        Your Articles
      </h2>
      {blogs.length === 0 ? (
        <p className="text-text-secondary text-sm">No articles yet.</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <article key={blog.id} className="border border-stone-200 p-6 hover:border-accent-rust transition-colors">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="text-lg md:text-xl font-medium text-ink-900 hover:text-accent-rust transition-colors block mb-2"
                  >
                    {blog.title}
                  </Link>
                  <div className="flex items-center gap-4 text-xs">
                    <span className={`font-mono ${blog.published ? 'text-accent-sage' : 'text-text-tertiary'}`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                    <span className="font-mono text-text-tertiary">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/write/edit/${blog.id}`}
                    className="px-4 py-2 border border-stone-300 text-ink-900 hover:border-ink-900 transition-colors text-sm font-medium rounded-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(blog.id)}
                    className="px-4 py-2 border border-red-200 text-red-700 hover:border-red-400 hover:bg-red-50 transition-colors text-sm font-medium rounded-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
