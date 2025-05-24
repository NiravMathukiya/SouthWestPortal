import JamatiAnnouncements from "@/page/JamatiAnnouncements";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Jamati Announcements",
};
const JamatiAnnouncementsPage: React.FC = () => {
  return <JamatiAnnouncements />;
};

export default JamatiAnnouncementsPage;
