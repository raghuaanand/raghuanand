"use client";

import { experiences, education } from "@/constants";
import ProjectsSection from "./projects-section";

export default function ExperienceEducation() {
    return (
        <div className="space-y-16">
            
             {/* Technologies */}
            <section>
                <h2 className="text-2xl font-roboto font-bold text-gray-900 mb-8 homepage-section-title">Technologies</h2>

                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <p className="font-roboto font-semibold text-gray-900 min-w-[130px]">Frontend</p>
                        <p className="font-roboto text-gray-600 homepage-content flex-1">
                            React.js, Next.js, TypeScript, Tailwind CSS, JavaScript (ES6+)
                        </p>
                    </div>

                    <div className="flex items-start gap-4">
                        <p className="font-roboto font-semibold text-gray-900 min-w-[130px]">Backend</p>
                        <p className="font-roboto text-gray-600 homepage-content flex-1">
                            Node.js, Express.js, MongoDB, PostgreSQL, Serverless Backend
                        </p>
                    </div>

                    <div className="flex items-start gap-4">
                        <p className="font-roboto font-semibold text-gray-900 min-w-[130px]">Tools & DevOps</p>
                        <p className="font-roboto text-gray-600 homepage-content flex-1">
                            Git/GitHub, Docker, AWS, Vercel, CI/CD, WebRTC, Prisma, Redis, Linux
                        </p>
                    </div>
                </div>
            </section>

            {/* Work Experience */}
            <section>
                <h2 className="text-2xl font-roboto font-bold text-gray-900 mb-8 homepage-section-title">Work Experience</h2>

                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-roboto font-semibold text-gray-900">
                                        {exp.title}
                                    </h3>
                                    <p className="text-blue-600 font-roboto font-medium">
                                        {exp.company}
                                    </p>
                                </div>
                                <p className="text-sm font-roboto text-gray-500 text-right homepage-content">
                                    {exp.period}
                                </p>
                            </div>

                            <div className="space-y-1">
                                {exp.achievements.slice(0, 3).map((achievement, achIndex) => (
                                    <p key={achIndex} className="text-gray-600 font-roboto homepage-content">
                                        • {achievement}
                                    </p>
                                ))}
                            </div>

                            {exp.technologies && (
                                <p className="text-sm font-roboto text-gray-500 homepage-content">
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
                <h2 className="text-2xl font-roboto font-bold text-gray-900 mb-8 homepage-section-title">Education</h2>

                <div className="space-y-6">
                    {/* BTech */}
                    <div className="space-y-1">
                        <h3 className="text-lg font-roboto font-semibold text-gray-900">
                            {education[0]?.degree || "Bachelor of Engineering in Computer Science"}
                        </h3>
                        <p className="text-blue-600 font-roboto font-medium">
                            {education[0]?.institution || "Chandigarh University"}
                        </p>
                        <p className="text-sm font-roboto text-gray-500 homepage-content">
                            {education[0]?.period || "2021 - 2025"}
                        </p>
                        {/* {education[0]?.gpa && (
                            <p className="text-sm text-gray-500">
                                GPA: {education[0].gpa}
                            </p>
                        )} */}
                    </div>

                    {/* 12th Grade */}
                    <div className="space-y-1">
                        <h3 className="text-lg font-roboto font-semibold text-gray-900">
                            Higher Secondary (12th)
                        </h3>
                        <p className="text-blue-600 font-roboto font-medium">
                            K C Mount Fort Public School
                        </p>
                        <p className="text-sm font-roboto text-gray-500 homepage-content">
                            2018 - 2020 • Science Stream (PCM) • CBSE
                        </p>
                        {/* <p className="text-sm text-gray-500">
                                Percentage: 70.60%
                        </p> */}
                    </div>

                    {/* 10th Grade */}
                    <div className="space-y-1">
                        <h3 className="text-lg font-roboto font-semibold text-gray-900">
                            Secondary School (10th)
                        </h3>
                        <p className="text-blue-600 font-roboto font-medium">
                            Sri Ramakrishna Vidyashala (SRKVS)
                        </p>
                        <p className="text-sm font-roboto text-gray-500 homepage-content">
                            2016 - 2018 • KSEEB
                        </p>
                        {/* <p className="text-sm text-gray-500">
                                Percentage: 98.08%
                        </p> */}
                    </div>
                </div>
            </section>

        </div>
    );
}
