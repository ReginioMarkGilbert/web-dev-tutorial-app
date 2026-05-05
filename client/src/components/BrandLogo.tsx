import { Code } from "lucide-react"
import { Link } from "react-router-dom"

export default function BrandLogo() {
  return (
    <Link to="/" className="mr-6 flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Code className="h-4 w-4" />
      </span>
      <span className="font-bold">Web Dev Tutorials</span>
    </Link>
  )
}
