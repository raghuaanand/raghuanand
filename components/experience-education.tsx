"use client";

import { experiences, education } from "@/constants";
import ProjectsSection from "./projects-section";

export default function ExperienceEducation() {
    return (
        <div className="space-y-20 md:space-y-24">
            {/* Technologies */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-ink-900 mb-8">
                    Technologies
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-stone-50 rounded-xl border border-stone-100 hover:border-stone-200 transition-colors">
                        <h3 className="text-base font-semibold text-ink-900 mb-4">Frontend</h3>
                        <div className="flex flex-wrap gap-2">
                            {["React.js", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)"].map((tech) => (
                                <span key={tech} className="px-2.5 py-1 bg-white border border-stone-200 rounded-md text-xs font-medium text-ink-600">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="p-6 bg-stone-50 rounded-xl border border-stone-100 hover:border-stone-200 transition-colors">
                        <h3 className="text-base font-semibold text-ink-900 mb-4">Backend</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Serverless"].map((tech) => (
                                <span key={tech} className="px-2.5 py-1 bg-white border border-stone-200 rounded-md text-xs font-medium text-ink-600">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="p-6 bg-stone-50 rounded-xl border border-stone-100 hover:border-stone-200 transition-colors">
                        <h3 className="text-base font-semibold text-ink-900 mb-4">DevOps & Tools</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Git", "Docker", "AWS", "Vercel", "CI/CD", "Prisma", "Redis", "Linux"].map((tech) => (
                                <span key={tech} className="px-2.5 py-1 bg-white border border-stone-200 rounded-md text-xs font-medium text-ink-600">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Work Experience */}
            <section id="experience" className="scroll-mt-24">
                <h2 className="font-display text-2xl md:text-3xl text-ink-900 mb-8">
                    Experience
                </h2>

                <div className="relative border-l border-stone-200 ml-3 md:ml-4 space-y-12 pb-4">
                    {experiences.map((exp, index) => (
                        <article key={index} className="relative pl-8 md:pl-12">
                            {/* Timeline dot */}
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-stone-300 ring-4 ring-white" />

                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                <h3 className="text-lg font-semibold text-ink-900">
                                    {exp.title} <span className="font-normal text-ink-500">at</span> {exp.company}
                                </h3>
                                <span className="font-mono text-xs text-ink-500 bg-stone-100 px-2 py-1 rounded mt-1 sm:mt-0 w-fit">
                                    {exp.period}
                                </span>
                            </div>

                            <p className="text-sm md:text-base text-ink-600 leading-relaxed max-w-3xl">
                                {exp.achievements[0]}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <ProjectsSection />

            {/* Education */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-ink-900 mb-8">
                    Education
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {education.map((edu, index) => (
                        <div key={index} className="p-6 bg-stone-50 rounded-xl border border-stone-100">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-base font-semibold text-ink-900">
                                    {edu.institution}
                                </h3>
                                <span className="font-mono text-xs text-ink-500 bg-white px-2 py-1 rounded border border-stone-200">
                                    {edu.period}
                                </span>
                            </div>
                            <p className="text-sm text-ink-600">
                                {edu.degree}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
