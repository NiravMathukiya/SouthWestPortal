import SideBarWrapper from "@/layouts/SidebarWrapper";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>
    <SideBarWrapper>

    {children}
    </SideBarWrapper>
    </div>;
};

export default layout;
