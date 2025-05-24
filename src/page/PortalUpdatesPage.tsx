"use client";

import DynamicTable from "@/components/DynamicTable";
import ExportAddDeleteHeader from "@/components/Headers/CustomHeaders/ExportAddDeleteHeader";
// import PortalUpdatesHeader from "@/components/Headers/PortalUpdatesHeader";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import { SkeletonTable } from "@/Skeletons/SkeletonTable";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type PortalUpdate = {
  update_id: number;
  category_name: string;
  submitted_by: string;
  email: string;
  description: string;
  date_added: string;
  date_modified: string;
  priority: string;
  status: string;
};

type FilterParams = {
  filter_category_name?: string;
  filter_submitted_by?: string;
  filter_email?: string;
  filter_description?: string;
  filter_priority?: string;
  filter_status?: string;
  filter_date_added_from?: string;
  filter_date_added_to?: string;
};

const PortalUpdatesPage: React.FC = () => {
  const [updates, setUpdates] = useState<PortalUpdate[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [, setDeleting] = useState(false);
  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const [formValues, setFormValues] = useState({
    category_name: "",
    submitted_by: "",
    email: "",
    description: "",
    priority: "",
    status: "",
    date_added_from: "",
    date_added_to: "",
  });

  const fetchUpdates = async (
    page: number = 1,
    limit: number = 10,
    filters: FilterParams = {}
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await axios.get(
        `/api/portalupdates/updates?${params.toString()}`
      );
      const data = res.data;
      if (data.success && data.data?.updates) {
        setCurrentPage(Number(data.data.pagination.page));
        setTotalPages(data.data.pagination.pages);
        setItemsPerPage(data.data.pagination.limit);
        setUpdates(data.data.updates);
      }
    } catch (error) {
      console.error("Failed to fetch updates", error);
      toast.error("Failed to fetch updates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleFilterSubmit = async () => {
    const filters: FilterParams = {};

    if (formValues.category_name.trim() !== "") {
      filters.filter_category_name = formValues.category_name.trim();
    }
    if (formValues.submitted_by.trim() !== "") {
      filters.filter_submitted_by = formValues.submitted_by.trim();
    }
    if (formValues.email.trim() !== "") {
      filters.filter_email = formValues.email.trim();
    }
    if (formValues.description.trim() !== "") {
      filters.filter_description = formValues.description.trim();
    }
    if (formValues.priority !== "") {
      filters.filter_priority = formValues.priority;
    }
    if (formValues.status !== "") {
      filters.filter_status = formValues.status;
    }
    if (formValues.date_added_from) {
      filters.filter_date_added_from = formValues.date_added_from;
    }
    if (formValues.date_added_to) {
      filters.filter_date_added_to = formValues.date_added_to;
    }

    setFilterParams(filters);
    setCurrentPage(1);
    fetchUpdates(1, itemsPerPage, filters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFormValues({
      category_name: "",
      submitted_by: "",
      email: "",
      description: "",
      priority: "",
      status: "",
      date_added_from: "",
      date_added_to: "",
    });
    setFilterParams({});
    setCurrentPage(1);
    fetchUpdates(1, itemsPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchUpdates(newPage, itemsPerPage, filterParams);
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    setDeleting(true);
    try {
      const res = await axios.delete("/api/portalupdates/updates", {
        data: { id: selectedIds },
      });

      if (res.data.success) {
        toast.success("Deleted successfully!");
        setSelectedIds([]);
        fetchUpdates(currentPage, itemsPerPage, filterParams);
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

  const columns: ColumnDef<PortalUpdate>[] = [
    {
      accessorKey: "category_name",
      header: "Category",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "submitted_by",
      header: "Submitted By",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "date_added",
      header: "Date Added",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: (info) => {
        const priority = info.getValue() as string;
        const priorityColor = {
          High: "bg-red-200 text-red-800",
          Medium: "bg-yellow-200 text-yellow-800",
          Low: "bg-green-200 text-green-800",
        }[priority] || "bg-gray-200 text-gray-800";

        return (
          <span className={`px-2 py-1 rounded text-sm ${priorityColor}`}>
            {priority}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const status = info.getValue() as string;
        const statusColor = {
          Active: "bg-green-200 text-green-800",
          Pending: "bg-yellow-200 text-yellow-800",
          Closed: "bg-gray-200 text-gray-800",
          Rejected: "bg-red-200 text-red-800",
        }[status] || "bg-gray-200 text-gray-800";

        return (
          <span className={`px-2 py-1 rounded text-sm ${statusColor}`}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "update_id",
      header: "Action",
      cell: (info) => (
        <Link
          href={`/admin/portalupdates/updates/${info.getValue()}`}
          className="text-yellow-600"
        >
          <Pencil className="w-5 h-5 p-1 rounded bg-[#1b4eea] scale-125 text-white" />
        </Link>
      ),
    },
  ];

  const handleExcelExport=()=>{}
  const handlePdfExport=()=>{}

  return (
    <SideBarWrapper>
      <>
        {/* <PortalUpdatesHeader title="Portal Updates List" handleDelete={handleDelete} /> */}

        <ExportAddDeleteHeader title="Portal Updates List" handleDelete={handleDelete} HandleExcelExport={handleExcelExport} HandlePdfExport={handlePdfExport} handleAddUrl="/admin/portalupdates/new" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <ChevronDown className="mr-2" />
            Portal Updates
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
          <div className="transition-all mt-2 mb-2 px-4 py-4 border rounded-md">
            <form
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleFilterSubmit();
              }}
            >
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Category</label>
                <input
                  type="text"
                  placeholder="Category"
                  value={formValues.category_name}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      category_name: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Submitted By</label>
                <input
                  type="text"
                  placeholder="Submitted By"
                  value={formValues.submitted_by}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      submitted_by: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

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

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  value={formValues.description}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Priority</label>
                <select
                  value={formValues.priority}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

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
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Date Added (From)</label>
                <input
                  type="date"
                  value={formValues.date_added_from}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      date_added_from: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Date Added (To)</label>
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
              </div>

              <div className="flex gap-2 items-end col-span-full">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Filter
                </button>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <SkeletonTable
            rowCount={8}
            rowHeight="h-4"
            rowWidths={["w-1/8", "w-1/8", "w-1/8", "w-2/8", "w-1/8", "w-1/8", "w-1/8", "w-1/8"]}
          />
        ) : (
          <DynamicTable
            columns={columns}
            data={updates}
            totalPages={totalPages}
            currentPage={currentPage}
            onNextPage={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            onPrevPage={() => handlePageChange(Math.max(currentPage - 1, 1))}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            getRowId={(row) => row.update_id}
          />
        )}
      </>
    </SideBarWrapper>
  );
};

export default PortalUpdatesPage;