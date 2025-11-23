"use client";

export default function Footer() {
  return (
    <footer className="mt-32 pt-12 pb-8 border-t border-ink-200">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ink-500">
        <p>
          &copy; {new Date().getFullYear()} Raghu Anand
        </p>
        <p>
          Built with Next.js & Tailwind
        </p>
      </div>
    </footer>
  );
}
