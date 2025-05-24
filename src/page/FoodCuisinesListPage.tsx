"use client";

import { useState } from "react";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import SideBarWrapper from "@/layouts/SidebarWrapper";
import DynamicTable from "@/components/DynamicTable";
import FoodCuisinesListHeader from "@/components/Headers/FoodcuisinesListHeader";


type CuisinesList = {
    id: number;
    cuisines: string;
    restaurantLocation: string;
    restaurantAddress: string;
    restaurantPhoneNumber: string;
    status: string;
    action: string;
};

const defaultData: CuisinesList[] = [
    {
        id: 1,
        cuisines: "Italian",
        restaurantLocation: "New York",
        restaurantAddress: "123 Pasta Street, NY 10001",
        restaurantPhoneNumber: "(212) 555-1234",
        status: "Enabled",
        action: "Edit"
    },
    {
        id: 2,
        cuisines: "Japanese",
        restaurantLocation: "Los Angeles",
        restaurantAddress: "456 Sushi Avenue, LA 90012",
        restaurantPhoneNumber: "(213) 555-5678",
        status: "Disabled",
        action: "Edit"
    },
    {
        id: 3,
        cuisines: "Mexican",
        restaurantLocation: "Chicago",
        restaurantAddress: "789 Taco Lane, CH 60601",
        restaurantPhoneNumber: "(312) 555-9012",
        status: "Enabled",
        action: "Edit"
    },
    {
        id: 4,
        cuisines: "Indian",
        restaurantLocation: "Houston",
        restaurantAddress: "101 Curry Road, HT 77001",
        restaurantPhoneNumber: "(713) 555-3456",
        status: "Enabled",
        action: "Edit"
    },
    {
        id: 5,
        cuisines: "French",
        restaurantLocation: "Miami",
        restaurantAddress: "202 Bistro Boulevard, MI 33101",
        restaurantPhoneNumber: "(305) 555-7890",
        status: "Enabled",
        action: "Edit"
    },
    {
        id: 6,
        cuisines: "Chinese",
        restaurantLocation: "San Francisco",
        restaurantAddress: "303 Dumpling Way, SF 94101",
        restaurantPhoneNumber: "(415) 555-2345",
        status: "Disabled",
        action: "Edit"
    },
    {
        id: 7,
        cuisines: "Mediterranean",
        restaurantLocation: "Boston",
        restaurantAddress: "404 Olive Street, BO 02101",
        restaurantPhoneNumber: "(617) 555-6789",
        status: "Enabled",
        action: "Edit"
    }
];

const FoodCuisinesListPage = () => {
    const [showFilter, setShowFilter] = useState(false);

    const [filterCuisines, setFilterCuisines] = useState("");
    const [filterAddress, setFilterAddress] = useState("");
    const [filterPhoneNumber, setfilterPhoneNumber] = useState("");

    const [filterStatus, setFilterStatus] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const allLocations = Array.from(new Set(defaultData.map((item) => item.restaurantLocation)));
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const toggleLocation = (location: string) => {
        setSelectedLocations((prev) =>
            prev.includes(location)
                ? prev.filter((loc) => loc !== location)
                : [...prev, location]
        );
    };
    const pageSize = 3;
    const filteredData = defaultData.filter((item) => {
        const matchCuisines = item.cuisines.toLocaleLowerCase().includes(filterCuisines.toLowerCase());
        const matchAddress = item.restaurantAddress.toLowerCase().includes(filterAddress.toLowerCase());
        const matchPhoneNumber = item.restaurantPhoneNumber.toLowerCase().includes(filterPhoneNumber.toLowerCase())
        const matchStatus = filterStatus ? item.status === filterStatus : true;
        const matchLocation =
            selectedLocations.length === 0 || selectedLocations.includes(item.restaurantLocation);

        return matchCuisines && matchAddress && matchPhoneNumber && matchLocation && matchStatus;
    });
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const foodCuisinesColumns = [

        { accessorKey: "cuisines", header: "Cuisines" },
        { accessorKey: "restaurantLocation", header: "Restaurant Location" },
        { accessorKey: "restaurantAddress", header: "Restaurant Address" },
        { accessorKey: "restaurantPhoneNumber", header: "Restaurant Phone Number" },
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
            <FoodCuisinesListHeader title="Food Cuisines List" />

            <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <ChevronDown className="mr-2" />Food Cuisines List
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
                        <div className="flex flex-col">
                            <label htmlFor="cuisines">Cuisines</label>
                            <input
                                id="cuisines"
                                placeholder="cuisines"
                                className="border px-3 py-2 rounded"
                                value={filterCuisines}
                                onChange={(e) => setFilterCuisines(e.target.value)}
                            />

                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="restaurantAddress">Restaurant Address</label>
                            <input
                                id="restaurantAddress"
                                placeholder="Restaurant Address"
                                className="border px-3 py-2 rounded"
                                value={filterAddress}
                                onChange={(e) => setFilterAddress(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="restaurantPhoneNumber">Restaurant Phone Number</label>
                            <input
                                id="restaurantPhoneNumber"
                                placeholder="Restaurant Phone Number"
                                className="border px-3 py-2 rounded"
                                value={filterPhoneNumber}
                                onChange={(e) => setfilterPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="status">Status</label>

                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="border px-3 py-2 rounded"
                                id="status"
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
                                setFilterAddress("");
                                setFilterCuisines("");
                                setfilterPhoneNumber("");
                                setFilterStatus("");
                                setCurrentPage(1);
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <DynamicTable
                columns={foodCuisinesColumns}
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

export default FoodCuisinesListPage;
