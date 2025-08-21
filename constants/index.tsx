import { FeaturedProjects } from "@/lib/types";

const socialLinks = [
  {
    href: "https://github.com/raghuaanand",
    iconName: "FaGithub",
    label: "GitHub"
  },
  {
    href: "https://www.linkedin.com/in/raghuanand",
    iconName: "FaLinkedin",
    label: "LinkedIn"
  },
  {
    href: "mailto:raghuaanand@gmail.com",
    iconName: "MdEmail",
    label: "Email"
  },
  {
    href: "https://api.whatsapp.com/send/?phone=917762091121",
    iconName: "FaWhatsapp",
    label: "WhatsApp"
  },
];

const featuredProjects: FeaturedProjects = [
  {
    title: "Course Hub",
    description: "A full-featured course marketplace built with Next.js and Express.js, offering secure payments, video delivery, and role-based access control.",
    highlights: [
      "Real-time collaborative document editing",
      "Secure user authentication with Clerk",
      "Dynamic content updates with Convex database",
      "Responsive UI with Tailwind CSS and Shadcn/UI",
      "Rich text editing and formatting options"
    ],
    github: "https://github.com/raghuaanand/course-marketplace",
    live: "https://course-marketplace-one.vercel.app/",
    stack: ["Next.js", "Node.js", "Express.js", "Stripe", "Tailwind CSS", "Shadcn/UI"]
  },
  {
    title: "VirtuMeet",
    description: "A real-time video conferencing platform developed with Next.js and WebRTC that replicates core Zoom functionality with scheduling, personal rooms, and recordings.",
    highlights: [
      "Secure user authentication and meeting creation",
      "Real-time video/audio communication with WebRTC",
      "Screen sharing and meeting recording capabilities",
      "Participant management and meeting controls",
      "Responsive design for desktop and mobile devices"
    ],
    image: "/yoom.webp",
    github: "https://github.com/raghuaanand/VirtuMeet",
    live: "https://virtumeet.vercel.app/",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "WebRTC", "Clerk"]
  },
  {
    title: "Smart Scholar",
    description: "An AI-powered academic assistant built with Next.js and Groq API, offering 10+ intelligent tools for content generation, real-time chat, and student productivity.",
    highlights: [
      "AI-powered text summarization for complex academic content",
      "Personalized career path recommendations",
      "Topic breakdown and explanation in simple terms",
      "Interactive learning assistance and Q&A",
      "Progress tracking and study analytics"
    ],
    image: "/smart-scholar.png",
    github: "https://github.com/raghuaanand/SmartScholar",
    live: "https://smart-scholar.vercel.app/",
    stack: ["React", "Node.js", "OpenAI API", "MongoDB", "Express.js"]
  },
];

// Experience data
const experiences = [
  {
    title: "Software Engineer Intern",
    company: "CoPrimes",
    period: "Jan 2025 - Present",
    achievements: [
      "Developed RESTful APIs using Node.js and Express.js to streamline backend data processing",
      "Optimized PostgreSQL performance by indexing 50+ tables and analyzing query execution plans",
      "Increased student content interaction by 30% through intuitive UX and media support",
      "Developed a rich text editor using Lexical for seamless multimedia content embedding",
    ],
    technologies: ["React", "Node.js", "Next.js", "AWS", "TypeScript", "PostgreSQL"]
  }
];

// Education data
const education = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Chandigarh University",
    period: "2021 - 2025",
    gpa: "7.73/10",
    relevantCourses: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Software Engineering",
      "Web Technologies",
      "Computer Networks"
    ]
  }
];

export { 
  socialLinks, 
  featuredProjects, 
  experiences, 
  education 
};
