"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Users,
  BookOpen,
  Building2,
  Shield,
  Settings,
  BarChart3,
  Activity,
  Database,
  Plug,
  ChevronDown,
} from "lucide-react"

export default function AdminSidebar({ isOpen, onClose, currentView, onViewChange }) {
  const [gestióExpanded, setGestióExpanded] = useState(true)
  const [sistemaExpanded, setSistemaExpanded] = useState(false)
  const [reportesExpanded, setReportesExpanded] = useState(false)

  const menuSections = [
    {
      title: "GESTIÓN",
      expanded: gestióExpanded,
      setExpanded: setGestióExpanded,
      items: [
        { id: "users", icon: Users, label: "Usuarios" },
        { id: "formations", icon: BookOpen, label: "Formaciones" },
        { id: "environments", icon: Building2, label: "Ambientes" },
        { id: "roles", icon: Shield, label: "Roles y Permisos" },
      ],
    },
    {
      title: "SISTEMA",
      expanded: sistemaExpanded,
      setExpanded: setSistemaExpanded,
      items: [
        { id: "settings", icon: Settings, label: "Configuración General" },
        { id: "logs", icon: BarChart3, label: "Logs de Auditoría" },
        { id: "backups", icon: Database, label: "Backups" },
        { id: "integrations", icon: Plug, label: "Integraciones" },
      ],
    },
    {
      title: "REPORTES",
      expanded: reportesExpanded,
      setExpanded: setReportesExpanded,
      items: [
        { id: "stats", icon: Activity, label: "Estadísticas Globales" },
        { id: "usage", icon: BarChart3, label: "Uso del Sistema" },
      ],
    },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 w-64 h-screen bg-card border-r border-border overflow-y-auto transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden p-4 flex justify-end border-b border-border">
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors focus-visible:outline-orange-400 focus-visible:outline-2"
            aria-label="Cerrar sidebar"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Menu Sections */}
        <nav className="p-4 space-y-2">
          {menuSections.map((section) => (
            <div key={section.title}>
              <button
                onClick={() => section.setExpanded(!section.expanded)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
              >
                {section.title}
                <ChevronDown size={16} className={`transition-transform ${section.expanded ? "rotate-180" : ""}`} />
              </button>

              {section.expanded && (
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = currentView === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onViewChange(item.id)
                          onClose()
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus-visible:outline-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                          isActive ? "bg-primary text-white font-medium" : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
