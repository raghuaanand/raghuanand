"use client";

import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import ExperienceEducation from "@/components/experience-education";
import Footer from "@/components/footer";
import RecentBlogs from "@/components/recent-blogs";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white homepage-container">
      {/* Main Content Container */}
      <div className="md:max-w-5xl max-w-2xl mx-auto px-6 py-4 lg:py-4">

        <HeroSection />
        <ExperienceEducation />
        <RecentBlogs />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;



