import LeftSide from "@/components/left-side";
import Navbar from "@/components/navbar";
import RightSide from "@/components/right-side";
import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Raghu Anand - Full-Stack Software Engineer specializing in modern web technologies. View my portfolio of projects and professional experience." />
        <meta name="keywords" content="software engineer, full-stack developer, web development, React, Next.js, portfolio" />
        <meta property="og:title" content="Raghu Anand - Full-Stack Software Engineer" />
        <meta property="og:description" content="Portfolio of Raghu Anand, Full-Stack Software Engineer specializing in modern web technologies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://raghuanand.tech" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Raghu Anand - Full-Stack Software Engineer" />
        <meta name="twitter:description" content="Portfolio showcasing projects and expertise in web development." />
        <link rel="canonical" href="https://raghuanand.tech" />
      </head>
      <body className="min-h-screen font-sans bg-background text-text-primary antialiased">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <LeftSide />
          <RightSide />
        </div>
      </body>
    </html>
  );
}
