"use client"

import { Home, CheckSquare, BookOpen, Users, BarChart3, HelpCircle, ChevronLeft } from "lucide-react"

export default function DashboardSidebar({ onClose }) {
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "#", active: true },
    { icon: CheckSquare, label: "Registrar Asistencia", href: "#" },
    { icon: BookOpen, label: "Mis Formaciones", href: "#" },
    { icon: Users, label: "Aprendices", href: "#" },
    { icon: BarChart3, label: "Reportes", href: "#" },
    { icon: HelpCircle, label: "Ayuda", href: "#" },
  ]

  return (
    <nav className="flex flex-col h-full bg-white">
      {/* Close button for mobile */}
      <div className="md:hidden p-4 flex justify-end">
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-lg transition-colors focus-visible:outline-orange-400 focus-visible:outline-2"
          aria-label="Cerrar sidebar"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus-visible:outline-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                item.active ? "bg-green-100 text-primary font-medium" : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </a>
          )
        })}
      </div>

      {/* Collapse Button */}
      <div className="hidden md:block p-4 border-t border-border">
        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
          <ChevronLeft size={18} />
          <span>Contraer</span>
        </button>
      </div>
    </nav>
  )
}
