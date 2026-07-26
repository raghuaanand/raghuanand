export default function BlogsLoading() {
  return (
    <div className="min-h-screen bg-background text-ink-900">
      <div className="content-container py-12">
        <header className="pb-8 mb-8 border-b-[2px]">
          <div className="h-12 w-48 bg-stone-100 rounded mb-6 animate-pulse" />
          <div className="h-4 w-96 bg-stone-100 rounded mb-4 animate-pulse" />
          <div className="h-4 w-64 bg-stone-100 rounded animate-pulse" />
        </header>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <div className="h-4 w-32 bg-stone-100 rounded animate-pulse" />
              <div className="h-4 w-64 bg-stone-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
