import { ChevronRight, Home } from "lucide-react"

export default function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Home size={16} />
      <span>Dashboard</span>
      <ChevronRight size={16} />
      <span className="text-foreground font-medium">Aprendices</span>
    </div>
  )
}
