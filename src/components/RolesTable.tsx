"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export interface Role {
  admin_role_id: number;
  role_name: string;
  // permissions: string[];
  // redirect_url: string;
}

interface RolesTableProps {
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
}

const RolesTable: React.FC<RolesTableProps> = ({ roles, setRoles }) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/role?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Role deleted successfully");

      // Remove role from UI instantly
      setRoles((prev) => prev.filter((role) => role.admin_role_id !== id));
    } catch {
      console.error("Failed to delete role");
      toast.error("Failed to delete role");
    }
  };

  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-green-700  text-white text-left">
          <tr>
            <th className="py-2 px-4 font-medium">NAME</th>
            {/* <th className="py-2 px-4 font-medium">PERMISSIONS</th>
            <th className="py-2 px-4 font-medium">REDIRECT URL</th> */}
            <th className="py-2 px-4 font-medium">ACTION</th>
            <th className="py-2 px-4 font-medium">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.admin_role_id} className="border-t border-gray-200">
              <td className="py-2 px-4">{role.role_name}</td>
              {/* <td className="py-2 px-4 space-x-2">
                {role.permissions.map((perm, idx) => (
                  <span key={idx} className="text-sm text-gray-600">
                    {perm}
                  </span>
                ))}
              </td>
              <td className="py-2 px-4">{role.redirect_url}</td> */}
              <td className="py-2 px-4">
                <button
                  onClick={() => router.push(`/admin/roles/${role.admin_role_id}`)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  EDIT
                </button>
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleDelete(role.admin_role_id)}
                  className="border border-green-900 text-green-900 px-3 py-1 rounded hover:bg-red-100"
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesTable;
