import SectionTitle from "@/components/section-title";
import { socialLinks } from "@/constants";
import IconRenderer from "@/components/icon-renderer";

const Contact = () => {
  return (
    <section id="contact" className="section bg-surface">
      <div className="container">
        <SectionTitle title="Get In Touch" titleNo="06" />
        
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
              Let&#39;s Work Together
            </h3>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              I&#39;m currently open to new opportunities and exciting projects. 
              Whether you&#39;re looking to hire a full-stack developer, collaborate on a project, 
              or just want to connect, I&#39;d love to hear from you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card">
              <h4 className="text-xl font-serif font-semibold text-primary mb-6">
                Send a Message
              </h4>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                    placeholder="Let's discuss a project"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none"
                    placeholder="Tell me about your project or how I can help..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn btn-primary"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h4 className="text-xl font-serif font-semibold text-primary mb-6">
                Contact Information
              </h4>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-text-primary">Email</h5>
                    <a href="mailto:raghuaanand@gmail.com" className="text-accent hover:text-primary transition-colors">
                      raghuaanand@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-text-primary">Location</h5>
                    <p className="text-text-secondary">India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-text-primary">Response Time</h5>
                    <p className="text-text-secondary">Within 24 hours</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-text-primary mb-4">Follow Me</h5>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300"
                      aria-label={`Visit Raghu Anand's ${social.label} profile`}
                    >
                      <IconRenderer iconName={social.iconName} className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-8 pt-8 border-t border-border">
                <h5 className="font-semibold text-text-primary mb-4">Quick Actions</h5>
                <div className="space-y-3">
                  <a 
                    href="/resume.pdf" 
                    download
                    className="btn btn-secondary w-full"
                  >
                    Download Resume
                  </a>
                  <a 
                    href="https://calendly.com/raghuanand" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full"
                  >
                    Schedule a Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

