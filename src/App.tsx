import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import { Navbar } from "./components/Navbar"
import { ThemeProvider } from "./components/theme-provider"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import "./index.css"
import AuthPage from "./pages/AuthPage"
import LandingPage from "./pages/LandingPage"

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-background antialiased">
          <Navbar />
          <LandingPage />
        </div>
      } />
      <Route path="/auth" element={
        !user ? (
          <div className="min-h-screen bg-background antialiased">
            <Navbar />
            <AuthPage />
          </div>
        ) : <Navigate to="/dashboard" replace />
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-background antialiased">
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-6xl">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="mt-4">Welcome to your Web3 Tutorial Dashboard</p>
            </div>
          </div>
        </ProtectedRoute>
      } />
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
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
