import AnimatedElement from "@/components/animated-element";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-background via-background to-surface">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <AnimatedElement
            elementType="p"
            animationProps={{
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.6, delay: 0.2 },
            }}
            className="text-lg font-medium text-accent tracking-wide"
          >
            Hello, my name is
          </AnimatedElement>
          
          <AnimatedElement
            elementType="h1"
            animationProps={{
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.6, delay: 0.4 },
            }}
            className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-primary leading-tight"
          >
            Raghu Anand
          </AnimatedElement>
          
          <AnimatedElement
            elementType="h2"
            animationProps={{
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.6, delay: 0.6 },
            }}
            className="text-xl lg:text-2xl xl:text-3xl font-serif text-text-secondary"
          >
            Full-Stack Software Engineer
          </AnimatedElement>
          
          <AnimatedElement
            elementType="p"
            animationProps={{
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.6, delay: 0.8 },
            }}
            className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            I craft exceptional digital experiences with modern web technologies, 
            specializing in React, Node.js, and full-stack development. 
            Passionate about creating scalable, user-centric applications that solve real-world problems.
          </AnimatedElement>
          
          <AnimatedElement
            elementType="div"
            animationProps={{
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.6, delay: 1.0 },
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <a 
              href="/resume.pdf" 
              download
              className="btn btn-primary text-lg px-8 py-4"
            >
              Download Resume
            </a>
            <a 
              href="#projects"
              className="btn btn-secondary text-lg px-8 py-4"
            >
              View My Work
            </a>
          </AnimatedElement>
          
          <AnimatedElement
            elementType="div"
            animationProps={{
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.6, delay: 1.2 },
            }}
            className="pt-16"
          >
            <a href="#about" className="inline-block animate-bounce" aria-label="Scroll to about section">
              <svg 
                className="w-6 h-6 text-accent" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default Hero;
