


import BulkMessageTemplatePage from "@/page/BulkMessageTemplate";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Bulk Message Template"
};

const BulkMessageTemplate: React.FC = () => {
  return (
    <div className="">
        <BulkMessageTemplatePage />
    </div>
  );
};

export default BulkMessageTemplate;
