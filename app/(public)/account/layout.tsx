import SideNavigation from "@/components/SideNavigation";
import React from "react";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" relative -my-12 flex min-h-screen w-full ">
      <SideNavigation />
      <div className="flex-1 px-3 py-5 transition-all duration-300 xs:px-8 sm:px-14">
        {children}
      </div>
    </div>
  );
};

export default AccountLayout;
