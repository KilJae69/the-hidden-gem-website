"use server"

import { signIn, signOut } from "../auth";




export async function signInGoogleAction() {
    await signIn("google", { redirectTo: "/account" });
  }
export async function signInGithubAction() {
    await signIn("github", { redirectTo: "/account" });
  }



  export async function signOutAction() {
    await signOut({ redirectTo: "/" });
  }