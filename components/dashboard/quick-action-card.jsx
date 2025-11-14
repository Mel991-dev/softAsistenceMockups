import { CheckSquare, ArrowRight } from "lucide-react"

export default function QuickActionCard() {
  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <CheckSquare size={32} className="text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground mb-2">Registrar Asistencia</h2>
          <p className="text-foreground/70 mb-4">Registra la asistencia de hoy de forma rápida y sencilla</p>
          <button className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors focus-visible:outline-offset-2 focus-visible:outline-orange-500 focus-visible:outline-2">
            Comenzar Registro
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
