


import AddNewJkDatalistPage from "@/page/AddNewJkDatalistPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "jk add new List ",
};

const JkAddNewList: React.FC = () => {
  return (
    <div className="">
        <AddNewJkDatalistPage />
    </div>
  );
};

export default JkAddNewList;
