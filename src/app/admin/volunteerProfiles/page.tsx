


import VolunteerProfilesPage from "@/page/VolunteerProfilesPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Volunteer Profiles"
};

const VolunteerProfiles: React.FC = () => {
  return (
    <div className="">
      <VolunteerProfilesPage />
    </div>
  );
};

export default VolunteerProfiles;
