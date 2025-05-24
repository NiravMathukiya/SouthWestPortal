"ise client"; 

import React from "react";
import Link from "next/link";
import { Trash } from "lucide-react";

interface HeaderProps {
  title?: string;
  handleDelete?: () => void;
}

const JamatiAnnouncementsHeader: React.FC<HeaderProps> = ({
  title = "Page Title",
  handleDelete,
}) => {
  return (
    <header className="bg-white shadow">
      <div className="flex flex-wrap justify-between items-center p-4 gap-y-2">
        {/* Title + Breadcrumb */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Link
              href="/"
              className="hover:text-primary transition-colors duration-300"
            >
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <span>{title}</span>
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Export PDF Button */}
          {/* <button className="flex items-center justify-center bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition-colors duration-300">
            <FileText size={16} className="mr-1" />
            <span className="hidden lg:inline">Export PDF</span>
          </button> */}

          {/* Export CSV Button */}
          {/* <button className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
            <Download size={16} className="mr-1" />
            <span className="hidden lg:inline">Export CSV</span>
          </button> */}

          {/* New Button */}
          {/* <Link
            href="/announcements/new"
            className="flex items-center justify-center bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors duration-300"
          >
            <Plus size={16} className="mr-1" />
            <span className="hidden lg:inline">New</span>
          </Link> */}

          {/* Filter Button */}
          <button onClick={handleDelete} className="flex items-center justify-center bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors duration-300">
            {/* <Filter size={16} className="mr-1" /> */}
            <Trash size={16} className="mr-1" />
            <span className="hidden lg:inline">Delete</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default JamatiAnnouncementsHeader;
