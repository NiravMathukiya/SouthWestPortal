"use client";
import React, { useRef } from "react";
import DynamicData, { DynamicDataRef } from "@/components/DynamicData";
import AddNewJkDatalistHeader from "@/components/Headers/AddNewJkDatalistHeader";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import { Pencil } from "lucide-react";

const AddNewJkDatalistPage: React.FC = () => {
  const dynamicRef = useRef<DynamicDataRef>(null);

  const handleSubmit = () => {
    if (dynamicRef.current) {
      dynamicRef.current.handleSubmit();
    }
  };

  return (
    <SideBarWrapper>
      <>
        <AddNewJkDatalistHeader title="Add JK Data" onSubmitClick={handleSubmit} />

        <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Pencil className="mr-2" />
            Add JK Data
          </h2>
        </div>

        <div className="p-4">
          <DynamicData ref={dynamicRef} />
        </div>
      </>
    </SideBarWrapper>
  );
};

export default AddNewJkDatalistPage;
