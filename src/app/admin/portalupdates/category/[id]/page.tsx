"use client";

import AddNewCategoryForm from "@/components/AddNewCategoryForm";
import AddNewCategoryHeader from "@/components/Headers/AddNewcategoryHeader";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import FormSkeleton from "@/Skeletons/FormSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

const EditCategoryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState<null | {
    category_id?: string;
    category_name: string;
    status: number;
  }>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `/api/portalupdates/category/?id=${id}`
        );

        const data = response.data.data.data;
        setDefaultValues({
          category_id: data.category_id,
          category_name: data.category_name,
          status: data.status,
        });
      } catch (error) {
        console.error("Failed to load category", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  if (isLoading) {
    return (
      <SideBarWrapper>
        <FormSkeleton />
      </SideBarWrapper>
    );
  }

  return (
    <SideBarWrapper>
      <>
        <AddNewCategoryHeader title="Edit Category" />
        {defaultValues && <AddNewCategoryForm defaultValues={defaultValues} />}
      </>
    </SideBarWrapper>
  );
};

export default EditCategoryPage;