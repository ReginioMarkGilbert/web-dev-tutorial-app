import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { availableTutorials, tutorialCatalog, type TutorialSummary } from "@/data/tutorials"
import usePageTitle from "@/hooks/usePageTitle"
import useProgress from "@/hooks/useProgress"
import type { UserProgress } from "@/types/database"
import { BookOpen, Code, Flame, LucideIcon, Rocket, Trophy, Users } from "lucide-react"
import { useMemo } from "react"
import { Link } from "react-router-dom"

export default function DashboardPage() {
  usePageTitle('Dashboard')
  const { user } = useAuth()
  const { allProgress, loading } = useProgress()
  const username = user?.email?.split('@')[0] || 'User'
  const progressByTutorial = useMemo(() => mapProgressByTutorial(allProgress), [allProgress])
  const inProgressCourses = availableTutorials
    .filter((course) => {
      const progress = progressByTutorial.get(course.id)
      return progress && !progress.completed && progress.progress > 0
    })
    .sort((a, b) => getProgressValue(b, progressByTutorial) - getProgressValue(a, progressByTutorial))
  const completedCourses = tutorialCatalog.filter((course) => progressByTutorial.get(course.id)?.completed)
  const recommendedCourses = tutorialCatalog
    .filter((course) => !progressByTutorial.get(course.id)?.completed && !inProgressCourses.some((item) => item.id === course.id))
    .slice(0, 4)
  const nextCourse = inProgressCourses[0] || recommendedCourses.find((course) => course.available) || recommendedCourses[0]
  const completedCount = completedCourses.length
  const totalStarted = allProgress.length
  const averageProgress = tutorialCatalog.length === 0
    ? 0
    : Math.round(tutorialCatalog.reduce((sum, tutorial) => sum + getProgressValue(tutorial, progressByTutorial), 0) / tutorialCatalog.length)
  const streakDays = calculateStreak(allProgress)

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
            <span className="font-medium">{streakDays} day streak</span>
          </Button>
          <Button asChild disabled={!nextCourse?.available}>
            {nextCourse?.available ? (
              <Link to={nextCourse.link}>
                <Rocket className="mr-2 h-4 w-4" />
                Continue Learning
              </Link>
            ) : (
              <span>
                <Rocket className="mr-2 h-4 w-4" />
                Continue Learning
              </span>
            )}
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
            {inProgressCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                progress={getProgressValue(course, progressByTutorial)}
                status="inProgress"
              />
            ))}
          </div>
          <EmptyState show={!loading && inProgressCourses.length === 0} title="No lessons in progress yet" action="Start a tutorial to see it here." />
        </TabsContent>

        {/* Completed Tab */}
        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                progress={100}
                status="completed"
              />
            ))}
          </div>
          <EmptyState show={!loading && completedCourses.length === 0} title="No completed lessons yet" action="Finish a quiz to mark a lesson complete." />
        </TabsContent>

        {/* Recommended Tab */}
        <TabsContent value="recommended" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                progress={getProgressValue(course, progressByTutorial)}
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
            value={String(completedCount)}
            icon={Trophy}
            description={`${totalStarted} lesson${totalStarted === 1 ? "" : "s"} started`}
          />
          <StatCard
            title="Lesson Streak"
            value={`${streakDays} day${streakDays === 1 ? "" : "s"}`}
            icon={Flame}
            description={allProgress[0] ? `Last studied ${formatRelativeDate(allProgress[0].last_accessed)}` : "Start a lesson to build momentum"}
          />
          <StatCard
            title="Overall Progress"
            value={`${averageProgress}%`}
            icon={Users}
            description="Across the full catalog"
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
  course: TutorialSummary
  progress: number
  status: 'inProgress' | 'completed' | 'recommended'
}

function CourseCard({ course, progress, status }: CourseProps) {
  const { title, description, level, duration, modules, icon: Icon, link, available } = course

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
          asChild={available}
          disabled={!available}
        >
          {available ? (
            <Link to={link}>
              {status === 'inProgress' ? 'Continue' :
               status === 'completed' ? 'Review Course' : 'Start Learning'}
            </Link>
          ) : (
            "Coming Soon"
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

interface Event {
  id: string
  title: string
  description: string
  date: string
  type: 'webinar' | 'workshop'
}

function EmptyState({ show, title, action }: { show: boolean; title: string; action: string }) {
  if (!show) return null

  return (
    <Card>
      <CardContent className="py-8 text-center">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{action}</p>
      </CardContent>
    </Card>
  )
}

function mapProgressByTutorial(progress: UserProgress[]) {
  return new Map(progress.map((item) => [item.tutorial_id, item]))
}

function getProgressValue(course: TutorialSummary, progressByTutorial: Map<string, UserProgress>) {
  return progressByTutorial.get(course.id)?.progress || 0
}

function calculateStreak(progress: UserProgress[]) {
  const activeDays = new Set(progress.map((item) => new Date(item.last_accessed).toDateString()))
  let streak = 0
  const cursor = new Date()

  while (activeDays.has(cursor.toDateString())) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}

function formatRelativeDate(value: string) {
  const date = new Date(value)
  const diffDays = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86_400_000))

  if (diffDays === 0) return "today"
  if (diffDays === 1) return "yesterday"
  return `${diffDays} days ago`
}

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
