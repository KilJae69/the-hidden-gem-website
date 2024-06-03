"use client";

import { User } from "next-auth";

import useReservationStore from "@/store/reservationsStore";
import { Cabin } from "@/types/shared";
import { differenceInDays } from "date-fns";
import Image from "next/image"
import React from "react";
import { createBookingAction } from "@/lib/actions/booking.action";
import { NewBookingSchema } from "@/lib/actions/validations";
import toast from "react-hot-toast";
import SubmitButton from "../buttons/SubmitButton";


interface ReservationFormProps {
  user: User;
  cabin: Cabin;
  breakfastPrice: number;
}

function ReservationForm({
  user,
  cabin,
  breakfastPrice,
}: ReservationFormProps) {
  
  const {
    range,
    resetRange,
    resetForm,
    numGuests,
    setNumGuests,
    observations,
    setObservations,
    includeBreakfast,
    setIncludeBreakfast,
  } = useReservationStore();
  const { maxCapacity, regularPrice, discount } = cabin;
  const startDate = range?.from ?? "";
  const endDate = range?.to ?? "";

  const numNights = differenceInDays(endDate, startDate);
  const extrasPrice = numNights * numGuests * breakfastPrice;
  const cabinPrice = numNights * (regularPrice - discount);
  const totalPrice = cabinPrice + extrasPrice;

  const handleGuestsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumGuests(Number(event.target.value));
  };

  const handleObservationsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setObservations(event.target.value);
  };

  const handleBreakfastChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIncludeBreakfast(event.target.checked);
  };

  const clientAction = async (formData: FormData) => {
    const newBooking = {
      startDate,
      endDate,
      numNights,
      numGuests: Number(formData.get("numGuests")),
      cabinPrice,
      extrasPrice,
      totalPrice,

      hasBreakfast: formData.get("breakfastIncluded") === "on",
      observations: formData.get("observations"),

      cabinId: cabin.id,
      guestId: user.guestId,
    };

    // Client validation with ZOD

    const result = NewBookingSchema.safeParse(newBooking);
    console.log(result);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });
      console.log(errorMessage);
      toast.error(
        "Unfortunately, we were unable to process your reservation. Please try again."
      );
    }

    const response = await createBookingAction(newBooking);
    if (response?.error) toast.error(response.error);
    resetRange();
    resetForm();
  };

  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between bg-primary-800 px-5 py-2 text-primary-300 sm:px-16">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            width={32}
            height={32}
            src={user?.image ?? ""}
            alt={user?.firstName ?? ""}
          />
          <p>{user?.firstName}</p>
        </div>
      </div>

      <form
        action={clientAction}
        className="flex flex-1 flex-col gap-5 bg-primary-900 px-2 py-10 text-lg sm:px-16"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
            value={numGuests}
            onChange={handleGuestsChange}
            required
            
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
            placeholder="Any pets, allergies, special requirements, etc.?"
            value={observations}
            onChange={handleObservationsChange}
            
          />
        </div>

        <div className="flex items-center gap-5 text-sm xs:text-lg">
          <label htmlFor="breakfastIncluded">
            Would you like to include breakfast?
          </label>
          <input
            name="breakfastIncluded"
            id="breakfastIncluded"
            checked={includeBreakfast}
            onChange={handleBreakfastChange}
            type="checkbox"
            className="custom-checkbox "
           
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          {!(startDate && endDate) ? (
            <p className="text-base text-primary-300">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton label="Reserve Now" pendingLabel="Reserving..." />
          )}
        </div>
      </form>
    </div>
  );
}



export default ReservationForm;
