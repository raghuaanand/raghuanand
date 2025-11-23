"use client";

import { experiences, education } from "@/constants";
import ProjectsSection from "./projects-section";

export default function ExperienceEducation() {
    return (
        <div className="space-y-20 md:space-y-24">
            {/* Technologies */}
            <section>
                <h2 className="font-display text-3xl text-ink-900 mb-8">
                    Technologies
                </h2>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    <div>
                        <h3 className="text-base font-semibold text-ink-900 mb-3">Frontend</h3>
                        <p className="text-sm md:text-base text-ink-600 leading-relaxed">
                            React.js, Next.js, TypeScript, Tailwind CSS, JavaScript (ES6+)
                        </p>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-ink-900 mb-3">Backend</h3>
                        <p className="text-sm md:text-base text-ink-600 leading-relaxed">
                            Node.js, Express.js, MongoDB, PostgreSQL, Serverless
                        </p>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-ink-900 mb-3">DevOps & Tools</h3>
                        <p className="text-sm md:text-base text-ink-600 leading-relaxed">
                            Git, Docker, AWS, Vercel, CI/CD, Prisma, Redis, Linux
                        </p>
                    </div>
                </div>
            </section>

            {/* Work Experience */}
            <section>
                <h2 className="font-display text-3xl text-ink-900 mb-8">
                    Experience
                </h2>

                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <article key={index} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                            <div className="w-32 shrink-0">
                                <span className="font-mono text-sm text-ink-500">
                                    {exp.period}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-base md:text-lg font-medium text-ink-900 mb-2">
                                    {exp.title} <span className="text-ink-500">at</span> {exp.company}
                                </h3>
                                <p className="text-sm md:text-base text-ink-600 leading-relaxed max-w-2xl">
                                    {exp.achievements[0]}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <ProjectsSection />

            {/* Education */}
            <section>
                <h2 className="font-display text-3xl text-ink-900 mb-8">
                    Education
                </h2>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {education.map((edu, index) => (
                        <div key={index}>
                            <div className="font-mono text-sm text-ink-500 mb-2">
                                {edu.period}
                            </div>
                            <h3 className="text-base md:text-lg font-medium text-ink-900 mb-1">
                                {edu.institution}
                            </h3>
                            <p className="text-sm md:text-base text-ink-600">
                                {edu.degree}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
