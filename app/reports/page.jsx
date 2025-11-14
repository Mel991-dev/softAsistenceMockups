"use client"
import { useState } from "react"
import ReportsHeader from "@/components/reports/header"
import FilterBar from "@/components/reports/filter-bar"
import KpiCards from "@/components/reports/kpi-cards"
import AttendanceTrendChart from "@/components/reports/attendance-trend"
import SecondaryChartsGrid from "@/components/reports/secondary-charts"
import FormationsDetailTable from "@/components/reports/formations-table"
import AlertsSection from "@/components/reports/alerts-section"
import ExportModal from "@/components/reports/export-modal"
import ExportHistory from "@/components/reports/export-history"

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    period: "month",
    startDate: new Date(2025, 10, 1),
    endDate: new Date(2025, 10, 30),
    formations: [],
    instructor: "",
  })

  const [showExportModal, setShowExportModal] = useState(false)
  const [chartView, setChartView] = useState("daily")
  const [isLoading, setIsLoading] = useState(false)

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 800)
  }

  const handleExportClick = () => {
    setShowExportModal(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <ReportsHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          {/* Filtros principales */}
          <FilterBar onApplyFilters={handleFilterApply} onExportClick={handleExportClick} />

          {/* KPIs principales */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-40 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <KpiCards filters={filters} />
          )}

          {/* Gráfico de tendencia */}
          {isLoading ? (
            <div className="mb-6 h-80 bg-muted rounded-lg animate-pulse" />
          ) : (
            <AttendanceTrendChart filters={filters} chartView={chartView} onViewChange={setChartView} />
          )}

          {/* Gráficos secundarios */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="h-80 bg-muted rounded-lg animate-pulse" />
              <div className="h-80 bg-muted rounded-lg animate-pulse" />
            </div>
          ) : (
            <SecondaryChartsGrid filters={filters} />
          )}

          {/* Tabla de formaciones detallada */}
          {isLoading ? (
            <div className="mb-6 h-96 bg-muted rounded-lg animate-pulse" />
          ) : (
            <FormationsDetailTable filters={filters} />
          )}

          {/* Sección de alertas */}
          {!isLoading && <AlertsSection />}

          {/* Historial de exportaciones */}
          {!isLoading && <ExportHistory />}
        </div>
      </div>

      {/* Modal de exportación */}
      {showExportModal && <ExportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />}
    </div>
  )
}
