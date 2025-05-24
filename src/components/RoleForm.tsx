"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { permission as allPermissions } from "@/lib/permissionData";
import { useRouter } from "next/navigation";

interface RoleData {
  id?: number;
  name: string;
  // redirectUrl: string;
  // permissions: string[];
}

interface RoleFormProps {
  data?: RoleData;
}

export default function RoleForm({ data }: RoleFormProps) {
  const router = useRouter();
  const [name, setName] = useState(data?.name || "");
  // const [redirectUrl, setRedirectUrl] = useState(data?.redirectUrl || "");
  // const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
  //   data?.permissions || []
  // );
  const [, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isEditMode = !!data;

  // const handlePermissionToggle = (perm: string) => {
  //   setSelectedPermissions((prev) =>
  //     prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
  //   );
  // };

  // const handleRemovePermission = (perm: string) => {
  //   setSelectedPermissions((prev) => prev.filter((p) => p !== perm));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && data?.id) {
        await axios.put(`/api/role?id=${data.id}`, {
          role_name: name,
          date_added: new Date().toISOString()
          // redirect_url: redirectUrl,
          // permissions: selectedPermissions,
        });
        toast.success("Role updated successfully!");
        router.push("/admin/roles");
      } else {
        await axios.post("/api/role", {
          role_name: name,
          date_added: new Date().toISOString()
          // name,
          // redirect_url: redirectUrl,
          // permissions: selectedPermissions,
        });
        toast.success("Role created successfully!");
        setName("");
        // setRedirectUrl("");
        // setSelectedPermissions([]);
        // revalidatePath("/admin/roles");
        router.push("/admin/roles");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save role.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl w-full mx-auto p-6 md:p-8 bg-white shadow-xl rounded-2xl space-y-6 transition-all duration-300"
    >
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        {isEditMode ? "Edit Role" : "Add New Role"}
      </h1>

      {/* Role Name */}
      <div>
        <label className="block font-medium text-sm mb-2 text-gray-700">
          Role Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
          placeholder="Enter role name"
        />
      </div>

      {/* Redirect URL */}
      {/* <div>
        <label className="block font-medium text-sm mb-2 text-gray-700">
          Redirect URL
        </label>
        <input
          value={redirectUrl}
          onChange={(e) => setRedirectUrl(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
          placeholder="https://example.com/redirect"
        />
      </div> */}

      {/* Permissions */}
      {/* <div className="relative" ref={dropdownRef}>
        <label className="block font-medium text-sm mb-2 text-gray-700">
          Permissions
        </label>
        <div
          className="border rounded-lg px-3 py-2 w-full cursor-pointer min-h-[48px] flex flex-wrap gap-2 items-center bg-gray-50"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {selectedPermissions.length === 0 && (
            <span className="text-gray-400">Choose permissions...</span>
          )}
          {selectedPermissions.map((perm) => (
            <span
              key={perm}
              className="flex items-center gap-1 bg-green-100 text-black -800 text-xs md:font-medium px-3 py-1 rounded-full"
            >
              {perm}
              <button
                type="button"
                className="text-red-500 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemovePermission(perm);
                }}
              >
                &times;
              </button>
            </span>
          ))}
        </div> */}

      {/* {showDropdown && (
          <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fade-in">
            {allPermissions.map((perm) => (
              <div
                key={perm}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-green-100 transition ${selectedPermissions.includes(perm)
                    ? "bg-green-50 font-semibold text-green-700"
                    : "text-gray-700"
                  }`}
                onClick={() => handlePermissionToggle(perm)}
              >
                {perm}
              </div>
            ))}
          </div>
        )}
      </div> */}

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:opacity-90 shadow-md transition"
      >
        {isEditMode ? "Update Role" : "Create Role"}
      </button>
    </form>
  );
}
