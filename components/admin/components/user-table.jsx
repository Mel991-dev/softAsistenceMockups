"use client"

import { Edit2, RotateCcw, Eye, Trash2 } from "lucide-react"

export default function UserTable({ users, onDelete }) {
  const getRoleBadgeColor = (role) => {
    const colors = {
      "super-admin": "bg-red-100 text-red-800",
      coordinator: "bg-blue-100 text-blue-800",
      instructor: "bg-green-100 text-green-800",
      learner: "bg-gray-100 text-gray-800",
    }
    return colors[role] || "bg-gray-100 text-gray-800"
  }

  const getRoleLabel = (role) => {
    const labels = {
      "super-admin": "Super Admin",
      coordinator: "Coordinador",
      instructor: "Instructor",
      learner: "Aprendiz",
    }
    return labels[role] || role
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted border-b border-border">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">Usuario</th>
            <th className="px-6 py-3 text-left font-semibold">Email</th>
            <th className="px-6 py-3 text-left font-semibold">Rol</th>
            <th className="px-6 py-3 text-left font-semibold">Estado</th>
            <th className="px-6 py-3 text-left font-semibold">Último Acceso</th>
            <th className="px-6 py-3 text-left font-semibold">Formaciones</th>
            <th className="px-6 py-3 text-center font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-border hover:bg-muted transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {user.avatar}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                  {getRoleLabel(user.role)}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status === "active" ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-6 py-4 text-muted-foreground">{user.lastAccess}</td>
              <td className="px-6 py-4 text-center">{user.formations}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button className="p-2 hover:bg-muted rounded transition-colors" aria-label="Ver detalles">
                    <Eye size={16} className="text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded transition-colors" aria-label="Editar">
                    <Edit2 size={16} className="text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded transition-colors" aria-label="Resetear contraseña">
                    <RotateCcw size={16} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-2 hover:bg-red-50 rounded transition-colors"
                    aria-label="Eliminar"
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
