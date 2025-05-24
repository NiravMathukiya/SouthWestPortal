"use client";

import ChangeStatusPanel from "@/components/ChangeStatusPanel";
import DynamicTable from "@/components/DynamicTable";
// import ManageAllUserPageHeader from "@/components/Headers/ManageAllUserPageHeader";
import ManageAllUserFilterComponent from "@/components/ManageAllUserFilterComponent";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SkeletonTable } from "@/Skeletons/SkeletonTable"; // Import the skeleton component
import ExportAddDeleteHeader from "@/components/Headers/CustomHeaders/ExportAddDeleteHeader";

type UserList = {
  admin_id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  status: boolean;
  first_name: string;
  last_name: string;
  role: string[];
};

type FilterParams = {
  username?: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
  role?: string[];
  page?: number;
  limit?: number;
};

const ManageAllUser: React.FC = () => {
  const [users, setUsers] = useState<UserList[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterParams, setFilterParams] = useState<FilterParams>({});

  const fetchUsers = async (
    page: number = 1,
    limit: number = 5,
    filters: FilterParams = {}
  ) => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      if (filters.username) {
        params.append("username", filters.username);
      }
      if (filters.name) {
        params.append("name", filters.name);
      }
      if (filters.email) {
        params.append("email", filters.email);
      }
      if (filters.phone) {
        params.append("phone", filters.phone);
      }
      if (filters.status) {
        params.append("status", filters.status);
      }
      if (filters.role && filters.role.length > 0) {
        filters.role.forEach(role => params.append("role", role));
      }

      const res = await axios.get(`/api/users?${params.toString()}`);
      console.log(res.data.data);
      const data = res.data;

      if (data.success) {
        // setCurrentPage(Number(data.data.pagination.page));
        // setTotalPages(data.data.pagination.pages);
        setItemsPerPage(data.data.totalCount);
        // setUsers(data.data.users);

        const mappedUsers = data.data.users.map((user: any) => ({
          admin_id: user.admin_id,
          username: user.username,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          phone: user.phone,
          status: Boolean(user.status),
          role: [user.admin_role.toString()], // Convert to array of strings if needed
        }));
        setUsers(mappedUsers);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onFilterSubmit = (filters: Record<string, string | string[]>) => {
    const apiFilters: FilterParams = {
      username: filters.username as string,
      name: filters.name as string,
      email: filters.email as string,
      phone: filters.phone as string,
      status: filters.status as string,
      role: filters.role as string[],
    };

    setFilterParams(apiFilters);
    setCurrentPage(1);
    fetchUsers(1, itemsPerPage, apiFilters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFilterParams({});
    setCurrentPage(1);
    fetchUsers(1, itemsPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchUsers(newPage, itemsPerPage, filterParams);
  };

  const UserListColumns: ColumnDef<UserList>[] = [
    {
      accessorKey: "username",
      header: "UserName",
      cell: (info: CellContext<UserList, unknown>) => info.getValue(),
    },
    {
      id: "name", // Use id instead of accessorKey since we're combining fields
      header: "Name",
      cell: (info: CellContext<UserList, unknown>) => {
        const user = info.row.original;
        return `${user.first_name} ${user.last_name}`;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info: CellContext<UserList, unknown>) => info.getValue(),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: (info: CellContext<UserList, unknown>) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: CellContext<UserList, unknown>) =>
        info.getValue<boolean>() ? (
          <span className="px-2 py-1 rounded text-sm bg-green-200 text-green-800">
            Enabled
          </span>
        ) : (
          <span className="px-2 py-1 rounded text-sm bg-red-200 text-red-800">
            Disabled
          </span>
        ),
    },
    {
      accessorKey: "admin_id",
      header: "Role",
      cell: (info: CellContext<UserList, unknown>) => {
        const roleId = info.getValue<number>();
        // You might want to map role IDs to role names here
        return roleId === 0 ? "Admin" : "User"; // Example mapping
      },
    },
    {
      accessorKey: "admin_id",
      header: "Edit",
      cell: (info: CellContext<UserList, unknown>) => (
        <Link href={`/admin/users/${info.getValue()}`}>
          <Pencil className="text-white w-5 h-5 p-1 rounded bg-blue-500 scale-150" />
        </Link>
      ),
    },
  ];

  const handleExcelExport = () => { }
  const handlePdfExport = () => { }


  return (
    <SideBarWrapper>
      <>
        {/* <ManageAllUserPageHeader title="User List" /> */}

        <ExportAddDeleteHeader title="User List" handleDelete={() => { }} HandleExcelExport={handleExcelExport} HandlePdfExport={handlePdfExport} handleAddUrl="/admin/users/new" />

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
            {isFilterOpen ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </button>
        </div>

        <ManageAllUserFilterComponent
          isFilterOpen={isFilterOpen}
          onSubmitFilter={onFilterSubmit}
          onResetFilters={handleResetFilters}
        />

        <ChangeStatusPanel />

        {loading ? (
          <SkeletonTable
            rowCount={itemsPerPage}
            rowHeight="h-12"
            rowWidths={["w-1/6", "w-1/6", "w-1/6", "w-1/6", "w-1/6", "w-1/6"]}
          />
        ) : (
          <DynamicTable
            columns={UserListColumns}
            data={users}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            onPrevPage={() => handlePageChange(Math.max(currentPage - 1, 1))}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            getRowId={(row) => row.admin_id}
          />
        )}
      </>
    </SideBarWrapper>
  );
};

export default ManageAllUser;