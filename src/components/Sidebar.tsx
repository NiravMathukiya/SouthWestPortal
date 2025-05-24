"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { closeSidebar } from "@/store/slices/sidebarSlice";
import { usePathname } from "next/navigation";

type SidebarItem = {
  name: string;
  path: string;
};

type SidebarSection = {
  title: string;
  icon: keyof typeof Icons;
  items: SidebarItem[];
};

const sidebarData: SidebarSection[] = [
  {
    title: "Master Admin",
    icon: "Lock",
    items: [
      { name: "Manage All Users", path: "/admin/users" },
      { name: "portal Update List", path: "/admin/portalupdates" },
      { name: "Category List", path: "/admin/portalupdates/category" },
      { name: "Master User Logs", path: "/admin/users/user-log" },
      { name: "Manage Roles", path: "/admin/roles" },
    ],
  },
  {
    title: "Communications Request",
    icon: "Mail",
    items: [
      { name: "Jamati Announcements", path: "/admin/jamati-announcements" },
      {
        name: "Communication Request Submissions",
        path: "/admin/announcements",
      },
      { name: "Communication Request Subscribers", path: "/admin/subscribers" },
      { name: "Ismaili Insight", path: "/admin/ismaili-insight" },
      { name: "Social Media", path: "/admin/social-media" },
    ],
  },
  {
    title: "Graphics Request (1)",
    icon: "BarChart",
    items: [
      {
        name: "Graphics Request Submissions (1)",
        path: "/admin/graphics-request",
      },
    ],
  },
  {
    title: "Bookings",
    icon: "Calendar",
    items: [
      { name: "Bookings", path: "/admin/bookings" },
      { name: "Pending Bookings", path: "/admin/bookings/pending-bookings" },
      { name: "Booking Comments (15)", path: "/admin/bookings/booking-comments" },
      { name: "Double Bookings", path: "/admin/bookings/double-bookings" },
      { name: "Booking Subscribers", path: "/admin/booking-subscribers" },
    ],
  },

  {
    title: "Food Support",
    icon: "Coffee",
    items: [
      { name: "Food Support Dashboard", path: "/admin/food-dashboard" },
      { name: "Food Support Subscribers", path: "/admin/food-subscribers" },
    ],
  }, {
    title: "JK Data",
    icon: "Database",
    items: [
      { name: "Add New", path: "/admin/jkData/addNew" },
      { name: "View All", path: "/admin/jkData/viewAll" },
      { name: "Report", path: "/admin/jkData/Report" },
      { name: "Jk Titles", path: "/admin/jkData/jkTitles" },
      { name: "Jk Names", path: "/admin/jkData/jkNames" },
      { name: "Jk Subscribers", path: "/admin/jkData/jkSubscribers" },
    ]
  },
  {
    title: "Volunteer Profiles",
    icon: "User2",
    items: [
      { name: "Volunteer Profiles", path: "/admin/volunteerProfiles" },
      { name: "Add New Volunteer Profiles", path: "/admin/volunteerProfiles/addNewVolunteer" }
    ]
  },
  {
    title: "Database",
    icon: "Database",
    items: [
      {
        name: "Volunteer Profile Institutions List",
        path: "/admin/database/volunteer-profile",
      },
      { name: "Institutions List", path: "/admin/database/InstitutionsList" },
      { name: "JK Addresses List(B)", path: "/admin/database/jkAddresses" },
      { name: "JK Spaces List(B)", path: "/admin/database/JkSpacesList" },
      { name: "Hotel List(P)", path: "/admin/database/hotelList" },
      {
        name: "Hotel Location List(P)",
        path: "/admin/database/hotelLocationList",
      },
      {
        name: "Food Category List(P)",
        path: "/admin/database/foodCategoryList",
      },
      { name: "Food items List(P)", path: "/admin/database/foodItemList" },
      { name: "Cuisines List(P)", path: "/admin/database/cuisinesList" },
      {
        name: "Volunteer Driver List(P)",
        path: "/admin/database/volunteerDriverList",
      },
      {
        name: "Bulk Message Template",
        path: "/admin/database/BulkMessageTemplate",
      },
    ],
  },

];

export default function Sidebar() {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<string>("");
  const dispatch = useDispatch();
  const pathname = usePathname();

  const toggleMenu = (index: number) => {
    setActiveMenu((prev) => (prev === index ? null : index));
  };

  // Automatically open the menu that contains the current route
  useEffect(() => {
    // Find which section contains the current path
    const findActiveMenu = () => {
      for (let i = 0; i < sidebarData.length; i++) {
        const section = sidebarData[i];
        if (section.items.some(item => pathname.startsWith(item.path))) {
          return i;
        }
      }
      return null;
    };

    const menuIndex = findActiveMenu();
    setActiveMenu(menuIndex);

    // Also set the active item
    if (menuIndex !== null) {
      const activeItem = sidebarData[menuIndex].items.find(item =>
        pathname.startsWith(item.path)
      );
      if (activeItem) {
        setActiveItem(activeItem.name);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(closeSidebar());
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <aside className="sidebar bg-[#1e293b] text-white shadow-md fixed md:sticky top-0 left-0 h-screen w-66 flex flex-col z-40">
      {/* Header section */}
      <div className="p-4 border-b border-slate-700 flex-shrink-0">
        <h3 className="text-gray-300">Karishma Sharif</h3>
        <div className="flex items-center mt-1">
          <span className="bg-blue-500 w-2 h-2 rounded-full mr-2"></span>
          <span className="text-xs text-gray-400">Master Admin</span>
        </div>
      </div>

      {/* Navigation section - will scroll if content overflows */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {sidebarData.map((section, index) => {
          const Icon = Icons[section.icon] as React.ElementType;
          const isSectionOpen = activeMenu === index;

          return (
            <div key={index} className="mb-1">
              <div
                className="sidebar-item flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-slate-700 rounded"
                onClick={() => toggleMenu(index)}
              >
                <div className="flex items-center gap-2">
                  <Icon size={18} />
                  <span>{section.title}</span>
                </div>
                <Icons.ChevronDown
                  size={16}
                  className={`transform transition-transform ${isSectionOpen ? "rotate-180" : ""
                    }`}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${isSectionOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
                  }`}
              >
                <div className="pl-8 py-1 space-y-1">
                  {section.items.map((item, i) => (
                    <Link key={i} href={item.path} legacyBehavior>
                      <a
                        onClick={() => setActiveItem(item.name)}
                        className={`sidebar-item px-2 py-1 text-sm rounded cursor-pointer block hover:bg-slate-700 ${activeItem === item.name ? "font-medium bg-slate-700" : "text-gray-300"
                          }`}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}