"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit2, Plus, Trash2, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LearnerTable({
  learners,
  selectedIds,
  onSelectAll,
  onSelectLearner,
  onViewLearner,
  onDeleteLearner,
}) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left">
                <Checkbox
                  checked={selectedIds.size === learners.length && learners.length > 0}
                  onCheckedChange={(checked) => onSelectAll(checked)}
                  aria-label="Seleccionar todos"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Nombre</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Documento</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Teléfono</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Formación</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {learners.map((learner) => (
              <tr key={learner.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIds.has(learner.id)}
                    onCheckedChange={(checked) => onSelectLearner(learner.id, checked)}
                    aria-label={`Seleccionar ${learner.firstName} ${learner.lastName}`}
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {learner.firstName[0]}
                      {learner.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium">
                        {learner.firstName} {learner.lastName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{learner.document}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{learner.email}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{learner.phone}</td>
                <td className="px-4 py-3 text-sm">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {learner.currentFormation}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Badge
                    variant={learner.state === "active" ? "default" : "secondary"}
                    className={
                      learner.state === "active"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {learner.state === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewLearner(learner)}
                      aria-label={`Ver detalles de ${learner.firstName}`}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" aria-label="Editar aprendiz">
                      <Edit2 size={16} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Plus size={16} className="mr-2" />
                          Asignar formación
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeleteLearner(learner)} className="text-destructive">
                          <Trash2 size={16} className="mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-border text-sm text-muted-foreground">
        Total de registros: {learners.length}
      </div>
    </div>
  )
}
