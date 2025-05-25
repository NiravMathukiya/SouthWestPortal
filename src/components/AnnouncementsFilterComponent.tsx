import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Portfolio } from "@/types/form-types";
import { Facility } from "./new-request/jamatkhana-section";

interface FilterProps {
  isFilterOpen: boolean;
  onSubmitFilter: (filters: any) => void;
  initialValues: any;
}

const facilityTypeLabels: Record<number, string> = {
  1: "ACST",
  2: "ACCT",
  3: "DISTRICT",
  4: "GREATER HOUSTON",
};

const statusOptions = [
  { value: "1", label: "Approved" },
  { value: "0", label: "Rejected" },
];

const FilterComponent: React.FC<FilterProps> = ({
  isFilterOpen,
  onSubmitFilter,
}) => {
  const [filters, setFilters] = useState({
    portfolioMember: "",
    dateAdded: "",
    programName: "",
    email: "",
    programDateFrom: "",
    programDateTo: "",
    status: "",
    Jamatkhanas: [] as string[],
  });
  const [portfoliogroups, setPortfoliogroups] = useState<Portfolio[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const response = await axios.get("/api/announcement?data_get=true");
        setPortfoliogroups(
          response.data.data.portalupdates.booking_portfolios_group
        );
        setFacilities(response.data.data.portalupdates.facilities);
      } catch (err) {
        toast.error("Failed to fetch announcement data");
        console.error("Error fetching data:", err);
      }
    };

    fetchAnnouncementData();
  }, []);

  // Helper function to parse facility labels
  const parseFacilityLabel = (item: string): string => {
    const [oldLabel] = item.split(":").map((str) => str.trim());
    if (!oldLabel) return "";

    // Remove any encoding if present
    const decodedLabel = decodeURIComponent(oldLabel);

    // Handle the label format
    const parts = decodedLabel.split(" ");
    return parts.length === 1 ? parts[0] : parts[0] + parts[1];
  };

  // Get all facility labels as an array
  const getAllFacilityLabels = (): string[] => {
    return facilities.flatMap((group) => {
      return group.booking_address
        .split(",")
        .map(parseFacilityLabel)
        .filter((label) => label); // Filter out empty strings
    });
  };

  // Toggle single Jamatkhana
  const toggleJamatkhana = (label: string) => {
    setFilters((prev) => {
      const alreadySelected = prev.Jamatkhanas.includes(label);
      const updated = alreadySelected
        ? prev.Jamatkhanas.filter((item) => item !== label)
        : [...prev.Jamatkhanas, label];
      return { ...prev, Jamatkhanas: updated };
    });
  };

  // Select all facilities in a group
  const handleSelectAllGroup = (group: Facility) => {
    const labels = group.booking_address
      .split(",")
      .map(parseFacilityLabel)
      .filter((label) => label);

    setFilters((prev) => {
      // Remove any existing labels from this group first to avoid duplicates
      const filtered = prev.Jamatkhanas.filter(
        (label) => !labels.includes(label)
      );
      return { ...prev, Jamatkhanas: [...filtered, ...labels] };
    });
  };

  // Unselect all facilities in a group
  const handleUnselectAllGroup = (group: Facility) => {
    const labels = group.booking_address
      .split(",")
      .map(parseFacilityLabel)
      .filter((label) => label);

    setFilters((prev) => ({
      ...prev,
      Jamatkhanas: prev.Jamatkhanas.filter((label) => !labels.includes(label)),
    }));
  };

  // Select all facilities
  const selectAllFacilities = () => {
    const allLabels = getAllFacilityLabels();
    setFilters((prev) => ({ ...prev, Jamatkhanas: allLabels }));
  };

  // Unselect all facilities
  const unselectAllFacilities = () => {
    setFilters((prev) => ({ ...prev, Jamatkhanas: [] }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      portfolioMember: "",
      dateAdded: "",
      programName: "",
      email: "",
      programDateFrom: "",
      programDateTo: "",
      status: "",
      Jamatkhanas: [],
    });
    onSubmitFilter({});
  };

  // Handle form submission
  // const handleSubmit = () => {
  //   // Ensure Jamatkhanas is always an array of strings
  //   const submissionData = {
  //     ...filters,
  //     Jamatkhanas: Array.isArray(filters.Jamatkhanas)
  //       ? filters.Jamatkhanas
  //       : [filters.Jamatkhanas],
  //   };
  //   onSubmitFilter(submissionData);
  // };

  // Render facility checkboxes
  const renderFacilityCheckboxes = () => {
    return facilities.map((group, index) => {
      const addresses = group.booking_address
        .split(",")
        .map((item: string) => {
          const label = parseFacilityLabel(item);
          return { id: item.split(":")[0].trim(), label };
        })
        .filter(({ label }) => label); // Filter out invalid entries

      return (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-sm">
              {facilityTypeLabels[group?.facility_type] ||
                `Facility Group ${group?.facility_type}`}
            </h4>
            <div className="flex gap-2">
              <button
                type="button"
                className="text-xs text-blue-600 hover:underline"
                onClick={() => handleSelectAllGroup(group)}
              >
                Select All
              </button>
              <button
                type="button"
                className="text-xs text-blue-600 hover:underline"
                onClick={() => handleUnselectAllGroup(group)}
              >
                Unselect All
              </button>
            </div>
          </div>

          <div className="border border-gray-300 rounded p-3">
            <div className="grid grid-cols-2 gap-2">
              {addresses.map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`jamatkhanas-${id}`}
                    className="cursor-pointer"
                    checked={filters.Jamatkhanas.includes(label)}
                    onChange={() => toggleJamatkhana(label)}
                  />
                  <label
                    htmlFor={`jamatkhanas-${id}`}
                    className="cursor-pointer text-sm"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className={`border-t border-gray-200 transition-all duration-300 ${
        isFilterOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="p-4 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Portfolio Dropdown */}
          <div className="md:mt-6">
            <select
              id="portfolio"
              className="w-full border p-2 rounded border-gray-300"
              value={filters.portfolioMember || ""}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  portfolioMember: e.target.value,
                }));
              }}
            >
              <option value="">Select a portfolio/member</option>
              {portfoliogroups.map((group, index) => {
                const portfolioItems = group.portfolio_list.split(",");

                return group.ref_category ? (
                  <optgroup key={index} label={group.ref_category || "General"}>
                    {portfolioItems.map((item) => {
                      const [id, label] = item.split(":");
                      return (
                        <option key={id.trim()} value={label.trim()}>
                          {label.trim()}
                        </option>
                      );
                    })}
                  </optgroup>
                ) : (
                  portfolioItems.map((item) => {
                    const [id, label] = item.split(":");
                    return (
                      <option key={id.trim()} value={id.trim()}>
                        {label.trim()}
                      </option>
                    );
                  })
                );
              })}
            </select>
          </div>

          {/* Date, Email, Program Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Announcement
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.dateAdded}
              onChange={(e) =>
                setFilters({ ...filters, dateAdded: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name of Program
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.programName}
              onChange={(e) =>
                setFilters({ ...filters, programName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.email}
              onChange={(e) =>
                setFilters({ ...filters, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Program (From)
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.programDateFrom}
              onChange={(e) =>
                setFilters({ ...filters, programDateFrom: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Program (To)
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.programDateTo}
              onChange={(e) =>
                setFilters({ ...filters, programDateTo: e.target.value })
              }
            />
          </div>

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
                    ? statusOptions.find((o) => o.value === filters.status)
                        ?.label
                    : "Select status..."}
                </span>
                <ChevronDown size={16} />
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute z-[999] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
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

          {/* Jamatkhana Grouped Checkbox */}
          <div className="col-span-full">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Jamatkhanas
              </label>
              <div className="flex gap-2">
                <button
                  onClick={selectAllFacilities}
                  className="text-sm text-blue-600 hover:underline border px-2 py-1 rounded"
                >
                  Select All
                </button>
                <button
                  onClick={unselectAllFacilities}
                  className="text-sm text-blue-600 hover:underline border px-2 py-1 rounded"
                >
                  Unselect All
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {renderFacilityCheckboxes()}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="mt-4 flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded-md text-sm bg-gray-100 hover:bg-gray-200"
            onClick={resetFilters}
          >
            Reset
          </button>

          <button
            className="px-4 py-2 border rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => onSubmitFilter(filters)}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
