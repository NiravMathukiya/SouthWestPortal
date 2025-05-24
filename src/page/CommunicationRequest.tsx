"use client";

import React, { useState, useEffect } from "react";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import { ChevronDown, ChevronUp, Trash2, Pencil } from "lucide-react";
import FilterComponent from "@/components/AnnouncementsFilterComponent";
// import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import DynamicTable from "@/components/DynamicTable";
import ExportAddDeleteHeader from "@/components/Headers/CustomHeaders/ExportAddDeleteHeader";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SkeletonTable } from "@/Skeletons/SkeletonTable";
import { useRouter } from "next/navigation";

type CommunicationRequest = {
  form_id: number;
  portfolioMember: string;
  Jamatkhanas: string[];
  programName: string;
  email: string;
  programDate: string;
  dateAdded: string;
  status: string;
};

type FilterParams = {
  portfolioMember?: string;
  programName?: string;
  email?: string;
  status?: string;
  dateAdded?: string;
  programDateFrom?: string;
  programDateTo?: string;
  Jamatkhanas?: string[];
};

const CommunicationRequest: React.FC = () => {
  const [data, setData] = useState<CommunicationRequest[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterParams, setFilterParams] = useState<FilterParams>({});

  const router = useRouter()
  const fetchData = async (page: number = 1, filters: FilterParams = {}) => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", itemsPerPage.toString());

      // Add filter parameters
      if (filters.portfolioMember) {
        params.append("drpBoard", filters.portfolioMember);
      }
      if (filters.programName) {
        params.append("filter_program", filters.programName);
      }
      if (filters.email) {
        params.append("filter_email", filters.email);
      }
      if (filters.status) {
        params.append("filter_status", filters.status);
      }
      if (filters.dateAdded) {
        params.append("filter_date_added", filters.dateAdded);
      }
      if (filters.programDateFrom) {
        params.append("filter_from_dateprogram", filters.programDateFrom);
      }
      if (filters.programDateTo) {
        params.append("filter_to_dateprogram", filters.programDateTo);
      }
      if (filters.Jamatkhanas && filters.Jamatkhanas.length > 0) {
        params.append("filter_chkCommittee", filters.Jamatkhanas[0]);
      }

      const res = await axios.get(`/api/announcement?${params.toString()}`);
      const responseData = res.data;
      console.log(responseData.data.data);
      if (responseData.success) {
        setData(responseData.data.data.results);
        setCurrentPage(responseData.data.pagination.pageNum);
        setTotalPages(responseData.data.pagination.pages);
        setItemsPerPage(responseData.data.pagination.total);
      } else {
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // The useEffect will trigger the fetchData call automatically
  };

  const onFilterSubmit = async (filters: FilterParams) => {
    // Convert Jamatkhanas array into a single encoded string
    if (filters.Jamatkhanas && Array.isArray(filters.Jamatkhanas)) {
      const encodedString = encodeURIComponent(filters.Jamatkhanas.join(','));
      filters.Jamatkhanas = [encodedString]; // Set the encoded string as the only array element
    }

    console.log(filters);
    setFilterParams(filters);
    setCurrentPage(1);
    await fetchData(1, filters);
    setIsFilterOpen(false);
  };


  // const handleResetFilters = async () => {
  //   setFilterParams({});
  //   setCurrentPage(1);
  //   await fetchData(1);
  //   setIsFilterOpen(false);
  // };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    try {
      const res = await axios.delete("/api/announcement", {
        data: { ids: selectedIds },
      });

      if (res.data.success) {
        toast.success("Deleted successfully!");
        setSelectedIds([]);
        // Refresh data with current filters
        await fetchData(currentPage, filterParams);
      } else {
        toast.error("Deletion failed");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Error deleting items");
    }
  };

  useEffect(() => {
    fetchData(currentPage, filterParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleExcelExport = async () => {
    try {
      const params = new URLSearchParams();

      // Add current filter parameters to export
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            params.append(key, value.join(","));
          } else {
            params.append(key, value.toString());
          }
        }
      });

      const res = await axios.get(`/api/announcements/export/excel?${params.toString()}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "communication_requests.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Excel exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export Excel");
    }
  };

  const handlePdfExport = async () => {
    try {
      const params = new URLSearchParams();

      // Add current filter parameters to export
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            params.append(key, value.join(","));
          } else {
            params.append(key, value.toString());
          }
        }
      });

      const res = await axios.get(`/api/announcements/export/pdf?${params.toString()}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "communication_requests.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("PDF exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export PDF");
    }
  };

  const communicationRequestColumns: ColumnDef<CommunicationRequest>[] = [
    {
      accessorKey: "portfolio",
      header: "Portfolio Member",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "committee",
      header: "Jamatkhanas",
      cell: (info) => info.getValue() as string
    },
    {
      accessorKey: "program",
      header: "Program Name",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "dateprogram",
      header: "Program Date",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "date_added",
      header: "Date Added",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const status = info.getValue() as number;
        let statusClass = "";
        switch (status) {
          case 1:
            statusClass = "bg-green-100 text-green-800";
            break;
          case 0:
            statusClass = "bg-red-100 text-red-800";
            break;
          default:
            statusClass = "bg-gray-100 text-gray-800";
        }
        return (
          <span className={`px-2 py-1 rounded text-sm ${statusClass}`}>
            {status ? "Enable" : "Disable"}
          </span>
        );
      },
    },
    {
      accessorKey: "form_id",
      header: "Edit",
      cell: (info) => (
        <button
          className="text-yellow-600 underline p-1 bg-blue-500 hover:bg-blue-600 rounded"

          onClick={() => {
            // console.log(Number(info.row.id))
            router.push(`/admin/announcements/${Number(info.row.id)}`)
          }}
          aria-label="Delete record"
        >
          <Pencil className="text-white w-5 h-5" />
        </button>
        // <Link
        //   href={`/admin/announcements/${info.getValue()}`}
        //   className="text-yellow-600 underline "
        // >
        //   <Pencil className=" w-5 h-5 p-1 rounded bg-yellow-500 scale-150" />
        // </Link>
      ),
    },
    {
      id: "form_id",
      header: "Delete",
      cell: ({ row }) => {
        const deleteId = row.original.form_id;
        const handleDelete = async () => {
          try {
            const res = await axios.delete("/api/announcement", {
              data: { ids: [deleteId] },
            });

            if (res.data.success) {
              toast.success("Deleted successfully!");
              // Refresh data with current filters
              await fetchData(currentPage, filterParams);
            } else {
              toast.error("Deletion failed");
            }
          } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Error deleting item");
          }
        };

        return (
          <button
            className="p-1 bg-red-500 hover:bg-red-600 rounded"
            onClick={handleDelete}
            aria-label="Delete record"
          >
            <Trash2 className="text-white w-5 h-5" />
          </button>
        );
      },
    },
  ];

  return (
    <SideBarWrapper>
      <div className="flex flex-col h-full w-full overflow-scroll">
        <ExportAddDeleteHeader
          title="Communication Request"
          handleDelete={handleDelete}
          HandleExcelExport={handleExcelExport}
          HandlePdfExport={handlePdfExport}
          handleAddUrl="/admin/announcements/new"
        />

        {/* Filter Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <ChevronDown className="mr-2" />
            Communication Request
          </h2>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-3 py-2 border border-gray-300 rounded-md text-blue-600 text-sm flex items-center gap-1 hover:bg-gray-50 transition-colors"
            aria-expanded={isFilterOpen}
          >
            Filter
            {isFilterOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Filter */}
        {isFilterOpen && (
          <div className="px-4">
            <FilterComponent
              isFilterOpen={isFilterOpen}
              onSubmitFilter={onFilterSubmit}
              // onResetFilters={handleResetFilters}
              initialValues={filterParams}
            />
          </div>
        )}

        {/* Table */}
        <div className="flex-1 pb-4">
          <div className="overflow-x-scroll">
            {loading ? (
              <SkeletonTable rowCount={5} rowHeight="h-4" rowWidths={["w-1/6", "w-1/6", "w-1/6", "w-1/6", "w-1/6", "w-1/6"]} />
            ) : (
              <DynamicTable<CommunicationRequest>
                columns={communicationRequestColumns}
                data={data}
                totalPages={totalPages}
                currentPage={currentPage}
                onNextPage={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                onPrevPage={() => handlePageChange(Math.max(currentPage - 1, 1))}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                getRowId={(row) => row.form_id}
              />
            )}
          </div>
        </div>
      </div>
    </SideBarWrapper>
  );
};

