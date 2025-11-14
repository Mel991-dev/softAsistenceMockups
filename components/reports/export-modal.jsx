"use client"
import { useState } from "react"
import { X, CheckCircle } from "lucide-react"

export default function ExportModal({ isOpen, onClose }) {
  const [step, setStep] = useState("options") // 'options' | 'generating' | 'success'
  const [selectedFormations, setSelectedFormations] = useState([])
  const [includeCharts, setIncludeCharts] = useState(true)
  const [exportFormat, setExportFormat] = useState("complete")

  const formations = [
    { id: 1, name: "TDS-2024-01" },
    { id: 2, name: "ADM-2024-02" },
    { id: 3, name: "SST-2024-03" },
    { id: 4, name: "MKT-2024-04" },
  ]

  const toggleFormation = (id) => {
    setSelectedFormations((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  const handleGenerate = () => {
    setStep("generating")
    setTimeout(() => setStep("success"), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-md w-full shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Exportar a Google Sheets</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-md transition-colors">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "options" && (
            <div className="space-y-6">
              {/* Formaciones */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Seleccionar Formaciones</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {formations.map((f) => (
                    <label key={f.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFormations.includes(f.id)}
                        onChange={() => toggleFormation(f.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-foreground">{f.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Formato */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Formato</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={exportFormat === "complete"}
                      onChange={() => setExportFormat("complete")}
                    />
                    <span className="text-foreground">Completo (todos los datos)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={exportFormat === "summary"}
                      onChange={() => setExportFormat("summary")}
                    />
                    <span className="text-foreground">Resumen</span>
                  </label>
                </div>
              </div>

              {/* Incluir gráficos */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={includeCharts} onChange={() => setIncludeCharts(!includeCharts)} />
                <span className="text-foreground">Incluir gráficos</span>
              </label>

              {/* Progress bar simulado */}
              <div className="hidden"></div>
            </div>
          )}

          {step === "generating" && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 rounded-full border-4 border-border border-t-primary animate-spin mb-4"></div>
              <p className="text-foreground font-medium text-center">Generando reporte...</p>
              <p className="text-sm text-muted-foreground text-center mt-2">Por favor espere</p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="w-12 h-12 text-primary mb-4" />
              <p className="text-foreground font-bold mb-1">¡Reporte generado!</p>
              <p className="text-sm text-muted-foreground mb-6">Tu reporte está listo</p>

              <div className="w-full space-y-2">
                <button className="w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                  Abrir en Google Sheets
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("https://sheets.google.com/...")
                    alert("Enlace copiado")
                  }}
                  className="w-full border border-primary text-primary font-semibold py-2 px-4 rounded-md hover:bg-primary/10 transition-colors"
                >
                  Copiar enlace
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== "success" && (
          <div className="flex gap-3 p-6 border-t border-border">
            <button
              onClick={onClose}
              className="flex-1 border border-border text-foreground font-semibold py-2 px-4 rounded-md hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
            {step === "options" && (
              <button
                onClick={handleGenerate}
                className="flex-1 bg-secondary text-secondary-foreground font-semibold py-2 px-4 rounded-md hover:bg-secondary/90 transition-colors"
              >
                Generar Reporte
              </button>
            )}
          </div>
        )}

        {step === "success" && (
          <div className="p-6 border-t border-border">
            <button
              onClick={onClose}
              className="w-full border border-border text-foreground font-semibold py-2 px-4 rounded-md hover:bg-muted transition-colors"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
