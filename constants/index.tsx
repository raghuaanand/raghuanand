import { ArchiveProjects, FeaturedProjects } from "@/lib/types";

const recentTechnologies: string[] = [
  "JavaScript (ES6+)",
  "Next.js",
  "React",
  "Typescript",
  "MySQL",
  "MongoDB",
  "Tailwindcss",
  "Express JS",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "CI/CD"
];

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
  /* {
    title: "Discord Clone",
    description:
      "Discord Clone, developed on Next.js 13 framework, closely mimics Discord's core features. Users can create channels, invite others, and exchange messages in channels and 1:1 conversations. Powered by Socket.io, it supports real-time audio/video calls. Private conversations with all channel members are facilitated through Livekit WebRTC.",
    image: "/discord.webp",
    github: "https://github.com/raghuaanand/Discord-Clone",
  }, */
  {
    title: "VirtuMeet",
    description:
      "Built with the latest Next.js and TypeScript, this project replicates Zoom, a widely used video conferencing tool. It enables users to securely log in, create meetings and access various meeting functionalities such as recording, screen sharing, and managing participants.",
    image: "/yoom.webp",
    github: "https://github.com/raghuaanand/VirtuMeet",
    live: "https://virtumeet.raghuanand.tech",
  },
  {
    title: "Smart Scholar",
    description:
      "It is an innovative online platform designed to empower students with cutting-edge AI tools that simplify their academic journey. Whether it's summarizing complex texts, receiving personalized career path advice, or breaking down challenging topics in a way that’s easy to understand.",
    image: "/smart-scholar.png",
    github: "https://github.com/raghuaanand/VirtuMeet",
    live: "https://virtumeet.raghuanand.tech",
  },
 /*  {
    title: "Notion Clone",
    description:
      "Notion Clone is a comprehensive project developed on the Next.js 14 framework, emulating the functionality of Notion. Clerk Authentication ensures secure user access. Tailwind CSS and Shadcn/UI contribute to a responsive and visually appealing UI. Real-time updates are facilitated through Convex Real-time Database, ensuring dynamic content changes.",
    image: "/notion.webp",
    github: "https://github.com/raghuaanand/Notion-Clone",
    live: "https://notes-raghu.vercel.app",
  }, */
  /* {
    title: "Expense Tracker",
    description:
      "Expensify is a MERN Stack project enabling user to track and visualize their expenses seamlessly. Razorpay enables easy upgrades, Chart JS 2 enhances report interactivity, and Chakra UI ensures a responsive UI. Nodemailer-enabled password reset ensures security. The pro version introduces a leaderboard, and an efficient tracking.",
    image: "/expensify.webp",
    github: "https://github.com/raghuaanand/Expense-Tracker",
    live: "https://expensify-raghu.netlify.app",
  }, */
 /*  {
    title: "Social Media Website",
    description:
      "TextBook is a social media website built using the MERN stack, featuring authentication using NextAuth, a PostgreSQL database managed by Prisma, and the PrimeReact library for UI. It enables users to share their thoughts with others, like, and comment on other users' posts.",
    image: "/textbook.webp",
    github: "https://github.com/raghuaanand/TextBook",
    live: "https://textbook-raghu.vercel.app/",
  }, */
];

