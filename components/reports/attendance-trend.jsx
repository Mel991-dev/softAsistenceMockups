"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

const data = [
  { date: "1 Nov", attendance: 87, meta: 80 },
  { date: "2 Nov", attendance: 89, meta: 80 },
  { date: "3 Nov", attendance: 85, meta: 80 },
  { date: "4 Nov", attendance: 91, meta: 80 },
  { date: "5 Nov", attendance: 88, meta: 80 },
  { date: "6 Nov", attendance: 92, meta: 80 },
  { date: "7 Nov", attendance: 90, meta: 80 },
  { date: "8 Nov", attendance: 87, meta: 80 },
  { date: "9 Nov", attendance: 89, meta: 80 },
  { date: "10 Nov", attendance: 91, meta: 80 },
  { date: "11 Nov", attendance: 89.5, meta: 80 },
  { date: "12 Nov", attendance: 91.2, meta: 80 },
]

export default function AttendanceTrendChart({ chartView, onViewChange }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Tendencia de Asistencia Mensual</h2>
          <p className="text-muted-foreground">Porcentaje de asistencia por día</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          {["daily", "weekly", "monthly"].map((view) => (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                chartView === view ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {view === "daily" ? "Diaria" : view === "weekly" ? "Semanal" : "Mensual"}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.625rem",
            }}
            labelStyle={{ color: "var(--foreground)" }}
            formatter={(value) => `${value}%`}
          />
          <ReferenceLine y={80} stroke="var(--chart-2)" strokeDasharray="5 5" label="Meta" />
          <Line
            type="monotone"
            dataKey="attendance"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={{ fill: "var(--primary)", r: 4 }}
            activeDot={{ r: 6 }}
            name="Asistencia"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
          <span className="text-muted-foreground">Asistencia</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 border-t-2 border-dashed" style={{ borderColor: "var(--chart-2)" }} />
          <span className="text-muted-foreground">Meta (80%)</span>
        </div>
      </div>
    </div>
  )
}
