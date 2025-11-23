"use client";

import Image from "next/image";
import { socialLinks } from "@/constants";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-12 md:gap-16 items-start">
        {/* Left: Text Content */}
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-ink-900 mb-4 leading-tight">
            Hey, I am Raghu
          </h1>

          <h3 className="text-xl md:text-2xl text-red-600 font-light mb-8">
            curious, tinkerer, and explorer
          </h3>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-base md:text-lg leading-relaxed text-ink-700 mb-4">
              I am a <strong>Software Engineer</strong> and an engineering enthusiast passionate about building scalable systems and digital products.
              I write about system design, databases, and engineering best practices.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-ink-700 mb-4">
              I keep diving deep into engineering details and share my learnings through my blog posts and projects.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="https://drive.google.com/file/d/1quB_NdMtzwbHP3ALuFQj2AwvcRZt7Cb0/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-400 transition-colors underline underline-offset-4"
            >
              Resume
            </a>
            {socialLinks.map((link, index) => {
              const label = link.iconName === 'FaGithub' ? 'GitHub' :
                link.iconName === 'FaLinkedin' ? 'LinkedIn' :
                  link.iconName === 'FaWhatsapp' ? 'WhatsApp' : 'Email';

              return (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-400 transition-colors underline underline-offset-4"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right: Profile Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-ink-200">
            <Image
              src="/profile.png"
              alt="Raghu Anand"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
