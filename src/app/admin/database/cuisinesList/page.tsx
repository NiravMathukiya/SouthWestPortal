

import FoodCuisinesListPage from "@/page/FoodCuisinesListPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Food Cuisines List ",
};

const FoodCuisinesList: React.FC = () => {
  return (
    <div className="">
        <FoodCuisinesListPage />
    </div>
  );
};

export default FoodCuisinesList;
