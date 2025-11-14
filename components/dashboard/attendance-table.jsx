import { Eye } from "lucide-react"

export default function AttendanceTable() {
  const records = [
    {
      id: 1,
      formation: "TDS-2024-01",
      date: "12 de noviembre",
      time: "08:15 AM",
      attendance: "27/29",
      percentage: 93,
    },
    {
      id: 2,
      formation: "TSO-2024-02",
      date: "12 de noviembre",
      time: "03:45 PM",
      attendance: "22/24",
      percentage: 92,
    },
    {
      id: 3,
      formation: "TDS-2024-01",
      date: "11 de noviembre",
      time: "08:20 AM",
      attendance: "26/29",
      percentage: 90,
    },
    {
      id: 4,
      formation: "TAB-2024-01",
      date: "11 de noviembre",
      time: "07:00 PM",
      attendance: "17/18",
      percentage: 94,
    },
    {
      id: 5,
      formation: "TSO-2024-02",
      date: "10 de noviembre",
      time: "04:00 PM",
      attendance: "23/24",
      percentage: 96,
    },
  ]

  const getPercentageColor = (percentage) => {
    if (percentage >= 80) return "text-green-600 bg-green-50"
    if (percentage >= 60) return "text-orange-600 bg-orange-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <section className="pb-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Últimas Asistencias</h2>

      {/* Mobile View - Cards */}
      <div className="md:hidden grid gap-4">
        {records.map((record) => (
          <div key={record.id} className="bg-card border border-border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-foreground">{record.formation}</p>
                <p className="text-sm text-muted-foreground">
                  {record.date} - {record.time}
                </p>
              </div>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${getPercentageColor(record.percentage)}`}>
                {record.percentage}%
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="text-sm text-muted-foreground">{record.attendance}</span>
              <button className="text-primary hover:text-green-700 p-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:outline-2 rounded">
                <Eye size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-6 py-4 text-left text-sm font-semibold">Formación</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Fecha</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Hora</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Presentes / Total</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Porcentaje</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Acción</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={record.id}
                className={`border-t border-border ${
                  index % 2 === 0 ? "bg-background" : "bg-muted/30"
                } hover:bg-muted/50 transition-colors`}
              >
                <td className="px-6 py-4 text-sm font-medium text-foreground">{record.formation}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{record.date}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{record.time}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{record.attendance}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getPercentageColor(record.percentage)}`}
                  >
                    {record.percentage}%
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-primary hover:text-green-700 p-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:outline-2 rounded transition-colors">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
