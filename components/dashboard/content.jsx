"use client"

import { useState } from "react"
import { AlertCircle, Users, BookOpen, TrendingUp } from "lucide-react"
import QuickActionCard from "./quick-action-card"
import StatCard from "./stat-card"
import FormationsList from "./formations-list"
import AttendanceTable from "./attendance-table"

export default function DashboardContent() {
  const [showAlert, setShowAlert] = useState(true)

  const today = new Date()
  const formattedDate = today.toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Alert Banner */}
      {showAlert && (
        <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="text-sm text-orange-800">
              <strong>Recordatorio:</strong> Registra la asistencia de TDS-2024-01 de hoy
            </p>
          </div>
          <button
            onClick={() => setShowAlert(false)}
            className="text-orange-600 hover:text-orange-800 font-bold focus-visible:outline-orange-400 focus-visible:outline-2"
            aria-label="Cerrar alerta"
          >
            ×
          </button>
        </div>
      )}

      {/* Greeting Section */}
      <section>
        <h1 className="text-4xl font-bold text-foreground mb-2">¡Bienvenido, Juan!</h1>
        <p className="text-muted-foreground capitalize">{formattedDate}</p>
      </section>

      {/* Quick Action Card */}
      <QuickActionCard />

      {/* Statistics Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={BookOpen} number="3" label="Formaciones Activas" color="green" />
          <StatCard icon={Users} number="87" label="Aprendices Totales" color="orange" />
          <StatCard icon={TrendingUp} number="92%" label="Asistencia Promedio" color="green" />
        </div>
      </section>

      {/* My Formations Section */}
      <FormationsList />

      {/* Recent Attendance Section */}
      <AttendanceTable />
    </div>
  )
}
