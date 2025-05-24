"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { SunEditorComponent } from "@/components/RichTextEditor";
import PortalUpdatesHeader from "@/components/Headers/PortalUpdatesHeader";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function AddUpdateForm() {
  const [formData, setFormData] = useState({
    submittedBy: "",
    email: "",
    category: "",
    description: "",
    priority: "Low",
    status: "Pending",
  });

  type Category = {
    category_id: number;
    category_name: string;
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Overall loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/portalupdates/category");
        setCategories(res.data.data.category || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Wait until all dependencies are ready
    if (!loadingCategories) {
      setIsLoading(false);
    }
  }, [loadingCategories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // API submission logic here
  };

  // Show loader if things are still loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2
          color="green"
          className="animate-spin h-12 w-12  "
        ></Loader2>
      </div>
    );
  }

  return (
    <div>
      <PortalUpdatesHeader title="Add Portal Update"></PortalUpdatesHeader>

      <form
        onSubmit={handleSubmit}
        className=" md:mx-auto md:p-6 p-1 rounded-xl shadow-lg"
      >
        <div className="mb-6">
          <div className="border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 rounded-t-lg">
              <h2 className="text-lg font-semibold text-gray-800">General</h2>
            </div>
            <div className="md:px-6 md:py-6 p-2 space-y-6">
              {/* Submitted By */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <label
                  htmlFor="submittedBy"
                  className="text-left md:text-right pr-4 text-sm font-semibold text-gray-700"
                >
                  <span className="text-red-500">*</span> Submitted By
                </label>
                <input
                  type="text"
                  id="submittedBy"
                  name="submittedBy"
                  value={formData.submittedBy}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="md:col-span-3 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400
                           shadow-sm transition duration-200
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <label
                  htmlFor="email"
                  className="text-left md:text-right pr-4 text-sm font-semibold text-gray-700"
                >
                  <span className="text-red-500">*</span> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="md:col-span-3 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400
                           shadow-sm transition duration-200
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Category */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <label
                  htmlFor="category"
                  className="text-left md:text-right pr-4 text-sm font-semibold text-gray-700"
                >
                  <span className="text-red-500">*</span> Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="md:col-span-3 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900
       shadow-sm transition duration-200
       focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="" disabled>
                    {loadingCategories ? "Loading..." : "Select a category"}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
                <label
                  htmlFor="description"
                  className="text-left md:text-right pr-4 pt-2 text-sm font-semibold text-gray-700"
                >
                  <span className="text-red-500">*</span> Description
                </label>
                <div className="md:col-span-3 rounded-lg border border-gray-300 shadow-sm">
                  <SunEditorComponent onChange={handleEditorChange} />
                </div>
              </div>

              {/* Priority */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <label
                  htmlFor="priority"
                  className="text-left md:text-right pr-4 text-sm font-semibold text-gray-700"
                >
                  <span className="text-red-500">*</span> Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  className="md:col-span-3 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900
                           shadow-sm transition duration-200
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Status */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <label
                  htmlFor="status"
                  className="text-left md:text-right   pr-4 text-sm font-semibold text-gray-700"
                >
                  <span className="text-red-500">*</span> Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="md:col-span-3 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900
                           shadow-sm transition duration-200
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="inline-flex justify-center px-5 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center px-5 py-2 rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
