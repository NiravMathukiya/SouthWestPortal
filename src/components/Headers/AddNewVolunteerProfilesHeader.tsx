import React from "react";
import Link from "next/link";
import {  Undo2, Save } from "lucide-react";

interface HeaderProps {
    title?: string;
    onSubmitClick ?:()=>void
}

const AddNewVolunteerProfilesHeader: React.FC<HeaderProps> = ({
    title = "Page Title",
    onSubmitClick ,
}) => {
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
                    <button className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                        <Save size={20} 
                        onClick={onSubmitClick}
                        />
                        <span className="hidden lg:inline font-bold ">
                        </span>
                    </button>
                    <Link href={"/admin/volunteerProfiles"}>
                    <button className="flex items-center justify-center bg-gray-300 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors duration-300">
                        <Undo2 size={16} className="mr-1" />
                    </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default AddNewVolunteerProfilesHeader;
