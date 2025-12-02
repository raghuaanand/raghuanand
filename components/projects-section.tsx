"use client";

import { featuredProjects } from "@/constants";

// Show only the most important projects
const displayProjects = featuredProjects.slice(0, 4);

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24">
      <h2 className="font-display text-2xl md:text-3xl text-ink-900 mb-8">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {displayProjects.map((project, index) => (
          <article
            key={index}
            className="group flex flex-col p-6 bg-stone-50 rounded-xl border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-ink-900 group-hover:text-accent-rust transition-colors">
                {project.title}
              </h3>
              <div className="flex gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-400 hover:text-ink-900 transition-colors"
                    aria-label="View Live"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-400 hover:text-ink-900 transition-colors"
                    aria-label="View Code"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm text-ink-600 leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            {project.stack && (
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.stack.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-white border border-stone-200 rounded text-[10px] font-medium text-ink-500 uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
