import BrandLogo from "@/components/BrandLogo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import usePageTitle from "@/hooks/usePageTitle";
import { ArrowRight, BookOpen, Code, Database, Layers, Layout, Terminal, ThumbsUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  usePageTitle();
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-6xl">
          <div className="flex items-center">
            <BrandLogo />
            <nav className="hidden md:flex items-center gap-6 text-sm">
                <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
                <a href="#learning-paths" className="text-sm font-medium hover:text-primary transition-colors">Learning Paths</a>
                <Link to="/tutorials" className="text-sm font-medium hover:text-primary transition-colors">Tutorials</Link>
                <Link to="/resources" className="text-sm font-medium hover:text-primary transition-colors">Resources</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Master Web Development with Interactive Tutorials
            </h1>
            <p className="text-muted-foreground md:text-xl/relaxed max-w-2xl mx-auto">
              From frontend to backend, learn all the skills you need to become a professional web developer through guided, project-based tutorials.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/tutorials">
                Explore Tutorials <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/auth">Sign Up Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Why Learn With Us?</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Our platform offers a comprehensive, hands-on approach to web development
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="h-8 w-8" />}
              title="Guided Lessons"
              description="Learn core concepts through focused lessons, examples, and knowledge checks."
            />
            <FeatureCard
              icon={<Layers className="h-8 w-8" />}
              title="Full Stack Curriculum"
              description="From HTML & CSS to Node.js and databases - learn the complete web stack."
            />
            <FeatureCard
              icon={<Layout className="h-8 w-8" />}
              title="Modern Frameworks"
              description="Master the latest technologies like React, Next.js, and more."
            />
            <FeatureCard
              icon={<ThumbsUp className="h-8 w-8" />}
              title="Best Practices"
              description="Learn industry-standard patterns and professional workflows."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Community Support"
              description="Connect with fellow learners and get help when you need it."
            />
            <FeatureCard
              icon={<Terminal className="h-8 w-8" />}
              title="Project-Based Learning"
              description="Build real projects that you can add to your portfolio."
            />
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section id="learning-paths" className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Learning Paths</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Structured curriculums to guide your web development journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-background">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                  <Layout className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Frontend Development</CardTitle>
                <CardDescription>Master UI/UX with modern frontend technologies</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Learn HTML, CSS, JavaScript, React, and other essential frontend technologies to create beautiful, responsive websites.</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    HTML & CSS Fundamentals
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    JavaScript Programming
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    React Framework
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/tutorials">Explore Path</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-background border-primary">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Full Stack Development</CardTitle>
                <CardDescription>The complete web development experience</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Master both frontend and backend technologies to build complete, production-ready web applications.</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    Frontend Fundamentals
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    Backend with Node.js
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    Database Design & API Development
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to="/tutorials">Explore Path</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-background">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Backend Development</CardTitle>
                <CardDescription>Power your applications with robust backends</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Focus on server-side technologies, APIs, databases, and cloud services to build powerful backends.</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    Node.js & Express
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    Database Systems (SQL & NoSQL)
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    API Design & Authentication
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/tutorials">Explore Path</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">What Our Students Say</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Join thousands of successful developers who started their journey with us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The project-based approach helped me build a portfolio while learning. I landed my first developer job after completing the full stack path!"
              author="Sarah K."
              role="Frontend Developer"
            />
            <TestimonialCard
              quote="Clear explanations and practical examples make complex topics easy to understand. The JavaScript fundamentals course was exactly what I needed."
              author="Michael T."
              role="Software Engineer"
            />
            <TestimonialCard
              quote="I tried many platforms, but this one stands out with its interactive approach and community support. Worth every minute invested!"
              author="Jessica L."
              role="Web Developer"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 mx-auto text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter">Ready to Start Your Web Development Journey?</h2>
            <p className="md:text-xl/relaxed">
              Join our community of learners and build the skills for your future career
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth">Sign Up Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent" asChild>
              <Link to="/tutorials">Explore Tutorials</Link>
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/80">No credit card required. Start learning today.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-muted border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/tutorials" className="hover:underline">Tutorials</Link></li>
                <li><Link to="/resources" className="hover:underline">Resources</Link></li>
                <li><Link to="/auth" className="hover:underline">Sign In</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Learning Paths</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#learning-paths" className="hover:underline">Frontend Development</a></li>
                <li><a href="#learning-paths" className="hover:underline">Full Stack Development</a></li>
                <li><a href="#learning-paths" className="hover:underline">Backend Development</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Trusted Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">MDN Web Docs</a></li>
                <li><a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="hover:underline">React Documentation</a></li>
                <li><a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer" className="hover:underline">TypeScript Handbook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {currentYear} Web Dev Tutorials. All rights reserved.</p>
            <div className="flex items-center mt-4 sm:mt-0">
              <BookOpen className="h-5 w-5 mr-2" />
              <p className="text-sm font-medium">Web Dev Tutorials</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full flex flex-col items-center text-center">
      <CardContent className="pt-6 flex flex-col items-center space-y-3">
        <div className="p-3 bg-primary/10 rounded-full">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 pt-6">
        <div className="mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-500 inline-block">
              ★
            </span>
          ))}
        </div>
        <p className="text-muted-foreground italic mb-4">"{quote}"</p>
      </CardContent>
      <CardFooter className="border-t pt-4 flex flex-col items-start">
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </CardFooter>
    </Card>
  )
}
