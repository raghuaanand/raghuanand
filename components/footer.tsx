import { socialLinks } from "@/constants";
import IconRenderer from "@/components/icon-renderer";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-semibold mb-4">Raghu Anand</h3>
            <p className="text-white/80 leading-relaxed">
              Full-Stack Software Engineer passionate about creating exceptional 
              digital experiences with modern web technologies.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="/resume.pdf" 
                  download
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Connect</h4>
            <div className="space-y-3 mb-6">
              <p className="text-white/80">
                <a href="mailto:raghuaanand@gmail.com" className="hover:text-white transition-colors">
                  raghuaanand@gmail.com
                </a>
              </p>
              <p className="text-white/80">Based in India</p>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors duration-300 text-xl"
                  aria-label={`Visit Raghu Anand's ${social.label} profile`}
                >
                  <IconRenderer iconName={social.iconName} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/60">
            © {currentYear} Raghu Anand. All rights reserved. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
