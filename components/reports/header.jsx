import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function ReportsHeader() {
  return (
    <div className="bg-card border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <Link href="/dashboard" className="text-primary hover:underline">
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground font-medium">Reportes</span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Reportes y Estadísticas</h1>
          <p className="text-muted-foreground text-lg">Vista general de asistencia</p>
          <p className="text-sm font-semibold text-primary">Noviembre 2025</p>
        </div>
      </div>
    </div>
  )
}
