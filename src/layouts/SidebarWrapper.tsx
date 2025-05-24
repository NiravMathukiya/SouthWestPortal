"use client";

import MainHeader from "@/components/Headers/MainHeader";
import Sidebar from "@/components/Sidebar";
import { closeSidebar } from "@/store/slices/sidebarSlice";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface SideBarWrapperProps {
  children: ReactNode;
}

const SideBarWrapper: React.FC<SideBarWrapperProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  useEffect(() => {
    if (window.innerWidth < 768) {
      dispatch(closeSidebar());
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col w-screen h-screen">
      <MainHeader />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with animated width */}
        <div
          className={`bg-white border-r overflow-y-auto transition-all  hide-scrollbar duration-300 ease-in-out ${
            isSidebarOpen ? "w-[250px] min-w-[200px]" : "w-0 min-w-0"
          }`}
        >
          <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 md:p-6 p-2  transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SideBarWrapper;
