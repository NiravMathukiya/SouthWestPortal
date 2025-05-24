"use client"

import { useState, useEffect } from "react"

interface CalendarDropdownProps {
    onSelect: (location: string) => void
}

export default function CalendarDropdown({ onSelect }: CalendarDropdownProps) {
    const [locations, setLocations] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate API fetch
        const fetchLocations = async () => {
            setIsLoading(true)
            // In a real app, this would be an API call
            await new Promise((resolve) => setTimeout(resolve, 500))

            setLocations([
                "All Events",
                "Austin",
                "Austin Downtown",
                "Austin South",
                "Beaumont",
                "Clear Lake",
                "College Station",
                "Corpus Christi",
                "Harvest Green",
                "Headquarters",
                "Katy",
                "Principal",
                "San Antonio",
                "Spring",
                "Sugar Land",
            ])
            setIsLoading(false)
        }

        fetchLocations()
    }, [])

    const handleSelect = (location: string) => {
        // Store the selected location in localStorage for cross-component communication
        localStorage.setItem("selectedLocation", location)

        // Dispatch a custom event for same-tab communication
        window.dispatchEvent(new Event("locationSelected"))

        // Call the parent component's onSelect function
        onSelect(location)
    }

    return (
        <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
            {isLoading ? (
                <div className="p-2">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="mb-2 h-6 animate-pulse rounded bg-gray-200"></div>
                    ))}
                </div>
            ) : (
                <ul className="max-h-80 overflow-y-auto py-1">
                    {locations.map((location) => (
                        <li key={location}>
                            <button
                                onClick={() => handleSelect(location)}
                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                            >
                                {location}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
