import { BookOpen, Sun, Eye, CheckSquare } from "lucide-react"

export default function FormationsList() {
  const formations = [
    {
      id: 1,
      code: "TDS-2024-01",
      name: "Tecnólogo en Desarrollo de Software",
      period: "Mañana",
      learners: 29,
      lastAttendance: "Registrada hoy a las 08:15 AM",
    },
    {
      id: 2,
      code: "TSO-2024-02",
      name: "Técnico en Sistemas",
      period: "Tarde",
      learners: 24,
      lastAttendance: "Registrada ayer a las 03:45 PM",
    },
    {
      id: 3,
      code: "TAB-2024-01",
      name: "Técnico en Análisis de Bases de Datos",
      period: "Noche",
      learners: 18,
      lastAttendance: "Registrada hace 2 días",
    },
  ]

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <BookOpen size={24} className="text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Mis Formaciones</h2>
      </div>

      <div className="grid gap-4">
        {formations.map((formation) => (
          <div
            key={formation.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {formation.code}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{formation.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Sun size={16} />
                    {formation.period}
                  </span>
                  <span>{formation.learners} aprendices</span>
                  <span className="text-xs italic">{formation.lastAttendance}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:outline-2 flex items-center gap-2">
                <Eye size={16} />
                Ver Detalles
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-green-700 transition-colors font-medium focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:outline-2 flex items-center gap-2">
                <CheckSquare size={16} />
                Registrar Asistencia
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
