import SignInButton from "@/components/SignInButton";

import React from "react";

export const metadata = {
    title: "Login",
    description: "Accounts Page",
  };

const LoginPage = () => {
  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
};

export default LoginPage;
