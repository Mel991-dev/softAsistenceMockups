"use client"

import { useState } from "react"
import { Bell, Menu, LogOut, Settings, User, ChevronDown } from "lucide-react"

export default function DashboardHeader({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-[#2E8700] text-white h-[70px] border-b border-green-800 shadow-md">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Side - Logo and Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-green-700 rounded-lg transition-colors focus-visible:outline-orange-400 focus-visible:outline-2 focus-visible:outline-offset-0"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-green-700">
            S
          </div>
          <h1 className="text-lg font-semibold">Sistema de Asistencia</h1>
        </div>

        {/* Right Side - Notifications and User */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button
            className="relative p-2 hover:bg-green-700 rounded-lg transition-colors focus-visible:outline-orange-400 focus-visible:outline-2 focus-visible:outline-offset-0"
            aria-label="Notificaciones"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-green-700 rounded-lg transition-colors focus-visible:outline-orange-400 focus-visible:outline-2 focus-visible:outline-offset-0"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <img src="/placeholder-user.jpg" alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-sm font-medium">Juan Pérez</span>
              <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-foreground rounded-lg shadow-lg border border-border z-50">
                <a href="#" className="flex items-center gap-2 px-4 py-3 hover:bg-muted rounded-t-lg transition-colors">
                  <User size={16} />
                  <span>Mi Perfil</span>
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors">
                  <Settings size={16} />
                  <span>Configuración</span>
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
