"use client";

import { experiences, education } from "@/constants";
import ProjectsSection from "./projects-section";

export default function ExperienceEducation() {
    return (
        <div className="space-y-16">

            {/* Technologies */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Technologies</h2>

                <div className="space-y-4">
                    <div>
                        <p className="font-medium text-gray-900 mb-2">Frontend</p>
                        <p className="text-gray-600">
                            React.js • Next.js • TypeScript • Tailwind CSS • JavaScript (ES6+)
                        </p>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900 mb-2">Backend</p>
                        <p className="text-gray-600">
                            Node.js • Express.js • MongoDB • PostgreSQL • Serverless Backend
                        </p>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900 mb-2">Tools & DevOps</p>
                        <p className="text-gray-600">
                            Git/GitHub • Docker • AWS • Vercel • CI/CD • WebRTC • Prisma • Redis • Linux
                        </p>
                    </div>
                </div>
            </section>
            {/* Work Experience */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Work Experience</h2>

                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {exp.title}
                                    </h3>
                                    <p className="text-blue-600 font-medium">
                                        {exp.company}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500 text-right">
                                    {exp.period}
                                </p>
                            </div>

                            <div className="space-y-1">
                                {exp.achievements.slice(0, 3).map((achievement, achIndex) => (
                                    <p key={achIndex} className="text-gray-600 leading-relaxed">
                                        • {achievement}
                                    </p>
                                ))}
                            </div>

                            {exp.technologies && (
                                <p className="text-sm text-gray-500">
                                    {exp.technologies.join(" • ")}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <ProjectsSection />
            </section>

            {/* Education */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Education</h2>

                <div className="space-y-6">
                    {/* BTech */}
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {education[0]?.degree || "Bachelor of Engineering in Computer Science"}
                        </h3>
                        <p className="text-blue-600 font-medium">
                            {education[0]?.institution || "Chandigarh University"}
                        </p>
                        <p className="text-sm text-gray-500">
                            {education[0]?.period || "2021 - 2025"}
                        </p>
                        {education[0]?.gpa && (
                            <p className="text-sm text-gray-500">
                                GPA: {education[0].gpa}
                            </p>
                        )}
                    </div>

                    {/* 12th Grade */}
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Higher Secondary (12th)
                        </h3>
                        <p className="text-blue-600 font-medium">
                            K C Mount Fort Public School
                        </p>
                        <p className="text-sm text-gray-500">
                            2018 - 2020 • Science Stream (PCM) • CBSE
                        </p>
                        <p className="text-sm text-gray-500">
                                Percentage: 70.60%
                        </p>
                    </div>

                    {/* 10th Grade */}
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Secondary School (10th)
                        </h3>
                        <p className="text-blue-600 font-medium">
                            Sri Ramakrishna Vidyashala (SRKVS)
                        </p>
                        <p className="text-sm text-gray-500">
                            2016 - 2018 • KSEEB
                        </p>
                        <p className="text-sm text-gray-500">
                                Percentage: 98.08%
                        </p>
                    </div>
                </div>
            </section>


        </div>
    );
}
