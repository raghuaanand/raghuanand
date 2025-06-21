"use client";

import { useDetailModalStore } from "@/hooks/use-detail-modal-store";
import { recentTechnologies } from "@/constants";
import Image from "next/image";

const AboutOverview = () => {
  const { openModal } = useDetailModalStore();

  return (
    <section id="about" className="section bg-surface">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-4">
            <span className="text-lg font-sans font-medium text-accent mr-4 bg-accent/10 px-3 py-1 rounded-full">
              01
            </span>
            About Me
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Brief Content */}
          <div className="lg:col-span-2">
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              Hello! I&apos;m <span className="text-accent font-semibold">Raghu Anand</span>, 
              a passionate Full-Stack Software Engineer specializing in modern web technologies. 
              I craft exceptional digital experiences and solve complex problems with scalable solutions.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              {recentTechnologies.slice(0, 6).map((tech, index) => (
                <span 
                  key={index}
                  className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-md text-center"
                >
                  {tech}
                </span>
              ))}
              <span className="text-sm bg-border text-text-muted px-3 py-1 rounded-md text-center">
                +{recentTechnologies.length - 6} more
              </span>
            </div>
            
            <button 
              onClick={() => openModal('about')}
              className="btn btn-primary"
            >
              View in Detail
            </button>
          </div>
          
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <div className="relative group mx-auto max-w-xs">
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 p-1">
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <Image
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    src="/profile.jpg"
                    fill
                    alt="Raghu Anand - Full-Stack Software Engineer"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOverview;
