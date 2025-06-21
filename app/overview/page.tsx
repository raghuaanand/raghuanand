import Hero from "@/components/sections/hero";
import AboutOverview from "@/components/sections/about-overview";
import SkillsOverview from "@/components/sections/skills-overview";
import ExperienceOverview from "@/components/sections/experience-overview";
import ProjectsOverview from "@/components/sections/projects-overview";
import BlogOverview from "@/components/sections/blog-overview";
import ContactOverview from "@/components/sections/contact-overview";
import Footer from "@/components/footer";
import DetailModal from "@/components/detail-modal";

const OverviewPage = () => {
  return (
    <>
      <Hero />
      <AboutOverview />
      <SkillsOverview />
      <ExperienceOverview />
      <ProjectsOverview />
      <BlogOverview />
      <ContactOverview />
      <Footer />
      <DetailModal />
    </>
  );
};

export default OverviewPage;