export default CommunicationRequest;
// [
//   {
//     id: "1",
//     portfolioMember: "Ismaili Professional Network (IPN)",
//     Jamatkhanas: ["Katy", "Houston"],
//     programName: "Tee Time & Talk",
//     email: "amber9909@gmail.com",
//     programDate: "2023-06-01",
//     status: "Pending",
//     dateAdded: "2023-06-01",
//   },
//   {
//     id: "2",
//     portfolioMember: "AKHB",
//     Jamatkhanas: ["CorpusChristi", "SanAntonio"],
//     programName: "International Nurses Day",
//     email: "foorucha1@yahoo.com",
//     programDate: "2023-05-12",
//     status: "Pending",
//     dateAdded: "2023-05-12",
//   },
//   {
//     id: "3",
//     portfolioMember: "Local Announcements",
//     Jamatkhanas: ["CorpusChristi", "SanAntonio"],
//     programName: "Translations",
//     email: "icsw@usjj.org",
//     programDate: "2023-05-09",
//     status: "Approved",
//     dateAdded: "2023-05-09",
//   },
//   {
//     id: "4",
//     portfolioMember: "Program",
//     Jamatkhanas: ["Beaumont"],
//     programName: "Rites & Ceremonies COL @ BMT",
//     email: "icsw@usjj.org",
//     programDate: "2023-05-09",
//     status: "Approved",
//     dateAdded: "2023-05-09",
//   },
//   {
//     id: "5",
//     portfolioMember: "Mental Health",
//     Jamatkhanas: ["CorpusChristi", "SanAntonio"],
//     programName: "Mental Health Awareness",
//     email: "zainabkhuwaja@gmail.com",
//     programDate: "2023-05-08",
//     status: "Approved",
//     dateAdded: "2023-05-08",
//   },
//   {
//     id: "6",
//     portfolioMember: "Youth & Sports",
//     Jamatkhanas: ["SugarLand", "Katy"],
//     programName: "Youth Soccer Tournament",
//     email: "sportsyouth@jamati.org",
//     programDate: "2023-07-20",
//     status: "Pending",
//     dateAdded: "2023-06-25",
//   },
//   {
//     id: "7",
//     portfolioMember: "Education Board",
//     Jamatkhanas: ["Plano", "Dallas"],
//     programName: "University Admissions Workshop",
//     email: "education@jamati.org",
//     programDate: "2023-08-15",
//     status: "Rejected",
//     dateAdded: "2023-07-01",
//   },
//   {
//     id: "8",
//     portfolioMember: "Women’s Activities",
//     Jamatkhanas: ["Austin"],
//     programName: "Women in Tech Panel",
//     email: "women@jamati.org",
//     programDate: "2023-09-05",
//     status: "Approved",
//     dateAdded: "2023-08-10",
//   },
//   {
//     id: "9",
//     portfolioMember: "Economic Planning Board",
//     Jamatkhanas: ["Houston", "SanAntonio"],
//     programName: "Financial Literacy Bootcamp",
//     email: "finance@jamati.org",
//     programDate: "2023-10-02",
//     status: "Pending",
//     dateAdded: "2023-09-15",
//   },
//   {
//     id: "10",
//     portfolioMember: "Arts & Culture",
//     Jamatkhanas: ["Dallas", "Plano"],
//     programName: "Calligraphy Workshop",
//     email: "arts@jamati.org",
//     programDate: "2023-11-11",
//     status: "Approved",
//     dateAdded: "2023-10-20",
//   },
// ];
