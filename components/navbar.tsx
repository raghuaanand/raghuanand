"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
	const pathname = usePathname() || "/";

	const items = [
		{ label: "Home", href: "/" },
		{ label: "Blogs", href: "/blogs" },
	];

	const isActive = (href: string) => {
		if (href === "/") return pathname === "/";
		// mark as active for /blogs and any nested routes like /blogs/[slug]
		return pathname === href || pathname.startsWith(href + "/");
	};

	return (
		<nav className="w-full border-b border-stone-200 bg-stone-50/95 backdrop-blur-sm absolute z-10 top-0">
			<div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
				<div className="flex items-center gap-6 md:gap-8">
					{items.map((item) => {
						const active = isActive(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								className={
									"text-xs md:text-sm transition-all relative " +
									(active
										? "text-ink-900 font-medium after:absolute after:bottom-[-1rem] after:left-0 after:right-0 after:h-[2px] after:bg-accent-rust"
										: "text-text-secondary hover:text-ink-900")
								}
							>
								{item.label}
							</Link>
						);
					})}
					<Link href="/#projects" className="text-xs md:text-sm text-text-secondary hover:text-ink-900 transition-all">
						Projects
					</Link>
					<Link href="/#experience" className="text-xs md:text-sm text-text-secondary hover:text-ink-900 transition-all">
						Experience
					</Link>
				</div>
			</div>
		</nav>
	);
}

