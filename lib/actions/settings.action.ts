"use server"

import { supabase } from "../supabase";


export async function getSettingsAction() {
    const { data, error } = await supabase.from("settings").select("*").single();
  
    if (error) {
      console.error(error);
      throw new Error("Settings could not be loaded");
    }
  
    return data;
  }