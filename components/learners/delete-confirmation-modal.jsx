"use client"

import { useState } from "react"
import { X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DeleteConfirmationModal({ learner, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState("")

  const isConfirmed = confirmText.toUpperCase() === "ELIMINAR"

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} role="presentation" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card rounded-lg shadow-lg z-50 w-full max-w-[400px]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Confirmar eliminación</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <Alert variant="destructive">
            <AlertTriangle size={16} />
            <AlertDescription>
              ¿Estás seguro de eliminar a {learner.firstName} {learner.lastName}?
            </AlertDescription>
          </Alert>

          <p className="text-sm text-muted-foreground">
            Esta acción no se puede deshacer. Por favor, escribe "ELIMINAR" para confirmar.
          </p>

          <Input
            placeholder='Escribe "ELIMINAR" para confirmar'
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="font-mono"
          />
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!isConfirmed}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </>
  )
}
