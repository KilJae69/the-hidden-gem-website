import { auth } from "@/lib/auth";

import React from "react";

export const metadata = {
  title: "Guest area",
  description: "Accounts Page",
};

const AccountPage = async () => {
  
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];
  return (
    <h2 className="mb-7 text-2xl font-semibold text-accent-400">
      Welcome, {firstName}
    </h2>
  );
};

export default AccountPage;
