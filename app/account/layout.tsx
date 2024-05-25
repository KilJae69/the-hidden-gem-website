import SideNavigation from "@/components/SideNavigation";
import React from "react";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
};

export default AccountLayout;
