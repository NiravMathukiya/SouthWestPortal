









// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";

// interface FilterProps {
//   isFilterOpen: boolean;
//   onSubmitFilter: (filters: any) => void;
// }

// const portfolioOptions = [
//   { value: "all", label: "All" },
//   {
//     value: "Ismaili Professional Network (IPN)",
//     label: "Ismaili Professional Network (IPN)",
//   },
//   { value: "AKHB", label: "AKHB" },
//   { value: "Local Announcements", label: "Local Announcements" },
//   { value: "Program", label: "Program" },
//   { value: "Mental Health", label: "Mental Health" },
// ];

// const statusOptions = [
//   { value: "Pending", label: "Pending" },
//   { value: "Approved", label: "Approved" },
//   { value: "Rejected", label: "Rejected" },
// ];

// const jamatkhanas = [
//   { group: "ACST", items: ["Corpus Christi", "San Antonio"] },
//   { group: "DISTRICT", items: ["Beaumont"] },
//   {
//     group: "ACCT",
//     items: [
//       "College Station",
//       "Austin",
//       "Austin Downtown",
//       "Austin South",
//       "Clear Lake",
//     ],
//   },
//   {
//     group: "GREATER HOUSTON",
//     items: [
//       "Headquarters",
//       "Katy",
//       "Principal",
//       "Sugar Land",
//       "Spring",
//       "Harvest Green",
//     ],
//   },
// ];
// const FilterComponent: React.FC<FilterProps> = ({
//   isFilterOpen,
//   onSubmitFilter,
// }) => {
//   const [filters, setFilters] = useState({
//     portfolioMember: "",
//     dateAdded: "",
//     programName: "",
//     email: "",
//     programDateFrom: "",
//     programDateTo: "",
//     status: "",
//     Jamatkhanas: [] as string[],
//   });

//   const [isPortfolioDropdownOpen, setIsPortfolioDropdownOpen] = useState(false);
//   const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

//   // Toggle single Jamatkhana
//   const toggleJamatkhana = (name: string) => {
//     setFilters((prev) => {
//       const alreadySelected = prev.Jamatkhanas.includes(name);
//       const updated = alreadySelected
//         ? prev.Jamatkhanas.filter((item) => item !== name)
//         : [...prev.Jamatkhanas, name];
//       return { ...prev, Jamatkhanas: updated };
//     });
//   };

//   // Toggle entire group
//   const toggleJamatkhanaGroup = (groupName: string, select: boolean) => {
//     const group = jamatkhanas.find((g) => g.group === groupName);
//     if (!group) return;

//     setFilters((prev) => {
//       const currentSet = new Set(prev.Jamatkhanas);
//       group.items.forEach((item) =>
//         select ? currentSet.add(item) : currentSet.delete(item)
//       );
//       return { ...prev, Jamatkhanas: Array.from(currentSet) };
//     });
//   };

