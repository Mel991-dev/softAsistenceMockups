"use client"

import { useState } from "react"
import { Download, RotateCcw, Trash2, Plus, AlertTriangle } from "lucide-react"

export default function Backups() {
  const [backups, setBackups] = useState([
    {
      id: 1,
      date: "2025-11-12 22:00",
      size: "245 MB",
      status: "success",
      type: "automatic",
    },
    {
      id: 2,
      date: "2025-11-11 22:00",
      size: "238 MB",
      status: "success",
      type: "automatic",
    },
    {
      id: 3,
      date: "2025-11-10 14:30",
      size: "235 MB",
      status: "success",
      type: "manual",
    },
  ])

  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Backups</h2>
        <p className="text-sm text-muted-foreground mt-1">Gestiona copias de seguridad del sistema</p>
      </div>

      {/* Configuration */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h3 className="font-bold">Configuración de Backups Automáticos</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm">Backups automáticos habilitados</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Frecuencia</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm">
                <option>Diario</option>
                <option>Semanal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hora de ejecución</label>
              <input
                type="time"
                defaultValue="22:00"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Retención (días)</label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Backup List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Backups Disponibles</h3>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm">
            <Plus size={16} />
            Crear Backup Manual
          </button>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Fecha/Hora</th>
                <th className="px-6 py-3 text-left font-semibold">Tamaño</th>
                <th className="px-6 py-3 text-left font-semibold">Estado</th>
                <th className="px-6 py-3 text-left font-semibold">Tipo</th>
                <th className="px-6 py-3 text-center font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((backup) => (
                <tr key={backup.id} className="border-b border-border hover:bg-muted">
                  <td className="px-6 py-4">{backup.date}</td>
                  <td className="px-6 py-4">{backup.size}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      Exitoso
                    </span>
                  </td>
                  <td className="px-6 py-4 capitalize">{backup.type === "automatic" ? "Automático" : "Manual"}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 hover:bg-background rounded transition-colors" aria-label="Descargar">
                        <Download size={16} className="text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => setShowConfirm(true)}
                        className="p-2 hover:bg-background rounded transition-colors"
                        aria-label="Restaurar"
                      >
                        <RotateCcw size={16} className="text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-background rounded transition-colors" aria-label="Eliminar">
                        <Trash2 size={16} className="text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-red-900">Advertencia</p>
          <p className="text-sm text-red-800 mt-1">
            La restauración sobrescribirá todos los datos actuales. Esta acción no se puede deshacer.
          </p>
        </div>
      </div>

      {/* Restore Confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full p-6 border border-border">
            <h3 className="text-lg font-bold mb-2">Confirmar Restauración</h3>
            <p className="text-sm text-muted-foreground mb-6">Esta acción restaurará todos los datos. ¿Estás seguro?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button className="flex-1 px-4 py-2 bg-destructive text-white rounded-lg hover:bg-red-700 transition-colors">
                Restaurar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
