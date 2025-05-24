

import JkAddressList from "@/page/JkAddressList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Jk Address List ",
};

const Page: React.FC = () => {
  return (
    <div>
      <JkAddressList />
    </div>
  );
};

export default Page;
