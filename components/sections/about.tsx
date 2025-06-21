import SectionTitle from "@/components/section-title";
import { recentTechnologies } from "@/constants";
import Image from "next/image";
import { AiFillThunderbolt } from "react-icons/ai";

const About = () => {
  return (
    <section id="about" className="section bg-surface">
      <div className="container">
        <SectionTitle title="About Me" titleNo="01" />
        
        <div className="mt-16 grid lg:grid-cols-3 gap-12 items-start">
          {/* Text Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-text-secondary leading-relaxed">
                Hello! My name is <span className="text-accent font-semibold">Raghu Anand</span>, 
                and during my second year of college, I discovered my passion for web development. 
                What started as curiosity quickly evolved into a deep commitment to crafting 
                exceptional digital experiences.
              </p>
              
              <p className="text-text-secondary leading-relaxed">
                Today, I&apos;m a <span className="text-accent font-semibold">Full-Stack Software Engineer</span> 
                specializing in building scalable web applications. I thrive on solving complex problems 
                and creating intuitive user interfaces backed by robust server-side architecture.
              </p>
              
              <p className="text-text-secondary leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-serif font-semibold text-primary mb-6">
                Technologies I work with:
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {recentTechnologies.map((technology, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <AiFillThunderbolt className="text-accent text-sm group-hover:scale-110 transition-transform" />
                    <span className="text-text-secondary font-medium text-sm">
                      {technology}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 p-1">
                <div className="relative h-80 w-full overflow-hidden rounded-lg">
                  <Image
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    src="/profile.jpg"
                    fill
                    priority
                    alt="Raghu Anand - Full-Stack Software Engineer"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              </div>
              
              {/* Decorative border */}
              <div className="absolute inset-0 border-2 border-accent rounded-lg transform translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
