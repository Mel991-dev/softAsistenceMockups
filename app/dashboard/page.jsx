"use client"
import { useState } from "react"
import DashboardHeader from "@/components/dashboard/header"
import DashboardSidebar from "@/components/dashboard/sidebar"
import DashboardContent from "@/components/dashboard/content"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop visible, Mobile collapsed */}
        <div
          className={`hidden md:flex flex-col w-64 border-r border-border transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <DashboardSidebar />
        </div>

        {/* Mobile Sidebar - Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        <div
          className={`fixed left-0 top-0 h-full w-64 bg-background border-r border-border z-50 md:relative md:z-auto transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <DashboardSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}
