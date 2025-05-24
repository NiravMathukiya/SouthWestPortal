"use client";

import DynamicTable from "@/components/DynamicTable";
import TitleHeader from "@/components/Headers/CustomHeaders/TitleHeader";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import { SkeletonTable } from "@/Skeletons/SkeletonTable";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { Check, FileText, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type GraphicsRequest = {
  id: number;
  type: string;
  board: string;
  email: string;
  date: string;
  audience: string;
  eventName: string;
  timing: string;
  location: string;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
  file_url?: string;
  approve_url: string;
  edit_url: string;
};

type FilterParams = {
  status?: string;
  board?: string;
  date_from?: string;
  date_to?: string;
};

const GraphicsRequest = () => {
  const [requests, setRequests] = useState<GraphicsRequest[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const [formValues, setFormValues] = useState({
    status: "",
    board: "",
    date_from: "",
    date_to: "",
  });

  const fetchRequests = async (
    page: number = 1,
    limit: number = 10,
    filters: FilterParams = {}
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      if (filters.status) params.append("status", filters.status);
      if (filters.board) params.append("board", filters.board);
      if (filters.date_from) params.append("date_from", filters.date_from);
      if (filters.date_to) params.append("date_to", filters.date_to);

      const res = await axios.get(`/api/graphics-requests?${params.toString()}`);
      const data = res.data;

      if (data.success && data.data?.requests) {
        setCurrentPage(Number(data.data.pagination.page));
        setTotalPages(data.data.pagination.pages);
        setItemsPerPage(data.data.pagination.limit);
        setRequests(data.data.requests);
      }
    } catch (error) {
      console.error("Failed to fetch graphics requests", error);
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleFilterSubmit = async () => {
    const filters: FilterParams = {};

    if (formValues.status) filters.status = formValues.status;
    if (formValues.board) filters.board = formValues.board;
    if (formValues.date_from) filters.date_from = formValues.date_from;
    if (formValues.date_to) filters.date_to = formValues.date_to;

    setFilterParams(filters);
    setCurrentPage(1);
    fetchRequests(1, itemsPerPage, filters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFormValues({
      status: "",
      board: "",
      date_from: "",
      date_to: "",
    });
    setFilterParams({});
    setCurrentPage(1);
    fetchRequests(1, itemsPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchRequests(newPage, itemsPerPage, filterParams);
  };

  const columns: ColumnDef<GraphicsRequest>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "board",
      header: "Board",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => (
        <a
          href={`mailto:${info.getValue()}`}
          className="text-blue-600 hover:underline"
        >
          {info.getValue() as string}
        </a>
      ),
    },
    {
      accessorKey: "audience",
      header: "Audience",
      cell: (info) => (
        <div className="line-clamp-2 max-w-[150px]">
          {info.getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: "eventName",
      header: "Event",
      cell: (info) => (
        <div className="line-clamp-2 max-w-[150px]">
          {info.getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: "file_url",
      header: "File",
      cell: (info) => (
        info.getValue() ? (
          <Link
            href={info.getValue() as string}
            target="_blank"
            className="inline-block"
          >
            <FileText className="w-5 h-5 p-1 rounded bg-orange-500 text-white" />
          </Link>
        ) : (
          "N/A"
        )
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const status = info.getValue() as string;
        const statusStyles = {
          Pending: "bg-yellow-200 text-yellow-800",
          Approved: "bg-green-200 text-green-800",
          Rejected: "bg-red-200 text-red-800",
        };
        return (
          <span className={`px-2 py-1 rounded text-sm ${statusStyles[status as keyof typeof statusStyles] || "bg-gray-200"}`}>
            {status}
          </span>
        );
      },
    },
    // {
    //   accessorKey: "approve_url",
    //   header: "Approve",
    //   cell: (info) => (
    //     <Link
    //       href={info.getValue() as string}
    //       className="inline-block"
    //     >
    //       <Check className="w-5 h-5 p-1 rounded bg-green-500 text-white" />
    //     </Link>
    //   ),
    // },
    {
      accessorKey: "Actions",
      header: "Actions",
      cell: (info) => (
        <>

          <Link href={info.getValue() as string} className="inline-block">
            <Check className="w-5 h-5 p-1 rounded bg-orange-500 text-white" />
          </Link>
          <Link
            href={info.getValue() as string}
            className="inline-block"
          >
            <Mail className="w-5 h-5 p-1 rounded bg-yellow-500 text-white" />
          </Link>
        </>
      ),
    },
  ];

  return (
    <SideBarWrapper>
      <div className="w-full">
        <TitleHeader title="Graphics Requests" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Graphics Request Management
          </h2>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-blue-600 text-sm flex items-center gap-1 hover:bg-gray-50"
            aria-expanded={isFilterOpen}
          >
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
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
                <label className="font-semibold text-sm mb-1">Status</label>
                <select
                  value={formValues.status}
                  onChange={(e) =>
                    setFormValues({ ...formValues, status: e.target.value })
                  }
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Board</label>
                <input
                  type="text"
                  placeholder="Filter by board"
                  value={formValues.board}
                  onChange={(e) =>
                    setFormValues({ ...formValues, board: e.target.value })
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">From Date</label>
                <input
                  type="date"
                  value={formValues.date_from}
                  onChange={(e) =>
                    setFormValues({ ...formValues, date_from: e.target.value })
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">To Date</label>
                <input
                  type="date"
                  value={formValues.date_to}
                  onChange={(e) =>
                    setFormValues({ ...formValues, date_to: e.target.value })
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
            rowWidths={["w-1/12", "w-1/12", "w-1/8", "w-1/6", "w-1/8", "w-1/8", "w-1/12", "w-1/12", "w-1/12", "w-1/12"]}
          />
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
    </SideBarWrapper>
  );
};

export default GraphicsRequest;