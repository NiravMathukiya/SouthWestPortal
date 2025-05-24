"use client"

import { useState, useEffect } from "react"
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

interface Booking {
    id: string
    time: string
    location: string
    room: string
    reference: string
    capacity: number
}

export default function BookingList() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentDate,] = useState(new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }))
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

    useEffect(() => {
        const handleLocationChange = () => {
            const location = localStorage.getItem("selectedLocation")
            if (location) {
                setSelectedLocation(location)
                fetchBookings(location)
            }
        }

        // Check for initial location
        const initialLocation = localStorage.getItem("selectedLocation")
        if (initialLocation) {
            setSelectedLocation(initialLocation)
            fetchBookings(initialLocation)
        }

        // Listen for changes from other tabs
        window.addEventListener("storage", handleLocationChange)
        // Listen for changes from same tab
        window.addEventListener("locationSelected", handleLocationChange)

        return () => {
            window.removeEventListener("storage", handleLocationChange)
            window.removeEventListener("locationSelected", handleLocationChange)
        }
    }, [])

    const fetchBookings = async (location: string) => {
        setIsLoading(true)
        try {
            // Fetch from API with location as search param
            const response = await fetch(`/api/booking?location=${encodeURIComponent(location)}`)
            const data = await response.json()
            setBookings(data.bookings || [])
        } catch (error) {
            console.error("Failed to fetch bookings:", error)
            setBookings([])
        } finally {
            setIsLoading(false)
        }
    }

    if (!selectedLocation) {
        return (
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto max-w-md">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No location selected</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Please select a location from the &quot;View Calendar&quot; dropdown to see bookings.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="animate-fade-in">
            {/* Calendar navigation */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
                <div className="flex items-center gap-2">
                    <button className="rounded-full border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 sm:px-4">
                        Today
                    </button>
                    <div className="flex">
                        <button className="rounded-md p-1 hover:bg-gray-100">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button className="rounded-md p-1 hover:bg-gray-100">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                    <button className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-gray-100">
                        <span className="font-medium">{currentDate}</span>
                        <ChevronDown className="h-4 w-4" />
                    </button>
                </div>
                <div className="flex items-center gap-1">
                    {['day', 'week', 'month', 'agenda'].map((view) => (
                        <button
                            key={view}
                            className="rounded-md p-1 capitalize hover:bg-gray-100"
                            title={`${view} view`}
                        >
                            {view === 'day' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                            )}
                            {view === 'week' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            )}
                            {view === 'month' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                    <rect x="6" y="14" width="12" height="8"></rect>
                                </svg>
                            )}
                            {view === 'agenda' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bookings list */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center border-b border-gray-200 bg-gray-50 px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <span className="font-bold">{new Date().getDate()}</span>
                    </div>
                    <div className="ml-3">
                        <div className="font-medium uppercase">
                            {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="flex px-4 py-3">
                                <div className="w-16">
                                    <div className="h-5 w-12 animate-pulse rounded bg-gray-200"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start">
                                        <div className="mr-2 h-3 w-3 animate-pulse rounded-full bg-gray-200"></div>
                                        <div className="w-full">
                                            <div className="mb-1 h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
                                            <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <div key={booking.id} className="flex px-4 py-3 hover:bg-gray-50">
                                <div className="w-16 font-medium text-gray-700">{booking.time}</div>
                                <div className="flex-1">
                                    <div className="flex items-start">
                                        <div className="mr-2 mt-1 h-3 w-3 rounded-full bg-purple-600"></div>
                                        <div>
                                            <div className="font-medium">{booking.room}</div>
                                            <div className="text-sm text-gray-500">{booking.reference}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-8 text-center text-gray-500">
                            No bookings found for {selectedLocation}.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}