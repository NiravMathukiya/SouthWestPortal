"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import Link from "next/link";

import JkSpaceListHeader from "@/components/Headers/JkSpaceList";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import DynamicTable from "@/components/DynamicTable";

type JKSpace = {
  id: number;
  jkspaces: string;
  jkFacility: string;
  Notification: string;
  status: string;
  privateMode: string;
  action: string;
};

const defaultData: JKSpace[] = [
  {
    id: 1,
    jkspaces: "Main Hall",
    jkFacility: "Hall",
    Notification: "Enabled",
    status: "Active",
    privateMode: "Yes",
    action: "/admin/edit/jk-space-1",
  },
  {
    id: 2,
    jkspaces: "Prayer Room",
    jkFacility: "Room",
    Notification: "Disabled",
    status: "Inactive",
    privateMode: "No",
    action: "/admin/edit/jk-space-2",
  },
];

const JkSpaceList = () => {
  const [showFilter, setShowFilter] = useState(false);

  const [filterSpaces, setFilterSpaces] = useState("");
  const [filterFacility, setFilterFacility] = useState("");
  const [filterNotification, setFilterNotification] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPrivateMode, setFilterPrivateMode] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const pageSize = 2;

  const filteredData = defaultData.filter((item) => {
    const matchSpaces = item.jkspaces.toLowerCase().includes(filterSpaces.toLowerCase());
    const matchFacility = filterFacility
      ? item.jkFacility.toLowerCase() === filterFacility.toLowerCase()
      : true;
    const matchNotification = filterNotification
      ? item.Notification.toLowerCase() === filterNotification.toLowerCase()
      : true;
    const matchStatus = filterStatus
      ? item.status.toLowerCase() === filterStatus.toLowerCase()
      : true;
    const matchPrivate = filterPrivateMode
      ? item.privateMode.toLowerCase() === filterPrivateMode.toLowerCase()
      : true;

    return matchSpaces && matchFacility && matchNotification && matchStatus && matchPrivate;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const jkColumns: ColumnDef<JKSpace>[] = [
    { accessorKey: "jkspaces", header: "JK Space" },
    { accessorKey: "jkFacility", header: "Facility" },
    { accessorKey: "Notification", header: "Notification" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "privateMode", header: "Private Mode" },
    {
      accessorKey: "action",
      header: "Action",
      cell: (info) => (
        <Link href={info.getValue() as string} className="text-yellow-600 underline">
          <Pencil className="text-white w-5 h-5 p-1 rounded bg-yellow-500 scale-150" />
        </Link>
      ),
    },
  ];

  return (
    <SideBarWrapper>
      <JkSpaceListHeader title="JK Spaces List" />

      {/* Header + Toggle Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <ChevronDown className="mr-2" /> JK Spaces List
        </h2>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-blue-600 text-sm flex items-center gap-1 hover:bg-gray-50 transition-colors"
        >
          Filter {showFilter ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Filters */}
      <div
        className={`border-t border-gray-200 transition-all duration-300 ${
          showFilter ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="p-4 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* JK Space text filter */}
            <input
              className="border px-3 py-2 rounded w-full"
              placeholder="JK Space"
              value={filterSpaces}
              onChange={(e) => setFilterSpaces(e.target.value)}
            />

            {/* JK Facility dropdown */}
            <select
              className="border px-3 py-2 rounded w-full"
              value={filterFacility}
              onChange={(e) => setFilterFacility(e.target.value)}
            >
              <option value="">All Facilities</option>
              <option value="Hall">Hall</option>
              <option value="Room">Room</option>
              <option value="Auditorium">Auditorium</option>
            </select>

            {/* Notification dropdown */}
            <select
              className="border px-3 py-2 rounded w-full"
              value={filterNotification}
              onChange={(e) => setFilterNotification(e.target.value)}
            >
              <option value="">All Notifications</option>
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>

            {/* Status dropdown */}
            <select
              className="border px-3 py-2 rounded w-full"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Private Mode dropdown */}
            <select
              className="border px-3 py-2 rounded w-full"
              value={filterPrivateMode}
              onChange={(e) => setFilterPrivateMode(e.target.value)}
            >
              <option value="">All Private Modes</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setCurrentPage(1)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
            <button
              onClick={() => {
                setFilterSpaces("");
                setFilterFacility("");
                setFilterNotification("");
                setFilterStatus("");
                setFilterPrivateMode("");
                setCurrentPage(1);
              }}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <DynamicTable
        columns={jkColumns}
        data={paginatedData}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        getRowId={(row) => row.id}
      />
    </SideBarWrapper>
  );
};

export default JkSpaceList;
