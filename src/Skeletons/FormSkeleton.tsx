import React from 'react'

const FormSkeleton = () => {
    return (
        <div className="p-4 space-y-6 animate-pulse">
            {/* Header skeleton */}
            <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="border-b border-gray-200"></div>
            </div>

            {/* Form skeleton */}
            <div className=" md:max-w-5xl mx-auto  space-y-6">
                {/* Category Name Field */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                    <div className="h-10 bg-gray-200 rounded-xl"></div>
                </div>

                {/* Status Field */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                    <div className="h-10 bg-gray-200 rounded-xl"></div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <div className="h-10 bg-gray-200 rounded-xl w-32"></div>
                </div>
            </div>
        </div>
    )
}

export default FormSkeleton