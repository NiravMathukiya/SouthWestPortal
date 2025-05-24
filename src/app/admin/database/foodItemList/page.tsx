
import FoodItemListPage from "@/page/FoodItemListPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Food Item List ",
};

const FoodItemList: React.FC = () => {
  return (
    <div className="">
        <FoodItemListPage />
    </div>
  );
};

export default FoodItemList;
