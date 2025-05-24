import React from "react";
import Link from "next/link";

interface HeaderProps {
  title?: string;
  onFilterClick?: () => void;
  showExportButton?: boolean;
}

const AddNewUserHeader: React.FC<HeaderProps> = ({ title = "Page Title" }) => {
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
        
      </div>
    </header>
  );
};

export default AddNewUserHeader;
