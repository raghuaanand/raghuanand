"use client";
import { useRouter, usePathname } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <button
      aria-label="Go back"
      onClick={() => router.back()}
      className={
        "fixed top-6 left-6 z-50 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-ink-200 text-ink-500 hover:text-ink-900 hover:border-ink-900 transition-all duration-200"
      }
    >
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path d="M15 19l-7-7 7-7" />
      </svg>
      <span className="sr-only">Go back</span>
    </button>
  );
}
