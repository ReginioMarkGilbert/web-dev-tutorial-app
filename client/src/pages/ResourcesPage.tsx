import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code, ExternalLink, FileCode, Github, Globe, Layout, Library, Search } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8 max-w-6xl">
      {/* Header section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Web Development Resources</h1>
        <p className="text-muted-foreground">
          Curated collection of the best tools, documentation, and learning materials for web developers
        </p>
      </div>

      {/* Search section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for resources..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Resources tabs */}
      <Tabs defaultValue="documentation" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        {/* Documentation Tab */}
        <TabsContent value="documentation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documentationResources.map((resource) => (
              <ResourceCard
                key={resource.title}
                resource={resource}
              />
            ))}
          </div>
        </TabsContent>

        {/* Tutorials Tab */}
        <TabsContent value="tutorials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tutorialResources.map((resource) => (
              <ResourceCard
                key={resource.title}
                resource={resource}
              />
            ))}
          </div>
        </TabsContent>

        {/* Tools Tab */}
        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolResources.map((resource) => (
              <ResourceCard
                key={resource.title}
                resource={resource}
              />
            ))}
          </div>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityResources.map((resource) => (
              <ResourceCard
                key={resource.title}
                resource={resource}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured resources section */}
      <div className="pt-8">
        <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeaturedResourceCard
            title="Full Stack Open"
            description="Deep dive into modern web development with React, Redux, Node.js, MongoDB, GraphQL and TypeScript."
            image="/fullstackopen.png"
            tags={["Full-Stack", "React", "Node.js"]}
            url="https://fullstackopen.com/"
          />
          <FeaturedResourceCard
            title="The Odin Project"
            description="Free full-stack curriculum with a focus on real-world projects and collaboration."
            image="/odinproject.png"
            tags={["Full-Stack", "Open Source", "Project-Based"]}
            url="https://www.theodinproject.com/"
          />
        </div>
      </div>
    </div>
  )
}

interface ResourceCardProps {
  resource: {
    title: string
    description: string
    url: string
    icon: React.ReactNode
    tags: string[]
  }
}

function ResourceCard({ resource }: ResourceCardProps) {
  const { title, description, url, icon, tags } = resource

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-md">
              {icon}
            </div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-1">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {tags.map((tag) => (
            <Badge variant="secondary" key={tag} className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Resource
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

interface FeaturedResourceCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  url: string
}

