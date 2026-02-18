/**
 * Content Constants - Mirrors web constants
 * 
 * Static content shared between web and mobile
 */

import { Project, Experience, SocialLink, NavItem } from './types';

// Social Links
export const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com/raghuaanand',
    iconName: 'logo-github',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/raghuanand',
    iconName: 'logo-linkedin',
    label: 'LinkedIn',
  },
  {
    href: 'mailto:raghuaanand@gmail.com',
    iconName: 'mail',
    label: 'Email',
  },
  {
    href: 'https://api.whatsapp.com/send/?phone=917762091121',
    iconName: 'logo-whatsapp',
    label: 'WhatsApp',
  },
];

// Featured Projects
export const featuredProjects: Project[] = [
  {
    title: 'Course Hub',
    description:
      'A full-featured course marketplace built with Next.js and Express.js, offering secure payments, video delivery, and role-based access control.',
    highlights: [
      'Real-time collaborative document editing',
      'Secure user authentication with Clerk',
      'Dynamic content updates with Convex database',
      'Responsive UI with Tailwind CSS and Shadcn/UI',
      'Rich text editing and formatting options',
    ],
    github: 'https://github.com/raghuaanand/course-marketplace',
    live: 'https://course-marketplace-one.vercel.app/',
    stack: ['Next.js', 'Node.js', 'Express.js', 'Stripe', 'Tailwind CSS', 'Shadcn/UI'],
  },
  {
    title: 'Sudoku Arena',
    description:
      'A competitive online platform for playing and solving Sudoku puzzles in real-time and earn money.',
    highlights: [
      'Real-time multiplayer gameplay',
      'Interactive puzzle editor and solver',
      'User-friendly interface with dark mode',
      'Responsive UI with Tailwind CSS and Shadcn/UI',
      'Rich text editing and formatting options',
    ],
    github: 'https://github.com/raghuaanand/sudoku-arena',
    live: 'https://suduko-arena.vercel.app/',
    stack: ['Next.js', 'Node.js', 'Express.js', 'Razorpay', 'Socket.IO', 'Auth.js'],
  },
  {
    title: 'VirtuMeet',
    description:
      'A real-time video conferencing platform developed with Next.js and WebRTC that replicates core Zoom functionality with scheduling, personal rooms, and recordings.',
    highlights: [
      'Secure user authentication and meeting creation',
      'Real-time video/audio communication with WebRTC',
      'Screen sharing and meeting recording capabilities',
      'Participant management and meeting controls',
      'Responsive design for desktop and mobile devices',
    ],
    github: 'https://github.com/raghuaanand/VirtuMeet',
    live: 'https://virtumeet.vercel.app/',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WebRTC', 'Clerk'],
  },
  {
    title: 'Smart Scholar',
    description:
      'An AI-powered academic assistant built with Next.js and Groq API, offering 10+ intelligent tools for content generation, real-time chat, and student productivity.',
    highlights: [
      'AI-powered text summarization for complex academic content',
      'Personalized career path recommendations',
      'Topic breakdown and explanation in simple terms',
      'Interactive learning assistance and Q&A',
      'Progress tracking and study analytics',
    ],
    github: 'https://github.com/raghuaanand/SmartScholar',
    live: 'https://smart-scholar.vercel.app/',
    stack: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Express.js'],
  },
];

// Experience
export const experiences: Experience[] = [
  {
    title: 'Software Engineer Intern',
    company: 'CoPrimes',
    period: 'Jan 2025 - June 2025',
    achievements: [
      'Identified redundant API requests; implemented request batching and deduplication, cutting API calls by 68% and overall latency by 40%.',
      'Revamped client rendering and component architecture; implemented lazy loading and strategic prefetching, cutting content load time by 2.3s (45%) and improving user retention.',
      'Built an automated payload validation pipeline integrated into CI; enforced pre-deploy checks and rollbacks, catching errors earlier and slashing production bugs by 72% month-over-month.',
      'Developed a rich text editor using Lexical for seamless multimedia content embedding',
    ],
    technologies: ['React', 'Node.js', 'Next.js', 'AWS', 'TypeScript', 'PostgreSQL', 'Paddle'],
  },
];

// Navigation Items
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Writing', href: '/writing' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
];

// About page content
export const aboutContent = {
  name: 'Raghu Anand',
  tagline: 'curious, tinkerer, and explorer',
  bio: [
    'I am a Software Engineer and an engineering enthusiast passionate about building scalable systems and digital products.',
    'I write about system design, databases, and engineering best practices.',
    'I keep diving deep into engineering details and share my learnings through my blog posts and projects.',
  ],
  resumeUrl:
    'https://drive.google.com/file/d/146g9wP71UPsTNXHDuthxHhwJTnub1RbN/view?usp=drive_link',
};
