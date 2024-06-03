"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { supabase } from "../supabase";
import { UpdateUserFormSchema } from "./validations";

export async function getGuestAction(email: string) {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function CreateGuestAction(newGuest:{email:string, fullName:string, firstName:string, lastName:string}){
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function updateGuestAction(formData: any) {
  const session = await auth();

  if (!session)
    throw new Error("You need to be signed in to update your profile");

  const result = UpdateUserFormSchema.safeParse(formData);
console.log("session",session);

  if(!result.success)  throw new Error("Invalid form data");
  
  const [nationality, countryFlag] = formData.nationality.split("%");

  const updateData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    nationality,
    countryFlag,
    nationalID: formData.nationalID,
  }
    console.log("UPDATE DATA",updateData);
  
    const { error } = await supabase
      .from("guests")
      .update(updateData)
      .eq("id", session?.user?.guestId);

    if (error) throw new Error("Guest could not be updated");

    revalidatePath("/account/profile");
}
