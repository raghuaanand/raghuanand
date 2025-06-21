"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { MdOutlineClose } from "react-icons/md";
import { motion } from "framer-motion";
import { socialLinks } from "@/constants";
import IconRenderer from "@/components/icon-renderer";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleScroll: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const Drawer = ({ isOpen, onClose, handleScroll }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-[75vw] max-w-sm">
                  <div className="flex h-full flex-col overflow-y-auto bg-surface py-6 shadow-xl border-l border-border">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-serif font-semibold text-primary">Menu</h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            onClick={onClose}
                            className="text-2xl text-text-secondary hover:text-accent transition-colors p-1"
                            aria-label="Close menu"
                          >
                            <MdOutlineClose />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-8 mt-8 px-6">
                      <ul className="flex flex-col text-base gap-6 w-full">
                        <Link className="nav-link" href="#about" onClick={handleScroll}>
                          <motion.li
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className="border-b border-border pb-3"
                          >
                            <span className="text-accent font-mono text-sm">01.</span>
                            <span className="ml-3 text-text-primary">About</span>
                          </motion.li>
                        </Link>
                        
                        <Link className="nav-link" href="#skills" onClick={handleScroll}>
                          <motion.li
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                            className="border-b border-border pb-3"
                          >
                            <span className="text-accent font-mono text-sm">02.</span>
                            <span className="ml-3 text-text-primary">Skills</span>
                          </motion.li>
                        </Link>
                        
                        <Link className="nav-link" href="#experience" onClick={handleScroll}>
                          <motion.li
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.3 }}
                            className="border-b border-border pb-3"
                          >
                            <span className="text-accent font-mono text-sm">03.</span>
                            <span className="ml-3 text-text-primary">Experience</span>
                          </motion.li>
                        </Link>
                        
                        <Link className="nav-link" href="#projects" onClick={handleScroll}>
                          <motion.li
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.4 }}
                            className="border-b border-border pb-3"
                          >
                            <span className="text-accent font-mono text-sm">04.</span>
                            <span className="ml-3 text-text-primary">Projects</span>
                          </motion.li>
                        </Link>
                        
                        <Link className="nav-link" href="#blog" onClick={handleScroll}>
                          <motion.li
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.5 }}
                            className="border-b border-border pb-3"
                          >
                            <span className="text-accent font-mono text-sm">05.</span>
                            <span className="ml-3 text-text-primary">Blog</span>
                          </motion.li>
                        </Link>
                        
                        <Link className="nav-link" href="#contact" onClick={handleScroll}>
                          <motion.li
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.6 }}
                            className="border-b border-border pb-3"
                          >
                            <span className="text-accent font-mono text-sm">06.</span>
                            <span className="ml-3 text-text-primary">Contact</span>
                          </motion.li>
                        </Link>
                      </ul>
                      
                      <Link href="/resume.pdf" target="_blank">
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                          className="btn btn-primary w-full"
                        >
                          Download Resume
                        </motion.button>
                      </Link>
                      
                      <div className="flex gap-4 pt-4">
                        {socialLinks.map((item, index) => (
                          <motion.a
                            key={item.href}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-accent/10 border border-accent text-accent rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
                            aria-label={`Visit ${item.label} profile`}
                          >
                            <IconRenderer iconName={item.iconName} className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;
