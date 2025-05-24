"use client";

import CategoryPage from "@/page/CategoryPage";
import React from "react";

const Category = () => {
  return (
    <div>
      <CategoryPage />
    </div>
  );
};

export default Category;

// -- this is my categorypage in that i have dynamic table and filter things i wnat that
// firts time data fetch from /api/portalupdates/category with page and limit serchparams page=1&limit=20 make sure  when any filter apply then that send also with serch params like filter_category_name and filter_status in that if taht jave muliple page have then onnext button call that call same api with justpage value increment and if that time filter appled then that apply and not then not so you can understand right genrate a full code of that
