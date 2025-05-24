"use client";

import DynamicTable from "@/components/DynamicTable";
import DeleteHeader from "@/components/Headers/CustomHeaders/DeleteHeader";
import { SkeletonTable } from "@/Skeletons/SkeletonTable";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ChevronDown, ChevronUp, Check,  Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type BookingComment = {
    bookingId: number;
    name: string;
    eventName: string;
    email: string;
    message: string;
    dateAdded: string;
    status: "Unread" | "Read" | "Resolved";
};

type FilterParams = {
    bookingId?: string;
    name?: string;
    eventName?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
};

const BookingCommentsPage = () => {
    const [comments, setComments] = useState<BookingComment[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filterParams, setFilterParams] = useState<FilterParams>({});
    const [formValues, setFormValues] = useState({
        bookingId: "",
        name: "",
        eventName: "",
        status: "",
        dateFrom: "",
        dateTo: "",
    });

    const fetchComments = async (
        page: number = 1,
        limit: number = 10,
        filters: FilterParams = {}
    ) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("page", page.toString());
            params.append("limit", limit.toString());

            if (filters.bookingId) params.append("bookingId", filters.bookingId);
            if (filters.name) params.append("name", filters.name);
            if (filters.eventName) params.append("eventName", filters.eventName);
            if (filters.status) params.append("status", filters.status);
            if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
            if (filters.dateTo) params.append("dateTo", filters.dateTo);

            const res = await axios.get(`/api/booking-comments?${params.toString()}`);
            const data = res.data;

            if (data.success && data.data?.comments) {
                setCurrentPage(Number(data.data.pagination.page));
                setTotalPages(data.data.pagination.pages);
                setItemsPerPage(data.data.pagination.limit);
                setComments(data.data.comments);
            }
        } catch (error) {
            console.error("Failed to fetch booking comments", error);
            toast.error("Failed to fetch comments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleFilterSubmit = async () => {
        const filters: FilterParams = {};

        if (formValues.bookingId.trim()) filters.bookingId = formValues.bookingId.trim();
        if (formValues.name.trim()) filters.name = formValues.name.trim();
        if (formValues.eventName.trim()) filters.eventName = formValues.eventName.trim();
        if (formValues.status) filters.status = formValues.status;
        if (formValues.dateFrom) filters.dateFrom = formValues.dateFrom;
        if (formValues.dateTo) filters.dateTo = formValues.dateTo;

        setFilterParams(filters);
        setCurrentPage(1);
        fetchComments(1, itemsPerPage, filters);
        setIsFilterOpen(false);
    };

    const handleResetFilters = () => {
        setFormValues({
            bookingId: "",
            name: "",
            eventName: "",
            status: "",
            dateFrom: "",
            dateTo: "",
        });
        setFilterParams({});
        setCurrentPage(1);
        fetchComments(1, itemsPerPage);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        fetchComments(newPage, itemsPerPage, filterParams);
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) return;

        try {
            const res = await axios.delete("/api/booking-comments", {
                data: { ids: selectedIds },
            });

            if (res.data.success) {
                toast.success("Comments deleted successfully!");
                setSelectedIds([]);
                fetchComments(currentPage, itemsPerPage, filterParams);
            } else {
                toast.error("Deletion failed. Please try again.");
            }
        } catch (error) {
            console.error("Deletion error:", error);
            toast.error("Something went wrong!");
        }
    };

    const handleStatusUpdate = async (id: number, newStatus: string) => {
        try {
            const res = await axios.patch(`/api/booking-comments/${id}`, {
                status: newStatus,
            });

            if (res.data.success) {
                toast.success("Status updated!");
                fetchComments(currentPage, itemsPerPage, filterParams);
            }
        } catch (error) {
            console.error("Status update error:", error);
            toast.error("Failed to update status");
        }
    };

    const columns: ColumnDef<BookingComment>[] = [
        {
            accessorKey: "bookingId",
            header: "Booking ID",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "eventName",
            header: "Event Name",
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: (info) => (
                <a href={`mailto:${info.getValue()}`} className="text-blue-600 hover:underline">
                    {info.getValue() as string}
                </a>
            ),
        },
        {
            accessorKey: "message",
            header: "Message",
            cell: (info) => (
                <div className="line-clamp-2 max-w-[300px]">
                    {info.getValue() as string}
                </div>
            ),
        },
        {
            accessorKey: "dateAdded",
            header: "Date Added",
            cell: (info) => new Date(info.getValue() as string).toLocaleString(),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: (info) => {
                const status = info.getValue() as string;
                const statusStyles = {
                    Unread: "bg-yellow-200 text-yellow-800",
                    Read: "bg-blue-200 text-blue-800",
                    Resolved: "bg-green-200 text-green-800",
                };
                return (
                    <span className={`px-2 py-1 rounded text-sm ${statusStyles[status as keyof typeof statusStyles] || "bg-gray-200"}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            accessorKey: "id",
            header: "Actions",
            cell: (info) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleStatusUpdate(info.getValue() as number, "Read")}
                        className="p-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                        title="Mark as Read"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleStatusUpdate(info.getValue() as number, "Resolved")}
                        className="p-1 rounded bg-green-100 text-green-600 hover:bg-green-200"
                        title="Mark as Resolved"
                    >
                        <Check className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        // <SideBarWrapper>
        <>
            <div className="w-full">
                <DeleteHeader
                    title="Booking Comments"
                    handleDelete={handleDelete}
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Booking Comments Management
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

                {isFilterOpen && (
                    <div className="transition-all mt-2 mb-2 px-4 py-4 border rounded-md bg-white">
                        <form
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleFilterSubmit();
                            }}
                        >
                            <div className="flex flex-col">
                                <label className="font-semibold text-sm mb-1">Booking ID</label>
                                <input
                                    type="text"
                                    placeholder="Filter by Booking ID"
                                    value={formValues.bookingId}
                                    onChange={(e) =>
                                        setFormValues({ ...formValues, bookingId: e.target.value })
                                    }
                                    className="border px-3 py-2 rounded w-full"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-semibold text-sm mb-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="Filter by name"
                                    value={formValues.name}
                                    onChange={(e) =>
                                        setFormValues({ ...formValues, name: e.target.value })
                                    }
                                    className="border px-3 py-2 rounded w-full"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-semibold text-sm mb-1">Event Name</label>
                                <input
                                    type="text"
                                    placeholder="Filter by event"
                                    value={formValues.eventName}
                                    onChange={(e) =>
                                        setFormValues({ ...formValues, eventName: e.target.value })
                                    }
                                    className="border px-3 py-2 rounded w-full"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-semibold text-sm mb-1">Status</label>
                                <select
                                    value={formValues.status}
                                    onChange={(e) =>
                                        setFormValues({ ...formValues, status: e.target.value })
                                    }
                                    className="border px-3 py-2 rounded w-full"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Unread">Unread</option>
                                    <option value="Read">Read</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
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
                )}

                {loading ? (
                    <SkeletonTable
                        rowCount={8}
                        rowHeight="h-4"
                        rowWidths={["w-1/12", "w-1/8", "w-1/6", "w-1/6", "w-1/4", "w-1/8", "w-1/12", "w-1/12"]}
                    />
                ) : (
                    <DynamicTable
                        columns={columns}
                        data={comments}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onNextPage={() =>
                            handlePageChange(Math.min(currentPage + 1, totalPages))
                        }
                        onPrevPage={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        getRowId={(row) => row.bookingId}
                    />
                )}
            </div>
            {/* </SideBarWrapper> */}

        </>
    );
};

export default BookingCommentsPage;