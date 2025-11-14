"use client"

export default function QuickActions({ count, searchTerm, onSearchChange, onMarkAllPresent, onMarkAllAbsent }) {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Contador */}
        <div className="text-lg font-semibold text-foreground">
          <span className="text-green-600 text-2xl">{count}</span> aprendices
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onMarkAllPresent}
            className="px-4 py-2 border-2 border-green-600 text-green-600 font-medium rounded-md hover:bg-green-50 transition-colors focus:outline-orange-500 focus:outline-2 focus:outline-offset-2"
            aria-label="Marcar todos como presentes"
          >
            ✓ Marcar Todos Presentes
          </button>
          <button
            onClick={onMarkAllAbsent}
            className="px-4 py-2 border-2 border-red-600 text-red-600 font-medium rounded-md hover:bg-red-50 transition-colors focus:outline-orange-500 focus:outline-2 focus:outline-offset-2"
            aria-label="Marcar todos como ausentes"
          >
            ✗ Marcar Todos Ausentes
          </button>
        </div>

        {/* Búsqueda */}
        <div className="w-full md:w-64">
          <input
            id="search-input"
            type="text"
            placeholder="🔍 Buscar aprendiz..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-100 text-foreground transition-colors"
            aria-label="Buscar aprendiz por nombre o documento"
          />
        </div>
      </div>
    </div>
  )
}
