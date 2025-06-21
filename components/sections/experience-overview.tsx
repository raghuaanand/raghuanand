"use client";

import { useDetailModalStore } from "@/hooks/use-detail-modal-store";
import { experiences, education } from "@/constants";

const ExperienceOverview = () => {
  const { openModal } = useDetailModalStore();

  return (
    <section id="experience" className="section bg-surface">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-4">
            <span className="text-lg font-sans font-medium text-accent mr-4 bg-accent/10 px-3 py-1 rounded-full">
              03
            </span>
            Experience & Education
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Latest Experience */}
          <div className="card">
            <h3 className="text-xl font-serif font-semibold text-primary mb-4">
              Latest Experience
            </h3>
            {experiences.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-primary">
                  {experiences[0].title}
                </h4>
                <p className="text-accent font-medium mb-2">{experiences[0].company}</p>
                <p className="text-sm text-text-muted mb-3">{experiences[0].period}</p>
                <p className="text-text-secondary">
                  {experiences[0].achievements[0]}
                </p>
                {experiences[0].technologies && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {experiences[0].technologies.slice(0, 4).map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Education */}
          <div className="card">
            <h3 className="text-xl font-serif font-semibold text-primary mb-4">
              Education
            </h3>
            {education.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-primary">
                  {education[0].degree}
                </h4>
                <p className="text-accent font-medium mb-2">{education[0].institution}</p>
                <p className="text-sm text-text-muted mb-3">{education[0].period}</p>
                {education[0].gpa && (
                  <p className="text-text-secondary">
                    <span className="font-medium">GPA:</span> {education[0].gpa}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => openModal('experience')}
            className="btn btn-primary"
          >
            View Complete Timeline
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceOverview;
