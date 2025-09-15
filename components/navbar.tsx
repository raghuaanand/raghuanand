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
		<nav className="w-full border-b bg-white absolute z-10 top-0">
			<div className="max-w-4xl mx-auto px-[-6px] py-3 flex items-center justify-between">
				{/* <div className="text-lg font-semibold">Raghu Anand</div> */}

				<div className="flex items-center gap-6">
					{items.map((item) => {
						const active = isActive(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								className={
									"font-roboto transition-colors " +
									(active
										? "text-blue-600 underline underline-offset-2 font-semibold"
										: "text-gray-700 hover:text-blue-600")
								}
							>
								{item.label}
							</Link>
						);
					})}
				</div>
			</div>
		</nav>
	);
}

