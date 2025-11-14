"use client"

export default function AttendanceSummary({ presentes, ausentes, porcentaje, total, onSave, onCancel }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Resumen */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-2xl text-green-600">✓</div>
              <div>
                <p className="text-sm text-gray-600">Presentes</p>
                <p className="text-2xl font-bold text-green-600">{presentes}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl text-red-600">✗</div>
              <div>
                <p className="text-sm text-gray-600">Ausentes</p>
                <p className="text-2xl font-bold text-red-600">{ausentes}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-300">
              <div>
                <p className="text-sm text-gray-600">Porcentaje</p>
                <p
                  className={`text-2xl font-bold ${
                    porcentaje >= 80 ? "text-green-600" : porcentaje >= 60 ? "text-yellow-600" : "text-red-600"
                  }`}
                >
                  {porcentaje}%
                </p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={onCancel}
              className="flex-1 md:flex-none px-6 py-3 border-2 border-gray-300 text-foreground font-semibold rounded-md hover:bg-gray-50 transition-colors focus:outline-orange-500 focus:outline-2 focus:outline-offset-2"
            >
              Cancelar
            </button>
            <button
              onClick={onSave}
              className="flex-1 md:flex-none px-8 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors focus:outline-orange-500 focus:outline-2 focus:outline-offset-2 flex items-center justify-center gap-2 min-w-max"
            >
              💾 Guardar Asistencia
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
