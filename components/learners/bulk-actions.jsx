"use client"

import { X, Plus, ToggleLeft, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BulkActions({ selectedCount, onDeselect, formations }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-30 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{selectedCount} aprendices seleccionados</span>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
            <Plus size={16} />
            Asignar a formación
          </Button>
          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
            <ToggleLeft size={16} />
            Cambiar estado
          </Button>
          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
            <Download size={16} />
            Exportar selección
          </Button>
          <Button size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive bg-transparent">
            <Trash2 size={16} />
            Eliminar
          </Button>
          <Button size="sm" variant="ghost" onClick={onDeselect} className="gap-2">
            <X size={16} />
            Deseleccionar
          </Button>
        </div>
      </div>
    </div>
  )
}
