"use client";

import DynamicTable from "@/components/DynamicTable";
import DeleteHeader from "@/components/Headers/CustomHeaders/DeleteHeader";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import { SkeletonTable } from "@/Skeletons/SkeletonTable";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ChevronDown, ChevronUp, FileText, Pencil, Send } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Announcement = {
  id: number;
  date: string;
  pdf_url: string;
  draft_url: string;
  edit_url: string;
  final_url: string | null;
  title: string;
  status: "draft" | "published" | "archived";
};

type FilterParams = {
  date?: string;
  title?: string;
  status?: string;
};

const JamatiAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const [formValues, setFormValues] = useState({
    date: "",
    title: "",
    status: "",
  });

  const fetchAnnouncements = async (
    page: number = 1,
    limit: number = 10,
    filters: FilterParams = {}
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      if (filters.date) params.append("date", filters.date);
      if (filters.title) params.append("title", filters.title);
      if (filters.status) params.append("status", filters.status);

      const res = await axios.get(`/api/announcements?${params.toString()}`);
      const data = res.data;

      if (data.success && data.data?.announcements) {
        setCurrentPage(Number(data.data.pagination.page));
        setTotalPages(data.data.pagination.pages);
        setItemsPerPage(data.data.pagination.limit);
        setAnnouncements(data.data.announcements);
      }
    } catch (error) {
      console.error("Failed to fetch announcements", error);
      toast.error("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleFilterSubmit = async () => {
    const filters: FilterParams = {};

    if (formValues.date) filters.date = formValues.date;
    if (formValues.title.trim()) filters.title = formValues.title.trim();
    if (formValues.status) filters.status = formValues.status;

    setFilterParams(filters);
    setCurrentPage(1);
    fetchAnnouncements(1, itemsPerPage, filters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFormValues({ date: "", title: "", status: "" });
    setFilterParams({});
    setCurrentPage(1);
    fetchAnnouncements(1, itemsPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchAnnouncements(newPage, itemsPerPage, filterParams);
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    try {
      const res = await axios.delete("/api/announcements", {
        data: { ids: selectedIds },
      });

      if (res.data.success) {
        toast.success("Announcements deleted successfully!");
        setSelectedIds([]);
        fetchAnnouncements(currentPage, itemsPerPage, filterParams);
      } else {
        toast.error("Deletion failed. Please try again.");
      }
    } catch (error) {
      console.error("Deletion error:", error);
      toast.error("Something went wrong!");
    }
  };

  const columns: ColumnDef<Announcement>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    // {
    //   accessorKey: "title",
    //   header: "Title",
    //   cell: (info) => info.getValue(),
    // },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: (info) => {
    //     const status = info.getValue() as string;
    //     const statusMap = {
    //       draft: { color: "bg-yellow-200 text-yellow-800", label: "Draft" },
    //       published: { color: "bg-green-200 text-green-800", label: "Published" },
    //       archived: { color: "bg-gray-200 text-gray-800", label: "Archived" },
    //     };
    //     const statusInfo = statusMap[status as keyof typeof statusMap] ||
    //       { color: "bg-gray-200 text-gray-800", label: status };
    //     return (
    //       <span className={`px-2 py-1 rounded text-sm ${statusInfo.color}`}>
    //         {statusInfo.label}
    //       </span>
    //     );
    //   },
    // },
    {
      accessorKey: "pdf_url",
      header: "PDF",
      cell: (info) => (
        <Link
          href={info.getValue() as string}
          target="_blank"
          className="inline-block"
        >
          <FileText className="text-white w-5 h-5 p-1 rounded bg-orange-500" />
        </Link>
      ),
    },
    {
      accessorKey: "draft_url",
      header: "Draft",
      cell: (info) => (
        <Link
          href={info.getValue() as string}
          target="_blank"
          className="inline-block"
        >
          <Send className="text-white w-5 h-5 p-1 rounded bg-blue-500" />
        </Link>
      ),
    },
    {
      accessorKey: "edit_url",
      header: "Edit",
      cell: (info) => (
        <Link
          href={info.getValue() as string}
          className="inline-block"
        >
          <Pencil className="text-white w-5 h-5 p-1 rounded bg-yellow-500" />
        </Link>
      ),
    },
    {
      accessorKey: "final_url",
      header: "Final",
      cell: (info) => (
        <Link
          href={info.getValue() ? (info.getValue() as string) : "#"}
          target="_blank"
          className="inline-block"
          onClick={(e) => {
            if (!info.getValue()) e.preventDefault();
          }}
        >
          <Send className={`w-5 h-5 p-1 rounded ${info.getValue() ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} />
        </Link>
      ),
    },
  ];

  return (
    <SideBarWrapper>
      <div className="w-full">
        <DeleteHeader
          title="Jamati Announcements"
          handleDelete={handleDelete}
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <ChevronDown className="mr-2" />
            Announcement Management
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
                <label className="font-semibold text-sm mb-1">Date</label>
                <input
                  type="date"
                  value={formValues.date}
                  onChange={(e) =>
                    setFormValues({ ...formValues, date: e.target.value })
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Search by title"
                  value={formValues.title}
                  onChange={(e) =>
                    setFormValues({ ...formValues, title: e.target.value })
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
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
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
            rowWidths={["w-1/8", "w-1/4", "w-1/6", "w-1/12", "w-1/12", "w-1/12", "w-1/12"]}
          />
        ) : (
          <DynamicTable
            columns={columns}
            data={announcements}
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
    </SideBarWrapper>
  );
};

export default JamatiAnnouncements;