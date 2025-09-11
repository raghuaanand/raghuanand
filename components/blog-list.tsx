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
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Your Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-gray-600">No blogs yet.</p>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li key={blog.id} className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <Link href={`/blogs/${blog.slug}`} className="text-lg font-medium text-blue-700 hover:underline">
                  {blog.title}
                </Link>
                <span className="ml-2 text-xs text-gray-500">
                  {blog.published ? "Published" : "Draft"}
                </span>
                <span className="ml-2 text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2">
                <Link href={`/write/edit/${blog.id}`} className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-sm">Edit</Link>
                <button
                  onClick={() => onDelete(blog.id)}
                  className="px-3 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
