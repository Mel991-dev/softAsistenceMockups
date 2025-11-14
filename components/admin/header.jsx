"use client"

import { useState } from "react"
import { Bell, Menu, LogOut, Settings, User, ChevronDown, Shield } from "lucide-react"

export default function AdminHeader({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-gray-900 to-gray-800 text-white h-[70px] border-b border-gray-700 shadow-lg">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors focus-visible:outline-orange-400 focus-visible:outline-2"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center font-bold text-white">
              <Shield size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold">Panel de Administración</h1>
              <p className="text-xs text-red-400 font-semibold">Área Restringida</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors focus-visible:outline-orange-400 focus-visible:outline-2"
            aria-label="Volver a dashboard normal"
          >
            ← Volver a Dashboard
          </button>

          <button
            className="relative p-2 hover:bg-gray-700 rounded-lg transition-colors focus-visible:outline-orange-400 focus-visible:outline-2"
            aria-label="Notificaciones"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-lg transition-colors focus-visible:outline-orange-400 focus-visible:outline-2"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                SA
              </div>
              <span className="text-sm font-medium">Super Admin</span>
              <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card text-foreground rounded-lg shadow-lg border border-border z-50">
                <a href="#" className="flex items-center gap-2 px-4 py-3 hover:bg-muted rounded-t-lg transition-colors">
                  <User size={16} />
                  <span>Mi Perfil</span>
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors">
                  <Settings size={16} />
                  <span>Configuración Personal</span>
                </a>
                <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-muted rounded-b-lg transition-colors text-destructive border-t border-border">
                  <LogOut size={16} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
