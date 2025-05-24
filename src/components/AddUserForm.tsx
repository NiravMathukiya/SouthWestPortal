"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Check, ChevronDown, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

// Type definitions
export type UserFormValues = {
  admin_id?: number; // Add this for edit functionality
  roles?: number[];
  username?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  status?: "enabled" | "disabled" | number; // Allow number type for API response
};

type Role = {
  admin_role_id: number;
  role_name: string;
  date_added?: string; // Added optional field from API response
};

type AddUserFormProps = {
  defaultValues?: UserFormValues;
};

export default function AddUserForm({ defaultValues }: AddUserFormProps) {
  const [formData, setFormData] = useState<UserFormValues>({
    roles: [],
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "enabled",
    admin_id: defaultValues?.admin_id, // Set to 0 for new users
  });

  const [activeTab, setActiveTab] = useState("general");
  const [statusOpen, setStatusOpen] = useState(false);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/api/role");
        console.log(response.data.data.roles);
        // Ensure we're getting the data in the expected format
        if (response.data) {
          setAllRoles(response.data.data.roles);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("Failed to load roles.");
        setAllRoles([]); // Set empty array instead of fallback data
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        roles: defaultValues.roles || [],
        username: defaultValues.username || "",
        password: defaultValues.password || "",
        confirmPassword: defaultValues.confirmPassword || "",
        firstName: defaultValues.firstName || "",
        lastName: defaultValues.lastName || "",
        email: defaultValues.email || "",
        phone: defaultValues.phone || "",
        status: defaultValues.status || "enabled",
        admin_id: defaultValues.admin_id || 0,
      });
    }
  }, [defaultValues]);

  const handleRoleChange = (roleId: number) => {
    setFormData((prev) => {
      const currentRoles = prev.roles || [];
      if (currentRoles.includes(roleId)) {
        return {
          ...prev,
          roles: currentRoles.filter((id) => id !== roleId),
        };
      } else {
        return {
          ...prev,
          roles: [...currentRoles, roleId],
        };
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only require password for new users, not for edits
    if (!defaultValues && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    try {
      const payload = {
        ...(defaultValues && { admin_id: formData.admin_id }), // Include admin_id for updates
        username: formData.username,
        ...(!defaultValues && { password: formData.password }), // Only send password for new users
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        role_id: formData.roles,
        status: formData.status === "enabled" ? 1 : 0 // Convert to number for API
      };

      const url = defaultValues ? `/api/users?id=${formData.admin_id}` : "/api/users";
      const method = defaultValues ? "put" : "post";

       await axios({
        method,
        url,
        data: payload,
      });

      toast.success(
        defaultValues ? "User updated successfully!" : "User created successfully!"
      );
      router.push("/admin/users");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save user. Please try again.");
    }
  };


  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-xl mt-2">
      <div className="flex items-center gap-2 bg-gray-300 px-6 py-4">
        <Pencil className="h-5 w-5" />
        <h1 className="text-xl font-semibold">Add User Form</h1>
      </div>

      <div className="border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-6 py-3 font-medium transition-colors ${activeTab === "general"
              ? "border-b-2 border-sky-600 text-sky-600"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            General
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {/* Roles */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Select Role
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {allRoles.map((role) => (
                <div key={role.admin_role_id} className="flex items-center">
                  <div
                    onClick={() => handleRoleChange(role.admin_role_id)}
                    className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border ${formData.roles?.includes(role.admin_role_id)
                      ? "border-sky-600 bg-sky-600 text-white"
                      : "border-gray-300 bg-white"
                      }`}
                  >
                    {formData.roles?.includes(role.admin_role_id) && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
                  <label
                    className="ml-2 cursor-pointer text-sm text-gray-700"
                    onClick={() => handleRoleChange(role.admin_role_id)}
                  >
                    {role.role_name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Username & Email */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border px-4 py-2"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border px-4 py-2"
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Passwords */}
          {/* // In AddUserForm.tsx, modify the password fields to be conditional: */}

          <>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!defaultValues}
                className="w-full rounded-lg border px-4 py-2"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!defaultValues}
                className="w-full rounded-lg border px-4 py-2"
                placeholder="Confirm password"
              />
            </div>
          </>

          {/* First/Last Name */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full rounded-lg border px-4 py-2"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full rounded-lg border px-4 py-2"
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Phone and Status */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-lg border px-4 py-2"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Status
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setStatusOpen(!statusOpen)}
                  className="flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2"
                >
                  <span className="capitalize">{formData.status}</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
                {statusOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border bg-white py-1 shadow-lg">
                    {["enabled", "disabled"].map((status) => (
                      <div
                        key={status}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            status: status as "enabled" | "disabled",
                          }));
                          setStatusOpen(false);
                        }}
                        className="cursor-pointer px-4 py-2 capitalize hover:bg-sky-100"
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/admin/users")}
              className="rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-5 py-2 text-sm text-white hover:bg-sky-700"
            >
              Save User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
