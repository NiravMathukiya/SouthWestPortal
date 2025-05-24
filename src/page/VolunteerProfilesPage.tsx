"use client";

import { useState } from "react";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import SideBarWrapper from "@/layouts/SidebarWrapper";
import DynamicTable from "@/components/DynamicTable";
import VolunteerProfilesHeader from "@/components/Headers/VolunteerProfilesHeader";





type VolunteerProfiles = {
    id: number;
    primaryJamatkhana: string;
    name: string;
    dateOfBirth: Date;
    phoneNumber: number;
    email: string;
    education: string;
    occupation: string;
    linkedInProfileLink: string;
    institutionOfInterest: string;
    action: string;
};

const defaultData: VolunteerProfiles[] = [
    {
        id: 1,
        primaryJamatkhana: "Headquarters Jamatkhana",
        name: "Aliya Khan",
        dateOfBirth: new Date(1990, 5, 15),
        phoneNumber: 5551234567,
        email: "aliya.khan@example.com",
        education: "Master's in Social Work",
        occupation: "Social Worker",
        linkedInProfileLink: "linkedin.com/in/aliyakhan",
        institutionOfInterest: "Local Community Center",
        action: "Edit"
    },
    {
        id:2,
        primaryJamatkhana: "Downtown Jamatkhana",
        name: "Rahim Patel",
        dateOfBirth: new Date(1985, 8, 22),
        phoneNumber: 5552345678,
        email: "rahim.patel@example.com",
        education: "Bachelor's in Education",
        occupation: "Teacher",
        linkedInProfileLink: "linkedin.com/in/rahimpatel",
        institutionOfInterest: "Youth Mentorship Program",
        action: "Edit"
    },
    {
        id: 3,
        primaryJamatkhana: "Westside Jamatkhana",
        name: "Fatima Hassan",
        dateOfBirth: new Date(1995, 2, 10),
        phoneNumber: 5553456789,
        email: "fatima.hassan@example.com",
        education: "PhD in Public Health",
        occupation: "Health Researcher",
        linkedInProfileLink: "linkedin.com/in/fatimahassan",
        institutionOfInterest: "Public Health Institute",
        action: "Edit"
    },
    {
        id: 4,
        primaryJamatkhana: "Eastside Jamatkhana",
        name: "Karim Abdullah",
        dateOfBirth: new Date(1988, 11, 5),
        phoneNumber: 5554567890,
        email: "karim.abdullah@example.com",
        education: "Bachelor's in Computer Science",
        occupation: "Software Developer",
        linkedInProfileLink: "linkedin.com/in/karimabdullah",
        institutionOfInterest: "STEM Education Nonprofit",
        action: "Edit"
    },
    {
        id: 5,
        primaryJamatkhana: "Northside Jamatkhana",
        name: "Amina Mohammed",
        dateOfBirth: new Date(1992, 4, 18),
        phoneNumber: 5555678901,
        email: "amina.mohammed@example.com",
        education: "Master's in Business Administration",
        occupation: "Marketing Manager",
        linkedInProfileLink: "linkedin.com/in/aminamohammed",
        institutionOfInterest: "Business Development Council",
        action: "Edit"
    },
    {
        id: 6,
        primaryJamatkhana: "Southside Jamatkhana",
        name: "Yusuf Ismail",
        dateOfBirth: new Date(1980, 7, 30),
        phoneNumber: 5556789012,
        email: "yusuf.ismail@example.com",
        education: "Bachelor's in Civil Engineering",
        occupation: "Construction Project Manager",
        linkedInProfileLink: "linkedin.com/in/yusufismail",
        institutionOfInterest: "Affordable Housing Initiative",
        action: "Edit"
    },
    {
        id: 7,
        primaryJamatkhana: "Central Jamatkhana",
        name: "Leila Rahman",
        dateOfBirth: new Date(1998, 1, 25),
        phoneNumber: 5557890123,
        email: "leila.rahman@example.com",
        education: "Bachelor's in Psychology",
        occupation: "Counselor",
        linkedInProfileLink: "linkedin.com/in/leilarahman",
        institutionOfInterest: "Mental Health Awareness Org",
        action: "Edit"
    }
];

