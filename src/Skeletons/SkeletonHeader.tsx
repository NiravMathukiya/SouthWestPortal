export default function SkeletonHeader() {
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <div className="h-8 w-32 animate-pulse rounded bg-gray-200"></div>
                        <div className="mt-2 h-4 w-48 animate-pulse rounded bg-gray-200"></div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="h-10 w-36 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-10 w-10 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-10 w-24 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-10 w-36 animate-pulse rounded bg-gray-200"></div>
                    </div>
                </div>
            </div>
        </header>
    )
}
