"use client";

import { useState } from "react";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import SideBarWrapper from "@/layouts/SidebarWrapper";
import DynamicTable from "@/components/DynamicTable";

import BulkMessageTemplateHeader from "@/components/Headers/BulkMessageTemplate";
import { ColumnDef } from "@tanstack/react-table";
type BulkMessageTemplate = {
    id: number;
    templateName: string;
    templateVerbiage: string;
    status: "Enabled" | "Disabled";
    action: string;
};

const defaultData: BulkMessageTemplate[] = [
    {
        id: 1,
        templateName: "Welcome Message",
        templateVerbiage: "Hello {name}, welcome to our service! We're glad to have you.",
        status: "Enabled",
        action: "Edit"
    },
    {
        id: 2,
        templateName: "Payment Reminder",
        templateVerbiage: "Dear {name}, this is a reminder that your payment of {amount} is due on {date}.",
        status: "Enabled",
        action: "Edit"
    },
    {
        id: 3,
        templateName: "Account Update",
        templateVerbiage: "Your account has been updated successfully. Contact us if you didn't make this change.",
        status: "Disabled",
        action: "Edit"
    },
    {
        id: 4,
        templateName: "Promotional Offer",
        templateVerbiage: "Exclusive offer just for you! Get 20% off your next purchase with code SAVE20.",
        status: "Enabled",
        action: "Edit"
    },
    {
        id: 5,
        templateName: "Service Disruption",
        templateVerbiage: "We're experiencing technical difficulties. Services will be restored shortly. Sorry for the inconvenience.",
        status: "Disabled",
        action: "Edit"
    },
    {
        id: 6,
        templateName: "Order Confirmation",
        templateVerbiage: "Thank you for your order #{orderNumber}. It will be shipped within 2 business days.",
        status: "Enabled",
        action: "Edit"
    },
    {
        id: 7,
        templateName: "Feedback Request",
        templateVerbiage: "We'd love your feedback! How was your recent experience with us?",
        status: "Enabled",
        action: "Edit"
    }
];
const BulkMessageTemplatePage = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [filterTemplateName, setFilterTemplateName] = useState("");
    const [filterTemplateVerbiage, setFilterTemplateVerbiage] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    const filteredData = defaultData.filter((item) => {

        const matchTemplateName = item.templateName.toLowerCase().includes(filterTemplateName.toLowerCase());
        const matchTemplateVerbiage = item.templateVerbiage.toLowerCase().includes(filterTemplateVerbiage.toLowerCase())

        const matchStatus = filterStatus ? item.status === filterStatus : true;

        return matchStatus && matchTemplateName && matchTemplateVerbiage;
    });

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const BulkMessageTemplateColumns: ColumnDef<BulkMessageTemplate>[] = [

        { accessorKey: "templateName", header: "Template Name" },
        { accessorKey: "templateVerbiage", header: "Template Verbiage" },

        { accessorKey: "status", header: "Status" },
        {
            accessorKey: "action",
            header: "Action",
            cell: (info: any) => (
                <Link href={info.getValue()} className="text-yellow-600 underline">
                    <Pencil className="text-white w-5 h-5 p-1 rounded bg-yellow-500 scale-150" />
                </Link>
            ),
        },
    ];

    return (
        <SideBarWrapper>
            <BulkMessageTemplateHeader title="Bulk Message Template" />

            <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <ChevronDown className="mr-2" /> Bulk Message Template
                </h2>
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-blue-600 text-sm flex items-center gap-1 hover:bg-gray-50"
                >
                    Filter {showFilter ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
            </div>

            <div
                className={`transition-all duration-300 overflow-hidden border-t bg-gray-50 ${showFilter ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label htmlFor="templateName">Template Name</label>
                            <input
                                id="templateName"
                                placeholder="Template Name"
                                className="border px-3 py-2 rounded"
                                value={filterTemplateName}
                                onChange={(e) => setFilterTemplateName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="templateVerbiage">Template Verbiage</label>
                            <input
                                id="templateVerbiage"
                                placeholder="Template verbiage"
                                className="border px-3 py-2 rounded"
                                value={filterTemplateVerbiage}
                                onChange={(e) => setFilterTemplateVerbiage(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="border px-3 py-2 rounded"
                            >
                                <option value="">All Status</option>
                                <option value="Enabled">Enabled</option>
                                <option value="Disabled">Disabled</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() => setCurrentPage(1)}
                        >
                            Apply
                        </button>
                        <button
                            className="bg-gray-300 px-4 py-2 rounded"
                            onClick={() => {
                                setFilterTemplateName("");
                                setFilterTemplateVerbiage("");
                                setFilterStatus("");
                                setCurrentPage(1);
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <DynamicTable
                columns={BulkMessageTemplateColumns}
                data={paginatedData}
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                getRowId={(row) => row.id}
            />
        </SideBarWrapper>
    );
};

export default BulkMessageTemplatePage;
