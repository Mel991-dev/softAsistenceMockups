"use client"
import Link from "next/link"

export default function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
      <Link
        href="/dashboard"
        className="text-green-600 hover:text-green-700 font-medium transition-colors focus:outline-orange-500 focus:outline-2 focus:outline-offset-2 rounded px-2 py-1"
      >
        Dashboard
      </Link>
      <span className="text-gray-400">/</span>
      <span className="text-gray-600">Registrar Asistencia</span>
    </nav>
  )
}
