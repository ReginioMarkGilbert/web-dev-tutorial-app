import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6 max-w-6xl">
        <div className="flex items-center">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m15 12-5-4v8l5-4Z" />
            </svg>
            <span className="font-bold">Web3 Tutorials</span>
          </a>
          <nav className="hidden md:flex gap-6">
            <a className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground" href="/tutorials">
              Tutorials
            </a>
            <a className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground" href="/docs">
              Documentation
            </a>
            <a className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground" href="/examples">
              Examples
            </a>
            <a className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground" href="/community">
              Community
            </a>
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <Button variant="outline" size="sm" className="hidden md:flex">
            Sign In
          </Button>
          <Button size="sm" className="hidden md:flex">
            Get Started
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}