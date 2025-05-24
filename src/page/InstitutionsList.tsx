"use client";

import DynamicTable from "@/components/DynamicTable";
import InstitutionsListHeader from "@/components/Headers/InstitutionsListHeader";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Institution = {
  id: number;
  institution: string;
  institutionalBoards: string;
  status: string;
  edit: string;
};

const defaultData: Institution[] = [
  {
    id: 1,
    institution: "Al Noor Academy",
    institutionalBoards: "Education",
    status: "Active",
    edit: "/admin/edit/institution-1",
  },
  {
    id: 2,
    institution: "Iman Institute",
    institutionalBoards: "Health",
    status: "Inactive",
    edit: "/admin/edit/institution-2",
  },
  {
    id: 3,
    institution: "Hidayah Foundation",
    institutionalBoards: "Welfare",
    status: "Active",
    edit: "/admin/edit/institution-3",
  },
  {
    id: 4,
    institution: "Al Falah Center",
    institutionalBoards: "Youth",
    status: "Active",
    edit: "/admin/edit/institution-4",
  },
  {
    id: 5,
    institution: "Zahra Trust",
    institutionalBoards: "Senior Citizens",
    status: "Inactive",
    edit: "/admin/edit/institution-5",
  },
  {
    id: 6,
    institution: "Unity School",
    institutionalBoards: "Education",
    status: "Active",
    edit: "/admin/edit/institution-6",
  },
  {
    id: 7,
    institution: "Sadaqah Society",
    institutionalBoards: "Finance",
    status: "Active",
    edit: "/admin/edit/institution-7",
  },
  {
    id: 8,
    institution: "Hope Care",
    institutionalBoards: "Health",
    status: "Inactive",
    edit: "/admin/edit/institution-8",
  },
];

const InstitutionsList = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredData, setFilteredData] = useState(defaultData);
  const [selectedIds, setSelectedIds] = useState<number[] >([]);
  const [filterInstitution, setFilterInstitution] = useState("");
  const [filterBoard, setFilterBoard] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  console.log(selectedIds);
  const handleFilter = () => {
    const result = defaultData.filter((item) => {
      const matchInstitution = item.institution
        .toLowerCase()
        .includes(filterInstitution.toLowerCase());
      const matchStatus = filterStatus
        ? item.status.toLowerCase() === filterStatus.toLowerCase()
        : true;
      const matchBoard = item.institutionalBoards
        .toLowerCase()
        .includes(filterBoard.toLowerCase());

      return matchInstitution && matchStatus && matchBoard;
    });

    setFilteredData(result);
    //   setShowFilter(false);
  };

  const institutionColumns: ColumnDef<Institution>[] = [
    {
      accessorKey: "institution",
      header: "Institution",
      cell: (info: CellContext<Institution, unknown>) => info.getValue(),
    },
    {
      accessorKey: "institutionalBoards",
      header: "Institutional Boards",
      cell: (info: CellContext<Institution, unknown>) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: CellContext<Institution, unknown>) => info.getValue(),
    },
    {
      accessorKey: "edit",
      header: "Edit",
      cell: (info: CellContext<Institution, unknown>) => (
        <Link
          href={info.getValue() as string}
          className="text-yellow-600 underline"
        >
          <Pencil className="text-white w-5 h-5 p-1 rounded bg-yellow-500 scale-150" />
        </Link>
      ),
    },
  ];

  return (
    <SideBarWrapper>
      <div>
        <InstitutionsListHeader title="Institutions List" />

        {/* Header with toggle filter button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <ChevronDown className="mr-2" />
            Institutions List
          </h2>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-blue-600 text-sm flex items-center gap-1 hover:bg-gray-50 transition-colors"
            aria-expanded={showFilter}
          >
            Filter
            {showFilter ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Filter section */}
        {/* <div
          className={`border-t border-gray-200 transition-all duration-300 ${
            showFilter ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="p-4 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Status
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Active or Inactive"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  />
                  <button
                    onClick={handleFilter}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Filter
                  </button>
                  <button
                    onClick={() => {
                      setFilterStatus("");
                      setFilteredData(defaultData);
                      setShowFilter(false);
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* Filter section */}
        <div
          className={`border-t border-gray-200 transition-all duration-300 ${
            showFilter ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="p-4 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Institution Name Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Al Noor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={filterInstitution}
                  onChange={(e) => setFilterInstitution(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>

              {/* Institutional Boards Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institutional Board
                </label>
                <input
                  type="text"
                  placeholder="e.g. Education"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={filterBoard}
                  onChange={(e) => setFilterBoard(e.target.value)}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleFilter}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Filter
              </button>
              <button
                onClick={() => {
                  setFilterInstitution("");
                  setFilterStatus("");
                  setFilterBoard("");
                  setFilteredData(defaultData);
                  //   setShowFilter(false);
                }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Table */}
        <DynamicTable
          columns={institutionColumns}
          data={paginatedData}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          getRowId={(row) => row.id}
        />
      </div>
    </SideBarWrapper>
  );
};

export default InstitutionsList;
