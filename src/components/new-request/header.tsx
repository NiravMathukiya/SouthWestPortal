"use client";

import axios from "axios";
import { LogOut, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
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
    <header className="bg-white shadow">
      <div className="p-4 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Section - Logo */}
        <div className="flex-1 flex justify-center md:justify-start lg:ml-10">
          <div className="border border-gray-300 p-4 md:p-6 bg-white rounded-xl text-center">
            <h2 className="text-xs sm:text-sm md:text-xl font-light text-black">
              ISMAILI COUNCIL FOR
            </h2>
            <h2 className="text-xs sm:text-sm font-light text-black">
              THE SOUTHWESTERN USA
            </h2>
          </div>
        </div>

        {/* Center Section - Title */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-base sm:text-lg md:text-2xl font-bold text-[#005c34]">
            REGIONAL COMMUNICATION PORTAL
          </h2>
          <p className="text-xs sm:text-sm md:text-lg">
            Communication Request Form
          </p>
        </div>

        {/* Right Section - Login Success */}
        <div className="flex-1 flex justify-center md:justify-end w-full lg:w-auto">
          <div className="flex items-center justify-end ">
            <div className="bg-green-500 text-white py-2 px-4 rounded-full flex items-center text-sm sm:text-base">
              <Check size={18} className="mr-2" />
              <span>Login Successful!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white p-4 flex flex-col lg:flex-row items-start lg:items-center lg:ml-10 gap-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-[#B49959] flex items-center justify-center text-white font-bold mr-4">
            AI
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg">Aminul Islam</h3>
            <button className="text-gray-500 text-sm">Edit Profile</button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="ml-auto flex flex-wrap gap-2 lg:gap-4 w-full lg:w-auto justify-start lg:justify-end">
          <Link href="/admin/announcements">
            <button className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-3xl text-sm sm:text-base">
              Communications
            </button>
          </Link>
          <Link href="/admin">
            <button className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-3xl text-sm sm:text-base">
              Dashboard
            </button>
          </Link>

          <button
            onClick={logout}
            className="bg-[#B49959] text-white py-2 px-4 rounded-3xl text-sm sm:text-base"
          >
            <p className="hidden md:inline-block"> Log Out</p>
            <span className="inline-block md:hidden">
              <LogOut size={16}> </LogOut>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
