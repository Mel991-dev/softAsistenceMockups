"use client"
import { useState, useEffect } from "react"
import Breadcrumb from "@/components/attendance/breadcrumb"
import SelectionPanel from "@/components/attendance/selection-panel"
import QuickActions from "@/components/attendance/quick-actions"
import AttendanceTable from "@/components/attendance/attendance-table"
import AttendanceListMobile from "@/components/attendance/attendance-list-mobile"
import AttendanceSummary from "@/components/attendance/attendance-summary"
import SuccessModal from "@/components/attendance/success-modal"

const mockAprendices = [
  { id: 1, documento: "123456789", nombre: "María Alejandra González Pérez", presente: true, observaciones: "" },
  { id: 2, documento: "234567890", nombre: "Juan Carlos Rodríguez Silva", presente: true, observaciones: "" },
  {
    id: 3,
    documento: "345678901",
    nombre: "Laura Fernanda López García",
    presente: false,
    observaciones: "Permiso médico",
  },
  { id: 4, documento: "456789012", nombre: "Diego Armando Martínez Gutiérrez", presente: true, observaciones: "" },
  { id: 5, documento: "567890123", nombre: "Sofía Isabel Ramírez Delgado", presente: true, observaciones: "" },
  { id: 6, documento: "678901234", nombre: "Carlos Andrés Sánchez Morales", presente: true, observaciones: "" },
  {
    id: 7,
    documento: "789012345",
    nombre: "Valentina Cruz Hernández",
    presente: false,
    observaciones: "Falta sin justificación",
  },
  { id: 8, documento: "890123456", nombre: "Felipe Alejandro Domínguez López", presente: true, observaciones: "" },
  { id: 9, documento: "901234567", nombre: "Catalina Moreno Álvarez", presente: true, observaciones: "" },
  { id: 10, documento: "012345678", nombre: "Andrés Felipe Castillo Vargas", presente: true, observaciones: "" },
]

export default function AttendancePage() {
  const [isMobile, setIsMobile] = useState(false)
  const [selectedFormacion, setSelectedFormacion] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [aprendices, setAprendices] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "s") {
          e.preventDefault()
          handleSave()
        } else if (e.key === "a") {
          e.preventDefault()
          if (e.shiftKey) {
            markAllAbsent()
          } else {
            markAllPresent()
          }
        }
      }
      if (e.key === "/" && !searchTerm) {
        e.preventDefault()
        document.getElementById("search-input")?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [aprendices, searchTerm])

  const handleCargar = () => {
    if (!selectedFormacion || !selectedDate) return
    setIsLoaded(true)
    setAprendices(mockAprendices)
  }

  const handleToggleAsistencia = (id) => {
    setAprendices((prev) => prev.map((a) => (a.id === id ? { ...a, presente: !a.presente } : a)))
  }

  const handleObservaciones = (id, obs) => {
    setAprendices((prev) => prev.map((a) => (a.id === id ? { ...a, observaciones: obs } : a)))
  }

  const markAllPresent = () => {
    setAprendices((prev) => prev.map((a) => ({ ...a, presente: true, observaciones: "" })))
  }

  const markAllAbsent = () => {
    setAprendices((prev) => prev.map((a) => ({ ...a, presente: false })))
  }

  const handleSave = () => {
    setShowSuccessModal(true)
  }

  const presentes = aprendices.filter((a) => a.presente).length
  const ausentes = aprendices.length - presentes
  const porcentaje = aprendices.length > 0 ? ((presentes / aprendices.length) * 100).toFixed(1) : 0

  const filteredAprendices = aprendices.filter(
    (a) => a.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || a.documento.includes(searchTerm),
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb />
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="text-3xl text-green-600">✓</div>
              <h1 className="text-4xl font-bold text-foreground">Registrar Asistencia</h1>
            </div>

            <SelectionPanel
              selectedFormacion={selectedFormacion}
              setSelectedFormacion={setSelectedFormacion}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onCargar={handleCargar}
              isLoading={false}
            />

            {isLoaded && aprendices.length > 0 && (
              <>
                <QuickActions
                  count={aprendices.length}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onMarkAllPresent={markAllPresent}
                  onMarkAllAbsent={markAllAbsent}
                />

                {isMobile ? (
                  <AttendanceListMobile
                    aprendices={filteredAprendices}
                    onToggleAsistencia={handleToggleAsistencia}
                    onObservaciones={handleObservaciones}
                  />
                ) : (
                  <AttendanceTable
                    aprendices={filteredAprendices}
                    onToggleAsistencia={handleToggleAsistencia}
                    onObservaciones={handleObservaciones}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {isLoaded && aprendices.length > 0 && (
        <AttendanceSummary
          presentes={presentes}
          ausentes={ausentes}
          porcentaje={porcentaje}
          total={aprendices.length}
          onSave={handleSave}
          onCancel={() => {
            setIsLoaded(false)
            setAprendices([])
          }}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          formacion={selectedFormacion}
          fecha={selectedDate}
          onClose={() => setShowSuccessModal(false)}
          onRegisterOther={() => {
            setShowSuccessModal(false)
            setIsLoaded(false)
            setAprendices([])
            setSelectedFormacion("")
          }}
        />
      )}
    </div>
  )
}
