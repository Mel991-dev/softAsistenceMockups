"use client"

import { useState, useRef } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [touched, setTouched] = useState({})
  const formRef = useRef(null)

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!email) {
      setError("Por favor ingrese su correo electrónico")
      setTouched({ email: true, password: true })
      return
    }

    if (!validateEmail(email)) {
      setError("Por favor ingrese un correo válido")
      setTouched({ email: true })
      return
    }

    if (!password) {
      setError("Por favor ingrese su contraseña")
      setTouched({ email: true, password: true })
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setTouched({ email: true, password: true })
      return
    }

    // Simulate API call
    setIsLoading(true)
    try {
      // Replace this with actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success - you would redirect here
      console.log("Login exitoso", { email, rememberMe })
      // window.location.href = '/dashboard';
    } catch (err) {
      setError("Correo o contraseña incorrectos")
    } finally {
      setIsLoading(false)
    }
  }

  const emailError =
    touched.email && !email ? "Correo requerido" : touched.email && !validateEmail(email) ? "Correo inválido" : ""
  const passwordError =
    touched.password && !password
      ? "Contraseña requerida"
      : touched.password && password.length < 6
        ? "Mínimo 6 caracteres"
        : ""

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        {/* SENA Logo Placeholder */}
        <div className="flex justify-center mb-4">
          <div
            className="w-32 h-32 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center text-white shadow-lg"
            role="img"
            aria-label="Logo SENA"
          >
            <span className="text-2xl font-bold">SENA</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Control de Asistencia</h1>
        <p className="text-gray-600 text-lg">SENA Regional Caquetá</p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-xl shadow-lg p-10 border-l-4 border-green-600 grid grid-cols-1 md:grid-cols-2 gap-8">
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="col-span-2 md:col-span-1">
          {/* Error Alert */}
          {error && (
            <div role="alert" className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <p className="font-medium">Error en el inicio de sesión</p>
              <p>{error}</p>
            </div>
          )}

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
              <span className="text-red-600 ml-1" aria-label="campo requerido">
                *
              </span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="instructor@sena.edu.co"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all ${
                  emailError
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : "border-gray-300 focus:ring-green-600 focus:border-green-600"
                }`}
                aria-invalid={emailError ? "true" : "false"}
                aria-describedby={emailError ? "email-error" : undefined}
              />
              {emailError && (
                <p id="email-error" className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span> {emailError}
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
              <span className="text-red-600 ml-1" aria-label="campo requerido">
                *
              </span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                placeholder="••••••••"
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : "border-gray-300 focus:ring-green-600 focus:border-green-600"
                }`}
                aria-invalid={passwordError ? "true" : "false"}
                aria-describedby={passwordError ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:outline-orange-500 focus:outline-2 p-1 rounded"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {passwordError && (
                <p id="password-error" className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span> {passwordError}
                </p>
              )}
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center mb-6">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-600 focus:ring-2 cursor-pointer"
              aria-label="Recordarme en este dispositivo"
            />
            <label htmlFor="remember" className="ml-3 text-sm text-gray-600 cursor-pointer">
              Recordarme
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-right">
            <a
              href="#"
              className="text-sm text-green-600 hover:text-green-700 transition-colors font-medium focus:outline-orange-500 focus:outline-2 focus:outline-offset-2 rounded px-2 py-1"
              aria-label="Ir a recuperar contraseña"
            >
              ¿Olvidó su contraseña?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-2 group"
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <>
                <span>Iniciar Sesión</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        {/* Additional content for split layout can be added here */}
      </div>

      {/* Additional Info */}
      <p className="text-center text-xs text-gray-500 mt-6">
        Si tiene problemas para acceder, contacte al administrador del sistema
      </p>
    </div>
  )
}
