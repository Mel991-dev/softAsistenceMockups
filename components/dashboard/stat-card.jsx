export default function StatCard({ icon: Icon, number, label, color }) {
  const colorClasses = {
    green: "bg-green-50 border-green-200 text-primary",
    orange: "bg-orange-50 border-orange-200 text-secondary",
    red: "bg-red-50 border-red-200 text-destructive",
  }

  return (
    <div className={`${colorClasses[color]} rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-lg ${
            color === "green" ? "bg-green-100/50" : color === "orange" ? "bg-orange-100/50" : "bg-red-100/50"
          }`}
        >
          <Icon size={24} />
        </div>
      </div>
      <p className="text-4xl font-bold mb-1">{number}</p>
      <p className="text-sm text-foreground/70">{label}</p>
    </div>
  )
}
