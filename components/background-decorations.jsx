export default function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-orange-500 to-orange-600" />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-green-700 to-orange-400 opacity-60" />

      {/* Large Circle - Top Left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl" />

      {/* Large Circle - Top Right */}
      <div className="absolute -top-20 -right-40 w-80 h-80 rounded-full bg-orange-300 opacity-20 blur-3xl" />

      {/* Medium Circle - Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-green-400 opacity-10 blur-3xl" />

      {/* Medium Circle - Bottom Left */}
      <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-white opacity-8 blur-3xl" />

      {/* Small Circle - Bottom Right */}
      <div className="absolute -bottom-24 -right-32 w-64 h-64 rounded-full bg-orange-200 opacity-15 blur-3xl" />

      {/* Accent Circle - Right Center */}
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full border-2 border-white opacity-10 blur-sm" />

      {/* Content/Text Overlay for accessibility */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-white">
        <div className="text-center max-w-md space-y-6">
          <div>
            <h2 className="text-4xl font-bold mb-2">Bienvenido</h2>
            <p className="text-lg text-white text-opacity-90">Sistema de Control de Asistencia SENA</p>
          </div>

          {/* Minimal Circle Icons */}
          <div className="flex justify-center gap-8 pt-6">
            <div className="w-12 h-12 rounded-full border-2 border-white opacity-60" />
            <div className="w-12 h-12 rounded-full border-2 border-white opacity-40" />
            <div className="w-12 h-12 rounded-full border-2 border-white opacity-20" />
          </div>

          <p className="text-sm text-white text-opacity-75 italic pt-4">
            Acceso seguro para instructores y estudiantes
          </p>
        </div>
      </div>
    </div>
  )
}
