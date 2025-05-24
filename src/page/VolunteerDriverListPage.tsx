"use client";

import { useState } from "react";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import SideBarWrapper from "@/layouts/SidebarWrapper";
import DynamicTable from "@/components/DynamicTable";
import VolunteerDriverListHeader from "@/components/Headers/VolunteerDriverListHeader";


type VolunteerProfiles = {
    id: number;
    volunteerDriverName: string;
    phoneNumber: string;
    jk: string;
    status: "Enabled" | "Disabled";
    action: string;
};

const defaultData: VolunteerProfiles[] = [
    {
        id: 1,
        volunteerDriverName: "John Smith",
        phoneNumber: "(555) 123-4567",
        jk: "Male",
        status: "Enabled",
        action: "Edit"
    },
    {
        id: 2,
        volunteerDriverName: "Sarah Johnson",
        phoneNumber: "(555) 234-5678",
        jk: "Female",
        status: "Enabled",
        action: "Edit"
    },
    {
        id: 3,
        volunteerDriverName: "Michael Brown",
        phoneNumber: "(555) 345-6789",
        jk: "Male",
        status: "Disabled",
        action: "Edit"
    },
    {
        id: 4,
        volunteerDriverName: "Emily Davis",
        phoneNumber: "(555) 456-7890",
        jk: "Female",
        status: "Enabled",
        action: "Edit"
    },
    {
        id: 5,
        volunteerDriverName: "David Wilson",
        phoneNumber: "(555) 567-8901",
        jk: "Male",
        status: "Enabled",
        action: "Edit"
    },
    {
        id: 6,
        volunteerDriverName: "Jessica Martinez",
        phoneNumber: "(555) 678-9012",
        jk: "Female",
        status: "Disabled",
        action: "Edit"
    },
    {
        id: 7,
        volunteerDriverName: "Robert Taylor",
        phoneNumber: "(555) 789-0123",
        jk: "Male",
        status: "Disabled",
        action: "Edit"
    }
];

const VolunteerDriverListPage = () => {
    const [showFilter, setShowFilter] = useState(false);

    const [filterVolunteerDriverName, setFilterVolunteerDriverName] = useState("");
    const [filterPhoneNumber, setfilterPhoneNumber] = useState("");
    const [filterJk, setFilterJk] = useState("")
    const [filterStatus, setFilterStatus] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const Jk = Array.from(new Set(defaultData.map((item) => item.jk)));
    const pageSize = 3;
    const filteredData = defaultData.filter((item) => {
        const matchVolunteerDriverName = item.volunteerDriverName.toLowerCase().includes(filterVolunteerDriverName.toLowerCase());
        const matchStatus = filterStatus ? item.status === filterStatus : true;
        const jk = filterJk ? item.jk === filterJk : true;
        const matchPhoneNumber = item.phoneNumber.toLowerCase().includes(filterPhoneNumber.toLowerCase());
        return matchVolunteerDriverName && matchStatus && matchPhoneNumber && jk;
    });
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const volunteerDriverColumns = [

        { accessorKey: "volunteerDriverName", header: "Volunteer Driver Name" },
        { accessorKey: "phoneNumber", header: "Phone Number" },
        { accessorKey: "jk", header: "Jk" },
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
            <VolunteerDriverListHeader title="Volunteer Driver List" />

            <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <ChevronDown className="mr-2" />Volunteer Driver List
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
                            <label htmlFor="volunteerDriverName">Volunteer Driver Name</label>
                            <input
                                id="volunteerDriverName"
                                placeholder="Volunteer Driver Name"
                                className="border px-3 py-2 rounded"
                                value={filterVolunteerDriverName}
                                onChange={(e) => setFilterVolunteerDriverName(e.target.value)}
                            />

                        </div>


                        <div className="flex flex-col">
                            <label htmlFor="phoneNumber"> Phone Number</label>
                            <input
                                id="phoneNumber"
                                placeholder=" Phone Number"
                                className="border px-3 py-2 rounded"
                                value={filterPhoneNumber}
                                onChange={(e) => setfilterPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="jk">Jk</label>
                            <select id="jk" value={filterJk}
                                onChange={(e) => setFilterJk(e.target.value)}
                            >
                                <option value=""></option>
                                {
                                    Jk.map((list) => (

                                        <option value={list} key={list}>{list}</option>
                                    ))
                                }
                            </select>

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
                                setFilterJk("");
                                setfilterPhoneNumber("");
                                setFilterStatus("");
                                setCurrentPage(1);
                                setFilterVolunteerDriverName("")
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <DynamicTable
                columns={volunteerDriverColumns}
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

export default VolunteerDriverListPage;
