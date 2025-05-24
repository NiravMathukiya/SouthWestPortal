export default function SkeletonBookingList() {
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center border-b border-gray-200 bg-gray-50 px-4 py-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
                <div className="ml-3 h-6 w-24 animate-pulse rounded bg-gray-200"></div>
            </div>

            <div className="divide-y divide-gray-100">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex px-4 py-3">
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
                ))}
            </div>
        </div>
    )
}
