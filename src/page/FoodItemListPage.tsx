"use client";

import { useState } from "react";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import SideBarWrapper from "@/layouts/SidebarWrapper";
import DynamicTable from "@/components/DynamicTable";
import HotelLocationListHeader from "@/components/Headers/HotelLocationList";

type FoodItemList = {
    id: number;
    cuisines: string;
    foodCategory: string;
    foodList: string;
    costPerPerson: string;
    foodDetails: string;
    status: string;
    action: string;
};

const defaultData: FoodItemList[] = [
    {
        id: 1,
        cuisines: "Italian",
        foodCategory: "Main Course",
        foodList: "Spaghetti Carbonara",
        costPerPerson: "$15",
        foodDetails: "Classic pasta with eggs, cheese, pancetta, and black pepper",
        status: "Available",
        action: "Edit"
    },
    {
        id: 2,
        cuisines: "Indian",
        foodCategory: "Vegetarian",
        foodList: "Paneer Tikka",
        costPerPerson: "$12",
        foodDetails: "Grilled cottage cheese cubes marinated in spices and yogurt",
        status: "Available",
        action: "Edit"
    },
    {
        id: 3,
        cuisines: "Japanese",
        foodCategory: "Seafood",
        foodList: "Sushi Combo",
        costPerPerson: "$22",
        foodDetails: "Assorted sushi including tuna, salmon, and California rolls",
        status: "Limited",
        action: "Edit"
    },
    {
        id: 4,
        cuisines: "Mexican",
        foodCategory: "Appetizer",
        foodList: "Guacamole & Chips",
        costPerPerson: "$8",
        foodDetails: "Fresh avocado dip with tomatoes, onions, and tortilla chips",
        status: "Available",
        action: "Edit"
    },
    {
        id: 5,
        cuisines: "American",
        foodCategory: "Fast Food",
        foodList: "Cheeseburger Meal",
        costPerPerson: "$10",
        foodDetails: "Beef patty with cheese, lettuce, and fries on the side",
        status: "Out of Stock",
        action: "Edit"
    }
];

const FoodItemListPage = () => {
    const [showFilter, setShowFilter] = useState(false);

    const [filterCuisines, setFilterCuisines] = useState("");
    const [filterFoodCategory, setFilterFoodCategory] = useState("");
    const [filterFoodList, setFilterFoodList] = useState("");
    const [filterCostPerPerson, setFilterCostPerPerson] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 1;

    const filteredData = defaultData.filter((item) => {
        const matchCuisines = item.cuisines.toLocaleLowerCase().includes(filterCuisines.toLowerCase());
        const matchFoodCategory = item.foodCategory.toLowerCase().includes(filterFoodCategory.toLowerCase());
        const matchFoodList = item.foodList.toLowerCase().includes(filterFoodList.toLowerCase())
        const matchStatus = filterStatus ? item.status === filterStatus : true;

        return matchFoodCategory && matchStatus && matchCuisines && matchFoodList;
    });

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const foodItemListColumns = [

        { accessorKey: "cuisines", header: "Cuisines" },
        { accessorKey: "foodCategory", header: "Food Category" },
        { accessorKey: "foodList", header: "Food List" },
        { accessorKey: "costPerPerson", header: "Cost Per Person" },
        { accessorKey: "foodDetails", header: "Food Details" },
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
            <HotelLocationListHeader title="Food Category List" />

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
                        <div className="flex flex-col">

                            <label htmlFor="cuisines">Cuisines</label>
                            <select value={filterCuisines}
                                id="cuisines"
                                onChange={(e) => setFilterCuisines(e.target.value)}
                            >
                                <option value="">--select cuisines--</option>
                                {
                                    defaultData.map((cuisines) => (
                                        <>
                                            <option key={cuisines.id} value={cuisines.cuisines}>{cuisines.cuisines}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col">

                            <label htmlFor="foodcategory">Food Category</label>
                            <select value={filterFoodCategory}

                                onChange={(e) => setFilterFoodCategory(e.target.value)}
                                id="foodcategory"
                            >
                                <option value="">--select Food Category--</option>
                                {
                                    defaultData.map((category) => (
                                        <>
                                            <option key={category.id} value={category.foodCategory}>{category.foodCategory}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="foodlist">Food List</label>
                            <input
                                id="foodlist"
                                placeholder="Food List"
                                className="border px-3 py-2 rounded"
                                value={filterFoodList}
                                onChange={(e) => setFilterFoodList(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="costperperson">Cost Per Person</label>
                            <input
                                id="costperperson"
                                placeholder="Cost Per Person"
                                className="border px-3 py-2 rounded"
                                value={filterCostPerPerson}
                                onChange={(e) => setFilterCostPerPerson(e.target.value)}
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
                                setFilterCuisines("");
                                setFilterFoodList("");
                                setFilterCostPerPerson("");
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
                columns={foodItemListColumns}
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

export default FoodItemListPage;
