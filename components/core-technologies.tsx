"use client";

import { motion } from "framer-motion";

export default function CoreTechnologies() {
  return (
    <section className="py-3 lg:py-4 xl:py-5 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-gray-50">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-lg lg:text-xl xl:text-2xl font-serif font-bold text-gray-900 mb-3 lg:mb-4">Core Technologies</h3>
          
          {/* Frontend */}
          <div className="mb-2 lg:mb-3 flex flex-wrap items-center justify-center gap-2 lg:gap-3">
            <h4 className="text-sm lg:text-base font-semibold text-gray-800 min-w-fit">Frontend:</h4>
            <div className="flex flex-wrap justify-center gap-1.5 lg:gap-2">
              {["React.js", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)"].map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 lg:px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs lg:text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="mb-2 lg:mb-3 flex flex-wrap items-center justify-center gap-2 lg:gap-3">
            <h4 className="text-sm lg:text-base font-semibold text-gray-800 min-w-fit">Backend:</h4>
            <div className="flex flex-wrap justify-center gap-1.5 lg:gap-2">
              {["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Serverless Backend"].map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 lg:px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs lg:text-sm font-medium border border-green-200 hover:bg-green-100 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tools & DevOps */}
          <div className="mb-0 flex flex-wrap items-center justify-center gap-2 lg:gap-3">
            <h4 className="text-sm lg:text-base font-semibold text-gray-800 min-w-fit">Tools:</h4>
            <div className="flex flex-wrap justify-center gap-1.5 lg:gap-2">
              {["Git/GitHub", "Docker", "AWS", "Vercel", "CI/CD", "WebRTC", "Prisma", "Redis", "Linux"].map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 lg:px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs lg:text-sm font-medium border border-purple-200 hover:bg-purple-100 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
