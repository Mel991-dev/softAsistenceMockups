"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, Edit2, Trash2 } from "lucide-react"

export default function LearnerCards({ learners, onViewLearner, onDeleteLearner }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {learners.map((learner) => (
        <Card key={learner.id} className="p-4 flex flex-col hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
              {learner.firstName[0]}
              {learner.lastName[0]}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm">
                {learner.firstName} {learner.lastName}
              </h3>
              <p className="text-xs text-muted-foreground">{learner.document}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4 text-sm">
            <p className="text-muted-foreground truncate" title={learner.email}>
              📧 {learner.email}
            </p>
            <Badge variant="secondary" className="w-fit bg-primary/10 text-primary text-xs">
              {learner.currentFormation}
            </Badge>
            <Badge
              variant={learner.state === "active" ? "default" : "secondary"}
              className={`w-fit text-xs ${learner.state === "active" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {learner.state === "active" ? "Activo" : "Inactivo"}
            </Badge>
          </div>

          <div className="flex gap-2 pt-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              onClick={() => onViewLearner(learner)}
            >
              <Eye size={14} />
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Edit2 size={14} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-destructive hover:text-destructive bg-transparent"
              onClick={() => onDeleteLearner(learner)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
