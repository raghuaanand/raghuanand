"use client";

import HeroSection from "@/components/hero-section";
import ExperienceEducation from "@/components/experience-education";
import Footer from "@/components/footer";
import RecentBlogs from "@/components/recent-blogs";

const HomePage = () => {
  return (
    <div className="min-h-screen min-w-screen bg-background text-ink-900">
      <div className="content-container py-8 md:py-12">
        <HeroSection />
        <div className="mt-16 md:mt-24">
          <ExperienceEducation />
        </div>
        <div className="mt-16 md:mt-24">
          <RecentBlogs />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;



