"use client"

export default function AttendanceTable({ aprendices, onToggleAsistencia, onObservaciones }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-32">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                <input
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer accent-green-600"
                  aria-label="Seleccionar todos"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Documento</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Nombre Completo</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Asistencia</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {aprendices.map((aprendiz) => (
              <tr
                key={aprendiz.id}
                className={`border-b border-gray-200 hover:bg-green-50 transition-colors ${
                  aprendiz.presente ? "bg-green-50/30" : "bg-red-50/30"
                }`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="w-5 h-5 cursor-pointer accent-green-600"
                    aria-label={`Seleccionar ${aprendiz.nombre}`}
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-mono">{aprendiz.documento}</td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">{aprendiz.nombre}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onToggleAsistencia(aprendiz.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all focus:outline-orange-500 focus:outline-2 focus:outline-offset-2 ${
                      aprendiz.presente ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
                    }`}
                    aria-pressed={aprendiz.presente}
                    aria-label={`${aprendiz.nombre} ${aprendiz.presente ? "Presente" : "Ausente"}`}
                  >
                    {aprendiz.presente ? "✓ Presente" : "✗ Ausente"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  {!aprendiz.presente && (
                    <input
                      type="text"
                      value={aprendiz.observaciones}
                      onChange={(e) => onObservaciones(aprendiz.id, e.target.value.slice(0, 200))}
                      placeholder="Agregar nota..."
                      maxLength="200"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-100 text-foreground"
                      aria-label={`Observaciones para ${aprendiz.nombre}`}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
