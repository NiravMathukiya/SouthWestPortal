"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AddUserForm, { UserFormValues } from "@/components/AddUserForm"; // adjust the import path as needed

// In EditUserPage.tsx, update the data transformation:
const EditUserPage = () => {
  const params = useParams();
  const userId = params?.id as string;

  const [userData, setUserData] = useState<UserFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users?id=${userId}`);
        const user = response.data.data.data;

        // Transform API data to match form structure
        setUserData({
          admin_id: user.admin_id,
          roles: [user.admin_role], // Assuming admin_role is the role ID
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          status: user.status === 1 ? "enabled" : "disabled"
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div className="p-6">Loading user data...</div>;
  if (!userData) return <div className="p-6 text-red-600">User not found.</div>;

  // { console.log(userData) }

  return (
    <div className="p-6">
      <AddUserForm defaultValues={userData} />
    </div>
  );
};

export default EditUserPage;
