import SideBarWrapper from "@/layouts/SidebarWrapper";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <SideBarWrapper>{children}</SideBarWrapper>;
};

export default layout;