const VolunteerProfilesPage = () => {
    const [showFilter, setShowFilter] = useState(false);

    const [filterPrimaryJamatkhana, setFilterPrimaryJamatkhana] = useState("");
    const [filterName, setFilterName] = useState("");
    // const [filterDateOfBirth, setFilterDateOfBirth] = useState<Date | null>(null);
    const [filterPhoneNumber, setFilterPhoneNumber] = useState("");
    const [filterEmail, setFilterEmail] = useState("");
    const [filterInstitutionofInterest, setFilterInstitutionofInterest] = useState("");
    const [filterEducation, setFilterEducation] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const filteredData = defaultData.filter((profile) => {
        const matchPrimaryJamatkhana = profile.primaryJamatkhana.toLocaleLowerCase().includes(filterPrimaryJamatkhana.toLowerCase());
        const matchName = profile.name.toLowerCase().includes(filterName.toLowerCase());
        const matchPhoneNumber = profile.phoneNumber.toString().includes(filterPhoneNumber);
        const matchEmail = profile.email.toLowerCase().includes(filterEmail);
        const matchInstitutionofInterest = profile.institutionOfInterest.toLowerCase().includes(filterInstitutionofInterest.toLowerCase());
        const matchEducation = profile.education.toLowerCase().includes(filterEducation.toLowerCase())
        return matchPrimaryJamatkhana && matchName && matchPhoneNumber && matchEmail && matchInstitutionofInterest && matchEducation;
    });

    const allPrimaryJamatkhana = Array.from(new Set(defaultData.map((profile) => profile.primaryJamatkhana)));
    const allInstitutionofInterest = Array.from(new Set(defaultData.map((profile) => profile.institutionOfInterest)));
    const allEducationQualification = Array.from(new Set(defaultData.map((profile) => profile.education)));
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const foodItemListColumns = [

        { accessorKey: "cuisines", header: "Primary Jamatkhana" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "dateOfBirth", header: "Date of Birth" },
        { accessorKey: "phoneNumber", header: "Phone Number" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "occupation", header: "Occupation" },
        { accessorKey: "linkedInProfileLink", header: "LinkedIn Profile Link" },
        { accessorKey: "institutionOfInterest", header: "InstitutionofInterest" },
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
            <VolunteerProfilesHeader title="Volunteer Profiles " />
            <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <ChevronDown className="mr-2" /> Volunteer Profiles
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

                            <label htmlFor="jamatkhana">Primary Jamatkhana </label>
                            <select value={filterPrimaryJamatkhana}
                                id="jamatkhana"
                                onChange={(e) => setFilterPrimaryJamatkhana(e.target.value)}
                            >
                                <option value=""></option>
                                {
                                    allPrimaryJamatkhana.map((Jamatkhana, index) => (
                                        <>
                                            <option key={index} value={Jamatkhana}>{Jamatkhana}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                placeholder="Name"
                                className="border px-3 py-2 rounded"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="dob">Date of Birth </label>
                            <input
                            // type="date"
                            // id="dob"
                            // placeholder="Date of Birth"
                            // className="border px-3 py-2 rounded"
                            // value={filterDateOfBirth}
                            // onChange={(e) => setFilterCostPerPerson(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="name">Phone Number</label>
                            <input

                                id="phoneNumber"
                                placeholder="Phone Number"
                                className="border px-3 py-2 rounded"
                                value={filterPhoneNumber}
                                onChange={(e) => setFilterPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                placeholder="Email Address"
                                className="border px-3 py-2 rounded"
                                value={filterEmail}
                                onChange={(e) => setFilterEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">

                            <label htmlFor="institution">Institution of Interest </label>
                            <select value={filterInstitutionofInterest}
                                id="institution"
                                onChange={(e) => setFilterInstitutionofInterest(e.target.value)}
                            >
                                <option value=""></option>
                                {
                                    allInstitutionofInterest.map((institution, index) => (
                                        <>
                                            <option key={index} value={institution}>{institution}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col">

                            <label htmlFor="education">Highest Level  of Education </label>
                            <select value={filterEducation}
                                id="education"
                                onChange={(e) => setFilterEducation(e.target.value)}
                            >
                                <option value=""></option>
                                {
                                    allEducationQualification.map((education, index) => (
                                        <>
                                            <option key={index} value={education}>{education}</option>
                                        </>
                                    ))
                                }
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
                                setFilterPrimaryJamatkhana("");
                                setFilterPhoneNumber("");
                                setFilterName("");
                                setFilterEmail("");
                                setFilterInstitutionofInterest("");
                                setFilterEducation("");
                                setCurrentPage(1);
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
            <DynamicTable
                columns={foodItemListColumns}
                data={paginatedData}
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                getRowId={(row)=>row.id}
            />
        </SideBarWrapper>
    );
};

export default VolunteerProfilesPage;
