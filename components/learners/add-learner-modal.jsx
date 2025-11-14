"use client"

import { useState } from "react"
import { X, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function AddLearnerModal({ onClose, onSave, formations }) {
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    documentType: "CC",
    document: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    enrollInFormation: false,
    selectedFormation: "",
    enrollmentDate: "",
  })

  const validateStep = (stepNum) => {
    const newErrors = {}

    if (stepNum === 1) {
      if (!formData.document) newErrors.document = "Campo requerido"
      if (!formData.firstName) newErrors.firstName = "Campo requerido"
      if (!formData.lastName) newErrors.lastName = "Campo requerido"
    } else if (stepNum === 2) {
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Email inválido"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleSave = () => {
    if (validateStep(step)) {
      onSave(formData)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} role="presentation" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card rounded-lg shadow-lg z-50 w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {step === 1 ? "Datos Personales" : step === 2 ? "Información de Contacto" : "Asignación"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="docType">Tipo de Documento *</Label>
                <Select value={formData.documentType} onValueChange={(value) => handleChange("documentType", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                    <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                    <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
                    <SelectItem value="PA">Pasaporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc">Número de Documento *</Label>
                <Input
                  id="doc"
                  value={formData.document}
                  onChange={(e) => handleChange("document", e.target.value)}
                  className={errors.document ? "border-destructive" : ""}
                />
                {errors.document && <p className="text-xs text-destructive">{errors.document}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombres *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="ejemplo@email.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+57 312 456 7890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange("birthDate", e.target.value)}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="enroll"
                  checked={formData.enrollInFormation}
                  onCheckedChange={(checked) => handleChange("enrollInFormation", checked)}
                />
                <Label htmlFor="enroll">Matricular en formación</Label>
              </div>
              {formData.enrollInFormation && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="formation">Formación</Label>
                    <Select
                      value={formData.selectedFormation}
                      onValueChange={(value) => handleChange("selectedFormation", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar formación" />
                      </SelectTrigger>
                      <SelectContent>
                        {formations
                          .filter((f) => f.id !== "all")
                          .map((formation) => (
                            <SelectItem key={formation.id} value={formation.id}>
                              {formation.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="enrollDate">Fecha de Matrícula</Label>
                    <Input
                      id="enrollDate"
                      type="date"
                      value={formData.enrollmentDate}
                      onChange={(e) => handleChange("enrollmentDate", e.target.value)}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Paso {step} de 3</div>
          <div className="flex gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2">
                <ChevronLeft size={18} />
                Anterior
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                Siguiente
                <ChevronRight size={18} />
              </Button>
            ) : (
              <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Guardar
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
