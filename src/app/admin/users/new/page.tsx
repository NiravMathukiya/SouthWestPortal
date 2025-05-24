import AddUserForm from "@/components/AddUserForm";
import AddNewUserHeader from "@/components/Headers/AddNewUserHeader";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import React from "react";

const AddNewUser: React.FC = () => {
  return (
    <div>
      <SideBarWrapper>
        <>
          <AddNewUserHeader title="Add New User" />
          <AddUserForm />
        </>
      </SideBarWrapper>
    </div>
  );
};

export default AddNewUser;
