"use client"
import { useRef, useEffect } from "react"

export default function SelectionPanel({
  selectedFormacion,
  setSelectedFormacion,
  selectedDate,
  setSelectedDate,
  onCargar,
  isLoading,
}) {
  const formacionRef = useRef(null)

  useEffect(() => {
    formacionRef.current?.focus()
  }, [])

  const formaciones = [
    { id: "TDS-2024-01", label: "TDS-2024-01 - Tecnólogo en Desarrollo de Software (Mañana)" },
    { id: "TAI-2024-02", label: "TAI-2024-02 - Técnico en Asistencia Administrativa (Tarde)" },
  ]

  const isFormValid = selectedFormacion && selectedDate

  return (
    <div className="bg-white border-l-4 border-l-green-600 rounded-lg p-6 mb-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* Formación */}
        <div>
          <label htmlFor="formacion" className="block text-sm font-medium text-foreground mb-2">
            Formación <span className="text-red-500">*</span>
          </label>
          <select
            ref={formacionRef}
            id="formacion"
            value={selectedFormacion}
            onChange={(e) => setSelectedFormacion(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-100 text-foreground bg-white cursor-pointer transition-colors"
            aria-required="true"
          >
            <option value="">📚 Selecciona una formación</option>
            {formaciones.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label htmlFor="fecha" className="block text-sm font-medium text-foreground mb-2">
            Fecha <span className="text-red-500">*</span>
          </label>
          <input
            id="fecha"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-100 text-foreground bg-white cursor-pointer transition-colors"
            aria-required="true"
          />
        </div>

        {/* Botón Cargar */}
        <button
          onClick={onCargar}
          disabled={!isFormValid || isLoading}
          className="w-full px-6 py-2.5 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-orange-500 focus:outline-2 focus:outline-offset-2 flex items-center justify-center gap-2"
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Cargando...
            </>
          ) : (
            <>📥 Cargar Aprendices</>
          )}
        </button>
      </div>
    </div>
  )
}
