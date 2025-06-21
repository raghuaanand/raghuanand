"use client";

import { useDetailModalStore } from "@/hooks/use-detail-modal-store";
import { socialLinks } from "@/constants";
import IconRenderer from "@/components/icon-renderer";

const ContactOverview = () => {
  const { openModal } = useDetailModalStore();

  return (
    <section id="contact" className="section bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-4">
            <span className="text-lg font-sans font-medium text-accent mr-4 bg-accent/10 px-3 py-1 rounded-full">
              06
            </span>
            Get In Touch
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            I&#39;m currently open to new opportunities and exciting projects. 
            Let&#39;s work together to create something amazing!
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Quick Contact */}
            <div className="card text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif font-semibold text-primary mb-2">Email Me</h3>
              <a href="mailto:raghuaanand@gmail.com" className="text-accent hover:text-primary transition-colors">
                raghuaanand@gmail.com
              </a>
            </div>
            
            {/* Social Connect */}
            <div className="card text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif font-semibold text-primary mb-4">Connect</h3>
              <div className="flex justify-center space-x-3">
                {socialLinks.slice(0, 3).map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300"
                    aria-label={`Visit ${social.label} profile`}
                  >
                    <IconRenderer iconName={social.iconName} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <button 
              onClick={() => openModal('contact')}
              className="btn btn-primary"
            >
              View Contact Form & Details
            </button>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="/resume.pdf" 
                download
                className="btn btn-secondary"
              >
                Download Resume
              </a>
              <a 
                href="https://calendly.com/raghuanand" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactOverview;
