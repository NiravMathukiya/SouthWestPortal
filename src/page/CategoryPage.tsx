"use client";

import DynamicTable from "@/components/DynamicTable";
// import CategoryHeader from "@/components/Headers/CategoryHeader";
import AddDeleteHeader from "@/components/Headers/CustomHeaders/AddDeleteHeader";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import { SkeletonTable } from "@/Skeletons/SkeletonTable";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Category = {
  category_id: number;
  category_name: string;
  status: number; // 1 = Enabled, 0 = Disabled
};

type FilterParams = {
  filter_category_name?: string;
  filter_status?: string;
};

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
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
    status: "",
  });

  const fetchCategories = async (
    page: number = 1,
    limit: number = 10,
    filters: FilterParams = {}
  ) => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      if (filters.filter_category_name) {
        params.append("filter_category_name", filters.filter_category_name);
      }
      if (filters.filter_status) {
        params.append("filter_status", filters.filter_status);
      }

      const res = await axios.get(
        `/api/portalupdates/category?${params.toString()}`
      );
      const data = res.data;
      if (data.success && data.data?.category) {
        console.log(data.data);
        setCurrentPage(Number(data.data.pagination.page));
        setTotalPages(data.data.pagination.pages);
        setItemsPerPage(data.data.pagination.limit);
        setCategories(data.data.category);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFilterSubmit = async () => {
    const filters: FilterParams = {};

    if (formValues.category_name.trim() !== "") {
      filters.filter_category_name = formValues.category_name.trim();
    }

    if (formValues.status !== "") {
      filters.filter_status = formValues.status;
    }

    setFilterParams(filters);
    setCurrentPage(1);
    fetchCategories(1, itemsPerPage, filters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFormValues({ category_name: "", status: "" });
    setFilterParams({});
    setCurrentPage(1);
    fetchCategories(1, itemsPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchCategories(newPage, itemsPerPage, filterParams);
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    setDeleting(true);
    try {
      const res = await axios.delete("/api/portalupdates/category", {
        data: { id: selectedIds },
      });

      if (res.data.success) {
        toast.success("Deleted successfully!");
        setSelectedIds([]);
        // Refresh data while maintaining current filters and pagination
        fetchCategories(currentPage, itemsPerPage, filterParams);
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

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "category_name",
      header: "Category Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const status = Number(info.getValue()) === 1 ? "Enabled" : "Disabled";
        const statusColor =
          status === "Enabled"
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
      accessorKey: "category_id",
      header: "Action",
      cell: (info) => (
        <Link
          href={`/admin/portalupdates/category/${info.getValue()}`}
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
        {/* <CategoryHeader title="Category List" handleDelete={handleDelete} /> */}

        <AddDeleteHeader title="Category List" handleDelete={handleDelete} handleAddUrl="/admin/portalupdates/category/new" />

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
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-end"
              onSubmit={(e) => {
                e.preventDefault();
                handleFilterSubmit();
              }}
            >
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Category Name"
                  value={formValues.category_name}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      category_name: e.target.value,
                    }))
                  }
                  className="border px-3 py-2 rounded w-[250px]"
                />
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
                  className="border px-3 py-2 rounded w-[250px]"
                >
                  <option value="">Select Status</option>
                  <option value="1">Enabled</option>
                  <option value="0">Disabled</option>
                </select>
              </div>

              <div className="flex gap-2 mt-2 sm:mt-0">
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
          <SkeletonTable rowCount={8} rowHeight="h-4" rowWidths={["w-2/5", "w-2/5", "w-1/5"]} />
        ) : (
          <DynamicTable
            columns={columns}
            data={categories}
            totalPages={totalPages}
            currentPage={currentPage}
            onNextPage={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            onPrevPage={() => handlePageChange(Math.max(currentPage - 1, 1))}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            getRowId={(row) => row.category_id}
          />
        )}

      </>
    </SideBarWrapper>
  );
};

export default CategoryPage;
