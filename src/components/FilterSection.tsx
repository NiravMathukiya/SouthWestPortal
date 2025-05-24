import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

type Filters = {
  portfolioMember: string;
  dateAdded: string;
  programName: string;
  email: string;
  programDateFrom: string;
  programDateTo: string;
  status: string;
  submittedBy: string[];
};

type FilterProps = {
  isFilterOpen: boolean;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  resetFilters: () => void;
  applyFilters: () => void;
};

const FilterSection: React.FC<FilterProps> = ({
  isFilterOpen,
  filters,
  setFilters,
  resetFilters,
  applyFilters,
}) => {
  const [isPortfolioDropdownOpen, setIsPortfolioDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const portfolioDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  // Portfolio options
  const portfolioOptions = [
    { value: "all", label: "All" },
    {
      value: "Ismaili Professional Network (IPN)",
      label: "Ismaili Professional Network (IPN)",
    },
    { value: "AKHB", label: "AKHB" },
    { value: "Local Announcements", label: "Local Announcements" },
    { value: "Program", label: "Program" },
    { value: "Mental Health", label: "Mental Health" },
  ];

  // Status options
  const statusOptions = [
    { value: "all", label: "All" },
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ];

  // List of all available Jamatkhanas for filtering
  const jamatkhanas = [
    { group: "ACST", items: ["Corpus%20Christi", "San%20Antonio"] },
    { group: "DISTRICT", items: ["Beaumont"] },
    {
      group: "ACCT",
      items: [
        "College%20Station",
        "Austin",
        "Austin%20Downtown",
        "Austina%20South",
        "Clear%20Lake",
      ],
    },
    {
      group: "GREATER HOUSTON",
      items: [
        "Headquarters",
        "Katy",
        "Principal",
        "Sugar%20Land",
        "Spring",
        "Harvest%20Green",
      ],
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        portfolioDropdownRef.current &&
        !portfolioDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPortfolioDropdownOpen(false);
      }

      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle Jamatkhana selection
  const toggleJamatkhana = (jk: string) => {
    setFilters((prev: Filters) => {
      if (prev.submittedBy.includes(jk)) {
        return {
          ...prev,
          submittedBy: prev.submittedBy.filter((item) => item !== jk),
        };
      } else {
        return { ...prev, submittedBy: [...prev.submittedBy, jk] };
      }
    });
  };

  // Select/Unselect all Jamatkhanas in a group
  const toggleJamatkhanaGroup = (group: string, select: boolean) => {
    const groupItems = jamatkhanas.find((g) => g.group === group)?.items || [];

    setFilters((prev: Filters) => {
      let newSubmittedBy = [...prev.submittedBy];

      if (select) {
        groupItems.forEach((item) => {
          if (!newSubmittedBy.includes(item)) {
            newSubmittedBy.push(item);
          }
        });
      } else {
        newSubmittedBy = newSubmittedBy.filter(
          (item) => !groupItems.includes(item)
        );
      }

      return { ...prev, submittedBy: newSubmittedBy };
    });
  };

  const toggleAllJamatkhanas = (select: boolean) => {
    if (select) {
      const allJamatkhanas = jamatkhanas.flatMap((group) => group.items);
      setFilters((prev: Filters) => ({ ...prev, submittedBy: allJamatkhanas }));
    } else {
      setFilters((prev: Filters) => ({ ...prev, submittedBy: [] }));
    }
  };

  

  return (
    <div
      className={`border-t border-gray-200 overflow-hidden transition-all duration-300 ${
        isFilterOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="p-4 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portfolio/Board/Member
            </label>
            <div className="relative" ref={portfolioDropdownRef}>
              <button
                type="button"
                onClick={() =>
                  setIsPortfolioDropdownOpen(!isPortfolioDropdownOpen)
                }
                className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white flex justify-between items-center"
              >
                <span className="text-sm">
                  {filters.portfolioMember
                    ? portfolioOptions.find(
                        (o) => o.value === filters.portfolioMember
                      )?.label
                    : "Select..."}
                </span>
                <ChevronDown size={16} />
              </button>

              {isPortfolioDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                  {portfolioOptions.map((option) => (
                    <div
                      key={option.value}
                      className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFilters({
                          ...filters,
                          portfolioMember: option.value,
                        });
                        setIsPortfolioDropdownOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

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
              placeholder="Search program name..."
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
              placeholder="Search email..."
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="relative" ref={statusDropdownRef}>
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
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jamatkhanas
          </label>

          <div className="border rounded-md grid md:grid-cols-2 gap-2 p-4">
            {jamatkhanas.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-4 border p-2 last:mb-0 ">
                <div className="font-medium mb-2">{group.group}</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {group.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={`jk-${groupIndex}-${itemIndex}`}
                        checked={filters.submittedBy.includes(item)}
                        onChange={() => toggleJamatkhana(item)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`jk-${groupIndex}-${itemIndex}`}
                        className="text-sm"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-center text-xs text-blue-600">
                  <button
                    onClick={() => toggleJamatkhanaGroup(group.group, true)}
                    className="mr-2 hover:underline border p-2 "
                  >
                    Select All {group.group}
                  </button>
                  <button
                    onClick={() => toggleJamatkhanaGroup(group.group, false)}
                    className="hover:underline border p-2 "
                  >
                    Unselect All {group.group}
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 text-xs text-blue-600 flex justify-center">
              <button
                onClick={() => toggleAllJamatkhanas(true)}
                className="mr-4 hover:underline"
              >
                Select All
              </button>
              <button
                onClick={() => toggleAllJamatkhanas(false)}
                className="hover:underline"
              >
                Unselect All
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={resetFilters}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Search className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