const archievedProjects: ArchiveProjects = [
  {
    title: "Url Shortener",
    description:
      "MERN Stack URL Shortener with CRUD functionality, click tracking, and update/delete options.",
    github: "https://github.com/raghuaanand/Url-Shortener",
    live: "https://tiny-link.fly.dev",
    stack: ["MongoDb", "Express.Js", "React.Js", "Node.Js"],
  },
  {
    title: "Mail Dash",
    description:
      "A mailbox client application that allows users to send and receive emails in real-time.",
    github: "https://github.com/raghuaanand/Mail-Dash",
    live: "https://mail-dash-raghu.netlify.app",
    stack: ["React.js", "TypeScript", "Firebase", "Zustand"],
  },
  {
    title: "Chat App",
    description:
      "A real time chat application built using Cloud firestore database allowing users to chat in a group.",
    github: "https://github.com/raghuaanand/firebase-chat-app",
    live: "https://chat-raghu.netlify.app",
    stack: ["React.js", "Chakra UI", "Firebase"],
  },
  {
    title: "Alpha Stock",
    description:
      "An application where users can search for US stocks, add it to Portfolio and keep a track of its Price!",
    live: "https://alpha-stock-raghu.netlify.app/",
    github: "https://github.com/raghuaanand/Alpha-Stock",
    stack: ["React.Js", "Firebase", "Material UI", "Charts.Js 2"],
  },
  {
    title: "Quiz App",
    description:
      "A quiz application built using Next.js where users can play quizzes with different question categories.",
    live: "https://quizy-raghu.vercel.app/",
    github: "https://github.com/raghuaanand/Quiz-App",
    stack: ["Next.Js", "Prime React", "Tailwindcss", "The Trivia API"],
  },
  {
    title: "Text Utilities",
    description:
      "A text manipulation application with Google Translation API, enabling users to translate to any language.",
    live: "https://text-util-raghu.netlify.app",
    github: "https://github.com/raghuaanand/text-utilities",
    stack: ["React.Js", "Material UI", "Google Translate API"],
  },
  {
    title: "Tic tac toe",
    description: "Tic tac toe game built using React.JS",
    live: "https://tic-tac-toe-raghu.netlify.app/",
    github: "https://github.com/raghuaanand/tic-tac-toe",
    stack: ["React.JS"],
  },
  {
    title: "Weather App",
    description:
      "A Weather app built using React.JS which uses Open weather Map API for fetching weather data.",
    github: "https://github.com/raghuaanand/weather-app",
    live: "https://weather-raghu.netlify.app",
    stack: ["React.JS", "Material UI", "Open Weather Map API"],
  },
  {
    title: "CATOG",
    description:
      "CATOG was my first project where I integrated an API. The APIs used were the Cat API and Dog API.",
    github: "https://github.com/raghuaanand/CATOG",
    live: "https://catog-by-raghu.netlify.app",
    stack: ["React.JS", "Material UI"],
  },
  {
    title: "Tesla Clone",
    description:
      "A clone of the tesla website's landing page which looks exactly similar as of 15th December 2022.",
    live: "https://tesla-raghu.netlify.app",
    github: "https://github.com/raghuaanand/Tesla-Landing-Page-Clone",
    stack: ["Html", "Bootstrap", "Javascript"],
  },
  {
    title: "iNotes",
    description:
      "iNotes is an application where users can write notes, and it can perform CRUD operations in local storage.",
    github: "https://github.com/raghuaanand/notes-web-app",
    live: "https://inotes-raghu.netlify.app",
    stack: ["Html", "Bootstrap", "Javascript"],
  },
  {
    title: "Battery Percentage Checker",
    description:
      "My First Web Development project which shows the percentage of battery of any device.",
    github: "https://github.com/raghuaanand/Battery-Percentage-Checker",
    live: "https://battery-check-raghu.netlify.app",
    stack: ["Html", "Bootstrap", "Javascript"],
  },
];

// Experience data
const experiences = [
  {
    title: "Full-Stack Developer",
    company: "Tech Solutions Inc.",
    period: "2023 - Present",
    achievements: [
      "Developed and maintained 5+ web applications using React, Node.js, and MongoDB",
      "Improved application performance by 40% through code optimization and best practices",
      "Collaborated with cross-functional teams to deliver projects on time and within scope",
      "Mentored 2 junior developers and conducted code reviews"
    ],
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker"]
  },
  {
    title: "Frontend Developer Intern",
    company: "Digital Agency",
    period: "2022 - 2023",
    achievements: [
      "Built responsive web interfaces for 10+ client projects",
      "Implemented modern CSS frameworks and improved UI/UX design",
      "Reduced page load times by 30% through optimization techniques"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
  }
];

// Education data
const education = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Indian Institute of Technology",
    period: "2020 - 2024",
    gpa: "8.5/10",
    relevantCourses: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Software Engineering",
      "Web Technologies",
      "Computer Networks"
    ]
  }
];

// Skills categories
const skillCategories = [
  {
    title: "Frontend Development",
    iconName: "FaCode",
    skills: [
      { name: "React/Next.js", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "JavaScript (ES6+)", level: 5 },
      { name: "HTML5/CSS3", level: 5 }
    ]
  },
  {
    title: "Backend Development",
    iconName: "FaServer",
    skills: [
      { name: "Node.js", level: 4 },
      { name: "Express.js", level: 4 },
      { name: "MongoDB", level: 4 },
      { name: "PostgreSQL", level: 3 },
      { name: "REST APIs", level: 4 }
    ]
  },
  {
    title: "Tools & Technologies",
    iconName: "FaTools",
    skills: [
      { name: "Git/GitHub", level: 5 },
      { name: "Docker", level: 3 },
      { name: "AWS", level: 3 },
      { name: "Vercel/Netlify", level: 4 },
      { name: "CI/CD", level: 3 }
    ]
  }
];

// Blog posts data
const blogPosts = [
  {
    title: "Building Scalable React Applications with TypeScript",
    summary: "Learn how to structure large React applications using TypeScript, custom hooks, and modern patterns for maintainable code.",
    category: "React",
    date: "2024-01-15",
    readTime: 8,
    link: "https://dev.to/raghuanand/building-scalable-react-applications"
  },
  {
    title: "Optimizing Node.js Performance: Best Practices",
    summary: "Discover essential techniques to improve your Node.js application performance, from memory management to database optimization.",
    category: "Node.js",
    date: "2023-12-20",
    readTime: 6,
    link: "https://dev.to/raghuanand/nodejs-performance-optimization"
  },
  {
    title: "Modern CSS Layout Techniques with Grid and Flexbox",
    summary: "Master CSS Grid and Flexbox to create responsive layouts that work across all devices and browsers.",
    category: "CSS",
    date: "2023-11-10",
    readTime: 5,
    link: "https://dev.to/raghuanand/modern-css-layouts"
  }
];

export { 
  recentTechnologies, 
  socialLinks, 
  featuredProjects, 
  archievedProjects,
  experiences,
  education,
  skillCategories,
  blogPosts
};

