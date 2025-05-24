"use client";

import SideBarWrapper from "@/layouts/SidebarWrapper";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

type Institution = {
    id: number;
    name: string;
    status: "Enabled" | "Disabled";
};

const initialInstitutions: Institution[] = [
    { id: 1, name: "AKYSB", status: "Enabled" },
    { id: 2, name: "AKSWB", status: "Enabled" },
    { id: 3, name: "AKHB", status: "Enabled" },
    { id: 4, name: "AKEB", status: "Enabled" },
    { id: 5, name: "AKEPB", status: "Enabled" },
    { id: 6, name: "QOL", status: "Enabled" },
    { id: 7, name: "VRM", status: "Enabled" },
];

export default function InstitutionsPage() {
    const [institutions, setInstitutions] = useState<Institution[]>(initialInstitutions);
    const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>(initialInstitutions);
    const [filterName, setFilterName] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showFilter, setShowFilter] = useState<boolean>(false);

    const handleFilter = () => {
        const filtered = institutions.filter((inst) => {
            const matchName = filterName === "" || inst.name.toLowerCase().includes(filterName.toLowerCase());
            const matchStatus = filterStatus === "" || inst.status === filterStatus;
            return matchName && matchStatus;
        });
        setFilteredInstitutions(filtered);
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(filteredInstitutions.map((inst) => inst.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleAdd = () => {
        const newId = institutions.length + 1;
        const newInstitution: Institution = {
            id: newId,
            name: `New Institution ${newId}`,
            status: "Enabled",
        };
        const updated = [...institutions, newInstitution];
        setInstitutions(updated);
        setFilteredInstitutions(updated);
    };

    const handleDelete = () => {
        const updated = institutions.filter((inst) => !selectedIds.includes(inst.id));
        setInstitutions(updated);
        setFilteredInstitutions(updated);
        setSelectedIds([]);
    };

    const handleExport = () => {
        const data = filteredInstitutions.map((i) => `${i.name},${i.status}`).join("\n");
        const blob = new Blob([`Name,Status\n${data}`], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "institutions.csv";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <SideBarWrapper>



            {/* Page Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl ">Volunteer Profile Institutions List</h2>
                </div>
                <div className="flex items-center gap-2">


                    <button
                        onClick={handleExport}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                        Export
                    </button>
                    <button
                        onClick={handleAdd}
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                        Add
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4 bg-gray-200 px-2">
                <div className="flex flex-row items-center gap-2">
                    <MenuIcon />
                    <p className="text-2xl ">Volunteer Profile Institutions List</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowFilter((prev) => !prev)}
                        className="text-blue-600 underline text-sm"
                    >
                        {showFilter ? "Hide Filter" : "Filter"}
                    </button>


                </div>
            </div>

            {/* Filter Section */}
            {showFilter && (
                <div className="bg-purple-50 p-4 rounded mb-4 flex flex-wrap items-end gap-4 border">
                    <div>
                        <label className="block text-sm font-medium mb-1">Institution</label>
                        <input
                            type="text"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                            className="border px-3 py-1 rounded w-64"
                            placeholder="Search by name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border px-3 py-1 rounded w-40"
                        >
                            <option value="">All</option>
                            <option value="Enabled">Enabled</option>
                            <option value="Disabled">Disabled</option>
                        </select>
                    </div>
                    <button
                        onClick={handleFilter}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 h-fit"
                    >
                        Filter
                    </button>
                </div>
            )}

            {/* Table */}
            <table className="min-w-full border border-gray-300">
                <thead className="bg-blue-100 text-left">
                    <tr>
                        <th className="p-2 w-12">
                            <input
                                type="checkbox"
                                checked={
                                    selectedIds.length === filteredInstitutions.length &&
                                    filteredInstitutions.length > 0
                                }
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th className="p-2 font-semibold text-blue-900">Institution</th>
                        <th className="p-2 font-semibold text-blue-900">Status</th>
                        <th className="p-2 font-semibold text-blue-900">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInstitutions.map((inst) => (
                        <tr key={inst.id} className="border-t">
                            <td className="p-2">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(inst.id)}
                                    onChange={() => handleSelect(inst.id)}
                                />
                            </td>
                            <td className="p-2">{inst.name}</td>
                            <td className="p-2">{inst.status}</td>
                            <td className="p-2">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                    ✎ Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filteredInstitutions.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center py-4">
                                No institutions found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </SideBarWrapper>
    );
}
