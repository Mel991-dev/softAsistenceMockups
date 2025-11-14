"use client"
import { useState } from "react"
import { Filter } from "lucide-react"

export default function FilterBar({ onApplyFilters, onExportClick }) {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedFormations, setSelectedFormations] = useState([])
  const [selectedInstructor, setSelectedInstructor] = useState("")
  const [showFormationDropdown, setShowFormationDropdown] = useState(false)
  const [showInstructorDropdown, setShowInstructorDropdown] = useState(false)

  const formations = [
    { id: 1, name: "TDS-2024-01" },
    { id: 2, name: "ADM-2024-02" },
    { id: 3, name: "SST-2024-03" },
    { id: 4, name: "MKT-2024-04" },
  ]

  const instructors = [
    { id: 1, name: "Carlos García" },
    { id: 2, name: "María López" },
    { id: 3, name: "Juan Rodríguez" },
  ]

  const handleApplyFilters = () => {
    onApplyFilters({
      period: selectedPeriod,
      formations: selectedFormations,
      instructor: selectedInstructor,
    })
  }

  const toggleFormation = (id) => {
    setSelectedFormations((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Selector de período */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Período</label>
          <div className="flex flex-wrap gap-2">
            {["Hoy", "Esta Semana", "Este Mes", "Personalizado"].map((label, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPeriod(label.toLowerCase().replace(" ", "-"))}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedPeriod === label.toLowerCase().replace(" ", "-")
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Selector de formación */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Formación</label>
          <div className="relative">
            <button
              onClick={() => setShowFormationDropdown(!showFormationDropdown)}
              className="w-full px-4 py-2 text-left bg-background border border-border rounded-md text-foreground hover:bg-muted transition-colors"
            >
              {selectedFormations.length === 0 ? "Todas las formaciones" : `${selectedFormations.length} seleccionadas`}
            </button>
            {showFormationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-10">
                {formations.map((f) => (
                  <label key={f.id} className="flex items-center gap-2 px-4 py-2 hover:bg-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFormations.includes(f.id)}
                      onChange={() => toggleFormation(f.id)}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-foreground">{f.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selector de instructor */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Instructor</label>
          <div className="relative">
            <button
              onClick={() => setShowInstructorDropdown(!showInstructorDropdown)}
              className="w-full px-4 py-2 text-left bg-background border border-border rounded-md text-foreground hover:bg-muted transition-colors"
            >
              {selectedInstructor || "Todos los instructores"}
            </button>
            {showInstructorDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    setSelectedInstructor("")
                    setShowInstructorDropdown(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-muted text-foreground"
                >
                  Todos
                </button>
                {instructors.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => {
                      setSelectedInstructor(i.name)
                      setShowInstructorDropdown(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-muted text-foreground"
                  >
                    {i.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Botón Aplicar */}
        <div className="flex items-end">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Botón Exportar a Google Sheets */}
      <div className="flex justify-end">
        <button
          onClick={onExportClick}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2 px-6 rounded-md transition-colors"
        >
          Exportar a Google Sheets
        </button>
      </div>
    </div>
  )
}
