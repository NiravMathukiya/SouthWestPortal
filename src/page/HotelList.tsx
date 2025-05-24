"use client";

import { useState } from "react";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import HotelListHeader from "@/components/Headers/HotelListHeader";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import DynamicTable from "@/components/DynamicTable";

type HotelList = {
  id: number;
  hotelName: string;
  hotelAddress: string;
  hotelLocation: string;
  hotelPhoneNumber: string;
  hotelPOC: string;
  pocEmail: string;
  layout: string;
  status: string;
  action: string;
};

const defaultData: HotelList[] = [
  {
    id: 1,
    hotelName: "Four Seasons Downtown",
    hotelAddress: "1300 Lamar St, Houston, TX 77010",
    hotelLocation: "Houston",
    hotelPhoneNumber: "(713) 650-1300",
    hotelPOC: "",
    pocEmail: "",
    layout: "",
    status: "Enabled",
    action: "/admin/edit/hotel-1",
  },
  {
    id: 2,
    hotelName: "The Westin Austin",
    hotelAddress: "11301 Domain Dr, Austin, TX 78758",
    hotelLocation: "Austin",
    hotelPhoneNumber: "",
    hotelPOC: "",
    pocEmail: "",
    layout: "",
    status: "Disabled",
    action: "/admin/edit/hotel-2",
  },
  {
    id: 3,
    hotelName: "Home2Suites Rosenburg",
    hotelAddress: "5350 Pointe West Circle, Richmond, TX 77469",
    hotelLocation: "Sugar Land",
    hotelPhoneNumber: "346-843-2888",
    hotelPOC: "",
    pocEmail: "ankitnayka.dev@gmail.com",
    layout: "",
    status: "Enabled",
    action: "/admin/edit/hotel-3",
  },
];

const HotelListPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterAddress, setFilterAddress] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [filterPOC, setFilterPOC] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;

  const allLocations = Array.from(new Set(defaultData.map((item) => item.hotelLocation)));

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };

  const filteredData = defaultData.filter((item) => {
    const matchName = item.hotelName.toLowerCase().includes(filterName.toLowerCase());
    const matchAddress = item.hotelAddress.toLowerCase().includes(filterAddress.toLowerCase());
    const matchPhone = item.hotelPhoneNumber.toLowerCase().includes(filterPhone.toLowerCase());
    const matchPOC = item.hotelPOC.toLowerCase().includes(filterPOC.toLowerCase());
    const matchEmail = item.pocEmail.toLowerCase().includes(filterEmail.toLowerCase());
    const matchStatus = filterStatus ? item.status === filterStatus : true;
    const matchLocation =
      selectedLocations.length === 0 || selectedLocations.includes(item.hotelLocation);

    return matchName && matchAddress && matchPhone && matchPOC && matchStatus && matchLocation && matchEmail;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const hotelColumns = [
    { accessorKey: "hotelName", header: "Hotel Name" },
    { accessorKey: "hotelAddress", header: "Hotel Address" },
    { accessorKey: "hotelLocation", header: "Hotel Location" },
    { accessorKey: "hotelPhoneNumber", header: "Hotel Phone Number" },
    { accessorKey: "hotelPOC", header: "Hotel POC" },
    { accessorKey: "pocEmail", header: "Hotel POC Email Address" },
    { accessorKey: "layout", header: "Layout" },
    { accessorKey: "status", header: "Status" },
    {
      accessorKey: "action",
      header: "Action",
      cell: (info: any) => (
        <Link href={info.getValue()} className="text-yellow-600 underline">
          <Pencil className="text-white w-5 h-5 p-1 rounded bg-yellow-500 scale-150" />
        </Link>
      ),
    },
  ];

  return (
    <SideBarWrapper>
      <HotelListHeader title="Hotel List" />

      <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <ChevronDown className="mr-2" /> Hotel List
        </h2>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-blue-600 text-sm flex items-center gap-1 hover:bg-gray-50"
        >
          Filter {showFilter ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden border-t bg-gray-50 ${showFilter ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <input
              placeholder="Hotel Name"
              className="border px-3 py-2 rounded"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
            <input
              placeholder="Hotel Address"
              className="border px-3 py-2 rounded"
              value={filterAddress}
              onChange={(e) => setFilterAddress(e.target.value)}
            />
            <input
              placeholder="Hotel Phone Number"
              className="border px-3 py-2 rounded"
              value={filterPhone}
              onChange={(e) => setFilterPhone(e.target.value)}
            />
            <input
              placeholder="Hotel POC"
              className="border px-3 py-2 rounded"
              value={filterPOC}
              onChange={(e) => setFilterPOC(e.target.value)}
            />
            <input
              placeholder="Hotel email address"
              className="border px-3 py-2 rounded"
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">All Status</option>
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Filter by Location:</label>
            <div className="flex flex-wrap gap-3">
              {allLocations.map((loc) => (
                <label key={loc} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(loc)}
                    onChange={() => toggleLocation(loc)}
                    className="accent-blue-600"
                  />
                  {loc}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setCurrentPage(1)}
            >
              Apply
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => {
                setFilterName("");
                setFilterAddress("");
                setFilterPhone("");
                setFilterPOC("");
                setFilterStatus("");
                setSelectedLocations([]);
                setCurrentPage(1);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <DynamicTable
        columns={hotelColumns}
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

export default HotelListPage;
