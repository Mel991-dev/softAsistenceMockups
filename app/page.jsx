"use client"
import LoginForm from "@/components/login-form"
import BackgroundDecorations from "@/components/background-decorations"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content - Split Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 lg:py-8 overflow-y-auto">
          <LoginForm />
        </div>

        {/* Right Side - Decorative Background (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <BackgroundDecorations />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2025 SENA Regional Caquetá - Todos los derechos reservados</p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-600 hover:text-green-600 transition-colors focus:outline-orange-500 focus:outline-2 focus:outline-offset-2 rounded px-2 py-1"
                aria-label="Términos y Condiciones"
              >
                Términos y Condiciones
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="#"
                className="text-gray-600 hover:text-green-600 transition-colors focus:outline-orange-500 focus:outline-2 focus:outline-offset-2 rounded px-2 py-1"
                aria-label="Política de Privacidad"
              >
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
