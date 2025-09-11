"use client";

import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import ExperienceEducation from "@/components/experience-education";
import Footer from "@/components/footer";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white homepage-container">
      {/* Main Content Container */}
      <div className="md:max-w-5xl max-w-2xl mx-auto px-6 py-4 lg:py-4">
        {/* Minimal link to Blogs */}
        <div className="flex justify-end mb-6">
          <Link
            href="/blogs"
            className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-roboto"
          >
            blogs
          </Link>
        </div>

        <HeroSection />
        <ExperienceEducation />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;



