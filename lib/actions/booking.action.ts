"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../supabase";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import {  getBookings } from "../data-service";
import { Booking } from "@/types/shared";
import { NewBookingSchema } from "./validations";
import { isAlreadyBooked } from "../utils";
import { DateRange } from "react-day-picker";
import { eachDayOfInterval, parseISO } from "date-fns";
import { getCabinByIdAction } from "./cabin.action";
import { getSettingsAction } from "./settings.action";

export async function getBookingsByGuestIdAction(
  guestId: number
): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const bookings: Booking[] = data.map((booking) => {
    return {
      ...booking,
      cabins: booking.cabins[0] || booking.cabins,
    } as Booking;
  });

  return bookings;
}

export async function getBookedDatesByCabinIdAction(cabinId: number) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayString = today.toISOString();

   
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${todayString},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function deleteBookingAction(bookingId: number) {
  const session = await auth();

  if (!session)
    throw new Error("You need to be signed in to delete a reservation");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not authorized to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBookingAction(formData: any) {
  const bookingId = Number(formData.get("bookingId"));
  const session = await auth();
  if (!session)
    throw new Error("You need to be signed in to update a reservation");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not authorized to update this booking");

  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // Mutation

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  // Error handling
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  // Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // Redirection
  redirect("/account/reservations");
}

export async function createBookingAction(newBooking: unknown) {
  const session = await auth();
  if (!session)
    throw new Error("You need to be signed in to create a reservation");

  const result = NewBookingSchema.safeParse(newBooking);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });
    return {
      error: errorMessage,
    };
  }

  const { startDate, endDate,cabinId,numGuests,numNights,totalPrice } = result.data;
  try {
    const cabinBookedDates = await getBookedDatesByCabinIdAction(result.data.cabinId);
    const range: DateRange = {
      from: typeof startDate === "string" ? parseISO(startDate) : startDate,
      to: typeof endDate === "string" ? parseISO(endDate) : endDate,
    };
    if (isAlreadyBooked(range, cabinBookedDates)) {
      throw new Error("Selected dates are not available. Please try with different dates or a different cabin.");
    }

  }catch(error){
    throw new Error("Error while checking availability. Please try again.");
  }

  try{
   const [settings,bookedCabin]= await Promise.all([
      getSettingsAction(),
      getCabinByIdAction(cabinId),
    ]);
    
    const { maxCapacity,regularPrice,discount } = bookedCabin;

    if(numGuests > maxCapacity) throw new Error("Number of guests exceeds the maximum capacity of the cabin");

    const expectedExtrasPrice = numNights * numGuests * settings.breakfastPrice;
    const expectedPrice = numNights * (regularPrice - discount) + expectedExtrasPrice;

    if(totalPrice !== expectedPrice) throw new Error("Total price is not correct");
    

  }catch(error){
    throw new Error("Error while creating booking. Please try again.");
  }

  const validatedNewBooking = {
    ...result.data,
    isPaid: false,
    status: "unconfirmed",
  };

    const { error } = await supabase.from("bookings").insert([validatedNewBooking]);
  

    if (error) throw new Error("Booking could not be created");

    revalidatePath(`/cabins/${validatedNewBooking.cabinId}`);

    redirect("/cabins/thankyou");
}
