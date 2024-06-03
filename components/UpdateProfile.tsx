import { auth } from "@/lib/auth";
// import { getCountries } from "@/lib/data-service";
import React from "react";
import UpdateProfileFormZod from "./forms/UpdateProfileFormZod";
import { User } from "next-auth";
import { countries } from "@/constants/countries";


const UpdateProfile = async () => {
  const session = await auth();
  // const countries = await getCountries();

  return (
    <>
    
    <UpdateProfileFormZod guest={session?.user as User} countries={countries} />
    
    </>
);
};

export default UpdateProfile;
