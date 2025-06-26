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
    title: "VirtuMeet",
    description: "A comprehensive video conferencing platform built with Next.js and TypeScript that replicates Zoom functionality.",
    highlights: [
      "Secure user authentication and meeting creation",
      "Real-time video/audio communication with WebRTC",
      "Screen sharing and meeting recording capabilities",
      "Participant management and meeting controls",
      "Responsive design for desktop and mobile devices"
    ],
    image: "/yoom.webp",
    github: "https://github.com/raghuaanand/VirtuMeet",
    live: "https://virtumeet.raghuanand.tech",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "WebRTC", "Clerk"]
  },
  {
    title: "Smart Scholar",
    description: "An AI-powered online platform designed to empower students with cutting-edge tools for their academic journey.",
    highlights: [
      "AI-powered text summarization for complex academic content",
      "Personalized career path recommendations",
      "Topic breakdown and explanation in simple terms",
      "Interactive learning assistance and Q&A",
      "Progress tracking and study analytics"
    ],
    image: "/smart-scholar.png",
    github: "https://github.com/raghuaanand/SmartScholar",
    live: "https://smartscholar.raghuanand.tech",
    stack: ["React", "Node.js", "OpenAI API", "MongoDB", "Express.js"]
  },
  {
    title: "Notion Clone",
    description: "A comprehensive project management and note-taking platform emulating Notion's functionality with modern web technologies.",
    highlights: [
      "Real-time collaborative document editing",
      "Secure user authentication with Clerk",
      "Dynamic content updates with Convex database",
      "Responsive UI with Tailwind CSS and Shadcn/UI",
      "Rich text editing and formatting options"
    ],
    github: "https://github.com/raghuaanand/Notion-Clone",
    live: "https://notes-raghu.vercel.app",
    stack: ["Next.js", "Clerk", "Convex", "Tailwind CSS", "Shadcn/UI"]
  }
];

// Experience data
const experiences = [
  {
    title: "Software Engineer Intern",
    company: "CoPrimes",
    period: "Jan 2025 - Present",
    achievements: [
      "Developed and maintained 5+ web applications using React, Node.js, and MongoDB",
      "Improved application performance by 40% through code optimization and best practices",
      "Collaborated with cross-functional teams to deliver projects on time and within scope",
      "Mentored 2 junior developers and conducted code reviews"
    ],
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker"]
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
