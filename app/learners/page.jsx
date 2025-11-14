"use client"

import { useState, useMemo } from "react"
import { Search, Upload, Plus, Download, Grid3x3, List, User, X } from "lucide-react"
import Breadcrumb from "@/components/learners/breadcrumb"
import LearnerTable from "@/components/learners/learner-table"
import LearnerCards from "@/components/learners/learner-cards"
import LearnerDrawer from "@/components/learners/learner-drawer"
import AddLearnerModal from "@/components/learners/add-learner-modal"
import ImportModal from "@/components/learners/import-modal"
import DeleteConfirmationModal from "@/components/learners/delete-confirmation-modal"
import BulkActions from "@/components/learners/bulk-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockLearners = [
  {
    id: "1",
    document: "1010123456",
    documentType: "CC",
    firstName: "Juan",
    lastName: "Pérez García",
    email: "juan.perez@example.com",
    phone: "+57 312 456 7890",
    birthDate: "1990-05-15",
    registrationDate: "2024-01-10",
    currentFormation: "Programación en Python",
    state: "active",
    avatar: null,
    formations: [
      { id: "f1", name: "Programación en Python", startDate: "2024-01-10", status: "active" },
      { id: "f2", name: "JavaScript Avanzado", startDate: "2023-06-15", status: "completed" },
    ],
    attendanceRate: 92,
  },
  {
    id: "2",
    document: "1010234567",
    documentType: "CC",
    firstName: "María",
    lastName: "González López",
    email: "maria.gonzalez@example.com",
    phone: "+57 315 789 0123",
    birthDate: "1995-08-22",
    registrationDate: "2024-02-01",
    currentFormation: "Diseño UX/UI",
    state: "active",
    avatar: null,
    formations: [{ id: "f3", name: "Diseño UX/UI", startDate: "2024-02-01", status: "active" }],
    attendanceRate: 85,
  },
  {
    id: "3",
    document: "1010345678",
    documentType: "CC",
    firstName: "Carlos",
    lastName: "Rodríguez Martínez",
    email: "carlos.rodriguez@example.com",
    phone: "+57 318 234 5678",
    birthDate: "1988-03-10",
    registrationDate: "2023-11-15",
    currentFormation: "Administración de Redes",
    state: "inactive",
    avatar: null,
    formations: [{ id: "f4", name: "Administración de Redes", startDate: "2023-11-15", status: "paused" }],
    attendanceRate: 65,
  },
]

const mockFormations = [
  { id: "all", name: "Todas las formaciones" },
  { id: "f1", name: "Programación en Python" },
  { id: "f3", name: "Diseño UX/UI" },
  { id: "f4", name: "Administración de Redes" },
]

