import { auth } from "@/lib/auth";

import React from "react";

export const metadata = {
  title: "Guest area",
  description: "Accounts Page",
};

const AccountPage = async () => {
  const session = await auth();
  console.log(session);
  const firstName = session?.user?.firstName;
  return (
    <>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Welcome, {firstName}
      </h2>
      <p className="mb-4">
        We&apos;re glad to have you here! Before you can book an apartment, please
        make sure your profile is complete. Ensuring your profile is up-to-date
        helps us provide you with the best experience and service.
      </p>
      <p className="mb-4">
        Please take a moment to review and update the following information in
        your profile:
      </p>
      <ul className="mb-4 list-disc pl-5">
        <li>Full Name</li>
        <li>Email Address</li>
        <li>Nationality</li>
        <li>National ID Number</li>
      </ul>
      <p className="mb-4">
        Once your profile is complete, you&apos;ll be able to book apartments
        seamlessly. Thank you for your cooperation!
      </p>
     
    </>
  );
};

export default AccountPage;
