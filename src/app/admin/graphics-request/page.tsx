import GraphicsRequest from "@/page/GraphicsRequest";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Graphics Request",
};

const page: React.FC = () => {
  return (
    <div>
      <GraphicsRequest />
    </div>
  );
};

export default page;
