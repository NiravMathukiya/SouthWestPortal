"use client";

import DynamicTable from "@/components/DynamicTable";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SkeletonTable } from "@/Skeletons/SkeletonTable";
import AddDeleteHeader from "@/components/Headers/CustomHeaders/AddDeleteHeader";

// Define options for dropdowns
const jamatkhanaOptions = [
  { label: "All Jamatkhanas", value: "all" },
  { label: "Austin", value: "austin" },
  { label: "Austin Downtown", value: "austin_downtown" },
  { label: "Austin South", value: "austin_south" },
  { label: "Beaumont", value: "beaumont" },
  { label: "Clear Lake", value: "clear_lake" },
  { label: "College Station", value: "college_station" },
  { label: "Corpus Christi", value: "corpus_christi" },
  { label: "Harvest Green", value: "harvest_green" },
  { label: "Headquarters", value: "headquarters" },
  { label: "Katy", value: "katy" },
  { label: "Principal", value: "principal" },
  { label: "San Antonio", value: "san_antonio" },
  { label: "Spring", value: "spring" },
  { label: "Sugar Land", value: "sugar_land" },
];

const roleOptions = [
  { label: "Makhi JK", value: 0 },
  { label: "Council Corner", value: 1 },
];

type AnnouncementSubscriber = {
  subscriber_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  attachments: boolean;
  status: boolean;
  sub_role: number;
  institution: string;
};

type FilterParams = {
  filter_first_name?: string;
  filter_last_name?: string;
  filter_email?: string;
  filter_phone?: string;
  filter_institution?: string;
  filter_sub_role?: number;
  filter_attachments?: boolean;
  filter_status?: boolean;
};

const AnnouncementSubscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<AnnouncementSubscriber[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [, setDeleting] = useState(false);
  const [filterParams, setFilterParams] = useState<FilterParams>({});

  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    institution: "",
    role: "",
    attachments: "",
    status: "",
  });

  const fetchSubscribers = async (
    page: number = 1,
    limit: number = 5,
    filters: FilterParams = {}
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      if (filters.filter_first_name) {
        params.append("filter_first_name", filters.filter_first_name);
      }
      if (filters.filter_last_name) {
        params.append("filter_last_name", filters.filter_last_name);
      }
      if (filters.filter_email) {
        params.append("filter_email", filters.filter_email);
      }
      if (filters.filter_phone) {
        params.append("filter_phone", filters.filter_phone);
      }
      if (filters.filter_institution) {
        params.append("filter_institution", filters.filter_institution);
      }
      if (filters.filter_sub_role !== undefined) {
        params.append("filter_sub_role", filters.filter_sub_role.toString());
      }
      if (filters.filter_attachments !== undefined) {
        params.append("filter_attachments", filters.filter_attachments.toString());
      }
      if (filters.filter_status !== undefined) {
        params.append("filter_status", Boolean(filters.filter_status).toString());
      }

      const res = await axios.get(`/api/subscribers?${params.toString()}`);
      const data = res.data;

      if (data.success && data.data?.data) {
        setCurrentPage(Number(data.data.pagination.page));
        setTotalPages(data.data.pagination.pages);
        setItemsPerPage(data.data.pagination.limit);
        setSubscribers(data.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch subscribers", error);
      toast.error("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleFilterSubmit = async () => {
    const filters: FilterParams = {};

    if (formValues.first_name.trim() !== "") {
      filters.filter_first_name = formValues.first_name.trim();
    }
    if (formValues.last_name.trim() !== "") {
      filters.filter_last_name = formValues.last_name.trim();
    }
    if (formValues.email.trim() !== "") {
      filters.filter_email = formValues.email.trim();
    }
    if (formValues.phone.trim() !== "") {
      filters.filter_phone = formValues.phone.trim();
    }
    if (formValues.institution !== "") {
      filters.filter_institution = formValues.institution;
    }
    if (formValues.role !== "") {
      // Send the index number (0 or 1) for sub_role filter
      filters.filter_sub_role = parseInt(formValues.role);
    }
    if (formValues.attachments !== "") {
      filters.filter_attachments = formValues.attachments === "true";
    }
    if (formValues.status !== "") {
      filters.filter_status = formValues.status === "true";
    }

    setFilterParams(filters);
    setCurrentPage(1);
    fetchSubscribers(1, itemsPerPage, filters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFormValues({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      institution: "",
      role: "",
      attachments: "",
      status: "",
    });
    setFilterParams({});
    setCurrentPage(1);
    fetchSubscribers(1, itemsPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchSubscribers(newPage, itemsPerPage, filterParams);
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    setDeleting(true);
    try {
      const res = await axios.delete("/api/subscribers", {
        data: { ids: selectedIds },
      });

      if (res.data.success) {
        toast.success("Deleted successfully!");
        setSelectedIds([]);
        fetchSubscribers(currentPage, itemsPerPage, filterParams);
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

  const columns: ColumnDef<AnnouncementSubscriber>[] = [
    {
      accessorKey: "first_name",
      header: "First Name",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "email",
      header: "Email Address",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
      cell: (info) => (info.getValue() as string) || "—",
    },
    {
      accessorKey: "attachments",
      header: "Attachments",
      cell: (info) => info.getValue() ? "Yes" : "No",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const status = info.getValue() ? "Enabled" : "Disabled";
        const statusColor = status === "Enabled"
          ? "bg-green-200 text-green-800"
          : "bg-red-200 text-red-800";
        return (
          <span className={`px-2 py-1 rounded text-sm ${statusColor}`}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "sub_role",
      header: "Subscriber Role",
      cell: (info) => {
        const roleIndex = info.getValue() as number;
        return roleOptions[roleIndex]?.label || "Unknown";
      }
    },
    {
      accessorKey: "institution",
      header: "Jamatkhana",
      cell: (info) => {
        const value = info.getValue() as string;
        const option = jamatkhanaOptions.find(opt => opt.value === value);
        return option?.label || value;
      },
    },
    {
      accessorKey: "subscriber_id",
      header: "Action",
      cell: (info) => (
        <Link
          href={`/admin/subscribers/${info.getValue()}`}
          className="text-yellow-600"
        >
          <Pencil className="w-5 h-5 p-1 rounded bg-[#1b4eea] scale-125 text-white" />
        </Link>
      ),
    },
  ];

  return (  
    <SideBarWrapper>
      <>
        {/* <AnnouncementSubscribersHeader title="Announcement Subscribers" handleDelete={handleDelete}/> */}

        <AddDeleteHeader title="Announcement Subscribers" handleDelete={handleDelete} handleAddUrl="/admin/subscribers/new" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <ChevronDown className="mr-2" />
            Communication Request
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleFilterSubmit();
              }}
            >
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={formValues.first_name}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formValues.last_name}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Email</label>
                <input
                  type="text"
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
                <label className="font-semibold text-sm mb-1">Phone</label>
                <input
                  type="text"
                  placeholder="Phone"
                  value={formValues.phone}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Jamatkhana</label>
                <select
                  value={formValues.institution}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      institution: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="">All Jamatkhanas</option>
                  {jamatkhanaOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Subscriber Role</label>
                <select
                  value={formValues.role}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="">All Roles</option>
                  {roleOptions.map((option, index) => (
                    <option key={index} value={index}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Attachments</label>
                <select
                  value={formValues.attachments}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      attachments: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="">All</option>
                  <option value="true">With Attachments</option>
                  <option value="false">Without Attachments</option>
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
                  <option value="">All Status</option>
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end items-end col-span-full">
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
          <SkeletonTable rowCount={8} rowHeight="h-2" rowWidths={["w-6", "w-24", "w-32", "w-16", "w-20", "w-20", "w-20", "w-20", "w-20", "w-20", "w-20", "w-20", "w-20", "w-20", "w-20", "w-20", "w-20", "w-20"]} />
        ) : (
          <DynamicTable
            columns={columns}
            data={subscribers}
            totalPages={totalPages}
            currentPage={currentPage}
            onNextPage={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            onPrevPage={() => handlePageChange(Math.max(currentPage - 1, 1))}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            getRowId={(row) => row.subscriber_id}
          />
        )}
      </>
    </SideBarWrapper>
  );
};

export default AnnouncementSubscribers;