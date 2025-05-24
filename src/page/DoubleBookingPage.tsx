"use client";

import DynamicTable from "@/components/DynamicTable";
import TitleHeader from "@/components/Headers/CustomHeaders/TitleHeader";
// import SideBarWrapper from "@/layouts/SidebarWrapper";
import { SkeletonTable } from "@/Skeletons/SkeletonTable";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type BookingConflict = {
    id: number;
    jkName: string;
    jkSpace: string;
    date: string;
    conflicts: {
        timeRange: string;
        bookingId: number;
        eventType: string;
    }[];
};

// type FilterParams = {
//     jkName?: string;
//     jkSpace?: string;
//     dateFrom?: string;
//     dateTo?: string;
// };

const DoubleBookingPage = () => {
    const [conflicts, setConflicts] = useState<BookingConflict[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    // const [filterParams, setFilterParams] = useState<FilterParams>({});
    // const [formValues, setFormValues] = useState({
    //     jkName: "",
    //     jkSpace: "",
    //     dateFrom: "",
    //     dateTo: "",
    // });

    const fetchConflicts = async (
        page: number = 1,
        limit: number = 10,
        // filters: FilterParams = {}
    ) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("page", page.toString());
            params.append("limit", limit.toString());

            // if (filters.jkName) params.append("jkName", filters.jkName);
            // if (filters.jkSpace) params.append("jkSpace", filters.jkSpace);
            // if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
            // if (filters.dateTo) params.append("dateTo", filters.dateTo);

            const res = await axios.get(`/api/booking-conflicts?${params.toString()}`);
            const data = res.data;

            if (data.success && data.data?.conflicts) {
                setCurrentPage(Number(data.data.pagination.page));
                setTotalPages(data.data.pagination.pages);
                setItemsPerPage(data.data.pagination.limit);
                setConflicts(data.data.conflicts);
            }
        } catch (error) {
            console.error("Failed to fetch booking conflicts", error);
            toast.error("Failed to fetch conflicts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConflicts();
    }, []);

    // const handleFilterSubmit = async () => {
    //     const filters: FilterParams = {};

    //     if (formValues.jkName.trim()) filters.jkName = formValues.jkName.trim();
    //     if (formValues.jkSpace.trim()) filters.jkSpace = formValues.jkSpace.trim();
    //     if (formValues.dateFrom) filters.dateFrom = formValues.dateFrom;
    //     if (formValues.dateTo) filters.dateTo = formValues.dateTo;

    //     setFilterParams(filters);
    //     setCurrentPage(1);
    //     fetchConflicts(1, itemsPerPage, filters);
    //     setIsFilterOpen(false);
    // };

    // const handleResetFilters = () => {
    //     setFormValues({
    //         jkName: "",
    //         jkSpace: "",
    //         dateFrom: "",
    //         dateTo: "",
    //     });
    //     setFilterParams({});
    //     setCurrentPage(1);
    //     fetchConflicts(1, itemsPerPage);
    // };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        // fetchConflicts(newPage, itemsPerPage, filterParams);
        fetchConflicts(newPage, itemsPerPage);

    };

    const columns: ColumnDef<BookingConflict>[] = [
        {
            accessorKey: "id",
            header: "#",
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "jkName",
            header: "JK Name",
        },
        {
            accessorKey: "jkSpace",
            header: "JK Space",
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
        },
        {
            accessorKey: "conflicts",
            header: "Conflicting Bookings",
            cell: (info) => (
                <div className="space-y-2">
                    {(info.getValue() as BookingConflict['conflicts']).map((conflict, index) => (
                        <div key={index} className="p-2 bg-red-50 rounded border-l-4 border-red-500">
                            <div className="flex flex-wrap gap-2">
                                <span className="font-medium">{conflict.timeRange}</span>
                                <span className="text-blue-600">#{conflict.bookingId}</span>
                                <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                                    {conflict.eventType}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            <TitleHeader title="Double Bookings" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
                <h2 className="text-lg font-semibold text-gray-800">
                    Double Booking Conflicts
                </h2>
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-blue-600 text-sm flex items-center gap-1 hover:bg-gray-50"
                    aria-expanded={isFilterOpen}
                >
                    Filter
                    {isFilterOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
            </div>

            {/* {isFilterOpen && (
                <div className="transition-all mt-2 mb-2 px-4 py-4 border rounded-md bg-white">
                    <form
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleFilterSubmit();
                        }}
                    >
                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">JK Name</label>
                            <input
                                type="text"
                                placeholder="Filter by JK name"
                                value={formValues.jkName}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, jkName: e.target.value })
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">JK Space</label>
                            <input
                                type="text"
                                placeholder="Filter by space"
                                value={formValues.jkSpace}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, jkSpace: e.target.value })
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">From Date</label>
                            <input
                                type="date"
                                value={formValues.dateFrom}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, dateFrom: e.target.value })
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">To Date</label>
                            <input
                                type="date"
                                value={formValues.dateTo}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, dateTo: e.target.value })
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        <div className="flex gap-2 mt-2 col-span-full">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Apply Filters
                            </button>
                            <button
                                type="button"
                                onClick={handleResetFilters}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </form>
                </div>
            )} */}

            {loading ? (
                <SkeletonTable
                    rowCount={8}
                    rowHeight="h-4"
                    rowWidths={["w-1/12", "w-1/6", "w-1/6", "w-1/6", "w-1/2"]}
                />
            ) : (
                <DynamicTable
                    columns={columns}
                    data={conflicts}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onNextPage={() =>
                        handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                    onPrevPage={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    getRowId={(row) => row.id}
                />
            )}
        </div>

    );
};

export default DoubleBookingPage;