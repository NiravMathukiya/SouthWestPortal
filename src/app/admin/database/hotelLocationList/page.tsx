
import HotelLocationListPage from "@/page/HotelLocationList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Hotel Location List ",
};

const HotelLocationList: React.FC = () => {
  return (
    <div  className="">
        <HotelLocationListPage />
    </div>
  );
};

export default HotelLocationList;
