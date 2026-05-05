import { BookOpen, Code, Database, FileCode, Layout, Server, Sparkles, Users } from "lucide-react"
import type { ComponentType } from "react"

export type TutorialLevel = "Beginner" | "Intermediate" | "Advanced"
export type TutorialCategory = "Frontend" | "Backend" | "Full Stack"

export type TutorialSummary = {
  id: string
  title: string
  description: string
  level: TutorialLevel
  duration: string
  modules: number
  category: TutorialCategory
  icon: ComponentType<{ className?: string }>
  link: string
  available: boolean
}

export const tutorialCatalog: TutorialSummary[] = [
  {
    id: "javascript-variables",
    title: "JavaScript Variables and Data Types",
    description: "Learn how variables work and how JavaScript represents common data types.",
    level: "Beginner",
    duration: "20 min",
    modules: 3,
    category: "Frontend",
    icon: Code,
    link: "/tutorial/javascript-variables",
    available: true,
  },
  {
    id: "javascript-functions",
    title: "JavaScript Functions",
    description: "Build reusable blocks of JavaScript with declarations, expressions, and arrows.",
    level: "Beginner",
    duration: "25 min",
    modules: 1,
    category: "Frontend",
    icon: FileCode,
    link: "/tutorial/javascript-functions",
    available: true,
  },
  {
    id: "responsive-web-design",
    title: "Responsive Web Design",
    description: "Create beautiful, responsive layouts with CSS Grid and Flexbox.",
    level: "Beginner",
    duration: "6 hours",
    modules: 8,
    category: "Frontend",
    icon: Layout,
    link: "/tutorial/responsive-web-design",
    available: false,
  },
  {
    id: "react-modern-uis",
    title: "React.js: Building Modern UIs",
    description: "Build dynamic user interfaces with React hooks, context and custom components.",
    level: "Intermediate",
    duration: "10 hours",
    modules: 15,
    category: "Frontend",
    icon: Sparkles,
    link: "/tutorial/react-modern-uis",
    available: false,
  },
  {
    id: "node-express-backend",
    title: "Node.js & Express Backend",
    description: "Create robust REST APIs and server-side applications with Node.js.",
    level: "Advanced",
    duration: "8 hours",
    modules: 10,
    category: "Backend",
    icon: Server,
    link: "/tutorial/node-express-backend",
    available: false,
  },
  {
    id: "sql-databases",
    title: "SQL Databases for Web Devs",
    description: "Learn SQL fundamentals and database design for web applications.",
    level: "Intermediate",
    duration: "7 hours",
    modules: 9,
    category: "Backend",
    icon: Database,
    link: "/tutorial/sql-databases",
    available: false,
  },
  {
    id: "api-design",
    title: "API Design Principles",
    description: "Best practices for designing robust and scalable APIs.",
    level: "Intermediate",
    duration: "5 hours",
    modules: 7,
    category: "Backend",
    icon: FileCode,
    link: "/tutorial/api-design",
    available: false,
  },
  {
    id: "html-css-basics",
    title: "HTML & CSS Basics",
    description: "Core concepts of HTML5 and CSS3 for building modern websites.",
    level: "Beginner",
    duration: "4 hours",
    modules: 6,
    category: "Frontend",
    icon: BookOpen,
    link: "/tutorial/html-css-basics",
    available: false,
  },
  {
    id: "git-github-fundamentals",
    title: "Git & GitHub Fundamentals",
    description: "Master version control and collaborative development workflows.",
    level: "Beginner",
    duration: "3 hours",
    modules: 5,
    category: "Full Stack",
    icon: Users,
    link: "/tutorial/git-github-fundamentals",
    available: false,
  },
  {
    id: "mern-stack",
    title: "MERN Stack Development",
    description: "Build full-stack applications with MongoDB, Express, React and Node.js.",
    level: "Advanced",
    duration: "15 hours",
    modules: 18,
    category: "Full Stack",
    icon: Sparkles,
    link: "/tutorial/mern-stack",
    available: false,
  },
  {
    id: "jamstack-websites",
    title: "JAMstack Websites",
    description: "Create fast, secure websites with JavaScript, APIs, and Markup.",
    level: "Intermediate",
    duration: "9 hours",
    modules: 11,
    category: "Full Stack",
    icon: Layout,
    link: "/tutorial/jamstack-websites",
    available: false,
  },
  {
    id: "typescript-full-stack",
    title: "TypeScript Full Stack",
    description: "End-to-end type-safe applications with TypeScript, React, and Node.js.",
    level: "Advanced",
    duration: "12 hours",
    modules: 14,
    category: "Full Stack",
    icon: Code,
    link: "/tutorial/typescript-full-stack",
    available: false,
  },
]

export const availableTutorials = tutorialCatalog.filter((tutorial) => tutorial.available)

export const getTutorialSummary = (tutorialId: string) =>
  tutorialCatalog.find((tutorial) => tutorial.id === tutorialId)
