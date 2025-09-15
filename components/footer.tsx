"use client";

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 text-center">
      <div className="space-y-2">
        <p className="text-sm font-roboto text-gray-500 homepage-content">
          All rights reserved. &copy; {new Date().getFullYear()} Raghu Anand.
        </p>
        <p className="text-sm font-roboto text-gray-500 homepage-content">
          Built with Next.js, Tailwind CSS, and deployed on Vercel.
        </p>
        
      </div>
    </footer>
  );
}
