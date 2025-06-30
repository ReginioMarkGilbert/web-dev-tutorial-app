import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BookOpen, Code, Database, FileCode, Filter, Layout, Search, Server, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

export default function TutorialsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8 max-w-6xl">
      {/* Header section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Web Development Tutorials</h1>
        <p className="text-muted-foreground">
          Comprehensive tutorials to master front-end and back-end web development
        </p>
      </div>

      {/* Search and filter section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for tutorials..."
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Featured tutorial */}
      <Card className="bg-muted/50 relative overflow-hidden border-2">
        <div className="absolute top-0 right-0">
          <Badge className="m-4 bg-primary hover:bg-primary">Featured</Badge>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">Full Stack Web Development Path</CardTitle>
          <CardDescription>Comprehensive learning path from frontend to backend</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p>
              Master the complete web development stack - from HTML, CSS, and JavaScript to
              React, Node.js, and databases. This comprehensive learning path will take you
              from beginner to professional web developer with hands-on projects at every stage.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">40+ Modules</Badge>
              <Badge variant="outline">15 Projects</Badge>
              <Badge variant="outline">80+ Hours</Badge>
            </div>
          </div>
          <div className="bg-muted rounded-md p-6 flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="font-semibold">Perfect for beginners to intermediate developers</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full md:w-auto">Start Learning Path</Button>
        </CardFooter>
      </Card>

      {/* Frontend section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Frontend Development</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frontendTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
            />
          ))}
        </div>
      </div>

      {/* Backend section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Backend Development</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {backendTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
            />
          ))}
        </div>
      </div>

      {/* Full Stack section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Full Stack Development</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fullstackTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
            />
          ))}
        </div>
      </div>

      {/* Trending tutorials */}
      <div className="pt-4">
        <Card className="bg-accent/20">
          <CardHeader>
            <CardTitle className="text-xl">Trending Now</CardTitle>
            <CardDescription>Most popular tutorials this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingTutorials.map((tutorial, index) => (
                <div key={tutorial.id} className="flex items-center gap-4">
                  <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center text-primary-foreground font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{tutorial.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{tutorial.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={tutorial.link}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface TutorialCardProps {
  tutorial: Tutorial
}

function TutorialCard({ tutorial }: TutorialCardProps) {
  const { title, description, level, duration, modules, icon: Icon, link } = tutorial

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <Badge variant={
            level === 'Beginner' ? 'outline' :
            level === 'Intermediate' ? 'secondary' :
            'destructive'
          }>
            {level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-1">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 mt-auto">
        <div className="flex justify-between w-full text-sm text-muted-foreground">
          <div>
            <BookOpen className="h-4 w-4 inline mr-1" />
            {modules} modules
          </div>
          <div>
            <Code className="h-4 w-4 inline mr-1" />
            {duration}
          </div>
        </div>
        <Button
          className="w-full"
          asChild={!!link}
        >
          {link ? (
            <Link to={link}>Start Learning</Link>
          ) : (
            "Start Learning"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

interface Tutorial {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  modules: number
  icon: React.ComponentType<{ className?: string }>
  link?: string
}

// Mock data for Frontend tutorials
const frontendTutorials: Tutorial[] = [
  {
    id: 'fe1',
    title: 'Modern JavaScript Fundamentals',
    description: 'Master JavaScript ES6+ features, async programming, and DOM manipulation',
    level: 'Intermediate',
    duration: '8 hours',
    modules: 12,
    icon: Code,
    link: '/javascript-fundamentals'
  },
  {
    id: 'fe2',
    title: 'Responsive Web Design',
    description: 'Create beautiful, responsive layouts with CSS Grid and Flexbox',
    level: 'Beginner',
    duration: '6 hours',
    modules: 8,
    icon: Layout
  },
  {
    id: 'fe3',
    title: 'React.js: Building Modern UIs',
    description: 'Build dynamic user interfaces with React hooks, context and custom components',
    level: 'Intermediate',
    duration: '10 hours',
    modules: 15,
    icon: Sparkles
  }
]

// Mock data for Backend tutorials
const backendTutorials: Tutorial[] = [
  {
    id: 'be1',
    title: 'Node.js & Express Backend',
    description: 'Create robust REST APIs and server-side applications with Node.js',
    level: 'Advanced',
    duration: '8 hours',
    modules: 10,
    icon: Server
  },
  {
    id: 'be2',
    title: 'SQL Databases for Web Devs',
    description: 'Learn SQL fundamentals and database design for web applications',
    level: 'Intermediate',
    duration: '7 hours',
    modules: 9,
    icon: Database
  },
  {
    id: 'be3',
    title: 'API Design Principles',
    description: 'Best practices for designing robust and scalable APIs',
    level: 'Intermediate',
    duration: '5 hours',
    modules: 7,
    icon: FileCode
  }
]

// Mock data for Full Stack tutorials
const fullstackTutorials: Tutorial[] = [
  {
    id: 'fs1',
    title: 'MERN Stack Development',
    description: 'Build full-stack applications with MongoDB, Express, React and Node.js',
    level: 'Advanced',
    duration: '15 hours',
    modules: 18,
    icon: Sparkles
  },
  {
    id: 'fs2',
    title: 'JAMstack Websites',
    description: 'Create fast, secure websites with JavaScript, APIs, and Markup',
    level: 'Intermediate',
    duration: '9 hours',
    modules: 11,
    icon: Layout
  },
  {
    id: 'fs3',
    title: 'TypeScript Full Stack',
    description: 'End-to-end type-safe applications with TypeScript, React, and Node.js',
    level: 'Advanced',
    duration: '12 hours',
    modules: 14,
    icon: Code
  }
]

// Mock data for Trending tutorials
const trendingTutorials = [
  {
    id: 'trend1',
    title: 'Next.js 14: The Complete Guide',
    description: 'Master the latest features of Next.js for production-ready React applications',
    link: '/tutorials/nextjs'
  },
  {
    id: 'trend2',
    title: 'Tailwind CSS Mastery',
    description: 'Become a CSS powerhouse with Tailwind CSS utility-first framework',
    link: '/tutorials/tailwind'
  },
  {
    id: 'trend3',
    title: 'React Server Components',
    description: 'Learn how to build efficient React apps with server components',
    link: '/tutorials/rsc'
  },
  {
    id: 'trend4',
    title: 'GraphQL API Development',
    description: 'Build flexible and powerful APIs with GraphQL',
    link: '/tutorials/graphql'
  },
  {
    id: 'trend5',
    title: 'Responsive Web Design with CSS Grid',
    description: 'Create modern layouts with CSS Grid Layout',
    link: '/tutorials/css-grid'
  }
]