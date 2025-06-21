"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, lazy, Suspense, useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDetailModalStore, type ModalType } from "@/hooks/use-detail-modal-store";

// Lazy load modal content components for better performance
const About = lazy(() => import("@/components/sections/about"));
const Skills = lazy(() => import("@/components/sections/skills"));
const Experience = lazy(() => import("@/components/sections/experience"));
const Projects = lazy(() => import("@/components/sections/projects"));
const Blog = lazy(() => import("@/components/sections/blog"));
const Contact = lazy(() => import("@/components/sections/contact"));

// Loading component for suspense
const ModalLoading = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
    <p className="text-text-secondary text-sm">Loading content...</p>
  </div>
);

// Error boundary component
const ModalError = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6">
    <div className="text-red-500 mb-4">
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.696-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-primary mb-2">Something went wrong</h3>
    <p className="text-text-secondary text-center mb-4">
      We couldn&apos;t load this content. Please try again.
    </p>
    <button 
      onClick={retry}
      className="btn btn-primary text-sm"
    >
      Try Again
    </button>
  </div>
);

const DetailModal = () => {
  const { isOpen, modalType, closeModal, saveScrollPosition, getScrollPosition } = useDetailModalStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll progress
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  };

  // Add keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeModal]);

  // Restore scroll position when modal opens
  useEffect(() => {
    if (isOpen && modalType && scrollContainerRef.current) {
      const savedPosition = getScrollPosition(modalType);
      scrollContainerRef.current.scrollTop = savedPosition;
    }
  }, [isOpen, modalType, getScrollPosition]);

  // Save scroll position when closing modal
  const handleCloseModal = () => {
    if (modalType && scrollContainerRef.current) {
      saveScrollPosition(modalType, scrollContainerRef.current.scrollTop);
    }
    closeModal();
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'about':
        return <About />;
      case 'skills':
        return <Skills />;
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'about':
        return 'About Me';
      case 'skills':
        return 'Technical Skills';
      case 'experience':
        return 'Experience & Education';
      case 'projects':
        return 'Featured Projects';
      case 'blog':
        return 'Recent Writing';
      case 'contact':
        return 'Get In Touch';
      default:
        return '';
    }
  };

  const getModalDescription = () => {
    switch (modalType) {
      case 'about':
        return 'Learn more about my background and journey';
      case 'skills':
        return 'Explore my technical expertise and tools';
      case 'experience':
        return 'My professional experience and education';
      case 'projects':
        return 'Featured projects and case studies';
      case 'blog':
        return 'Latest articles and insights';
      case 'contact':
        return 'Let&apos;s connect and collaborate';
      default:
        return '';
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-0 flex items-center justify-center p-2 sm:p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="pointer-events-auto relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden rounded-lg sm:rounded-xl bg-surface shadow-elevated">
                  {/* Modal Header */}
                  <div className="sticky top-0 z-10 bg-surface border-b border-border px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Dialog.Title className="text-xl sm:text-2xl font-serif font-bold text-primary">
                          {getModalTitle()}
                        </Dialog.Title>
                        <p className="text-sm text-text-secondary mt-1">
                          {getModalDescription()}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="rounded-md p-2 text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface"
                        onClick={handleCloseModal}
                        aria-label="Close modal"
                        autoFocus
                      >
                        <MdOutlineClose className="h-5 w-5 sm:h-6 sm:w-6" />
                      </button>
                    </div>
                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300" 
                         style={{ width: `${scrollProgress}%` }} />
                  </div>

                  {/* Modal Content */}
                  <div 
                    ref={scrollContainerRef}
                    className="overflow-y-auto max-h-[calc(95vh-70px)] sm:max-h-[calc(90vh-80px)] scroll-smooth"
                    onScroll={handleScroll}
                  >
                    <div className="modal-content">
                      <Suspense fallback={<ModalLoading />}>
                        {renderModalContent()}
                      </Suspense>
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

export default DetailModal;
