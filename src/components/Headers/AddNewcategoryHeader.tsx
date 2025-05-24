import React from "react";
import Link from "next/link";

interface HeaderProps {
  title?: string;
  isLoading?: boolean; // Add isLoading prop
}

const AddNewCategoryHeader: React.FC<HeaderProps> = ({
  title = "Page Title",
  isLoading = false, // Default to false
}) => {
  return (
    <header className="bg-white shadow">
      <div className="flex flex-wrap justify-between items-center p-4 gap-y-2">
        {/* Title + Breadcrumb */}
        <div>
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              {/* Skeleton for title */}
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              {/* Skeleton for breadcrumb */}
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-200 rounded w-12"></div>
                <div className="h-4 bg-gray-200 rounded w-4"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Right side buttons - add skeleton if needed */}
        {isLoading && (
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AddNewCategoryHeader;