import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import useProfile from "@/hooks/useProfile"
import useProgress from "@/hooks/useProgress"
import { BookOpen, Calendar, ChevronRight, Code, Edit, Github, Globe, Mail, Moon, Save } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
  const { user } = useAuth()
  const { profile, loading: profileLoading, updateProfile } = useProfile()
  const { progress, loading: progressLoading } = useProgress()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: profile?.full_name || "",
    email: user?.email || "",
    website: profile?.website || "",
    github: profile?.github || "",
    bio: profile?.bio || ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    if (profile?.id) {
      await updateProfile({
        full_name: formData.name,
        website: formData.website,
        github: formData.github,
        bio: formData.bio
      })
      setIsEditing(false)
    }
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U'
  }

  if (profileLoading || progressLoading) {
    return <div className="flex items-center justify-center min-h-[80vh]">Loading profile...</div>
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and track your progress
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="progress">Learning Progress</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Overview Card */}
            <Card className="md:col-span-1">
              <CardHeader className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{profile?.full_name || user?.email?.split('@')[0]}</h2>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="gap-2"
                  >
                    {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user?.email}</span>
                  </div>
                  {profile?.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {profile.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  {profile?.github && (
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-muted-foreground" />
                      <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {profile.github}
                      </a>
                    </div>
                  )}
                </div>
                {profile?.bio && (
                  <div className="mt-4 pt-4 border-t">
                    <h3 className="text-sm font-medium mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">{profile.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Profile Form Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information and manage how others see you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled={true}
                  />
                  <p className="text-xs text-muted-foreground">Your email is managed through your authentication provider.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Username</Label>
                  <Input
                    id="github"
                    name="github"
                    placeholder="yourusername"
                    value={formData.github}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    name="bio"
                    placeholder="Tell us a bit about yourself"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
              <CardFooter>
                {isEditing && (
                  <div className="flex gap-2 w-full">
                    <Button onClick={handleSaveProfile} className="w-full">Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="w-full">Cancel</Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress">
          <div className="grid grid-cols-1 gap-6">
            {/* Overall Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>
                  Track your progress across all learning paths
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Overall Completion</span>
                    <span className="text-sm font-medium">
                      {progress?.overall_percentage || 0}%
                    </span>
                  </div>
                  <Progress value={progress?.overall_percentage || 0} />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Course Progress</h3>

                  <div className="space-y-4">
                    <ProgressItem
                      title="JavaScript Fundamentals"
                      completedModules={progress?.javascript_completed || 0}
                      totalModules={12}
                      lastActivity="2 days ago"
                      icon={<Code className="h-5 w-5" />}
                    />

                    <ProgressItem
                      title="React Essentials"
                      completedModules={progress?.react_completed || 0}
                      totalModules={10}
                      lastActivity="1 week ago"
                      icon={<Code className="h-5 w-5" />}
                    />

                    <ProgressItem
                      title="HTML & CSS Mastery"
                      completedModules={progress?.html_css_completed || 0}
                      totalModules={8}
                      lastActivity="3 weeks ago"
                      icon={<Code className="h-5 w-5" />}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recent Activity</h3>

                  <div className="space-y-3">
                    <ActivityItem
                      title="Completed 'JavaScript Variables and Data Types'"
                      timestamp="2 days ago"
                      icon={<BookOpen className="h-4 w-4" />}
                    />

                    <ActivityItem
                      title="Completed 'Functions and Scope'"
                      timestamp="2 days ago"
                      icon={<BookOpen className="h-4 w-4" />}
                    />

                    <ActivityItem
                      title="Started 'JavaScript Arrays and Objects'"
                      timestamp="1 week ago"
                      icon={<Calendar className="h-4 w-4" />}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Manage your account preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme Settings</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <span>Dark Mode</span>
                    </div>
                    <Switch id="dark-mode" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive course updates and announcements</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="progress-reminders">Progress Reminders</Label>
                        <p className="text-xs text-muted-foreground">Receive reminders about your learning progress</p>
                      </div>
                      <Switch id="progress-reminders" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-courses">New Course Alerts</Label>
                        <p className="text-xs text-muted-foreground">Get notified when new courses are available</p>
                      </div>
                      <Switch id="new-courses" defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Settings</h3>
                  <Button variant="destructive">Delete Account</Button>
                  <p className="text-xs text-muted-foreground">
                    This will permanently delete your account and remove all your data from our servers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ProgressItemProps {
  title: string
  completedModules: number
  totalModules: number
  lastActivity: string
  icon: React.ReactNode
}

function ProgressItem({ title, completedModules, totalModules, lastActivity, icon }: ProgressItemProps) {
  const percentage = Math.round((completedModules / totalModules) * 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-md">
            {icon}
          </div>
          <div>
            <h4 className="text-sm font-medium">{title}</h4>
            <p className="text-xs text-muted-foreground">Last activity: {lastActivity}</p>
          </div>
        </div>
        <Badge variant="outline" className="ml-auto">
          {completedModules}/{totalModules} modules
        </Badge>
      </div>
      <div className="space-y-1">
        <Progress value={percentage} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{percentage}% complete</span>
          <span>{completedModules} of {totalModules} completed</span>
        </div>
      </div>
    </div>
  )
}

interface ActivityItemProps {
  title: string
  timestamp: string
  icon: React.ReactNode
}

function ActivityItem({ title, timestamp, icon }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-muted p-2 rounded-full">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}