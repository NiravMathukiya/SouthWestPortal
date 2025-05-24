"use client";

import DynamicTable from "@/components/DynamicTable";
import RefreshDeleteHeader from "@/components/Headers/CustomHeaders/RefreshDeleteHeader";
import { SkeletonTable } from "@/Skeletons/SkeletonTable";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect,  useState } from "react";
import { toast } from "react-hot-toast";

type UserLog = {
  id: number;
  userName: string;
  ipAddress: string;
  userAgent: string;
  dateLogin: string;
  dateActive: string;
  role: string;
  isLogin: boolean;
  isActive: boolean;
};

type FilterParams = {
  userName?: string;
  role?: string;
  ipAddress?: string;
  userAgent?: string;
  dateLogin?: string;
  dateActive?: string;
  isLogin?: string;
  isActive?: string;
};

const UsersLogsPage = () => {
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const [formValues, setFormValues] = useState({
    userName: "",
    role: "",
    ipAddress: "",
    userAgent: "",
    dateLogin: "",
    dateActive: "",
    isLogin: "",
    isActive: "",
  });

  const fetchUserLogs = async (
    page: number = 1,
    limit: number = 10,
    filters: FilterParams = {}
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      if (filters.userName) params.append("userName", filters.userName);
      if (filters.role) params.append("role", filters.role);
      if (filters.ipAddress) params.append("ipAddress", filters.ipAddress);
      if (filters.userAgent) params.append("userAgent", filters.userAgent);
      if (filters.dateLogin) params.append("dateLogin", filters.dateLogin);
      if (filters.dateActive) params.append("dateActive", filters.dateActive);
      if (filters.isLogin) params.append("isLogin", filters.isLogin);
      if (filters.isActive) params.append("isActive", filters.isActive);

      const res = await axios.get(`/api/user-logs?${params.toString()}`);
      const data = res.data;

      if (data.success && data.data?.logs) {
        setCurrentPage(Number(data.data.pagination.page));
        setTotalPages(data.data.pagination.pages);
        setItemsPerPage(data.data.pagination.limit);
        setUserLogs(data.data.logs);
      }
    } catch (error) {
      console.error("Failed to fetch user logs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserLogs();
  }, []);

  const handleFilterSubmit = async () => {
    const filters: FilterParams = {};

    if (formValues.userName.trim()) filters.userName = formValues.userName.trim();
    if (formValues.role) filters.role = formValues.role;
    if (formValues.ipAddress) filters.ipAddress = formValues.ipAddress;
    if (formValues.userAgent) filters.userAgent = formValues.userAgent;
    if (formValues.dateLogin) filters.dateLogin = formValues.dateLogin;
    if (formValues.dateActive) filters.dateActive = formValues.dateActive;
    if (formValues.isLogin) filters.isLogin = formValues.isLogin;
    if (formValues.isActive) filters.isActive = formValues.isActive;

    setFilterParams(filters);
    setCurrentPage(1);
    fetchUserLogs(1, itemsPerPage, filters);
  };

  const handleResetFilters = () => {
    setFormValues({
      userName: "",
      role: "",
      ipAddress: "",
      userAgent: "",
      dateLogin: "",
      dateActive: "",
      isLogin: "",
      isActive: "",
    });
    setFilterParams({});
    setCurrentPage(1);
    fetchUserLogs(1, itemsPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchUserLogs(newPage, itemsPerPage, filterParams);
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    try {
      const res = await axios.delete("/api/user/logs", {
        data: { ids: selectedIds },
      });

      if (res.data.success) {
        toast.success("Logs deleted successfully!");
        setSelectedIds([]);
        fetchUserLogs(currentPage, itemsPerPage, filterParams);
      } else {
        toast.error("Deletion failed. Please try again.");
      }
    } catch (error) {
      console.error("Deletion error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleRefresh = () => {
    fetchUserLogs(currentPage, itemsPerPage, filterParams);
  };

  const columns: ColumnDef<UserLog>[] = [
    {
      accessorKey: "userName",
      header: "User Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "password",
      header: "Password",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "ipAddress",
      header: "IP Address",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "userAgent",
      header: "User Agent",
      cell: (info) => (
        <span className="truncate max-w-[200px] inline-block">
          {String(info.getValue())}
        </span>
      ),
    },
    {
      accessorKey: "dateLogin",
      header: "Login Date",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "dateActive",
      header: "Last Active",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "isLogin",
      header: "Logged In",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded text-sm ${info.getValue() ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            }`}
        >
          {info.getValue() ? "Yes" : "No"}
        </span>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded text-sm ${info.getValue() ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            }`}
        >
          {info.getValue() ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full">
      <RefreshDeleteHeader
        title="User Logs"
        handleDelete={handleDelete}
        handleRefresh={handleRefresh}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-50 border-b gap-2">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <ChevronDown className="mr-2" />
          User Activity Logs
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
              <label className="font-semibold text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={formValues.userName}
                onChange={(e) =>
                  setFormValues({ ...formValues, userName: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Role</label>
              <select
                value={formValues.role}
                onChange={(e) =>
                  setFormValues({ ...formValues, role: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              >
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">IP Address</label>
              <input
                type="text"
                placeholder="IP Address"
                value={formValues.ipAddress}
                onChange={(e) =>
                  setFormValues({ ...formValues, ipAddress: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">User Agent</label>
              <input
                type="text"
                placeholder="User Agent"
                value={formValues.userAgent}
                onChange={(e) =>
                  setFormValues({ ...formValues, userAgent: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Login Date</label>
              <input
                type="date"
                value={formValues.dateLogin}
                onChange={(e) =>
                  setFormValues({ ...formValues, dateLogin: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Last Active</label>
              <input
                type="date"
                value={formValues.dateActive}
                onChange={(e) =>
                  setFormValues({ ...formValues, dateActive: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Login Status</label>
              <select
                value={formValues.isLogin}
                onChange={(e) =>
                  setFormValues({ ...formValues, isLogin: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              >
                <option value="">All</option>
                <option value="true">Logged In</option>
                <option value="false">Logged Out</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Active Status</label>
              <select
                value={formValues.isActive}
                onChange={(e) =>
                  setFormValues({ ...formValues, isActive: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              >
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
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
          rowWidths={["w-1/6", "w-1/6", "w-1/4", "w-1/6", "w-1/6", "w-1/6", "w-1/6", "w-1/6"]}
        />
      ) : (
        <DynamicTable
          columns={columns}
          data={userLogs}
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

export default UsersLogsPage;