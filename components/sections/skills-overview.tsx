"use client";

import { useDetailModalStore } from "@/hooks/use-detail-modal-store";
import { skillCategories } from "@/constants";
import IconRenderer from "@/components/icon-renderer";

const SkillsOverview = () => {
  const { openModal } = useDetailModalStore();

  return (
    <section id="skills" className="section bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-4">
            <span className="text-lg font-sans font-medium text-accent mr-4 bg-accent/10 px-3 py-1 rounded-full">
              02
            </span>
            Technical Skills
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="card text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4">
                <IconRenderer iconName={category.iconName} className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-primary mb-3">
                {category.title}
              </h3>
              <div className="space-y-1">
                {category.skills.slice(0, 3).map((skill, skillIndex) => (
                  <div key={skillIndex} className="text-sm text-text-secondary">
                    {skill.name}
                  </div>
                ))}
                {category.skills.length > 3 && (
                  <div className="text-xs text-text-muted">
                    +{category.skills.length - 3} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => openModal('skills')}
            className="btn btn-primary"
          >
            View All Skills & Certifications
          </button>
        </div>
      </div>
    </section>
  );
};

export default SkillsOverview;
