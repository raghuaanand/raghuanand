"use client";

import { socialLinks } from "@/constants";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const iconMap = {
  FaGithub,
  FaLinkedin, 
  FaWhatsapp,
  MdEmail
};

export default function HeroSection() {
  return (
    <section className="mb-16">
      {/* Name and Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-roboto font-bold text-gray-900 mb-2 homepage-title">
          Raghu Anand
        </h1>
        <p className="text-xl font-roboto text-gray-600 mb-4 homepage-content">
          Full-Stack Software Engineer
        </p>
        <p className="text-base font-roboto text-gray-500 mb-6 homepage-content">
          📍 India
        </p>
        
        {/* Bio */}
        <p className="text-gray-700 max-w-5xl font-roboto homepage-content mb-6">
          I build scalable web applications using React, Node.js, and modern technologies. 
          Passionate about creating solutions that solve real-world problems.
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-4 text-sm">
          <a 
            href="/resume.pdf" 
            download
            className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-roboto"
          >
            resume
          </a>
          {socialLinks.map((link, index) => {
            const label = link.iconName === 'FaGithub' ? 'github' : 
                         link.iconName === 'FaLinkedin' ? 'linkedin' :
                         link.iconName === 'FaWhatsapp' ? 'whatsapp' : 'email';
            
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-roboto"
              >
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