export default function LearnersPage() {
  const [learners, setLearners] = useState(mockLearners)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [formationFilter, setFormationFilter] = useState("all")
  const [viewMode, setViewMode] = useState("table")
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [selectedLearner, setSelectedLearner] = useState(null)
  const [showDrawer, setShowDrawer] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [learnerToDelete, setLearnerToDelete] = useState(null)

  // Filter learners based on search and filters
  const filteredLearners = useMemo(() => {
    return learners.filter((learner) => {
      const matchesSearch =
        learner.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${learner.firstName} ${learner.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        learner.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || learner.state === statusFilter
      const matchesFormation = formationFilter === "all" || learner.currentFormation.includes(formationFilter)

      return matchesSearch && matchesStatus && matchesFormation
    })
  }, [learners, searchTerm, statusFilter, formationFilter])

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(new Set(filteredLearners.map((l) => l.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectLearner = (id, checked) => {
    const newSelected = new Set(selectedIds)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedIds(newSelected)
  }

  const handleViewLearner = (learner) => {
    setSelectedLearner(learner)
    setShowDrawer(true)
  }

  const handleDeleteClick = (learner) => {
    setLearnerToDelete(learner)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    if (learnerToDelete) {
      setLearners(learners.filter((l) => l.id !== learnerToDelete.id))
      setShowDeleteModal(false)
      setLearnerToDelete(null)
    }
  }

  const handleAddLearner = (newLearner) => {
    setLearners([...learners, { ...newLearner, id: String(learners.length + 1) }])
    setShowAddModal(false)
  }

  const handleExport = (format) => {
    console.log(`Exporting ${format}`)
    // TODO: Implement export functionality
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="px-6 py-4">
          <Breadcrumb />
          <div className="mt-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Gestión de Aprendices</h1>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="gap-2 border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
                onClick={() => setShowImportModal(true)}
              >
                <Upload size={18} />
                Importar CSV
              </Button>
              <Button
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={18} />
                Agregar Aprendiz
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-card border-b border-border mx-6 my-6 rounded-lg p-4">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por documento, nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2">
              <ToggleGroup value={statusFilter} onValueChange={setStatusFilter} type="single">
                <ToggleGroupItem value="all">Todos</ToggleGroupItem>
                <ToggleGroupItem value="active">Activos</ToggleGroupItem>
                <ToggleGroupItem value="inactive">Inactivos</ToggleGroupItem>
              </ToggleGroup>

              <Select value={formationFilter} onValueChange={setFormationFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Seleccionar formación" />
                </SelectTrigger>
                <SelectContent>
                  {mockFormations.map((formation) => (
                    <SelectItem key={formation.id} value={formation.id}>
                      {formation.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 items-center">
              <ToggleGroup value={viewMode} onValueChange={setViewMode} type="single">
                <ToggleGroupItem value="table">
                  <List size={18} />
                </ToggleGroupItem>
                <ToggleGroupItem value="cards">
                  <Grid3x3 size={18} />
                </ToggleGroupItem>
              </ToggleGroup>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Download size={18} />
                    Exportar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport("xlsx")}>Excel (.xlsx)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("csv")}>CSV (.csv)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("pdf")}>PDF</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {filteredLearners.length === 0 ? (
          <div className="bg-card rounded-lg p-12 text-center">
            <User size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchTerm ? "No se encontraron resultados" : "No hay aprendices registrados"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? `Para "${searchTerm}"` : "Comienza agregando tu primer aprendiz"}
            </p>
            {searchTerm ? (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Limpiar búsqueda
              </Button>
            ) : (
              <Button onClick={() => setShowAddModal(true)}>Agregar tu primer aprendiz</Button>
            )}
          </div>
        ) : viewMode === "table" ? (
          <LearnerTable
            learners={filteredLearners}
            selectedIds={selectedIds}
            onSelectAll={handleSelectAll}
            onSelectLearner={handleSelectLearner}
            onViewLearner={handleViewLearner}
            onDeleteLearner={handleDeleteClick}
          />
        ) : (
          <LearnerCards
            learners={filteredLearners}
            onViewLearner={handleViewLearner}
            onDeleteLearner={handleDeleteClick}
          />
        )}
      </div>

      {/* Modals and Drawers */}
      {showDrawer && selectedLearner && (
        <LearnerDrawer
          learner={selectedLearner}
          onClose={() => setShowDrawer(false)}
          onEdit={() => {
            // TODO: Open edit modal
          }}
          onDelete={() => {
            handleDeleteClick(selectedLearner)
            setShowDrawer(false)
          }}
        />
      )}

      {showAddModal && (
        <AddLearnerModal onClose={() => setShowAddModal(false)} onSave={handleAddLearner} formations={mockFormations} />
      )}

      {showImportModal && <ImportModal onClose={() => setShowImportModal(false)} />}

      {showDeleteModal && learnerToDelete && (
        <DeleteConfirmationModal
          learner={learnerToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {selectedIds.size > 0 && (
        <BulkActions
          selectedCount={selectedIds.size}
          onDeselect={() => setSelectedIds(new Set())}
          formations={mockFormations}
        />
      )}
    </div>
  )
}
