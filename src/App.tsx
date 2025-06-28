import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { toast, Toaster } from "sonner"
import ChatButton from "./components/ChatButton"
import Navbar from "./components/Navbar"
import { ThemeProvider } from "./components/theme-provider"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import "./index.css"
import AuthPage from "./pages/AuthPage"
import DashboardPage from "./pages/DashboardPage"
import JavaScriptFundamentalsPage from "./pages/JavaScriptFundamentalsPage"
import LandingPage from "./pages/LandingPage"
import ProfilePage from "./pages/ProfilePage"
import ResourcesPage from "./pages/ResourcesPage"
import TutorialDetailPage from "./pages/TutorialDetailPage"
import TutorialsPage from "./pages/TutorialsPage"
import NotFound from './pages/NotFound'

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    toast.error("You must be logged in to access this page.")
    return <Navigate to="/auth" replace />
  }

  return <>{children}</>
}

// Chat Button wrapper to conditionally render based on route
const ConditionalChatButton = () => {
  const location = useLocation()
  const currentPath = location.pathname

  // Hide on landing page and auth page
  if (currentPath === '/' || currentPath === '/auth') {
    return null
  }

  return <ChatButton />
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-background antialiased">
          <LandingPage />
        </div>
      } />
      <Route path="/auth" element={
        !user ? (
          <div className="min-h-screen bg-background antialiased">
            <AuthPage />
          </div>
        ) : <Navigate to="/dashboard" replace />
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-background antialiased">
            <Navbar />
            <DashboardPage />
          </div>
        </ProtectedRoute>
      } />
      <Route path="/javascript-fundamentals" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-background antialiased">
            <Navbar />
            <JavaScriptFundamentalsPage />
          </div>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-background antialiased">
            <Navbar />
            <ProfilePage />
          </div>
        </ProtectedRoute>
      } />
      <Route path="/tutorials" element={
        <div className="min-h-screen bg-background antialiased">
          <Navbar />
          <TutorialsPage />
        </div>
      } />
      <Route path="/tutorial/:tutorialId" element={
        <div className="min-h-screen bg-background antialiased">
          <Navbar />
          <TutorialDetailPage />
        </div>
      } />
      <Route path="/resources" element={
        <div className="min-h-screen bg-background antialiased">
          <Navbar />
          <ResourcesPage />
        </div>
      } />
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system">
        <AuthProvider>
          <Toaster richColors position="top-right" />
          <AppRoutes />
          <ConditionalChatButton />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
