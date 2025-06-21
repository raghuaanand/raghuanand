"use client";

import { useDetailModalStore } from "@/hooks/use-detail-modal-store";
import { featuredProjects } from "@/constants";
import Image from "next/image";

const ProjectsOverview = () => {
  const { openModal } = useDetailModalStore();

  return (
    <section id="projects" className="section bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-4">
            <span className="text-lg font-sans font-medium text-accent mr-4 bg-accent/10 px-3 py-1 rounded-full">
              04
            </span>
            Featured Projects
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <div key={index} className="card hover:shadow-cardHover group">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                {project.title}
              </h3>
              
              <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex gap-3">
                {project.live && (
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm flex-1"
                  >
                    Live Demo
                  </a>
                )}
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm flex-1"
                >
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => openModal('projects')}
            className="btn btn-primary"
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsOverview;
