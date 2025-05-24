"use client";

import axios from "axios";
import { useState } from "react";

export default function ChangeStatusPanel() {
  const [selectedRole, setSelectedRole] = useState("");
  const [status, setStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!selectedRole) {
      return setError("Please select a role and status");
    }
    try {
      setLoading(true);

      const res = await axios.post<{ message?: string }>(
        "/api/update-role-status",
        {
          body: JSON.stringify({ role: selectedRole, status }),
        }
      );

      if (!res) throw new Error("Failed to update");

      alert("Status updated successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto bg-white  shadow-md px-6 py-1 border border-gray-100">
      <div className="flex flex-col sm:flex-row  items-start sm:items-center gap-4">
        <div className="flex items-center">
          <h2 className="text-xl w-full   font-semibold text-gray-800 ">
            Change Role Status
          </h2>
        </div>
        {/* Dropdown */}
        <div className="w-full sm:w-1/2">
          {/* <label className="block text-sm font-medium text-gray-600 mb-1">
            Select Role
          </label> */}
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setError("");
            }}
          >
            <option value="">Select Role</option>
            <optgroup label="Announcement Users">
              <option value="Editor">Editor</option>
              <option value="Translator">Translator</option>
              <option value="Member">Member</option>
            </optgroup>
            <optgroup label="Booking Event Users">
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
            </optgroup>
            <optgroup label="Others">
              <option value="Personal Data">Personal Data</option>
              <option value="Food Team">Food Team</option>
              <option value="National Program Admin">
                National Program Admin
              </option>
              <option value="JK Data Admin">JK Data Admin</option>
              <option value="Budgeting">Budgeting</option>
            </optgroup>
          </select>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className=" flex gap-10 justify-center md:justify-start lG:w-full">
          {/* Radio Buttons */}
          <div className="flex flex-col  md:gap-1">
            <div className="flex items-center">
              <input
                type="radio"
                id="enable"
                name="status"
                value="enable"
                checked={status === true}
                onChange={() => setStatus(true)}
                className="text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="enable" className="ml-2 text-sm text-gray-700">
                Enable
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="disable"
                name="status"
                value="disable"
                checked={status === false}
                onChange={() => setStatus(false)}
                className="text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="disable" className="ml-2 text-sm text-gray-700">
                Disable
              </label>
            </div>
          </div>

          {/* Go Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition text-white ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
