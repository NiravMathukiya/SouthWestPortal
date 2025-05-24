"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import RolesTable from "@/components/RolesTable";
import type { Role } from "@/components/RolesTable";
import { SkeletonTable } from "@/Skeletons/SkeletonTable";

const RolePage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true); // Optional: show loading spinner
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("/api/role");
        console.log(res.data.data.roles);
        setRoles(res.data.data.roles || []); // Adjust based on your API response structure
      } catch (err) {
        console.error("Error fetching roles:", err);
        setError("Failed to load roles");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div>
      {/* header */}
      <header className="bg-white shadow">
        <div className="flex flex-wrap justify-between items-center p-4 gap-y-2">
          {/* Title + Breadcrumb */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Roles</h1>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Link
                href="/admin"
                className="hover:text-primary transition-colors duration-300"
              >
                Home
              </Link>
              <span className="mx-2">&gt;</span>
              <span>Manage Roles</span>
            </div>
          </div>

          {/* Right side button */}
          <div>
            <div className="px-3 py-2 bg-green-600 text-white rounded-lg">
              <Link
                href="/admin/roles/new"
                className="hover:text-primary transition-colors duration-300"
              >
                Add New Roles
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* content */}
      <div className="">
        {loading ? (
          <SkeletonTable rowCount={8} rowHeight="h-4" rowWidths={["w-1/6", "w-2/6", "w-1/6", "w-1/6", "w-1/6"]} />
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <RolesTable roles={roles} setRoles={setRoles} />
        )}
      </div>
    </div>
  );
};

export default RolePage;