function FeaturedResourceCard({ title, description, image, tags, url }: FeaturedResourceCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-muted flex items-center justify-center">
        <div className="text-3xl font-bold text-muted-foreground">{title}</div>
        {/* Image would go here if available */}
        {/* <img src={image} alt={title} className="w-full h-full object-cover" /> */}
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag) => (
            <Badge variant="secondary" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Explore Resource
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

// Mock data for Documentation resources
const documentationResources = [
  {
    title: "MDN Web Docs",
    description: "Comprehensive documentation for HTML, CSS, JavaScript and Web APIs",
    url: "https://developer.mozilla.org/",
    icon: <FileCode className="h-5 w-5 text-primary" />,
    tags: ["Reference", "Web Standards", "Tutorials"]
  },
  {
    title: "React Documentation",
    description: "Official documentation for React, a JavaScript library for building user interfaces",
    url: "https://react.dev/",
    icon: <Code className="h-5 w-5 text-primary" />,
    tags: ["React", "JavaScript", "UI Library"]
  },
  {
    title: "TypeScript Handbook",
    description: "Official documentation for TypeScript, a typed superset of JavaScript",
    url: "https://www.typescriptlang.org/docs/",
    icon: <FileCode className="h-5 w-5 text-primary" />,
    tags: ["TypeScript", "JavaScript", "Types"]
  },
  {
    title: "Node.js Docs",
    description: "Official documentation for Node.js, a JavaScript runtime",
    url: "https://nodejs.org/en/docs/",
    icon: <Code className="h-5 w-5 text-primary" />,
    tags: ["Node.js", "Server-side", "JavaScript"]
  },
  {
    title: "CSS Tricks",
    description: "A website dedicated to teaching all things web design and development",
    url: "https://css-tricks.com/",
    icon: <Layout className="h-5 w-5 text-primary" />,
    tags: ["CSS", "Design", "Tutorials"]
  },
  {
    title: "Can I Use",
    description: "Browser support tables for modern web technologies",
    url: "https://caniuse.com/",
    icon: <Globe className="h-5 w-5 text-primary" />,
    tags: ["Browser Support", "Web Standards", "Reference"]
  }
]

// Mock data for Tutorial resources
const tutorialResources = [
  {
    title: "freeCodeCamp",
    description: "Free interactive coding tutorials for web development",
    url: "https://www.freecodecamp.org/",
    icon: <Code className="h-5 w-5 text-primary" />,
    tags: ["Free", "Interactive", "Full-Stack"]
  },
  {
    title: "JavaScript.info",
    description: "Modern JavaScript tutorial from basics to advanced concepts",
    url: "https://javascript.info/",
    icon: <FileCode className="h-5 w-5 text-primary" />,
    tags: ["JavaScript", "In-depth", "Modern"]
  },
  {
    title: "CSS Grid Garden",
    description: "Learn CSS Grid layout through an interactive game",
    url: "https://cssgridgarden.com/",
    icon: <Layout className="h-5 w-5 text-primary" />,
    tags: ["CSS", "Interactive", "Game"]
  },
  {
    title: "Flexbox Froggy",
    description: "Learn CSS Flexbox layout through an interactive game",
    url: "https://flexboxfroggy.com/",
    icon: <Layout className="h-5 w-5 text-primary" />,
    tags: ["CSS", "Interactive", "Game"]
  },
  {
    title: "Frontend Mentor",
    description: "Improve your front-end coding skills by building real projects",
    url: "https://www.frontendmentor.io/",
    icon: <Code className="h-5 w-5 text-primary" />,
    tags: ["Projects", "Frontend", "Challenges"]
  },
  {
    title: "Codecademy",
    description: "Interactive coding courses for various programming languages",
    url: "https://www.codecademy.com/",
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    tags: ["Interactive", "Courses", "Multiple Languages"]
  }
]

// Mock data for Tool resources
const toolResources = [
  {
    title: "VS Code",
    description: "Lightweight and powerful code editor",
    url: "https://code.visualstudio.com/",
    icon: <Code className="h-5 w-5 text-primary" />,
    tags: ["Editor", "Extensible", "Free"]
  },
  {
    title: "CodeSandbox",
    description: "Online code editor that helps you create and share web applications",
    url: "https://codesandbox.io/",
    icon: <Code className="h-5 w-5 text-primary" />,
    tags: ["Online IDE", "Collaboration", "Prototyping"]
  },
  {
    title: "GitHub",
    description: "Platform for version control and collaboration for code projects",
    url: "https://github.com/",
    icon: <Github className="h-5 w-5 text-primary" />,
    tags: ["Version Control", "Collaboration", "Repository"]
  },
  {
    title: "Figma",
    description: "Collaborative interface design tool",
    url: "https://www.figma.com/",
    icon: <Layout className="h-5 w-5 text-primary" />,
    tags: ["Design", "Prototyping", "Collaboration"]
  },
  {
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for rapidly building custom designs",
    url: "https://tailwindcss.com/",
    icon: <Layout className="h-5 w-5 text-primary" />,
    tags: ["CSS", "Framework", "Utility-First"]
  },
  {
    title: "Vercel",
    description: "Platform for frontend frameworks and static sites",
    url: "https://vercel.com/",
    icon: <Globe className="h-5 w-5 text-primary" />,
    tags: ["Deployment", "Hosting", "Frontend"]
  }
]

// Mock data for Community resources
const communityResources = [
  {
    title: "Stack Overflow",
    description: "Community for developers to learn and share programming knowledge",
    url: "https://stackoverflow.com/",
    icon: <Library className="h-5 w-5 text-primary" />,
    tags: ["Q&A", "Community", "Problem Solving"]
  },
  {
    title: "DEV Community",
    description: "Community of software developers who write articles and discuss code",
    url: "https://dev.to/",
    icon: <Code className="h-5 w-5 text-primary" />,
    tags: ["Articles", "Community", "Discussions"]
  },
  {
    title: "Reddit r/webdev",
    description: "Subreddit for web development topics and discussions",
    url: "https://www.reddit.com/r/webdev/",
    icon: <Globe className="h-5 w-5 text-primary" />,
    tags: ["Forum", "Community", "Discussions"]
  },
  {
    title: "CSS-Tricks Forums",
    description: "Forums to discuss CSS and web development",
    url: "https://css-tricks.com/forums/",
    icon: <Layout className="h-5 w-5 text-primary" />,
    tags: ["CSS", "Forum", "Help"]
  },
  {
    title: "Web Dev Discord",
    description: "Discord community for web developers",
    url: "https://discord.gg/web",
    icon: <Code className="h-5 w-5 text-primary" />,
    tags: ["Discord", "Chat", "Community"]
  },
  {
    title: "Hashnode",
    description: "Developer blogging platform and community",
    url: "https://hashnode.com/",
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    tags: ["Blogging", "Community", "Articles"]
  }
]