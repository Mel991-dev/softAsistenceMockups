"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import UserTable from "@/components/admin/components/user-table"
import AddUserModal from "@/components/admin/components/add-user-modal"

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@sena.edu.co",
      role: "coordinator",
      status: "active",
      lastAccess: "2025-11-12 14:30",
      formations: 3,
      avatar: "CR",
    },
    {
      id: 2,
      name: "María González",
      email: "maria.gonzalez@sena.edu.co",
      role: "instructor",
      status: "active",
      lastAccess: "2025-11-11 09:15",
      formations: 2,
      avatar: "MG",
    },
    {
      id: 3,
      name: "Juan Pérez",
      email: "juan.perez@sena.edu.co",
      role: "instructor",
      status: "inactive",
      lastAccess: "2025-10-20 16:45",
      formations: 1,
      avatar: "JP",
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }])
    setShowAddModal(false)
  }

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((u) => u.id !== userId))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Gestión de Usuarios</h2>
        <p className="text-sm text-muted-foreground mt-1">Administra usuarios, roles y permisos del sistema</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-primary"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-primary text-sm"
          >
            <option value="all">Todos los roles</option>
            <option value="super-admin">Super Admin</option>
            <option value="coordinator">Coordinador</option>
            <option value="instructor">Instructor</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-primary text-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Agregar Usuario</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <UserTable users={filteredUsers} onDelete={handleDeleteUser} />
      </div>

      {/* Add User Modal */}
      {showAddModal && <AddUserModal onClose={() => setShowAddModal(false)} onAdd={handleAddUser} />}
    </div>
  )
}
