import SectionTitle from "@/components/section-title";
import { experiences, education } from "@/constants";

const Experience = () => {
  return (
    <section id="experience" className="section bg-background">
      <div className="container">
        <SectionTitle title="Experience & Education" titleNo="03" />
        
        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <h3 className="text-2xl font-serif font-semibold text-primary mb-8">
              Professional Experience
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="border-l-2 border-accent pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-accent rounded-full border-2 border-background"></div>
                  <div className="pb-6">
                    <h4 className="text-xl font-serif font-semibold text-primary">
                      {exp.title}
                    </h4>
                    <p className="text-accent font-medium mb-1">{exp.company}</p>
                    <p className="text-sm text-text-muted mb-3">{exp.period}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-text-secondary flex items-start gap-2">
                          <span className="text-accent mt-1.5 text-xs">▪</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                    {exp.technologies && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
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
                </div>
              ))}
            </div>
          </div>
          
          {/* Education */}
          <div>
            <h3 className="text-2xl font-serif font-semibold text-primary mb-8">
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="card hover:shadow-cardHover">
                  <h4 className="text-xl font-serif font-semibold text-primary">
                    {edu.degree}
                  </h4>
                  <p className="text-accent font-medium mb-1">{edu.institution}</p>
                  <p className="text-sm text-text-muted mb-3">{edu.period}</p>
                  {edu.gpa && (
                    <p className="text-text-secondary">
                      <span className="font-medium">GPA:</span> {edu.gpa}
                    </p>
                  )}
                  {edu.relevantCourses && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-text-primary mb-2">
                        Relevant Coursework:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevantCourses.map((course, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
