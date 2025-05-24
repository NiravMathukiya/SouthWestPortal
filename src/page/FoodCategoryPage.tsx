"use client";

import { useState } from "react";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import SideBarWrapper from "@/layouts/SidebarWrapper";
import DynamicTable from "@/components/DynamicTable";
import FoodCategoryListHeader from "@/components/Headers/FoodcategoryHeader";

type FoodCategoryList = {
    id: number;
    foodCategory: string;
    sortOrder: string;
    status: string;
    action: string;
};

const defaultData: FoodCategoryList[] = [
    {
        id: 1,
        foodCategory: "Houston",
        sortOrder: "5",
        status: "Enabled",
        action: "/admin/edit/hotel-1",
    },
    {
        id: 2,
        foodCategory: "Austin",
        sortOrder: "9",
        status: "Enabled",
        action: "/admin/edit/hotel-2",
    },
    {
        id: 3,
        foodCategory: "Sugar Land",
        sortOrder: "6",
        status: "Enabled",
        action: "/admin/edit/hotel-3",
    },
];

const FoodCategoryListPage = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [filterFoodCategory, setFilterFoodCategory] = useState("");
    const [filterSortOrder, setFilterSortOrder] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 1;


    const filteredData = defaultData.filter((item) => {

        const matchFoodCategory = item.foodCategory.toLowerCase().includes(filterFoodCategory.toLowerCase());
        const matchSortOrder = item.sortOrder.toLowerCase().includes(filterSortOrder.toLowerCase())

        const matchStatus = filterStatus ? item.status === filterStatus : true;

        return matchFoodCategory && matchStatus && matchSortOrder;
    });

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const foodCategoryColumns = [

        { accessorKey: "foodCategory", header: "Food Category" },
        { accessorKey: "sortOrder", header: "Sort Order" },

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
            <FoodCategoryListHeader title="Food Category List" />

            <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <ChevronDown className="mr-2" /> Food Category List
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
                            placeholder="Food Category"
                            className="border px-3 py-2 rounded"
                            value={filterFoodCategory}
                            onChange={(e) => setFilterFoodCategory(e.target.value)}
                        />
                        <input
                            placeholder="Sort Order"
                            className="border px-3 py-2 rounded"
                            value={filterSortOrder}
                            onChange={(e) => setFilterSortOrder(e.target.value)}
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
                                setFilterFoodCategory("");
                                setFilterSortOrder("");
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
                columns={foodCategoryColumns}
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

export default FoodCategoryListPage;
