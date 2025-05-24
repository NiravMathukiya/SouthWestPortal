"use client";

import RoleForm from "@/components/RoleForm";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Role {
  admin_role_id: number;
  role_name: string;
  // redirect_url: string;
  // permissions: string[]; // Adjust type based on actual permissions structure
}

const RolesEditPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [roleData, setRoleData] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get(`/api/role`, {
          params: { id },
        });
        console.log(res.data.data.data);
        setRoleData(res.data.data.data);
      } catch (error) {
        console.error("Failed to fetch role data", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRole();
  }, [id]);

  if (loading) return <p className="text-sm text-muted">Loading...</p>;
  if (!roleData) return <p className="text-sm text-red-500">Role not found.</p>;

  return (
    <RoleForm
      data={{
        id: roleData.admin_role_id,
        name: roleData.role_name,
        // redirectUrl: roleData.redirect_url,
        // permissions: roleData.permissions,
      }}
    />
  );
};

export default RolesEditPage;
