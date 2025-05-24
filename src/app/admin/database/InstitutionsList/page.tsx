

import InstitutionsList from "@/page/InstitutionsList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Institutions List ",
};

const AnnouncementsPage: React.FC = () => {
  return (
    <div className="">
      <InstitutionsList />
    </div>
  );
};

export default AnnouncementsPage;
