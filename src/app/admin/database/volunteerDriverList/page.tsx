

import VolunteerDriverListPage from "@/page/VolunteerDriverListPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "volunteer Driver List",
};

const VolunteerDriverList: React.FC = () => {
  return (
    <div className="">
        <VolunteerDriverListPage />
    </div>
  );
};

export default VolunteerDriverList;

