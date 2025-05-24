
import JkSpaceList from "@/page/JkSpaceList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Institutions List ",
};

const Page: React.FC = () => {
  return (
    <div>
        <JkSpaceList/>
    </div>
  );
};

export default Page;
