


import AddNewVolunteerProfilesPage from "@/page/AddNewVolunteerProfilesPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add New  Volunteer Profiles"
};

const AddNewVolunteerProfiles: React.FC = () => {
  return (
    <div className="">
      <AddNewVolunteerProfilesPage />
    </div>
  );
};

export default AddNewVolunteerProfiles;
