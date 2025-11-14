"use client"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const formationData = [
  { name: "TDS-2024-01", attendance: 92 },
  { name: "ADM-2024-02", attendance: 88 },
  { name: "SST-2024-03", attendance: 85 },
  { name: "MKT-2024-04", attendance: 91 },
  { name: "DEV-2024-05", attendance: 87 },
  { name: "DES-2024-06", attendance: 89 },
  { name: "NEC-2024-07", attendance: 83 },
  { name: "AGR-2024-08", attendance: 90 },
  { name: "COM-2024-09", attendance: 86 },
  { name: "LOG-2024-10", attendance: 88 },
]

const scheduleData = [
  { name: "Mañana", value: 6, fill: "var(--primary)" },
  { name: "Tarde", value: 3, fill: "var(--chart-2)" },
  { name: "Noche", value: 2, fill: "var(--chart-3)" },
  { name: "Mixta", value: 1, fill: "var(--chart-4)" },
]

export default function SecondaryChartsGrid({ filters }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Asistencia por Formación */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Asistencia por Formación</h3>
          <a href="#" className="text-primary hover:underline text-sm font-semibold">
            Ver todas
          </a>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart layout="vertical" data={formationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="number" stroke="var(--muted-foreground)" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "0.625rem",
              }}
              formatter={(value) => `${value}%`}
            />
            <Bar dataKey="attendance" fill="var(--primary)" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Distribución por Jornada */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">Distribución por Jornada</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={scheduleData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={130}
              paddingAngle={2}
              dataKey="value"
            >
              {scheduleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "0.625rem",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-2 gap-2 text-sm">
          {scheduleData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="text-muted-foreground">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
