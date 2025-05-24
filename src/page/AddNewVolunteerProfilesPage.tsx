"use client";
import AddNewVolunteerProfilesHeader from "@/components/Headers/AddNewVolunteerProfilesHeader";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import { Pencil } from "lucide-react";
import { useRef } from "react";
import React from "react";
import FormContent, { FormContentRef } from "@/components/FormContent"; 

const AddNewVolunteerProfilesPage: React.FC = () => {
  const formRef = useRef<FormContentRef>(null);

  const handleHeaderSubmit = () => {
    formRef.current?.submitForm();
  };

  return (
    <SideBarWrapper>
      <>
        <AddNewVolunteerProfilesHeader
          title="Add New Volunteer Profile"
          onSubmitClick={handleHeaderSubmit} 
        />
        <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Pencil className="mr-2" /> Add New Volunteer Profile
          </h2>
        </div>
        <FormContent ref={formRef} />
      </>
    </SideBarWrapper>
  );
};

export default AddNewVolunteerProfilesPage;
