import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Blog from "@/components/sections/blog";
import Contact from "@/components/sections/contact";
import Footer from "@/components/footer";
import ProjectModal from "@/components/project-modal";

const DetailedPage = () => {
  return (
    <>
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-4">
              Detailed Portfolio View
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Comprehensive view of my experience, skills, projects, and professional journey.
            </p>
          </div>
        </div>
      </div>
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
      <ProjectModal />
    </>
  );
};

export default DetailedPage;
