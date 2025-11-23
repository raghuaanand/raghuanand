"use client";

import Link from "next/link";

export default function Navigation() {
    const navLinks = [
        { href: "/blogs", label: "Blogs" },
        { href: "/projects", label: "Projects" },
        { href: "/experience", label: "Experience" },
    ];

    return (
        <nav className="border-b border-ink-200">
            <div className="content-container">
                <div className="flex items-center justify-between py-6">
                    {/* Logo/Name */}
                    <Link
                        href="/"
                        className="text-lg font-semibold text-ink-900 hover:text-ink-700 transition-colors"
                    >
                        Raghu Anand
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-ink-600 hover:text-ink-900 transition-colors text-sm"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
