"use client"
import { useState } from "react"
import { Download, Eye } from "lucide-react"

const formations = [
  {
    id: 1,
    code: "TDS-2024-01",
    name: "Técnico en Desarrollo de Software",
    instructor: "Carlos García",
    schedule: "Mañana",
    students: 32,
    daysRegistered: 24,
    attendance: 92,
  },
  {
    id: 2,
    code: "ADM-2024-02",
    name: "Administración de Empresas",
    instructor: "María López",
    schedule: "Tarde",
    students: 28,
    daysRegistered: 22,
    attendance: 88,
  },
  {
    id: 3,
    code: "SST-2024-03",
    name: "Seguridad y Salud en el Trabajo",
    instructor: "Juan Rodríguez",
    schedule: "Mañana",
    students: 35,
    daysRegistered: 20,
    attendance: 85,
  },
  {
    id: 4,
    code: "MKT-2024-04",
    name: "Marketing Digital",
    instructor: "Ana Martínez",
    schedule: "Tarde",
    students: 30,
    daysRegistered: 23,
    attendance: 91,
  },
]

function AttendanceCell({ percentage }) {
  let bgColor = "bg-green-50"
  if (percentage < 85) bgColor = percentage < 70 ? "bg-red-50" : "bg-yellow-50"

  return <div className={`${bgColor} px-3 py-1 rounded font-semibold text-sm`}>{percentage}%</div>
}

export default function FormationsDetailTable({ filters }) {
  const [sortBy, setSortBy] = useState("name")
  const [itemsPerPage, setItemsPerPage] = useState(10)

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">Detalle por Formación</h3>
          <p className="text-muted-foreground text-sm">Resumen de las últimas 4 semanas</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-2 border border-border rounded-md text-foreground bg-background"
          >
            <option value={10}>10 por página</option>
            <option value={25}>25 por página</option>
            <option value={50}>50 por página</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-md font-semibold text-sm">
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 font-semibold text-foreground cursor-pointer hover:bg-muted">
                Código
              </th>
              <th className="text-left px-4 py-3 font-semibold text-foreground cursor-pointer hover:bg-muted">
                Formación
              </th>
              <th className="text-left px-4 py-3 font-semibold text-foreground cursor-pointer hover:bg-muted">
                Instructor
              </th>
              <th className="text-center px-4 py-3 font-semibold text-foreground">Jornada</th>
              <th className="text-center px-4 py-3 font-semibold text-foreground">Aprendices</th>
              <th className="text-center px-4 py-3 font-semibold text-foreground">Días Reg.</th>
              <th className="text-center px-4 py-3 font-semibold text-foreground">Asistencia</th>
              <th className="text-center px-4 py-3 font-semibold text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {formations.map((f) => (
              <tr key={f.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <span className="inline-block bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold">
                    {f.code}
                  </span>
                </td>
                <td className="px-4 py-3 text-foreground font-medium">{f.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{f.instructor}</td>
                <td className="px-4 py-3 text-center text-muted-foreground">{f.schedule}</td>
                <td className="px-4 py-3 text-center text-foreground font-medium">{f.students}</td>
                <td className="px-4 py-3 text-center text-foreground font-medium">{f.daysRegistered}</td>
                <td className="px-4 py-3 text-center">
                  <AttendanceCell percentage={f.attendance} />
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-md transition-colors" title="Ver detalle">
                      <Eye className="w-4 h-4 text-primary" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-md transition-colors" title="Exportar">
                      <Download className="w-4 h-4 text-secondary" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Mostrando 1 a {Math.min(itemsPerPage, formations.length)} de {formations.length} formaciones
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-border rounded hover:bg-muted transition-colors">←</button>
          <button className="px-3 py-1 border border-border rounded bg-primary text-primary-foreground">1</button>
          <button className="px-3 py-1 border border-border rounded hover:bg-muted transition-colors">→</button>
        </div>
      </div>
    </div>
  )
}
