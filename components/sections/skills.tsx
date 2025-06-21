import SectionTitle from "@/components/section-title";
import { skillCategories } from "@/constants";
import IconRenderer from "@/components/icon-renderer";

const Skills = () => {
  return (
    <section id="skills" className="section bg-surface">
      <div className="container">
        <SectionTitle title="Technical Skills" titleNo="02" />
        
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="card hover:shadow-cardHover">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4">
                  <IconRenderer iconName={category.iconName} className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center justify-between">
                    <span className="text-text-secondary font-medium">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < skill.level
                              ? "bg-accent"
                              : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Certifications & Achievements */}
        <div className="mt-16">
          <h3 className="text-2xl font-serif font-semibold text-primary text-center mb-8">
            Certifications & Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "AWS Cloud Practitioner",
              "React Professional Developer",
              "Node.js Application Developer",
              "MongoDB Associate Developer",
              "Git Version Control Expert",
              "Agile Development Practitioner"
            ].map((cert, index) => (
              <div key={index} className="text-center p-4 border border-border rounded-lg hover:border-accent transition-colors">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-text-secondary">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
