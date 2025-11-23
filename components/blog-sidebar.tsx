"use client";

import Image from "next/image";
import { socialLinks } from "@/constants";

export default function BlogSidebar() {
    return (
        <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
                {/* Author Card */}
                <div className="bg-stone-50 rounded-lg p-6 border border-stone-100">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <Image
                                src="/profile.png"
                                alt="Raghu Anand"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="font-display text-lg font-semibold text-ink-900 mb-1">
                            Raghu Anand
                        </h3>
                        <p className="text-sm text-ink-600 mb-4 leading-relaxed">
                            Software Engineer passionate about building scalable systems and digital products.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3 justify-center">
                            {socialLinks.map((link, index) => {
                                // Simple mapping for icons based on the hero section usage
                                // We'll just use text labels or simple SVGs if we had them, 
                                // but for now let's use the same logic or just text links to be safe and clean.
                                // Actually, let's just use the href and a simple icon placeholder or text.
                                // Since I don't have the Icon components imported here, I'll stick to text or simple generic icons.
                                // Let's try to use the same mapping logic as Hero but maybe just text for simplicity and "compact" look.

                                const label = link.iconName === 'FaGithub' ? 'GH' :
                                    link.iconName === 'FaLinkedin' ? 'LI' :
                                        link.iconName === 'FaWhatsapp' ? 'WA' : 'EM';

                                return (
                                    <a
                                        key={index}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-stone-200 text-xs font-medium text-ink-600 hover:border-ink-900 hover:text-ink-900 transition-colors"
                                        title={link.label || label}
                                    >
                                        {label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Newsletter or other widgets could go here */}
            </div>
        </aside>
    );
}
