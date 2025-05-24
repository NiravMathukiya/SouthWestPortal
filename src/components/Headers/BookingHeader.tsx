"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Plus, FileText, XCircle, ChevronDown } from "lucide-react"
import CalendarDropdown from "@/components/CalendarDropdown"

interface HeaderProps {
    title: string
    handleDelete: () => void
}

export default function BookingHeader({ title, handleDelete }: HeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const handleLocationSelect = (location: string) => {
        setIsDropdownOpen(false)
        localStorage.setItem("selectedLocation", location)
        window.dispatchEvent(new Event("locationSelected"))
    }

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto px-2 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Link href="/" className="hover:text-blue-600">
                                Home
                            </Link>
                            <span>&gt;</span>
                            <span className="text-blue-600">{title}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-1 rounded-md bg-green-600 px-3 py-2 text-white hover:bg-green-700"
                            >
                                <Calendar className="h-5 w-5" />
                                <span className="hidden md:inline">View Calendar</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            {isDropdownOpen && (
                                <CalendarDropdown onSelect={handleLocationSelect} />
                            )}
                        </div>

                        <button className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700">
                            <Plus className="h-5 w-5" />
                        </button>

                        <button className="flex items-center gap-1 rounded-md border border-blue-600 bg-white px-3 py-2 text-blue-600 hover:bg-blue-50">
                            <FileText className="h-5 w-5" />
                            <span className="hidden md:inline">Export</span>
                        </button>

                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                        >
                            <XCircle className="h-5 w-5" />
                            <span className="hidden md:inline">Cancel events</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
