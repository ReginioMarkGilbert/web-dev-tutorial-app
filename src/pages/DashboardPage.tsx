import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { BookOpen, Code, Database, Flame, Layout, LucideIcon, Rocket, Sparkles, Trophy, Users } from "lucide-react"
import { Link } from "react-router-dom"

export default function DashboardPage() {
  const { user } = useAuth()
  const username = user?.email?.split('@')[0] || 'User'

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8 max-w-6xl">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {username}!</h1>
          <p className="text-muted-foreground mt-1">
            Track your learning progress and continue your web development journey
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Flame className="mr-2 h-4 w-4 text-orange-500" />
            <span className="font-medium">3 day streak</span>
          </Button>
          <Button>
            <Rocket className="mr-2 h-4 w-4" />
            Continue Learning
          </Button>
        </div>
      </div>

      {/* Dashboard tabs */}
      <Tabs defaultValue="inProgress" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>

        {/* In Progress Tab */}
        <TabsContent value="inProgress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockInProgressCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                status="inProgress"
              />
            ))}
          </div>
        </TabsContent>

        {/* Completed Tab */}
        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCompletedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                status="completed"
              />
            ))}
          </div>
        </TabsContent>

        {/* Recommended Tab */}
        <TabsContent value="recommended" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockRecommendedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                status="recommended"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Stats Section */}
      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-4">Your Learning Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Courses Completed"
            value="2"
            icon={Trophy}
            description="Keep up the momentum!"
          />
          <StatCard
            title="Lesson Streak"
            value="3 days"
            icon={Flame}
            description="Last studied yesterday"
          />
          <StatCard
            title="Community Rank"
            value="#138"
            icon={Users}
            description="Top 15% of learners"
          />
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-4">Upcoming Web Dev Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge variant={event.type === 'workshop' ? 'default' : 'secondary'}>
                    {event.type}
                  </Badge>
                </div>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">Add to Calendar</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

interface CourseProps {
  course: Course
  status: 'inProgress' | 'completed' | 'recommended'
}

function CourseCard({ course, status }: CourseProps) {
  const { title, description, progress, level, duration, modules, icon: Icon, link } = course

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge variant={
            level === 'Beginner' ? 'outline' :
            level === 'Intermediate' ? 'secondary' :
            'destructive'
          }>
            {level}
          </Badge>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {status === 'inProgress' && (
            <>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </>
          )}
          <div className="flex justify-between text-sm text-muted-foreground">
            <div>
              <BookOpen className="h-4 w-4 inline mr-1" />
              {modules} modules
            </div>
            <div>
              <Code className="h-4 w-4 inline mr-1" />
              {duration}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={status === 'completed' ? 'outline' : 'default'}
          asChild={!!link}
        >
          {link ? (
            <Link to={link}>
              {status === 'inProgress' ? 'Continue' :
               status === 'completed' ? 'Review Course' : 'Start Learning'}
            </Link>
          ) : (
            status === 'inProgress' ? 'Continue' :
            status === 'completed' ? 'Review Course' : 'Start Learning'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
}

function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

interface Course {
  id: string
  title: string
  description: string
  progress: number
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  modules: number
  icon: LucideIcon
  link?: string
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  type: 'webinar' | 'workshop'
}

// Mock data
const mockInProgressCourses: Course[] = [
  {
    id: '1',
    title: 'Modern JavaScript Fundamentals',
    description: 'Master JavaScript ES6+ features, async programming, and DOM manipulation',
    progress: 65,
    level: 'Intermediate',
    duration: '8 hours',
    modules: 12,
    icon: Code,
    link: '/javascript-fundamentals'
  },
  {
    id: '2',
    title: 'Responsive Web Design',
    description: 'Create beautiful, responsive layouts with CSS Grid and Flexbox',
    progress: 23,
    level: 'Beginner',
    duration: '6 hours',
    modules: 8,
    icon: Layout
  }
]

const mockCompletedCourses: Course[] = [
  {
    id: '3',
    title: 'HTML & CSS Basics',
    description: 'Core concepts of HTML5 and CSS3 for building modern websites',
    progress: 100,
    level: 'Beginner',
    duration: '4 hours',
    modules: 6,
    icon: BookOpen
  },
  {
    id: '4',
    title: 'Git & GitHub Fundamentals',
    description: 'Master version control and collaborative development workflows',
    progress: 100,
    level: 'Beginner',
    duration: '3 hours',
    modules: 5,
    icon: Users
  }
]

const mockRecommendedCourses: Course[] = [
  {
    id: '5',
    title: 'React.js: Building Modern UIs',
    description: 'Build dynamic user interfaces with React hooks, context and custom components',
    progress: 0,
    level: 'Intermediate',
    duration: '10 hours',
    modules: 15,
    icon: Sparkles
  },
  {
    id: '6',
    title: 'Node.js & Express Backend',
    description: 'Create robust REST APIs and server-side applications with Node.js',
    progress: 0,
    level: 'Advanced',
    duration: '8 hours',
    modules: 10,
    icon: Database
  }
]

const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Modern CSS Techniques',
    description: 'Learn about CSS custom properties, container queries, and new layout techniques for modern websites.',
    date: 'June 15, 2023 • 2:00 PM EST',
    type: 'webinar'
  },
  {
    id: 'e2',
    title: 'Building with Next.js 14',
    description: 'Hands-on workshop for building full-stack applications with Next.js, React Server Components and the App Router.',
    date: 'June 22, 2023 • 1:00 PM EST',
    type: 'workshop'
  }
]