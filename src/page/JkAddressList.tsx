"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";

import SideBarWrapper from "@/layouts/SidebarWrapper";
import InstitutionsListHeader from "@/components/Headers/InstitutionsListHeader";
import DynamicTable from "@/components/DynamicTable";

type JKAddress = {
  id: number;
  name: string;
  address: string;
  location: string;
  calendarId: string;
  status: string;
  edit: string;
};

const defaultData: JKAddress[] = [
  {
    id: 1,
    name: "Austin South",
    address: "5700 S MoPac Expy #D410, Austin, TX 78749",
    location: "ACCT",
    calendarId: "aa97@group.calendar.google.com",
    status: "Enabled",
    edit: "/admin/edit/jk-address-1",
  },
  {
    id: 2,
    name: "Austin Downtown",
    address: "2214 San Antonio Street Ste 100 Austin, TX 78705",
    location: "SONNa",
    calendarId: "17cvkapj9bit0@group.calendar.google.com",
    status: "Enabled",
    edit: "/admin/edit/jk-address-2",
  },
  {
    id: 3,
    name: "Indian cricbuzz",
    address: "2214 San Antonio Street Ste 100 Austin, TX 78705",
    location: "ACCT",
    calendarId: "17cvkapj9bit0b8jchfd5ss3e7s@group.calendar.google.com",
    status: "Disabled",
    edit: "/admin/edit/jk-address-3",
  },
];

const JKAddressesList = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterAddress, setFilterAddress] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const filteredData = defaultData.filter((item) => {
    const matchName = item.name.toLowerCase().includes(filterName.toLowerCase());
    const matchAddress = item.address.toLowerCase().includes(filterAddress.toLowerCase());
    const matchLocation = item.location.toLowerCase().includes(filterLocation.toLowerCase());
    const matchStatus = filterStatus
      ? item.status.toLowerCase() === filterStatus.toLowerCase()
      : true;
    return matchName && matchAddress && matchLocation && matchStatus;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const jkColumns: ColumnDef<JKAddress>[] = [
    { accessorKey: "name", header: "JK Name" },
    { accessorKey: "address", header: "JK Address" },
    { accessorKey: "location", header: "JK Location" },
    { accessorKey: "calendarId", header: "Calendar ID" },
    { accessorKey: "status", header: "Status" },
    {
      accessorKey: "edit",
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
      <InstitutionsListHeader title="JK Addresses List" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <ChevronDown className="mr-2" /> JK Addresses List
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
            <input
              className="border px-3 py-2 rounded w-full"
              placeholder="JK Name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
            <input
              className="border px-3 py-2 rounded w-full"
              placeholder="JK Address"
              value={filterAddress}
              onChange={(e) => setFilterAddress(e.target.value)}
            />
            <input
              className="border px-3 py-2 rounded w-full"
              placeholder="JK Location"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            />
            <select
              className="border px-3 py-2 rounded w-full"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
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
                setFilterName("");
                setFilterAddress("");
                setFilterLocation("");
                setFilterStatus("");
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

export default JKAddressesList;
