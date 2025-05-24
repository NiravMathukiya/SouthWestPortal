"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, PlusCircle, Pencil } from "lucide-react";

interface CategoryFormProps {
  defaultValues?: {
    category_id?: string;
    category_name: string;
    status: number;
  };
}

const AddNewCategoryForm: React.FC<CategoryFormProps> = ({ defaultValues }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    category_name: "",
    status: "Enabled" as "Enabled" | "Disabled",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      defaultValues &&
      "category_name" in defaultValues &&
      "status" in defaultValues
    ) {
      setFormData({
        category_name: defaultValues.category_name,
        status: defaultValues.status === 1 ? "Enabled" : "Disabled",
      });
    }
  }, [defaultValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const baseUrl = "/api/portalupdates/category";
      const method = defaultValues?.category_id ? "put" : "post";

      const payload = {
        category_name: formData.category_name,
        status: formData.status === "Enabled" ? 1 : 0,
      };

      const url = defaultValues?.category_id
        ? `${baseUrl}?id=${defaultValues.category_id}`
        : baseUrl;

      await axios({
        method,
        url,
        data: payload,
        headers: { "Content-Type": "application/json" },
      });

      toast.success(
        `Category ${defaultValues?.category_id ? "updated" : "added"
        } successfully!`
      );

      router.push("/admin/portalupdates/category");
      router.refresh();
    } catch (error: any) {
      console.log(error?.response?.data?.error?.error);
      const message =
        error?.response?.data?.error?.error ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-8 rounded-2xl shadow-md transition-all">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          {defaultValues?.category_id ? (
            <>
              <Pencil className="text-blue-500" size={22} /> Edit Category
            </>
          ) : (
            <>
              <PlusCircle className="text-green-500" size={22} /> Add Category
            </>
          )}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category_name"
              placeholder="Enter category name"
              value={formData.category_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          <div className="flex justify-end md:mr-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Processing...
                </>
              ) : (
                <>{defaultValues?.category_id ? "Update" : "Add"} Category</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategoryForm;