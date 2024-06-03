"use server";

import { Cabin } from "@/types/shared";
import { supabase } from "../supabase";
import { notFound } from "next/navigation";

export const getCabinsAction = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, description, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data as Cabin[];
};

export const getCabinByIdAction = async function (id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data as Cabin;
};

export const getImagesByCabinNameAction = async function (cabinName: string) {
  const folderPath = `cabin${cabinName}`;
  console.log(folderPath);
  const { data, error } = await supabase.storage
    .from("cabin-images")
    .list(folderPath, { limit: 10 });

  if (error) {
    console.error(error);
    throw new Error("Images could not be loaded");
  }

  const imageUrls = data.map((file) => {
    const { data: publicURL } = supabase.storage
      .from("cabin-images")
      .getPublicUrl(`${folderPath}/${file.name}`);
    return { name: file.name, url: publicURL.publicUrl};
  });

  return imageUrls;
};
