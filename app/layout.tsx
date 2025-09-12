import type { Metadata } from "next";
import "./globals.css";


import AuthProvider from "@/components/auth-provider";
import BackButton from "@/components/back-button";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Raghu Anand | Full-Stack Software Engineer",
  description: "Full-Stack Software Engineer specializing in React, Node.js, and modern web technologies. Building scalable, user-centric applications with clean, maintainable code.",
  keywords: ["software engineer", "full-stack developer", "React", "Node.js", "JavaScript", "TypeScript", "web development", "portfolio"],
  authors: [{ name: "Raghu Anand" }],
  creator: "Raghu Anand",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raghuanand.tech",
    title: "Raghu Anand | Full-Stack Software Engineer",
    description: "Portfolio showcasing expertise in modern web development and software engineering.",
    siteName: "Raghu Anand Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghu Anand | Full-Stack Software Engineer",
    description: "Portfolio showcasing expertise in modern web development and software engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen font-sans bg-white text-gray-900 antialiased">
        <AuthProvider>
          <BackButton />
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
