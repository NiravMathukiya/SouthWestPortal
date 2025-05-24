


import HotelListPage from "@/page/HotelList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Hotel List ",
};

const HotelList: React.FC = () => {
  return (
    <div className="">
        <HotelListPage/>
    </div>
  );
};

export default HotelList;
