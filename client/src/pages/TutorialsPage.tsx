import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { tutorialCatalog, type TutorialSummary } from "@/data/tutorials"
import usePageTitle from "@/hooks/usePageTitle"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BookOpen, Code, Search, Sparkles } from "lucide-react"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

export default function TutorialsPage() {
  usePageTitle('Tutorials')
  const [query, setQuery] = useState("")
  const [difficulty, setDifficulty] = useState<TutorialFilter>("all")
  const filteredFrontendTutorials = useMemo(() => filterTutorials(tutorialCatalog.filter((tutorial) => tutorial.category === "Frontend"), query, difficulty), [query, difficulty])
  const filteredBackendTutorials = useMemo(() => filterTutorials(tutorialCatalog.filter((tutorial) => tutorial.category === "Backend"), query, difficulty), [query, difficulty])
  const filteredFullstackTutorials = useMemo(() => filterTutorials(tutorialCatalog.filter((tutorial) => tutorial.category === "Full Stack"), query, difficulty), [query, difficulty])

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
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div>
          <Select value={difficulty} onValueChange={(value) => setDifficulty(value as TutorialFilter)}>
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
          <Button size="lg" className="w-full md:w-auto" asChild>
            <Link to="/tutorial/javascript-variables">Start Learning Path</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Frontend section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Frontend Development</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFrontendTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
            />
          ))}
        </div>
        <EmptyTutorials isEmpty={filteredFrontendTutorials.length === 0} />
      </div>

      {/* Backend section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Backend Development</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBackendTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
            />
          ))}
        </div>
        <EmptyTutorials isEmpty={filteredBackendTutorials.length === 0} />
      </div>

      {/* Full Stack section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Full Stack Development</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFullstackTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
            />
          ))}
        </div>
        <EmptyTutorials isEmpty={filteredFullstackTutorials.length === 0} />
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
                  {tutorial.link ? (
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={tutorial.link}>View</Link>
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" disabled>
                      Coming soon
                    </Button>
                  )}
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
  tutorial: TutorialSummary
}

function TutorialCard({ tutorial }: TutorialCardProps) {
  const { title, description, level, duration, modules, icon: Icon, link, available } = tutorial

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
          asChild={available}
          disabled={!available}
        >
          {available ? (
            <Link to={link}>Start Learning</Link>
          ) : (
            "Coming Soon"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

type TutorialFilter = "all" | "beginner" | "intermediate" | "advanced"

function EmptyTutorials({ isEmpty }: { isEmpty: boolean }) {
  if (!isEmpty) return null

  return (
    <Card>
      <CardContent className="py-8 text-center text-sm text-muted-foreground">
        No tutorials match the current search and difficulty.
      </CardContent>
    </Card>
  )
}

function filterTutorials(tutorials: TutorialSummary[], query: string, difficulty: TutorialFilter) {
  const normalizedQuery = query.trim().toLowerCase()

  return tutorials.filter((tutorial) => {
    const matchesDifficulty = difficulty === "all" || tutorial.level.toLowerCase() === difficulty
    const searchable = [
      tutorial.title,
      tutorial.description,
      tutorial.level
    ].join(" ").toLowerCase()

    return matchesDifficulty && (!normalizedQuery || searchable.includes(normalizedQuery))
  })
}

const trendingTutorials = [
  {
    id: 'trend1',
    title: 'JavaScript Variables and Data Types',
    description: 'Learn how variables work and how JavaScript represents common data types',
    link: '/tutorial/javascript-variables'
  },
  {
    id: 'trend2',
    title: 'JavaScript Functions',
    description: 'Build reusable blocks of JavaScript with declarations, expressions, and arrows',
    link: '/tutorial/javascript-functions'
  },
  {
    id: 'trend3',
    title: 'React Server Components',
    description: 'Learn how to build efficient React apps with server components',
    link: null
  },
  {
    id: 'trend4',
    title: 'GraphQL API Development',
    description: 'Build flexible and powerful APIs with GraphQL',
    link: null
  },
  {
    id: 'trend5',
    title: 'Responsive Web Design with CSS Grid',
    description: 'Create modern layouts with CSS Grid Layout',
    link: null
  }
]
