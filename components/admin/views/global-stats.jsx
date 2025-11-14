"use client"

import { Activity, Users, BookOpen, TrendingUp, Database } from "lucide-react"

export default function GlobalStats() {
  const kpis = [
    { label: "Total Usuarios", value: "1,245", icon: Users, trend: "+12%" },
    { label: "Activos (30 días)", value: "987", icon: Activity, trend: "+8%" },
    { label: "Total Formaciones", value: "42", icon: BookOpen, trend: "+3%" },
    { label: "Total Aprendices", value: "2,156", icon: Users, trend: "+15%" },
    { label: "Registros Asistencia", value: "15.2K", icon: TrendingUp, trend: "+5%" },
    { label: "Almacenamiento Used", value: "245 MB", icon: Database, trend: "-2%" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Estadísticas Globales</h2>
        <p className="text-sm text-muted-foreground mt-1">Dashboard administrativo del sistema</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          const isPositive = kpi.trend.startsWith("+")
          return (
            <div key={idx} className="bg-card border border-border rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Icon size={20} className="text-primary" />
                </div>
                <span className={`text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                  {kpi.trend}
                </span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Table */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold mb-4">Salud del Sistema</h3>
          <div className="space-y-3">
            {[
              { label: "Tiempo de respuesta API", value: "145ms", status: "good" },
              { label: "Uptime", value: "99.98%", status: "good" },
              { label: "Errores (24h)", value: "2", status: "good" },
              { label: "DB Size", value: "3.2 GB", status: "good" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between pb-3 border-b border-border last:border-b-0 last:pb-0"
              >
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold mb-4">Últimas Actividades</h3>
          <div className="space-y-3">
            {[
              "María González realizó exportación a Google Sheets",
              "Sistema completó backup automático (245 MB)",
              "Juan Pérez cambió configuración de parámetros de asistencia",
              "Nuevo usuario agregado: Laura Martínez",
              "Carlos Rodríguez inició sesión desde 192.168.1.100",
            ].map((activity, idx) => (
              <div key={idx} className="text-sm text-foreground pb-3 border-b border-border last:border-b-0 last:pb-0">
                {activity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
