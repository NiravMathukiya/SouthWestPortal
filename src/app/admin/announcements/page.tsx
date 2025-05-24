// ✅ Only if you're using Next.js App Router: Do NOT include `"use server"` here unless necessary.

import CommunicationRequest from "@/page/CommunicationRequest"; // Move Announcements to components if needed
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Communication Request",
};

const AnnouncementsPage: React.FC = () => {
  return (
    <div className="">
      <CommunicationRequest />
    </div>
  );
};

export default AnnouncementsPage;
