


import FoodCategoryListPage from "@/page/FoodCategoryPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Food category List ",
};

const FoodCategory: React.FC = () => {
  return (
    <div className="">
        <FoodCategoryListPage/>
    </div>
  );
};

export default FoodCategory;
