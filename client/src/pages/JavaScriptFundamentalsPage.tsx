import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, ChevronRight, Code, FileCode, List, Play, Terminal } from "lucide-react"
import { Link } from "react-router-dom"

export default function JavaScriptFundamentalsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8 max-w-6xl">
      {/* Header section */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <Badge variant="outline">Fundamentals</Badge>
        </div>
        <h1 className="text-3xl font-bold">JavaScript Fundamentals</h1>
        <p className="text-muted-foreground">
          Master the core concepts of JavaScript, the programming language of the web.
        </p>
      </div>

      {/* Overview section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Course Overview</CardTitle>
          <CardDescription>
            Learn the essential building blocks of JavaScript programming
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Beginner friendly</Badge>
              <Badge variant="secondary">12 modules</Badge>
              <Badge variant="secondary">5-7 hours</Badge>
            </div>
            <Button>
              <Play className="mr-2 h-4 w-4" />
              Start Learning
            </Button>
          </div>
          <p>
            This comprehensive course covers everything you need to know to get started with JavaScript. From basic syntax to complex concepts like closures and asynchronous programming, you'll gain a solid foundation that will prepare you for modern JavaScript development.
          </p>
        </CardContent>
      </Card>

      {/* Topics tabs */}
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="functions">Functions</TabsTrigger>
          <TabsTrigger value="objects">Objects & Arrays</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* Basics Tab */}
        <TabsContent value="basics" className="space-y-4">
          <h2 className="text-xl font-semibold">JavaScript Basics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jsBasicsTopics.map((topic) => (
              <TopicCard key={topic.title} topic={topic} />
            ))}
          </div>
        </TabsContent>

        {/* Functions Tab */}
        <TabsContent value="functions" className="space-y-4">
          <h2 className="text-xl font-semibold">Functions & Scope</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jsFunctionsTopics.map((topic) => (
              <TopicCard key={topic.title} topic={topic} />
            ))}
          </div>
        </TabsContent>

        {/* Objects Tab */}
        <TabsContent value="objects" className="space-y-4">
          <h2 className="text-xl font-semibold">Objects and Arrays</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jsObjectsTopics.map((topic) => (
              <TopicCard key={topic.title} topic={topic} />
            ))}
          </div>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-4">
          <h2 className="text-xl font-semibold">Advanced Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jsAdvancedTopics.map((topic) => (
              <TopicCard key={topic.title} topic={topic} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Resources section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Additional Resources</CardTitle>
          <CardDescription>
            Continue your learning journey with these resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResourceCard
              title="MDN Documentation"
              description="Comprehensive documentation for JavaScript"
              icon={<FileCode className="h-5 w-5 text-primary" />}
              link="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            />
            <ResourceCard
              title="JavaScript.info"
              description="Modern JavaScript tutorial"
              icon={<BookOpen className="h-5 w-5 text-primary" />}
              link="https://javascript.info/"
            />
            <ResourceCard
              title="CodePen"
              description="Try JavaScript examples in your browser"
              icon={<Code className="h-5 w-5 text-primary" />}
              link="https://codepen.io/"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface TopicProps {
  topic: {
    title: string
    description: string
    icon: React.ReactNode
    duration: string
    level: 'beginner' | 'intermediate' | 'advanced'
  }
}

function TopicCard({ topic }: TopicProps) {
  const { title, description, icon, duration, level } = topic

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-md">
              {icon}
            </div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <Badge variant={
            level === 'beginner' ? 'outline' :
            level === 'intermediate' ? 'secondary' :
            'destructive'
          }>
            {level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">{duration}</span>
        <Button variant="ghost" size="sm" className="gap-1">
          Start lesson
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

interface ResourceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  link: string
}

function ResourceCard({ title, description, icon, link }: ResourceCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer">Visit Resource</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

// Mock data for JavaScript Basics topics
const jsBasicsTopics = [
  {
    title: "Variables & Data Types",
    description: "Learn about variables, primitive data types, and type coercion in JavaScript.",
    icon: <Terminal className="h-5 w-5 text-primary" />,
    duration: "25 min",
    level: "beginner" as const
  },
  {
    title: "Operators & Expressions",
    description: "Explore arithmetic, comparison, logical operators, and operator precedence.",
    icon: <Code className="h-5 w-5 text-primary" />,
    duration: "30 min",
    level: "beginner" as const
  },
  {
    title: "Control Flow",
    description: "Master if/else statements, switch cases, and different types of loops.",
    icon: <List className="h-5 w-5 text-primary" />,
    duration: "45 min",
    level: "beginner" as const
  },
  {
    title: "Error Handling",
    description: "Understand try/catch/finally blocks and error handling strategies.",
    icon: <Terminal className="h-5 w-5 text-primary" />,
    duration: "30 min",
    level: "intermediate" as const
  },
]

// Mock data for JavaScript Functions topics
const jsFunctionsTopics = [
  {
    title: "Function Basics",
    description: "Learn function declarations, expressions, parameters, and return values.",
    icon: <Code className="h-5 w-5 text-primary" />,
    duration: "35 min",
    level: "beginner" as const
  },
  {
    title: "Scope & Closures",
    description: "Understand lexical scope, execution context, and creating closures.",
    icon: <Terminal className="h-5 w-5 text-primary" />,
    duration: "40 min",
    level: "intermediate" as const
  },
  {
    title: "Arrow Functions",
    description: "Explore modern arrow function syntax and lexical 'this' binding.",
    icon: <Code className="h-5 w-5 text-primary" />,
    duration: "25 min",
    level: "intermediate" as const
  },
  {
    title: "Higher-Order Functions",
    description: "Learn about functions that operate on other functions and functional programming concepts.",
    icon: <Terminal className="h-5 w-5 text-primary" />,
    duration: "45 min",
    level: "advanced" as const
  },
]

// Mock data for JavaScript Objects topics
const jsObjectsTopics = [
  {
    title: "Object Fundamentals",
    description: "Learn about object creation, properties, methods, and the 'this' keyword.",
    icon: <Code className="h-5 w-5 text-primary" />,
    duration: "40 min",
    level: "beginner" as const
  },
  {
    title: "Working with Arrays",
    description: "Master array methods like map, filter, reduce, and array destructuring.",
    icon: <List className="h-5 w-5 text-primary" />,
    duration: "45 min",
    level: "intermediate" as const
  },
  {
    title: "Prototypes & Inheritance",
    description: "Understand JavaScript's prototype-based inheritance model.",
    icon: <Terminal className="h-5 w-5 text-primary" />,
    duration: "50 min",
    level: "advanced" as const
  },
  {
    title: "ES6+ Object Features",
    description: "Explore modern object features like spread operator, shorthand properties, and computed properties.",
    icon: <Code className="h-5 w-5 text-primary" />,
    duration: "35 min",
    level: "intermediate" as const
  },
]

// Mock data for JavaScript Advanced topics
const jsAdvancedTopics = [
  {
    title: "Asynchronous JavaScript",
    description: "Master callbacks, promises, async/await, and handling asynchronous operations.",
    icon: <Terminal className="h-5 w-5 text-primary" />,
    duration: "60 min",
    level: "advanced" as const
  },
  {
    title: "ES6+ Features",
    description: "Learn modern JavaScript features like destructuring, rest/spread, and modules.",
    icon: <Code className="h-5 w-5 text-primary" />,
    duration: "50 min",
    level: "intermediate" as const
  },
  {
    title: "JavaScript Modules",
    description: "Understand module patterns, import/export syntax, and organizing code.",
    icon: <FileCode className="h-5 w-5 text-primary" />,
    duration: "40 min",
    level: "intermediate" as const
  },
  {
    title: "Web APIs",
    description: "Explore browser APIs like DOM manipulation, Fetch, and Local Storage.",
    icon: <Terminal className="h-5 w-5 text-primary" />,
    duration: "55 min",
    level: "advanced" as const
  },
]