import { TrendingUp, BookOpen, Users, AlertCircle } from "lucide-react"

export default function KpiCards({ filters }) {
  const kpis = [
    {
      title: "Asistencia Promedio Global",
      value: "89.5%",
      icon: TrendingUp,
      trend: "+2.3%",
      trendPositive: true,
      sparkline: [75, 78, 82, 80, 85, 88, 89, 91, 87, 89.5],
      backgroundColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Formaciones Activas",
      value: "12",
      icon: BookOpen,
      detail: "3 nuevas este mes",
      backgroundColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Aprendices Matriculados",
      value: "324",
      icon: Users,
      detail: "15 nuevos este mes",
      backgroundColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Aprendices con Baja Asistencia",
      value: "18",
      icon: AlertCircle,
      detail: "< 70% de asistencia",
      backgroundColor: "bg-red-50",
      textColor: "text-red-600",
      hasLink: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon
        return (
          <div key={idx} className={`${kpi.backgroundColor} border border-border rounded-lg p-6`}>
            <div className="flex items-start justify-between mb-4">
              <Icon className={`w-8 h-8 ${kpi.textColor}`} />
              {kpi.trend && (
                <span
                  className={`text-sm font-semibold flex items-center gap-1 ${kpi.trendPositive ? "text-green-600" : "text-red-600"}`}
                >
                  {kpi.trend}
                  <TrendingUp className="w-4 h-4" />
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm font-medium mb-2">{kpi.title}</p>
            <p className={`text-3xl md:text-4xl font-bold ${kpi.textColor} mb-3`}>{kpi.value}</p>
            {kpi.detail && <p className="text-sm text-muted-foreground">{kpi.detail}</p>}
            {kpi.hasLink && (
              <a href="#" className="text-sm font-semibold text-primary hover:underline mt-2 inline-block">
                Ver lista completa
              </a>
            )}
          </div>
        )
      })}
    </div>
  )
}
