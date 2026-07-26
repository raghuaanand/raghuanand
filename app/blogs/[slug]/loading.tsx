export default function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-white pt-12 pb-16">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
          <main className="min-w-0 max-w-[90ch]">
            <header className="mb-12">
              <div className="flex items-center gap-2 text-sm text-ink-500 mb-6">
                <div className="h-4 w-32 bg-stone-100 rounded animate-pulse" />
              </div>
              <div className="h-12 w-full bg-stone-100 rounded mb-8 animate-pulse" />
              <div className="flex items-center gap-4 py-6 border-y border-stone-100">
                <div className="w-12 h-12 rounded-full bg-stone-100 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-stone-100 rounded animate-pulse" />
                  <div className="h-3 w-32 bg-stone-100 rounded animate-pulse" />
                </div>
              </div>
            </header>

            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 bg-stone-100 rounded animate-pulse" style={{ width: `${85 + Math.random() * 15}%` }} />
              ))}
            </div>
          </main>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-stone-100 mb-5 animate-pulse" />
                  <div className="h-5 w-32 bg-stone-100 rounded mb-2 animate-pulse" />
                  <div className="h-4 w-24 bg-stone-100 rounded mb-4 animate-pulse" />
                  <div className="h-16 w-full bg-stone-100 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
