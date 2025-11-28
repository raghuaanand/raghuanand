import type { Metadata } from "next";
import { Inter, Crimson_Pro, IBM_Plex_Mono } from 'next/font/google';
import "./globals.css";

import AuthProvider from "@/components/auth-provider";
import BackButton from "@/components/back-button";
import Navigation from "@/components/navigation";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Raghu Anand -  Software Engineer",
  description: "Full-Stack Software Engineer specializing in React, Node.js, and modern web technologies. Building scalable, user-centric applications with clean, maintainable code.",
  keywords: ["software engineer", "full-stack developer", "React", "Node.js", "JavaScript", "TypeScript", "web development", "portfolio"],
  authors: [{ name: "Raghu Anand" }],
  creator: "Raghu Anand",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raghuanand.me",
    title: "Raghu Anand | Full-Stack Software Engineer",
    description: "Portfolio showcasing expertise in modern web development and software engineering.",
    siteName: "Raghu Anand Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Raghu Anand - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghu Anand | Full-Stack Software Engineer",
    description: "Portfolio showcasing expertise in modern web development and software engineering.",
    images: ["/profile.png"],
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
      <body className={`min-h-screen bg-background text-ink-900 antialiased ${inter.variable} ${crimsonPro.variable} ${ibmPlexMono.variable}`}>
        <AuthProvider>
          <Navigation />
          <BackButton />
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
