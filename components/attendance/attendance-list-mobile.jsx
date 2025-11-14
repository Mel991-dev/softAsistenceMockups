"use client"

export default function AttendanceListMobile({ aprendices, onToggleAsistencia, onObservaciones }) {
  return (
    <div className="space-y-4 mb-32">
      {aprendices.map((aprendiz) => (
        <div
          key={aprendiz.id}
          className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 ${
            aprendiz.presente ? "border-l-4 border-l-green-600" : "border-l-4 border-l-red-600"
          }`}
        >
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Documento: {aprendiz.documento}</p>
            <p className="text-lg font-semibold text-foreground">{aprendiz.nombre}</p>
          </div>

          <button
            onClick={() => onToggleAsistencia(aprendiz.id)}
            className={`w-full px-4 py-3 rounded-lg font-semibold transition-all focus:outline-orange-500 focus:outline-2 focus:outline-offset-2 flex items-center justify-center gap-2 ${
              aprendiz.presente ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
            aria-pressed={aprendiz.presente}
            aria-label={`${aprendiz.nombre} ${aprendiz.presente ? "Presente" : "Ausente"}`}
          >
            {aprendiz.presente ? "✓ Presente" : "✗ Ausente"}
          </button>

          {!aprendiz.presente && (
            <input
              type="text"
              value={aprendiz.observaciones}
              onChange={(e) => onObservaciones(aprendiz.id, e.target.value.slice(0, 200))}
              placeholder="Agregar nota..."
              maxLength="200"
              className="w-full px-3 py-2 text-sm mt-3 border border-gray-300 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-100 text-foreground"
              aria-label={`Observaciones para ${aprendiz.nombre}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
