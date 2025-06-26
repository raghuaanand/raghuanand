"use client";

import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import ExperienceEducation from "@/components/experience-education";
import Footer from "@/components/footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content Container */}
      <div className="max-w-2xl mx-auto px-6 py-12 lg:py-16">
        <HeroSection />
        <ExperienceEducation />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
