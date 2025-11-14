"use client"

import { useState } from "react"
import { X, Mail, Phone, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function LearnerDrawer({ learner, onClose, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} role="presentation" />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-full max-w-[400px] bg-card border-l border-border shadow-lg z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Detalles del Aprendiz</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Profile */}
        <div className="p-4 border-b border-border">
          <div className="text-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-primary">
              {learner.firstName[0]}
              {learner.lastName[0]}
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {learner.firstName} {learner.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{learner.document}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="formations">Formaciones</TabsTrigger>
            <TabsTrigger value="attendance">Asistencia</TabsTrigger>
          </TabsList>

          {/* Personal Info */}
          <TabsContent value="personal" className="space-y-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Documento</label>
              <p className="text-sm text-foreground">
                {learner.documentType} - {learner.document}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Nombre Completo</label>
              <p className="text-sm text-foreground">
                {learner.firstName} {learner.lastName}
              </p>
            </div>
            <div className="space-y-2 flex items-center gap-2">
              <Mail size={16} className="text-muted-foreground" />
              <a href={`mailto:${learner.email}`} className="text-sm text-primary hover:underline">
                {learner.email}
              </a>
            </div>
            <div className="space-y-2 flex items-center gap-2">
              <Phone size={16} className="text-muted-foreground" />
              <p className="text-sm text-foreground">{learner.phone}</p>
            </div>
            <div className="space-y-2 flex items-center gap-2">
              <Calendar size={16} className="text-muted-foreground" />
              <p className="text-sm text-foreground">{new Date(learner.birthDate).toLocaleDateString("es-CO")}</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Fecha de Registro</label>
              <p className="text-sm text-foreground">
                {new Date(learner.registrationDate).toLocaleDateString("es-CO")}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Estado</label>
              <Badge
                variant={learner.state === "active" ? "default" : "secondary"}
                className={
                  learner.state === "active"
                    ? "bg-primary text-primary-foreground w-fit"
                    : "bg-muted text-muted-foreground w-fit"
                }
              >
                {learner.state === "active" ? "Activo" : "Inactivo"}
              </Badge>
            </div>
          </TabsContent>

          {/* Formations */}
          <TabsContent value="formations" className="space-y-3">
            {learner.formations.map((formation) => (
              <div key={formation.id} className="border border-border rounded-lg p-3">
                <h4 className="font-medium text-sm text-foreground mb-1">{formation.name}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={14} className="text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    {new Date(formation.startDate).toLocaleDateString("es-CO")}
                  </p>
                </div>
                <Badge className="text-xs" variant="secondary">
                  {formation.status === "active"
                    ? "En curso"
                    : formation.status === "completed"
                      ? "Completada"
                      : "Pausada"}
                </Badge>
              </div>
            ))}
            <Button className="w-full mt-4 bg-transparent" variant="outline">
              Matricular en Formación
            </Button>
          </TabsContent>

          {/* Attendance */}
          <TabsContent value="attendance" className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Asistencia General</span>
              </div>
              <div className="text-2xl font-bold text-primary mb-2">{learner.attendanceRate}%</div>
              <Progress value={learner.attendanceRate} className="h-2" />
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="border-t border-border p-4 space-y-2 sticky bottom-0 bg-card">
          <Button onClick={onEdit} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Editar
          </Button>
          <Button
            onClick={onDelete}
            variant="outline"
            className="w-full text-destructive hover:text-destructive border-destructive/50 bg-transparent"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </>
  )
}
