"use client";

import DynamicTable from "@/components/DynamicTable";
import BookingHeader from "@/components/Headers/BookingHeader";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ChevronDown, ChevronUp, File, FileSearch2, Pencil } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Booking = {
    id: number;
    booking_id: string;
    event_name: string;
    username: string;
    jk_name: string;
    jk_spaces: string;
    date_of_events: string;
    date_added: string;
    status: string;
    pe_status: string;
    vbm_status: string;
    imura_status: string;
    notification: string;
};

type FilterParams = {
    filter_booking_id?: string;
    filter_event_name?: string;
    filter_username?: string;
    filter_jk_name?: string;
    filter_jk_spaces?: string;
    filter_date?: string;
    filter_date_added_from?: string;
    filter_date_added_to?: string;
    filter_status?: string;
    filter_pe_status?: string;
    filter_vbm_status?: string;
    filter_imura_status?: string;
    filter_notification?: string;
};

const PendingBookingsPage: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [itemsPerPage,] = useState(10);
    const [, setDeleting] = useState(false);
    const [filterParams, setFilterParams] = useState<FilterParams>({});
    const [formValues, setFormValues] = useState({
        booking_id: "",
        event_name: "",
        username: "",
        jk_name: "",
        jk_spaces: "",
        date_from: "",
        date_to: "",
        date_added_from: "",
        date_added_to: "",
        status: "",
        pe_status: "",
        vbm_status: "",
        imura_status: "",
        notification: "",
    });

    const fetchBookings = async (
        page: number = 1,
        limit: number = 10,
        filters: FilterParams = {}
    ) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("page", page.toString());
            params.append("limit", limit.toString());

            if (filters.filter_booking_id) {
                params.append("filter_booking_id", filters.filter_booking_id);
            }
            if (filters.filter_event_name) {
                params.append("filter_event_name", filters.filter_event_name);
            }
            if (filters.filter_username) {
                params.append("filter_username", filters.filter_username);
            }
            if (filters.filter_jk_name) {
                params.append("filter_jk_name", filters.filter_jk_name);
            }
            if (filters.filter_jk_spaces) {
                params.append("filter_jk_spaces", filters.filter_jk_spaces);
            }
            if (filters.filter_date) {
                params.append("filter_date_from", filters.filter_date);
            }
            // if (filters.filter_date_to) {
            //     params.append("filter_date_to", filters.filter_date_to);
            // }
            if (filters.filter_date_added_from) {
                params.append("filter_date_added_from", filters.filter_date_added_from);
            }
            if (filters.filter_date_added_to) {
                params.append("filter_date_added_to", filters.filter_date_added_to);
            }
            if (filters.filter_status) {
                params.append("filter_status", filters.filter_status);
            }
            if (filters.filter_pe_status) {
                params.append("filter_pe_status", filters.filter_pe_status);
            }
            if (filters.filter_vbm_status) {
                params.append("filter_vbm_status", filters.filter_vbm_status);
            }
            if (filters.filter_imura_status) {
                params.append("filter_imura_status", filters.filter_imura_status);
            }
            if (filters.filter_notification) {
                params.append("filter_notification", filters.filter_notification);
            }

            const res = await axios.get(`/api/booking?${params.toString()}`);
            const data = res.data.data;
            if (data.success && data.data?.bookings) {
                setCurrentPage(Number(data.pagination.page));
                setTotalPages(data.pagination.pages);
                setBookings(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch bookings", error);
            toast.error("Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleFilterSubmit = async () => {
        const filters: FilterParams = {};

        if (formValues.booking_id.trim() !== "") {
            filters.filter_booking_id = formValues.booking_id.trim();
        }

        if (formValues.event_name.trim() !== "") {
            filters.filter_event_name = formValues.event_name.trim();
        }

        if (formValues.username.trim() !== "") {
            filters.filter_username = formValues.username.trim();
        }

        if (formValues.jk_name.trim() !== "") {
            filters.filter_jk_name = formValues.jk_name.trim();
        }

        if (formValues.jk_spaces.trim() !== "") {
            filters.filter_jk_spaces = formValues.jk_spaces.trim();
        }

        if (formValues.date_from) {
            filters.filter_date = formValues.date_from;
        }

        // if (formValues.date_to) {
        //     filters.filter_date_to = formValues.date_to;
        // }

        if (formValues.date_added_from) {
            filters.filter_date_added_from = formValues.date_added_from;
        }

        if (formValues.date_added_to) {
            filters.filter_date_added_to = formValues.date_added_to;
        }

        if (formValues.status !== "") {
            filters.filter_status = formValues.status;
        }

        if (formValues.pe_status !== "") {
            filters.filter_pe_status = formValues.pe_status;
        }

        if (formValues.vbm_status !== "") {
            filters.filter_vbm_status = formValues.vbm_status;
        }

        if (formValues.imura_status !== "") {
            filters.filter_imura_status = formValues.imura_status;
        }

        if (formValues.notification !== "") {
            filters.filter_notification = formValues.notification;
        }

        setFilterParams(filters);
        setCurrentPage(1);
        fetchBookings(1, itemsPerPage, filters);
        setIsFilterOpen(false);
    };

    const handleResetFilters = () => {
        setFormValues({
            booking_id: "",
            event_name: "",
            username: "",
            jk_name: "",
            jk_spaces: "",
            date_from: "",
            date_to: "",
            date_added_from: "",
            date_added_to: "",
            status: "",
            pe_status: "",
            vbm_status: "",
            imura_status: "",
            notification: "",
        });
        setFilterParams({});
        setCurrentPage(1);
        fetchBookings(1, itemsPerPage);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        fetchBookings(newPage, itemsPerPage, filterParams);
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) return;

        setDeleting(true);
        try {
            const res = await axios.delete("/api/booking", {
                data: { ids: selectedIds },
            });

            if (res.data.success) {
                toast.success("Bookings deleted successfully!");
                setSelectedIds([]);
                fetchBookings(currentPage, itemsPerPage, filterParams);
            } else {
                toast.error("Deletion failed. Please try again.");
            }
        } catch (error) {
            console.error("Deletion error:", error);
            toast.error("Something went wrong!");
        } finally {
            setDeleting(false);
        }
    };

    const columns: ColumnDef<Booking>[] = [
        {
            accessorKey: "booking_id",
            header: "Booking ID",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "event_name",
            header: "Event Name",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "username",
            header: "Username",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "jk_name",
            header: "JK Name",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "jk_spaces",
            header: "JK Spaces",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "date_of_events",
            header: "Date Of Events",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "date_added",
            header: "Date Added",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: (info) => {
                const status = info.getValue() as string;
                const statusColor =
                    status === "Approved" ? "bg-green-200 text-green-800" :
                        status === "Pending" ? "bg-yellow-200 text-yellow-800" :
                            "bg-red-200 text-red-800";
                return (
                    <span className={`px-2 py-1 rounded text-sm ${statusColor}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            accessorKey: "pe_status",
            header: "PE Status",
            cell: (info) => (
                <span className="px-2 py-1 rounded text-sm bg-gray-200 text-gray-800">
                    {info.getValue() as string}
                </span>
            ),
        },
        {
            accessorKey: "vbm_status",
            header: "VBM Status",
            cell: (info) => (
                <span className="px-2 py-1 rounded text-sm bg-gray-200 text-gray-800">
                    {info.getValue() as string}
                </span>
            ),
        },
        {
            accessorKey: "imura_status",
            header: "Imura Status",
            cell: (info) => (
                <span className="px-2 py-1 rounded text-sm bg-gray-200 text-gray-800">
                    {info.getValue() as string}
                </span>
            ),
        },
        {
            accessorKey: "notification",
            header: "Notification",
            cell: (info) => {
                const notification = info.getValue() as string;
                const notificationColor =
                    notification === "Sent" ? "bg-green-200 text-green-800" :
                        notification === "Pending" ? "bg-yellow-200 text-yellow-800" :
                            "bg-gray-200 text-gray-800";
                return (
                    <span className={`px-2 py-1 rounded text-sm ${notificationColor}`}>
                        {notification}
                    </span>
                );
            },
        },
        {
            accessorKey: "id",
            header: "Action",
            cell: (info) => (
                <div className="flex gap-2">
                    <Link
                        href={`/admin/bookings/view/${info.getValue()}`}
                        className="text-blue-600"
                    >
                        <FileSearch2 className="w-5 h-5 p-1 rounded bg-[#1b4eea] text-white" />
                    </Link>
                    <Link
                        href={`/admin/bookings/download/${info.getValue()}`}
                        className="text-blue-600"
                    >
                        <File className="w-5 h-5 p-1 rounded bg-[#1b4eea] text-white" />
                    </Link>
                    <Link
                        href={`/admin/bookings/edit/${info.getValue()}`}
                        className="text-blue-600"
                    >
                        <Pencil className="w-5 h-5 p-1 rounded bg-[#1b4eea] text-white" />
                    </Link>
                </div>
            ),
        },
        // ... (keep the existing action column)
    ];

    return (
        <>
            <BookingHeader title="Pending Bookings" handleDelete={handleDelete} />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <ChevronDown className="mr-2" />
                    Bookings List
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
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleFilterSubmit();
                        }}
                    >
                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Booking ID</label>
                            <input
                                type="text"
                                placeholder="Booking ID"
                                value={formValues.booking_id}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        booking_id: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Event Name</label>
                            <input
                                type="text"
                                placeholder="Event Name"
                                value={formValues.event_name}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        event_name: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={formValues.username}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        username: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">JK Name</label>
                            <select
                                value={formValues.jk_name}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        jk_name: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            >
                                <option value="" disabled>Select JK Name</option>
                                <option value="Austin">Austin</option>
                                <option value="Austin Downtown">Austin Downtown</option>
                                <option value="Austin South">Austin South</option>
                                <option value="Beaumont">Beaumont</option>
                                <option value="Clear Lake">Clear Lake</option>
                                <option value="College Station">College Station</option>
                                <option value="Corpus Christi">Corpus Christi</option>
                                <option value="Harvest Green">Harvest Green</option>
                                <option value="Headquarters">Headquarters</option>
                                <option value="Katy">Katy</option>
                                <option value="Principal">Principal</option>
                                <option value="San Antonio">San Antonio</option>
                                <option value="Spring">Spring</option>
                                <option value="Sugar Land">Sugar Land</option>
                            </select>
                        </div>


                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">JK Spaces</label>
                            <select
                                value={formValues.jk_spaces}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        jk_spaces: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            >
                                <option value="">Select a space</option>
                                <option value="N/A">Not Available</option>
                            </select>
                        </div>


                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Event Date From</label>
                            <input
                                type="date"
                                value={formValues.date_from}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        date_from: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Event Date To</label>
                            <input
                                type="date"
                                value={formValues.date_to}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        date_to: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Date Added</label>
                            <input
                                type="date"
                                value={formValues.date_added_from}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        date_added: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        {/* <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Date Added To</label>
                            <input
                                type="date"
                                value={formValues.date_added_to}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        date_added_to: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div> */}

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Status</label>
                            <select
                                value={formValues.status}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        status: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            >
                                <option value="">All Status</option>
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                                <option value="Denied">Denied</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">PE Status</label>
                            <select
                                value={formValues.pe_status}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        pe_status: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            >
                                <option value="">All PE Status</option>
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                                <option value="N/A">N/A</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">VBM Status</label>
                            <select
                                value={formValues.vbm_status}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        vbm_status: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            >
                                <option value="">All VBM Status</option>
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Imura Status</label>
                            <select
                                value={formValues.imura_status}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        imura_status: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            >
                                <option value="">All Imura Status</option>
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                                {/* <option value="Not Required">Not Required</option> */}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Notification</label>
                            <select
                                value={formValues.notification}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        notification: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            >
                                <option value="">All Notifications</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div className="flex gap-2 items-end col-span-full">
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

            {/* Keep the existing loading and table rendering logic */}
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"></div>
                    <span className="ml-2 text-gray-600">Loading...</span>
                </div>
            ) : (
                <DynamicTable
                    columns={columns}
                    data={bookings}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onNextPage={() =>
                        handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                    onPrevPage={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    getRowId={(row) => row.id}
                />
            )}
        </>
    );
};

export default PendingBookingsPage;