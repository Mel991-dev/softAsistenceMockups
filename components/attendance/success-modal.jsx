"use client"
import { useEffect } from "react"

export default function SuccessModal({ formacion, fecha, onClose, onRegisterOther }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
        <div className="text-5xl mb-4 text-green-600">✓</div>
        <h2 className="text-2xl font-bold text-foreground mb-3">¡Asistencia Registrada!</h2>
        <p className="text-gray-600 mb-6">
          La asistencia del <span className="font-semibold">{formatDate(fecha)}</span> para{" "}
          <span className="font-semibold">{formacion}</span> ha sido guardada correctamente.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onRegisterOther}
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors focus:outline-orange-500 focus:outline-2 focus:outline-offset-2"
          >
            Registrar Otra
          </button>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 border-2 border-gray-300 text-foreground font-semibold rounded-md hover:bg-gray-50 transition-colors focus:outline-orange-500 focus:outline-2 focus:outline-offset-2"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