//   // Select/unselect all
//   const toggleAllJamatkhanas = (select: boolean) => {
//     const allItems = jamatkhanas.flatMap((g) => g.items);
//     setFilters((prev) => ({ ...prev, Jamatkhanas: select ? allItems : [] }));
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setFilters({
//       portfolioMember: "",
//       dateAdded: "",
//       programName: "",
//       email: "",
//       programDateFrom: "",
//       programDateTo: "",
//       status: "",
//       Jamatkhanas: [],
//     });
//     onSubmitFilter({});
//   };

//   return (
//     <div
//       className={`border-t border-gray-200 transition-all duration-300 ${
//         isFilterOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
//       }`}
//     >
//       <div className="p-4 bg-gray-50">
//         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//           {/* Portfolio Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Portfolio/Board/Member
//             </label>
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() =>
//                   setIsPortfolioDropdownOpen(!isPortfolioDropdownOpen)
//                 }
//                 className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white flex justify-between items-center"
//               >
//                 <span className="text-sm">
//                   {filters.portfolioMember
//                     ? portfolioOptions.find(
//                         (o) => o.value === filters.portfolioMember
//                       )?.label
//                     : "Select..."}
//                 </span>
//                 <ChevronDown size={16} />
//               </button>
//               {isPortfolioDropdownOpen && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
//                   {portfolioOptions.map((option) => (
//                     <div
//                       key={option.value}
//                       className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//                       onClick={() => {
//                         setFilters({
//                           ...filters,
//                           portfolioMember: option.value,
//                         });
//                         setIsPortfolioDropdownOpen(false);
//                       }}
//                     >
//                       {option.label}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Date, Email, Program Fields */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Date of Announcement
//             </label>
//             <input
//               type="date"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               value={filters.dateAdded}
//               onChange={(e) =>
//                 setFilters({ ...filters, dateAdded: e.target.value })
//               }
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Name of Program
//             </label>
//             <input
//               type="text"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               value={filters.programName}
//               onChange={(e) =>
//                 setFilters({ ...filters, programName: e.target.value })
//               }
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               value={filters.email}
//               onChange={(e) =>
//                 setFilters({ ...filters, email: e.target.value })
//               }
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Date of Program (From)
//             </label>
//             <input
//               type="date"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               value={filters.programDateFrom}
//               onChange={(e) =>
//                 setFilters({ ...filters, programDateFrom: e.target.value })
//               }
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Date of Program (To)
//             </label>
//             <input
//               type="date"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               value={filters.programDateTo}
//               onChange={(e) =>
//                 setFilters({ ...filters, programDateTo: e.target.value })
//               }
//             />
//           </div>

//           {/* Status Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Status
//             </label>
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
//                 className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white flex justify-between items-center"
//               >
//                 <span className="text-sm">
//                   {filters.status
//                     ? statusOptions.find((o) => o.value === filters.status)
//                         ?.label
//                     : "Select status..."}
//                 </span>
//                 <ChevronDown size={16} />
//               </button>
//               {isStatusDropdownOpen && (
//                 <div className="absolute z-[999] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
//                   {statusOptions.map((option) => (
//                     <div
//                       key={option.value}
//                       className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//                       onClick={() => {
//                         setFilters({ ...filters, status: option.value });
//                         setIsStatusDropdownOpen(false);
//                       }}
//                     >
//                       {option.label}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Jamatkhana Grouped Checkbox */}
//           <div className="col-span-full">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Jamatkhanas
//             </label>
//             <div className="border rounded-md grid md:grid-cols-2 gap-2 p-4">
//               {jamatkhanas.map((group, gi) => (
//                 <div key={gi} className="mb-4 border p-2">
//                   <div className="font-medium mb-2">{group.group}</div>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
//                     {group.items.map((item, ii) => (
//                       <label key={ii} className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={filters.Jamatkhanas.includes(item)}
//                           onChange={() => toggleJamatkhana(item)}
//                           className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                         />
//                         <span className="text-sm">{item}</span>
//                       </label>
//                     ))}
//                   </div>
//                   <div className="mt-2 flex justify-center text-xs text-blue-600">
//                     <button
//                       onClick={() => toggleJamatkhanaGroup(group.group, true)}
//                       className="mr-2 hover:underline border px-2 py-1"
//                     >
//                       Select All
//                     </button>
//                     <button
//                       onClick={() => toggleJamatkhanaGroup(group.group, false)}
//                       className="hover:underline border px-2 py-1"
//                     >
//                       Unselect All
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <div className="mt-4 text-xs text-blue-600 flex justify-center col-span-full">
//                 <button
//                   onClick={() => toggleAllJamatkhanas(true)}
//                   className="mr-4 hover:underline"
//                 >
//                   Select All
//                 </button>
//                 <button
//                   onClick={() => toggleAllJamatkhanas(false)}
//                   className="hover:underline"
//                 >
//                   Unselect All
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Submit Buttons */}
//         <div className="mt-4 flex justify-end gap-3">
//           <button
//             className="px-4 py-2 border rounded-md text-sm bg-gray-100 hover:bg-gray-200"
//             onClick={() => {
//               setFilters({
//                 portfolioMember: "",
//                 dateAdded: "",
//                 programName: "",
//                 email: "",
//                 programDateFrom: "",
//                 programDateTo: "",
//                 status: "",
//                 Jamatkhanas: [],
//               });
//               onSubmitFilter({});
//             }}
//           >
//             Reset Filters
//           </button>

//           <button
//             onClick={() => onSubmitFilter(filters)}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Apply Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterComponent;
