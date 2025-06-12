import { Navbar } from "./components/Navbar"
import { ThemeProvider } from "./components/theme-provider"
import "./index.css"
import "./output.css"
import LandingPage from "./pages/LandingPage"

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        <LandingPage />
      </div>
    </ThemeProvider>
  )
}

export default App
