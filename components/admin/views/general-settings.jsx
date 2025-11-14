"use client"

import { useState } from "react"
import { Save, Check } from "lucide-react"

export default function GeneralSettings({ onChangesMade }) {
  const [settings, setSettings] = useState({
    regionalName: "SENA Regional Bogotá",
    address: "Calle 57 No. 8-69",
    phone: "(+57) 1 5461000",
    email: "contacto@sena.edu.co",
    minAttendance: 70,
    editDays: 3,
    attendanceHour: "08:00",
    allowOutOfHours: false,
    requireObservation: true,
    alertThreshold: 75,
    sessionDuration: 120,
    googleSheetEmail: "sistema-asistencia@example.iam.gserviceaccount.com",
  })

  const [activeTab, setActiveTab] = useState("institutional")
  const [saveStatus, setSaveStatus] = useState(null)

  const handleSave = () => {
    setSaveStatus("success")
    setTimeout(() => setSaveStatus(null), 3000)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Configuración General</h2>
        <p className="text-sm text-muted-foreground mt-1">Gestiona parámetros globales del sistema</p>
      </div>

      {/* Save Status */}
      {saveStatus === "success" && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
          <Check size={20} className="text-green-600" />
          <span className="text-green-800 font-medium">Cambios guardados exitosamente</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {[
          { id: "institutional", label: "Información Institucional" },
          { id: "attendance", label: "Parámetros de Asistencia" },
          { id: "notifications", label: "Notificaciones" },
          { id: "security", label: "Seguridad" },
          { id: "integrations", label: "Integraciones" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === "institutional" && (
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-bold">Información de la Regional</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre de la Regional</label>
                <input
                  type="text"
                  value={settings.regionalName}
                  onChange={(e) => {
                    setSettings({ ...settings, regionalName: e.target.value })
                    onChangesMade()
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dirección</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => {
                    setSettings({ ...settings, address: e.target.value })
                    onChangesMade()
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => {
                    setSettings({ ...settings, phone: e.target.value })
                    onChangesMade()
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email de Contacto</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => {
                    setSettings({ ...settings, email: e.target.value })
                    onChangesMade()
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
            </div>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              Actualizar
            </button>
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold">Parámetros de Asistencia</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Porcentaje mínimo de asistencia: {settings.minAttendance}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.minAttendance}
                    onChange={(e) => {
                      setSettings({ ...settings, minAttendance: Number.parseInt(e.target.value) })
                      onChangesMade()
                    }}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Días para editar asistencia pasada</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={settings.editDays}
                    onChange={(e) => {
                      setSettings({ ...settings, editDays: Number.parseInt(e.target.value) })
                      onChangesMade()
                    }}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Horario de registro</label>
                  <input
                    type="time"
                    value={settings.attendanceHour}
                    onChange={(e) => {
                      setSettings({ ...settings, attendanceHour: e.target.value })
                      onChangesMade()
                    }}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.allowOutOfHours}
                      onChange={(e) => {
                        setSettings({ ...settings, allowOutOfHours: e.target.checked })
                        onChangesMade()
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Permitir registro fuera de horario</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.requireObservation}
                      onChange={(e) => {
                        setSettings({ ...settings, requireObservation: e.target.checked })
                        onChangesMade()
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Requerir observación en ausencias</span>
                  </label>
                </div>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              Guardar Cambios
            </button>
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-bold">Integración Google Sheets</h3>
            <div className="bg-green-50 border border-green-200 rounded p-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm text-green-800 font-medium">Conectado</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Service Account Email:</p>
              <p className="text-sm font-mono bg-muted p-2 rounded">{settings.googleSheetEmail}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                Reconectar
              </button>
              <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                Probar Conexión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
