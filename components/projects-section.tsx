"use client";

import { featuredProjects } from "@/constants";

// Show only the most important projects
const displayProjects = featuredProjects.slice(0, 4);

export default function ProjectsSection() {
  return (
    <section>
      <h2 className="font-display text-3xl text-ink-900 mb-8">
        Projects
      </h2>

      <div className="space-y-8">
        {displayProjects.map((project, index) => (
          <article key={index}>
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
              <div className="w-32 shrink-0">
                <span className="font-mono text-sm text-ink-500">
                  {project.stack ? project.stack[0] : 'Project'}
                </span>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-medium text-ink-900 mb-2">
                  {project.title}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="ml-3 text-sm text-ink-900 hover:text-ink-600 underline underline-offset-4">
                      Live ↗
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="ml-3 text-sm text-ink-500 hover:text-ink-900 underline underline-offset-4">
                      Code
                    </a>
                  )}
                </h3>
                <p className="text-sm md:text-base text-ink-600 leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
