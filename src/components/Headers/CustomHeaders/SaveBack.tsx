import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface HeaderProps {
    title?: string;
    handleSave?: () => void;
    handleBack?: () => void;
    isSubmitting?: boolean
}

const SaveBack: React.FC<HeaderProps> = ({ title, handleSave, handleBack, isSubmitting }) => {
    return (
        <header className="bg-white shadow">
            <div className="flex flex-wrap justify-between items-center p-4 gap-y-2">
                {/* Title + Breadcrumb */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Link
                            href="/"
                            className="hover:text-primary transition-colors duration-300"
                        >
                            Home
                        </Link>
                        <span className="mx-2">&gt;</span>
                        <span>{title}</span>
                    </div>
                </div>

                {/* Right side buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Back Button */}
                    <button
                        onClick={handleBack}
                        className="flex items-center justify-center bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors duration-300"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        <span className="hidden lg:inline">Back</span>
                    </button>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        disabled={isSubmitting}
                        className="flex items-center justify-center bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors duration-300"
                    >
                        <Save size={16} className="mr-1" />
                        <span className="hidden lg:inline">Save</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default SaveBack