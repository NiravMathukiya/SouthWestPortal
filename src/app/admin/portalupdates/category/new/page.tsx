"use client"

import AddNewCategoryForm from "@/components/AddNewCategoryForm";
import AddNewCategoryHeader from "@/components/Headers/AddNewcategoryHeader";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import FormSkeleton from "@/Skeletons/FormSkeleton";
import React, { useState, useEffect } from "react";

const AddNewCategory = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Adjust timing as needed
    return () => clearTimeout(timer);
  }, []);

  // Full page skeleton loader
  if (isLoading) {
    return (
      <SideBarWrapper>
        <FormSkeleton />
      </SideBarWrapper>
    );
  }

  // Actual content when loaded
  return (
    <SideBarWrapper>
      <>
        <AddNewCategoryHeader title="Add New Category" />
        <AddNewCategoryForm />
      </>
    </SideBarWrapper>
  );
};

export default AddNewCategory;



// "use client"

// import AddNewCategoryForm from "@/components/AddNewCategoryForm";
// import AddNewCategoryHeader from "@/components/Headers/AddNewcategoryHeader";
// import SideBarWrapper from "@/layouts/SidebarWrapper";
// import React, { useState, useEffect } from "react";

// const AddNewCategory = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate loading delay
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1500); // 1.5 seconds delay for demo
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <SideBarWrapper>
//         {isLoading ? (
//           <div className="p-4 space-y-6">
//             {/* Skeleton for header */}
//             <div className="animate-pulse">
//               <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
//               <div className="border-b border-gray-200 mb-6"></div>
//             </div>

//             {/* Skeleton for form */}
//             <div className="animate-pulse space-y-4">
//               <div className="space-y-2">
//                 <div className="h-4 bg-gray-200 rounded w-1/6"></div>
//                 <div className="h-10 bg-gray-200 rounded"></div>
//               </div>

//               <div className="space-y-2">
//                 <div className="h-4 bg-gray-200 rounded w-1/6"></div>
//                 <div className="h-10 bg-gray-200 rounded"></div>
//               </div>

//               <div className="space-y-2">
//                 <div className="h-4 bg-gray-200 rounded w-1/6"></div>
//                 <div className="h-32 bg-gray-200 rounded"></div>
//               </div>

//               <div className="pt-4">
//                 <div className="h-10 bg-gray-200 rounded w-1/6"></div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <>
//             <AddNewCategoryHeader title="Add New Category" />
//             <AddNewCategoryForm />
//           </>
//         )}
//       </SideBarWrapper>
//     </>
//   );
// };

// export default AddNewCategory;