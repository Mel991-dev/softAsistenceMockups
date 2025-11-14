"use client"

import { useState } from "react"
import { Download, ChevronDown } from "lucide-react"

export default function AuditLogs() {
  const [logs, setLogs] = useState([
    {
      id: 1,
      timestamp: "2025-11-12 14:35:20",
      user: "Carlos Rodríguez",
      action: "LOGIN",
      description: "Inicio de sesión exitoso",
      table: "users",
      ip: "192.168.1.100",
      expanded: false,
    },
    {
      id: 2,
      timestamp: "2025-11-12 14:32:45",
      user: "María González",
      action: "CREATE",
      description: "Creó el aprendiz Juan Martínez (Doc: 1087654321)",
      table: "learners",
      ip: "192.168.1.105",
      expanded: false,
    },
    {
      id: 3,
      timestamp: "2025-11-12 14:30:10",
      user: "Juan Pérez",
      action: "UPDATE",
      description: "Actualizó registro de asistencia para Juan Martínez",
      table: "attendance",
      ip: "192.168.1.110",
      expanded: false,
    },
  ])

  const getActionColor = (action) => {
    const colors = {
      LOGIN: "bg-green-100 text-green-800",
      LOGOUT: "bg-gray-100 text-gray-800",
      CREATE: "bg-blue-100 text-blue-800",
      UPDATE: "bg-yellow-100 text-yellow-800",
      DELETE: "bg-red-100 text-red-800",
      EXPORT: "bg-purple-100 text-purple-800",
    }
    return colors[action] || "bg-gray-100 text-gray-800"
  }

  const toggleExpand = (id) => {
    setLogs(logs.map((log) => (log.id === id ? { ...log, expanded: !log.expanded } : log)))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Logs de Auditoría</h2>
        <p className="text-sm text-muted-foreground mt-1">Registro de todas las acciones del sistema</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          type="date"
          className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
        />
        <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm">
          <option>Todos los usuarios</option>
          <option>Carlos Rodríguez</option>
          <option>María González</option>
        </select>
        <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm">
          <option>Todas las acciones</option>
          <option>LOGIN</option>
          <option>CREATE</option>
          <option>UPDATE</option>
          <option>DELETE</option>
        </select>
        <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 text-sm">
          <Download size={16} />
          Exportar
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {logs.map((log) => (
          <div key={log.id} className="border-b border-border last:border-b-0">
            <div className="p-4 hover:bg-muted transition-colors cursor-pointer" onClick={() => toggleExpand(log.id)}>
              <div className="flex items-start gap-4">
                <button className={`mt-1 transition-transform ${log.expanded ? "rotate-180" : ""}`}>
                  <ChevronDown size={18} />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-mono text-muted-foreground">{log.timestamp}</span>
                    <span className="text-sm font-medium">{log.user}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">{log.table}</span>
                  </div>
                  <p className="text-sm text-foreground mt-2">{log.description}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{log.ip}</p>
                </div>
              </div>
            </div>

            {log.expanded && (
              <div className="bg-muted border-t border-border p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-foreground mb-1">Datos Anteriores:</p>
                    <pre className="bg-background p-2 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify({ id: 123, status: "inactive" }, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Datos Nuevos:</p>
                    <pre className="bg-background p-2 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify({ id: 123, status: "active" }, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Mostrando 1-20 de 1,543 registros</p>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-border rounded hover:bg-muted disabled:opacity-50">←</button>
          <button className="px-3 py-2 bg-primary text-white rounded">1</button>
          <button className="px-3 py-2 border border-border rounded hover:bg-muted">2</button>
          <button className="px-3 py-2 border border-border rounded hover:bg-muted">3</button>
          <button className="px-3 py-2 border border-border rounded hover:bg-muted">→</button>
        </div>
      </div>
    </div>
  )
}
