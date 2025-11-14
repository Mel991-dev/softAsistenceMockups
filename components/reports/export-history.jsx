import { Download } from "lucide-react"

const exports = [
  {
    id: 1,
    date: "10 Nov 2025",
    formation: "Todas",
    type: "Completo",
    generatedBy: "Carlos García",
    link: "#",
  },
  {
    id: 2,
    date: "9 Nov 2025",
    formation: "TDS-2024-01",
    type: "Resumen",
    generatedBy: "María López",
    link: "#",
  },
  {
    id: 3,
    date: "8 Nov 2025",
    formation: "ADM-2024-02",
    type: "Completo",
    generatedBy: "Juan Rodríguez",
    link: "#",
  },
]

export default function ExportHistory() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Historial de Exportaciones</h3>
        <a href="#" className="text-primary hover:underline text-sm font-semibold">
          Ver historial completo
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 font-semibold text-foreground">Fecha</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Formación</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Tipo</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Generado por</th>
              <th className="text-center px-4 py-3 font-semibold text-foreground">Enlace</th>
            </tr>
          </thead>
          <tbody>
            {exports.map((exp) => (
              <tr key={exp.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 text-muted-foreground">{exp.date}</td>
                <td className="px-4 py-3 text-foreground font-medium">{exp.formation}</td>
                <td className="px-4 py-3 text-foreground">{exp.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{exp.generatedBy}</td>
                <td className="px-4 py-3 text-center">
                  <a href={exp.link} className="inline-flex items-center gap-1 text-primary hover:underline">
                    <Download className="w-4 h-4" />
                    Descargar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
