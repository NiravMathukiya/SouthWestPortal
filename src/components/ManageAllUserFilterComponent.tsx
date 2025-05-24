import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type Filters = {
  username: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  role: string[];
};

type FilterProps = {
  isFilterOpen: boolean;
  onSubmitFilter: (filters: Filters) => void;
  onResetFilters: () => void;
};

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "blocked", label: "Blocked" },
];

const roleOptions = ["Admin", "Editor", "Viewer", "User"];

const ManageAllUserFilterComponent: React.FC<FilterProps> = ({
  isFilterOpen,
  onSubmitFilter,
  onResetFilters,
}) => {
  const [filters, setFilters] = useState<Filters>({
    username: "",
    name: "",
    email: "",
    phone: "",
    status: "",
    role: [],
  });

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const toggleRole = (role: string) => {
    setFilters((prev) => {
      const exists = prev.role.includes(role);
      const updated = exists
        ? prev.role.filter((r) => r !== role)
        : [...prev.role, role];
      return { ...prev, role: updated };
    });
  };

  const toggleAllRoles = (select: boolean) => {
    setFilters((prev) => ({
      ...prev,
      role: select ? [...roleOptions] : [],
    }));
  };

  // const resetFilters = () => {
  //   const reset: Filters = {
  //     username: "",
  //     name: "",
  //     email: "",
  //     phone: "",
  //     status: "",
  //     role: [],
  //   };
  //   setFilters(reset);
  //   onSubmitFilter(reset);
  // };

  return (
    <div
      className={`border-t border-gray-200 transition-all duration-300 ${
        isFilterOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden`}
    >
      <div className="p-4 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Text Inputs */}
          {["username", "name", "email", "phone"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {field}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={filters[field as keyof Filters]}
                onChange={(e) =>
                  setFilters({ ...filters, [field]: e.target.value })
                }
              />
            </div>
          ))}

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white flex justify-between items-center"
              >
                <span className="text-sm">
                  {filters.status
                    ? statusOptions.find((s) => s.value === filters.status)
                        ?.label
                    : "Select status..."}
                </span>
                <ChevronDown size={16} />
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                  {statusOptions.map((option) => (
                    <div
                      key={option.value}
                      className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFilters({ ...filters, status: option.value });
                        setIsStatusDropdownOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Role Checkboxes */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <div className="border rounded-md p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {roleOptions.map((role, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.role.includes(role)}
                      onChange={() => toggleRole(role)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-sm">{role}</span>
                  </label>
                ))}
              </div>
              <div className="mt-2 flex justify-center text-xs text-blue-600">
                <button
                  onClick={() => toggleAllRoles(true)}
                  className="mr-2 hover:underline border px-2 py-1"
                >
                  Select All
                </button>
                <button
                  onClick={() => toggleAllRoles(false)}
                  className="hover:underline border px-2 py-1"
                >
                  Unselect All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onResetFilters}
            className="px-4 py-2 border rounded-md text-sm bg-gray-100 hover:bg-gray-200"
          >
            Reset Filters
          </button>
          <button
            onClick={() => onSubmitFilter(filters)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAllUserFilterComponent;
