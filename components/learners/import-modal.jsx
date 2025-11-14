"use client"

import { useState } from "react"
import { X, Upload, Download, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function ImportModal({ onClose }) {
  const [step, setStep] = useState("upload")
  const [dragActive, setDragActive] = useState(false)
  const [importProgress, setImportProgress] = useState(0)

  const mockErrors = [
    { row: 12, error: "Documento duplicado" },
    { row: 23, error: "Email inválido" },
  ]

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setStep("preview")
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} role="presentation" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card rounded-lg shadow-lg z-50 w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Importar Aprendices</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {step === "upload" && (
            <>
              <Alert>
                <AlertCircle size={16} />
                <AlertDescription>Descarga la plantilla CSV con el formato correcto antes de importar</AlertDescription>
              </Alert>

              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Download size={18} />
                Descargar Plantilla
              </Button>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  dragActive ? "border-primary bg-primary/10" : "border-border"
                }`}
              >
                <Upload size={32} className="mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium text-foreground mb-1">Arrastra el archivo CSV aquí</p>
                <p className="text-sm text-muted-foreground mb-3">o haz clic para seleccionar</p>
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => e.target.files && setStep("preview")}
                />
                <p className="text-xs text-muted-foreground">Solo archivos CSV (máx 5MB)</p>
              </div>
            </>
          )}

          {step === "preview" && (
            <>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-3">Resumen de importación</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span className="text-foreground">45 registros válidos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-destructive" />
                    <span className="text-foreground">5 registros con errores</span>
                  </div>
                </div>
              </div>

              {mockErrors.length > 0 && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <p className="text-sm font-medium text-destructive mb-3">Errores encontrados:</p>
                  <ul className="space-y-2">
                    {mockErrors.map((error, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        Fila {error.row}: {error.error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                onClick={() => setStep("importing")}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Importar {45} Válidos
              </Button>
            </>
          )}

          {step === "importing" && (
            <>
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Importando 45 de 50 aprendices...</p>
                <Progress value={80} className="h-2" />
              </div>
            </>
          )}

          {step === "complete" && (
            <>
              <Alert className="border-primary bg-primary/10">
                <CheckCircle2 size={16} className="text-primary" />
                <AlertDescription className="text-foreground font-medium">¡Importación exitosa!</AlertDescription>
              </Alert>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <p className="text-foreground">45 aprendices importados</p>
                <p className="text-muted-foreground">5 registros omitidos</p>
              </div>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Download size={18} />
                Descargar reporte de errores
              </Button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            {step === "complete" ? "Cerrar" : "Cancelar"}
          </Button>
        </div>
      </div>
    </>
  )
}
