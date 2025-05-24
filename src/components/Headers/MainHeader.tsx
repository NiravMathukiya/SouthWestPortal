"use client";

import React from "react";
import { Menu } from "lucide-react";
import { toggleSidebar } from "../../store/slices/sidebarSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store"; // Import AppDispatch from your store
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const MainHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.post("/api/logout");
      if (response.status === 200) {
        router.push("admin/login");
        console.log("Logged out successfully");
      } else {
        console.log("Failed to log out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="flex items-center justify-between bg-[#EFEFEF] p-3 shadow-md w-full">
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-1 rounded hover:bg-gray-200"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold md:block text-green-900">
            ISMAILI COUNCIL FOR THE SOUTHWESTERN USA
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="hidden lg:block">GO TO DEV</span>
        <span className="hidden lg:block">DEV ENVIRONMENT</span>
        <span className="hidden md:block">Mon, May 12, 2025 00:35</span>
        <button
          className="text-blue-600 hover:underline flex items-center gap-1"
          onClick={logout}
        >
          Logout
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 10a1 1 0 011-1h9.586l-2.293-2.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 01-1-1z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default MainHeader;
