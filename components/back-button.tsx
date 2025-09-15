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
        // On small screens keep the button inline and unobtrusive; on md+ keep fixed floating button
        "md:fixed md:top-4 md:left-4 md:z-50 md:p-2 md:rounded-full md:bg-gray-100 md:hover:bg-gray-200 md:border md:border-gray-300 md:shadow " +
        // Small-screen appearance: small inline button with subtle background and margin so it doesn't overlap headings
        "relative inline-flex items-center p-1.5 bg-transparent hover:bg-gray-50 rounded-md"
      }
      style={{ backdropFilter: "none" }}
    >
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
        <path d="M15 19l-7-7 7-7" />
      </svg>
      <span className="sr-only">Go back</span>
    </button>
  );
}
