import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { LogOut, Menu, Settings, User, X } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate("/")
      toast.success("Signed out successfully")
    } catch (error) {
      console.error("Sign out failed:", error)
      toast.error("Failed to sign out. Please try again.")
    }
  }

  // Define navigation links
  const navLinks = [
    // Only show Home link when user is not logged in
    ...(user ? [] : [{ href: "/", label: "Home" }]),
    { href: "/dashboard", label: "Dashboard", requiresAuth: true },
    { href: "/tutorials", label: "Tutorials" },
    { href: "/resources", label: "Resources" }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-6xl">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
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
              <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
            </svg>
            <span className="font-bold">Web Dev Tutorials</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map(link => {
              // Only show dashboard link if user is authenticated
              if (link.requiresAuth && !user) return null;

              const isActive = location.pathname === link.href ||
                              (link.href !== "/" && location.pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`transition-colors ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-foreground/60 hover:text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.map(link => {
                  // Only show dashboard link if user is authenticated
                  if (link.requiresAuth && !user) return null;

                  const isActive = location.pathname === link.href ||
                                  (link.href !== "/" && location.pathname.startsWith(link.href));

                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`py-2 transition-colors text-base ${
                        isActive
                          ? "text-foreground font-medium"
                          : "text-foreground/60 hover:text-foreground/80"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                {user && (
                  <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full mt-2">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile?tab=settings" className="cursor-pointer w-full flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}