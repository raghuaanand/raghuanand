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
      className="fixed top-4 left-4 z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 shadow"
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}
