"use client";

import { featuredProjects } from "@/constants";

// Show only the most important projects
const displayProjects = featuredProjects.slice(0, 4);

export default function ProjectsSection() {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Projects</h2>
      
      <div className="space-y-8">
        {displayProjects.map((project, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {project.title}
              </h3>
              <div className="flex gap-3 text-sm">
                {project.live && (
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
                  >
                    live
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
                  >
                    code
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              {project.description}
            </p>
            
            {project.stack && (
              <p className="text-sm text-gray-500">
                {project.stack.join(" • ")}
              </p>
            )}
          </div>
        ))}
        
        <div className="pt-4">
          <a 
            href="https://github.com/raghuaanand"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
          >
            View more projects on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
