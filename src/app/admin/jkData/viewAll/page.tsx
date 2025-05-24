

import JkDataViewAlltPage from "@/page/JkDataViewAllPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "jk data  view all list ",
};

const JkDataViewAll: React.FC = () => {
  return (
    <div className="">
      <JkDataViewAlltPage />
    </div>
  );
};

export default JkDataViewAll;
