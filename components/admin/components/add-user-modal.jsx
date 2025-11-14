"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function AddUserModal({ onClose, onAdd }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    role: "instructor",
    password: "",
    status: "active",
    sendEmail: true,
    formations: [],
  })

  const handleNext = () => {
    if (step === 1 && formData.name && formData.lastName && formData.email) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  const handleSubmit = () => {
    onAdd({
      name: `${formData.name} ${formData.lastName}`,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      lastAccess: new Date().toLocaleString(),
      formations: formData.formations.length,
      avatar: `${formData.name[0]}${formData.lastName[0]}`.toUpperCase(),
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-md w-full border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-bold">Agregar Nuevo Usuario</h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Nombre *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-primary text-sm"
                  placeholder="Nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Apellido *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-primary text-sm"
                  placeholder="Apellido"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-primary text-sm"
                  placeholder="usuario@sena.edu.co"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Rol *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-primary text-sm"
                >
                  <option value="instructor">Instructor</option>
                  <option value="coordinator">Coordinador</option>
                  <option value="super-admin">Super Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contraseña *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-primary text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sendEmail"
                  checked={formData.sendEmail}
                  onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="sendEmail" className="text-sm">
                  Enviar email de bienvenida
                </label>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="py-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">✓</div>
                <p className="font-semibold text-green-900">¿Crear usuario?</p>
                <p className="text-sm text-green-800 mt-1">
                  {formData.name} {formData.lastName}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border gap-2">
          <button
            onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
            className="px-4 py-2 text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
          >
            {step === 1 ? "Cancelar" : "Atrás"}
          </button>

          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`w-2 h-2 rounded-full ${s <= step ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>

          <button
            onClick={step < 3 ? handleNext : handleSubmit}
            disabled={step === 1 && (!formData.name || !formData.lastName || !formData.email)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 3 ? "Crear" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  )
}
