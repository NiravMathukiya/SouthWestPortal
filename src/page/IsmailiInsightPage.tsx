"use client";

import DynamicTable from "@/components/DynamicTable";
// import Header from "@/components/Headers/AnnouncementsHeader";
import ExportAddDeleteHeader from "@/components/Headers/CustomHeaders/ExportAddDeleteHeader";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type CommunicationRequest = {
    id: number;
    portfolioMember: string;
    dateAdded: string;
    programName: string;
    email: string;
    programDate: string;
    status: string;
    Jamatkhanas: string[];
};

type FilterParams = {
    portfolioMember?: string;
    dateAdded?: string;
    programName?: string;
    email?: string;
    programDateFrom?: string;
    programDateTo?: string;
    status?: string;
    Jamatkhanas?: string[];
};

const IsmailiInsightPage = () => {
    const [requests, setRequests] = useState<CommunicationRequest[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [, setDeleting] = useState(false);
    const [filterParams, setFilterParams] = useState<FilterParams>({});
    const [formValues, setFormValues] = useState({
        portfolioMember: "",
        dateAdded: "",
        programName: "",
        email: "",
        programDateFrom: "",
        programDateTo: "",
        status: "",
        Jamatkhanas: [] as string[],
    });

    const fetchRequests = async (
        page: number = 1,
        limit: number = 20,
        filters: FilterParams = {}
    ) => {
        setLoading(true);
        try {
            // Build query parameters
            const params = new URLSearchParams();
            params.append("page", page.toString());
            params.append("limit", limit.toString());

            // Add filter parameters if they exist
            if (filters.portfolioMember) {
                params.append("portfolioMember", filters.portfolioMember);
            }
            if (filters.dateAdded) {
                params.append("dateAdded", filters.dateAdded);
            }
            if (filters.programName) {
                params.append("programName", filters.programName);
            }
            if (filters.email) {
                params.append("email", filters.email);
            }
            if (filters.programDateFrom) {
                params.append("programDateFrom", filters.programDateFrom);
            }
            if (filters.programDateTo) {
                params.append("programDateTo", filters.programDateTo);
            }
            if (filters.status) {
                params.append("status", filters.status);
            }
            if (filters.Jamatkhanas && filters.Jamatkhanas.length > 0) {
                params.append("Jamatkhanas", filters.Jamatkhanas.join(","));
            }

            const res = await axios.get(`/api/IsmailiInsight?${params.toString()}`);
            const data = res.data;

            if (data.success && data.data) {
                setCurrentPage(Number(data.data.pagination.page));
                setTotalPages(data.data.pagination.pages);
                setItemsPerPage(data.data.pagination.limit);
                setRequests(data.data.requests);
            }
        } catch (error) {
            console.error("Failed to fetch requests", error);
            toast.error("Failed to fetch communication requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleFilterSubmit = async () => {
        const filters: FilterParams = {};

        if (formValues.portfolioMember.trim() !== "") {
            filters.portfolioMember = formValues.portfolioMember.trim();
        }
        if (formValues.dateAdded.trim() !== "") {
            filters.dateAdded = formValues.dateAdded;
        }
        if (formValues.programName.trim() !== "") {
            filters.programName = formValues.programName.trim();
        }
        if (formValues.email.trim() !== "") {
            filters.email = formValues.email.trim();
        }
        if (formValues.programDateFrom.trim() !== "") {
            filters.programDateFrom = formValues.programDateFrom;
        }
        if (formValues.programDateTo.trim() !== "") {
            filters.programDateTo = formValues.programDateTo;
        }
        if (formValues.status.trim() !== "") {
            filters.status = formValues.status;
        }
        if (formValues.Jamatkhanas.length > 0) {
            filters.Jamatkhanas = formValues.Jamatkhanas;
        }

        setFilterParams(filters);
        setCurrentPage(1);
        fetchRequests(1, itemsPerPage, filters);
        setIsFilterOpen(false);
    };

    const handleResetFilters = () => {
        setFormValues({
            portfolioMember: "",
            dateAdded: "",
            programName: "",
            email: "",
            programDateFrom: "",
            programDateTo: "",
            status: "",
            Jamatkhanas: [],
        });
        setFilterParams({});
        setCurrentPage(1);
        fetchRequests(1, itemsPerPage);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        fetchRequests(newPage, itemsPerPage, filterParams);
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) return;

        setDeleting(true);
        try {
            const res = await axios.delete("/api/IsmailiInsight", {
                data: { ids: selectedIds },
            });

            if (res.data.success) {
                toast.success("Deleted successfully!");
                setSelectedIds([]);
                // Refresh data while maintaining current filters and pagination
                fetchRequests(currentPage, itemsPerPage, filterParams);
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

    const columns: ColumnDef<CommunicationRequest>[] = [
        {
            accessorKey: "portfolioMember",
            header: "Portfolio/Member",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "programName",
            header: "Program Name",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "programDate",
            header: "Program Date",
            cell: (info) => {
                const date = new Date(info.getValue() as string);
                return date.toLocaleDateString();
            },
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
            accessorKey: "id",
            header: "Action",
            cell: (info) => (
                <Link
                    href={`/admin/communication/ismaili-insight/${info.getValue()}`}
                    className="text-yellow-600"
                >
                    <Pencil className="w-5 h-5 p-1 rounded bg-[#1b4eea] scale-125 text-white" />
                </Link>
            ),
        },
    ];

    // Jamatkhana options - you can move this to a separate file if needed
    const jamatkhanas = [
        { group: "ACST", items: ["Corpus Christi", "San Antonio"] },
        { group: "DISTRICT", items: ["Beaumont"] },
        {
            group: "ACCT",
            items: [
                "College Station",
                "Austin",
                "Austin Downtown",
                "Austin South",
                "Clear Lake",
            ],
        },
        {
            group: "GREATER HOUSTON",
            items: [
                "Headquarters",
                "Katy",
                "Principal",
                "Sugar Land",
                "Spring",
                "Harvest Green",
            ],
        },
    ];

    // Toggle single Jamatkhana selection
    const toggleJamatkhana = (name: string) => {
        setFormValues((prev) => {
            const alreadySelected = prev.Jamatkhanas.includes(name);
            const updated = alreadySelected
                ? prev.Jamatkhanas.filter((item) => item !== name)
                : [...prev.Jamatkhanas, name];
            return { ...prev, Jamatkhanas: updated };
        });
    };

    // Toggle entire group
    const toggleJamatkhanaGroup = (groupName: string, select: boolean) => {
        const group = jamatkhanas.find((g) => g.group === groupName);
        if (!group) return;

        setFormValues((prev) => {
            const currentSet = new Set(prev.Jamatkhanas);
            group.items.forEach((item) =>
                select ? currentSet.add(item) : currentSet.delete(item)
            );
            return { ...prev, Jamatkhanas: Array.from(currentSet) };
        });
    };

    // Select/unselect all
    const toggleAllJamatkhanas = (select: boolean) => {
        const allItems = jamatkhanas.flatMap((g) => g.items);
        setFormValues((prev) => ({ ...prev, Jamatkhanas: select ? allItems : [] }));
    };

    const handleExcelExport = () => { }
    const handlePdfExport = () => { }

    return (
        <div>
            {/* <Header title="Communication Request : Ismaili Insight" handleDelete={handleDelete} /> */}

            <ExportAddDeleteHeader title="Communication Request : Ismaili Insight" handleDelete={handleDelete} HandleExcelExport={handleExcelExport} HandlePdfExport={handlePdfExport} handleAddUrl="/admin/announcements/new" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <ChevronDown className="mr-2" />
                    Communication Request : Ismaili Insight
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
                <div className="transition-all mt-2 mb-2 px-4 py-4 border rounded-md bg-gray-50">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {/* Portfolio Member */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Portfolio/Member</label>
                            <input
                                type="text"
                                placeholder="Portfolio/Member"
                                value={formValues.portfolioMember}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        portfolioMember: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        {/* Date Added */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Date Added</label>
                            <input
                                type="date"
                                value={formValues.dateAdded}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        dateAdded: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        {/* Program Name */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Program Name</label>
                            <input
                                type="text"
                                placeholder="Program Name"
                                value={formValues.programName}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        programName: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        {/* Program Date From */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Program Date (From)</label>
                            <input
                                type="date"
                                value={formValues.programDateFrom}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        programDateFrom: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        {/* Program Date To */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">Program Date (To)</label>
                            <input
                                type="date"
                                value={formValues.programDateTo}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        programDateTo: e.target.value,
                                    }))
                                }
                                className="border px-3 py-2 rounded w-full"
                            />
                        </div>

                        {/* Status */}
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
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        {/* Jamatkhanas */}
                        <div className="col-span-full">
                            <label className="font-semibold text-sm mb-2">Jamatkhanas</label>
                            <div className="border rounded-md grid md:grid-cols-2 gap-2 p-4">
                                {jamatkhanas.map((group, gi) => (
                                    <div key={gi} className="mb-4 border p-2">
                                        <div className="font-medium mb-2">{group.group}</div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                                            {group.items.map((item, ii) => (
                                                <label key={ii} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={formValues.Jamatkhanas.includes(item)}
                                                        onChange={() => toggleJamatkhana(item)}
                                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                    />
                                                    <span className="text-sm">{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <div className="mt-2 flex justify-center text-xs text-blue-600">
                                            <button
                                                onClick={() => toggleJamatkhanaGroup(group.group, true)}
                                                className="mr-2 hover:underline border px-2 py-1"
                                            >
                                                Select All
                                            </button>
                                            <button
                                                onClick={() => toggleJamatkhanaGroup(group.group, false)}
                                                className="hover:underline border px-2 py-1"
                                            >
                                                Unselect All
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-4 text-xs text-blue-600 flex justify-center col-span-full">
                                    <button
                                        onClick={() => toggleAllJamatkhanas(true)}
                                        className="mr-4 hover:underline"
                                    >
                                        Select All
                                    </button>
                                    <button
                                        onClick={() => toggleAllJamatkhanas(false)}
                                        className="hover:underline"
                                    >
                                        Unselect All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleResetFilters}
                            className="px-4 py-2 border rounded-md text-sm bg-gray-300 text-gray-800 hover:bg-gray-400"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={handleFilterSubmit}
                            className="px-4 py-2 border rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"></div>
                    <span className="ml-2 text-gray-600">Loading...</span>
                </div>
            ) : (
                <DynamicTable
                    columns={columns}
                    data={requests}
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
        </div>
    );
};

export default IsmailiInsightPage;