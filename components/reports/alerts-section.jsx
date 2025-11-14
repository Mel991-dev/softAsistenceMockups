import { AlertCircle, Info, AlertTriangle } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "critical",
    message: "TDS-2024-01 tiene 3 aprendices sin asistencia registrada hoy",
    timestamp: "Hace 2 horas",
    icon: AlertCircle,
  },
  {
    id: 2,
    type: "warning",
    message: "ADM-2024-02: 5 aprendices con asistencia < 75%",
    timestamp: "Hace 4 horas",
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "info",
    message: "Reporte de noviembre disponible para exportación",
    timestamp: "Hace 6 horas",
    icon: Info,
  },
]

function AlertItem({ alert }) {
  const Icon = alert.icon
  let bgColor = "bg-red-50"
  let iconColor = "text-red-600"
  let borderColor = "border-red-200"

  if (alert.type === "warning") {
    bgColor = "bg-orange-50"
    iconColor = "text-orange-600"
    borderColor = "border-orange-200"
  } else if (alert.type === "info") {
    bgColor = "bg-blue-50"
    iconColor = "text-blue-600"
    borderColor = "border-blue-200"
  }

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4 mb-3 flex items-start gap-4`}>
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        <p className="text-foreground font-medium mb-1">{alert.message}</p>
        <p className="text-sm text-muted-foreground">{alert.timestamp}</p>
      </div>
      <a href="#" className="text-primary hover:underline text-sm font-semibold flex-shrink-0">
        Ver
      </a>
    </div>
  )
}

export default function AlertsSection() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-foreground mb-4">Alertas y Notificaciones</h3>
      <div>
        {alerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  )
}
