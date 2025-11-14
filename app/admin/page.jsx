"use client"

import { useState } from "react"
import AdminHeader from "@/components/admin/header"
import AdminSidebar from "@/components/admin/sidebar"
import UserManagement from "@/components/admin/views/user-management"
import GeneralSettings from "@/components/admin/views/general-settings"
import AuditLogs from "@/components/admin/views/audit-logs"
import Backups from "@/components/admin/views/backups"
import GlobalStats from "@/components/admin/views/global-stats"

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState("users")
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const renderView = () => {
    switch (currentView) {
      case "users":
        return <UserManagement />
      case "settings":
        return <GeneralSettings onChangesMade={() => setUnsavedChanges(true)} />
      case "logs":
        return <AuditLogs />
      case "backups":
        return <Backups />
      case "stats":
        return <GlobalStats />
      default:
        return <UserManagement />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Unsaved Changes Banner */}
        {unsavedChanges && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3 flex items-center justify-between sticky top-[70px] z-30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              <span className="text-sm text-yellow-800">Tienes cambios sin guardar</span>
            </div>
            <button
              onClick={() => setUnsavedChanges(false)}
              className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
            >
              Guardar Todo
            </button>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-auto">{renderView()}</main>
      </div>
    </div>
  )
}
