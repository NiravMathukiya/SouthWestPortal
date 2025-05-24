"use client";
import React, { useState } from "react";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import { ChevronDown, ChevronUp, Link, Plus, ShareIcon } from "lucide-react";
import JkDataViewAllHeader from "@/components/Headers/JkDataViewAllHeader";
import DynamicTable from "@/components/DynamicTable";



type JkDataViewAllList = {
    id: number;
    date: Date;
    title: string;
    status: string;
}

const defaultData: JkDataViewAllList[] = [
    {
        id: 1,
        date: new Date("2023-01-15"),
        title: "First Item",
        status: "Enabled"
    },
    {
        id: 2,
        date: new Date("2023-02-20"),
        title: "Second Item",
        status: "Enabled"
    },
    {
        id: 3,
        date: new Date("2023-03-10"),
        title: "Third Item",
        status: "Disabled"
    },
    {
        id: 4,
        date: new Date("2023-04-05"),
        title: "Fourth Item",
        status: "Disabled"
    },
    {
        id: 5,
        date: new Date("2023-05-12"),
        title: "Fifth Item",
        status: "Enabled"
    }
];


const JkDataViewAlltPage: React.FC = () => {

    const [showFilter, setShowFilter] = useState(false);
    const [filterTitle, setFilterTitle] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;

    const allTitle = Array.from(new Set(defaultData.map((list) => list.title)));


    const filteredData = defaultData.filter((item) => {

        const matchTitle = item.title.toLowerCase().includes(filterTitle.toLowerCase());

        const matchStatus = filterStatus ? item.status === filterStatus : true;

        return matchTitle && matchStatus;
    });
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const viewAllColumns = [

        { accessorKey: "date", header: "Date" },

        { accessorKey: "title", header: "Title" },
        { accessorKey: "status", header: "Status" },
        {
            accessorKey: "action",
            header: "Action",
            cell: (info: any) => (
                <div className="flex gap-2">
                    <Link href={info.getValue()} className="text-yellow-600 underline">
                        <Plus className="text-white w-5 h-5 p-1 rounded bg-yellow-500 scale-150" />
                    </Link>
                    <Link href={info.getValue()} className="text-yellow-600 underline">
                        <ShareIcon className="text-white w-5 h-5 p-1 rounded bg-yellow-500 scale-150" />
                    </Link>
                </div>

            ),
        },
    ];
    return (
        <SideBarWrapper>
            <>
                <JkDataViewAllHeader title="Jk Data List" />

                <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        <ChevronDown className="mr-2" /> Hotel Location List
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

                                <label htmlFor="title">Title </label>
                                <select value={filterTitle} id="title" onChange={(e) => setFilterTitle(e.target.value)}>
                                    <option value="">All Titles</option>
                                    {allTitle.map((title) => (
                                        <option key={title} value={title}>{title}</option>
                                    ))}
                                </select>

                            </div>

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
                                    setFilterTitle("");
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
                    columns={viewAllColumns}
                    data={paginatedData}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    getRowId={(row) => row.id}
                />
            </>
        </SideBarWrapper>
    );
};

export default JkDataViewAlltPage;
