"use client";

import { useIsScrolled } from "@/hooks/use-is-Scrolled";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import Drawer from "./drawer";

const Navbar = () => {
  const scrolled = useIsScrolled();
  const [isOpen, setisOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setisOpen(false);
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  };

  const onClose = useCallback(() => {
    setisOpen(false);
  }, []);

  return (
    <nav
      className={cn(
        "w-full sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300",
        scrolled && "shadow-card"
      )}
    >
      <div className="container h-full mx-auto py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={"/"}
            className="text-2xl font-serif font-bold text-primary hover:text-accent transition-colors"
          >
            Raghu Anand
          </Link>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex text-sm gap-8">
            <Link href={"#about"} className="nav-link" onClick={handleScroll}>
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.1 }}
                className="flex items-center gap-1"
              >
                <span className="text-accent font-mono text-xs">01.</span>
                About
              </motion.li>
            </Link>
            
            <Link href={"#skills"} className="nav-link" onClick={handleScroll}>
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.15 }}
                className="flex items-center gap-1"
              >
                <span className="text-accent font-mono text-xs">02.</span>
                Skills
              </motion.li>
            </Link>
            
            <Link href={"#experience"} className="nav-link" onClick={handleScroll}>
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.2 }}
                className="flex items-center gap-1"
              >
                <span className="text-accent font-mono text-xs">03.</span>
                Experience
              </motion.li>
            </Link>
            
            <Link href={"#projects"} className="nav-link" onClick={handleScroll}>
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.25 }}
                className="flex items-center gap-1"
              >
                <span className="text-accent font-mono text-xs">04.</span>
                Projects
              </motion.li>
            </Link>
            
            <Link href={"#blog"} className="nav-link" onClick={handleScroll}>
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.3 }}
                className="flex items-center gap-1"
              >
                <span className="text-accent font-mono text-xs">05.</span>
                Blog
              </motion.li>
            </Link>
            
            <Link href={"#contact"} className="nav-link" onClick={handleScroll}>
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.35 }}
                className="flex items-center gap-1"
              >
                <span className="text-accent font-mono text-xs">06.</span>
                Contact
              </motion.li>
            </Link>
          </ul>
          
          <a href="/resume.pdf" download>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="btn btn-secondary"
            >
              Resume
            </motion.button>
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <div
          className="w-6 h-5 flex flex-col justify-between items-center lg:hidden cursor-pointer group"
          onClick={() => setisOpen((prev) => !prev)}
          role="button"
          aria-label="Toggle mobile menu"
        >
          <span className="w-full h-[2px] bg-primary inline-flex transform group-hover:translate-x-1 transition-all ease-in-out duration-300" />
          <span className="w-full h-[2px] bg-primary inline-flex transform translate-x-2 group-hover:translate-x-0 transition-all ease-in-out duration-300" />
          <span className="w-full h-[2px] bg-primary inline-flex transform translate-x-1 group-hover:translate-x-2 transition-all ease-in-out duration-300" />
        </div>
        <Drawer onClose={onClose} isOpen={isOpen} handleScroll={handleScroll} />
      </div>
    </nav>
  );
};

export default Navbar;
